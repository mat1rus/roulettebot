const Discord = require('discord.js');
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Show some information about the bot'),
    /**
     * @param {Discord.CommandInteraction} intr 
     */
    exec: async(intr) => {
        await intr.reply({embeds: [new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({name: 'matruwus_#5761', iconURL: 'https://cdn.discordapp.com/attachments/1046926931217616938/1055866083669713006/pfp_matya.png'})
            .setTitle('Roulette Bot')
            .setDescription('This bot is made for roulettes. That\'s all.\n\nMade by **matruwus_#5761** AKA **Matrus**, **Mattress**, **Matya** and so on\nVersion 1.0.5\n[Invite bot](https://discord.com/api/oauth2/authorize?client_id=971760433834889227&permissions=2147502080&scope=bot%20applications.commands)\n[Source Code](https://github.com/mat1rus/roulettebot)\n[Don\'t follow me](https://youtu.be/dQw4w9WgXcQ)')]})
    }
};