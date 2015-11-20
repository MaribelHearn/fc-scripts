/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY COMMAND HANDLER handler.js
     - by Maribel Hearn, 2015-2015
    
    This script file contains the command
    handler, which will parse a given command
    and execute it if possible.
    ----------------------------------------------
*/

filterLastMessage = function (src, message, channel) {
    if (regchannels[sys.channel(channel).toLowerCase()]) {
        if (!regchannels[sys.channel(channel).toLowerCase()].priv && !helpers.isInString(message, silentcommands)) {
            players[src].lastmessage = message;
            players[src].lastmessagetime = new Date();
        }
    }
};

mutedOrSilenced = function (src, channel, command, name, auth) {
    if (auth >= 3) {
        return false;
    }
    if (helpers.muteCheck(name)) {
        helpers.muteMessage(src, channel);
        return true;
    }
    if (helpers.cmuteCheck(players[src].name, sys.channel(channel).toLowerCase())) {
        helpers.channelMuteMessage(src, channel);
        return true;
    }
    if (regchannels[sys.channel(channel).toLowerCase()]) {
        if (regchannels[sys.channel(channel).toLowerCase()].silence > auth) {
            helpers.silenceMessage(src, channel);
            return true;
        }
    }
};

bigtextCommand = function (src, channel, command, lower, name, auth) {
    if (bigtexts[lower] !== undefined) {
        if (mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        }
        funcommands.bigtext(src, channel, bigtexts[lower]);
    }
};

userCommand = function (src, channel, command, lower, name, auth) {
    if (usercommands[lower] !== undefined) {
        if (helpers.isMutable(usercommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        }
        usercommands[lower](src, channel, command);
    }
};

rouletteCommand = function (src, channel, command, lower, name, auth) {
    if (helpers.isLoaded("roulette.js") && roulettecommands[lower] !== undefined) {
        if (channel != roulettechannel) {
            helpers.starfox(src, channel, command, bots.roulette, "Error 403, this command is meant to be used in the <a href='po:join/" + permchannels[5] + "'>#" + permchannels[5] + "</a> channel.");
            return;
        }
        if (helpers.isMutable(roulettecommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        }
        roulettecommands[lower](src, channel, command);
    }
};

russianRouletteCommand = function (src, channel, command, lower, name, auth) {
    if (helpers.isLoaded("rr.js") && rrcommands[lower] !== undefined) {
        if (channel != rrchannel) {
            helpers.starfox(src, channel, command, bots.rr, "Error 403, this command is meant to be used in the the <a href='po:join/" + permchannels[4] + "'>#" + permchannels[4] + "</a> channel.");
            return;
        }
        if (helpers.isMutable(rrcommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        }
        rrcommands[lower](src, channel, command);
    }
};

partyCommand = function (src, channel, command, lower, name, auth) {
    if (helpers.isLoaded("party.js") && partycommands[lower] !== undefined) {
        if (channel != partychannel) {
            helpers.starfox(src, channel, command, bots.party, "Error 403, this command is meant to be used in the <a href='po:join/" + permchannels[3] + "'>#" + permchannels[3] + "</a> channel.");
            return;
        }
        if (helpers.isMutable(partycommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        }
        partycommands[lower](src, channel, command);
    }
};

funCommand = function (src, channel, command, lower, name, auth) {
    if (helpers.isLoaded("funcmds.js") && funcommands[lower] !== undefined) {
        if (helpers.isMutable(funcommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        }
        funcommands[lower](src, channel, command);
    }
};

channelUserCommand = function (src, channel, command, lower, name, auth) {
    if (cusercommands[lower] !== undefined) {
        if (helpers.isMutable(cusercommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        }
        cusercommands[lower](src, channel, command);
    }
};

channelModCommand = function (src, channel, command, lower, name, auth, cauth) {
    if (cmodcommands[lower] !== undefined) {
        if (cauth < 1 && auth < 1) {
            helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
            return;
        } else if (helpers.isMutable(cmodcommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        } else {
            cmodcommands[lower](src, channel, command);
        }
    }
};

channelAdminCommand = function (src, channel, command, lower, name, auth, cauth) {
    if (cadmincommands[lower] !== undefined) {
        if (cauth < 2 && auth < 2) {
            helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
            return;
        } else if (helpers.isMutable(cadmincommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        } else {
            cadmincommands[lower](src, channel, command);
        }
    }
};

channelOwnerCommand = function (src, channel, command, lower, name, auth, cauth) {
    if (cownercommands[lower] !== undefined) {
        if (cauth < 3 && auth < 3) {
            helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
            return;
        } else if (helpers.isMutable(cownercommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        } else {
            cownercommands[lower](src, channel, command);
        }
    }
};

modCommand = function (src, channel, command, lower, name, auth) {
    if (modcommands[lower] !== undefined) {
        if (auth < 1) {
            helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
            return;
        } else if (helpers.isMutable(modcommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        } else {
            modcommands[lower](src, channel, command);
        }
    }
};

adminCommand = function (src, channel, command, lower, name, auth) {
    if (admincommands[lower] !== undefined) {
        if (auth < 2) {
            helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
            return;
        } else if (helpers.isMutable(admincommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        } else {
            admincommands[lower](src, channel, command);
        }
    }
};

ownerCommand = function (src, channel, command, lower, name, auth) {
    if (ownercommands[lower] !== undefined) {
        if (auth < 3) {
            helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
            return;
        } else if (helpers.isMutable(ownercommands[lower]) && mutedOrSilenced(src, channel, command, name, auth)) {
            return;
        } else {
            ownercommands[lower](src, channel, command);
        }
    }
};

executeCommand = function (src, channel, command, name, lower, auth, cauth) {
    userCommand(src, channel, command, lower, name, auth);
    bigtextCommand(src, channel, command, lower, name, auth);
    rouletteCommand(src, channel, command, lower, name, auth);
    russianRouletteCommand(src, channel, command, lower, name, auth);
    partyCommand(src, channel, command, lower, name, auth);
    funCommand(src, channel, command, lower, name, auth);
    channelUserCommand(src, channel, command, lower, name, auth);
    channelModCommand(src, channel, command, lower, name, auth, cauth);
    channelAdminCommand(src, channel, command, lower, name, auth, cauth);
    channelOwnerCommand(src, channel, command, lower, name, auth, cauth);
    modCommand(src, channel, command, lower, name, auth);
    adminCommand(src, channel, command, lower, name, auth);
    ownerCommand(src, channel, command, lower, name, auth);
};

watchChannelLogging = function (message, channel, name, lower, color) {
    if (regchannels[sys.channel(channel).toLowerCase()]) {
        if (!regchannels[sys.channel(channel).toLowerCase()].priv) {
            if (!helpers.isInArray(lower, silentcommands)) {
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[<a href=\"po:join/" + sys.channel(channel) + "\">#" + sys.channel(channel) + "</a>] <b><font color='" + color +
                "'>" + helpers.escapehtml(name) + "</font></b> ran /" + helpers.escapehtml(message.slice(1)) + ".");
            }
        }
    } else {
        if (!helpers.isInArray(lower, silentcommands)) {
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[<a href=\"po:join/" + sys.channel(channel) + "\">#" + sys.channel(channel) + "</a>] <b><font color='" + color +
            "'>" + helpers.escapehtml(name) + "</font></b> ran /" + helpers.escapehtml(message.slice(1)) + ".");
        }
    }
};

parseCommand = function (src, message, channel, name, auth) {
    var cauth = helpers.cauth(players[src].name.toLowerCase(), channel), color = helpers.color(src), lower = "", command, cmd;
    filterLastMessage(src, message, channel);
    command = message.replace(COMMAND_SYMBOL, "");
    cmd = command;
    while (cmd !== "" && cmd.charAt(0) != ' ') {
        lower += cmd.charAt(0).toLowerCase();
        cmd = cmd.slice(1);
    }
    if (allcommands.indexOf(lower) == -1 && !bigtexts[lower]) {
        helpers.starfox(src, channel, command, bots.command, "Error 404, command '" + helpers.escapehtml(lower) + "' not found.");
        return;
    }
    command = command.replace(' ', DELIMITER).split(DELIMITER);
    executeCommand(src, channel, command, name, lower, auth, cauth);
    watchChannelLogging(message, channel, name, lower, color);
};