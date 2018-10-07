const Discord = require('discord.js');
const client = new Discord.Client();
const sql = require("sqlite");
sql.open("./altin.sqlite");


exports.run = (client, message, args) => {
	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.7 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.channel.send({embed: {
          author: {
            name: (message.author.username),
            icon_url: message.author.avatarURL
          },
          "image": {
            url:"http://img5.mynet.com/ha6/a/altin.jpg"},
          color: 0xD97634,
          title: "Yağsın Altınlar !",
          description: `:up: 1 gram Altın kazandınız ! :tada:\n:anchor: Altın Gramınız : **${curLevel}g**`
        }});
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });
  message.channel.send(":white_check_mark: Verileriniz kaydedildi ! Altın sistemi çalışıyor ...");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['s', 'konuş', 'sohbet', 'ask'],
  permLevel: 0
};

exports.help = {
  name: 'altın-kontrol',
  description: 'Altınları gösterir.',
  usage: 'altın-kontrol'
};
