const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const io = require('socket.io')
const fs = require('fs');
const schedule = require('node-schedule')
const express = require('express');
const app = express();

function run() {
    const date = new Date();
    var jam = date.getHours();
    console.log(jam);
}

setInterval(run, 1000);

app.get('/', (req,res) => {
    res.sendFile('index.html', {root: __dirname});
});

const SESSION_FILE_PATH = './whatsapp-session.json';
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
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    client.sendMessage(6281255661205, 'halo 123')

    if (msg.body === '!ping reply') {
        // Send a new message as a reply to the current one
        msg.reply('pong');

    } else if (msg.body === '!ping') {
        // Send a new message to the same chat
        client.sendMessage(msg.from, 'pong');

    } else if (msg.body.startsWith('!sendto ')) {
        // Direct send a new message to specific id
        let number = msg.body.split(' ')[1];
        let messageIndex = msg.body.indexOf(number) + number.length;
        let message = msg.body.slice(messageIndex, msg.body.length);
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        let chat = await msg.getChat();
        chat.sendSeen();
        client.sendMessage(number, message);
    };
});

client.initialize();
app.listen(8000);