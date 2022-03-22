const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until} = require('selenium-webdriver');
function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

async function BlmSak() {
    var time = new Date();
    var tgl = time.getUTCDate();
    console.log(tgl);
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        /* login */
        await driver.get('https://logbook.pajak.go.id/login');
        await driver.wait(until.titleIs('Logbook | Login'), 1000000);
        await driver.findElement(By.name('nip')).sendKeys('958631381', Key.TAB, 'Grizztif12', Key.RETURN);
        await driver.get(`https://logbook.pajak.go.id/ReviuSelfAssessmentKesehatanBaru/preview/202201${tgl}/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjQ0MDQyMjAwMDAi.IfJkTwx-ZIwttFF3NVcoihh14AwoaUqX-EuvK7fXoZQ`);
        await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div[2]/div[1]/div/div/div[2]/div/div[4]/div/div/div/span/a')).click();

        await driver.wait(until.titleIs('Logbook2'), 1000000);
    } finally {
        await driver.quit();
    }
};

BlmSak();