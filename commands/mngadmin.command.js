const Discord = require('discord.js'),
      fs = require('fs');
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('mngadmin')
        .setDescription('Add/remove admins')
        .addStringOption(opt => opt
            .setName('id')
            .setDescription('ID of your roulette')
            .setRequired(true)
            .setMaxLength(12))
        .addUserOption(opt => opt
            .setName('user')
            .setDescription('User to add/remove')
            .setRequired(true))
        .addStringOption(opt => opt
            .setName('mode')
            .setDescription('Add/remove')
            .addChoices(
                {name: 'Add', value: 'add'},
                {name: 'Remove', value: 'rem'}
            )),
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
        } else if(db[intr.options.getString('id')].creator != intr.member.id) {
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(16711680)
                .setTitle('Error!')
                .setDescription('You do not own this roulette!')]});
        } else {
            let admins = db[intr.options.getString('id')].admins;
            if((intr.options.getString('mode') ?? 'add') == 'add' && !admins.includes(intr.options.getUser('user').id)) admins.push(intr.options.getUser('user').id);
            else if(admins.includes(intr.options.getUser('user').id)) admins.splice(admins.indexOf(intr.options.getUser('user').id), 1);
            db[intr.options.getString('id')].admins = admins;
            fs.writeFileSync('./db.json', JSON.stringify(db));
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(65280)
                .setTitle('Success!')
                .setDescription('Admins was successfully edited!')]});
        };
    }
};