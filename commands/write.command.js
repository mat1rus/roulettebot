const Discord = require('discord.js'),
      fs = require('fs');
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('write')
        .setDescription('Add/remove task from your roulette')
        .addStringOption(opt => opt
            .setName('id')
            .setDescription('ID of your roulette')
            .setRequired(true)
            .setMaxLength(12))
        .addStringOption(opt => opt
            .setName('task')
            .setDescription('Task to add/remove')
            .setRequired(true)
            .setMaxLength(256))
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
            let stc = db[intr.options.getString('id')].stc;
            if((intr.options.getString('mode') ?? 'add') == 'add' && !stc.includes(intr.options.getString('task'))) stc.push(intr.options.getString('task'));
            else if(stc.includes(intr.options.getString('task'))) stc.splice(stc.indexOf(intr.options.getString('task')), 1);
            db[intr.options.getString('id')].stc = stc;
            fs.writeFileSync('./db.json', JSON.stringify(db));
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(65280)
                .setTitle('Success!')
                .setDescription('Roulette was successfully edited!')]});
        }
    }
};