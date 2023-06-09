/*
    ----------------------------------------------
    FUN COMMUNITY PARTY COMMANDS party.js
     - by Maribel Hearn, 2015-2023

    This file contains the scripts necessary
    for the Party channel, a channel in which
    you can mess with posts or the chat.
    The commands in it can only be run
    in the Party channel.
    ----------------------------------------------
*/
var PARTY_MODES = ["joke", "nightclub", "desu", "rainbow", "nyan", "dennis", "cirno", "sparta", "luigi", "roflcopter", "derp", "asdf", "leet", "morse", "reverse"];
var partyMode = sys.fexists(DATA_FOLDER + "partymode.txt") ? helpers.readData("partyMode") : "none";
var partyNyan = 0;

function nyanColor(number) {
    switch (number) {
        case 1:
            return "#FF4500";
        case 2:
            return "#FFD700";
        case 3:
            return "#008000";
        case 4:
            return "#0000FF";
        case 5:
            return "#00008B";
        case 6:
            return "#800080";
        default:
            return "#FF0000";
    }
}

module.exports = {
    getPartyMode: function () {
        return partyMode;
    },

    setPartyMode: function (mode) {
        if (PARTY_MODES.indexOf(mode) == -1) {
            return;
        }
        partyMode = mode;
    },

    beforeChatMessage: function (src, message, channel) {
        var name = helpers.escapehtml(sys.name(src)), auth = sys.auth(src), color = helpers.color(src),
        length = message.length, mode = partyMode, playerIds, random, derps, i;
        if (message.split(' ')[0] == "/mode") {
            handler.parseCommand(src, message, channel, name, auth, false);
            return;
        }
        if (mode == "joke") {
            playerids = sys.playerIds();
            length = playerids.length;
            random = sys.rand(0, length);
            color = helpers.color(playerids[random]);
            message = helpers.escapehtml(message);
            if (sys.auth(playerids[random]) >= 1 && sys.auth(playerids[random]) <= 3) {
                message = "<font color='" + color + "'><timestamp/> +<b><i>" + sys.name(playerids[random]) + ":</i></b></font> " + message;
            } else {
                message = "<font color='" + color + "'><timestamp/> <b>" + sys.name(playerids[random]) + ":</b></font> " + message;
            }
            sys.sendHtmlAll(message, channel);
            return;
        } else if (mode == "nightclub") {
            message = helpers.escapehtml(message);
            if (auth >= 1 && auth <= 3) {
                message = "<span style='font-size: 16px;'><font color='#FFFFFF'><timestamp/> +<b><i>" + helpers.rainbow(name + ":") + "</i> " + message + "</b></font></span>";
            } else {
                message = "<span style='font-size: 16px;'><font color='#FFFFFF'><timestamp/> <b>" + helpers.rainbow(name + ":") + " " + message + "</b></font></span>";
            }
            sys.sendHtmlAll(message, channel);
            return;
        } else if (mode == "rainbow" || mode == "desu" || mode == "leet" || mode == "morse") {
            mode == "leet" || mode == "morse" ? message = helpers[mode](message) : message = "<b>" + helpers[mode](message) + "</b>";
        } else if (mode == "nyan") {
            message = "Nyan";
            for (i = 1; i < length; i++) {
                message += " Nyan";
            }
            sys.sendHtmlAll("<font color='#FFFFFF'>:</font><div style='background:" + nyanColor(partyNyan) + "'><center><span style='font-size: 16px;'>" + message + "</span></center>", channel);
            partyNyan = (partyNyan + 1) % 7;
            return;
        } else if (mode == "dennis") {
            if (require.cache.hasOwnProperty("funcmds.js") && message.toLowerCase() == "/dennis") {
                funcommands.dennis(src, channel, ["dennis"]);
                return true;
            }
            message = "D";
            for (i = 1; i < length; i++) {
                message += "D";
            }
            for (i = 0; i < length; i++) {
                message += "E";
            }
            for (i = 0; i < length; i++) {
                message += "N";
            }
            for (i = 0; i < length; i++) {
                message += "N";
            }
            for (i = 0; i < length; i++) {
                message += "I";
            }
            for (i = 0; i < length; i++) {
                message += "S";
            }
            message += "!";
        } else if (mode == "sparta") {
            message = "This.. is.. SPART";
            for (i = 0; i < length; i++) {
                message += "A";
            }
            message += "!";
        } else if (mode == "luigi") {
            message = "Spagh";
            for (i = 0; i < length; i++) {
                message += "E";
            }
            message += "tti!";
        } else if (mode == "roflcopter") {
            index = 1;
            message = "soi";
            while (index < length) {
                message += " soi";
                index++;
            }
        } else if (mode == "asdf") {
            message = "";
            for (i = 0; i < length; i++) {
                message += "asdf";
            }
        } else if (mode == "derp") {
            derps = ["derp", "herp", "merp", "ferp", "bulbaderp", "darp", "durp"];
            message = "";
            for (i = 0; i < length; i++) {
                message += derps[sys.rand(0, derps.length)] + " ";
            }
        } else if (mode == "cirno") {
            message = "";
            for (i = 0; i < length; i++) {
                message += (sys.rand(0, 2) === 0 ? "BAKA" : " &#x2788;");
            }
        } else if (mode == "reverse") {
            message = helpers.escapehtml(message).split("").reverse().join("");
        }
        if (auth > 0 && auth < 4) {
            message = "<font color='" + color + "'><timestamp/> +<b><i>" + name + ":</i></b></font> " + message;
        } else {
            message = "<font color='" + color + "'><timestamp/> <b>" + name + ":</b></font> " + message;
        }
        sys.sendHtmlAll(message, channel);
    },

    commands: {
        partycommands: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Party Commands</h2>"
            + "<br>"
            + "<b>" + helpers.user("/mode ") + helpers.arg("mode") + "</b>: changes the current party mode to <b>mode</b>. If <b>mode</b> is 'off', ends the current party mode. Only for channel auth.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        },

        mode: function (src, channel, command) {
            var name = helpers.escapehtml(sys.name(src)), lower = sys.name(src).toLowerCase(),
            channelname = sys.channel(channel).toLowerCase(), oldmode = partyMode, mode;
            if (helpers.cauth(lower, channelname) === 0) {
                helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/gi, sys.name(src)));
                return;
            }
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.party, "Error 404, mode not found.");
                return;
            }
            if (command[1] == "off") {
                if (partyMode == "none") {
                    helpers.starfox(src, channel, command, bots.party, "Error 400, you can't turn the current party mode off, because it is already off!");
                    return;
                }
                mode = helpers.cap(partyMode) + " Mode";
                if (partyMode == "nightclub") {
                    sys.sendHtmlAll(":<div>", channel);
                }
                sys.sendHtmlAll(border + "<br>" + helpers.bot(bots.party) + "<b>" + helpers.user(name) + " has turned " + helpers.arg(mode) + " off.</b><br>" + border2, channel);
                partyMode = "none";
                helpers.saveData("partyMode", partyMode);
                if (regchannels[channelname]) {
                    regchannels[channelname].topic = ["Welcome to " + sys.channel(partychannel) + "!"];
                    helpers.saveData("regchannels");
                }
                return;
            }
            for (var index in PARTY_MODES) {
                if (PARTY_MODES[index] == command[1].toLowerCase()) {
                    partyMode = PARTY_MODES[index];
                    helpers.saveData("partyMode", partyMode);
                    mode = helpers.cap(PARTY_MODES[index]) + " Mode";
                    if (oldmode == "nightclub") {
                        sys.sendHtmlAll(":<div>", channel);
                    }
                    sys.sendHtmlAll(border + "<br>" + helpers.bot(bots.party) + "<b>" + helpers.user(name) + " has turned " + helpers.arg(mode) + " on!</b><br>" + border2, channel);
                    if (partyMode == "nightclub") {
                        sys.sendHtmlAll("<font color='#FFFFFF'>:</font><div style='background: #000000;'>", channel);
                        if (regchannels[channelname]) {
                            regchannels[sys.channel(partychannel).toLowerCase()].topic = ["This channel is currently in " + mode + ".<font color='#FFFFFF'>:</font><div style='background: #000000;'>"];
                            helpers.saveData("regchannels", regchannels);
                        }
                    } else if (regchannels[channelname]) {
                        regchannels[sys.channel(partychannel).toLowerCase()].topic = ["This channel is currently in " + mode + "."];
                        helpers.saveData("regchannels", regchannels);
                    }
                    return;
                }
            }
            helpers.starfox(src, channel, command, bots.party, "Error 403, invalid mode.");
        }
    }
};
