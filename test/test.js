//test.js
//all tests - for now

let { Builder, By, Key, until } = require('selenium-webdriver');
let chai = require('chai');
let chaiHTTP = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHTTP);

//only run tests on Chrome for simplicity

describe('login', function() {

  this.timeout(10000);
  const driver = new Builder().forBrowser('chrome').build();

  it('should render a page when /login is accessed', function(done) {
    chai.request(server)
      .get('/login')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });
  it('when email is blank, password is filled in, should return blank login page', async function(done) {
    
    await driver.get('localhost:5000/login');
    //enter password
    await driver.findElement(By.name('pwd')).sendKeys('11111111aA', Key.ENTER);
    //check fields in result /login
    const emailField = await driver.findElement(By.name('uname')).getAttribute('value');
    const passField = await driver.findElement(By.name('pwd')).getAttribute('value');
    await server.close();
    emailField.should.equal('');
    passField.should.equal('');

    done();
  });
  it('should not login when email is non-blank, password is blank');
  it('should not login when email is blank and password is blank');
  it('should not login when email is valid and password is incorrect');
  it('should not login when email is valid and password is blank');
  it('should not login when email is incorrect and password matches that of a known user');
  it('should not login when email is blank and password matches that of a known user');
  it('should login as an organizer when email exists, password is correct of an organizer user');
  it('should login as an attendee when email exists, password is correct of an attendee user');

  after(async function() { driver.quit(); });

});
