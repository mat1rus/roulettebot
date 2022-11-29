const{token} = require('./config.json'),
     Discord = require('discord.js'),
     fs = require('fs'),
     Client = new Discord.Client({intents: 3276799});
let commands = {};
for(file of fs.readdirSync('./commands').filter(f => f.endsWith('.command.js'))) {
    const command = require(`./commands/${file}`);
    if(!command) continue;
    commands[command.data.name] = command;
};
Client.on('ready', () => console.log('Connected!'));
Client.on('interactionCreate', async(intr) => {
    if(intr.isChatInputCommand()) {
        const command = commands[intr.commandName];
        if(!command) return;
        await command.exec(intr)
    };
});
Client.login(token);