const Discord = require('discord.js'),
      fs = require('fs');
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
            let stc = db[intr.options.getString('id')].next?db[intr.options.getString('id')].next:db[intr.options.getString('id')].stc[Math.round(Math.random()*db[intr.options.getString('id')].stc.length)];
            if(db[intr.options.getString('id')].next){let db=require('../db.json');db[intr.options.getString('id')].next=null;fs.writeFileSync('./db.json',JSON.stringify(db))};
            await intr.reply({embeds: [new Discord.EmbedBuilder()
                .setColor('Random')
                .setTitle(db[intr.options.getString('id')].title)
                .setDescription(stc)]});
        };
    }
};