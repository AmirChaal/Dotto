const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] })

client.once('ready', () => {
    console.log('Dotto, à votre service !');
});

const fs = require('fs')
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file=> file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on('message', message =>{

//------------------------------------------------------------------ COMMANDES SANS PREFIXES ------------------------------------------------------------------//

    if (message.author.id == '313312182110781452') {
        message.react('🦠')
    }
    if (message.author.id == '270669382537969666') {
        message.react('🌸')
    }

    if (message.author.id == '659887560432156674') {
        message.react('🐱')
    }
    
    //Réponse personnalisée
    if (message.cleanContent.toLowerCase().includes('dotto')) {
        //Louk
        if (message.author.id == '270669382537969666'){
            message.channel.send('L\'utilisateur <@270669382537969666> vient de me mentionner ! :D');
        }
        //Autre
        else {message.channel.send('Mmh ?')}
    };

    //Test - :D - simple
    if (message.author.id == '198122809715589120' && message.content.includes(':D')){
        message.channel.send(':D')
    }

    //Test - Bozo - Pour pas qu'il se réponde à lui-même
    if (message.content.toLowerCase().includes('bozo') && !(message.author.id == '965979691955679294')) {
        message.channel.send('Bozo')
        message.channel.send('https://tenor.com/view/bozo-detected-bozo-detected-bozo-found-found-gif-23176259')
    }

//------------------------------------------------------------------ COMMANDES AVEC PREFIXES ------------------------------------------------------------------//

    const prefix = '=';
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        client.commands.get('ping').execute(message, args);
    };

    if (command === 'mp') {

        const macible = message.content.slice(6, (message.content.length-1)) //Code pour séparer l'id de l'utilisateur du reste de la commande.
        //→ l'id en string semble ne pas suffir pour pouvoir localiser un channel. Les id (user comme channel) semblent etre simplement des channels.. Interessant.        
        const cible = message.mentions.users.first() //"cible" c'est à la fois l'id de l'utilisateur, mais aussi une entité snowflake bizarre qui doit etre transformée en string → clarifier ça.
        //LOUK
        if (cible == '270669382537969666') {
            cible.send('Bien le bonjour <@270669382537969666>, comment se passe ta journée ? :D')
        }
        else {
            cible.send('Bien le bonjour, comment se passe ta journée ? :D')
        }
    }
});


client.login('//////');