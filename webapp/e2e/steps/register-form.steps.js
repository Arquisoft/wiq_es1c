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
    await page.setRequestInterception(true);
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })
  });
  beforeEach(async()=>{
    await page
        .goto("http://localhost:3000/register", {
          waitUntil: "networkidle0",
        })
        .catch(() => {});
  })
  afterAll(async ()=>{
    browser.close()
  })
  test('The user is not registered in the site', ({given,when,then}) => {
    let username;
    let password;
    page.on('request',interceptedRequest=>{
      if(interceptedRequest.url()==='http://localhost:3000'){
        interceptedRequest.respond({
          status: 200,
          contentType: 'JSON',
          body: 'Respuesta simulada'
        });
      }else{
        interceptedRequest.continue();
      }
    });

    given('An unregistered user', async () => {
      username = "a)UAN)"
      password = "pasl98AUC(/Avhb)h"
    });
    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="confirmPassword"]', password);
      await expect(page).toClick('button', { text: 'Registrarme' })
    });

    then('A confirmation message should be shown in the screen', async () => {
      const xpath = '/html/body/div[1]/div/main/main/div/div[1]/h2';
      const element = await page.waitForXPath(xpath, { visible: true });
      //const element = await page.$(xpath) -> $ sirve para seleccionar elementos por ids, selectors y xpath para xpath
      const text = await page.evaluate(e => e.innerText, element);
      expect(text).toBe('Home');
      //HACE LOGOUT DE LA APLICACION
      const logoutButton = await page.waitForSelector('[data-testid="logout"]');
      //const logoutButton = await page.$('[data-testid="logout"]'); -> waitforselector espera a que cargue el elemento
      await logoutButton.click();
    });
  })

  test('The user puts two different passwords', ({given,when,then}) => {
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "pablp"
      password = "pabloasw"
    });

    when('I fill the data with different passwords in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="confirmPassword"]', password + 'imdifferent');
      await expect(page).toClick('button', { text: 'Registrarme' })
    });

    then('A error message appears', async () => {
        await expect(page).toMatchElement('#confirmPassword-helper-text');
    });
  });
  test('The user uses an already taken username', ({given,when,then}) => {
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "a)UAN)"
      password = "pabloaswethrjeyj"
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
});