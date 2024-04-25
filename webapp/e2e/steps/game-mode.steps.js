const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/game-mode.feature');
const {textVerifyByXpath}=require('../steps_testUtils');

let page;
let browser;

defineFeature(feature, test => {
  const username = "testUser_wrmetuemsdadgadb"
  const password = "aebttrbss"
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
  test('Starts a new classic game', ({given,when,then}) => {
    let beforeNewGame;
    given('A logged user in home view', async () => {
      const xpath = '/html/body/div[1]/div/main/main/div/div[1]/h2';
      await textVerifyByXpath(page, xpath,"Inicio")
    });

    when('I press classic play', async () => {
      await expect(page).toClick('button', { text: 'JUGAR CLÁSICO' });
    });
    then('The game ends after 10 questions', async () => {
      for(let i = 0; i<=10; i++){
        await page.waitForTimeout(2000);
        await expect(page).toClick('[data-buton="btn"]:first-of-type');
      }
      await page.waitForTimeout(2000);
      await expect(page).toMatchElement("h2",{text:"El juego ha finalizado!"})
    });
  });
  test('Starts a new suddendeath game', ({given,when,then}) => {
    given('A logged user in home view', async () => {
      const xpath = '/html/body/div[1]/div/main/main/div/div[1]/h2';
      await textVerifyByXpath(page, xpath,"Inicio")
    });
    when('I press suddendeath game', async () => {
      await expect(page).toClick('button', { text: 'JUGAR MUERTE SÚBITA' });
    });
    then('The game ends when time runs out', async () => {
      await page.waitForTimeout(11000);
      await expect(page).toMatchElement("h2",{text:"El juego ha finalizado!"})
    });
  });
  test('Starts a new againstClock game',({given,when,then})=>{
    let text;
    given('A logged user in home view',async()=>{
      const xpath = '/html/body/div[1]/div/main/main/div/div[1]/h2';
      await textVerifyByXpath(page, xpath,"Inicio")
    });
    when('I press againstClock game',async()=>{
      //await expect(page).toClick('button', { text: "JUGAR Contrareloj"});
      await page
          .goto("http://localhost:3000/againstClock", {
            waitUntil: "networkidle0",
          })
          .catch(() => {});
    });
    then('The game doesn´t finish after 10 questions',async()=> {
      for (let i = 0; i < 11; i++) {
        await page.waitForTimeout(2000);
        await expect(page).toClick('[data-buton="btn"]:first-of-type')
      }
      await expect(page).not.toMatchElement("h2", {text: "El juego ha finalizado!"})
    });
  });
});