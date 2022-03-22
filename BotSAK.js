const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const {Builder, By, Key, until} = require('selenium-webdriver');
const SESSION_FILE_PATH = './whatsapp-session.json';
const cron = require('node-cron');
const chrome = require('selenium-webdriver/chrome');

async function SAK() {
  let driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
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
    await sleep(1000);
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-1"]/div/div/div[1]/div[1]/label')).click();
    await driver.findElement(By.xpath('//*[@id="suhu"]/div[2]/label')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 2 */
    await sleep(1000);
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 3 */
    await sleep(1000);
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-3"]/div/div/div/div[15]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 4 */
    await sleep(1000);
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-4"]/div/div/div/div[7]/label')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 5 */
    await sleep(1000);
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-5"]/div/div/div/div[2]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 6 */
    await sleep(1000);
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-6"]/div/div/div/div[2]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 7 */
    await sleep(1000);
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-7"]/div/div/div/div[2]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 8 */
    await sleep(1000);
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-8"]/div/div/div/div[3]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 9 */
    await sleep(1000);
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-9"]/div/div/div/div[4]/label/p')).click();
    await driver.executeScript('arguments[0].click();', selanjutnya);
    /* page 10 */
    await sleep(1000);
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-10"]/div[1]/div/div[1]/div[4]/label/p')).click();
    await driver.findElement(By.xpath('//*[@id="form_self_assessment-p-10"]/div[2]/div/div/div/label')).click();
    await driver.findElement(By.xpath('//*[@id="form_self_assessment"]/div[3]/ul/li[3]/a')).click();
  } 
  finally {
    await sleep(1000);
    var waktuisi = await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div/div/div/div[1]/div')).getText();
    console.log(waktuisi);
    await driver.quit();
    return waktuisi;
  }
};

async function cek() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    /* login */
    await driver.get('https://logbook.pajak.go.id/login');
    await driver.wait(until.titleIs('Logbook | Login'), 1000000);
    await driver.findElement(By.name('nip')).sendKeys('817932594', Key.TAB, 'Nicely112021', Key.RETURN);
    var nip = await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div[1]/div/table/tbody/tr[2]/td/b')).getText();
    var pm = 'Absen Masuk :'.concat(await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div[1]/div/table/tbody/tr[3]/td[3]/b')).getText());
    var pp = 'Absen Pulang :'.concat(await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div[1]/div/table/tbody/tr[4]/td[3]/b')).getText());
    var sak = 'SAK :'.concat(await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div[1]/div/table/tbody/tr[5]/td[3]/b')).getText());
  } finally {
    await driver.quit();
    const hasil = `${nip}\n${pm}\n${pp}\n${sak}`;
    console.log(hasil);
    return hasil;
  }
};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function cekwaktu() {
  console.clear();
  var time = new Date();
  var jam = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
  console.log(jam);
  return jam;
};

SAK();
