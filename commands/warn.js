const fs = require("fs");
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Haha jij kan dat lekker niet doen! lekker pu");

    if (!args[0]) return message.reply("Wie dan? Gast je moet wel zeggen wie. Ik kan toch niet weten wie je wilt warnen?");

    if (!args[1]) return message.reply("Wat is dan de reden? dat weet ik toch niet?");

    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("Ik kan de gebruiker niet vinden");

    if (warnUser.permissions.has("MANAGE_MESSAGES")) return message.reply("Sorry maar je kan dit persoon niet warnen");

    const warns = JSON.parse(fs.readFileSync("./warnings.json", "UTF8"));

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }

    warns[warnUser.id].warns++;

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Gewarnd:** ${warnUser.user.username} (${warnUser.id})
        **Warning door:** ${message.author}
        **Redenen: ** ${reason}`)
        .addField("Aantal warns", warns[warnUser.id].warns.toString());

    const channel = message.member.guild.channels.cache.get("876012037199786021");

    if (!channel) return message.channel.send({ embeds: [embed] });

    channel.send({ embeds: [embed] });

    if (warns[warnUser.id].warns == 2) {

        var mes = new discord.MessageEmbed()
            .setDescription("PAS OP " + warnUser.user.username)
            .setColor("#ee0000")
            .addField("Bericht", "Nog één warn en je hebt een ban!!");

        message.channel.send({ embeds: [mes] });

    } else if (warns[warnUser.id].warns == 3) {

        message.guild.members.ban(warnUser, { reason: reason });
        message.channel.send(`${warnUser} is verbannen door de bot wegens te veel warns`);

    }

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

}

module.exports.help = {
    name: "warn",
    category: "moderate",
    description: "waarschuwt mensen. verder niks. nou hij bant ze dan wel na drie keer :)"
}