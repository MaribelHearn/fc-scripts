/*
    ----------------------------------------------
    FUN COMMUNITY COMMAND HANDLER handler.js
     - by Maribel Hearn, 2015-2025

    This script file contains the command
    handler, which will parse a given command
    and execute it if possible.
    ----------------------------------------------
*/

// Private functions
function filterLastMessage(src, message, channel) {
    if (regchannels[sys.channel(channel).toLowerCase()]) {
        if (!regchannels[sys.channel(channel).toLowerCase()].priv && !helpers.isInString(message, silentcommands)) {
            players[src].lastmessage = message;
            players[src].lastmessagetime = new Date();
        }
    }
}

function isMutable(commandFunction) {
    return /sendAll|sendHtmlAll|sendHtmlMain|sendHtmlAuths|sendHtmlAuth|sendHtmlOwner/.test(commandFunction.toString());
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

function channelChecks(src, channel, command, script) {
    var file = script.split('/')[1];

    if (file == "party.js" && channel !== partychannel) {
        helpers.starfox(src, channel, command, bots.party, "Error 403, this command is meant to be used in the " + helpers.channelLink(sys.channel(partychannel)) + " channel.");
        return false;
    }

    if (file == "roulette.js" && channel !== roulettechannel) {
        helpers.starfox(src, channel, command, bots.roulette, "Error 403, this command is meant to be used in the " + helpers.channelLink(sys.channel(roulettechannel)) + " channel.");
        return false;
    }

    if (file == "rr.js" && channel !== rrchannel) {
        helpers.starfox(src, channel, command, bots.rr, "Error 403, this command is meant to be used in the the " + helpers.channelLink(sys.channel(rrchannel)) + " channel.");
        return false;
    }

    if (file == "safari.js" && channel !== safarichannel) {
        helpers.starfox(src, channel, command, bots.safari, "Error 403, this command is meant to be used in the " + helpers.channelLink(sys.channel(safarichannel)) + " channel.");
        return false;
    }

    if (file == "mafia.js" && channel !== mafiachannel) {
        helpers.starfox(src, channel, command, bots.mafia, "Error 403, this command is meant to be used in the " + helpers.channelLink(sys.channel(mafiachannel)) + " channel.");
        return false;
    }

    return true;
}

function clearanceChecks(src, channel, command, name, auth, cauth, message, script, commandFunction) {
    var file = script.split('/')[1];

    var serverPermission = !(file == "modcmds.js" && auth < 1 || file == "admincmds.js" && auth < 2 || file == "ownercmds.js" && auth < 3);
    var channelPermission = !(file == "cmodcmds.js" && cauth < 1 || file == "cadmincmds.js" && cauth < 2 || file == "cownercmds.js" && cauth < 3);

    if (!serverPermission || !channelPermission) {
        helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
        return false;
    }

    if (isMutable(commandFunction) && mutedOrSilenced(src, channel, command, name, auth, message)) {
        return false;
    }

    return true;
}

function stackTraceTable(stackTrace, script) {
    var stacktracemessage = "Stack trace:"
    + "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
    + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
    + "<th>Function</th><th>Arguments</th><th>Line</th></tr></thead><tbody>";
    for (var i = 0; i < stackTrace.length - 1; i++) { // skip "global -1" line
        line = stackTrace[i].split(/\(|\)/);
        stacktracemessage += "<tr>";
        stacktracemessage += "<td>" + line[0] + "</td>";
        stacktracemessage += "<td>" + line[1] + "</td>";
        stacktracemessage += "<td>" + (i === 0 ? script + ": " : "") + line[2].replace("at ", "") + "</td>";
        stacktracemessage += "</tr>";
    }
    stacktracemessage += "</tbody></table>";
    return stacktracemessage;
}

function executeCommand(src, channel, command, script, commandName) {
    try {
        require(script).commands[commandName](src, channel, command);
        return 2; // success
    } catch (err) {
        var functionName = err.backtracetext.split('(')[0];
        if (functionIndex.hasOwnProperty(functionName)) {
            script = functionIndex[functionName];
        }
        sys.sendHtmlOwner(helpers.bot(bots.script) + "Error in module " + script + " on line " + err.lineNumber + ": " + err);
        sys.sendHtmlOwnerChannel(helpers.bot(bots.script) + stackTraceTable(err.backtrace, script));
        return 3; // error
    }
}

function tryBigtextCommand(src, channel, command) {
    var funcommands = require("plugins/funcmds.js");

    if (!funcommands.hasBigtext(command[0])) {
        return 0; // not found
    }

    try {
        funcommands.runBigtext(src, channel, command);
        return 2; // success
    } catch (err) {
        sys.sendHtmlOwner(helpers.bot(bots.script) + "Error in module plugins/funcmds.js on line " + err.lineNumber + ": " + err);
        return 3; // error
    }
}

function findCommand(src, channel, command, name, lower, auth, cauth, message) {
    var modules = sys.filesForDirectory("scripts");
    modules.forEach(function (item, index, arr) {
        arr[index] = "scripts/" + item;
    });

    var plugins = sys.filesForDirectory("plugins");
    if (plugins) {
        plugins.forEach(function (item, index, arr) {
            arr[index] = "plugins/" + item;
        });
    }

    var scripts = modules.concat(plugins);
    var numberOfScripts = scripts.length;
    
    var commandName = command[0];
    var script, commands, commandFunction;

    for (var i = 0; i < numberOfScripts; i++) {
        script = scripts[i];

        if (!require(script).hasOwnProperty("commands")) {
            continue;
        }

        commands = require(script).commands;

        if (commands.hasOwnProperty(commandName)) {
            commandFunction = commands[commandName];
            if (script.contains("plugins") && !channelChecks(src, channel, command, script)) {
                return 1; // starfox/mute
            }
            if (clearanceChecks(src, channel, command, name, auth, cauth, message, script, commandFunction)) {
                return executeCommand(src, channel, command, script, commandName);
            } else {
                return 1; // starfox/mute
            }
        }
    }

    if (scripts.indexOf("plugins/funcmds.js") != -1) {
        return tryBigtextCommand(src, channel, command);
    }

    return 0; // not found
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

    var plugins = sys.filesForDirectory("plugins");
    var pluginEvent;
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

// Public functions
function parseCommand(src, message, channel, name, auth) {
    var cauth = helpers.cauth(players[src].name.toLowerCase(), channel);
    var channelName = sys.channel(channel);
    var color = helpers.color(src);
    var lower = "";
    filterLastMessage(src, message, channel);
    var command = message.replace(COMMAND_SYMBOL, "");
    var cmd = command;

    while (cmd !== "" && cmd.charAt(0) != ' ') {
        lower += cmd.charAt(0).toLowerCase();
        cmd = cmd.slice(1);
    }

    command = command.replace(' ', DELIMITER).split(DELIMITER);
    var starfox = findCommand(src, channel, command, name, lower, auth, cauth, message);

    /*
        * 0 = not found
        * 1 = starfox/mute
        * 2 = command successfully executed
        * 3 = error
        */
    if (starfox === 0) {
        helpers.starfox(src, channel, command, bots.command, "Error 404, command '" + helpers.escapehtml(lower) + "' not found.");
    } else if (starfox == 2) {
        watchChannelLogging(message, channel, name, lower, color, channelName);
    }
}

module.exports = {
    parseCommand: function (src, message, channel, name, auth) {
        parseCommand(src, message, channel, name, auth);
    }
};
