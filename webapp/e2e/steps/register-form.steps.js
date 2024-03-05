const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/register-form.feature');

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

  test('The user is not registered in the site', ({given,when,then}) => {
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "pablo"
      password = "pabloasw"
      await expect(page).toClick("a", { text: "¿No tienes una cuenta? Regístrate" });
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="confirmPassword"]', password);
      await expect(page).toClick('button', { text: 'Registrarme' })
    });

    then('A confirmation message should be shown in the screen', async () => {
      /*TODO: Add the message
        await expect(page).toMatchElement("div", { text: "User added successfully" });
      */
    });
  })

  test('The user puts two different passwords', ({given,when,then}) => {
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "pablo"
      password = "pabloasw"
    });

    when('I fill the data with different passwords in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="confirmPassword"]', password + 'imdifferent');
      await expect(page).toClick('button', { text: 'Registrarme' })
    });

    then('A error message appears', async () => {
        await expect(page).toMatchElement("div", { text: "Las contraseñas no coinciden" });
    });
  });

  afterAll(async ()=>{
    browser.close()
  })
/* TODO: fix this on deployment
  test('The user uses an already taken username', ({given,when,then}) => {
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "pablo"
      password = "pabloasw"
    });

    when('I fill the data with a taken username', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="confirmPassword"]', password);
      await expect(page).toClick('button', { text: 'Registrarme' })
    });

    then('A error message appears', async () => {
        await expect(page).toMatchElement("div", { text: "Nombre de usuario no disponible" });
    });
  });

  afterAll(async ()=>{
    browser.close()
  })
*/
});