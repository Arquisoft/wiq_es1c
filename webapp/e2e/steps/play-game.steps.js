const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/play-game.feature');
const DatabaseManager = require('../DatabaseManager.js');
const bcrypt = require('bcrypt');

let page;
let browser;
let dbManagerUserData;
let dbManagerGameData;
defineFeature(feature, test => {
  const username = "testUser_dsknvsi"
  const password = "aebttrbsdbzdfbbs"
  const testId = "Hello"
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 1 });
    page = await browser.newPage();
    const dbConfigUserData={
      host:'localhost',
      user:'root',
      password:'',
      port:9001,
      database:'db'
    }
    const dbConfigGameData={
      host:'localhost',
      user:'root',
      password:'',
      port:9002,
      database:'db'
    }
    dbManagerUserData=new DatabaseManager(dbConfigUserData);
    dbManagerGameData=new DatabaseManager(dbConfigGameData);
    setDefaultOptions({ timeout: 10000 })
    //Creamos nuevo usuario para los tests
    await dbManagerUserData.query(`DELETE FROM Users WHERE id = '${testId}'`);
    //bcryp.hash, 15 por que es lo que estamos utilizando actualmente -> cuidado con authEndpoints.js a los posibles cambios
    await dbManagerUserData.query(`INSERT INTO Users (id, name, password, createdAt, updatedAt) VALUES ('${testId}', '${username}', '${await bcrypt.hash(password,15)}','2024-04-05 15:45:11','2024-04-05 15:45:11')`);
    await page
      .goto("http://localhost:80/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
    await expect(page).toFill('input[name="username"]',username);
    await expect(page).toFill('input[name="password"]',password);
    await expect(page).toClick('button',{text:'Iniciar sesión'});
    await page.waitForNavigation()
  });
  beforeEach(async()=>{
    await page
        .goto("http://localhost:80/Home", {
          waitUntil: "networkidle0",
        })
        .catch(() => {});
  })
  afterAll(async ()=>{
    browser.close();
    await dbManagerUserData.close();
    await dbManagerGameData.close();
  })
  test('Starts a new game', ({given,when,then}) => {
    let beforeNewGame;
    given('A logged user in home view', async () => {
      beforeNewGame= await dbManagerGameData.query(`SELECT COUNT(*) var FROM Games WHERE user_id = '${testId}'`);
      const xpath = '/html/body/div[1]/div/main/main/div/div[1]/h2';
      const element = await page.waitForXPath(xpath, { visible: true });
      const text = await page.evaluate(e => e.innerText, element);
      expect(text).toBe('Home');
    });

    when('I press play', async () => {
      await expect(page).toClick('button', { text: 'JUGAR' });
    });
    then('A new game starts', async () => {
      //This time is given for wait Creating game in DB
      await page.waitForTimeout(4000);
      const afterNewGame = await dbManagerGameData.query(`SELECT COUNT(*) var FROM Games WHERE user_id = '${testId}' `)
      expect(Number(beforeNewGame[0].var)+1).toBe(Number(afterNewGame[0].var))
      const currentUrl = await page.url();
      expect(currentUrl).toBe('http://localhost/game');
    });
  });
  test('Results are shown', ({given,when,then}) => {
    let buttonColor;
    given('A logged user in a game', async () => {
      await expect(page).toClick('button', { text: 'JUGAR' });
    });
    when('I choose an option', async () => {
      buttonColor = await page.waitForSelector('main button:first-of-type').backgroundColor;
      await expect(page).toClick('[data-buton="btn"]:first-of-type')
    });
    then('Show results', async () => {
      const changedButton = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('[data-buton="btn"]'));
        return buttons.some((button,buttonColor) => {
          return button.style.backgroundColor !== buttonColor;
        });
       });
      expect(changedButton).toBe(true);
    });
  });
  test('Shows questions continuously',({given,when,then})=>{
    let text;
    given('A logged user in a game',async()=>{
      await expect(page).toClick('button', { text: 'JUGAR' });
    });
    when('I choose an option',async()=>{
      const xpath = '/html/body/div[1]/div/main/main/div[1]/h1';
      const element = await page.waitForXPath(xpath, { visible: true });
      text = await page.evaluate(e => e.innerText, element);
      await expect(page).toClick('[data-buton="btn"]:first-of-type')
    });
    then('New Question appears',async()=>{
      await page.waitForTimeout(2000);
      const xpath = '/html/body/div[1]/div/main/main/div[1]/h1';
      const element = await page.waitForXPath(xpath, { visible: true });
      expect(text).not.toBe(await page.evaluate(e => e.innerText, element));
    });
  });
  test('The answer is persistent',({given,when,then})=>{
    let titles;
    let text;
    given('A logged user in a game',async()=>{
      await expect(page).toClick('button', { text: 'JUGAR' });
    });
    when('I choose an option',async()=>{
      const xpath = '/html/body/div[1]/div/main/main/div[1]/h1';
      const element = await page.waitForXPath(xpath, { visible: true });
      text = await page.evaluate(e => e.innerText, element);
      await expect(page).toClick('[data-buton="btn"]:first-of-type')
      await page.waitForTimeout(3000);
    });
    then('Answer is saved in database',async()=>{
      titles= await dbManagerGameData.query(`SELECT title FROM Questions WHERE gameId= (SELECT id FROM Games WHERE user_id = '${testId}' ORDER BY createdAt DESC LIMIT 1)`);
      await page.waitForTimeout(3000);
      expect(titles.some(element=>element.title.includes(text))).toBe(true);
    });
  })
  test('Finish game',({given,when,then})=>{
    given('A logged user in a game',async()=>{
      await expect(page).toClick('button', { text: 'JUGAR' });
    });
    when('I click in home and confirm',async()=>{
      const homeButton = await page.waitForSelector('[data-testid="HomeIcon"]');
      await homeButton.click();
      await expect(page).toClick('button',{text:'Sí,salir'})
    });
    then('The game is finished',async()=>{
      const xpath = '/html/body/div[1]/div/main/main/div/div[1]/h2';
      const element = await page.waitForXPath(xpath, { visible: true });
      const text = await page.evaluate(e => e.innerText, element);
      expect(text).toBe('Home');
    });
  })
});