/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY PARTY COMMANDS party.js
     - by Maribel Hearn, 2015-2015

    This file contains the scripts necessary
    for the Party channel, a channel in which
    you can mess with posts or the chat.
    The commands in it can only be run
    in the Party channel.
    ----------------------------------------------
*/
PARTY_MODES = ["joke", "nightclub", "desu", "rainbow", "nyan", "dennis", "cirno", "sparta", "luigi", "roflcopter", "derp", "asdf", "leet", "morse", "reverse"];
partyMode = sys.fexists(DATA_FOLDER + "partymode.txt") ? helpers.readData("partymode") : "none";
helpers.setVariable("partyNyan", 0);

partycommands = {
    partycommands: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Party Commands</h2>"
        + "<br>"
        + "<b>" + helpers.user("/mode ") + helpers.arg("mode") + "</b>: changes the current party mode to <b>mode</b>. If <b>mode</b> is 'off', ends the current party mode. Only for channel auth.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    mode: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), lower = sys.name(src).toLowerCase(), channelname = sys.channel(channel).toLowerCase(), oldmode = partyMode, mode;
        if (helpers.cauth(lower, channelname) === 0) {
            helpers.starfox(src, channel, command, bots.starfox, "I can't let you do that star " + sys.name(src) + "!");
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
            helpers.saveData("partymode");
            regchannels[permchannels[3].toLowerCase()].topic = ["Welcome to " + permchannels[3] + "!"];
            helpers.saveData("regchannels");
            return;
        }
        for (var index in PARTY_MODES) {
            if (PARTY_MODES[index] == command[1].toLowerCase()) {
                partyMode = PARTY_MODES[index];
                helpers.saveData("partymode");
                mode = helpers.cap(PARTY_MODES[index]) + " Mode";
                if (oldmode == "nightclub") {
                    sys.sendHtmlAll(":<div>", channel);
                }
                sys.sendHtmlAll(border + "<br>" + helpers.bot(bots.party) + "<b>" + helpers.user(name) + " has turned " + helpers.arg(mode) + " on!</b><br>" + border2, channel);
                if (partyMode == "nightclub") {
                    sys.sendHtmlAll("<font color='#FFFFFF'>:</font><div style='background: #000000;'>", channel);
                    regchannels[permchannels[3].toLowerCase()].topic = ["This channel is currently in " + mode + ".<font color='#FFFFFF'>:</font><div style='background: #000000;'>"];
                    helpers.saveData("regchannels");
                } else {
                    regchannels[permchannels[3].toLowerCase()].topic = ["This channel is currently in " + mode + "."];
                    helpers.saveData("regchannels");
                }
                return;
            }
        }
        helpers.starfox(src, channel, command, bots.party, "Error 403, invalid mode.");
    }
};

partyBeforeChat = function (src, message, channel, mode) {
    var name = this.escapehtml(sys.name(src)), auth = sys.auth(src), color = this.color(src), length = message.length;
    if (partyMode == "none" || message.split(' ')[0] == "/mode") {
        return;
    }
    if (mode == "joke") {
        var playerids = sys.playerIds(), random;
        length = playerids.length;
        random = sys.rand(0, length);
        color = this.color(playerids[random]);
        message = this.escapehtml(message);
        if (sys.auth(sys.playerIds()[random]) >= 1 && sys.auth(sys.playerIds()[random]) <= 3) {
            message = "<font color='" + color + "'><timestamp/> +<b><i>" + sys.name(playerids[random]) + ":</i></b></font> " + message;
        } else {
            message = "<font color='" + color + "'><timestamp/> <b>" + sys.name(playerids[random]) + ":</b></font> " + message;
        }
        sys.sendHtmlAll(message, channel);
        return;
    } else if (mode == "nightclub") {
        message = this.escapehtml(message);
        if (auth >= 1) {
            message = "<span style='font-size: 16px;'><font color='#FFFFFF'><timestamp/> <b><i>" + this.rainbow(name + ":") + "</i> " + message + "</b></font></span>";
        } else {
            message = "<span style='font-size: 16px;'><font color='#FFFFFF'><timestamp/> <b>" + this.rainbow(name + ":") + " " + message + "</b></font></span>";
        }
        sys.sendHtmlAll(message, channel);
        return;
    } else if (mode == "rainbow" || mode == "desu" || mode == "leet" || mode == "morse") {
        mode == "leet" || mode == "morse" ? message = helpers[mode](message) : message = "<b>" + helpers[mode](message) + "</b>";
    } else if (mode == "nyan") {
        var index = 1;
        message = "Nyan";
        while (index < length) {
            message += " Nyan";
            index++;
        }
        sys.sendHtmlAll("<font color='#FFFFFF'>:</font><div style='background:" + this.nyancolor(partyNyan) + "'><center><span style='font-size: 16px;'>" + message + "</span></center>", channel);
        partyNyan++;
        if (partyNyan == 7) {
            partyNyan = 0;
        }
        return;
    } else if (mode == "dennis") {
        if (message.toLowerCase() == "/dennis") {
            if (helpers.isLoaded("funcmds.js")) {
                funcommands.dennis(src, channel, ["dennis"]);
                return true;
            }
        }
        var index = 1;
        message = "D";
        while (index < length) {
            message += "D";
            index++;
        }
        index = 0;
        while (index < length) {
            message += "E";
            index++;
        }
        index = 0;
        while (index < length) {
            message += "N";
            index++;
        }
        index = 0;
        while (index < length) {
            message += "N";
            index++;
        }
        index = 0;
        while (index < length) {
            message += "I";
            index++;
        }
        index = 0;
        while (index < length) {
            message += "S";
            index++;
        }
        message += "!";
    } else if (mode == "sparta") {
        var index = 0;
        message = "This.. is.. SPART";
        while (index < length) {
            message += "A";
            index++;
        }
        message += "!";
    } else if (mode == "luigi") {
        var index = 1;
        message = "SpaghE";
        while (index < length) {
            message += "E";
            index++;
        }
        message += "tti!";
    } else if (mode == "roflcopter") {
        var index = 1;
        message = "soi";
        while (index < length) {
            message += " soi";
            index++;
        }
    } else if (mode == "asdf") {
        var index = 1;
        message = "asdf";
        while(index < length) {
            message += "asdf";
            index++;
        }
    } else if (mode == "derp") {
        var index = 0;
        message = "";
        while (index < length) {
            random = sys.rand(0, 7);
            if (random === 0) {
                message += " derp";
            } else if (random == 1) {
                message += " herp";
            } else if (random == 2) {
                message += " merp";
            } else if (random == 3) {
                message += " ferp";
            } else if (random == 4) {
                message += " bulbaderp";
            } else if (random == 5) {
                message += " darp";
            } else if (random == 6) {
                message += " durp";
            }
            index++;
        }
    } else if (mode == "cirno") {
        var index = 1;
        random = sys.rand(0, 2);
        random === 0 ? message = "BAKA" : message = "&#x2788;";
        while (index < length) {
            random === 0 ? message += "BAKA" : message += " &#x2788;";
            index++;
        }
    } else if (mode == "reverse") {
        message = this.reverse(this.escapehtml(message));
    }
    if (auth >= 1) {
        message = "<font color='" + color + "'><timestamp/> +<b><i>" + name + ":</i></b></font> " + message;
    } else {
        message = "<font color='" + color + "'><timestamp/> <b>" + name + ":</b></font> " + message;
    }
    sys.sendHtmlAll(message, channel);
};
