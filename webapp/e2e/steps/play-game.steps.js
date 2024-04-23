const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/play-game.feature');

let page;
let browser;

defineFeature(feature, test => {
  const username = "testUser_dsknvsi"
  const password = "aebttrbsdbzdfbbs"
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 1 });
    page = await browser.newPage();
    setDefaultOptions({ timeout: 10000 })
    //Creamos nuevo usuario para los tests
    await page
      .goto("http://localhost:3000/register", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
    await expect(page).toFill('input[name="username"]', username);
    await expect(page).toFill('input[name="password"]', password);
    await expect(page).toFill('input[name="confirmPassword"]', password);
    await expect(page).toClick('button', { text: 'Registrarme' });
    await page.waitForNavigation();
  });
  beforeEach(async()=>{
    await page
        .goto("http://localhost:3000/Home", {
          waitUntil: "networkidle0",
        })
        .catch(() => {});
  });
  afterAll(async ()=>{
    browser.close();
  });
  test('Starts a new game', ({given,when,then}) => {
    let beforeNewGame;
    given('A logged user in home view', async () => {
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