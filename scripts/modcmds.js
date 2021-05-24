/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY MOD COMMANDS modcmds.js
     - by Maribel Hearn, 2012-2020

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
        + "<b>" + helpers.userl("/altsettings") + "</b>: displays alt settings.<br>";
        if (pluginLoaded["funcmds.js"]) {
            commandsmessage += "<b>" + helpers.userl("/bigtextsettings") + "</b>: displays custom bigtext settings.<br>";
        }
        commandsmessage += "<b>" + helpers.userl("/customsettings") + "</b>: displays justice message customisation settings.<br>"
        + "<b>" + helpers.userl("/filtersettings") + "</b>: displays name filtering settings.<br>"
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
        + "<br>";
        for (var i = 1; i <= rules.rules.length; i++) {
            rulesmessage += helpers.bot("• " + botsymbol + "Rule " + i + ": " + rules.rules[i - 1]) + "<br>" + rules.explanations[i - 1] + "<br>";
        }
        rulesmessage += "<br><timestamp/><br>" + border2;
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
        var name = sys.name(src), auth = sys.auth(src), number;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.");
            return;
        }
        number = command[2];
        if (!number || number > rules.rules.length || number < 1 || isNaN(number)) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, rule not found.");
            return;
        }
        number = parseInt(number);
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
        sys.sendHtmlMessage(trgt, border + "<h2>Rules ~ Rule " + number + "</h2><br>" + helpers.bot("• " + botsymbol + "Rule " + number + ": " + rules.rules[number - 1]) +
        "<br>" + rules.explanations[number - 1] + "<br><br><timestamp/><br>" + border2, channel);
        sys.sendHtmlMessage(trgt, helpers.bot(bots.command) + "Rule " + number + " was forced on you by " + name + "!", channel);
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "You forced Rule " + number + " on " + command[1] + "!", channel);
    }

    ,

    frule: function (src, channel, command) {
        this.forcerule(src, channel, command);
    }

    ,

    warn: function (src, channel, command) {
        var name = sys.name(src), trgtname = command[1], reason = command[2];
        !reason ? reason = "Unknown" : reason = helpers.escapehtml(reason);
        sys.sendHtmlAll(helpers.bot(bots.warn) + "CAUTION! " + name + " warned " + trgtname + "! [Reason: " + reason + "]", channel);
    }

    ,

    kick: function (src, channel, command) {
        var reason = command[2], name = sys.name(src), lower = name.toLowerCase(), trgtname = command[1], trgt = sys.id(trgtname), auth = sys.auth(src), msg;
        if (!trgtname) {
            helpers.starfox(src, channel, command, bots.kick, "Error 404, player not found.");
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
            sys.sendHtmlAll(helpers.bot(bots.kick) + msg + " [Reason: " + reason + "]");
        } else {
            sys.sendHtmlAll(helpers.bot(bots.kick) + sys.name(trgt) + " has been kicked from the server by " + name + "! [Reason: " + reason + "]");
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
            srcip = sys.ip(src), trgtauth, trgtip, lower, msg;
        if (!trgtname) {
            helpers.starfox(src, channel, command, bots.mute, "Error 404, player not found.");
            return;
        }
        if (sys.dbIp(command[1]) === undefined) {
            helpers.starfox(src, channel, command, bots.mute, "Error 400, you can't mute " + trgtname + " because they do not exist in the database.");
            return;
        }
        if (!trgt) {
            trgtauth = sys.dbAuth(command[1]);
            trgtip = sys.dbIp(command[1]);
        } else {
            trgtauth = sys.auth(trgt);
            trgtip = sys.ip(trgt);
        }
        lower = command[1].toLowerCase();
        if (trgtauth >= auth && lower != name.toLowerCase() && lower != players[src].name.toLowerCase()) {
            helpers.starfox(src, channel, command, bots.mute, "Error 403, you can't mute " + trgtname + " because their auth level is higher or equal to yours.");
            return;
        }
        if (helpers.muteCheck(trgtname)) {
            helpers.starfox(src, channel, command, bots.mute, "Error 400, you can't mute " + trgtname + " because they are already muted!");
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
            mutelist[lower].time = "-";
            mutelist[lower].starttime = "-";
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
        mutelist[lower].silent = (!command[4] ? false : true);
        var date = helpers.date(new Date());
        mutelist[lower].date = date;
        helpers.saveData("mutelist");
        if (members[lower]) {
            trgtname = members[lower];
        }
        if (mutemessages[name.toLowerCase()]) {
            if (time == "forever") {
                msg = mutemessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Time~/g, "Forever").replace(/~time~/g, "forever").replace(/~Server~/gi, sys.getServerName());
            } else {
                msg = mutemessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Time~/gi, time + " " + unit).replace(/~Server~/gi, sys.getServerName());
            }
            sys.sendHtmlAll(helpers.bot(bots.mute) + msg + " [Reason: " + reason + "]");
        } else {
            sys.sendHtmlAll(helpers.bot(bots.mute) + name + " has muted " + trgtname + (time == "forever" ? "" : " for " + time + " ") + unit + "! [Reason: " + reason + "]");
        }
    }

    ,

    m: function (src, channel, command) {
        this.mute(src, channel, command);
    }

    ,

    unmute: function (src, channel, command) {
        var name = sys.name(src), srcip = sys.ip(src), trgtname = command[1], lower, trgt, trgtip;
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.mute, "Error 400, you can't unmute " + trgtname + " because they do not exist in the database!");
            return;
        }
        lower = trgtname.toLowerCase();
        trgtname = (members[lower] ? members[lower] : lower);
        if (!mutelist[lower]) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't unban " + trgtname + " because they aren't banned!");
            return;
        }
        trgt = sys.id(lower);
        !trgt ? trgtip = sys.dbIp(lower) : trgtip = sys.ip(trgt);
        for (var index in mutelist) {
            if (!sys.dbIp(index)) {
                sys.sendHtmlAuths(helpers.bot(bots.mute) + player + " has been automatically unmuted because they no longer exist in the database.");
                delete mutelist[index];
                continue;
            }
            if (sys.dbIp(index) == trgtip) {
                delete mutelist[index];
                helpers.saveData("mutelist");
                sys.sendHtmlAll(helpers.bot(bots.mute) + trgtname + " has been unmuted by " + name + "!");
                return;
            }
        }
        helpers.starfox(src, channel, command, bots.mute, "Error 400, you can't unmute " + trgtname + " because they aren't muted!");
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
        helpers.saveData("mutelist");
        if (members[lower])lower = members[lower];
        sys.sendHtmlAll(helpers.bot(bots.mute) + name + " has changed the mute reason of " + lower + " to '" + reason + "'!", channel);
    }

    ,

    mutelist: function (src, channel, command) {
        var names = [], ips = [], muters = [], reasons = [], times = [], timesLeft = [], dates = [], silences = [], mutelistmessage;
        if (mutelist.isEmpty()) {
            sys.sendHtmlMessage(src, helpers.bot(bots.mute) + "The mute list is currently empty.", channel);
            return;
        }
        for (var i in mutelist) {
            names.push(members[i] ? members[i] : i);
            ips.push(mutelist[i].ip);
            muters.push(mutelist[i].mutedby);
            reasons.push(mutelist[i].reason);
            times.push(helpers.formatJusticeTime(mutelist[i].starttime));
            timesLeft.push(helpers.formatJusticeTime(mutelist[i].time));
            dates.push(mutelist[i].date);
            silences.push(mutelist[i].silent)
        }
        mutelistmessage = border + "<h2>Mute List</h2><br>";
        if (helpers.isAndroid(src)) {
            mutelistmessage += "<tt>";
            for (var i in names) {
                mutelistmessage += names[i] + " | " + ips[i] + " | </tt>" + dates[i] + "<tt><br>";
            }
            mutelistmessage += "</tt>";
        } else {
            mutelistmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: " + listcolors.mute + ";'>"
            + "<th>Name</th><th>IP Address</th><th>Muter</th><th>Reason</th><th>Muted for</th><th>Time left</th><th>Date of muting</th><th>Silent</th></tr></thead><tbody>";
            for (var i in names) {
                mutelistmessage += "<tr style='background-color: " + Qt.lighter(listcolors.mute, 1.55) + ";'>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + ips[i] + "</td>"
                + "<td>" + muters[i] + "</td>"
                + "<td>" + reasons[i] + "</td>"
                + "<td>" + times[i] + "</td>"
                + "<td>" + timesLeft[i] + "</td>"
                + "<td>" + dates[i] + "</td>"
                + "<td>" + (silences[i] ? "Yes" : "No") + "</td>"
                + "</tr>";
            }
            mutelistmessage += "</tbody></table>"
        }
        mutelistmessage += "<br><br><b>Total Muted Players:</b> " + Object.keys(mutelist).length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, mutelistmessage, channel);
    }

    ,

    clearmutelist: function (src, channel, command) {
        mutelist = {};
        helpers.saveData("mutelist");
        sys.sendHtmlAll(helpers.bot(bots.mute) + "The mute list has been cleared by " + sys.name(src) + "!", channel);
    }

    ,

    banlist: function (src, channel, command) {
        var names = [], ips = [], banners = [], reasons = [], times = [], timesLeft = [], dates = [], banlistmessage;
        if (banlist.isEmpty()) {
            sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "The ban list is currently empty.", channel);
            return;
        }
        for (var i in banlist) {
            names.push(members[i] ? members[i] : i);
            ips.push(banlist[i].ip);
            banners.push(banlist[i].bannedby);
            reasons.push(banlist[i].reason);
            times.push(helpers.formatJusticeTime(banlist[i].starttime));
            timesLeft.push(helpers.formatJusticeTime(banlist[i].time));
            dates.push(banlist[i].date);
        }
        banlistmessage = border + "<h2>Ban List</h2><br>";
        if (helpers.isAndroid(src)) {
            banlistmessage += "<tt>";
            for (var i in names) {
                banlistmessage += names[i] + " | " + ips[i] + " | </tt>" + dates[i] + "<tt><br>";
            }
            banlistmessage += "</tt>";
        } else {
            banlistmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: " + listcolors.ban + ";'>"
            + "<th>Name</th><th>IP Address</th><th>Banner</th><th>Reason</th><th>Banned for</th><th>Time left</th><th>Date of banning</th></tr></thead><tbody>";
            for (var i in names) {
                banlistmessage += "<tr style='background-color: " + Qt.lighter(listcolors.ban, 1.55) + ";'>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + ips[i] + "</td>"
                + "<td>" + banners[i] + "</td>"
                + "<td>" + reasons[i] + "</td>"
                + "<td>" + times[i] + "</td>"
                + "<td>" + timesLeft[i] + "</td>"
                + "<td>" + dates[i] + "</td>"
                + "</tr>";
            }
            banlistmessage += "</tbody></table>"
        }
        banlistmessage += "<br><br><b>Total Banned Players:</b> " + Object.keys(banlist).length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, banlistmessage, channel);
    }

    ,

    rangebanlist: function (src, channel, command) {
        var names = [], ranges = [], banners = [], reasons = [], dates = [], rangebanlistmessage;
        if (rangebanlist.isEmpty()) {
            sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "The range ban list is currently empty.", channel);
            return;
        }
        for (var i in rangebanlist) {
            names.push(members[i] ? members[i] : i);
            ranges.push(rangebanlist[i].range);
            banners.push(rangebanlist[i].banner);
            reasons.push(rangebanlist[i].reason);
            dates.push(rangebanlist[i].date);
        }
        rangebanlistmessage = border + "<h2>Range Ban List</h2><br>";
        if (helpers.isAndroid(src)) {
            rangebanlistmessage += "<tt>";
            for (var i in names) {
                rangebanlistmessage += names[i] + " | " + ranges[i] + " | </tt>" + dates[i] + "<tt><br>";
            }
            rangebanlistmessage += "</tt>";
        } else {
            rangebanlistmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: " + listcolors.rangeban + ";'>"
            + "<th>Name</th><th>IP Range</th><th>Banner</th><th>Reason</th><th>Date of banning</th></tr></thead><tbody>";
            for (var i in names) {
                rangebanlistmessage += "<tr style='background-color: " + Qt.lighter(listcolors.rangeban, 1.55) + ";'>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + ranges[i] + "</td>"
                + "<td>" + banners[i] + "</td>"
                + "<td>" + reasons[i] + "</td>"
                + "<td>" + dates[i] + "</td>"
                + "</tr>";
            }
            rangebanlistmessage += "</tbody></table>"
        }
        rangebanlistmessage += "<br><br><b>Total Range Banned Players:</b> " + Object.keys(rangebanlist).length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, rangebanlistmessage, channel);
    }

    ,

    megabanlist: function (src, channel, command) {
        var names = [], banners = [], reasons = [], dates = [], megabanlistmessage;
        if (megabanlist.isEmpty()) {
            sys.sendHtmlMessage(src, helpers.bot(bots.megaban) + "The mega ban list is currently empty.", channel);
            return;
        }
        for (var i in megabanlist) {
            names.push(members[i] ? members[i] : i);
            banners.push(megabanlist[i].banner);
            reasons.push(megabanlist[i].reason);
            dates.push(megabanlist[i].date);
        }
        megabanlistmessage = border + "<h2>Mega Ban List</h2><br>";
        if (helpers.isAndroid(src)) {
            megabanlistmessage += "<tt>";
            for (var i in names) {
                megabanlistmessage += names[i] + " | </tt>" + dates[i] + "<tt><br>";
            }
            megabanlistmessage += "</tt>";
        } else {
            megabanlistmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: " + listcolors.megaban + ";'>"
            + "<th>Name</th><th>Banner</th><th>Reason</th><th>Date of banning</th></tr></thead><tbody>";
            for (var i in names) {
                megabanlistmessage += "<tr style='background-color: " + Qt.lighter(listcolors.megaban, 1.55) + ";'>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + banners[i] + "</td>"
                + "<td>" + reasons[i] + "</td>"
                + "<td>" + dates[i] + "</td>"
                + "</tr>";
            }
            megabanlistmessage += "</tbody></table>"
        }
        megabanlistmessage += "<br><br><b>Total Mega Banned Players:</b> " + Object.keys(megabanlist).length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, megabanlistmessage, channel);
    }

    ,

    gigabanlist: function (src, channel, command) {
        var names = [], banners = [], reasons = [], pseudos = [], dates = [], gigabanlistmessage;
        if (gigabanlist.isEmpty()) {
            sys.sendHtmlMessage(src, helpers.bot(bots.gigaban) + "The giga ban list is currently empty.", channel);
            return;
        }
        for (var i in gigabanlist) {
            names.push(members[i] ? members[i] : i);
            banners.push(gigabanlist[i].banner);
            reasons.push(gigabanlist[i].reason);
            pseudos.push(gigabanlist[i].pseudo);
            dates.push(gigabanlist[i].date);
        }
        gigabanlistmessage = border + "<h2>Giga Ban List</h2><br>";
        if (helpers.isAndroid(src)) {
            gigabanlistmessage += "<tt>";
            for (var i in names) {
                gigabanlistmessage += names[i] + " | </tt>" + dates[i] + "<tt><br>";
            }
            gigabanlistmessage += "</tt>";
        } else {
            gigabanlistmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: " + listcolors.gigaban + ";'>"
            + "<th>Name</th><th>Banner</th><th>Reason</th><th>Pseudo</th><th>Date of banning</th></tr></thead><tbody>";
            for (var i in names) {
                gigabanlistmessage += "<tr style='background-color: " + Qt.lighter(listcolors.gigaban, 1.55) + ";'>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + banners[i] + "</td>"
                + "<td>" + reasons[i] + "</td>"
                + "<td>" + pseudos[i] + "</td>"
                + "<td>" + dates[i] + "</td>"
                + "</tr>";
            }
            gigabanlistmessage += "</tbody></table>"
        }
        gigabanlistmessage += "<br><br><b>Total Giga Banned Players:</b> " + Object.keys(gigabanlist).length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, gigabanlistmessage, channel);
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
        + "<b>" + helpers.user("/rangealts ") + helpers.arg("range") + "</b>: displays alts for <b>range</b>.<br>"
        + "<b>" + helpers.user("/lastmessages") + "</b>: Shows everyone's last 10 messages in a neat table. Also /lastposts or /lastmsgs.<br>"
        + "<b>" + helpers.user("/regchannels") + "</b>: lists all registered channels and their info. Also /regchannelinfo.<br>"
        + "<b>" + helpers.user("/commandlist") + "</b>: lists all available commands. Also /allcommands.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    cp: function (src, channel, command) {
        var DISPLAY_USER = true, cpmessage = border + "<h2>Control Panel</h2><br>", trgtname = command[1],
        player, id, exists, name, auth, imageindex, status, registered, location, os, country, city,
        lower, usedips, playerChannels, lastLogin, timezone2, flag, version, totalAlts, index;
        if (!trgtname) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.", channel);
            return;
        }
        id = sys.id(trgtname);
        exists = sys.dbExists(trgtname);
        lower = trgtname.toLowerCase();
        members[lower] ? name = members[lower] : name = lower;
        if (!exists && !id) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you can't cp " + name + " because they do not exist in the database.");
            return;
        }
        if (id && player != players[id].name) {
            name = players[id].name;
        } else if (!id) {
            id = helpers.originalToID(lower);
            if (id) {
                trgtname = sys.name(src);
                lower = trgtname.toLowerCase();
            }
        }
        player = name.toLowerCase();
        if (id) {
            ip = sys.ip(id);
            auth = sys.auth(id);
            range = sys.range(id);
            imageindex = (auth > 3 ? 0 : auth);
            if (sys.battling(id)) {
                imageindex += 8;
            } else if (sys.away(id)) {
                imageindex += 4;
            }
            status = "<font color='green'><b>Online</b></font>";
            playerChannels = sys.channelsOfPlayer(id);
            for (index in playerChannels) {
                playerChannels[index] = "<a href=\"po:join/" + sys.channel(playerChannels[index]) + "\">#" + sys.channel(playerChannels[index]) + "</a>";
            }
            playerChannels = playerChannels.join(", ");
        } else {
            ip = sys.dbIp(player);
            auth = sys.dbAuth(player);
            range = sys.dbRange(player);
            imageindex = (auth > 3 ? 0 : auth) + 4;
            status = "<font color='red'>Offline</font>";
            playerChannels = "None";
        }
        for (index in mutelist) {
            if (index == player) {
                status += " [Muted]";
            }
        }
        for (index in banlist) {
            if (index == player || index == ip) {
                status += " [Banned]";
            }
        }
        for (index in rangebanlist) {
            if (index == player || index == range) {
                status += " [Range Banned]";
            }
        }
        for (index in megabanlist) {
            if (index == player) {
                status += " [Mega Banned]";
            }
        }
        for (index in gigabanlist) {
            if (index == player) {
                status += " [Giga Banned]";
            }
        }
        alts = sys.aliases(ip);
        totalAlts = alts.length;
        lastLogin = helpers.formatLastOn(src, sys.dbLastOn(sys.dbExists(player) ? player : name));
        if (operatingsystem[player]) {
            os = (helpers.isAndroid(src) ? helpers.osName(operatingsystem[player]) : helpers.os(operatingsystem[player]));
        } else {
            os = "[no data]";
        }
        versions[player] ? version = ", ver. " + versions[player] : version = "";
        if (API_KEY !== "") {
            if (countryname[player]) {
                country = countryname[player];
                flag = FLAGS[helpers.toFlagKey(countryname[player])];
            } else {
                country = "[no data]";
                flag = "[no data]";
            }
        }
        timezone[player] ? timezone2 = timezone[player] : timezone2 = "[no data]";
        sys.dbRegistered(player) ? registered = "<b><font color='green'>Yes</font></b>" : registered = "<font color='red'>No</font>";
        alts = alts.join(", ");
        if (members[player]) {
            player = members[player];
        }
        !cityname[player.toLowerCase()] ? city = "[no data]" : city = cityname[player.toLowerCase()];
        cpmessage += (!helpers.isAndroid(src) ? helpers.authimage(src, imageindex) +
        " " : "") + player + " " + (id && players[id].name.toLowerCase() != lower ? " (" + lower + ")" : "") + " " + status +
        "<br><b>Auth:</b> " + helpers.authName(auth, DISPLAY_USER);
        if (city == "[no data]") {
            cpmessage += "<br><b>IP:</b> " + ip;
        } else {
            cpmessage += "<br><b>IP:</b> <a href='" + helpers.mapsUrl(city, country) + "'>" + ip + "</a>";
            location = (!helpers.isAndroid(src) ? flag + " " : "") + city + ", " + country;
        }
        cpmessage += "<br><b>Client:</b> " + os + version;
        if (API_KEY !== "") {
            cpmessage += "<br><b>Location:</b> " + location + "<br><b>Time Zone:</b> " + timezone2;
        }
        cpmessage += "<br><b>Registered:</b> " + registered +
        "<br><b>Last Online:</b> " + lastLogin +
        "<br><b>Alts:</b> " + alts +
        "<br><b>Number of Alts:</b> " + totalAlts +
        "<br><b>Channels:</b> " + playerChannels +
        "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, cpmessage, channel);
    }

    ,

    whois: function (src, channel, command) {
        this.cp(src, channel, command);
    }

    ,

    rangealts: function (src, channel, command) {
        var altsmessage = border + "<h2>Alts for range " + command[1] + "</h2><br>", range = command[1], alts = [], db;
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
                alts.push(db[index]);
            }
        }
        if (alts.length === 0) {
            sys.sendHtmlMessage(src, helpers.bot(bots.command) + "That range doesn't have any alts!", channel);
            return;
        }
        altsmessage += alts.join(", ") + "<br><br><b>Total Alts:</b> " + alts.length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, altsmessage, channel);
    }

    ,

    lastmessages: function (src, channel, command) {
        var message = border + "<h2>Last Messages</h2><br>";
        if (helpers.isAndroid(src)) {
            for (var i in players) {
                if (players[i].lastmessages.length === 0) {
                    continue;
                }
                message += "<b><font color='" + players[i].color + "'>" + players[i].name + ":</font></b><br>";
                for (var j in players[i].lastmessages) {
                    message += helpers.timestampify(players[i].lastmessagetimes[j]) + " " + players[i].lastmessages[j] + "<br>";
                }
                message += "<br>";
            }
        } else {
            message += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'><th>Player Name</th><th>Messages</th></tr></thead><tbody>";
            for (var k in players) {
                if (players[k].lastmessages.length === 0) {
                    continue;
                }
                message += "<tr><td><b><font color='" + players[k].color + "'>" + players[k].name + "</font></b></td><td>";
                for (var l in players[k].lastmessages) {
                    message += helpers.timestampify(players[k].lastmessagetimes[l]) + " " + players[k].lastmessages[l] + "<br>";
                }
                message += "</td></tr>";
            }
            message += "</tbody></table>";
        }
        message += "<br><br><timestamp/><br>" + border2;
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

    regchannels: function (src, channel, command) {
        var message = border + "<h2>Registered Channels</h2><br>";
        if (helpers.isAndroid(src)) {
            message += "<tt>";
            for (var i in regchannels) {
                message += "#" + (typeof(sys.channelId(i)) == "number" ? sys.channel(sys.channelId(i)) : i) + " | "
                + (regchannels[i].stay || sys.channelId(i) <= permchannels.length ? "<b><font color='green'>Permanent</font></b>" : "<font color='red'>Not permanent</font>") + "<br>";
            }
            message += "</tt>";
        } else {
            message += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Channel</th><th>Permanent</th><th>Private</th><th>Closure Level</th><th>Owners</th></tr></thead><tbody>";
            for (var j in regchannels) {
                message += "<tr>";
                typeof(sys.channelId(j)) == "number" ? message += "<td style='width: 20px;'>" + helpers.channelLink(sys.channel(sys.channelId(j))) + "</td>" : message += "<td>#" + j + "</td>";
                regchannels[j].stay || sys.channelId(j) <= permchannels.length ? message += "<td><b><font color='green'>Yes</font></b></td>" : message += "<td><font color='red'>No</font></td>";
                regchannels[j].priv ? message += "<td><b><font color='green'>Yes</font></b></td>" : message += "<td><font color='red'>No</font></td>";
                message += "<td>" + regchannels[j].close + "</td><td>" + regchannels[j].owners.join(", ") + "</td></tr>";
            }
            message += "</tbody></table>";
        }
        message += "<br><br><b>Total Registered Channels:</b> " + Object.keys(regchannels).length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, message, channel);
    }

    ,

    regchannelinfo: function (src, channel, command) {
        this.regchannels(src, channel, command);
    }

    ,

    commandlist: function (src, channel, command) {
        var scriptmessage = border + "<h2>List of Commands</h2><br>", length, totallength;
        scriptmessage += "<b>User Commands:</b> " + Object.keys(usercommands).sort().join(", ") + "<br>" +
        "<b>Moderator Commands:</b> " + Object.keys(modcommands).sort().join(", ") + "<br>" +
        "<b>Administrator Commands:</b> " + Object.keys(admincommands).sort().join(", ") + "<br>" +
        "<b>Owner Commands:</b> " + Object.keys(ownercommands).sort().join(", ") + "<br>" +
        "<b>Channel User Commands:</b> " + Object.keys(cusercommands).sort().join(", ") + "<br>" +
        "<b>Channel Moderator Commands:</b> " + Object.keys(cmodcommands).sort().join(", ") + "<br>" +
        "<b>Channel Administrator Commands:</b> " + Object.keys(cadmincommands).sort().join(", ") + "<br>" +
        "<b>Channel Owner Commands:</b> " + Object.keys(cownercommands).sort().join(", ") + "<br>" +
        "<b>Helpers:</b> " + Object.keys(helpers).sort().join(", ") + "<br><br>" +
        "<b>Total User Commands:</b> " + Object.keys(usercommands).length + "<br>" +
        "<b>Total Moderator Commands:</b> " + Object.keys(modcommands).length + "<br>" +
        "<b>Total Administrator Commands:</b> " + Object.keys(admincommands).length + "<br>" +
        "<b>Total Owner Commands:</b> " + Object.keys(ownercommands).length + "<br>" +
        "<b>Total Channel User Commands:</b> " + Object.keys(cusercommands).length + "<br>" +
        "<b>Total Channel Mod Commands:</b> " + Object.keys(cmodcommands).length + "<br>" +
        "<b>Total Channel Admin Commands:</b> " + Object.keys(cadmincommands).length + "<br>" +
        "<b>Total Channel Owner Commands:</b> " + Object.keys(cownercommands).length;
        if (pluginLoaded["funcmds.js"]) {
            scriptmessage += "<br><b>Total Fun Commands:</b> " + Object.keys(funcommands).length;
        }
        if (pluginLoaded["party.js"]) {
            scriptmessage += "<br><b>Total Party Commands:</b> " + Object.keys(partycommands).length;
        }
        if (pluginLoaded["rr.js"]) {
            scriptmessage += "<br><b>Total Russian Roulette Commands:</b> " + Object.keys(rrcommands).length;
        }
        if (pluginLoaded["roulette.js"]) {
            scriptmessage += "<br><b>Total Roulette Commands:</b> " + Object.keys(roulettecommands).length;
        }
        if (pluginLoaded["safari.js"]) {
            scriptmessage += "<br><b>Total Safari Commands:</b> " + Object.keys(safaricommands).length;
        }
        scriptmessage += "<br><b>Total Helpers:</b> " + Object.keys(helpers).length + "<br>" +
        "<b><u>Total Commands:</u></b> " + allcommands.length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, scriptmessage, channel);
    }

    ,

    allcommands: function (src, channel, command) {
        this.commandlist(src, channel, command);
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
        + "<b>" + helpers.user("/resetall") + "</b>: sets all players' usernames and colors back to their original states.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    changename: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src);
        if (regchannels[sys.channel(channel).toLowerCase()].silence > auth) {
            helpers.silenceMessage(src, channel);
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
        var name = sys.name(src), auth = sys.auth(src), playerids = sys.playerIds(), n = 0, option = command[1], text, self;
        if (!option) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, option not found.");
            return;
        }
        option = option.toLowerCase();
        if (option != "front" && option != "behind" && option != "replace") {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid option.");
            return;
        }
        text = command[2];
        if (!text) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
            return;
        }
        text = helpers.escapehtml(text);
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
                sys.changeName(playerids[i], text + " " + (n + 1));
                n++;
            }
        }
        sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(name) + " has " + helpers.arg2(text) + "-ified the server!</b>", channel);
    }

    ,

    resetall: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src);
        for (var index in players) {
            sys.changeName(index, players[index].name);
            sys.changeColor(src, players[src].color);
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
        + "<b>" + helpers.user("/servertopic ") + helpers.arg("text") + "</b>: changes the server topic to <b>text</b>.<br>"
        + "<b>" + helpers.user("/clear") + "</b>: clears the chat. Also /chatclear and /clearchat.<br>"
        + "<b>" + helpers.user("/fullclear") + "</b>: actually clears the entire chat. Takes a long time, so prepare for lag.<br>"
        + "<b>" + helpers.user("/html ") + helpers.arg("message") + "</b>: send the HTML-message <b>message</b>.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    servertopic: function (src, channel, command) {
        var name = sys.name(src);
        if (!command[1]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.topic) + "The current server topic is: " + servertopic, channel);
            return;
        }
        servertopic = command[1];
        helpers.saveData("servertopic");
        sys.sendHtmlAll(helpers.bot(bots.topic) + "<b>" + helpers.user(name) + " changed the server topic to " + helpers.arg(command[1]) + ".</b>");
    }

    ,

    clear: function (src, channel, command) {
        var name = sys.name(src);
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
        var starttime = new Date();
        for (var index = 0; index < 2998; index++) {
            sys.sendHtmlAll("", channel);
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

    html: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src);
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
            sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>" + helpers.escapehtml(sys.name(src)) + ":</b></font> " + command, channel);
        } else {
            sys.sendHtmlAll("<font color='" + color + "'><timestamp/>+<b><i>" + helpers.escapehtml(sys.name(src)) + ":</i></b></font> " + command, channel);
        }
    }

    ,
    /**
        ------------
        Alt Settings
        ------------
    **/
    altsettings: function (src, channel, command) {
        var DISPLAY_USER = true, commandsmessage = border + "<h2>Moderator Commands ~ Alt Settings</h2><br>", alts = sys.aliases(sys.ip(src)), index = 0, lower;
        var auths = [], titles = [], names = [], registered = [], lastLogins = [];
        for (var i in alts) {
            auths.push(sys.dbAuth(alts[i]));
            names.push(alts[i]);
            lower = names[index].toLowerCase();
            titles.push(authtitles[lower] ? authtitles[lower] : '-');
            lastLogins.push(helpers.formatLastOn(src, sys.dbLastOn(alts[i])));
            if (sys.dbRegistered(alts[i])) {
                registered.push(helpers.isAndroid(src) ? "<b><font color='green'>Registered</font></b>" : "<b><font color='green'>Yes</font></b>");
            } else {
                registered.push(helpers.isAndroid(src) ? "<font color='red'>Unregistered</font>" : "<font color='red'>No</font>");
            }
            if (members[lower]) {
                names[index] = members[lower];
            }
            index++;
        }
        if (helpers.isAndroid(src)) {
            commandsmessage += "<tt>";
            for (var i in auths) {
                commandsmessage += titles[i] + " | " + names[i] + " | " + registered[i] + "<br>";
            }
            commandsmessage += "</tt><br><br>";
        } else {
            commandsmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Icon</th><th>Auth</th><th>Title</th><th>Name</th><th>Registered</th><th>Last Online</th></tr></thead><tbody>";
            for (var i in auths) {
                commandsmessage += "<tr>"
                + "<td>" + helpers.authimage(src, auths[i] >= 4 ? 0 : auths[i]) + "</td>"
                + "<td>" + helpers.authName(auths[i], DISPLAY_USER) + "</td>"
                + "<td>" + titles[i] + "</td>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + registered[i] + "</td>"
                + "<td>" + lastLogins[i] + "</td>"
                + "</tr>";
            }
            commandsmessage += "</tbody><tfoot><tr><td colspan='6'><b>Total Alts:</b> " + alts.length + "</td></tr></tfoot></table><br><br>";
        }
        commandsmessage += "Use <b>" + helpers.user("/alts ") + helpers.arg("player/IP") + "</b> to display <b>player</b>'s alts or the alts of <b>IP</b> in a neat table.<br>"
        + "Use <b>" + helpers.user("/passauth ") + helpers.arg("alt") + "</b> to pass your auth to <b>alt</b>. <b>alt</b> must have the same IP and must be registered.<br>"
        + "Use <b>" + helpers.user("/delete ") + helpers.arg("alt") + "</b> to remove <b>alt</b> from the database. <b>alt</b> must have the same IP.<br>"
        + "Use <b>" + helpers.user("/title ") + helpers.arg("alt") + helpers.arg2("*text") + "</b>: to change <b>alt</b>'s auth title to <b>text</b>. "
        + "If <b>alt</b> is not specified, changes your current alt's title. <b>alt</b> must have the same IP.<br>"
        + "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    alts: function (src, channel, command) {
        var isIp = false, player, ip, alts, altsmessage;
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
        altsmessage = border + "<h2>" + (isIp ? "Alts for IP " + ip : player + "'s alts") + "</h2><br>" + alts.join(", ")
        + "<br><br><b>Total Alts:</b> " + alts.length + "<br><br><timestamp/><br>" + border2;
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
            if (helpers.isInArray(lower, regchannels[index].mods)) {
                regchannels[index].mods.splice(regchannels[index].mods.indexOf(lower), 1);
                regchannels[index].mods.push(player);
                helpers.saveData("regchannels");
            } else if (helpers.isInArray(lower, regchannels[index].admins)) {
                regchannels[index].admins.splice(regchannels[index].admins.indexOf(lower), 1);
                regchannels[index].admins.push(player);
                helpers.saveData("regchannels");
            } else if (helpers.isInArray(lower, regchannels[index].owners)) {
                regchannels[index].owners.splice(regchannels[index].owners.indexOf(lower), 1);
                regchannels[index].owners.push(player);
                helpers.saveData("regchannels");
            }
        }
        if (members[player])player = members[player];
        sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.user(name) + " passed their auth to " + helpers.arg(helpers.escapehtml(player)) + "!</b>", channel);
    }

    ,

    "delete": function (src, channel, command) {
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
            authtitles[sys.name(src).toLowerCase()] = helpers.authName(sys.auth(src));
            sys.sendHtmlAll(helpers.bot(bots.command) + "<b>" + helpers.user(sys.name(src)) + " changed their auth title to " + helpers.arg(helpers.authName(sys.auth(src))) + ".</b>", channel);
            return;
        }
        if (!command[2]) {
            if (command[1].length > 42 && auth < 3) {
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Error 403, invalid title. It can't be over 42 characters long.", channel);
                return;
            }
            authtitles[players[src].name.toLowerCase()] = command[1];
            helpers.saveData("authtitles");
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
            helpers.saveData("authtitles");
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
        if (!pluginLoaded["funcmds.js"]) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, this command is only usable with the fun commands plugin.");
            return;
        }
        var lower = sys.name(src).toLowerCase(), auth = sys.auth(src), bigtextstemp = {}, commandsmessage;
        for (var i in bigtexts) {
            bigtextstemp[i] = bigtexts[i];
        }
        Object.keys(bigtextstemp).sort();
        for (var i in bigtextstemp) {
            bigtextstemp["/" + i] = bigtextstemp[i];
            delete bigtextstemp[i];
        }
        commandsmessage = border + "<h2>Moderator Commands ~ Bigtext Settings</h2><br>";
        if (Object.keys(bigtextstemp).length === 0) {
            commandsmessage += "There are no custom bigtext commands at the moment.<br><br>";
        } else {
            commandsmessage += "Current custom bigtext commands:<br><br>" + Object.keys(bigtextstemp).join(", ") + "<br><br>";
        }
        commandsmessage += "Use <b>" + helpers.user("/addcommand ") + helpers.arg("" +
        "name") + helpers.arg2("*text") + helpers.arg3("*bot") + helpers.arg4("*color") + helpers.arg5("*size") +
        "</b>: to add a custom bigtext. If <b>bot</b> is 'default', it will be the fun command bot.<br>"
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
        bot = (command[3] && command[3] != "default" ?  helpers.escapehtml(command[3]) : bots.fun);
        color = (command[4] ? command[4] : "#000000");
        size = (command[5] ? command[5] : 32);
        if (isNaN(size)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, the size must be a number.");
            return;
        }
        if (size > 32) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, the size may not be larger than 32px.");
            return;
        }
        lower = title.toLowerCase();
        if (helpers.isInArray(allcommands, lower)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, the title may not be the same as one of an existing command.");
            return;
        }
        bigtexts[helpers.removespaces(lower)] = ["bigtext", text, title, bot, color, size];
        helpers.saveData("bigtexts");
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
        if (!helpers.isInArray(lower, Object.keys(bigtexts))) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, that command doesn't exist.");
            return;
        }
        title = bigtexts[lower][2];
        sys.sendHtmlAll(helpers.bot(bots.command) + name + " has removed the custom bigtext command '" + title + "'!", channel);
        delete bigtexts[lower];
        helpers.saveData("bigtexts");
    }

    ,

    /**
        ----------------
        Justice Settings
        ----------------
    **/
    customsettings: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase(), auth = sys.auth(src), commandsmessage = border + "<h2>Moderator Commands ~ Custom Settings</h2><br>"
        + "Your current custom justice messages:<br>"
        + "<br>"
        + "<b>Self Kick message:</b> " + (!selfkickmessages[lower] ? "none" : selfkickmessages[lower]) + "<br>"
        + "<b>Kick message:</b> " + (!kickmessages[lower] ? "none" : kickmessages[lower]) + "<br>"
        + "<b>Mute message:</b> " + (!mutemessages[lower] ? "none" : mutemessages[lower]) + "<br>";
        if (auth >= 2) {
            commandsmessage += "<b>Ban message:</b> " + (!banmessages[lower] ? "none" : banmessages[lower]) + "<br>"
            + "<b>Range ban message:</b> " + (!rangebanmessages[lower] ? "none" : rangebanmessages[lower]) + "<br>";
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
            commandsmessage += "Use <b>" + helpers.user("/banmsg ") + helpers.arg("text")
            + "</b> to change your ban message to <b>text</b>. If <b>text</b> is not specified, displays your current ban message.<br>"
            + "Use <b>" + helpers.user("/rangebanmsg ") + helpers.arg("text")
            + "</b> to change your range ban message to <b>text</b>. If <b>text</b> is not specified, displays your current range ban message.<br>";
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
        helpers.saveData("selfkickmessages");
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
        helpers.saveData("kickmessages");
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
        helpers.saveData("mutemessages");
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
            helpers.saveData("selfkickmessages");
        } else if (message == "kick") {
            delete kickmessages[lower];
            helpers.saveData("kickmessages");
        } else if (message == "mute") {
            delete mutemessages[lower];
            helpers.saveData("mutemessages");
        } else if (message == "ban") {
            delete banmessages[lower];
            helpers.saveData("banmessages");
        } else if (message == "rangeban") {
            delete rangebanmessages[lower];
            helpers.saveData("rangebanmessages");
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
        helpers.saveData("selfkickmessages");
        helpers.saveData("kickmessages");
        helpers.saveData("mutemessages");
        helpers.saveData("banmessages");
        helpers.saveData("rangebanmessages");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your messages have been reset.", channel);
    }

    ,

    /**
        ---------------
        Filter Settings
        ---------------
    **/
    filtersettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Moderator Commands ~ Filter Settings</h2>"
        + "<br>"
        + "The following words are currently not allowed to be in a username:<br>"
        + "<br>"
        + nameblocklist.join(", ") + "<br>"
        + "<br>"
        + "The following names are exceptions to this:<br>"
        + "<br>"
        + exceptions.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/filter ") + helpers.arg("text") + "</b> to filter <b>text</b>. Also /block.<br>"
        + "Use <b>" + helpers.user("/unfilter ") + helpers.arg("text") + "</b> to stop filtering <b>text</b>. Also /unblock.<br>"
        + "Use <b>" + helpers.user("/addexception ") + helpers.arg("name") + "</b> to allow <b>name</b> to bypass filtering. Also /exception.<br>"
        + "Use <b>" + helpers.user("/removeexception ") + helpers.arg("name") + "</b> to disallow <b>name</b> to bypass filtering.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    filter: function (src, channel, command) {
        var word;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, word not found.");
            return;
        }
        word = command[1].toLowerCase();
        nameblocklist.push(word);
        helpers.saveData("nameblocklist");
        sys.sendHtmlAuths(helpers.bot(bots.command) + "The word '" + word + "' has been added to the filter list.");
    }

    ,

    block: function (src, channel, command) {
        this.filter(src, channel, command);
    }

    ,

    unfilter: function (src, channel, command) {
        var word;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, word not found.");
            return;
        }
        word = command[1].toLowerCase();
        if (!helpers.isInArray(word, nameblocklist)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, that word isn't blocked.");
            return;
        }
        nameblocklist.splice(nameblocklist.indexOf(word), 1);
        helpers.saveData("nameblocklist");
        sys.sendHtmlAuths(helpers.bot(bots.command) + "The word '" + word + "' has been removed from the filter list.");
    }

    ,

    unblock: function (src, channel, command) {
        this.unfilter(src, channel, command);
    }

    ,

    addexception: function (src, channel, command) {
        var name;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, name not found.");
            return;
        }
        name = command[1].toLowerCase();
        exceptions.push(name);
        helpers.saveData("exceptions");
        sys.sendHtmlAuths(helpers.bot(bots.command) + "The name '" + name + "' will now bypass filtering.");
    }

    ,

    removeexception: function (src, channel, command) {
        var name;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, name not found.");
            return;
        }
        name = command[1].toLowerCase();
        exceptions.splice(exceptions.indexOf(name), 1);
        helpers.saveData("exceptions");
        sys.sendHtmlAuths(helpers.bot(bots.command) + "The name '" + name + "' will no longer bypass filtering.");
    }

    ,

    exception: function (src, channel, command) {
        this.addexception(src, channel, command);
    }
};
