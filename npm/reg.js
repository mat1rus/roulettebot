const{cId, token} = require('../config.json'),
     Discord = require('discord.js'),
     fs = require('fs'),
     commands = [];
for(file of fs.readdirSync('./commands').filter(f => f.endsWith('.command.js'))) commands.push(require(`../commands/${file}`).data.toJSON());
const rest = new Discord.REST({ version: '10' }).setToken(token);
(async() => {
	try {
		console.log(`${commands.length} commands total`);
		const data = await rest.put(Discord.Routes.applicationCommands(cId), {body: commands});
		console.log('Done');
	} catch (err) {
		console.error(err);
	};
})();