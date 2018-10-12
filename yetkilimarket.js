const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Komutlar")
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**» Yetkili Market **", `\n!vipal Bu Komutu Kullanarak Vip Adlı Yetkiyi Satın Alırsınız `)
  .setFooter('Yetkili Market')
  
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkimarket', 'yetkilimarketi', 'ymarket', 'ym'],
  permLevel: 0
};

exports.help = {
  name: 'yetkimarketi',
  description: 'Yetkili Market.',
  usage: 'yetkimarketi'
};
