const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/play-game.feature');

let page;
let browser;

defineFeature(feature, test => {
  const username = "ab"
  const password = "hr3]pk,UxU=BQp7"
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 1 });
    page = await browser.newPage();
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:80/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
    //Creamos nuevo usuario para los tests
    await expect(page).toClick("a", {text: "¿No tienes una cuenta? Regístrate"});
    await expect(page).toFill('input[name="username"]', username);
    await expect(page).toFill('input[name="password"]', password);
    await expect(page).toFill('input[name="confirmPassword"]', password);
    await expect(page).toClick('button', {text: 'Registrarme'});

  });
  beforeEach(async()=>{
    await page
        .goto("http://localhost:80/login", {
          waitUntil: "networkidle0",
        })
        .catch(() => {});
    await expect(page).toFill('input[name="username"]',username);
    await expect(page).toFill('input[name="password"]',password);
    await expect(page).toClick('.MuiButtonBase-root',{
      visible:true,
      text:'Iniciar sesión'
    });
    await page.waitForNavigation()
  })
  afterEach(async()=>{
    await expect(page).toClick('[data-testid="logout"]',{visible:true});
  })
  afterAll(async ()=>{
    browser.close()
  })
  test('Starts a new game', ({given,when,then}) => {

    given('An logged user since home view', async () => {
      await page.waitForSelector('h2.MuiTypography-root');
      const homeElement = await page.$eval('h2.MuiTypography-root', el => el.textContent === 'Home');
      expect(homeElement).toBeTruthy();
    });

    when('I press play', async () => {
      await expect(page).toClick('button > span', { text: 'JUGAR' });
    });

    then('A new game starts', async () => {
      const currentUrl = await page.url();
      //Dar tiempo a que carge
      expect(currentUrl).toBe('http://localhost/game');
      await expect(page).toMatchElement('.MuiButtonBase-root', {
        visible: true
      });
    });
  });
  test('The user select one answer', ({given,when,then}) => {

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
});