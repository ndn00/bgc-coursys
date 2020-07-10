//selenium-test.js
//selenium-focused (browser/UI) tests

//only run tests on Chrome for simplicity
let { Builder, By, Key, until } = require('selenium-webdriver');
let chai = require('chai');
let expect = chai.expect;

const loginURL = 'https://cmpt276-bgc-coursys.herokuapp.com/login';

describe('login-interactions', function() {
  //set timeout to be longer to account for internet issues
  //especially as starting the Heroku dyno may take a while

  this.timeout(60000);
  const driver = new Builder().forBrowser('chrome').build();

  it('/login should return an empty email (username) field', async function() {
    await driver.get(loginURL);
    await driver.sleep(2000);
    const loginField = await driver.findElement(By.name('uname')).getAttribute('value');

    expect(loginField).to.equal('');

  });
  it('/login should return an empty password field', async function() {
    await driver.get(loginURL);
    await driver.sleep(2000);
    const passwordField = await driver.findElement(By.name('pwd')).getAttribute('value');

    expect(passwordField).to.equal('');
  })
  it('should return the authentication error page with an empty password and empty email field', async function() {
    await driver.get(loginURL);
    await driver.sleep(2000);
    await driver.findElement(By.id('loginSubmit')).click();
    const failEmailField = await driver.findElement(By.name('uname')).getAttribute('value');
    const failPassField = await driver.findElement(By.name('pwd')).getAttribute('value');
    const errorMessage = await driver.findElement(By.css("p")).getText();
    const curURL = await driver.getCurrentUrl();

    expect(curURL).to.equal('https://cmpt276-bgc-coursys.herokuapp.com/loginfail');
    expect(failEmailField).to.equal('');
    expect(failPassField).to.equal('');
    expect(errorMessage).to.equal('Authentication error (incorrect email or password).');

  });
  it('should return the authentication error page with valid-formatted but not-in-database email and empty password', async function() {
    await driver.get(loginURL);
    await driver.sleep(2000);
    await driver.findElement(By.name('uname')).sendKeys('notAValid@Email');
    await driver.findElement(By.id('loginSubmit')).click();
    const failEmailField = await driver.findElement(By.name('uname')).getAttribute('value');
    const failPassField = await driver.findElement(By.name('pwd')).getAttribute('value');


    expect(failEmailField).to.equal('');
    expect(failPassField).to.equal('');

  });
  it('should return the authentication error page with empty email and something in password field');

  after(async () => driver.quit());

});
