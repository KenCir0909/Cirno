require('dotenv').config();
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ ws: { intents: Intents.ALL }});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
})

client.on('message', async message => {
  if(message.author.bot) return;
  if (message.content === 'チルノ大好き！') {
    return message.channel.send('あたいも大好きだよ！ <@'+message.author.id+'>');
  }
})

client.on('guildMemberAdd', member => {
    if(member.guild.id !== '794380572323086358') return;
    if(member.user.bot) return member.roles.add('794410823564918835');
    client.channels.cache.get('794380572931391511').send(`${member}よおこそ`);
})

client.on('guildMemberRemove', member => {
    if(member.guild.id !== '794380572323086358') return;
    if(member.user.bot) return;
    client.channels.cache.get('794380572931391511').send(`${member}さよなら`);
})

process.on('unhandledRejection', error => {
  client.users.cache.get('714455926970777602').send(
    new MessageEmbed()
    .setDescription('エラー内容\n```'+error+'```')
    .setColor('RANDOM')
    .setTimestamp()
  );
  console.error(`[ERROR!]\n${error}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);