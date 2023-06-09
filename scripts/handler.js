/*
    ----------------------------------------------
    FUN COMMUNITY COMMAND HANDLER handler.js
     - by Maribel Hearn, 2015-2023

    This script file contains the command
    handler, which will parse a given command
    and execute it if possible.
    ----------------------------------------------
*/
var executors = {
    userCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (usercommands[lower] !== undefined) {
            if (helpers.isMutable(usercommands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message)) {
                return 1;
            }
            usercommands[lower](src, channel, command);
            return 2;
        }
        return 0;
    },
    
    channelUserCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (cusercommands[lower] !== undefined) {
            if (helpers.isMutable(cusercommands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message)) {
                return 1;
            }
            cusercommands[lower](src, channel, command);
            return 2;
        }
        return 0;
    },
    
    bigtextCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        var bigtexts = funcommands.getBigtexts();
        if (require.cache.hasOwnProperty("funcmds.js") && bigtexts[lower] !== undefined) {
            if (mutedOrSilenced(src, channel, command, name, auth)) {
                return 1;
            }
            funcommands.commands.bigtext(src, channel, bigtexts[lower]);
            return 2;
        }
        return 0;
    },
    
    funCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (require.cache.hasOwnProperty("funcmds.js") && funcommands.commands[lower] !== undefined) {
            if (helpers.isMutable(funcommands.commands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message)) {
                return 1;
            }
            funcommands.commands[lower](src, channel, command);
            return 2;
        }
        return 0;
    },
    
    partyCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (require.cache.hasOwnProperty("party.js") && partycommands.commands[lower] !== undefined) {
            if (channel != partychannel) {
                helpers.starfox(src, channel, command, bots.party, "Error 403, this command is meant to be used in the " + helpers.channelLink(sys.channel(partychannel)) + " channel.");
                return 1;
            } else if (!(helpers.isMutable(partycommands.commands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                partycommands.commands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    rouletteCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (require.cache.hasOwnProperty("roulette.js") && roulettecommands.commands[lower] !== undefined) {
            if (channel != roulettechannel) {
                helpers.starfox(src, channel, command, bots.roulette, "Error 403, this command is meant to be used in the " + helpers.channelLink(sys.channel(roulettechannel)) + " channel.");
                return 1;
            } else if (!(helpers.isMutable(roulettecommands.commands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                roulettecommands.commands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    russianRouletteCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (require.cache.hasOwnProperty("rr.js") && rrcommands.commands[lower] !== undefined) {
            if (channel != rrchannel) {
                helpers.starfox(src, channel, command, bots.rr, "Error 403, this command is meant to be used in the the " + helpers.channelLink(sys.channel(rrchannel)) + " channel.");
                return 1;
            } else if (!(helpers.isMutable(rrcommands.commands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                rrcommands.commands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    safariCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (require.cache.hasOwnProperty("safari.js") && safaricommands.commands[lower] !== undefined) {
            if (channel != safarichannel) {
                helpers.starfox(src, channel, command, bots.roulette, "Error 403, this command is meant to be used in the " + helpers.channelLink(sys.channel(safarichannel)) + " channel.");
                return 1;
            } else if (!(helpers.isMutable(safaricommands.commands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                safaricommands.commands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    mafiaCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (require.cache.hasOwnProperty("mafia.js") && mafiacommands.commands[lower] !== undefined) {
            if (channel != mafiachannel) {
                helpers.starfox(src, channel, command, bots.mafia, "Error 403, this command is meant to be used in the " + helpers.channelLink(sys.channel(mafiachannel)) + " channel.");
                return 1;
            } else if (!(helpers.isMutable(mafiacommands.commands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                mafiacommands.commands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    channelModCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (cmodcommands[lower] !== undefined) {
            if (cauth < 1 && auth < 1) {
                helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
                return 1;
            } else if (!(helpers.isMutable(cmodcommands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                cmodcommands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    channelAdminCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (cadmincommands[lower] !== undefined) {
            if (cauth < 2 && auth < 2) {
                helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
                return 1;
            } else if (!(helpers.isMutable(cadmincommands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                cadmincommands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    channelOwnerCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (cownercommands[lower] !== undefined) {
            if (cauth < 3 && auth < 3) {
                helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
                return 1;
            } else if (!(helpers.isMutable(cownercommands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                cownercommands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    modCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (modcommands[lower] !== undefined) {
            if (auth < 1) {
                helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
                return 1;
            } else if (!(helpers.isMutable(modcommands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                modcommands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    adminCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (admincommands[lower] !== undefined) {
            if (auth < 2) {
                helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
                return 1;
            } else if (!(helpers.isMutable(admincommands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                admincommands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    },
    
    ownerCommand: function (src, channel, command, lower, name, auth, cauth, message) {
        if (ownercommands[lower] !== undefined) {
            if (auth < 3) {
                helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
                return 1;
            } else if (!(helpers.isMutable(ownercommands[lower]) && mutedOrSilenced(src, channel, command, name, auth, message))) {
                ownercommands[lower](src, channel, command);
                return 2;
            }
        }
        return 0;
    }
};

function filterLastMessage(src, message, channel) {
    if (regchannels[sys.channel(channel).toLowerCase()]) {
        if (!regchannels[sys.channel(channel).toLowerCase()].priv && !helpers.isInString(message, silentcommands)) {
            players[src].lastmessage = message;
            players[src].lastmessagetime = new Date();
        }
    }
}

function mutedOrSilenced(src, channel, command, name, auth, message) {
    if (auth >= 3) {
        return false;
    }
    if (helpers.muteCheck(name)) {
        helpers.muteMessage(src, channel, message);
        return true;
    }
    if (helpers.cmuteCheck(players[src].name, sys.channel(channel).toLowerCase())) {
        helpers.channelMuteMessage(src, channel);
        return true;
    }
    if (regchannels[sys.channel(channel).toLowerCase()]) {
        if (regchannels[sys.channel(channel).toLowerCase()].silence > helpers.cauth(name, channel)) {
            helpers.silenceMessage(src, channel);
            return true;
        }
    }
}

function executeCommand(src, channel, command, name, lower, auth, cauth, message) {
    var commands = ["user", "channelUser", "bigtext", "fun", "party", "roulette", "russianRoulette", "safari",
    "mafia", "channelMod", "channelAdmin", "channelOwner", "mod", "admin", "owner"], done = 0, i;
    for (i in commands) {
        done = executors[commands[i] + "Command"](src, channel, command, lower, name, auth, cauth, message);
        if (done > 0) { // 0 = not found, 1 = starfox/mute, 2 = done
            break;
        }
    }
    return done;
}

function watchChannelLogging(message, channel, name, lower, color, channelName) {
    if (regchannels[channelName.toLowerCase()]) {
        if (!regchannels[channelName.toLowerCase()].priv && !silentcommands.contains(lower)) {
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[" + helpers.channelLink(channelName) +
            "] <b><font color='" + color + "'>" + helpers.escapehtml(name) +
            "</font></b> ran " + helpers.escapehtml(message) + ".");
        }
    } else {
        if (!silentcommands.contains(lower)) {
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[" + helpers.channelLink(channelName) +
            "] <b><font color='" + color + "'>" + helpers.escapehtml(name) +
            "</font></b> ran " + helpers.escapehtml(message) + ".");
        }
    }
    for (var i in plugins) {
        if (Object.keys(OFFICIAL_PLUGINS).contains(plugins[i])) {
            continue;
        }
        pluginEvent = plugins[i].replace(".js", "") + "Watch";
        if (global[pluginEvent]) {
            global[pluginEvent](message, channel, name, color);
        }
    }
}

module.exports = {
    parseCommand: function (src, message, channel, name, auth) {
        var cauth = helpers.cauth(players[src].name.toLowerCase(), channel), channelName = sys.channel(channel),
            color = helpers.color(src), lower = "", starfox = 0, command, cmd;
        filterLastMessage(src, message, channel);
        command = message.replace(COMMAND_SYMBOL, "");
        cmd = command;
        while (cmd !== "" && cmd.charAt(0) != ' ') {
            lower += cmd.charAt(0).toLowerCase();
            cmd = cmd.slice(1);
        }
        command = command.replace(' ', DELIMITER).split(DELIMITER);
        starfox = executeCommand(src, channel, command, name, lower, auth, cauth, message);
        if (starfox === 0) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, command '" + helpers.escapehtml(lower) + "' not found.");
        }
        if (starfox == 2) { // 0 = not found, 1 = starfox/mute, 2 = command successfully executed
            watchChannelLogging(message, channel, name, lower, color, channelName);
        }
    }
};
