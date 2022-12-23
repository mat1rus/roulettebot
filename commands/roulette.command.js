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
            .setRequired(true))
        .addNumberOption(opt => opt
            .setName('rolls')
            .setDescription('How many rolls bot will do')
            .setMinValue(1)
            .setMaxValue(5)),
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
            let rolls = intr.options.getNumber('rolls')??1,
                r = [];
            db[intr.options.getString('id')].uses += rolls;
            if(db[intr.options.getString('id')].next) {
                r.push(db[intr.options.getString('id')].next);
                db[intr.options.getString('id')].next = null;
                fs.writeFileSync('./db.json', JSON.stringify(db));
                rolls -= 1;
            };
            for(let i = 0; i < rolls; i++) {
                r.push(db[intr.options.getString('id')].stc[Math.floor(Math.random()*db[intr.options.getString('id')].stc.length)]);
            };
            await intr.reply({embeds: [new Discord.EmbedBuilder()
                .setColor('Random')
                .setTitle(db[intr.options.getString('id')].title)
                .setDescription(r.join('\n'))]});
            fs.writeFileSync('./db.json', JSON.stringify(db));
        };
    }
};