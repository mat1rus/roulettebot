const {whitelist} = require('../config.json'),
      Discord = require('discord.js'),
      fs = require('fs');
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('delete')
        .setDescription('Delete a roulette')
        .addStringOption(opt => opt
            .setName('id')
            .setDescription('ID of your roulette')
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
        } else if(db[intr.options.getString('id')].creator != intr.member.id && !whitelist.includes(intr.user.id)) {
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(16711680)
                .setTitle('Error!')
                .setDescription('You do not own this roulette!')]});
        } else {
            delete db[intr.options.getString('id')];
            fs.writeFileSync('./db.json', JSON.stringify(db));
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(65280)
                .setTitle('Success!')
                .setDescription('Roulette was successfully deleted!')]});
        };
    }
};