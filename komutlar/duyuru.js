  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'VIP');
  if (!modlog) return message.reply('`log` **kanalını bulamıyorum.**').catch(console.error);
  if (!muteRole) return message.reply('`VIP` **adlı bir rol bulamıyorum.**').catch(console.error);
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Gerekli izinlere sahip değilim.').catch(console.error);

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Özeline Bir Göz At :postbox: ');
    message.channel.sendEmbed(ozelmesajkontrol) }
	const pingozel = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setAuthor(message.author.username, message.author.avatarURL)
  .addField("**VIP Satin Aldiniz**", )
    return message.author.sendEmbed(pingozel)

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      guild.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      guild.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
	  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'vipal',
  description: 'VIP Yetkisi Alırsınız.',
  usage: 'vipal'
};
