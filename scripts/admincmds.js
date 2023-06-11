/*
    ----------------------------------------------
    FUN COMMUNITY ADMIN COMMANDS admincmds.js
     - by Maribel Hearn, 2012-2021

    This file contains commands that can be
    run by administrators.
    ----------------------------------------------
*/

module.exports = {
    commands: {
        admincommands: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands</h2>"
            + "<br>"
            + "<b>" + helpers.userl("/banoptions") + "</b>: displays ban options.<br>"
            + "<b>" + helpers.userl("/admintouroptions") + "</b>: displays admin tour options.<br>"
            + "<b>" + helpers.userl("/banneroptions") + "</b>: displays banner and description options.<br>"
            + "<b>" + helpers.userl("/dboptions") + "</b>: displays database options.<br>"
            + "<b>" + helpers.userl("/battlesettings") + "</b>: displays battle settings.<br>"
            + "<b>" + helpers.userl("/botsettings") + "</b>: displays bot settings.<br>"
            + "<b>" + helpers.userl("/floodsettings") + "</b> displays flooding settings.<br>"
            + "<b>" + helpers.userl("/rulesettings") + "</b>: displays rule settings.<br>"
            + "<b>" + helpers.userl("/messagesettings") + "</b>: displays message settings.<br>"
            + "<b>" + helpers.userl("/colorsettings") + "</b>: displays color settings. Also /coloursettings.<br>"
            + "<b>" + helpers.userl("/listsettings") + "</b>: displays mute and banlist customisation settings.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        /**
            ---------------------
            Admin Justice Options
            ---------------------
        **/
        banoptions: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ Ban Options</h2>"
            + "<br>"
            + "<b>" + helpers.user("/ban ") + helpers.arg("player") + helpers.arg2("*reason") + helpers.arg3("*time") + "</b>: bans <b>player</b> from the server for <b>time</b> for <b>reason</b>. Also /b.<br>"
            + "<b>" + helpers.user("/unban ") + helpers.arg("player") + "</b>: unbans <b>player</b> from the server.<br>"
            + "<b>" + helpers.user("/ipban ") + helpers.arg("IP") + helpers.arg2("*reason") + helpers.arg3("*time") + "</b>: bans <b>IP</b> from the server for <b>time</b> for <b>reason</b>.<br>"
            + "<b>" + helpers.user("/ipunban ") + helpers.arg("IP") + "</b>: unbans <b>IP</b> from the server.<br>"
            + "<b>" + helpers.user("/banreason ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: changes the ban reason for <b>player</b> to <b>reason</b>.<br>"
            + "<b>" + helpers.user("/clearbanlist") + "</b>: clears the server's ban list.<br>"
            + "<b>" + helpers.user("/rangeban ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: range bans <b>player</b> from the server for <b>reason</b>. Also /rb.<br>"
            + "<b>" + helpers.user("/rangeunban ") + helpers.arg("player") + "</b>: range unbans <b>player</b> from the server.<br>"
            + "<b>" + helpers.user("/iprangeban ") + helpers.arg("range") + helpers.arg2("*reason") + "</b>: range bans <b>range</b> from the server for <b>reason</b>.<br>"
            + "<b>" + helpers.user("/iprangeunban ") + helpers.arg("range") + "</b>: range unbans <b>range</b> from the server.<br>"
            + "<b>" + helpers.user("/rangebanreason ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: changes the range ban reason for <b>player</b> to <b>reason</b>.<br>"
            + "<b>" + helpers.user("/clearrangebanlist") + "</b>: clears the server's range ban list.<br>"
            + "<b>" + helpers.user("/megaban ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: mega bans <b>player</b> from the server for <b>reason</b>. Also /mb.<br>"
            + "<b>" + helpers.user("/megaunban ") + helpers.arg("player") + "</b>: mega unbans <b>player</b> from the server.<br>"
            + "<b>" + helpers.user("/megabanreason ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: changes the mega ban reason for <b>player</b> to <b>reason</b>.<br>"
            + "<b>" + helpers.user("/clearmegabanlist") + "</b>: clears the server's mega ban list.<br>"
            + "<b>" + helpers.user("/gigaban ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: giga bans <b>player</b> from the server for <b>reason</b>. Also /gb.<br>"
            + "<b>" + helpers.user("/gigaunban ") + helpers.arg("player") + "</b>: giga unbans <b>player</b> from the server.<br>"
            + "<b>" + helpers.user("/gigabanreason ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: changes the giga ban reason for <b>player</b> to <b>reason</b>.<br>"
            + "<b>" + helpers.user("/cleargigabanlist") + "</b>: clears the server's giga ban list.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        ban: function (src, channel, command) {
            var name = helpers.escapehtml(sys.name(src)), trgtname = command[1], trgt = sys.id(trgtname), reason = command[2], auth = sys.auth(src), trgtauth, trgtip, units, unit, time;
            if (!trgtname) {
                helpers.starfox(src, channel, command, bots.ban, "Error 404, player not found.");
                return;
            }
            trgtname = helpers.escapehtml(trgtname);
            var lower = trgtname.toLowerCase();
            if (sys.dbIp(trgtname) === undefined) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't ban " + trgtname + " because they do not exist in the database.");
                return;
            }
            if (!trgt) {
                trgtauth = sys.dbAuth(trgtname);
                trgtip = sys.dbIp(trgtname);
            } else {
                trgtauth = sys.auth(trgt);
                trgtip = sys.ip(trgt);
            }
            if (trgtauth >= auth && lower != name.toLowerCase() && lower != players[src].name.toLowerCase()) {
                helpers.starfox(src, channel, command, bots.ban, "Error 403, you may not ban " + trgtname + " because their auth level is higher or equal to yours.");
                return;
            }
            if (!reason) {
                reason = "Unknown";
            } else {
                reason = helpers.escapehtml(reason);
            }
            units = ["s", "m", "h", "d", "seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
            banlist[lower] = {};
            banlist[lower].ip = trgtip;
            banlist[lower].bannedby = players[src].name;
            banlist[lower].reason = reason;
            if (!command[3]) {
                banlist[lower].time = "-";
                banlist[lower].starttime = "-";
                time = "forever";
                unit = "";
            } else {
                if (command[3].indexOf(" ") != -1) {
                    command[3] = command[3].split(" ");
                    time = command[3][0];
                    unit = command[3][1];
                } else {
                    time = command[3].charAt(0);
                    unit = command[3].charAt(1);
                }
                if (isNaN(time)) {
                    helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid time.");
                    return;
                }
                if (!helpers.isInArray(unit, units)) {
                    helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid unit.");
                    return;
                }
                if (unit == "s" || unit == "second" || unit == "seconds") {
                    banlist[lower].time = time;
                    time == 1 ? unit = "second" : unit = "seconds";
                } else if (unit == "m" || unit == "minute" || unit == "minutes") {
                    banlist[lower].time = time * 60;
                    time == 1 ? unit = "minute" : unit = "minutes";
                } else if (unit == "h" || unit == "hour" || unit == "hours") {
                    banlist[lower].time = time * 3600;
                    time == 1 ? unit = "hour" : unit = "hours";
                } else if (unit == "d" || unit == "day" || unit == "days") {
                    banlist[lower].time = time * 86400;
                    time == 1 ? unit = "day" : unit = "days";
                }
                banlist[lower].starttime = time + " " + unit;
            }
            var date = helpers.date(new Date());
            banlist[lower].date = date;
            helpers.saveData("banlist", banlist);
            if (members[lower]) {
                trgtname = members[lower];
            }
            if (banmessages[name.toLowerCase()]) {
                if (time == "forever") {
                    msg = banmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Time~/g, "Forever").replace(/~time~/g, "forever").replace(/~Server~/gi, sys.getServerName());
                } else {
                    msg = banmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Time~/gi, time + " " + unit).replace(/~Server~/gi, sys.getServerName());
                }
                sys.sendHtmlAll(helpers.bot(bots.ban) + msg + " [Reason: " + reason + "]");
            } else {
                sys.sendHtmlAll(helpers.bot(bots.ban) + name + " has banned " + trgtname + " from the server" + (time == "forever" ? "" : " for " + time + " ") + unit + "! [Reason: " + reason + "]");
            }
            if (trgt) {
                sys.kick(trgt);
            }
            for (var index in mutelist) {
                if (!sys.dbIp(index)) {
                    delete mutelist[index];
                    continue;
                }
                if (mutelist[index].ip == banlist[lower].ip) {
                    delete mutelist[index];
                    if (members[index]) {
                        index = members[index];
                    }
                    helpers.saveData("mutelist", mutelist);
                    sys.sendHtmlMessage(src, helpers.bot(bots.mute) + index + " has been automatically unmuted.", channel);
                    continue;
                }
            }
        }
    
        ,
    
        b: function (src, channel, command) {
            this.ban(src, channel, command);
        }
    
        ,
    
        ipban: function (src, channel, command) {
            var name = sys.name(src), trgtip = command[1], reason = command[2], auth = sys.auth(src), aliases, units, index;
            if (!trgtip) {
                helpers.starfox(src, channel, command, bots.ban, "Error 404, IP not found.");
                return;
            }
            if (!helpers.isIp(trgtip)) {
                helpers.starfox(src, channel, command, bots.ban, "Error 403, invalid IP.");
                return;
            }
            if (banlist[trgtip]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't ban " + trgtip + " because it is already banned!");
                return;
            }
            if (sys.aliases(trgtip) === undefined) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't ban " + trgtip + " because it doesn't exist in the database.");
                return;
            } else {
                aliases = sys.aliases(trgtip);
                for (index in aliases) {
                    if (sys.dbAuth(aliases[index]) >= auth) {
                        helpers.starfox(src, channel, command, bots.ban, "Error 403, you may not ban " + trgtip + " because one or more of its alts has / have higher auth.");
                        return;
                    }
                }
            }
            if (!reason) {
                reason = "Unknown";
            } else {
                reason = helpers.escapehtml(reason);
            }
            units = ["s", "m", "h", "d", "seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
            banlist[trgtip] = {};
            banlist[trgtip].ip = trgtip;
            banlist[trgtip].bannedby = players[src].name;
            banlist[trgtip].reason = reason;
            if (!command[3]) {
                banlist[trgtip].time = "-";
                banlist[trgtip].starttime = "-";
                time = "forever";
                unit = "";
            } else {
                if (command[3].indexOf(" ") != -1) {
                    command[3] = command[3].split(" ");
                    time = command[3][0];
                    unit = command[3][1];
                } else {
                    time = command[3].charAt(0);
                    unit = command[3].charAt(1);
                }
                if (isNaN(time)) {
                    helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid time.");
                    return;
                }
                if (!helpers.isInArray(unit, units)) {
                    helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid unit.");
                    return;
                }
                if (unit == "s" || unit == "second" || unit == "seconds") {
                    banlist[trgtip].time = time;
                    time == 1 ? unit = "second" : unit = "seconds";
                } else if (unit == "m" || unit == "minute" || unit == "minutes") {
                    banlist[trgtip].time = time * 60;
                    time == 1 ? unit = "minute" : unit = "minutes";
                } else if (unit == "h" || unit == "hour" || unit == "hours") {
                    banlist[trgtip].time = time * 3600;
                    time == 1 ? unit = "hour" : unit = "hours";
                } else if (unit == "d" || unit == "day" || unit == "days") {
                    banlist[trgtip].time = time * 86400;
                    time == 1 ? unit = "day" : unit = "days";
                }
                banlist[trgtip].starttime = time + " " + unit;
                time = "for " + time + " ";
            }
            var date = helpers.date(new Date());
            banlist[trgtip].date = date;
            helpers.saveData("banlist", banlist);
            if (banmessages[name.toLowerCase()]) {
                msg = banmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtip).replace(/~Time~/gi, time + unit).replace(/~Server~/gi, sys.getServerName());
                sys.sendHtmlAll(helpers.bot(bots.ban) + msg + " [Reason: " + reason + "]", channel);
            } else {
                sys.sendHtmlAll(helpers.bot(bots.ban) + helpers.escapehtml(name) + " has IP banned " + trgtip + " from the server " + time + unit + "! [Reason: " + reason + "]", channel);
            }
            for (index in mutelist) {
                if (!sys.dbIp(index)) {
                    delete mutelist[index];
                    continue;
                }
                if (mutelist[index].ip == trgtip) {
                    delete mutelist[index];
                    if (members[index]) {
                        index = members[index];
                    }
                    helpers.saveData("mutelist", mutelist);
                    sys.sendHtmlMessage(src, helpers.bot(bots.mute) + index + " has been automatically unmuted.", channel);
                    continue;
                }
            }
        }
    
        ,
    
        unban: function (src, channel, command) {
            var name = helpers.escapehtml(sys.name(src)), ip;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 404, player not found.");
                return;
            }
            var trgtname = helpers.escapehtml(command[1]), lower = trgtname.toLowerCase();
            if (!sys.dbIp(lower)) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't unban " + trgtname + " because they don't exist in the database!");
                return;
            }
            if (!banlist[lower]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't unban " + trgtname + " because they aren't banned!");
                return;
            }
            for (var index in banlist) {
                if (!sys.dbIp(index) && !helpers.isIp(index)) {
                    ip = banlist[index].ip;
                    banlist[ip] = banlist[index];
                    delete banlist[index];
                    continue;
                }
                if (sys.dbIp(index) == sys.dbIp(trgtname)) {
                    delete banlist[index];
                    helpers.saveData("banlist", banlist);
                }
            }
            if (members[lower]) {
                trgtname = members[lower];
            }
            sys.sendHtmlAll(helpers.bot(bots.ban) + trgtname + " has been unbanned by " + name + "!");
        }
    
        ,
    
        ipunban: function (src, channel, command) {
            var name = sys.name(src);
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 404, IP not found.");
                return;
            }
            var trgtip = command[1];
            if (!helpers.isIp(trgtip)) {
                helpers.starfox(src, channel, command, bots.ban, "Error 403, invalid IP.");
                return;
            }
            if (!banlist[trgtip]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't IP unban " + trgtip + " because it isn't banned!");
                return;
            }
            delete banlist[trgtip];
            helpers.saveData("banlist", banlist);
            sys.sendHtmlAll(helpers.bot(bots.ban) + trgtip + " has been IP unbanned by " + helpers.escapehtml(name) + "!");
        }
    
        ,
    
        clearbanlist: function (src, channel, command) {
            var name = sys.name(src);
            banlist = {};
            helpers.saveData("banlist", banlist);
            sys.sendHtmlAll(helpers.bot(bots.ban) + "The ban list has been cleared by " + helpers.escapehtml(name) + "!");
        }
    
        ,
    
        banreason: function (src, channel, command) {
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 404, player not found.");
                return;
            }
            var reason;
            if (command[2] === undefined || command[2] === null || command[2] === "" || !command[2]) {
                reason = "None given.";
            } else {
                reason = helpers.escapehtml(command[2]);
            }
            var banner = sys.name(src), banned = command[1], srcauth = sys.auth(src), lower = command[1].toLowerCase();
            banlist[banned.toLowerCase()].reason = reason;
            helpers.saveData("banlist", banlist);
            sys.sendHtmlAll(helpers.bot(bots.ban) + helpers.escapehtml(banner) + " has changed the ban reason of " + helpers.escapehtml(banned) + " to '" + reason + "'!");
        }
    
        ,
    
        banmsg: function (src, channel, command) {
            var message = command[1], lower = sys.name(src).toLowerCase(), msg;
            if (!message) {
                !banmessages[lower] ? msg = " the default one." : msg = ": " + banmessages[lower];
                sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Your current ban message is" + msg, channel);
                return;
            }
            banmessages[lower] = helpers.escapehtml(message);
            helpers.saveData("banmessages", banmessages);
            sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Your ban message has been changed successfully.", channel);
        }
    
        ,
    
        megaban: function (src, channel, command) {
            var name = sys.name(src), trgt, trgtname, lower, reason;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.megaban, "Error 404, player not found.");
                return;
            }
            lower = command[1].toLowerCase();
            members[lower] ? trgtname = members[lower] : trgtname = helpers.escapehtml(command[1]);
            trgt = sys.id(trgtname);
            if (!trgt) {
                helpers.starfox(src, channel, command, bots.megaban, "Error 400, you can't mega ban " + trgtname + " since they are not online!");
                return;
            }
            if (sys.os(trgt) !== "android" && sys.version(trgt) < 2402 || sys.os(trgt) === "android" && sys.version(trgt) < 37) {
                helpers.starfox(src, channel, command, bots.megaban, "Error 400, mega bans don't work on this player.");
                return;
            }
            command[2] ? reason = helpers.escapehtml(command[2]) : reason = "Unknown";
            megabanlist[lower] = {};
            megabanlist[lower].banner = sys.name(src);
            megabanlist[lower].reason = reason;
            megabanlist[lower].date = helpers.date(new Date());
            sys.setCookie(trgt, "banned " + trgtname);
            helpers.saveData("megabanlist", megabanlist);
            sys.sendHtmlAuths(helpers.bot(bots.megaban) + helpers.escapehtml(name) + " has mega banned " + helpers.escapehtml(trgtname) + " from the server! [Reason: " + reason + "]");
            sys.kick(trgt);
        }
    
        ,
    
        mb: function (src, channel, command) {
            this.megaban(src, channel, command);
        }
    
        ,
    
        megaunban: function (src, channel, command) {
            var name = sys.name(src), trgtname, lower;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.megaban, "Error 404, player not found.");
                return;
            }
            lower = command[1].toLowerCase();
            members[lower] ? trgtname = members[lower] : trgtname = helpers.escapehtml(command[1]);
            namestounban.push(lower);
            delete megabanlist[lower];
            helpers.saveData("namestounban", namestounban);
            helpers.saveData("megabanlist", megabanlist);
            sys.sendHtmlAuths(helpers.bot(bots.megaban) + trgtname + " has been mega unbanned by " + helpers.escapehtml(name) + ". It will take effect once they enter the server again.");
        }
    
        ,
    
        megabanreason: function (src, channel, command) {
            var name = sys.name(src), trgtname = command[1], lower, reason;
            if (!trgtname) {
                helpers.starfox(src, channel, command, bots.megaban, "Error 404, player not found.");
                return;
            }
            lower = trgtname.toLowerCase();
            members[lower] ? trgtname = members[lower] : trgtname = helpers.escapehtml(trgtname);
            command[2] ? reason = helpers.escapehtml(command[2]) : reason = "Unknown";
            megabanlist[lower].reason = reason;
            helpers.saveData("megabanlist", megabanlist);
            sys.sendHtmlAuths(helpers.bot(bots.megaban) + helpers.escapehtml(name) + " has changed the mega ban reason of " + trgtname + " to '" + reason + "'.");
        }
    
        ,
    
        clearmegabanlist: function (src, channel, command) {
            var name = sys.name(src);
            for (var i in megabanlist) {
                namestounban.push(i);
            }
            megabanlist = {};
            helpers.saveData("megabanlist", megabanlist);
            helpers.saveData("namestounban", namestounban);
            sys.sendHtmlAuths(helpers.bot(bots.megaban) + "The mega ban list has been cleared by " + helpers.escapehtml(name) + "!");
        }
    
        ,
    
        gigaban: function (src, channel, command) {
            var name = sys.name(src), trgtname = command[1], trgt, lower, reason, id, pseudo;
            if (!trgtname) {
                helpers.starfox(src, channel, command, bots.gigaban, "Error 404, player not found.");
                return;
            }
            lower = trgtname.toLowerCase();
            members[lower] ? trgtname = members[lower] : trgtname = helpers.escapehtml(trgtname);
            trgt = sys.id(trgtname);
            if (!trgt) {
                helpers.starfox(src, channel, command, bots.gigaban, "Error 400, you can't giga ban " + trgtname + " since they are not online!");
                return;
            }
            if (!sys.uniqueId(trgt)) {
                helpers.starfox(src, channel, command, bots.gigaban, "Error 404, that player doesn't have a unique ID (update needed).", channel);
                return;
            }
            id = sys.uniqueId(trgt).id;
            pseudo = !sys.uniqueId(trgt).isUnique;
            command[2] ? reason = helpers.escapehtml(command[2]) : reason = "Unknown";
            gigabanlist[lower] = {};
            gigabanlist[lower].id = id;
            gigabanlist[lower].banner = sys.name(src);
            gigabanlist[lower].reason = reason;
            gigabanlist[lower].pseudo = pseudo;
            gigabanlist[lower].date = helpers.date(new Date());
            helpers.saveData("gigabanlist", gigabanlist);
            sys.sendHtmlAuths(helpers.bot(bots.gigaban) + helpers.escapehtml(name) + " has giga banned " + trgtname + " from the server! [Reason: " + reason + "]");
            sys.kick(trgt);
        }
    
        ,
    
        gb: function (src, channel, command) {
            this.gigaban(src, channel, command);
        }
    
        ,
    
        gigaunban: function (src, channel, command) {
            var name = sys.name(src), trgtname = command[1], lower;
            if (!trgtname) {
                helpers.starfox(src, channel, command, bots.gigaban, "Error 404, player not found.");
                return;
            }
            lower = trgtname.toLowerCase();
            members[lower] ? trgtname = members[lower] : trgtname = helpers.escapehtml(command[1]);
            if (!gigabanlist[lower]) {
                helpers.starfox(src, channel, command, bots.gigaban, "Error 400, you can't giga unban " + trgtname + " because they aren't giga banned!");
                return;
            }
            delete gigabanlist[lower];
            helpers.saveData("gigabanlist", gigabanlist);
            sys.sendHtmlAuths(helpers.bot(bots.gigaban) + helpers.escapehtml(name) + " has giga unbanned " + trgtname + " from the server.");
        }
    
        ,
    
        gigabanreason: function (src, channel, command) {
            var name = sys.name(src), trgtname = command[1], lower, reason;
            if (!trgtname) {
                helpers.starfox(src, channel, command, bots.gigaban, "Error 404, player not found.");
                return;
            }
            lower = trgtname.toLowerCase();
            members[lower] ? trgtname = members[lower] : trgtname = helpers.escapehtml(trgtname);
            if (!gigabanlist[lower]) {
                helpers.starfox(src, channel, command, bots.gigaban, "Error 400, you can't change the giga ban reason " + trgtname + " because they aren't giga banned!");
                return;
            }
            command[2] ? reason = helpers.escapehtml(command[2]) : reason = "Unknown";
            gigabanlist[lower].reason = reason;
            helpers.saveData("gigabanlist", gigabanlist);
            sys.sendHtmlAuths(helpers.bot(bots.gigaban) + helpers.escapehtml(name) + " has changed the giga ban reason of " + trgtname + " to '" + reason + "'!");
        }
    
        ,
    
        cleargigabanlist: function (src, channel, command) {
            gigabanlist = {};
            helpers.saveData("gigabanlist", gigabanlist);
            sys.sendHtmlAuths(helpers.bot(bots.gigaban) + "The giga ban list has been cleared by " + helpers.escapehtml(name) + "!");
        }
    
        ,
    
        rangeban: function (src, channel, command) {
            var reason = command[2], name = sys.name(src), trgtname = command[1], auth = sys.auth(src), lower, ip, msg, index;
            if (!trgtname) {
                helpers.starfox(src, channel, command, bots.gigaban, "Error 404, player not found.");
                return;
            }
            lower = trgtname.toLowerCase();
            members[lower] ? trgtname = members[lower] : trgtname = helpers.escapehtml(trgtname);
            if (!sys.dbIp(lower)) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't range ban " + trgtname + " because they don't exist in the database.");
                return;
            }
            if (rangebanlist[lower]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't range ban " + trgtname + " because they already are!");
                return;
            }
            var trgtauth = sys.dbAuth(command[1]), range = sys.dbRange(trgtname);
            if (trgtauth >= auth) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't range ban " + trgtname + " because their auth level is higher or equal to yours.");
                return;
            }
            if (!reason) {
                reason = "Unknown";
            } else {
                reason = helpers.escapehtml(reason);
            }
            rangebanlist[lower] = {};
            rangebanlist[lower].banner = name;
            rangebanlist[lower].range = range;
            rangebanlist[lower].reason = reason;
            var date = helpers.date(new Date()), trgt = sys.id(trgtname);
            rangebanlist[lower].date = date;
            helpers.saveData("rangebanlist", rangebanlist);
            if (rangebanmessages[name.toLowerCase()]) {
                msg = rangebanmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Server~/gi, sys.getServerName());
                sys.sendHtmlAll(helpers.bot(bots.ban) + msg + " [Reason: " + reason + "]");
            } else {
                sys.sendHtmlAll(helpers.bot(bots.ban) + name + " has range banned " + trgtname + " from the server! [Reason: " + reason + "]");
            }
            if (trgt) {
                sys.kick(trgt);
            }
            for (index in mutelist) {
                if (!sys.dbIp(index)) {
                    delete mutedips[mutelist[index].ip];
                    delete mutelist[index];
                    continue;
                }
                if (sys.dbRange(index) == rangebanlist[lower].range) {
                    delete mutedips[mutelist[index].ip];
                    delete mutelist[index];
                    if (members[index]) {
                        index = members[index];
                    }
                    helpers.saveData("mutelist", mutelist);
                    sys.sendHtmlMessage(src, helpers.bot(bots.mute) + helpers.escapehtml(index) + " has been automatically unmuted.", channel);
                }
            }
            for (index in banlist) {
                if (!sys.dbIp(index)) {
                    ip = banlist[index].ip;
                    banlist[ip] = banlist[index];
                    delete banlist[index];
                    continue;
                }
                if (sys.dbRange(index) == rangebanlist[lower].range) {
                    delete banlist[index];
                    if (members[index]) {
                        index = members[index];
                    }
                    helpers.saveData("banlist", banlist);
                    sys.sendHtmlMessage(src, helpers.bot(bots.ban) + helpers.escapehtml(index) + " has been automatically unbanned.", channel);
                    continue;
                }
            }
        }
    
        ,
    
        rb: function (src, channel, command) {
            this.rangeban(src, channel, command);
        }
    
        ,
    
        rangeunban: function (src, channel, command) {
            var name = sys.name(src), trgtname = command[1], lower;
            if (!trgtname) {
                helpers.starfox(src, channel, command, bots.gigaban, "Error 404, player not found.");
                return;
            }
            lower = trgtname.toLowerCase();
            members[lower] ? trgtname = members[lower] : trgtname = helpers.escapehtml(trgtname);
            if (!sys.dbIp(lower)) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't range unban " + trgtname + " because they don't exist in the database.");
                return;
            }
            if (!rangebanlist[lower]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't range unban " + trgtname + " because they aren't range banned!");
                return;
            }
            for (var index in rangebanlist) {
                if (!sys.dbIp(index)) {
                    range = rangebanlist[index].range;
                    rangebanlist[range] = rangebanlist[index];
                    delete rangebanlist[index];
                    continue;
                }
                if (sys.dbRange(index) == sys.dbRange(trgtname)) {
                    delete rangebanlist[index];
                    helpers.saveData("rangebanlist", rangebanlist);
                }
            }
            if (members[trgtname]) {
                trgtname = members[trgtname];
            }
            sys.sendHtmlAll(helpers.bot(bots.ban) + trgtname + " has been range unbanned by " + helpers.escapehtml(name) + "!");
        }
    
        ,
    
        iprangeban: function (src, channel, command) {
            var name = sys.name(src), auth = sys.auth(src), range = command[1], reason = command[2], db = sys.dbAll(), aliases = [], altsnum = 0, ip, index;
            if (!range) {
                helpers.starfox(src, channel, command, bots.ban, "Error 404, range not found.");
                return;
            }
            if (!helpers.isRange(range)) {
                helpers.starfox(src, channel, command, bots.ban, "Error 403, invalid range.");
                return;
            }
            if (rangebanlist[range]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't range ban " + range + " because it is already range banned!");
                return;
            }
            var trgtauth = sys.dbAuth(command[1]);
            for (index in db) {
                if (sys.dbRange(db[index]) == range) {
                    aliases[altsnum] = db[index];
                    altsnum++;
                }
            }
            for (index in aliases) {
                if (sys.dbAuth(aliases[index]) >= auth) {
                    helpers.starfox(src, channel, command, bots.ban, "Error 403, you may not range ban " + range + " because one of its alts' auth levels is higher or equal to yours.");
                    return;
                }
            }
            if (!reason) {
                reason = "Unknown";
            } else {
                reason = helpers.escapehtml(reason);
            }
            rangebanlist[range] = {};
            rangebanlist[range].banner = name;
            rangebanlist[range].range = range;
            rangebanlist[range].reason = reason;
            var date = helpers.date(new Date());
            rangebanlist[range].date = date;
            helpers.saveData("rangebanlist", rangebanlist);
            if (rangebanmessages[name.toLowerCase()]) {
                msg = rangebanmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, range).replace(/~Server~/gi, sys.getServerName());
                sys.sendHtmlAll(helpers.bot(bots.ban) + msg + " [Reason: " + reason + "]");
            } else {
                sys.sendHtmlAll(helpers.bot(bots.ban) + helpers.escapehtml(name) + " has range banned " + range + " from the server! [Reason: " + reason + "]");
            }
            for (index in mutelist) {
                if (!sys.dbIp(index)) {
                    delete mutelist[index];
                    continue;
                }
                if (sys.dbRange(index) == range) {
                    delete mutelist[index];
                    if (members[index]) {
                        index = members[index];
                    }
                    helpers.saveData("mutelist", mutelist);
                    sys.sendHtmlMessage(src, helpers.bot(bots.mute) + helpers.escapehtml(index) + " has been automatically unmuted.", channel);
                    continue;
                }
            }
            for (index in banlist) {
                if (!sys.dbIp(index)) {
                    ip = banlist[index].ip;
                    banlist[ip] = banlist[index];
                    delete banlist[index];
                    continue;
                }
                if (sys.dbRange(index) == range) {
                    delete banlist[index];
                    if (members[index]) {
                        index = members[index];
                    }
                    helpers.saveData("banlist", banlist);
                    sys.sendHtmlMessage(src, helpers.bot(bots.ban) + helpers.escapehtml(index) + " has been automatically unbanned.", channel);
                    continue;
                }
            }
        }
    
        ,
    
        iprangeunban: function (src, channel, command) {
            var name = sys.name(src), range = command[1];
            if (!range) {
                helpers.starfox(src, channel, command, bots.ban, "Error 404, range not found.");
                return;
            }
            if (!helpers.isRange(range)) {
                helpers.starfox(src, channel, command, bots.ban, "Error 403, invalid range.");
                return;
            }
            if (!rangebanlist[range]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't range unban " + range + " because it isn't range banned!");
                return;
            }
            delete rangebanlist[range];
            helpers.saveData("rangebanlist", rangebanlist);
            sys.sendHtmlAll(helpers.bot(bots.ban) + range + " has been range unbanned by " + helpers.escapehtml(name) + "!");
        }
    
        ,
    
        rangebanreason: function (src, channel, command) {
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.ban, "Error 404, player not found.");
                return;
            }
            var reason;
            if (!command[2]) {
                reason = "None given.";
            } else {
                reason = helpers.escapehtml(command[2]);
            }
            var banner = sys.name(src), banned = command[1], srcauth = sys.auth(src), lower = command[1].toLowerCase();
            rangebanlist[banned.toLowerCase()].reason = reason;
            helpers.saveData("rangebanlist", rangebanlist);
            sys.sendHtmlAll(helpers.bot(bots.ban) + helpers.escapehtml(banner) + " has changed the range ban reason of " + helpers.escapehtml(banned) + " to '" + reason + "'!");
        }
    
        ,
    
        clearrangebanlist: function (src, channel, command) {
            var name = sys.name(src);
            rangebanlist = {};
            helpers.saveData("rangebanlist", rangebanlist);
            sys.sendHtmlAll(helpers.bot(bots.ban) + "The range ban list has been cleared by " + helpers.escapehtml(name) + "!");
        }
    
        ,
    
        rangebanmsg: function (src, channel, command) {
            var message = command[1], lower = sys.name(src).toLowerCase(), msg;
            if (!message) {
                !rangebanmessages[lower] ? msg = " the default one." : msg = ": " + rangebanmessages[lower];
                sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Your current range ban message is" + msg, channel);
                return;
            }
            rangebanmessages[lower] = helpers.escapehtml(message);
            helpers.saveData("rangebanmessages", rangebanmessages);
            sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Your range ban message has been changed successfully.", channel);
        }
    
        ,
    
        /**
            ------------
            Tour Options
            ------------
        **/
        admintouroptions: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ Tour Options</h2>"
            + "<br>"
            + "<b>" + helpers.user("/tour ") + helpers.arg("tier") + helpers.arg2("*number") + "</b>: starts a <b>tier</b> tournament with <b>number</b> participators.<br>"
            + "<b>" + helpers.user("/toursize ") + helpers.arg("number") + "</b>: changes the number of participators to <b>number</b>.<br>"
            + "<b>" + helpers.user("/endtour") + "</b>: ends the current tournament.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        tour: function (src, channel, command) {
            if (tour[0].tourmode !== 0) {
                helpers.starfox(src, channel, command, bots.tour, "Error 400, you can't start a tour because there is already a tour running!");
                return;
            }
            var tiers = sys.getTierList();
            for (var tiersindex in tiers) {
                if (command[1].toLowerCase() == tiers[tiersindex].toLowerCase()) {
                    var temptourtier = tiers[tiersindex];
                }
            }
            tour[0].tourtier = temptourtier;
            if (tour[0].tourtier === undefined) {
                helpers.starfox(src, channel, command, bots.tour, "Error 400, the specified tier " + command[1] + " does not exist!");
                return;
            }
            tour[0].tournumber = command[2];
            if (tour[0].tournumber <= 2) {
                helpers.starfox(src, channel, command, bots.tour, "Error 403, you must specify a tour size of 3 or more!");
                return;
            }
            tour[0].tourmode = 1;
            tour[0].tourcurrentnumber = tour[0].tournumber;
            tour[0].tourmembers = [];
            tour[0].tourbattlers = [];
            tour[0].tourwinners = [];
            tour[0].tourlosers = [];
            tour[0].tourstarter = sys.name(src);
            tour[0].tourstarttime = new Date();
            tour[0].tourclauses = sys.getClauses(tour[0].tourtier);
            helpers.tourdisplay(0, 0);
        }
    
        ,
    
        toursize: function (src, channel, command) {
            if (tour[0].tourmode !== 0) {
                helpers.starfox(src, channel, command, bots.tour, "Error 400, you can't edit the tour size because there is already a tour running!", channel);
                return;
            }
            if (command[1] == "undefined" || command[1] === undefined || command[1] === "" || command[1] === null || !command[1] || isNaN(command[1])) {
                helpers.starfox(src, channel, command, bots.tour, "You need to specify a number!");
                return;
            }
            tour[0].tournumber = command[1];
            sys.sendHtmlMain(border + "<br>" + helpers.bot(bots.tour) + sys.name(src) + " has changed the number of tournament players to " + command[1] + "!<br>" + border2);
        }
    
        ,
    
        endtour: function (src, channel, command) {
            if (tour[0].tourmode === 0) {
                helpers.starfox(src, channel, command, bots.tour, "Error 400, you can't end the tour because there is none running!");
                return;
            }
            tour[0].tourmode = 0;
            sys.sendHtmlMain(border + "<br>" + helpers.bot(bots.tour) + "The " + tour[0].tourtier + " tournament has been cancelled by " + sys.name(src) + ".<br>" + border2);
        }
    
        ,
    
        /**
            ------------------------------
            Banner and Description Options
            ------------------------------
        **/
        banneroptions: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ Banner and Description Options</h2>"
            + "<br>"
            + "<b>" + helpers.user("/banner ") + helpers.arg("html") + "</b>: changes the banner to <b>html</b>.<br>"
            + "<b>" + helpers.user("/description ") + helpers.arg("html") + "</b>: changes the server description to <b>html</b>.<br>"
            + "<b>" + helpers.user("/testbanner ") + helpers.arg("html") + "</b>: changes the banner to <b>html</b>, but only for yourself. If <b>html</b> is not specified, resets the banner.<br>"
            + "<b>" + helpers.user("/testdescription ") + helpers.arg("html") + "</b>: posts <b>html</b> to yourself, to test a server description with.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        banner: function (src, channel, command) {
            var banner = command[1];
            if (!banner) {
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The banner is currently: " + helpers.escapehtml(sys.getAnnouncement()) + ".");
                return;
            }
            sys.changeAnnouncement(banner);
            sys.sendHtmlAuths(helpers.bot(bots.main) + helpers.escapehtml(sys.name(src)) + " has changed the banner!");
        }
    
        ,
    
        description: function (src, channel, command) {
            var description = command[1];
            if (!description) {
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The description is currently: " + helpers.escapehtml(sys.getDescription()) + ".");
                return;
            }
            sys.changeDescription(description);
            sys.sendHtmlAuths(helpers.bot(bots.main) + helpers.escapehtml(sys.name(src)) + " has changed the description!");
        }
    
        ,
    
        testbanner: function (src, channel, command) {
            var banner = command[1];
            if (!banner) {
                sys.setAnnouncement(sys.getAnnouncement(), src);
                return;
            }
            sys.setAnnouncement(banner, src);
        }
    
        ,
    
        testdescription: function (src, channel, command) {
            var description = command[1];
            if (!description) {
                helpers.starfox(src, channel, command, bots.main, "Error 404, description not found.");
                return;
            }
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your description will be shown below.<br>" + description, channel);
        }
    
        ,
    
        /**
            ----------------
            Database Options
            ----------------
        **/
        dboptions: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ Database Options</h2>"
            + "<br>"
            + "<b>" + helpers.user("/dbinfo") + "</b>: displays information about the database. May cause lag.<br>"
            + "<b>" + helpers.user("/dbsearch ") + helpers.arg("text") + "</b>: displays all players in the database that match <b>text</b>. Also /search.<br>"
            + "<b>" + helpers.user("/dbdelete ") + helpers.arg("player") + "</b>: removes <b>player</b> from the database.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        dbinfo: function (src, channel, command) {
            var db = sys.dbAll(), infomessage = border + "<h2>Database Info</h2><br>", ipArray = [], rangeArray = [], registeredUsers = 0, users, ip, range, registered;
            users = db.length;
            for (var i in db) {
                ip = sys.dbIp(db[i]);
                range = sys.dbRange(db[i]);
                registeredUsers += (sys.dbRegistered(db[i]) ? 1 : 0);
                if (!helpers.isInArray(ip, ipArray)) {
                    ipArray.push(ip);
                }
                if (!helpers.isInArray(range, rangeArray)) {
                    rangeArray.push(range);
                }
            }
            infomessage += "<b>Users</b>: " + users + "<br>"
            + "<b>Registered users</b>: " + registeredUsers + "<br>"
            + "<b>IPs</b>: " + ipArray.length + "<br>"
            + "<b>Ranges</b>: " + rangeArray.length + "<br>"
            + "<br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, infomessage, channel);
        }
    
        ,
    
        dbsearch: function (src, channel, command) {
            var DBSEARCH_THRESHOLD = 100;
            var list = "", term = command[1], resultsmessage = border + "<h2>Database Search</h2><br>Your database search request '" + term + "' returned the following results:<br><br>", total = 0, db;
            if (!term) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.", channel);
                return;
            }
            if (term.length < 2 && sys.dbAll().length > DBSEARCH_THRESHOLD) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid text. Looking for one specific character can cause a lot of lag, so you must specify more.");
                return;
            }
            db = sys.dbAll();
            for (var index in db) {
                if (db[index].toLowerCase().indexOf(term.toLowerCase()) != -1) {
                    resultsmessage += db[index] + "<br>";
                    total++;
                }
            }
            resultsmessage += "<br><b>Total Results:</b> " + total + "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, resultsmessage, channel);
        }
    
        ,
    
        search: function (src, channel, command) {
            this.dbsearch(src, channel, command);
        }
    
        ,
    
        dbdelete: function (src, channel, command) {
            var auth = sys.auth(src), player, aliases;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.", channel);
                return;
            }
            player = command[1].toLowerCase();
            if (!sys.dbIp(player)) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, you can't delete " + player + " because they don't exist in the database!");
                return;
            }
            aliases = sys.aliases(sys.dbIp(player));
            for (var index in aliases) {
                if (sys.dbAuth(aliases[index]) >= auth && auth < 3) {
                    helpers.starfox(src, channel, command, bots.command, "Error 403, you may not delete " + player + " because one of their alts' auth levels is higher or equal to yours.");
                    return;
                }
            }
            if (members[player]) {
                player = members[player];
            }
            sys.dbDelete(player);
            sys.sendHtmlMessage(src, helpers.bot(bots.command) + player + " has been deleted from the database.", channel);
        }
    
        ,
    
        /**
            ---------------
            Battle Settings
            ---------------
        **/
        battlesettings: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ Battle Settings</h2>"
            + "<br>"
            + "Battling is currently <b>" + (stopbattles ? "off" : "on") + "</b>.<br>"
            + "<br>"
            + "<b>" + helpers.user("/stopbattles") + "</b>: disallows battles to be started.<br>"
            + "<b>" + helpers.user("/resumebattles") + "</b>: allows battles to be started again.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
    
        }
    
        ,
    
        stopbattles: function (src, channel, command) {
            stopbattles = true;
            sys.sendHtmlAll(helpers.bot(bots.battle) + "<b>" + helpers.user(sys.name(src)) + " has stopped battles! No battles can be started anymore!</b>");
        }
    
        ,
    
        resumebattles: function (src, channel, command) {
            stopbattles = false;
            sys.sendHtmlAll(helpers.bot(bots.battle) + "<b>" + helpers.user(sys.name(src)) + " has resumed battles! Everyone can battle again!</b>");
        }
    
        ,
    
        /**
            ------------
            Bot Settings
            ------------
        **/
        botsettings: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ Bot Settings</h2>"
            + "<br>"
            + "Current bots and their names:<br>"
            + "<br>";
            for (var index in bots) {
                commandsmessage += index + ": " + bots[index] + "<br>";
            }
            commandsmessage += "<br>"
            + "Use <b>" + helpers.user("/bot ") + helpers.arg("bot") + helpers.arg2("*name") + "</b> to change the <b>bot</b> bot's name to <b>name</b>.<br>"
            + "Use <b>" + helpers.user("/botcolor ") + helpers.arg("color") + "</b> to change the bot color to <b>color</b>. Also /botcolour.<br>"
            + "Use <b>" + helpers.user("/symbol ") + helpers.arg("character") + "</b> to change the bot symbol to <b>character</b>.<br>"
            + "Use <b>" + helpers.user("/symbolcolor ") + helpers.arg("color") + "</b> to change the bot symbol color to <b>color</b>. Also /symbolcolour.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        bot: function (src, channel, command) {
            var name = sys.name(src), isbot = false, bot;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.main, "Error 404, bot not found.");
                return;
            }
            bot = command[1].toLowerCase();
            for (var index in bots) {
                if (bot == index) {
                    isbot = true;
                }
            }
            if (!isbot) {
                helpers.starfox(src, channel, command, bots.main, "Error 404, bot not found.");
                return;
            }
            if (!command[2]) {
                command[2] = "undefined";
            }
            bots[bot] = command[2];
            helpers.saveData("bots", bots);
            sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed the " + bot + " bot's name to " + helpers.arg(command[2]) + "!</b>", channel);
        }
    
        ,
    
        botcolor: function (src, channel, command) {
            var name = sys.name(src);
            if (!command[1]) {
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The bot " + command[0].slice(3) + " is currently " + botcolor + ".", channel);
                return;
            }
            botcolor = command[1];
            helpers.saveData("botcolor", botcolor);
            sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed the bot " + command[0].slice(3) + " to " + command[1] + "!</b>", channel);
        }
    
        ,
    
        botcolour: function (src, channel, command) {
            this.botcolor(src, channel, command);
        }
    
        ,
    
        symbol: function (src, channel, command) {
            var name = sys.name(src);
            if (!command[1]) {
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The bot symbol is currently " + botsymbol + ".", channel);
                return;
            }
            if (command[1].length != 1) {
                helpers.starfox(src, channel, command, bots.main, "Error 403, the symbol must be 1 character.");
                return;
            }
            botsymbol = command[1];
            helpers.saveData("botsymbol", botsymbol);
            sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed the bot symbol to " + helpers.escapehtml(command[1]) + "!</b>", channel);
        }
    
        ,
    
        symbolcolor: function (src, channel, command) {
            var name = sys.name(src);
            if (!command[1]) {
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The bot symbol " + command[0].slice(6) + " is currently " + botsymbolcolor + ".", channel);
                return;
            }
            botsymbolcolor = command[1];
            helpers.saveData("botsymbolcolor", botsymbolcolor);
            sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed the bot symbol " + command[0].slice(6) + " to " + helpers.escapehtml(command[1]) + "!</b>", channel);
        }
    
        ,
    
        symbolcolour: function (src, channel, command) {
            this.symbolcolor(src, channel, command);
        }
    
        ,
    
        /**
            --------------
            Flood Settings
            --------------
        **/
        floodsettings: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ Flood Settings</h2>"
            + "<br>"
            + "<b>Flood Level:</b> " + floodlevel + "<br>"
            + "<b>Flood Time:</b> " + floodtime + " seconds<br>"
            + "<b>Message Allowance:</b> " + allowance + " messages<br>"
            + "Someone will be flooding if they exceed " + allowance + " messages in " + floodtime + " seconds,";
            if (floodlevel == 4) {
                commandsmessage += " regardless of their auth level.<br>";
            } else {
                commandsmessage += " if their auth level is lower than " + AUTH_NAMES[floodlevel] + ".<br>";
            }
            commandsmessage += "<br>"
            + "Use <b>" + helpers.user("/floodlevel ") + helpers.arg("number") + "</b> to change the lowest auth level to ignore flood kicks into <b>number</b>. Set it to 4 to flood kick regardless of auth level.<br>"
            + "Use <b>" + helpers.user("/floodtime ") + helpers.arg("number") + "</b> to change the flood time into <b>number</b> seconds.<br>"
            + "Use <b>" + helpers.user("/allowance ") + helpers.arg("number") + "</b> to change the message allowance into <b>number</b> messages.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        floodlevel: function (src, channel, command) {
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.flood, "Error 404, number not found.");
                return;
            }
            if (isNaN(command[1])) {
                helpers.starfox(src, channel, command, bots.flood, "Error 403, you have to specify a number.");
                return;
            }
            if (command[1] < 1 || command[1] > 4) {
                helpers.starfox(src, channel, command, bots.flood, "Error 403, the number must be 1, 2, 3 or 4.");
                return;
            }
            if (sys.auth(src) == 2 && command[1] == 4) {
                helpers.starfox(src, channel, command, bots.flood, "Error 403, you may not set the flood level to include auth levels higher than yours.");
                return;
            }
            floodlevel = parseInt(command[1]);
            helpers.saveData("floodlevel", floodlevel);
            sys.sendHtmlAuths(helpers.bot(bots.flood) + "The flood level has been changed to " + floodlevel + ".");
        }
    
        ,
    
        floodtime: function (src, channel, command) {
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.flood, "Error 404, number not found.");
                return;
            }
            if (isNaN(command[1])) {
                helpers.starfox(src, channel, command, bots.flood, "Error 403, you have to specify a number.");
                return;
            }
            floodtime = command[1];
            helpers.saveData("floodtime", floodtime);
            sys.sendHtmlAuths(helpers.bot(bots.flood) + "The flood time has been changed to " + floodtime + " seconds.");
        }
    
        ,
    
        allowance: function (src, channel, command) {
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.flood, "Error 404, number not found.");
                return;
            }
            if (isNaN(command[1])) {
                helpers.starfox(src, channel, command, bots.flood, "Error 403, you have to specify a number.");
                return;
            }
            allowance = command[1];
            helpers.saveData("allowance", allowance);
            sys.sendHtmlAuths(helpers.bot(bots.flood) + "The message allowance has been changed to " + allowance + " messages.");
        }
    
        ,
    
        /**
            -------------
            Rule Settings
            -------------
        **/
        rulesettings: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ Rule Settings</h2>"
            + "<br>"
            + "Current server rules:<br>"
            + "<br>";
            for (var i = 1; i <= rules.rules.length; i++) {
                commandsmessage += helpers.bot("• " + botsymbol + "Rule " + i + ": " + rules.rules[i - 1]) + "<br>" + rules.explanations[i - 1] + "<br>";
            }
            commandsmessage += "<br>"
            + "Use <b>" + helpers.user("/changerule ") + helpers.arg("number") + helpers.arg2("*rule") + "</b> to change rule <b>number</b> to <b>rule</b>.<br>"
            + "Use <b>" + helpers.user("/explanation ") + helpers.arg("number") + helpers.arg2("*explanation") + "</b> to change the explanation of rule <b>number</b> to <b>explanation</b>.<br>"
            + "Use <b>" + helpers.user("/addrule ") + helpers.arg("rule") + helpers.arg2("*explanation") + "</b> to add <b>rule</b> with <b>explanation</b> to the list of rules.<br>"
            + "Use <b>" + helpers.user("/removerule ") + helpers.arg("number") + "</b> to remove rule <b>number</b> from the list of rules.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        changerule: function (src, channel, command) {
            var name = sys.name(src), number = command[1], rule;
            if (!number) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, number not found.");
                return;
            }
            rule = command[2];
            if (!rule) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, rule not found.");
                return;
            }
            if (isNaN(number) || parseInt(number) < 1 || parseInt(number) > rules.rules.length) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, there is no such rule!");
                return;
            }
            number = parseInt(number);
            rules.rules[number - 1] = rule;
            helpers.saveData("rules", rules);
            sys.sendHtmlAll(helpers.bot(bots.main) + "Rule " + number + " has been changed to '" + rule + "' by " + name + ".", channel);
        }
    
        ,
    
        explanation: function (src, channel, command) {
            var name = sys.name(src), number = command[1], explanation;
            if (!number) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, number not found.");
                return;
            }
            explanation = command[2];
            if (!explanation) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, explanation not found.");
                return;
            }
            if (isNaN(number) || parseInt(number) < 1 || parseInt(number) > rules.rules.length) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, there is no such rule!");
                return;
            }
            number = parseInt(number);
            rules.explanations[number - 1] = explanation;
            helpers.saveData("rules", rules);
            sys.sendHtmlAuths(helpers.bot(bots.main) + "The explanation of rule " + number + " has been changed to '" + explanation + "' by " + name + ".");
        }
    
        ,
    
        addrule: function (src, channel, command) {
            var name = sys.name(src), rule = command[1], number = rules.rules.length, explanation;
            if (!rule) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, rule not found.");
                return;
            }
            explanation = command[2];
            if (!explanation) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, explanation not found.");
                return;
            }
            rules.rules[number] = rule;
            rules.explanations[number] = explanation;
            helpers.saveData("rules", rules);
            sys.sendHtmlAll(helpers.bot(bots.main) + "Rule " + (number + 1) + " has been added to the server rules by " + name + ". Use <b>" + helpers.user("/rule ") + helpers.arg("number") + "</b> to read the new rule.");
        }
    
        ,
    
        removerule: function (src, channel, command) {
            var name = sys.name(src), number = command[1], previous = 1, changing = false;
            if (!number) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, number not found.");
                return;
            }
            if (isNaN(number) || parseInt(number) < 1 || parseInt(number) > rules.rules.length) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, there is no such rule!");
                return;
            }
            rules.rules.splice(number - 1, 1);
            rules.explanations.splice(number - 1, 1);
            helpers.saveData("rules", rules);
            sys.sendHtmlAll(src, helpers.bot(bots.main) + "Rule " + number + " has been removed by " + name + ". The other rule numbers have been changed accordingly.");
        }
    
        ,
    
        /**
            ----------------
            Message Settings
            ----------------
        **/
        messagesettings: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ Message Settings</h2>"
            + "<br>"
            + "Current messages:<br>"
            + "<br>"
            + "<b>Server welcome message: </b>" + welcomeMessage + "<br>"
            + "<b>Server leave message: </b>" + leaveMessage + "<br>"
            + "<b>Channel welcome message: </b>" + channelWelcomeMessage + "<br>"
            + "<b>Channel leave message: </b>" + channelLeaveMessage + "<br>"
            + "<b>Silence message: </b>" + silenceMessage + "<br>"
            + "<b>Unsilence message: </b>" + unsilenceMessage + "<br>"
            + "<b>No permission message: </b>" + noPermissionMessage + "<br>"
            + "<br>"
            + "Syntax for the messages other than silencing:<br>"
            + "<br>"
            + "<b>~Player~</b> will be replaced by someone's username.<br>"
            + "<b>~Server~</b> will be replaced by the server name.<br>"
            + "<b>~Channel~</b> will be replaced by the channel name.<br>"
            + "<br>"
            + "Use <b>" + helpers.user("/layout") + "</b> to temporarily toggle the layout of certain messages between the old one and the new one.<br>"
            + "Use <b>" + helpers.user("/welcomemessage ") + helpers.arg("text") + "</b> to change the welcome message to <b>text</b>. Also /welcomemsg.<br>"
            + "Use <b>" + helpers.user("/leavemessage ") + helpers.arg("text") + "</b> to change the leave message to <b>text</b>. Also /leavemsg.<br>"
            + "Use <b>" + helpers.user("/cwelcomemessage ") + helpers.arg("text") + "</b> to change the channel welcome message to <b>text</b>. Also /cwelcomemsg.<br>"
            + "Use <b>" + helpers.user("/cleavemessage ") + helpers.arg("text") + "</b> to change the channel leave message to <b>text</b>. Also /cleavemsg.<br>"
            + "Use <b>" + helpers.user("/silencemessage ") + helpers.arg("text") + "</b> to change the silence message to <b>text</b>. Also /silencemsg.<br>"
            + "Use <b>" + helpers.user("/unsilencemessage ") + helpers.arg("text") + "</b> to change the unsilence message to <b>text</b>. Also /unsilencemsg.<br>"
            + "Use <b>" + helpers.user("/nopermissionmessage ") + helpers.arg("text") + "</b> to change the message someone gets when trying to use a command for higher auth to <b>text</b>. Also /nopermissionmsg.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        layout: function (src, channel, command) {
            var name = sys.name(src);
            if (layout == "old") {
                layout = "new";
                border = helpers.readData("border");
                border2 = helpers.readData("border2");
                sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed certain messages to the new layout!</b>", channel);
            } else {
                layout = "old";
                border = "<font color='cornflowerblue'>»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»</font>";
                border2 = border;
                sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed certain messages to the old, nostalgic layout!</b>", channel);
            }
        }
    
        ,
    
        welcomemessage: function (src, channel, command) {
            var name = sys.name(src), message = command[1];
            if (!message) {
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current welcome message is: " + welcomeMessage + ".", channel);
                return;
            }
            welcomeMessage = message;
            helpers.saveData("welcomeMessage", welcomeMessage);
            sys.sendHtmlAll(helpers.bot(bots.main) + "The welcome message has been changed to '" + welcomeMessage + "' by " + name + ".", channel);
        }
    
        ,
    
        welcomemsg: function (src, channel, command) {
            this.welcomemessage(src, channel, command);
        }
    
        ,
    
        leavemessage: function (src, channel, command) {
            var name = sys.name(src), message = command[1];
            if (!message) {
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current leave message is: " + leaveMessage + ".", channel);
                return;
            }
            leaveMessage = message;
            helpers.saveData("leaveMessage", leaveMessage);
            sys.sendHtmlAll(helpers.bot(bots.main) + "The leave message has been changed to '" + leaveMessage + "' by " + name + ".", channel);
        }
    
        ,
    
        leavemsg: function (src, channel, command) {
            this.leavemessage(src, channel, command);
        }
    
        ,
    
        cwelcomemessage: function (src, channel, command) {
            var name = sys.name(src), message = command[1];
            if (!message) {
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current channel welcome message is: " + channelWelcomeMessage + ".", channel);
                return;
            }
            channelWelcomeMessage = message;
            helpers.saveData("channelWelcomeMessage", channelWelcomeMessage);
            sys.sendHtmlAll(helpers.bot(bots.main) + "The channel welcome message has been changed to '" + channelWelcomeMessage + "' by " + name + ".", channel);
        }
    
        ,
    
        cwelcomemsg: function (src, channel, command) {
            this.cwelcomemessage(src, channel, command);
        }
    
        ,
    
        cleavemessage: function (src, channel, command) {
            var name = sys.name(src), message = command[1];
            if (!message) {
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current channel leave message is: " + channelLeaveMessage + ".", channel);
                return;
            }
            channelLeaveMessage = message;
            helpers.saveData("channelLeaveMessage", channelLeaveMessage);
            sys.sendHtmlAll(helpers.bot(bots.main) + "The channel leave message has been changed to '" + channelLeaveMessage + "' by " + name + ".", channel);
        }
    
        ,
    
        cleavemsg: function (src, channel, command) {
            this.cleavemessage(src, channel, command);
        }
    
        ,
    
        silencemessage: function (src, channel, command) {
            var name = sys.name(src), message = command[1];
            if (!message) {
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current silence message is: " + silenceMessage + ".", channel);
                return;
            }
            silenceMessage = message;
            helpers.saveData("silenceMessage", silenceMessage);
            sys.sendHtmlAll(helpers.bot(bots.main) + "The silence message has been changed to '" + silenceMessage + "' by " + name + ".", channel);
        }
    
        ,
    
        silencemsg: function (src, channel, command) {
            this.silencemessage(src, channel, command);
        }
    
        ,
    
        unsilencemessage: function (src, channel, command) {
            var name = sys.name(src), message = command[1];
            if (!message) {
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current unsilence message is: " + unsilenceMessage + ".", channel);
                return;
            }
            unsilenceMessage = message;
            helpers.saveData("unsilenceMessage", unsilenceMessage);
            sys.sendHtmlAll(helpers.bot(bots.main) + "The unsilence message has been changed to '" + unsilenceMessage + "' by " + name + ".", channel);
        }
    
        ,
    
        unsilencemsg: function (src, channel, command) {
            this.unsilencemessage(src, channel, command);
        }
    
        ,
    
        nopermissionmessage: function (src, channel, command) {
            var name = sys.name(src), message = command[1];
            if (!message) {
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current no permission message is: " + noPermissionMessage + ".", channel);
                return;
            }
            noPermissionMessage = message;
            helpers.saveData("noPermissionMessage", noPermissionMessage);
            sys.sendHtmlAuths(helpers.bot(bots.main) + "The no permission message has been changed to '" + noPermissionMessage + "' by " + name + ".", channel);
        }
    
        ,
    
        nopermissionmsg: function (src, channel, command) {
            this.nopermissionmessage(src, channel, command);
        }
    
        ,
    
        /**
            --------------
            Color Settings
            --------------
        **/
        colorsettings: function (src, channel, command) {
            var spelling = command[0].slice(0, -8), commandsmessage = border
            + "<h2>Administrator Commands ~ " + helpers.cap(spelling) + " Settings</h2>"
            + "<br>"
            + "Current " + spelling + "ings:<br>"
            + "<br>"
            + "<b>Border " + spelling + ":</b> " + borderColor + "<br>"
            + "<b>Server topic " + spelling + ":</b> " + serverTopicColor + "<br>"
            + "<b>Channel topic " + spelling + ":</b> " + channelTopicColor + "<br>"
            + "<b>Command " + spelling + "s:</b> " + cmdcolors.join(", ") + "<br>"
            + "<br>"
            + "Use <b>" + helpers.user("/bordercolor ") + helpers.arg("color") + "</b> to change the command border color to <b>color</b>. If <b>color</b> is 'none', removes the borders entirely. Also /bordercolour.<br>"
            + "Use <b>" + helpers.user("/servertopiccolor ") + helpers.arg("color") + "</b> to change the color of 'Server Topic' in the server topic message to to <b>color</b>. Also /servertopiccolour.<br>"
            + "Use <b>" + helpers.user("/channeltopiccolor ") + helpers.arg("color") + "</b> to change the color of 'Channel Topic' in the channel topic message to to <b>color</b>. Also /channeltopiccolour.<br>"
            + "Use <b>" + helpers.user("/commandcolor ") + helpers.arg("number") + helpers.arg2("*color") + "</b> to change command color <b>number</b> to <b>color</b>.<br>"
            + "0 is the user, 1 is the first argument, 2 the second argument, and so on. Also /commandcolour.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        coloursettings: function (src, channel, command) {
            this.colorsettings(src, channel, command);
        }
    
        ,
    
        bordercolor: function (src, channel, command) {
            var name = sys.name(src), spelling = command[0].slice(6), color = command[1];
            if (!color) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, " + spelling + " not found.");
                return;
            }
            if (color == "none") {
                border = "<br>";
                border2 = "";
                sys.sendHtmlAuths(helpers.bot(bots.main) + "The command borders have been removed by " + name + ".", channel);
            } else if (!sys.validColor(color)) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + spelling + ".");
                return;
            } else {
                borderColor = sys.hexColor(color);
                border = "<font color='" + sys.hexColor(color) +
                "'><b>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></b></font>";
                border2 = "<font color='" + sys.hexColor(color) +
                "'><b>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;" +
                "&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;" +
                "&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;" +
                "&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;" +
                "&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</b></font>";
                sys.sendHtmlAuths(helpers.bot(bots.main) + "The command border " + spelling + " has been changed to " + color + " by " + name + ".", channel);
            }
            helpers.saveData("border", border);
            helpers.saveData("border2", border2);
            helpers.saveData("borderColor", borderColor);
        }
    
        ,
    
        bordercolour: function (src, channel, command) {
            this.bordercolor(src, channel, command);
        }
    
        ,
    
        servertopiccolor: function (src, channel, command) {
            var name = sys.name(src), spelling = command[0].slice(11), color = command[1];
            if (!color) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, " + spelling + " not found.");
                return;
            }
            if (!sys.validColor(color)) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + spelling + ".");
                return;
            }
            serverTopicColor = sys.hexColor(color);
            helpers.saveData("serverTopicColor", serverTopicColor);
            sys.sendHtmlAuths(helpers.bot(bots.main) + "The server topic " + spelling +
            " has been changed to " + color + " by " + name + ".", channel);
        }
    
        ,
    
        servertopiccolour: function (src, channel, command) {
            this.servertopiccolor(src, channel, command);
        }
    
        ,
    
        channeltopiccolor: function (src, channel, command) {
            var name = sys.name(src), spelling = command[0].slice(12), color = command[1];
            if (!color) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, " + spelling + " not found.");
                return;
            }
            if (!sys.validColor(color)) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + spelling + ".");
                return;
            }
            channelTopicColor = sys.hexColor(color);
            helpers.saveData("channelTopicColor", channelTopicColor);
            sys.sendHtmlAuths(helpers.bot(bots.main) + "The channel topic " + spelling +
            " has been changed to " + color + " by " + name + ".", channel);
        }
    
        ,
    
        channeltopiccolour: function (src, channel, command) {
            this.channeltopiccolor(src, channel, command);
        }
    
        ,
    
        commandcolor: function (src, channel, command) {
            var name = sys.name(src), spelling = command[0].slice(7);
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, number not found.");
                return;
            }
            if (isNaN(command[1]) || command[1] < 0 ||command[1] >= cmdcolors.length) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid number.");
                return;
            }
            if (!command[2]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, " + spelling + " not found.");
                return;
            }
            if (!sys.validColor(command[2])) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + spelling + ".");
                return;
            }
            cmdcolors[command[1]] = sys.hexColor(command[2]);
            helpers.saveData("cmdcolors", cmdcolors);
            sys.sendHtmlAuths(helpers.bot(bots.main) + "Command " + spelling + " " + command[1] +
            " has been changed to " + command[2] + " by " + name + ".", channel);
        }
    
        ,
    
        commandcolour: function (src, channel, command) {
            this.commandcolor(src, channel, command);
        }
    
        ,
    
        /**
            -------------
            List Settings
            -------------
        **/
        listsettings: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Administrator Commands ~ List Settings</h2>"
            + "<br>"
            + "Current list colorings:<br>"
            + "<br>"
            + "<b>Mute list:</b> " + listcolors.mute + "<br>"
            + "<b>Ban list:</b> " + listcolors.ban + "<br>"
            + "<b>Range ban list:</b> " + listcolors.rangeban + "<br>"
            + "<b>Mega ban list:</b> " + listcolors.megaban + "<br>"
            + "<b>Giga ban list:</b> " + listcolors.gigaban + "<br>"
            + "<br>"
            + "Use <b>" + helpers.user("/listcolor ") + helpers.arg("list") + helpers.arg2("*color") + "</b> to change the table header color of <b>list</b> to <b>color</b>.<br>"
            + "The list name is without 'list'; e.g. mute, ban. The background color will be a color that is about 1.5 times as light. Also /listcolour.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
    
        ,
    
        listcolor: function (src, channel, command) {
            var name = sys.name(src), list = command[1], color;
            if (!list) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, list not found.");
                return;
            }
            if (!helpers.isInArray(list, Object.keys(listcolors))) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid list.");
                return;
            }
            color = command[2];
            if (!color) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, " + command[0].slice(4) + " not found.");
                return;
            }
            if (!sys.validColor(color)) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + command[0].slice(4) + ".");
                return;
            }
            listcolors[list] = sys.hexColor(color);
            helpers.saveData("listcolors", listcolors);
            sys.sendHtmlAuths(helpers.bot(bots.main) + "The " + command[0].slice(4) + " of the " + list + " list has been changed to " + color + " by " + name + ".", channel);
        }
    }
};
