const Discord = require('discord.js'),
      fs = require('fs');
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('create')
        .setDescription('Create new roulette')
        .addStringOption(opt => 
            opt.setName('id')
               .setDescription('ID to call your roulette')
               .setMaxLength(12)
               .setRequired(true))
        .addStringOption(opt => 
            opt.setName('title')
               .setDescription('Title of your roulette')
               .setMaxLength(32))
        .addStringOption(opt => 
            opt.setName('description')
               .setDescription('Describe your roulette')
               .setMaxLength(512)),
    /**
     * @param {Discord.CommandInteraction} intr
     */
    exec: async(intr) => {
        let db = require('../db.json');
        if(!db[intr.options.getString('id')]) {
            db[intr.options.getString('id')] = {title:intr.options.getString('title')??'Unnamed Roulette',description:intr.options.getString('description')??'No description provided',creator:intr.member.id,admins:[],stc:[]};
            fs.writeFileSync('./db.json', JSON.stringify(db));
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(65280)
                .setTitle('Success!')
                .setDescription('Roulette was successfully created!')]});
        } else {
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(16711680)
                .setTitle('Error!')
                .setDescription('Roulette with same ID was created before!')]});
        };
    }
};