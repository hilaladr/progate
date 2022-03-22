const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const {Builder, By, Key, until} = require('selenium-webdriver');
const SESSION_FILE_PATH = './whatsapp-session.json';
const cron = require('node-cron');
const chrome = require('selenium-webdriver/chrome');
const express = require('express');
const preventSleep = require("node-prevent-sleep");
const app = express();
const puppeteer = require('puppeteer');

let id = '817932594';
let pass = 'Nicely032021'



/* ====FUNGSI==== */
async function SAK() {
  let driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    /* login */
    await driver.get('https://logbook.pajak.go.id/login');
    await driver.wait(until.titleIs('Logbook | Login'), 1000000);
    await driver.findElement(By.name('nip')).sendKeys(id, Key.TAB, pass, Key.RETURN);
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

    await sleep(1000);
    var waktuisi = await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div/div/div/div[1]/div')).getText();
    console.log(waktuisi);
    return waktuisi;
  } 
  finally {
    await driver.quit();
  }
};
async function cek() {
  let driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    /* login */
    await driver.get('https://logbook.pajak.go.id/login');
    await driver.wait(until.titleIs('Logbook | Login'), 1000000);
    await driver.findElement(By.name('nip')).sendKeys(id, Key.TAB, pass, Key.RETURN);
    var nip = await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div[1]/div/table/tbody/tr[2]/td/b')).getText();
    var pm = 'Absen Masuk :'.concat(await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div[1]/div/table/tbody/tr[3]/td[3]/b')).getText());
    var pp = 'Absen Pulang :'.concat(await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div[1]/div/table/tbody/tr[4]/td[3]/b')).getText());
    var sak = 'SAK :'.concat(await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div[1]/div/table/tbody/tr[5]/td[3]/b')).getText());
  } 
  catch(err) {
    await driver.quit();
    await cek();
  }
  finally {
    await driver.quit();
    const hasil = await `${nip}\n${pm}\n${pp}\n${sak}`;
    await console.log(hasil);
    return hasil;
  }
};
function cekwaktu() {
  var time = new Date();
  var jam = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
  console.log(jam);
  return jam;
};
function getdate() {
  var time = new Date();
  var day = time.getDate();
    console.log(day.toString().length);
    if (day.toString().length == 1) {
        day = `0${day}`;
    };
  let bln = `${time.getFullYear()}0${time.getMonth()+1}${day}`
  console.log(bln);
  return bln
};
function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
};
async function blmsak() {

  var tgl = await getdate();
  const browser = await puppeteer.launch({headless:false});
  var page = await browser.newPage();
  try {
    await page.goto('https://logbook.pajak.go.id/login');
    await page.waitForSelector('input[name="nip"]');
    await page.type('input[name="nip"]', '958631381');
    await page.type('input[name="password"]', 'Grizztif2121');
    await page.click('button[type="submit"]');
    await page.goto(`https://logbook.pajak.go.id/ReviuSelfAssessmentKesehatanBaru/previewMonitoringBm/${tgl}/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjQ0MDQyMjAwMDAi.IfJkTwx-ZIwttFF3NVcoihh14AwoaUqX-EuvK7fXoZQ`);
    await console.log(`https://logbook.pajak.go.id/ReviuSelfAssessmentKesehatanBaru/previewMonitoringBm/${tgl}/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjQ0MDQyMjAwMDAi.IfJkTwx-ZIwttFF3NVcoihh14AwoaUqX-EuvK7fXoZQ`);
    await sleep(5000);
    /* cek jumlah page */
    var f  = await page.$eval('.dataTables_info', el => el.innerText);
    var pagestr = await f.split(" ")[5];
    var pageint = await Math.ceil((pagestr) / 10); /* hasil */
    /* tarik data tabel */
    let i = 0
    var datastr = "";
    while ( i < pageint) { /*loop untuk gabung data masing2 page */
        console.log(i)
        await sleep(1000);
        var data1 = await page.$$eval('table tr td a', tds => tds.map((td) => { /* ambil data tabel */
            return td.innerText;
        }));
        datastr = await datastr.concat(data1,'\n'); /*gabung data tabel masing- page */
        const elements = await page.$x('//*[@id="tabel-data_next"]/a'); /*click next kalo lebih dari satu page */
        await elements[0].click();
        i++
    };
    var myStr = await datastr.replace(/,/g, '\n'); /* replace , dengan \n */
    return myStr
  } finally {
    await browser.close();
    if (myStr == undefined ) {
      await blmsak();
    }
  }
  /* coba pake ceil buat ambil jumlah entry */
};

/* ============= */

let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr);
});
client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});
client.on('ready', () => {

  console.log('Client is ready!');


  // Number where you want to send the message.
  var number = "+6282155661205"
  var adam = "+6285158583277"
  // Your message.
  var text = "Hey john";
  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  var chatId = number.substring(1) + "@c.us";
  var chatId2 = adam.substring(1) + "@c.us";

  // Sending message.
  cron.schedule('00 05 09 * * *', async () => { //SAK
    await console.log('fungsi SAK berjalan')
    var waktuisi = await SAK()
    await client.sendMessage(chatId, waktuisi);
  });
  cron.schedule('00 30 18 * * *', async () => { //cek absen/SAK
    await console.log('fungsi cek berjalan')
    var hasil = await cek()
    await client.sendMessage(chatId, hasil);
  });
  cron.schedule('00 00 12 * * *', async () => { //blm SAK
    await console.log('fungsi blmsak berjalan')
    var myStr = await blmsak();
    await client.sendMessage(chatId2, `List nama belum SAK: \n\n${myStr}\n\nSilahkan segera isi https://logbook.pajak.go.id/login `);
    await console.log(`List nama belum SAK hari ini : \n\n${myStr}\n\nSilahkan segera isi https://logbook.pajak.go.id/login `)
  });

});
client.on('message', msg => { /*fungsi utama di chat WA */
  if (msg.body == '!SAK') {
    var jam = cekwaktu();
    SAK();
    console.log(`${jam} fungsi isi SAK berjalan`)
    msg.reply('pong');
  } else if (msg.body == '!cek'){
    (async () => {
      var jam = cekwaktu();
      console.log(`${jam} fungsi cek berjalan`)
      const hasil = await cek();
      while (hasil == "undefined") {
        console.log('hasil undefined');
      }
      await msg.reply(`${hasil}`);
    })();
    /* msg.reply(`${hasil}`);*/
  } else if (msg.body == '!blmsak'){
    (async () => {
      var jam = cekwaktu();
      console.log(`${jam} fungsi blmsak berjalan`)
      const myStr = await blmsak();
      while (myStr == "undefined") {
        await console.log('hasil undefined');
      }
      await msg.reply(`List nama belum SAK: \n\n${myStr}\n\nSilahkan segera isi https://logbook.pajak.go.id/login `);
      await console.log(myStr)
    })();
  }
});

client.initialize();

setInterval(cekwaktu, 60000);



app.get('/', function (req, res) {
  res.send('hello world')
});

preventSleep.enable();