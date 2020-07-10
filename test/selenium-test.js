//selenium-test.js
//selenium-focused (browser/UI) tests

//only run tests on Chrome for simplicity
let { Builder, By, Key, until } = require('selenium-webdriver');

const driver = new Builder().forBrowser('chrome').build();

driver.quit();
