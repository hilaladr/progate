const { data } = require('cheerio/lib/api/attributes');
const { type } = require('express/lib/response');
const res = require('express/lib/response');
const puppeteer = require('puppeteer');
function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
};





(async function go() {

    async function next() {
        const elements = await page.$x('//*[@id="tabel-data_next"]/a');
        await elements[0].click();
    };

    var time = new Date();
    var tgl = time.getUTCDate();
    console.log(tgl);
    const browser = await puppeteer.launch({headless:false});
    var page = await browser.newPage();
    await page.goto('https://logbook.pajak.go.id/login');
    await page.waitForSelector('input[name="nip"]');
    await page.type('input[name="nip"]', '958631381');
    await page.type('input[name="password"]', 'Grizztif12');
    await page.click('button[type="submit"]');
    await page.goto(`https://logbook.pajak.go.id/ReviuSelfAssessmentKesehatanBaru/previewMonitoringBm/202201${tgl}/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjQ0MDQyMjAwMDAi.IfJkTwx-ZIwttFF3NVcoihh14AwoaUqX-EuvK7fXoZQ`);
    await sleep(3000);

    /* cek jumlah page */
    var f  = await page.$eval('.dataTables_info', el => el.innerText);
    var pagestr = await f.split(" ")[5];
    var pageint = Math.ceil((pagestr) / 10); /* hasil */

    /* tarik data tabel */
    let i = 0
    var datastr = "";
    while ( i < pageint) {
        console.log(i)
        var data1 = await page.$$eval('table tr td a', tds => tds.map((td) => { /* ambil data tabel */
            return td.innerText;
        }));
        datastr = await datastr.concat(data1);
        const elements = await page.$x('//*[@id="tabel-data_next"]/a');
        await elements[0].click();
        i++
    };
    var splitnama = await datastr.split(",");

    

    /* data.forEach(function (item, index){ /*print data
        console.log(item);
    }); */

    /* coba pake ceil buat ambil jumlah entry */
})();