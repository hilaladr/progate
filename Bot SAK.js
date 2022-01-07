const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const {Builder, By, Key, until} = require('selenium-webdriver');
const SESSION_FILE_PATH = './whatsapp-session.json';

async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    /* login */
    await driver.get('https://logbook.pajak.go.id/login');
    await driver.wait(until.titleIs('Logbook | Login'), 1000000);
    await driver.findElement(By.name('nip')).sendKeys('817932594', Key.TAB, 'Nicely112021', Key.RETURN);
    await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div[3]/div/div/div[1]/a/h3/u')).click();
    /* Isi SAK */
    var OK = await driver.findElement(By.xpath('/html/body/div[2]/div/div[3]/button[1]'));
    await driver.executeScript('arguments[0].click();', OK);
    await driver.wait(until.elementLocated(By.linkText('Selanjutnya')));
    /* Home SAK */
    var selanjutnya = await driver.findElement(By.linkText('Selanjutnya'));
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 1 */
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-1"]/div/div/div[1]/div[1]/label')).click();
    await driver.findElement(By.xpath('//*[@id="suhu"]/div[2]/label')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 2 */
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 3 */
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-3"]/div/div/div/div[15]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 4 */
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-4"]/div/div/div/div[7]/label')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 5 */
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-5"]/div/div/div/div[2]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 6 */
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-6"]/div/div/div/div[2]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 7 */
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-7"]/div/div/div/div[2]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 8 */
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-8"]/div/div/div/div[3]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 9 */
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-9"]/div/div/div/div[4]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 10 */
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-10"]/div[1]/div/div[1]/div[4]/label/p')).click();
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-10"]/div[2]/div/div/div/label')).click();
    await driver.findElement(By.xpath('//*[@id="form_self_assessment"]/div[3]/ul/li[3]/a')).click();
    await driver.wait(until.titleIs('Logbook2'), 1000000);
  } finally {
    await driver.quit();
  }
};

example();