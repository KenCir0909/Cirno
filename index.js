require('dotenv').config();
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ ws: { intents: Intents.ALL } });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content === 'チルノちゃん大好き！') {
    return message.channel.send(`あたいも大好きだよ！ ${message.author}`);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason);
  client.users.cache.get('714455926970777602').send(
    new MessageEmbed()
      .setDescription('エラー内容:\n```' + reason + '```')
      .setColor('RANDOM')
      .setTimestamp()
  );
});

client.login();