const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/register-form.feature');
const DatabaseManager = require('../DatabaseManager.js');

let dbManager;
let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 1 });
    page = await browser.newPage();
    const dbConfig={
      host:'localhost',
      user:'root',
      password:'',
      port:3306,
      database:'mariadb'
    }
    dbManager=new DatabaseManager(dbConfig);
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })
  });
  beforeEach(async()=>{
    await page
        .goto("http://localhost:80/register", {
          waitUntil: "networkidle0",
        })
        .catch(() => {});
  })
  afterEach(async()=>{
    await page.waitForSelector('[data-testid="logout"]');
    const logoutButton = await page.$('[data-testid="logout"]');
    await logoutButton.click();
  })

  afterAll(async ()=>{
    browser.close()
    await dbManager.close();
  })
  test('The user is not registered in the site', ({given,when,then}) => {
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "a)UAN)DVyAS$&CE"
      password = "pasl98AUC(/Avhb)ha/AD&CA&(COAw"
      const result = await dbManager.query(`DELETE FROM users WHERE name = '${username}'`)
      await expect(page).toClick("a", { text: "¿No tienes una cuenta? Regístrate" });
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="confirmPassword"]', password);
      await expect(page).toClick('button', { text: 'Registrarme' })
    });

    then('A confirmation message should be shown in the screen', async () => {
      const xpath = '/html/body/div[1]/div/main/main/div/div[1]/h2';
      await page.waitForXPath(xpath, { visible: true });
      const element = await page.$x(xpath)
      expect(await element.evaluate(el=>el.innerText)).toBe('Home');
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
      username = await dbManager.query('SELECT NAME FROM Users LIMIT 1')
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
});