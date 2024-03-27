const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/play-game.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 1 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('Starts a new game', ({given,when,then}) => {
    let username;
    let password;

    given('An logged user since home view', async () => {
      username = "manu"
      password = "hr3]pk,UxU=BQp7"

      await expect(page).toClick("a", { text: "¿No tienes una cuenta? Regístrate" });
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="confirmPassword"]', password);
      await expect(page).toClick('button', { text: 'Registrarme' });

    });

    when('I press play', async () => {
      await expect(page).toClick('button', { text: 'Jugar' })
    });

    then('A new game starts', async () => {
      const currentUrl = await page.url();
      expect(currentUrl).toBe('http://localhost/game');
      /*TODO: Add the message
        await expect(page).toMatchElement("div", { text: "User added successfully" });
      */
    });
  })

  test('The user select one answer', ({given,when,then}) => {
    let username;
    let password;

    given('A logged user in a game', async () => {
      username = "pablo"
      password = "pabloasw"
    });

    when('I choose an option', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="confirmPassword"]', password + 'imdifferent');
      await expect(page).toClick('button', { text: 'Registrarme' })
    });

    then('Show results', async () => {
        await expect(page).toMatchElement("div", { text: "Las contraseñas no coinciden" });
    });
  });
  afterAll(async ()=>{
    browser.close()
  })
});