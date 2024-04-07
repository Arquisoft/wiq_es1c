const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/play-game.feature');
const DatabaseManager = require('../DatabaseManager.js');

let page;
let browser;
let dbManagerUserData;
let dbManagerGameData;
defineFeature(feature, test => {
  const username = "testUser_dsknvsi"
  const password = "hr3]pk,UxU=BQp7"
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
    await dbManagerUserData.query(`INSERT INTO Users (id, name, password, createdAt, updatedAt) VALUES ('${testId}', '${username}', '${password}','2024-04-05 15:45:11','2024-04-05 15:45:11')`);
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
    given('A logged user in home view', async () => {
      const xpath = '/html/body/div[1]/div/main/main/div/div[1]/h2';
      const element = await page.waitForXPath(xpath, { visible: true });
      const text = await page.evaluate(e => e.innerText, element);
      expect(text).toBe('Home');
    });

    when('I press play', async () => {
      await expect(page).toClick('button > span', { text: 'JUGAR' });
    });

    then('A new game starts', async () => {
      const now = new DateTime().now();
      console.log(now + "DateTime time");
      const currentUrl = await page.url();
      expect(currentUrl).toBe('http://localhost/game');
      const result = await dbManagerGameData.query(`SELECT createdAt FROM Games WHERE user_id = '${testId}' ORDER BY createdAt DESC LIMIT 1`)
      console.log(result, +"DBTime")
      expect(now).equals(result)
    });
  });
  test('Results are shown', ({given,when,then}) => {
    given('A logged user in a game', async () => {
      await expect(page).toClick('button > span', { text: 'JUGAR' });
    });
    when('I choose an option', async () => {
      await expect(page).toClick('[data-buton="btn"]:first-of-type',{visible:true})
    });
    then('Show results', async () => {
      const changedButton = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('[data-buton="btn"]'));

        return buttons.some(button => {
          return button.style.backgroundColor !== 'purple';
        });
      });
      expect(changedButton).toBe(true);
    });
  });
  test('Shows questions continuously',({given,when,then})=>{
    given('A logged user in a game',async()=>{
      expect(true);
    });
    when('I choose an option',async()=>{
      expect(true);
    });
    then('New Question appears',async()=>{
      expect(true);
    });
  })
  test('The answer is persistent',({given,when,then})=>{
    given('A logged user in a game',async()=>{
      expect(true);
    });
    when('I choose an option',async()=>{
      expect(true);
    });
    then('Answer is saved in database',async()=>{
      expect(true);
    });
  })
  test('Finish game',({given,when,then})=>{
    given('A logged user in a game',async()=>{
      expect(true);
    });
    when('I click in home and confirm',async()=>{
      expect(true);
    });
    then('The game is finished',async()=>{
      expect(true);
    });
  })
});