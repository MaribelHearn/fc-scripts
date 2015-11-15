/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY COWNER COMMANDS cownercmds.js
     - by Maribel Hearn, 2012-2015
    
    This file contains commands that can be
    run by channel owners.
    ----------------------------------------------
*/
    cownercommands = {
        cownercommands: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Channel Owner Commands</h2>"
            + "<br>"
            + "<b>" + helpers.user("/unregisterthis") + "</b>: unregisters the current channel.<br>"
            + "<b>" + helpers.user("/perm") + "</b>: shifts whether the current channel is permanent or not. Also /stay.<br>"
            + "<b>" + helpers.user("/priv") + "</b>: shifts whether the current channel is private or not.<br>"
            + "<b>" + helpers.user("/zalgochar") + "</b>: shifts whether zalgo is allowed or not.<br>"
            + "<b>" + helpers.user("/reversechar") + "</b>: shifts whether reverse characters are allowed or not.<br>"
            + "<b>" + helpers.user("/extendingchar") + "</b>: shifts whether extending characters are allowed or not.<br>"
            + "<b>" + helpers.user("/backwardchar") + "</b>: shifts whether characters that push your text backward are allowed or not.<br>"
            + "<b>" + helpers.user("/cuser ") + helpers.arg("player") + "</b>: changes <b>player</b>'s channel auth level to user.<br>"
            + "<b>" + helpers.user("/cmod ") + helpers.arg("player") + "</b>: changes <b>player</b>'s channel auth  level to moderator.<br>"
            + "<b>" + helpers.user("/cadmin ") + helpers.arg("player") + "</b>: changes <b>player</b>'s channel auth level to administrator.<br>"
            + "<b>" + helpers.user("/cowner ") + helpers.arg("player") + "</b>: changes <b>player</b>'s channel auth level to owner.<br>"
            + "<b>" + helpers.user("/crangeban ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: range bans <b>player</b> from the current channel for <b>reason</b>.<br>"
            + "<b>" + helpers.user("/crangeunban ") + helpers.arg("player") + "</b>: range unbans <b>player</b> from the current channel.<br>"
            + "<b>" + helpers.user("/addcrule ") + helpers.arg("number") + helpers.arg2("*text") + "</b>: adds channel rule <b>number</b> that is <b>text</b>.<br>"
            + "<b>" + helpers.user("/changecrule ") + helpers.arg("number") + helpers.arg2("*text") + "</b>: changes channel rule <b>number</b> to <b>text</b>.<br>"
            + "<b>" + helpers.user("/removecrule ") + helpers.arg("number") + "</b>: removes channel rule <b>number</b>.<br>"
            + "<b>" + helpers.user("/clearcrules") + "</b>: clears the channel rules.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        unregisterthis: function (src, channel, command) {
            var name = sys.name(src), lower = sys.channel(channel).toLowerCase();
            if (regchannels[lower]) {
                delete regchannels[lower];
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + "The channel has been unregistered by " + name + "!", channel);
        }
        
        ,
        
        stay: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase();
            if (regchannels[lower]) {
                if (regchannels[lower].stay) {
                    regchannels[lower].stay = false;
                } else {
                    regchannels[lower].stay = true;
                }
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(sys.name(src)) + " has made the channel permanent.</b>", channel);
        }
        
        ,
        
        perm: function (src, channel, command) {
            this.stay(src, channel, command);
        }
        
        ,
        
        priv: function (src, channel, command) {
            var name = sys.name(src), lower = sys.channel(channel).toLowerCase();
            if (regchannels[lower]) {
                if (regchannels[lower].priv) {
                    regchannels[lower].priv = false;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has made the channel public.</b>", channel);
                } else {
                    regchannels[lower].priv = true;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has made the channel private.</b>", channel);
                }
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
        }
        
        ,
        
        zalgochar: function (src, channel, command) {
            var name = helpers.escapehtml(sys.name(src)), lower = sys.channel(channel).toLowerCase();
            if (regchannels[lower]) {
                if (regchannels[lower].zalgo) {
                    regchannels[lower].zalgo = false;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has disallowed zalgo characters on the channel.</b>", channel);
                } else {
                    regchannels[lower].zalgo = true;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has allowed zalgo characters on the channel.</b>", channel);
                }
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
        }
        
        ,
        
        reversechar: function (src, channel, command) {
            var name = helpers.escapehtml(sys.name(src)), lower = sys.channel(channel).toLowerCase();
            if (regchannels[lower]) {
                if (regchannels[lower].reverse) {
                    regchannels[lower].reverse = false;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has disallowed reverse characters on the channel.</b>", channel);
                } else {
                    regchannels[lower].reverse = true;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has allowed reverse characters on the channel.</b>", channel);
                }
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
        }
        
        ,
        
        extendingchar: function (src, channel, command) {
            var name = helpers.escapehtml(sys.name(src)), lower = sys.channel(channel).toLowerCase();
            if (regchannels[lower]) {
                if (regchannels[lower].extending) {
                    regchannels[lower].extending = false;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has disallowed extending characters on the channel.</b>", channel);
                } else {
                    regchannels[lower].extending = true;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has allowed extending characters on the channel.</b>", channel);
                }
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
        }
        
        ,
        
        backwardchar: function (src, channel, command) {
            var name = helpers.escapehtml(sys.name(src)), lower = sys.channel(channel).toLowerCase();
            if (regchannels[lower]) {
                if (regchannels[lower].backward) {
                    regchannels[lower].backward = false;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has disallowed characters that push your text backward on the channel.</b>", channel);
                } else {
                    regchannels[lower].backward = true;
                    sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(name) + " has allowed characters that push your text backward on the channel.</b>", channel);
                }
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
        }
        
        ,
        
        cuser: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase();
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.");
                return;
            }
            if (!sys.dbIp(command[1].toLowerCase())) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, that player doesn't exist in the database!");
                return;
            }
            if (regchannels[lower]) {
                if (regchannels[lower].mods.indexOf(command[1].toLowerCase()) != -1) {
                    regchannels[lower].mods.splice(regchannels[lower].mods.indexOf(command[1].toLowerCase()), 1);
                }        
                if (regchannels[lower].admins.indexOf(command[1].toLowerCase()) != -1) {
                    regchannels[lower].admins.splice(regchannels[lower].admins.indexOf(command[1].toLowerCase()), 1);
                }
                if (regchannels[lower].owners.indexOf(command[1].toLowerCase()) != -1) {
                    regchannels[lower].owners.splice(regchannels[lower].owners.indexOf(command[1].toLowerCase()), 1);
                }
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
                return;
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.arg(command[1]) + " has been made Channel User by " + helpers.user(sys.name(src)) + "!</b>", channel);
        }
        
        ,
        
        cmod: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase();
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.");
                return;
            }
            if (!sys.dbIp(command[1].toLowerCase())) {
                helpers.starfox(src, channel, command, bots.channel, "That player doesn't exist in the database!");
                return;
            }
            if (regchannels[lower]) {    
                if (regchannels[lower].admins.indexOf(command[1].toLowerCase()) != -1) {
                    regchannels[lower].admins.splice(regchannels[lower].admins.indexOf(command[1].toLowerCase()), 1);
                }
                if (regchannels[lower].owners.indexOf(command[1].toLowerCase()) != -1) {
                    regchannels[lower].owners.splice(regchannels[lower].owners.indexOf(command[1].toLowerCase()), 1);
                }
                regchannels[lower].mods.push(command[1].toLowerCase());
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
                return;
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.arg(command[1]) + " has been made Channel Mod by " + helpers.user(sys.name(src)) + "!</b>", channel);
        }
        
        ,
        
        cadmin: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase();
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.");
                return;
            }
            if (!sys.dbIp(command[1].toLowerCase())) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, that player doesn't exist in the database!");
                return;
            }
            if (regchannels[lower]) {
                if (regchannels[lower].mods.indexOf(command[1].toLowerCase()) != -1) {
                    regchannels[lower].mods.splice(regchannels[lower].mods.indexOf(command[1].toLowerCase()), 1);
                }
                if (regchannels[lower].owners.indexOf(command[1].toLowerCase()) != -1) {
                    regchannels[lower].owners.splice(regchannels[lower].owners.indexOf(command[1].toLowerCase()), 1);
                }
                regchannels[lower].admins.push(command[1].toLowerCase());
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
                return;
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.arg(command[1]) + " has been made Channel Admin by " + helpers.user(sys.name(src)) + "!</b>", channel);
        }
        
        ,
        
        cowner: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase();
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.");
                return;
            }
            if (!sys.dbIp(command[1].toLowerCase())) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, that player doesn't exist in the database!");
                return;
            }
            if (regchannels[lower]) {
                if (regchannels[lower].mods.indexOf(command[1].toLowerCase()) != -1) {
                    regchannels[lower].mods.splice(regchannels[lower].mods.indexOf(command[1].toLowerCase()), 1);
                }        
                if (regchannels[lower].admins.indexOf(command[1].toLowerCase()) != -1) {
                    regchannels[lower].admins.splice(regchannels[lower].admins.indexOf(command[1].toLowerCase()), 1);
                }
                regchannels[lower].owners.push(command[1].toLowerCase());
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
                return;
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.arg(command[1]) + " has been made Channel Owner by " + helpers.user(sys.name(src)) + "!</b>", channel);
        }
        
        ,
        
        crangeban: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase(), reason = command[2];
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.", channel);
                return;
            }
            if (!reason) {
                reason = "Unknown";
            }
            var trgtname = command[1];
            if (!sys.dbIp(trgtname)) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't range ban " + trgtname + " because they do not exist in the database.");
                return;
            }
            if (regchannels[lower]) {
                var trgtip = sys.dbRange(command[1]), name = trgtname.toLowerCase();
                if (regchannels[lower].rangebanlist[name]) {
                    helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't range ban " + trgtname + " because they are already range banned!");
                    return;
                }
                regchannels[lower].rangebanlist[name] = {};
                regchannels[lower].rangebanlist[name].range = trgtip;
                regchannels[lower].rangebanlist[name].banner = sys.name(src);
                regchannels[lower].rangebanlist[name].reason = reason;
                var date = helpers.date(new Date());
                regchannels[lower].rangebanlist[name].date = date;
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
            var trgt = sys.id(trgtname);
            if (trgt && sys.isInChannel(trgt, channel)) {
                sys.kick(trgt, channel);
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + trgtname + " has been range banned from this channel by " + sys.name(src) + "! [Reason: " + reason + "]", channel);
        }
        
        ,
        
        crangeunban: function (src, channel, command) {
            var trgtname = command[1], name = command[1].toLowerCase(), lower = sys.channel(channel).toLowerCase();
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.", channel);
                return;
            }
            if (!sys.dbIp(name)) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't range unban " + trgtname + " because they don't exist in the database.");
                return;
            }
            if (!regchannels[lower].rangebanlist[name]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't range unban " + trgtname + " because they aren't range banned!");
                return;
            }
            for (var index in regchannels[lower].rangebanlist) {
                if (sys.dbRange(index) == sys.dbRange(trgtname)) {
                    delete regchannels[lower].rangebanlist[index];
                    sys.write("data/regchannels.txt", JSON.stringify(regchannels));
                }
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + trgtname + " has been range unbanned from this channel by " + sys.name(src) + "!", channel);
        }
        
        ,
        
        addcrule: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase();
            if (channel === 0) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, you cannot add channel rules in the main channel.");
                return;
            }
            if (!command[1] || isNaN(command[1])) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, number not found.");
                return;
            }
            if (regchannels[lower]) {
                if (command[1] < 1 || command[1] > 20 || regchannels[lower].rules.length > 20) {
                    helpers.starfox(src, channel, command, bots.channel, "Error 403, your number of rules may not be lower than 1 or higher than 20!");
                    return;
                }
                regchannels[lower].rules[command[1]] = command[2];
                sys.sendHtmlAll(helpers.bot(bots.channel) + sys.name(src) + " has added Rule " + command[1] + "!", channel);
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
                return;
            }
            sys.write("data/regchannels.txt", JSON.stringify(regchannels));
        }
        
        ,
        
        changecrule: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase();
            if (channel === 0) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, you cannot change channel rules in the main channel.");
                return;
            }
            if (!command[1] || isNaN(command[1])) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, number not found.");
                return;
            }
            if (command[1] < 1 || command[1] > 20) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, the number may not be lower than 1 or higher than 20.");
                return;
            }
            if (!command[2]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, text not found.");
                return;
            }
            if (regchannels[lower]) {
                if (!regchannels[lower].rules[command[1]]) {
                    helpers.starfox(src, channel, command, bots.channel, "Error 400, that rule hasn't yet been added!");
                    return;
                }
                regchannels[lower].rules[command[1]] = command[2];
                sys.sendHtmlAll(helpers.bot(bots.channel) + sys.name(src) + " has changed Rule " + command[1] + " to '" + command[2] + "'!", channel);
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
                return;
            }
            sys.write("data/regchannels.txt", JSON.stringify(regchannels));
        }
        
        ,
        
        removecrule: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase();
            if (channel === 0) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, you cannot remove channel rules in the main channel.");
                return;
            }
            if (!command[1] || isNaN(command[1])) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, number not found.");
                return;
            }
            if (command[1] < 1 || command[1] > 20) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, the number may not be lower than 1 or higher than 20.");
                return;
            }
            if (regchannels[lower]) {
                if (!regchannels[lower].rules[command[1]]) {
                    helpers.starfox(src, channel, command, bots.channel, "Error 400, that rule hasn't yet been added!");
                    return;
                }
                delete regchannels[lower].rules[command[1]];
                sys.sendHtmlAll(helpers.bot(bots.channel) + sys.name(src) + " has removed Rule " + command[1] + "!", channel);
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
                return;
            }
            sys.write("data/regchannels.txt", JSON.stringify(regchannels));
        }
        
        ,
        
        clearcrules: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase();
            if (!regchannels[lower]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
                return;
            }
            regchannels[lower].rules = [];
            sys.sendHtmlAll(helpers.bot(bots.channel) + sys.name(src) + " has cleared the Channel Rules!", channel);
            sys.write("data/regchannels.txt", JSON.stringify(regchannels));
        }
    };
