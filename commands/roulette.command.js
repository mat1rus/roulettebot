const Discord = require('discord.js');
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('roulette')
        .setDescription("That's better that screenshot")
        .addStringOption(opt => opt
            .setName('id')
            .setDescription('ID of roulette')
            .setMaxLength(12)
            .setRequired(true)),
    /**
     * @param {Discord.CommandInteraction} intr 
     */
    exec: async(intr) => {
        let db = require('../db.json');
        if(!db[intr.options.getString('id')]) {
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(16711680)
                .setTitle('Error!')
                .setDescription('Roulette with this ID does not exist!')]});
        } else if(db[intr.options.getString('id')].stc.length == 0) {
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(16711680)
                .setTitle('Error!')
                .setDescription('Roulette you selected is empty!')]});
        } else {
            
            let stc = db[intr.options.getString('id')].stc[Math.round(Math.random() * db[intr.options.getString('id')].stc.length)];
            await intr.reply({embeds: [new Discord.EmbedBuilder()
                .setColor('Random')
                .setTitle(db[intr.options.getString('id')].title)
                .setDescription(stc)]});
        };
    }
};