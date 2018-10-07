const Discord = require('discord.js');
const client = new Discord.Client();
const sql = require("sqlite");
sql.open("./altin.sqlite");


exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (message.channel.type !== "text") return;

  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.7 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });

  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "altınlarım")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Hiç bir altınınız yok kazanılması çok zordur.");
      message.channel.send({embed: {
        author: {
          name: (message.author.username),
          icon_url: message.author.avatarURL
        },
        color: 0xD97634,
        title: "Benim Seviyem",
        description: `:ok_hand: Altınlarınız : **${row.level}**`
      }});
    });
  } else

  if (message.content.startsWith(prefix + "puanım")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply(":expressionless: Hiç puanın yok !");
      message.channel.send({embed: {
        author: {
          name: (message.author.username),
          icon_url: message.author.avatarURL
        },
        color: 0xD97634,
        title: "Puanlarım",
        description: `:yum: Şuan **${row.points}** puanın var`
      }});
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['s', 'konuş', 'sohbet', 'ask'],
  permLevel: 0
};

exports.help = {
  name: 'altın',
  description: 'Altınları gösterir.',
  usage: 'altın'
};
