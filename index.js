require('dotenv').config();
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ ws: { intents: Intents.ALL } });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
})

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content === 'チルノちゃん大好き！') {
    return message.channel.send(`あたいも大好きだよ！ ${message.author}`);
  }
})

client.on('guildMemberAdd', member => {
  if (member.guild.id !== '794380572323086358') return;
  if (member.user.bot) return member.roles.add('794410823564918835');
  client.channels.cache.get('811254308989042789').send(`${member} よおこそ`);
  client.channels.cache.get('794380572931391511').send(
    new MessageEmbed()
      .setTitle('ユーザー参加情報')
      .addField('User名', member.user.tag)
      .addField('UserID', member.user.id)
      .addField('垢作ってから経った日数', Math.round((Date.now() - member.user.createdAt) / 86400000))
      .setColor('RANDOM')
      .setTimestamp()
  );
})

client.on('guildMemberRemove', member => {
  if (member.guild.id !== '794380572323086358') return;
  if (member.user.bot) return;
  client.channels.cache.get('811254308989042789').send(`${member.user.tag} さよなら`);
  client.channels.cache.get('794380572931391511').send(
    new MessageEmbed()
      .setTitle('ユーザー退出情報')
      .addField('User名', member.user.tag)
      .addField('UserID', member.user.id)
      .addField('垢作ってから経った日数', Math.round((Date.now() - member.user.createdAt) / 86400000))
      .addField('参加してた日数', Math.round((Date.now() - member.joinedAt) / 86400000))
      .setColor('RANDOM')
      .setTimestamp()
  )
})

client.on('guildBanAdd', (guild, user) => {
  if (guild.id !== '794380572323086358') return;
  client.channels.cache.get('794380572931391511').send(`${user.tag}がBanされました`);
})

client.on('guildBanRemove', (guild, user) => {
  if (guild.id !== '794380572323086358') return;
  client.channels.cache.get('794380572931391511').send(`${user.tag}のBanが解除されました`);
})

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason);
  client.users.cache.get('714455926970777602').send(
    new MessageEmbed()
      .setDescription(`エラー内容: ${reason}`)
      .setColor('RANDOM')
      .setTimestamp()
  );
});

client.login();