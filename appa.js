const {Builder, By, Key, until} = require('selenium-webdriver');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://logbook.pajak.go.id/logij');
    await driver.wait(until.titleIs('Logboosk | Login'), 1000);
    await driver.findElement(By.name('nip')).sendKeys('817932594', Key.TAB, 'Nicely112021', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000000);
  } catch {
    await driver.quit();
    console.log('error terjadi');
  }
};

example();