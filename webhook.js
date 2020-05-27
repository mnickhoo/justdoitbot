/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

const TOKEN = process.env.TELEGRAM_TOKEN || '1174993784:AAF88wKCuFIsEi2ctayhbuwzKsED6AO_csI';
const url = 'https://b2673167.ngrok.io';
const port = 2020;

const TelegramBot = require('node-telegram-bot-api'); //use telegram API
const express = require('express');
const bodyParser = require('body-parser');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(bodyParser.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});
//add comment
// Just to ping!
bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, 'I am alive!');
});