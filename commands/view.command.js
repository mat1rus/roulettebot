const Discord = require('discord.js');
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('view')
        .setDescription('View roulette (or show avaiable roulettes (no ID param))')
        .addStringOption(opt => opt
            .setName('id')
            .setDescription('ID of roulette')
            .setMaxLength(12))
        .addStringOption(opt => opt
            .setName('sort')
            .setDescription('Sort')
            .addChoices(
                {'name': 'Creation Date', 'value': 'date'},
                {'name': 'Uses', 'value': 'uses'},
                {'name': 'Name', 'value': 'name'}
            )),
    /**
     * @param {Discord.CommandInteraction} intr 
     */
    exec: async(intr) => {
        let db = require('../db.json');
        let sort = intr.options.getString('sort')??'date';
        if(!intr.options.getString('id')) {
            if(sort == 'date') {
                await intr.reply({embeds: [new Discord.EmbedBuilder()
                    .setColor(16776960)
                    .setTitle('Avaiable roulettes (IDs)')
                    .setDescription(Object.keys(db).join(', '))]});
            } else if(sort == 'uses') {
                const sorted = Object.keys(db)
                    .sort((a, b) => db[b].uses - db[a].uses)
                    .reduce((rslt, key) => rslt.set(key, db[key]), new Map());
                let x = '';
                for(const [k, o] of sorted.entries()) x += `, ${k}`;
                await intr.reply({embeds: [new Discord.EmbedBuilder()
                    .setColor(16776960)
                    .setTitle('Avaiable roulettes (IDs)')
                    .setDescription(x.slice(2))]});
            } else if(sort == 'name') {
                const sorted = Object.keys(db).sort().reduce((r, k) => (r[k] = db[k], r), {});
                await intr.reply({embeds: [new Discord.EmbedBuilder()
                    .setColor(16776960)
                    .setTitle('Avaiable roulettes (IDs)')
                    .setDescription(Object.keys(sorted).join(', '))]});
            };
        } else if(!db[intr.options.getString('id')]) {
            await intr.reply({ephemeral: true, embeds: [new Discord.EmbedBuilder()
                .setColor(16711680)
                .setTitle('Error!')
                .setDescription('Roulette with this ID does not exist!')]});
        } else {
            let roulette = db[intr.options.getString('id')],
                x = 1;
            const sorted = Object.keys(db)
                .sort((a, b) => db[b].uses - db[a].uses)
                .reduce((rslt, key) => rslt.set(key, db[key]), new Map());
            for(const [k, o] of sorted.entries()) {
                if(k == intr.options.getString('id')) break;
                else ++x;
            };
            await intr.reply({embeds: [new Discord.EmbedBuilder()
                .setColor(65280)
                .setTitle(roulette.title)
                .setDescription(`**${roulette.description}**\nTasks: ${roulette.stc.length}\nCreated by <@!${roulette.creator}> (${roulette.creator})\nAdmins: ${roulette.admins.length?'<@!'+roulette.admins.join('>, <@!')+'>':'there is no admins'}\nUses: ${roulette.uses} (№${x})`)]});
        };
    }
};