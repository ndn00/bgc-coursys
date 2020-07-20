//selenium-test.js
//selenium-focused (browser/UI) tests

//only run tests on Chrome for simplicity
let { Builder, By, Key, until } = require('selenium-webdriver');
let chai = require('chai');
let expect = chai.expect;

const loginURL = 'https://cmpt276-bgc-coursys.herokuapp.com/login';
const logoutURL = 'https://cmpt276-bgc-coursys.herokuapp.com/logout';
const localLogin = 'localhost:5000/login';
const localLogout = 'locatlhost:5000/logout';

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
    const errorMessage = await driver.findElement(By.css("p")).getText();
    const curURL = await driver.getCurrentUrl();

    expect(curURL).to.equal('https://cmpt276-bgc-coursys.herokuapp.com/loginfail');
    expect(failEmailField).to.equal('');
    expect(failPassField).to.equal('');
    expect(errorMessage).to.equal('Authentication error (incorrect email or password).');

  });
  it('should return the authentication error page with empty email and something in password field', async function() {
    await driver.get(loginURL);
    await driver.sleep(2000);
    await driver.findElement(By.name('pwd')).sendKeys('v3ryStr0ngPa55');
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
  it('should return the authentication error page with incorrect email and incorrect password', async function() {
    await driver.get(loginURL);
    await driver.sleep(2000);
    await driver.findElement(By.name('uname')).sendKeys('invalidEmail@bgcengineering.ca');
    await driver.findElement(By.name('pwd')).sendKeys('v3ryStr0ngPa55');
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
  it('should return the landing page (/organizer/main) for a correctly authenticated organizer user', async function() {
    await driver.get(loginURL);
    await driver.sleep(2000);
    await driver.findElement(By.name('uname')).sendKeys('test-organizer@bgcengineering.ca');
    await driver.findElement(By.name('pwd')).sendKeys('teamBPtestpassword1');
    await driver.findElement(By.id('loginSubmit')).click();
    const curURL = await driver.getCurrentUrl();

    expect(curURL).to.equal('https://cmpt276-bgc-coursys.herokuapp.com/organizer/main');
    await driver.get(logoutURL);
  });
  it('should return the landing page (/main) for a correctly authenticated attendee user', async function() {
    await driver.get(loginURL);
    await driver.sleep(2000);
    await driver.findElement(By.name('uname')).sendKeys('test-attendee@bgcengineering.ca');
    await driver.findElement(By.name('pwd')).sendKeys('11111111aA');
    await driver.findElement(By.id('loginSubmit')).click();
    const curURL = await driver.getCurrentUrl();

    expect(curURL).to.equal('https://cmpt276-bgc-coursys.herokuapp.com/main');
    await driver.get(logoutURL);
  });
  it('should return the login page after logging out');


  after(async () => driver.quit());

});


describe('local-main', function() {
  //for localhost testing, timing should be more restrictive
  this.timeout(10000);
  const driver = new Builder().forBrowser('chrome').build();

  it('sidebar should contain four elements for attendee user', async function() {
    await driver.get(localLogin);
    await driver.sleep(1000);
    await driver.findElement(By.name('uname')).sendKeys('test-attendee@bgcengineering.ca');
    await driver.findElement(By.name('pwd')).sendKeys('11111111aA');
    await driver.findElement(By.id('loginSubmit')).click();

    const links = driver.findElements(By.className('nav-item'));

    expect(links.length).to.equal(4);
    await driver.get(localLogout);

  });
  it('sidebar should contain four elements for organizer user' async function() {
    await driver.get(localLogin);
    await driver.sleep(1000);
    await driver.findElement(By.name('uname')).sendKeys('test-organizer@bgcengineering.ca');
    await driver.findElement(By.name('pwd')).sendKeys('teamBPtestpassword1');
    await driver.findElement(By.id('loginSubmit')).click();
    const links = driver.findElements(By.className('nav-item'));

    expect(links.length).to.equal(4);
    await driver.get(localLogout);
  });
  it('on organizer nav, clicking second button should return to /organizer/main', async function() {
    await driver.get(localLogin);
    await driver.sleep(1000);
    await driver.findElement(By.name('uname')).sendKeys('test-organizer@bgcengineering.ca');
    await driver.findElement(By.name('pwd')).sendKeys('teamBPtestpassword1');
    await driver.findElement(By.id('loginSubmit')).click();
    await driver.findElement(By.id('returnToMain')).click();
    const curURL = await driver.getCurrentUrl();

    expect(curURL).to.equal('localhost:5000/organizer/main');

    await driver.get(localLogout);
  });

  it('on organizer nav, clicking third button should go to /organizer/allusers (user config page)', async function() {
    await driver.get(localLogin);
    await driver.sleep(1000);
    await driver.findElement(By.name('uname')).sendKeys('test-organizer@bgcengineering.ca');
    await driver.findElement(By.name('pwd')).sendKeys('teamBPtestpassword1');
    await driver.findElement(By.id('loginSubmit')).click();
    await driver.findElement(By.id('allusers')).click();
    const curURL = await driver.getCurrentUrl();

    expect(curURL).to.equal('localhost:5000/organizer/allusers');

    await driver.get(localLogout);


  });
  it('on attendee nav, clicking second button should return to /main', async function() {
    await driver.get(localLogin);
    await driver.sleep(1000);
    await driver.findElement(By.name('uname')).sendKeys('test-attendee@bgcengineering.ca');
    await driver.findElement(By.name('pwd')).sendKeys('11111111aA');
    await driver.findElement(By.id('loginSubmit')).click();
    await driver.findElement(By.id('attendeeMain')).click();
    const curURL = await driver.getCurrentUrl();

    expect(curURL).to.equal('localhost:5000/organizer/allusers');

    await driver.get(localLogout);
  });
  //logout functionality tested above

  after(async () => driver.quit());
});

describe('local-courses', function() {
  //for localhost testing, timing should be more restrictive
  this.timeout(10000);
  const driver = new Builder().forBrowser('chrome').build();

  //course creation
  describe('local-course-creation', function() {
    it('Attendees should get a 401 Unauthorized status if they try to create a course', async function() {
      await driver.get(localLogin);
      await driver.sleep(1000);
      await driver.findElement(By.name('uname')).sendKeys('test-attendee@bgcengineering.ca');
      await driver.findElement(By.name('pwd')).sendKeys('11111111aA');
      await driver.findElement(By.id('loginSubmit')).click();
      await driver.get('localhost:5000/courses/new');
      const message401 = driver.findElement(By.class('pre')).getText();

      expect(message401).to.equal('Unauthorized');
      await driver.get(localLogout);
    })
    it('Creating a session in the past should prompt an alert', async function() {
      await driver.get(localLogin);
      await driver.sleep(1000);
      await driver.findElement(By.name('uname')).sendKeys('test-organizer@bgcengineering.ca');
      await driver.findElement(By.name('pwd')).sendKeys('teamBPtestpassword1');
      await driver.findElement(By.id('loginSubmit')).click();
      await driver.get('localhost:5000/courses/new');
    });
    it('Creating sessions out of chronological order should prompt an alert');
    it('Creating sessions with overlapping times should prompt an alert');
    it('Creating sessions with the end time before the start time should prompt an alert');
    it('Setting the registration deadline in the past should prompt an alert');
    it('Setting the registration deadline after the first session should prompt an alert');
    it('Successfully creating a new course will redirect back to the organizer main');
  });
  //course access
  describe('local-course-access', function() {
    it('Users must be logged in to access a course path');
    it('Accessing a non-existent course will return a status code')
    it('For a valid course, the title must show up');
    it('For a valid course, the topic must be present');
    it("For a valid course, the location must be present");
    it("For a valid course, the maximum number of seats must be present");
    it("For a valid course, the registration deadline must be present");
    it("For a valid course, there should be at least one session with indicated date, start, and end times")
  });

  //course editing
  describe('local-course-editing', function() {

  });

  after(async () => driver.quit());
});
