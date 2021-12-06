require('dotenv').config()

const Discord = require('discord.js')
const bot = new Discord.Client()
const token = process.env.TOKEN

const startingDate = new Date(2021,11, 6, 17, 0, 0, 0)
const sixHoursInMilliseconds = 6*60*60*1000;
var channels = [];

bot.on('ready', ()=>{
    console.log("Bot is online!")
    bot.user.setActivity('the waiting game ...')

    channels.push(bot.channels.cache.get('917526064065024052'))
    channels.push(bot.channels.cache.get('430697034358456321'))
    channels.push(bot.channels.cache.get('837488769266745344'))

    printConnectedServers()
    dailyUpdates()
});

bot.login(token);

function printConnectedServers() {
    console.log("\n----------------------------------------------")
        console.log("Connected Servers(Guilds):")
    console.log("----------------------------------------------")
    bot.guilds.cache.forEach(server => {
        console.log(server.name + " (id: " + server.id + ")");
    });
    console.log("----------------------------------------------\n")
}

function printElapsedTime() {
    var difference = new Date(Date.now() - startingDate);

    console.log(`${difference.getUTCDate() - 1} day(s) ${difference.getUTCHours()} hour(s) ${difference.getUTCMinutes()} minute(s) and ${difference.getUTCSeconds()} second(s) left.`);

    var message = new Discord.MessageEmbed()
        .setColor('#ff7437')
        .setTitle('Elapsed Time')
        .setDescription(`**${difference.getUTCDate() - 1}** day(s) **${difference.getUTCHours()}** hour(s) **${difference.getUTCMinutes()}** minute(s) and **${difference.getUTCSeconds()}** second(s) left.\n\n__#Pray4Me__`)
        .setTimestamp()
        .setFooter('By JoaoRuss0#4113');

    channels.forEach(channel => channel.send(message));
}

function dailyUpdates() {
    printElapsedTime()
    setInterval(printElapsedTime, sixHoursInMilliseconds)
}
