const botconfig = require("./botconfig.json");
const color = require("./color.json");
const Discord = require("discord.js");
const Fortnite = require("fortnite");
const fortnite1 = new Fortnite("7e6f8fae-d645-41cd-940f-47447c537230");



const bot = new Discord.Client({disableEveryone: true});



bot.on("ready", async () => {
  console.log(`Bot is Online!`);
bot.user.setActivity(`Faded | /help`, {type: "WATCHING"});
});

// Updates the bot's status if he joins a server
bot.on("guildCreate", guild => {
bot.user.setActivity(`Faded | /help`, {type: "WATCHING"});
});

/// Updates the bot's status if he leaves a servers
bot.on("guildDelete", guild => {
bot.user.setActivity(`Faded | /help`, {type: "WATCHING"});
});

//welcome join
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', '👋welcome👋');
  if (!channel) return;
  channel.send(`ברוך הבא לשרת של Faded! ${server}, ${member}`);
});

//welcome left
bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', '👋welcome👋');
  if (!channel) return;
  channel.send(`${member}, יצא מהשרת של Faded`);
});

      

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


if(cmd === `${prefix}say`){

  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  let botmessage = args.join(" ");
  message.channel.send(botmessage);
}

if(cmd === `${prefix}pay`){

if(!coins[message.author.id]){
  return message.reply("You don't have any coins!")
}

let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

if(!coins[pUser.id]){
  coins[pUser.id] = {
    coins: 0
  };
}

let pCoins = coins[pUser.id].coins;
let sCoins = coins[message.author.id].coins;

if(sCoins < args[0]) return message.reply("Not enough coins there!");

coins[message.author.id] = {
  coins: sCoins - parseInt(args[1])
};

coins[pUser.id] = {
  coins: pCoins + parseInt(args[1])
};

message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`);

fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if(err) cosole.log(err)
});


}
if(cmd === `${prefix}coins`){

if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

let uCoins = coins[message.author.id].coins;


let coinEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#00FF00")
.addField("💸", uCoins);

message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});

}
if(cmd === `${prefix}level`){

if(!xp[message.author.id]){
  xp[message.author.id] = {
    xp: 0,
    level: 1
 };
}
 let curxp = xp[message.author.id].xp;
 let curlvl = xp[message.author.id].level;
 let nxtLvlXp = curlvl * 300;
 let difference = nxtLvlXp - curxp;

 let lvlEmbed = new Discord.RichEmbed()
 .setAuthor(message.author.username)
 .setColor(purple)
 .addField("Level", curlvl, true)
 .addField("XP", curxp, true)
 .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

 message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}


  if(cmd === `${prefix}report`){

    //!report @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("/report [user] [reason]");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#ffdc00")
    .addField("User", `${rUser}`)
    .addField("Staff", `${message.author}`)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return message.channel.send("Couldn't find channel called `logs`");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}warn`){

    //!warn @user this is the reason
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("/warn [user] [reason]");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Warnings")
    .setColor("#1b8fbd")
    .addField("User", `${rUser}`)
    .addField("Staff", `${message.author}`)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return message.channel.send("Couldn't find channel called `logs`");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}yt`){

    message.reply("SheepGamers | https://www.youtube.com/channel/UCgDszuAQuRv0QuwYbnGbWbw")
  }

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}fts`){
  const provideusername = new Discord.RichEmbed()
  .addField(`Fortnite Tracker Lifetime Stats - Season 5`, "Error! Please provide a username.")
  .setColor("#36393F")

  let username = args[0];
  let platform = args[1] || 'pc';

  if(!username) return message.channel.send(provideusername)

  let data = fortnite.user(username, platform).then(data => {
      console.log(data);
      let stats = data.stats;
      let lifetime = stats.lifetime;
      console.log(lifetime);

      let score = lifetime[6]['Score'];
      let mplayed = lifetime[7]['Matches Played'];
      let wins = lifetime[8]['Wins'];
      let winper = lifetime[9]['Win%'];
      let kills = lifetime[10]['Kills'];
      let kd = lifetime[11]['K/d'];

      let embed = new Discord.RichEmbed()
      .setTitle("Fortnite Tracker Lifetime Stats")
      .setAuthor(data.username)
      .setColor("#36393F")
      .addField("Wins", wins, true)
      .addField("Kills", kills, true)
      .addField("Score", score, true)
      .addField("Matches Played", mplayed, true)
      .addField("Win Percentage", winper, true)
      .addField("Kill/Death Ratio", kd, true)

      message.channel.send(embed);
  });
}



  if(cmd === `${prefix}membercount`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("**Member Count**")
    .setColor("#eb8f1b")
    .setThumbnail(sicon)
    .addField("Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if (cmd === `${prefix}poll`){
 		message.delete()
  let question = args.slice(0).join(" ");

  if (args.length === 0)
  return message.reply('Invalid Format: <poll <Question>')

  const embed = new Discord.RichEmbed()
  .setTitle("A Poll Has Been Started!")
  .setColor("#5599ff")
    .setDescription(`${question}`)
    .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)
  const pollTopic = await message.channel.send({embed});
  await pollTopic.react(`ג…`);
  await pollTopic.react(`ג`);
  const filter = (reaction) => reaction.emoji.name === 'ג…';
  const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
  collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
  collector.on('end', collected => console.log(`Collected ${collected.size} items`));
}


    if(cmd === `${prefix}clear`){

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have the Permission `MANAGE_MESSAGES`");
  if(!args[0]) return message.channel.send("<clear [amount of messages]");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`:white_check_mark: Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}
  
  
  if (cmd === `${prefix}creator`){
    let botembed = new Discord.RichEmbed()
    .setDescription("Creators of the Bot")
    .setColor("#ff9f04")
    .addField("\nCreators","<@354952398772371458>")

    return message.channel.send(botembed);
}

  if(cmd === `${prefix}help`){
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Help Commands")
    .setColor("#268ccf")
    .setThumbnail(bicon)
    .addField("Moderation Commands","/clear - clear the chat\n/mute (user) - mute member\n/unmute (user) - unmute user.\n/report (user) (reason) - report about User.\n/warn (user) (reason) - Warn a User.")
   .addField("Server Commands","/serverinfo - Server Informations.\n/poll (question) - Poll about Question\n/ping - Ping Pong")
  .addField("Fortnite","/fts (name in fortntie) - show your stats in fortnite")
   .addField("Economy","/coins - show your coins.\n/level - show your level.")
   .addField("Creators","/creator - Bot Creators.");
    return message.author.send(botembed);
  }

if (cmd === `${prefix}mute`){
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));
}
})

bot.on('message', msg => {
  if (msg.content === '/ping') {
    msg.reply(`Pong! The ping is **${(bot.ping).toFixed(0)}**ms!  :ping_pong:`)
  }
});

bot.on('message', msg => {
  if (msg.content === '/help') {
    msg.reply(`Look Direct Messages Ya Shnitzel`)
  }
});
bot.on('message', msg => {
  if (msg.content === '/avatar') {
    msg.reply(`You need Mention someone`)
  }
  });

bot.login(process.env.BOT_TOKEN);
