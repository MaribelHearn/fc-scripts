/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY MOD COMMANDS modcmds.js
     - by Maribel Hearn, 2012-2015
    
    This file contains commands that can be
    run by moderators.
    ----------------------------------------------
*/
    modcommands = {
        modcommands: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Moderator Commands</h2>"
            + "<br>"
            + "<b>" + helpers.userl("/justiceoptions") + "</b>: displays justice options.<br>"
            + "<b>" + helpers.userl("/modinfooptions") + "</b>: displays mod info options.<br>"
            + "<b>" + helpers.userl("/nameoptions") + "</b>: displays name options.<br>"
            + "<b>" + helpers.userl("/otheroptions") + "</b>: displays other options.<br>"
            + "<b>" + helpers.userl("/altsettings") + "</b>: displays alt settings.<br>"
            + "<b>" + helpers.userl("/bigtextsettings") + "</b>: displays custom bigtext settings.<br>"
            + "<b>" + helpers.userl("/customsettings") + "</b>: displays justice message customisation settings.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        /**
            ---------------
            Justice Options
            ---------------
        **/
        justiceoptions: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Moderator Commands ~ Justice Options</h2>"
            + "<br>"
            + "<b>" + helpers.user("/forcerules ") + helpers.arg("player") + "</b>: shows <b>player</b> the server rules. Also /frules.<br>"
            + "<b>" + helpers.user("/forcerule ") + helpers.arg("player") + helpers.arg2("*rule") + "</b>: shows <b>player</b> the server rule <b>rule</b>. Also /frule.<br>"
            + "<b>" + helpers.user("/warn ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: warns <b>player</b> for <b>reason</b>.<br>"
            + "<b>" + helpers.user("/kick ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: kicks <b>player</b> from the server for <b>reason</b>. Also /k.<br>"
            + "<b>" + helpers.user("/mute ") + helpers.arg("player") + helpers.arg2("*reason") + helpers.arg3("*time") + "</b>: mutes <b>player</b> on the server for <b>reason</b>. Also /m.<br>"
            + "<b>" + helpers.user("/unmute ") + helpers.arg("player") + "</b>: unmutes <b>player</b> on the server.<br>"
            + "<b>" + helpers.user("/mutereason ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: changes the mute reason for <b>player</b> to <b>reason</b>.<br>"
            + "<b>" + helpers.user("/mutelist") + "</b>: view the server's mutelist in a neat table with reason and date of mute.<br>"
            + "<b>" + helpers.user("/clearmutelist") + "</b>: clears the server's mute list.<br>"
            + "<b>" + helpers.user("/banlist") + "</b>: view the server's ban list in a neat table with reason and date of ban.<br>"
            + "<b>" + helpers.user("/namebanlist") + "</b>: view the server's currently active name bans (all alts of banned people).<br>"
            + "<b>" + helpers.user("/rangebanlist") + "</b>: view the server's range ban list in a neat table with reason and date of ban.<br>"
            + "<b>" + helpers.user("/megabanlist") + "</b>: view the server's mega ban list in a neat table with reason and date of ban.<br>"
            + "<b>" + helpers.user("/gigabanlist") + "</b>: view the server's giga ban list in a neat table with reason and date of ban.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        forcerules: function (src, channel, command) {
            var name = sys.name(src), auth = sys.auth(src);
            if (!command[1]) {
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Error 404, player not found.", channel);
                return;
            }
            var trgt = sys.id(command[1]);
            if (!trgt) {
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Error 400, " + command[1] + " is not currently on the server!", channel);
                return;
            }
            var trgtauth = sys.auth(trgt);
            if (trgtauth > auth) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, you can't force rules on " + command[1] + " because their auth level is higher or equal to yours.");
                return;
            }
            var rulesmessage = border
            + "<h2>Rules</h2>"
            + "<br>"
            + helpers.bot("• " + botsymbol + RULE1) + EXPL1
            + helpers.bot("• " + botsymbol + RULE2) + EXPL2
            + helpers.bot("• " + botsymbol + RULE3) + EXPL3
            + helpers.bot("• " + botsymbol + RULE4) + EXPL4
            + helpers.bot("• " + botsymbol + RULE5) + EXPL5
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(trgt, rulesmessage, channel);
            sys.sendHtmlMessage(trgt, helpers.bot(bots.command) + "The server rules were forced on you by " + name + "!", channel);
            sys.sendHtmlMessage(src, helpers.bot(bots.command) + "You forced the Server Rules on " + command[1] + "!", channel);
        }
        
        ,
        
        frules: function (src, channel, command) {
            this.forcerules(src, channel, command);
        }
        
        ,
        
        forcerule: function (src, channel, command) {
            var name = sys.name(src), auth = sys.auth(src);
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.");
                return;
            }
            if (!command[2] || command[2] > 5 || command[2] < 1 || isNaN(command[2])) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, rule not found.");
                return;
            }
            command[2] = parseInt(command[2]);
            command[2]--;
            var trgt = sys.id(command[1]);
            if (!trgt) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, " + command[1] + " is not currently on the server!", channel);
                return;
            }
            var trgtauth = sys.auth(trgt);
            if (trgtauth > auth) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, you can't force rules on " + command[1] + " because their auth level is higher or equal to yours.");
                return;
            }
            var rules = [];
            rules.push(helpers.bot("• " + botsymbol + RULE1) + EXPL1);
            rules.push(helpers.bot("• " + botsymbol + RULE2) + EXPL2);
            rules.push(helpers.bot("• " + botsymbol + RULE3) + EXPL3);
            rules.push(helpers.bot("• " + botsymbol + RULE4) + EXPL4);
            rules.push(helpers.bot("• " + botsymbol + RULE5) + EXPL5);
            sys.sendHtmlMessage(trgt, border + "<h2>Rules ~ Rule " + (eval(command[2]) + 1 * 1) + "</h2><br>" + rules[command[2]] + "<br><timestamp/><br>" + border2, channel);
            command[2]++;
            sys.sendHtmlMessage(trgt, helpers.bot(bots.command) + "Rule " + command[2] + " was forced on you by " + name + "!", channel);
            sys.sendHtmlMessage(src, helpers.bot(bots.command) + "You forced Rule " + command[2] + " on " + command[1] + "!", channel);
        }
        
        ,
        
        frule: function (src, channel, command) {
            this.forcerule(src, channel, command);
        }
        
        ,
        
        warn: function (src, channel, command) {
            var name = sys.name(src), trgtname = command[1], reason = command[2];
            if (helpers.muteCheck(name)) {
                helpers.muteMessage(src, channel);
                return;
            }
            !reason ? reason = "Unknown" : reason = helpers.escapehtml(reason);
            sys.sendHtmlAll(helpers.bot(bots.warn) + "CAUTION! " + name + " warned " + trgtname + "! [Reason: " + reason + "]", channel);
        }
        
        ,
        
        kick: function (src, channel, command) {
            var reason = command[2], name = sys.name(src), lower = name.toLowerCase(), trgt = sys.id(command[1]), auth = sys.auth(src), msg;
            if (helpers.muteCheck(name)) {
                helpers.muteMessage(src, channel);
                return;
            }
            if (!trgt) {
                helpers.starfox(src, channel, command, bots.kick, "Error 400, you can't kick " + command[1] + " since they are not online!");
                return;
            }
            var trgtauth = sys.auth(trgt);
            if (trgtauth >= auth) {
                helpers.starfox(src, channel, command, bots.kick, "Error 403, you may not kick " + command[1] + " because their auth level is higher or equal to yours!");
                return;
            }
            if (!reason) {
                reason = "Unknown";
            }
            if (kickmessages[lower]) {
                msg = kickmessages[lower].replace(/~Self~/gi, name).replace(/~Target~/gi, sys.name(trgt)).replace(/~Server~/gi, sys.getServerName());
                sys.sendHtmlAll(helpers.bot(bots.kick) + msg + " [Reason: " + reason + "]", 0);
            } else {
                sys.sendHtmlAll(helpers.bot(bots.kick) + sys.name(trgt) + " has been kicked from the server by " + name + "! [Reason: " + reason + "]", 0);
            }
            sys.kick(trgt);
        }
        
        ,
        
        k: function (src, channel, command) {
            this.kick(src, channel, command);
        }
        
        ,
        
        mute: function (src, channel, command, time, unit) {
            var name = sys.name(src), original = players[src].name, trgtname = command[1], trgt = sys.id(trgtname), reason = command[2], auth = sys.auth(src),
                srcip = sys.ip(src), trgtauth, trgtip, lower = command[1].toLowerCase(), msg;
            if (helpers.muteCheck(name)) {
                helpers.muteMessage(src, channel);
                return;
            }
            if (sys.dbIp(command[1]) === undefined) {
                helpers.starfox(src, channel, command, bots.mute, "Error 400, you can't mute " + trgtname + " because they do not exist in the database.");
                return;
            }
            if (!trgt) {
                trgtauth = sys.dbAuth(command[1]);
                trgtip = sys.dbIp(command[1]);
            }
            else {
                trgtauth = sys.auth(trgt);
                trgtip = sys.ip(trgt);
            }
            if (trgtauth >= auth && lower != name.toLowerCase() && lower != players[src].name.toLowerCase()) {
                helpers.starfox(src, channel, command, bots.mute, "Error 403, you can't mute " + trgtname + " because their auth level is higher or equal to yours.");
                return;
            }
            if (helpers.muteCheck(trgtname)) {
                helpers.starfox(src, channel, command, bots.mute, "Error 400, you can't mute " + trgtname + " because they already are muted!");
                return;
            }
            if (!reason) {
                reason = "Unknown";
            } else {
                reason = helpers.escapehtml(reason);
            }
            var units = ["s", "m", "h", "d", "seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
            mutelist[lower] = {};
            mutelist[lower].ip = trgtip;
            mutelist[lower].mutedby = original;
            mutelist[lower].reason = reason;
            if (!command[3]) {
                mutelist[lower].time = "5ever";
                mutelist[lower].starttime = "5ever";
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
                    helpers.starfox(src, channel, command, bots.mute, "Error 400, invalid time.");
                    return;
                }
                if (!helpers.isInArray(unit, units)) {
                    helpers.starfox(src, channel, command, bots.mute, "Error 400, invalid unit.");
                    return;
                }
                if (unit == "s" || unit == "second" || unit == "seconds") {
                    mutelist[lower].time = time;
                    time == 1 ? unit = "second" : unit = "seconds";
                } else if (unit == "m" || unit == "minute" || unit == "minutes") {
                    mutelist[lower].time = time * 60;
                    time == 1 ? unit = "minute" : unit = "minutes";
                } else if (unit == "h" || unit == "hour" || unit == "hours") {
                    mutelist[lower].time = time * 3600;
                    time == 1 ? unit = "hour" : unit = "hours";
                } else if (unit == "d" || unit == "day" || unit == "days") {
                    mutelist[lower].time = time * 86400;
                    time == 1 ? unit = "day" : unit = "days";
                }
                mutelist[lower].starttime = time + " " + unit;
            }
            mutelist[lower].starttime = time + " " + unit;
            var date = helpers.date(new Date());
            mutelist[lower].date = date;
            sys.write("data/mutelist.txt", JSON.stringify(mutelist));
            if (members[lower]) {
                trgtname = members[lower];
            }
            if (mutemessages[name.toLowerCase()]) {
                if (time == "forever") {
                    msg = mutemessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Time~/gi, "forever").replace(/~Server~/gi, sys.getServerName());
                } else {
                    msg = mutemessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Time~/gi, time + " " + unit).replace(/~Server~/gi, sys.getServerName());
                }
                sys.sendHtmlMain(helpers.bot(bots.mute) + msg + " [Reason: " + reason + "]");
            } else {
                sys.sendHtmlAll(helpers.bot(bots.mute) + name + " has muted " + trgtname + (time == "forever" ? "" : " for " + time + " ") + unit + "! [Reason: " + reason + "]", channel);
            }
        }
        
        ,
        
        m: function (src, channel, command) {
            this.mute(src, channel, command);
        }
        
        ,
        
        unmute: function (src, channel, command) {
            var name = sys.name(src), trgtname = command[1], trgt = sys.id(trgtname), srcip = sys.ip(src), trgtip;
            if (!sys.dbIp(command[1])) {
                helpers.starfox(src, channel, command, bots.mute, "Error 400, you can't unmute " + trgtname + " because they do not exist in the database!");
                return;
            }
            !trgt ? trgtip = sys.dbIp(command[1]) : trgtip = sys.ip(trgt);
            if (!helpers.muteCheck(trgtname)) {
                helpers.starfox(src, channel, command, bots.mute, "Error 400, you can't unmute " + trgtname + " because they aren't muted!");
                return;
            }
            for (var index in mutelist) {
                if (!sys.dbIp(index)) {
                    delete mutelist[index];
                    continue;
                }
                if (sys.dbIp(index) == trgtip) {
                    delete mutelist[index];
                    sys.write("data/mutelist.txt", JSON.stringify(mutelist));
                }
            }
            if (members[trgtname]) {
                trgtname = members[trgtname];
            }
            sys.sendHtmlMain(helpers.bot(bots.mute) + trgtname + " has been unmuted by " + name + "!");
        }
        
        ,
        
        mutereason: function (src, channel, command) {
            var reason = command[2];
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.mute, "Error 404, player not found.");
                return;
            }
            var name = sys.name(src), lower = command[1].toLowerCase();
            if (!reason) {
                reason = "Unknown";
            }
            mutelist[lower].reason = reason;
            sys.write("data/mutelist.txt", JSON.stringify(mutelist));
            if (members[lower])lower = members[lower];
            sys.sendHtmlMain(helpers.bot(bots.mute) + name + " has changed the mute reason of " + lower + " to '" + reason + "'!");
        }
        
        ,
        
        mutelist: function (src, channel, command) {
            var onlinemessage = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
            "thead {font-weight:bold;}</style><h2>Mute List</h2><br><table cellpadding=2 cellspacing=0><thead><tr style='background-color:dodgerblue'>" +
            "<td>Name</td><td>IP</td><td>Muter</td><td>Reason</td><td>Muted for</td><td>Time left</td><td>Date of muting</td></tr></thead>", id;
            for (var index in mutelist) {
                if (!sys.dbIp(index)) {
                    delete mutelist[index];
                    continue;
                }
                id = mutelist[index];
                if (!id.time || id.time === null) {
                    time = "5ever";
                    left = "5ever";
                    unit = "";
                } else {
                    time = id.starttime;
                    left = id.time;
                    unit = " seconds";
                    if (left == 1)unit = " second";
                    if (left >= 60) {
                        left = left / 60;
                        unit = " minutes";
                        if (left == 1)unit = " minute";
                        if (left >= 60) {
                            left = left / 60;
                            unit = " hours";
                            if (left == 1)unit = " hour";
                            if (left >= 24) {
                                left = left / 24;
                                unit = " days";
                                if (left == 1)unit = " day";
                            }
                        }
                    }
                    if (Math.round(left) != left) {
                        left = Math.round(left);
                        unit += " (approx.)";
                    }
                }
                if (members[index])index = members[index];
                onlinemessage += "<tr style='background-color:lightblue'><td>" + index + "</td><td>" + id.ip + "</td><td>" + id.mutedby +
                "</td><td>" + id.reason + "</td><td>" + time + "</td><td>" + left + unit + "</td><td>" + id.date + "</td></tr>";
            }
            var playernum = Object.keys(mutelist).length;
            onlinemessage += "</table><br><br><b>Total Muted Players:</b> " + playernum + "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, onlinemessage, channel);
        }
        
        ,
        
        clearmutelist: function (src, channel, command) {
            var name = sys.name(src);
            mutelist = {};
            sys.write("data/mutelist.txt", "{}");
            sys.sendHtmlMain(helpers.bot(bots.mute) + "The mute list has been cleared by " + name + "!");
        }
        
        ,
        
        banlist: function (src, channel, command) {
            var player, time, left, ip;
            var onlinemessage = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
            "thead {font-weight:bold;}</style><h2>Ban List</h2><br><table cellpadding=2 cellspacing=0><thead><tr style='background-color:#ff6900'>" +
            "<td>Name</td><td>IP</td><td>Banner</td><td>Reason</td><td>Banned for</td><td>Time left</td><td>Date of banning</td></tr></thead>";
            for (var index in banlist) {
                if (!sys.dbIp(index) && !helpers.isIp(index)) {
                    ip = banlist[index].ip;
                    banlist[ip] = banlist[index];
                    delete banlist[index];
                    continue;
                }
                var id = banlist[index];
                if (!id.time || id.time === null) {
                    time = "5ever";
                    left = "5ever";
                    unit = "";
                } else {
                    time = id.starttime;
                    left = id.time;
                    unit = " seconds";
                    if (left == 1)unit = " second";
                    if (left >= 60) {
                        left = left / 60;
                        unit = " minutes";
                        if (left == 1)unit = " minute";
                        if (left >= 60) {
                            left = left / 60;
                            unit = " hours";
                            if (left == 1)unit = " hour";
                            if (left >= 24) {
                                left = left / 24;
                                unit = " days";
                                if (left == 1)unit = " day";
                            }
                        }
                    }
                    if (Math.round(left) != left) {
                        left = Math.round(left);
                        unit += " (approx.)";
                    }
                }
                if (index == id.ip) {
                    player = "-";
                } else {
                    player = index;
                    if (members[player])player = members[player];
                }
                onlinemessage += "<tr style='background-color:orange'><td>" + player + "</td><td>" + id.ip + "</td><td>" + id.bannedby +
                "</td><td>" + id.reason + "</td><td>" + time + "</td><td>" + left + unit + "</td><td>" + id.date + "</td></tr>";
            }
            var playernum = Object.keys(banlist).length;
            onlinemessage += "</table><br><br><b>Total Banned Players:</b> " + playernum + "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, onlinemessage, channel);
        }
        
        ,
        
        namebanlist: function (src, channel, command) {
            if (sys.banList().length === 0) {
                sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "There are no name bans at the moment.", channel);
            } else {
                sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Name banned: " + sys.banList().join(", ") + ".", channel);
            }
        }
        
        ,
        
        rangebanlist: function (src, channel, command) {
            var onlinemessage = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
            "thead {font-weight:bold;}</style><h2>Range Ban List</h2><br><table cellpadding=2 cellspacing=0><thead><tr style='background-color:green'>" +
            "<td>Name</td><td>Range</td><td>Banner</td><td>Reason</td><td>Date</td></tr></thead>", player, range;
            for (var index in rangebanlist) {
                if (!sys.dbIp(index) && !helpers.isRange(index)) {
                    range = rangebanlist[index].range;
                    rangebanlist[range] = rangebanlist[index];
                    delete rangebanlist[index];
                    continue;
                }
                var id = rangebanlist[index];
                if (index == id.range) {
                    player = "-";
                } else {
                    player = index;
                    if (members[player])player = members[player];
                }
                onlinemessage += "<tr style='background-color:#7fff00'><td>" + player + "</td><td>" + id.range + "</td><td>" + id.banner + "</td><td>" + id.reason + "</td><td>" + id.date + "</td></tr>";
            }
            var playernum = Object.keys(rangebanlist).length;
            onlinemessage += "</table><br><br><b>Total Range Banned Players:</b> " + playernum + "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, onlinemessage, channel);
        }
        
        ,
        
        megabanlist: function (src, channel, command) {
            var onlinemessage = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
            "thead {font-weight:bold;}</style><h2>Mega Ban List</h2><br><table cellpadding=2 cellspacing=0><thead><tr style='background-color:purple'>" +
            "<td>Name</td><td>Banner</td><td>Reason</td><td>Date</td></tr></thead>", player;
            for (var index in megabanlist) {
                var id = megabanlist[index];
                player = index;
                if (members[player]) {
                    player = members[player];
                }
                onlinemessage += "<tr style='background-color:fuchsia'><td>" + player + "</td><td>" + id.banner + "</td><td>" + id.reason + "</td><td>" + id.date + "</td></tr>";
            }
            var playernum = Object.keys(megabanlist).length;
            onlinemessage += "</table><br><br><b>Total Mega Banned Players:</b> " + playernum + "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, onlinemessage, channel);
        }
        
        ,
        
        gigabanlist: function (src, channel, command) {
            var onlinemessage = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
            "thead {font-weight:bold;}</style><h2>Giga Ban List</h2><br><table cellpadding=2 cellspacing=0><thead><tr style='background-color:darkred'>" +
            "<td>Name</td><td>Banner</td><td>Reason</td><td>Pseudo</td><td>Date</td></tr></thead>", player;
            for (var index in gigabanlist) {
                var id = gigabanlist[index];
                player = index;
                if (members[player]) {
                    player = members[player];
                }
                onlinemessage += "<tr style='background-color:red'><td>" + player + "</td><td>" + id.banner + "</td><td>" + id.reason + "</td><td>" + id.pseudo + "</td><td>" + id.date + "</td></tr>";
            }
            var playernum = Object.keys(gigabanlist).length;
            onlinemessage += "</table><br><br><b>Total Giga Banned Players:</b> " + playernum + "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, onlinemessage, channel);
        }
        
        ,
        
        /**
            ----------------
            Mod Info Options
            ----------------
        **/
        modinfooptions: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Moderator Commands ~ Info Options</h2>"
            + "<br>"
            + "<b>" + helpers.user("/cp ") + helpers.arg("player") + "</b>: displays Control Panel and location data for <b>player</b>. Also /whois.<br>"
            + "<b>" + helpers.user("/recall ") + helpers.arg("player") + "</b>: recalls <b>player</b>'s country and time zone data. It will be erased again after one minute.<br>"
            + "<b>" + helpers.user("/getcolor ") + helpers.arg("player") + "</b>: displays <b>player</b>'s color as hexadecimal color code. Also /getcolour.<br>"
            + "<b>" + helpers.user("/rangealts ") + helpers.arg("range") + "</b>: displays alts for <b>range</b>.<br>"
            + "<b>" + helpers.user("/lastmessages") + "</b>: Shows everyone's last 10 messages in a neat table. Also /lastmsgs or /lastposts.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        cp: function (src, channel, command) {
            var cpmessage = border + "<h2>Control Panel</h2><br>", gigabanned = false, megabanned = false, rangebanned = false, banned = false, muted = false;
            var name, player, auth, imageindex, status, registered, location, country, os, derp, usedips, playerchannels, lastlogin, timezone2, flag, version;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.", channel);
                return;
            }
            player = command[1].toLowerCase();
            members[player] ? name = members[player].name : name = player;
            if (!sys.dbIp(player)) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, you can't cp " + name + " because they do not exist in the database.");
                return;
            }
            ip = sys.dbIp(player);
            range = sys.dbRange(player);
            id = sys.id(player);
            for (var index in gigabanlist) {
                if (index == player) {
                    gigabanned = true;
                }
            }
            for (var index in megabanlist) {
                if (!gigabanned && index == player) {
                    megabanned = true;
                }
            }
            for (var index in rangebanlist) {
                if (!gigabanned && !megabanned && (index == player || index == range)) {
                    rangebanned = true;
                }
            }
            for (var index in banlist) {
                if (!gigabanned && !megabanned && !rangebanned && (index == player || index == ip)) {
                    banned = true;
                }
            }
            for (var index in mutelist) {
                if (!gigabanned && !megabanned && !rangebanned && !banned && index == player) {
                    muted = true;
                }
            }
            var alts = sys.aliases(ip), altsnum;
            if (id) {
                auth = sys.auth(id);
                ip = sys.ip(id);
                imageindex = (auth > 3 ? 0 : auth);
                if (sys.battling(id)) {
                    imageindex += 8;
                } else if (sys.away(id)) {
                    imageindex += 4;
                }
                status = "<font color='green'><b>Online";
                if (gigabanned) {
                    status += " [Giga Banned]";
                } else if (megabanned) {
                    status += " [Mega Banned]";
                } else if (rangebanned) {
                    status += " [Range Banned]";
                } else if (banned) {
                    status += " [Banned]";
                } else if (muted) {
                    status += " [Muted]";
                }
                status += "</b></font>";
                playerchannels = sys.channelsOfPlayer(id);
                for (var index in playerchannels) {
                    playerchannels[index] = "<a href=\"po:join/" + sys.channel(playerchannels[index]) + "\">#" + sys.channel(playerchannels[index]) + "</a>";
                }
                playerchannels = playerchannels.join(", ");
            } else {
                auth = sys.dbAuth(player);
                imageindex = (auth > 3 ? 0 : auth) + 4;
                status = "<font color='red'>Offline";
                if (gigabanned) {
                    status += " [Giga Banned]";
                } else if (megabanned) {
                    status += " [Mega Banned]";
                } else if (rangebanned) {
                    status += " [Range Banned]";
                } else if (banned) {
                    status += " [Banned]";
                } else if (muted) {
                    status += " [Muted]";
                }
                status += "</font>";
                playerchannels = "None";
            }
            lastlogin = helpers.formatLastOn(src, sys.dbLastOn(player));
            operatingsystem[player] ? os = operatingsystem[player] : os = "[no data]";
            versions[player] ? version = ", ver. " + versions[player] : version = "";
            if (!countryname[player]) {
                country = "[no data]";
                derp = "[no data]";
                flag = "[no data]";
            } else {
                country = helpers.toFlagKey(helpers.removespaces(countryname[player].toUpperCase()));
                derp = countryname[player];
                flag = FLAGS[country];
            }
            timezone[player] ? timezone2 = timezone[player] : timezone2 = "[no data]";
            sys.dbRegistered(player) ? registered = "<b style='color:green'>Yes</b>" : registered = "<font color='red'>No</font>";
            alts = alts.join(", ");
            altsnum = sys.aliases(ip).length;
            iplist[player] ? usedips = iplist[player].join(", ") : usedips = "Unknown";
            if (members[player]) {
                player = members[player];
            }
            !cityname[player.toLowerCase()] ? location = "[no data]" : location = cityname[player.toLowerCase()];
            cpmessage += helpers.authimage(src, imageindex) + " " + player + " " + status +
            "<br><b>Auth:</b> " + helpers.authname(sys.dbAuth(player), true);
            location == "[no data]" ? cpmessage += "<br><b>IP:</b> " + ip : cpmessage += "<br><b>IP:</b> <a href='https://www.google.com/maps?q=" + location + ", " + derp + "'>" + ip + "</a>";
            cpmessage += "<br><b>Client:</b> " + os + version +
            "<br><b>Location:</b> " + flag + " " + location + ", " + derp +
            "<br><b>Time Zone:</b> " + timezone2 +
            "<br><b>Registered:</b> " + registered +
            "<br><b>Last Online:</b> " + lastlogin +
            "<br><b>Alts:</b> " + alts + 
            "<br><b>Number of Alts:</b> " + altsnum +
            "<br><b>Used IPs:</b> " + usedips +
            "<br><b>Channels:</b> " + playerchannels +
            "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, cpmessage, channel);
        }
        
        ,
        
        whois: function (src, channel, command) {
            this.cp(src, channel, command);
        }
        
        ,
        
        recall: function (src, channel, command) {
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.");
                return;
            }
            var player = command[1].toLowerCase();
            if (!sys.dbIp(player)) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, you can't recall " + player + "'s data because they don't exist in the database!");
                return;
            }
            if (API === "") {
                helpers.starfox(src, channel, command, bots.command, "Error 404, API key not found. See the readme file for help.");
                return;
            }
            var ip = sys.dbIp(player);
            sys.webCall(helpers.countryRetrievalUrl(ip), function (resp) {
                resp = JSON.parse(resp);
                countryname[player] = helpers.countrydata(resp.countryName);
                cityname[player] = helpers.citydata(resp.cityName);
                timezone[player] = helpers.timezonedata(resp.countryName, resp.timeZone);
                sys.write("data/countryname.txt", JSON.stringify(countryname));
                sys.write("data/cityname.txt", JSON.stringify(cityname));
                sys.write("data/timezone.txt", JSON.stringify(timezone));
                if (members[player]) {
                    player = members[player];
                }
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + player + "'s country and time zone data has been recalled.", channel);
                if (sys.dbAuth(player) < 1) {
                    sys.setTimer(function () {
                        delete countryname[player.toLowerCase()];
                        delete cityname[player.toLowerCase()];
                        delete timezone[player.toLowerCase()];
                        sys.write("data/countryname.txt", JSON.stringify(countryname));
                        sys.write("data/cityname.txt", JSON.stringify(cityname));
                        sys.write("data/timezone.txt", JSON.stringify(timezone));
                        sys.sendHtmlMessage(src, helpers.bot(bots.command) + player + "'s country and time zone data has been deleted.", channel);
                    }, 60000, 0);
                }
            });
        }
        
        ,
        
        getcolor: function (src, channel, command) {
            var trgtname = command[1], trgt;
            if (!trgtname) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.");
                return;
            }
            trgt = sys.id(trgtname);
            if (!trgt) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, that player is not currently online!");
                return;
            }
            trgtname = sys.name(trgt);
            sys.sendHtmlMessage(src, helpers.bot(bots.command) + trgtname + "'s " + command[0].slice(3) + " is " + helpers.color(trgt) + ".", channel);
        }
        
        ,
        
        getcolour: function (src, channel, command) {
            this.getcolor(src, channel, command);
        }
        
        ,
        
        rangealts: function (src, channel, command) {
            var altsmessage = border + "<h2>Alts for range " + command[1] + "</h2><br><table>", range = command[1], aliases = [], db;
            if (!range) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, range not found.");
                return;
            }
            if (!helpers.isRange(range)) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid range.");
                return;
            }
            db = sys.dbAll();
            for (var index in db) {
                if (sys.dbRange(db[index]) == range) {
                    aliases.push(db[index]);
                }
            }
            if (aliases.length === 0) {
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + "That range doesn't have any alts!", channel);
                return;
            }
            altsmessage += "<tr><td>" + aliases.join(", ") + "</td></tr>";
            altsmessage += "</table><br><br><b>Total Alts:</b> " + aliases.length + "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, altsmessage, channel);
        }
        
        ,
        
        lastmessages: function (src, channel, command) {
            var message = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" 
            + "thead {font-weight:bold;}</style>"
            + "<h2>Last Messages</h2><br />"
            + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'><td>Player Name</td><td>Messages</td></tr></thead>";
            for (var id in players) {
                var name = players[id].name;
                if (sys.name(id) !== undefined) {
                    if (name != sys.name(id)) {
                        name += "<br />(" + sys.name(id) + ")";
                    }
                }
                var namemsg = "<b style='color:" + helpers.color(id) + "'>" + name + "</b>";
                message += "<tr><td>" + namemsg + "</td><td>";
                for (var y in players[id].lastmessages) {
                    message += helpers.timestampify(players[id].lastmessagetimes[y]) + ": " + helpers.escapehtml(players[id].lastmessages[y]);
                    if (y !== players[id].lastmessages.length) {
                        message += "<br />";
                    }
                }
                message += "</td></tr>";
            }
            message += "</table><br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, message, channel);
        }
        
        ,
        
        lastmsgs: function (src, channel, command) {
            this.lastmessages(src, channel, command);
        }
        
        ,
        
        lastposts: function (src, channel, command) {
            this.lastmessages(src, channel, command);
        }
        
        ,
        
        /**
            ------------
            Name Options
            ------------
        **/
        nameoptions: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Moderator Commands ~ Name Options</h2>"
            + "<br>"
            + "<b>" + helpers.user("/changename ") + helpers.arg("player") + helpers.arg2("*name") + "</b>: changes <b>player</b>'s name to <b>name</b>.<br>"
            + "<b>" + helpers.user("/ify ") + helpers.arg("front/behind/replace") + helpers.arg2("*text") + helpers.arg3("*self") + "</b>: puts <b>text</b> in front or behind everyone else's names,"
            + " or replaces the names by <b>text</b> with a number. If <b>self</b> is specified, the command affects yourself as well.<br>"
            + "<b>" + helpers.user("/resetall") + "</b>: sets all players' usernames back to their original states.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        changename: function (src, channel, command) {
            var name = sys.name(src), auth = sys.auth(src);
            if (helpers.muteCheck(name)) {
                helpers.muteMessage(src, channel);
                return;
            }
            if (regchannels[sys.channel(channel).toLowerCase()].silence > auth) {
                helpers.starfox(src, channel, command, bots.silence, "I KILL YOOOOUUUU!!!");
                return;
            }
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.");
                return;
            }
            var trgt = sys.id(command[1]);
            if (!trgt) {
                sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 400, " + command[1] + " is not currently on the server!", channel);
                return;
            }
            if (!command[2]) {
                sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 404, name not found.", channel);
                return;
            }
            sys.changeName(trgt, command[2]);
            sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(name) +
            " changed " + helpers.arg(command[1]) + "'s name to " + helpers.arg2(command[2]) + "!</b>", channel);
        }
        
        ,
        
        ify: function (src, channel, command) {
            var name = sys.name(src), auth = sys.auth(src), playerids = sys.playerIds(), n = 0, option, text, self;
            if (helpers.muteCheck(name)) {
                helpers.muteMessage(src, channel);
                return;
            }
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, option not found.");
                return;
            }
            option = command[1].toLowerCase();
            if (option != "front" && option != "behind" && option != "replace") {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid option.");
                return;
            }
            if (!command[2]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
                return;
            }
            text = helpers.escapehtml(command[2]);
            !command[3] ? self = false : self = true;
            for (var i in playerids) {
                if (playerids[i] == src && !self) {
                    continue;
                }
                if (option == "front") {
                    sys.changeName(playerids[i], text + " " + sys.name(playerids[i]));
                } else if (option == "behind") {
                    sys.changeName(playerids[i], sys.name(playerids[i]) + " " + text);
                } else {
                    sys.changeName(playerids[i], text + " " + n);
                    n++;
                }
            }
            sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(name) + " has " + helpers.arg2(text) + "-ified the server!</b>", channel);
        }
        
        ,
        
        resetall: function (src, channel, command) {
            var name = sys.name(src), auth = sys.auth(src);
            if (helpers.muteCheck(name)) {
                helpers.muteMessage(src, channel);
                return;
            }
            if (regchannels[sys.channel(channel).toLowerCase()].silence > auth) {
                helpers.starfox(src, channel, command, bots.silence, "I KILL YOOOOUUUU!!!");
                return;
            }
            for (var index in players) {
                sys.changeName(index, players[index].name);
            }
            sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(name) + " has set everyone's name back to its original state.</b>", channel);
        }
        
        ,
        
        /**
            -------------
            Other Options
            -------------
        **/
        otheroptions: function (src, channel, command) {
            var commandsmessage = border
            + "<h2>Moderator Commands ~ Other Options</h2>"
            + "<br>"
            + "<b>" + helpers.user("/clear") + "</b>: clears the chat. Also /chatclear and /clearchat.<br>"
            + "<b>" + helpers.user("/fullclear") + "</b>: actually clears the entire chat. Takes a long time, so prepare for lag.<br>"
            + "<b>" + helpers.user("/flash ") + helpers.arg("player") + "</b>: flashes <b>player</b>.<br>"
            + "<b>" + helpers.user("/html ") + helpers.arg("message") + "</b>: send the HTML-message <b>message</b>.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        clear: function (src, channel, command) {
            var name = sys.name(src);
            if (helpers.muteCheck(name)) {
                helpers.starfox(src, channel, command, bots.mute, "Error 403, you are muted on the server.", channel);
                return;
            }
            var clearmessage = "<br>";
            for (var index = 0; index < 100; index++) {
                clearmessage += "<br>";
            }
            clearmessage += "<font color='white'>:</font><div>";
            clearmessage += helpers.bot(bots.clear) + "Kyuu~ chat explod.";
            sys.sendHtmlAll(clearmessage, channel);
        }
        
        ,
        
        clearchat: function (src, channel, command) {
            this.clear(src, channel, command);
        }
        
        ,
        
        chatclear: function (src, channel, command) {
            this.clear(src, channel, command);
        }
        
        ,
        
        fullclear: function (src, channel, command) {
            var name = sys.name(src);
            if (helpers.muteCheck(name)) {
                helpers.starfox(src, channel, command, bots.mute, "Error 403, you are muted on the server.", channel);
                return;
            }
            var starttime = new Date();
            for (var index = 0; index < 2998; index++) {
                sys.sendAll("", channel);
            }
            sys.sendHtmlAll("<font color='white'>:</font><div>", channel);
            var runtime = new Date() - starttime;
            if (runtime > 1000) {
                runtime = (runtime / 1000).toFixed(3) + " seconds";
            } else if (runtime == 1000) {
                runtime = "1 second";
            } else {
                runtime += " milliseconds";
            }
            sys.sendHtmlAll(helpers.bot(bots.clear) + "Kyuu~ chat explod.", channel);
            sys.sendHtmlAll(helpers.bot(bots.clear) + "The full clear runtime was " + runtime + ".", channel);
            sys.clearChat();
        }
        
        ,
        
        flash: function (src, channel, command) {
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.");
                return;
            }
            var name = sys.name(src);
            var trgt = sys.id(command[1]);
            if (!trgt) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, " + command[1] + " is not currently on the server!", channel);
                return;
            }
            sys.sendHtmlMessage(trgt, helpers.bot(bots.command) + " You got flashed by " + name + "!<ping/>");
            sys.sendHtmlMessage(src, helpers.bot(bots.command) + "You flashed " + command[1] + "!", channel);
        }
        
        ,
        
        html: function (src, channel, command) {
            var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src);
            if (helpers.muteCheck(name)) {
                helpers.muteMessage(src, channel);
                return;
            }
            if (helpers.cmuteCheck(players[src].name, sys.channel(channel).toLowerCase())) {
                sys.sendHtmlMessage(src, helpers.bot(bots.mute) + "Sorry, you are muted on this channel.", channel);
                return;
            }
            if (regchannels[sys.channel(channel).toLowerCase()]) {
                if (regchannels[sys.channel(channel).toLowerCase()].silence > auth) {
                    helpers.starfox(src, channel, command, bots.silence, "I KILL YOOOOUUUU!!!");
                    return;
                }
            }
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, message not found.");
                return;
            }
            command.splice(0, 1);
            command = command.join(DELIMITER);
            if (helpers.breakinghtml(command)) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, you may not post chat breaking HTML.");
                return;
            }
            if (auth === 0 || auth >= 4) {
                sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>" + sys.name(src) + ":</b></font> " + command, channel);
            } else {
                sys.sendHtmlAll("<font color='" + color + "'><timestamp/>+<b><i>" + sys.name(src) + ":</i></b></font> " + command, channel);
            }
        }
        
        ,
        /**
            ------------
            Alt Settings
            ------------
        **/
        altsettings: function (src, channel, command) {
            var commandsmessage = border + "<h2>Moderator Commands ~ Alt Settings</h2><br><style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}"
            + "thead {font-weight:bold;}</style>"
            + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
            + "<td>Icon</td><td>Auth</td><td>Title</td><td>Name</td><td>Registered</td><td>Last Online</td></tr></thead><tbody>", total = 0, alts = sys.aliases(sys.ip(src)), title = "", name, auth, registered, lastlogin;
            for (var index in alts) {
                name = alts[index];
                auth = sys.dbAuth(name);
                authtitles[name] ? title = authtitles[name] : title = "-";
                sys.dbRegistered(name) ? registered = "<b style='color:green'>Yes</b>" : registered = "<font color='red'>No</font>";
                lastlogin = helpers.formatLastOn(src, sys.dbLastOn(name));
                if (members[alts[index]]) {
                    name = members[alts[index]];
                }
                commandsmessage += "<tr><td>" + helpers.authimage(src, auth > 3 ? 0 : auth) + "</td><td>" + helpers.authname(auth, true) + "</td><td>" + title +
                "</td><td>" + name + "</td><td>" + registered + "</td><td>" + lastlogin + "</td></tr>";
                total++;
            }
            commandsmessage += "</tbody></table><br><br><b>Total Alts:</b> " + total + "<br><br>"
            + "Use <b>" + helpers.user("/alts ") + helpers.arg("player/IP") + "</b> to display <b>player</b>'s alts or the alts of <b>IP</b> in a neat table.<br>"
            + "Use <b>" + helpers.user("/passauth ") + helpers.arg("alt") + "</b> to pass your auth to <b>alt</b>. <b>alt</b> must have the same IP and must be registered.<br>"
            + "Use <b>" + helpers.user("/delete ") + helpers.arg("alt") + "</b> to remove <b>alt</b> from the database. <b>alt</b> must have the same IP.<br>"
            + "Use <b>" + helpers.user("/title ") + helpers.arg("alt") + helpers.arg2("*text") + "</b>: to change <b>alt</b>'s auth title to <b>text</b>. If <b>alt</b> is not specified, changes your current alt's title. <b>alt</b> must have the same IP.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        alts: function (src, channel, command) {
            var title = "", isIp = false, name, auth, registered, lastlogin, player, ip, alts;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.", channel);
                return;
            }
            player = command[1].toLowerCase();
            if (helpers.isIp(player)) {
                ip = player;
                isIp = true;
            } else {
                ip = sys.dbIp(player);
            }
            if (!isIp && !sys.dbExists(player)) {
                helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't display " + player + "'s alts because they don't exist in the database!");
                return;
            }
            alts = sys.aliases(ip);
            if (!isIp && members[player]) {
                player = members[player];
            }
            var altsmessage = border + "<h2>" + (isIp ? "Alts for IP " + ip : player + "'s alts") + "</h2><br><style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}"
            + "thead {font-weight:bold;}</style>"
            + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
            + "<td>Icon</td><td>Auth</td><td>Title</td><td>Name</td><td>Registered</td><td>Last Online</td></tr></thead><tbody>";
            for (var index in alts) {
                name = alts[index];
                auth = sys.dbAuth(name);
                title = (authtitles[name] ? authtitles[name] : '-');
                registered =  (sys.dbRegistered(name) ? "<b style='color:green'>Yes</b>" : "<font color='red'>No</font>");
                lastlogin = helpers.formatLastOn(src, sys.dbLastOn(name));
                if (members[name]) {
                    name = members[name];
                }
                altsmessage += "<tr><td>" + helpers.authimage(src, auth > 3 ? 0 : auth) + "</td><td>" + helpers.authname(auth, true) + "</td><td>" + title +
                "</td><td>" + name + "</td><td>" + registered + "</td><td>" + lastlogin + "</td></tr>";
            }
            altsmessage += "</tbody></table><br><br><b>Total Alts:</b> " + alts.length + "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, altsmessage, channel);
        }
        
        ,
    
        passauth: function (src, channel, command) {
            var name = helpers.escapehtml(sys.name(src)), lower = sys.name(src).toLowerCase(), auth = sys.auth(src), ip = sys.ip(src), player, id;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.", channel);
                return;
            }
            player = command[1].toLowerCase();
            if (ip != sys.dbIp(player)) {
                helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not pass your auth to " + player + " because they must have the same IP.");
                return;
            }
            if (!sys.dbRegistered(player)) {
                helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not pass your auth to an unregistered alt!", channel);
                return;
            }
            id = sys.id(player);
            sys.changeAuth(src, 0);
            id ? sys.changeAuth(id, auth) : sys.changeDbAuth(player, auth);
            for (var index in regchannels) {
                if (auth == 1) {
                    if (helpers.isInArray(lower, regchannels[index].mods)) {
                        regchannels[index].mods.splice(regchannels[index].mods.indexOf(lower), 1);
                        regchannels[index].mods.push(player);
                        sys.write("data/regchannels.txt", JSON.stringify(regchannels));
                    }
                } else if (auth == 2) {
                    if (helpers.isInArray(lower, regchannels[index].admins)) {
                        regchannels[index].admins.splice(regchannels[index].admins.indexOf(lower), 1);
                        regchannels[index].admins.push(player);
                        sys.write("data/regchannels.txt", JSON.stringify(regchannels));
                    }
                } else {
                    if (helpers.isInArray(lower, regchannels[index].owners)) {
                        regchannels[index].owners.splice(regchannels[index].owners.indexOf(lower), 1);
                        regchannels[index].owners.push(player);
                        sys.write("data/regchannels.txt", JSON.stringify(regchannels));
                    }
                }
            }
            if (members[player])player = members[player];
            sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.user(name) + " passed their auth to " + helpers.arg(helpers.escapehtml(player)) + "!</b>", channel);
        }
        
        ,
        
        'delete': function (src, channel, command) {
            var name = helpers.escapehtml(sys.name(src)), auth = sys.auth(src), ip = sys.ip(src), player, id;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.", channel);
                return;
            } else {
                player = command[1].toLowerCase();
            }
            if (ip != sys.dbIp(player)) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, you may not delete " + player + " because they must have the same IP.");
                return;
            }
            if (members[player]) {
                player = members[player];
            }
            sys.dbDelete(player);
            sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Your alt " + player + " has been deleted from the database.", channel);
        }
        
        ,
        
        title: function (src, channel, command) {
            var name = sys.name(src), auth = sys.auth(src), ip = sys.ip(src), player;
            if (!command[1]) {
                authtitles[sys.name(src).toLowerCase()] = helpers.authname(sys.auth(src));
                sys.sendHtmlAll(helpers.bot(bots.command) + "<b>" + helpers.user(sys.name(src)) + " changed their auth title to " + helpers.arg(helpers.authname(sys.auth(src))) + ".</b>", channel);
                return;
            }
            if (!command[2]) {
                if (command[1].length > 42 && auth < 3) {
                    sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Error 403, invalid title. It can't be over 42 characters long.", channel);
                    return;
                }
                authtitles[players[src].name.toLowerCase()] = command[1];
                sys.write("data/authtitles.txt", JSON.stringify(authtitles));
                sys.sendHtmlAll(helpers.bot(bots.command) + "<b>" + helpers.user(sys.name(src)) + " changed their auth title to " + helpers.arg(command[1]) + ".</b>", channel);
            } else {
                player = command[1].toLowerCase();
                if (!helpers.sameIp(ip, sys.dbIp(player))) {
                    helpers.starfox(src, channel, command, bots.command, "Error 403, you may not change " + player + "'s title because they must have the same IP.");
                    return;
                }
                if (command[2].length > 42 && auth < 3) {
                    sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Error 403, invalid title. It can't be over 42 characters long.", channel);
                    return;
                }
                authtitles[player] = command[2];
                sys.write("data/authtitles.txt", JSON.stringify(authtitles));
                if (members[player])player = members[player];
                sys.sendHtmlAll(helpers.bot(bots.command) + "<b>" + helpers.user(sys.name(src)) + " changed " + helpers.arg(player) + "'s auth title to " + helpers.arg2(command[2]) + ".</b>", channel);
            }
        }
        
        ,
        
        /**
            ----------------
            Bigtext Settings
            ----------------
        **/
        bigtextsettings: function (src, channel, command) {
            var lower = sys.name(src).toLowerCase(), auth = sys.auth(src), bigtextstemp = {}, commandsmessage;
            for (var i in bigtexts) {
                bigtextstemp[i] = bigtexts[i];
            }
            Object.keys(bigtextstemp).sort();
            for (var i in bigtextstemp) {
                bigtextstemp["/" + i] = bigtextstemp[i];
                delete bigtextstemp[i];
            }
            commandsmessage = border + "<h2>Moderator Commands ~ Bigtext Settings</h2><br>"
            + "Current custom bigtexts:<br>"
            + "<br>"
            + Object.keys(bigtextstemp).join(", ") + "<br>"
            + "<br>"
            + "Use <b>" + helpers.user("/addcommand ") + helpers.arg("name") + helpers.arg2("*text") + helpers.arg3("*bot") + helpers.arg4("*color") + helpers.arg5("*size") +
            "</b>: to add a custom bigtext. If <b>bot</b> is 'default', it will become the default fun command bot.<br>"
            + "Use <b>" + helpers.user("/removecommand ") + helpers.arg("name") + "</b>: to remove a custom bigtext.<br>"
            + "<br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        addcommand: function (src, channel, command) {
            var name = sys.name(src), title, text, bot, color, size, lower;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, name not found.");
                return;
            }
            title = helpers.escapehtml(command[1]);
            if (!command[2]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
                return;
            }
            text = helpers.escapehtml(command[2]);
            if (!command[3]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, bot not found.");
                return;
            }
            bot == "default" ? bot = bots.fun : bot = helpers.escapehtml(command[3]);
            if (!command[4]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, color not found.");
                return;
            }
            color = command[4];
            if (!command[5]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, size not found.");
                return;
            }
            size = command[5];
            if (isNaN(size)) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, the size must be a number.");
                return;
            }
            if (size > 32) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, the size may not be larger than 32 px.");
                return;
            }
            lower = title.toLowerCase();
            if (helpers.isInArray(allcommands, lower)) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, the title may not be the same as one of an existing command.");
                return;
            }
            bigtexts[helpers.removespaces(lower)] = ["bigtext", text, title, bot, color, size];
            sys.write("data/bigtexts.txt", JSON.stringify(bigtexts));
            sys.sendHtmlAll(helpers.bot(bots.command) + name + " has added a custom bigtext command called '" + title + "'!", channel);
        }
        
        ,
        
        removecommand: function (src, channel, command) {
            var name = sys.name(src), lower, title;
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, name not found.");
                return;
            }
            lower = command[1].toLowerCase();
            if (!helpers.isInArray(lower), Object.keys(bigtexts)) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, that command doesn't exist.");
                return;
            }
            title = bigtexts[lower][2];
            sys.sendHtmlAll(helpers.bot(bots.command) + name + " has removed the custom bigtext command '" + title + "'!", channel);
            delete bigtexts[lower];
            sys.write("data/bigtexts.txt", JSON.stringify(bigtexts));
        }
        
        ,
        
        /**
            ---------------
            Custom Settings
            ---------------
        **/
        customsettings: function (src, channel, command) {
            var lower = sys.name(src).toLowerCase(), auth = sys.auth(src), commandsmessage = border + "<h2>Moderator Commands ~ Custom Settings</h2><br>"
            + "Your current custom messages:<br>"
            + "<br>"
            + "<b>Self Kick message:</b> " + (!selfkickmessages[lower] ? "none" : selfkickmessages[lower]) + "<br>"
            + "<b>Kick message:</b> " + (!kickmessages[lower] ? "none" : kickmessages[lower]) + "<br>"
            + "<b>Mute message:</b> " + (!mutemessages[lower] ? "none" : mutemessages[lower]) + "<br>";
            if (auth >= 2) {
                commandsmessage += "<b>Ban message:</b> " + (!banmessages[lower] ? "none" : banmessages[lower]) + "<br>";
            }
            if (auth >= 3) {
                commandsmessage += "<b>Range ban message:</b> " + (!rangebanmessages[lower] ? "none" : rangebanmessages[lower]) + "<br>";
            }
            commandsmessage += "<br>"
            + "Syntax for custom messages:<br>"
            + "<br>"
            + "<b>~Self~</b> will be replaced by your username.<br>"
            + "<b>~Target~</b> will be replaced by whoever you justice.<br>"
            + "<b>~Time~</b> will be replaced by the mute time";
            if (auth >= 2) {
                commandsmessage += " or ban time";
            }
            commandsmessage += ".<br>"
            + "<b>~Server~</b> will be replaced by the server name.<br>"
            + "<br>"
            + "Use <b>" + helpers.user("/selfkickmsg ") + helpers.arg("text") + "</b> to change your self kick message to <b>text</b>. If <b>text</b> is not specified, displays your current self kick message.<br>"
            + "Use <b>" + helpers.user("/kickmsg ") + helpers.arg("text") + "</b> to change your kick message to <b>text</b>. If <b>text</b> is not specified, displays your current kick message.<br>"
            + "Use <b>" + helpers.user("/mutemsg ") + helpers.arg("text") + "</b> to change your mute message to <b>text</b>. If <b>text</b> is not specified, displays your current mute message.<br>";
            if (auth >= 2) {
                commandsmessage += "Use <b>" + helpers.user("/banmsg ") + helpers.arg("text") +
                "</b> to change your ban message to <b>text</b>. If <b>text</b> is not specified, displays your current ban message.<br>";
            }
            if (auth >= 3) {
                commandsmessage += "Use <b>" + helpers.user("/rangebanmsg ") + helpers.arg("text") +
                "</b> to change your range ban message to <b>text</b>. If <b>text</b> is not specified, displays your current range ban message.<br>";
            }
            commandsmessage += "Use <b>" + helpers.user("/resetmsg ") + helpers.arg("message") + "</b> to reset <b>message</b> to its default.<br>";
            commandsmessage += "Use <b>" + helpers.user("/resetmsgs") + "</b> to reset your messages to their defaults.<br>"
            + "<br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        selfkickmsg: function (src, channel, command) {
            var message = command[1], lower = sys.name(src).toLowerCase(), msg;
            if (!message) {
                !selfkickmessages[lower] ? msg = " the default one." : msg = ": " + selfkickmessages[lower];
                sys.sendHtmlMessage(src, helpers.bot(bots.kick) + "Your current self kick message is" + msg, channel);
                return;
            }
            selfkickmessages[lower] = message;
            sys.write("data/selfkickmsg.txt", JSON.stringify(selfkickmessages));
            sys.sendHtmlMessage(src, helpers.bot(bots.kick) + "Your self kick message has been changed successfully.", channel);
        }
        
        ,
        
        kickmsg: function (src, channel, command) {
            var message = command[1], lower = sys.name(src).toLowerCase(), msg;
            if (!message) {
                !kickmessages[lower] ? msg = " the default one." : msg = ": " + kickmessages[lower];
                sys.sendHtmlMessage(src, helpers.bot(bots.kick) + "Your current kick message is" + msg, channel);
                return;
            }
            kickmessages[lower] = message;
            sys.write("data/kickmsg.txt", JSON.stringify(kickmessages));
            sys.sendHtmlMessage(src, helpers.bot(bots.kick) + "Your kick message has been changed successfully.", channel);
        }
        
        ,
        
        mutemsg: function (src, channel, command) {
            var message = command[1], lower = sys.name(src).toLowerCase(), msg;
            if (!message) {
                !mutemessages[lower] ? msg = " the default one." : msg = ": " + mutemessages[lower];
                sys.sendHtmlMessage(src, helpers.bot(bots.mute) + "Your current mute message is" + msg, channel);
                return;
            }
            mutemessages[lower] = message;
            sys.write("data/mutemsg.txt", JSON.stringify(mutemessages));
            sys.sendHtmlMessage(src, helpers.bot(bots.mute) + "Your mute message has been changed successfully.", channel);
        }
        
        ,
        
        resetmsg: function (src, channel, command) {
            var message = command[1], lower = sys.name(src).toLowerCase();
            if (!message) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, message not found.");
                return;
            }
            if (message == "selfkick") {
                delete selfkickmessages[lower];
                sys.write("data/selfkickmsg.txt", JSON.stringify(kickmessages));
            } else if (message == "kick") {
                delete kickmessages[lower];
                sys.write("data/kickmsg.txt", JSON.stringify(kickmessages));
            } else if (message == "mute") {
                delete mutemessages[lower];
                sys.write("data/mutemsg.txt", JSON.stringify(mutemessages));
            } else if (message == "ban") {
                delete banmessages[lower];
                sys.write("data/banmsg.txt", JSON.stringify(banmessages));
            } else if (message == "rangeban") {
                delete rangebanmessages[lower];
                sys.write("data/rangebanmsg.txt", JSON.stringify(rangebanmessages));
            } else {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid message.");
                return;
            }
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your " + message + " message has been reset.", channel);
        }
        
        ,
        
        resetmsgs: function (src, channel, command) {
            var lower = sys.name(src).toLowerCase();
            delete selfkickmessages[lower];
            delete kickmessages[lower];
            delete mutemessages[lower];
            delete banmessages[lower];
            delete rangebanmessages[lower];
            sys.write("data/selfkickmsg.txt", JSON.stringify(kickmessages));
            sys.write("data/kickmsg.txt", JSON.stringify(kickmessages));
            sys.write("data/mutemsg.txt", JSON.stringify(mutemessages));
            sys.write("data/banmsg.txt", JSON.stringify(banmessages));
            sys.write("data/rangebanmsg.txt", JSON.stringify(rangebanmessages));
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your messages have been reset.", channel);
        }
    };
