const botConfig = require("../botConfig.json");

module.exports.run = async (client, message, args) => {

    try {

        var prefix = botConfig.prefix;

        var response = "***Commands van de domme bot***\r\n\n";
        var general = "***__Algemene ofzo__***\r\n";
        var moderate = "\n***__Moderate__***\n";
        var info = "\n***__Info__***\n";

        client.commands.forEach(command => {

            switch (command.help.category) {

                case "general":
                    general += `${prefix}${command.help.name} - ${command.help.description}\r\n`
                    break;

            }
            switch (command.help.category) {

                case "moderate":
                    moderate += `${prefix}${command.help.name} - ${command.help.description}\r\n`
                    break;

            }
            switch (command.help.category) {

                case "info":
                    info += `${prefix}${command.help.name} - ${command.help.description}\r\n`
                    break;

            }

        });

        response += general + info + moderate;

        message.author.send(response).then(() => {
            return message.reply("Alle commands staan in je dms")
        }).catch(() => {
            return message.reply(response)
        })

    } catch (error) {
        console.log(error);
        message.reply("Er is iets misgegaan");
    }

}

module.exports.help = {
    name: "help",
    category: "info",
    description: "dat is deze command. geen enkelijke andere. alleen deze"
}