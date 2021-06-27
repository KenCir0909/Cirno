require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ ws: { intents: Intents.ALL } });
const all_response = require('./dat/all_response.json');

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async message => {
  if (message.system || message.author.bot || !message.content.startsWith('チルノちゃん')) return;
  message.channel.startTyping();

  const response = all_response.find(response => response.reply && response.content.startsWith(message.content));

  if (!response) {
    sleep(2000).then(() => {
      message.reply('どうかした？');
      message.channel.stopTyping();
    });
  }
  else {
    sleep(Math.ceil(response.reply.length / 2) * 1000).then(() => {
      message.channel.send(response.reply.replace('{username}', `${message.author.username}くん`));
      message.channel.stopTyping();
    });
  }
})

/**
 * 
 * @param {number} time 
 * @returns 
 */

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason);
});

client.login();