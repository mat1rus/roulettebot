const Discord = require('discord.js');
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('view')
        .setDescription('View roulette (or show avaiable roulettes (no ID param))')
        .addStringOption(opt => opt
            .setName('id')
            .setDescription('ID of roulette')
            .setMaxLength(12)),
    /**
     * @param {Discord.CommandInteraction} intr 
     */
    exec: async(intr) => {
        let db = require('../db.json');
        if(!intr.options.getString('id')) {
            await intr.reply({embeds: [new Discord.EmbedBuilder()
                .setColor(16776960)
                .setTitle('Avaiable roulettes (IDs)')
                .setDescription(Object.keys(db).join(', '))]});
        } else if(!db[intr.options.getString('id')]) {
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(16711680)
                .setTitle('Error!')
                .setDescription('Roulette with this ID does not exist!')]});
        } else {
            let roulette = db[intr.options.getString('id')];
            await intr.reply({embeds: [new Discord.EmbedBuilder()
                .setColor(65280)
                .setTitle(roulette.title)
                .setDescription(`**${roulette.description}**\nTasks: ${roulette.stc.length}\nCreated by <@!${roulette.creator}> (${roulette.creator})\nAdmins: ${roulette.admins.length?'<@!'+roulette.admins.join('>, <@!')+'>':'there is no admins'}`)]});
        };
    }
};