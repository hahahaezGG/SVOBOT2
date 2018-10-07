const Discord = require('discord.js');
const client = new Discord.Client();
const sql = require("sqlite");
sql.open("./altin.sqlite");


exports.run = (client, message, args) => {
  
  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Hiç bir altınınız yok kazanılması çok zordur.");
	  const embed = new Discord.RichEmbed()
  .setTitle("Benim Altınlarım")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor(0xD97634)
  .setDescription(`:ok_hand: Altınlarınız : **${row.level} gram**`)
  .setThumbnail("https://static.seekingalpha.com/uploads/2016/3/15/21742851-14581001171396093_origin.jpg");
		message.channel.send({embed});
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['s', 'konuş', 'sohbet', 'ask'],
  permLevel: 0
};

exports.help = {
  name: 'altınlarım',
  description: 'Altınları gösterir.',
  usage: 'altınlarım'
};
