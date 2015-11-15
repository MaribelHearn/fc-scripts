/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY OWNER COMMANDS ownercmds.js
     - by Maribel Hearn, 2012-2015
    
    This file contains commands that can be
    run by owners.
    ----------------------------------------------
*/
ownercommands = {
    ownercommands: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands</h2>"
        + "<br>"
        + "<b>" + helpers.userl("/ownerjusticeoptions") + "</b>: displays owner justice options.<br>"
        + "<b>" + helpers.userl("/scriptoptions") + "</b>: displays script options.<br>"
        + "<b>" + helpers.userl("/banneroptions") + "</b>: displays banner and description options.<br>"
        + "<b>" + helpers.userl("/authsettings") + "</b>: displays auth settings.<br>"
        + "<b>" + helpers.userl("/floodsettings") + "</b>: displays flooding settings.<br>"
        + "<b>" + helpers.userl("/whitelistsettings") + "</b>: displays whitelist settings.<br>"
        + "<b>" + helpers.userl("/antidossettings") + "</b>: displays anti DoS settings.<br>"
        + "<b>" + helpers.userl("/serversettings") + "</b>: displays server settings.<br>"
        + "<b>" + helpers.userl("/silentsettings") + "</b>: displays silent settings.<br>"
        + "<b>" + helpers.userl("/filtersettings") + "</b>: displays name filtering settings.<br>"
        + "<b>" + helpers.userl("/miscellaneous") + "</b>: displays other commands.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    /**
        ---------------------
        Owner Justice Options
        ---------------------
    */
    ownerjusticeoptions: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands ~ Owner Justice Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/silentkick ") + helpers.arg("player") + "</b>: silent kicks <b>player</b> from the server. Also /skick or /sk.<br>"
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
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    silentkick: function (src, channel, command) {
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.kick, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1], lower = command[1].toLowerCase(), trgt = sys.id(command[1]);
        if (!trgt) {
            helpers.starfox(src, channel, command, bots.kick, "Error 400, you can't kick " + trgtname + " since they are not online!");
            return;
        }
        if (sys.auth(trgt) >= 3) {
            helpers.starfox(src, channel, command, bots.kick, "Error 403, you may not kick " + trgtname + " because their auth level is higher or equal to yours!");
            return;
        }
        sys.kick(trgt);
        if (members[lower])trgtname = members[lower];
        sys.sendHtmlMessage(src, helpers.bot(bots.kick) + "You silently kicked " + trgtname + ".", channel);
    }

    ,
    
    skick: function (src, channel, command) {
        this.silentkick(src, channel, command);
    }
    
    ,
    
    sk: function (src, channel, command) {
        this.silentkick(src, channel, command);
    }
    
    ,
    
    megaban: function (src, channel, command) {
        var trgt, trgtname, lower, reason;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.megaban, "Error 404, player not found.");
            return;
        }
        trgt = sys.id(command[1]);
        if (!trgt) {
            helpers.starfox(src, channel, command, bots.megaban, "Error 400, you can't mega ban " + command[1] + " since they are not online!");
            return;
        }
        if (sys.os(trgt) !== "android" && sys.version(trgt) < 2402 || sys.os(trgt) === "android" && sys.version(trgt) < 37) {
            helpers.starfox(src, channel, command, bots.megaban, "Error 400, mega bans don't work on this player.");
            return;
        }
        lower = command[1].toLowerCase();
        members[lower] ? trgtname = members[lower] : trgtname = command[1];
        command[2] ? reason = helpers.escapehtml(command[2]) : reason = "Unknown";
        megabanlist[lower] = {};
        megabanlist[lower].banner = sys.name(src);
        megabanlist[lower].reason = reason;
        megabanlist[lower].date = helpers.date(new Date());
        sys.setCookie(trgt, "banned " + trgtname);
        sys.write("data/megabanlist.txt", JSON.stringify(megabanlist));
        sys.sendHtmlMessage(src, helpers.bot(bots.megaban) + "You mega banned " + trgtname + " from the server. [Reason: " + reason + "]", channel);
        sys.kick(trgt);
    }
    
    ,
    
    mb: function (src, channel, command) {
        this.megaban(src, channel, command);
    }
    
    ,
    
    megaunban: function (src, channel, command) {
        var trgtname, lower;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.megaban, "Error 404, player not found.");
            return;
        }
        lower = command[1].toLowerCase();
        members[lower] ? trgtname = members[lower] : trgtname = command[1];
        namestounban.push(lower);
        delete megabanlist[lower];
        sys.write("data/namestounban.txt", JSON.stringify(namestounban));
        sys.write("data/megabanlist.txt", JSON.stringify(megabanlist));
        sys.sendHtmlMessage(src, helpers.bot(bots.megaban) + "You mega unbanned " + trgtname + " from the server. It will take effect once they enter the server again.", channel);
    }

    ,
    
    megabanreason: function (src, channel, command) {
        var lower, reason;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.megaban, "Error 404, player not found.");
            return;
        }
        members[command[1]] ? trgtname = members[command[1]] : trgtname = command[1];
        lower = trgtname.toLowerCase();
        command[2] ? reason = command[2] : reason = "Unknown";
        megabanlist[lower].reason = reason;
        sys.write("data/megabanlist.txt", JSON.stringify(megabanlist));
        sys.sendHtmlMessage(src, helpers.bot(bots.megaban) + "You changed the mega ban reason of " + trgtname + " to '" + reason + "'.", channel);
    }
    
    ,
    
    clearmegabanlist: function (src, channel, command) {
        for (var i in megabanlist) {
            namestounban.push(i);
        }
        megabanlist = {};
        sys.write("data/megabanlist.txt", "{}");
        sys.write("data/namestounban.txt", JSON.stringify(namestounban));
        sys.sendHtmlMessage(src, helpers.bot(bots.megaban) + "You cleared the mega ban list.", channel);
    }
    
    ,
    
    gigaban: function (src, channel, command) {
        var trgtname = command[1], trgt, lower, reason, id, pseudo;
        if (!trgtname) {
            helpers.starfox(src, channel, command, bots.gigaban, "Error 404, player not found.");
            return;
        }
        trgt = sys.id(trgtname);
        if (!trgt) {
            helpers.starfox(src, channel, command, bots.gigaban, "Error 400, you can't mega ban " + trgtname + " since they are not online!");
            return;
        }
        if (!sys.uniqueId(trgt)) {
            helpers.starfox(src, channel, command, bots.gigaban, "Error 404, that player doesn't have a unique ID (update needed).", channel);
            return;
        }
        id = sys.uniqueId(trgt).id;
        pseudo = !sys.uniqueId(trgt).isUnique;
        lower = command[1].toLowerCase();
        members[lower] ? trgtname = members[lower] : trgtname = command[1];
        command[2] ? reason = helpers.escapehtml(command[2]) : reason = "Unknown";
        gigabanlist[lower] = {};
        gigabanlist[lower].id = id;
        gigabanlist[lower].banner = sys.name(src);
        gigabanlist[lower].reason = reason;
        gigabanlist[lower].pseudo = pseudo;
        gigabanlist[lower].date = helpers.date(new Date());
        sys.write("data/gigabanlist.txt", JSON.stringify(gigabanlist));
        sys.sendHtmlMessage(src, helpers.bot(bots.gigaban) + "You giga banned " + trgtname + " from the server. [Reason: " + reason + "]", channel);
        sys.kick(trgt);
    }
    
    ,
    
    gb: function (src, channel, command) {
        this.gigaban(src, channel, command);
    }
    
    ,
    
    gigaunban: function (src, channel, command) {
        var trgtname = command[1], lower;
        if (!trgtname) {
            helpers.starfox(src, channel, command, bots.gigaban, "Error 404, player not found.");
            return;
        }
        lower = trgtname.toLowerCase();
        if (members[lower]) {
            trgtname = members[lower];
        }
        if (!gigabanlist[lower]) {
            helpers.starfox(src, channel, command, bots.gigaban, "Error 400, you can't giga unban " + trgtname + " because they aren't giga banned!");
            return;
        }
        delete gigabanlist[lower];
        sys.write("data/gigabanlist.txt", JSON.stringify(gigabanlist));
        sys.sendHtmlMessage(src, helpers.bot(bots.gigaban) + "You giga unbanned " + trgtname + " from the server.", channel);
    }
    
    ,
    
    gigabanreason: function (src, channel, command) {
        var trgtname = command[1], lower, reason;
        if (!trgtname) {
            helpers.starfox(src, channel, command, bots.gigaban, "Error 404, player not found.");
            return;
        }
        lower = trgtname.toLowerCase();
        if (members[lower]) {
            trgtname = members[lower];
        }
        if (!gigabanlist[lower]) {
            helpers.starfox(src, channel, command, bots.gigaban, "Error 400, you can't change the giga ban reason " + trgtname + " because they aren't giga banned!");
            return;
        }
        lower = trgtname.toLowerCase();
        command[2] ? reason = command[2] : reason = "Unknown";
        gigabanlist[lower].reason = reason;
        sys.write("data/gigabanlist.txt", JSON.stringify(gigabanlist));
        sys.sendHtmlMessage(src, helpers.bot(bots.gigaban) + "You changed the giga ban reason of " + trgtname + " to '" + reason + "'.", channel);
    }
    
    ,
    
    cleargigabanlist: function (src, channel, command) {
        gigabanlist = {};
        sys.write("data/gigabanlist.txt", "{}");
        sys.sendHtmlMessage(src, helpers.bot(bots.gigaban) + "You cleared the giga ban list.", channel);
    }
    
    ,
    
    rangeban: function (src, channel, command) {
        var reason = command[2], name = sys.name(src), trgtname = command[1], lower = trgtname.toLowerCase(), auth = sys.auth(src), ip, msg;
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
        sys.write("data/rangebanlist.txt", JSON.stringify(rangebanlist));
        if (members[lower])trgtname = members[lower];
        if (rangebanmessages[name.toLowerCase()]) {
            msg = rangebanmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Server~/gi, sys.getServerName());
            sys.sendHtmlMain(helpers.bot(bots.ban) + msg + " [Reason: " + reason + "]");
        } else {
            sys.sendHtmlMain(helpers.bot(bots.ban) + name + " has range banned " + trgtname + " from the server! [Reason: " + reason + "]");
        }
        if (trgt) {
            sys.kick(trgt);
        }
        for (var index in mutelist) {
            if (!sys.dbIp(index)) {
                delete mutedips[mutelist[index].ip];
                delete mutelist[index];
                continue;
            }
            if (sys.dbRange(index) == rangebanlist[lower].range) {
                delete mutedips[mutelist[index].ip];
                delete mutelist[index];
                if (members[index])index = members[index];
                sys.write("data/mutelist.txt", JSON.stringify(mutelist));
                sys.sendHtmlMessage(src, helpers.bot(bots.mute) + index + " has been automatically unmuted.", channel);
            }
        }
        for (var index in banlist) {
            if (!sys.dbIp(index)) {
                ip = banlist[index].ip;
                banlist[ip] = banlist[index];
                delete banlist[index];
                continue;
            }
            if (sys.dbRange(index) == rangebanlist[lower].range) {
                delete banlist[index];
                if (members[index])index = members[index];
                sys.write("data/banlist.txt", JSON.stringify(banlist));
                sys.sendHtmlMessage(src, helpers.bot(bots.ban) + index + " has been automatically unbanned.", channel);
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
        var name = sys.name(src), trgtname = command[1], lower = command[1].toLowerCase();
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
                sys.write("data/rangebanlist.txt", JSON.stringify(rangebanlist));
            }
        }
        if (members[trgtname]) {
            trgtname = members[trgtname];
        }
        sys.sendHtmlMain(helpers.bot(bots.ban) + trgtname + " has been range unbanned by " + name + "!");
    }
    
    ,
    
    iprangeban: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), range = command[1], reason = command[2], db = sys.dbAll(), aliases = [], altsnum = 0, ip;
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
        for (var index in db) {
            if (sys.dbRange(db[index]) == range) {
                aliases[altsnum] = db[index];
                altsnum++;
            }
        }
        for (var index in aliases) {
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
        sys.write("data/rangebanlist.txt", JSON.stringify(rangebanlist));
        if (rangebanmessages[name.toLowerCase()]) {
            msg = rangebanmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, range).replace(/~Server~/gi, sys.getServerName());
            sys.sendHtmlMain(helpers.bot(bots.ban) + msg + " [Reason: " + reason + "]");
        } else {
            sys.sendHtmlMain(helpers.bot(bots.ban) + name + " has range banned " + range + " from the server! [Reason: " + reason + "]");
        }
        for (var index in mutelist) {
            if (!sys.dbIp(index)) {
                delete mutedips[mutelist[index].ip];
                delete mutelist[index];
                continue;
            }
            if (sys.dbRange(index) == range) {
                delete mutedips[mutelist[index].ip];
                delete mutelist[index];
                if (members[index])index = members[index];
                sys.write("data/mutelist.txt", JSON.stringify(mutelist));
                sys.sendHtmlMessage(src, helpers.bot(bots.mute) + index + " has been automatically unmuted.", channel);
                continue;
            }
        }
        for (var index in banlist) {
            if (!sys.dbIp(index)) {
                ip = banlist[index].ip;
                banlist[ip] = banlist[index];
                delete banlist[index];
                continue;
            }
            if (sys.dbRange(index) == range) {
                delete banlist[index];
                if (members[index])index = members[index];
                sys.write("data/banlist.txt", JSON.stringify(banlist));
                sys.sendHtmlMessage(src, helpers.bot(bots.ban) + index + " has been automatically unbanned.", channel);
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
        sys.write("data/rangebanlist.txt", JSON.stringify(rangebanlist));
        sys.sendHtmlMain(helpers.bot(bots.ban) + range + " has been range unbanned by " + name + "!");
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
            reason = command[2];
        }
        var banner = sys.name(src), banned = command[1], srcauth = sys.auth(src), lower = command[1].toLowerCase();
        rangebanlist[banned.toLowerCase()].reason = reason;
        sys.write("data/rangebanlist.txt", JSON.stringify(rangebanlist));
        sys.sendHtmlMain(helpers.bot(bots.ban) + banner + " has changed the range ban reason of " + command[1] + " to '" + reason + "'!");
    }
    
    ,
    
    clearrangebanlist: function (src, channel, command) {
        var name = sys.name(src);
        rangebanlist = {};
        sys.write("data/rangebanlist.txt", "{}");
        sys.sendHtmlMain(helpers.bot(bots.ban) + "The range ban list has been cleared by " + name + "!");
    }
    
    ,
    
    rangebanmsg: function (src, channel, command) {
        var message = command[1], lower = sys.name(src).toLowerCase(), msg;
        if (!message) {
            !rangebanmessages[lower] ? msg = " the default one." : msg = ": " + rangebanmessages[lower];
            sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Your current range ban message is" + msg, channel);
            return;
        }
        rangebanmessages[lower] = message;
        sys.write("data/rangebanmsg.txt", JSON.stringify(rangebanmessages));
        sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Your range ban message has been changed successfully.", channel);
    }
    
    ,
    
    /**
        --------------
        Script Options
        --------------
    **/
    scriptoptions: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands ~ Script Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/update ") + helpers.arg("module") + "</b>: updates the <b>module</b> module. Updates the main script file by default.<br>"
        + "<b>" + helpers.user("/silentupdate ") + helpers.arg("module") + "</b>: silently updates the <b>module</b> module. Updates the main script file by default. Also /supdate.<br>"
        + "<b>" + helpers.user("/var ") + helpers.arg("variable") + helpers.arg2("*html") + "</b>: displays the value of <b>variable</b>. If <b>html</b> is specified, enables HTML.<br>"
        + "<b>" + helpers.user("/content ") + helpers.arg("object") + "</b>: displays only the content of <b>object</b>, so no keys. HTML always enabled.<br>"
        + "<b>" + helpers.user("/time ") + helpers.arg("command") + "</b>: runs <b>command</b> and prints its runtime. An indefinite number of arguments can be passed to this command.<br>"
        + "<b>" + helpers.user("/eval ") + helpers.arg("code") + "</b>: executes <b>code</b>.<br>"
        + "<b>" + helpers.user("/silenteval ") + helpers.arg("code") + "</b>: executes <b>code</b> silently. Also /seval.<br>"
        + "<b>" + helpers.user("/secretsilenteval ") + helpers.arg("code") + "</b>: executes <b>code</b> silently without posting it to even yourself. Also /sseval.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    update: function (src, channel, command) {
        var name = sys.name(src), date = new Date(), silent = command[0].substr(0, 6), module, time;
        var noncmds = ["main", "helpers", "handler", "base64", "tierchecks", "rr", "roulette", "party"];
        if (!command[1]) {
            silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Downloading scripts...", channel) : sys.sendHtmlAuths(helpers.bot(bots.script) + "Downloading scripts...");
            sys.webCall(SCRIPT_URL + "main.js", function (resp) {
                if (resp === "") {
                    if (silent == "silent") {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else {
                        sys.sendHtmlAuths(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.");
                    }
                    return;
                }
                sys.write("scripts/main.js", resp);
                try {
                    sys.changeScript(sys.read("scripts.js"));
                    sys.exec("scripts/main.js");
                } catch (e) {
                    silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlAuths(helpers.bot(bots.script) + e);
                    return;
                }
                time = new Date() - date;
                if (silent == "silent") {
                    sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The server scripts have been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                } else {
                    sys.sendHtmlAuths(helpers.bot(bots.script) + name + " has reloaded the server scripts! [Time elapsed: " + (time / 1000) + " seconds.]");
                }
            });
        } else if (command[1] == "user") {
            silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Downloading scripts...", channel) : sys.sendHtmlAuths(helpers.bot(bots.script) + "Downloading scripts...");
            sys.webCall(SCRIPT_URL + "usercmds1.js", function (resp) {
                if (resp === "") {
                    if (silent == "silent") {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else {
                        sys.sendHtmlAuths(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.");
                    }
                    return;
                }
                sys.write("scripts/usercmds1.js", resp);
                try {
                    sys.exec("scripts/usercmds1.js");
                } catch (e) {
                    silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlAuths(helpers.bot(bots.script) + e);
                    return;
                }
            });
            sys.webCall(SCRIPT_URL + "usercmds2.js", function (resp) {
                if (resp === "") {
                    if (silent == "silent") {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else {
                        sys.sendHtmlAuths(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.");
                    }
                    return;
                }
                sys.write("scripts/usercmds2.js", resp);
                try {
                    sys.exec("scripts/usercmds2.js");
                } catch (e) {
                    silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlAuths(helpers.bot(bots.script) + e);
                    return;
                }
                time = new Date() - date;
                if (silent == "silent") {
                    sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The user script module has been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                } else {
                    sys.sendHtmlAuths(helpers.bot(bots.script) + name + " has reloaded the user script module! [Time elapsed: " + (time / 1000) + " seconds.]");
                }
            });
        } else if (command[1] == "all") {
            for (var i = 0; i < SCRIPT_MODULES.length; i++) {
                if (SCRIPT_MODULES[i] == "banner.html" || SCRIPT_MODULES[i] == "description.html") {
                    continue;
                }
                this.update(src, channel, [command[0], SCRIPT_MODULES[i].split('.')[0].replace(/cmds1|cmds2|cmds/, "")]);
            }
        } else {
            module = command[1];
            if (!helpers.isInArray(command[1], noncmds)) {
                module += "cmds";
            }
            if (!helpers.isInArray(module + ".js", SCRIPT_MODULES)) {
                helpers.starfox(src, channel, command, bots.main, "Error 404, module '" + module + "' not found.");
                return;
            }
            silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Downloading scripts...", channel) : sys.sendHtmlAuths(helpers.bot(bots.script) + "Downloading scripts...");
            sys.webCall(SCRIPT_URL + module + ".js", function (resp) {
                if (resp === "") {
                    if (silent == "silent") {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else {
                        sys.sendHtmlAuths(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.");
                    }
                    return;
                }
                sys.write("scripts/" + module + ".js", resp);
                try {
                    sys.exec("scripts/" + module + ".js");
                } catch (e) {
                    silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlAuths(helpers.bot(bots.script) + e);
                    return;
                }
                time = new Date() - date;
                if (module == "main") {
                    if (silent == "silent") {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The server scripts have been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                    } else {
                        sys.sendHtmlAuths(helpers.bot(bots.script) + name + " has reloaded the server scripts! [Time elapsed: " + (time / 1000) + " seconds.]");
                    }
                } else {
                    if (silent == "silent") {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The " + module.replace("cmds", "") + " script module has been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                    } else {
                        sys.sendHtmlAuths(helpers.bot(bots.script) + name + " has reloaded the " + module.replace("cmds", "") + " script module! [Time elapsed: " + (time / 1000) + " seconds.]");
                    }
                }
            });
        }
        for (var i = SCRIPT_MODULES.length; i > 1; i--) {
            if (command[i]) {
                this.update(src, channel, [command[0], command[i]]);
            }
        }
    }
    
    ,
    
    silentupdate: function (src, channel, command) {
        this.update(src, channel, command);
    }
    
    ,
    
    supdate: function (src, channel, command) {
        command[0] = "silentupdate";
        this.update(src, channel, command);
    }
    
    ,
    
    "var": function (src, channel, command) {
        var forbidden = ["=", ";", "+", "-", "*", "/", "add", "del", "sys.system", "remove", "erase", "write", "append", "change", "set"], allow = true, result, html;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.main, "Error 404, variable not found.");
            return;
        }
        html = (!command[2] ? false : true);
        for (var i in forbidden) {
            if (command[1].indexOf(forbidden[i]) != -1) {
                allow = false;
                break;
            }
        }
        if (!allow) {
            helpers.starfox(src, channel, command, bots.main, "Error 403, you are not allowed to use '" + forbidden[i] + "'!");
            return;
        }
        try {
            result = eval(command[1]);
        } catch (e) {
            helpers.starfox(src, channel, command, bots.main, "Error 404, variable is undefined.");
            return;
        }
        if (typeof(result) == "undefined") {
            helpers.starfox(src, channel, command, bots.main, "Error 404, variable is undefined.");
            return;
        }
        if (typeof(result) == "object") {
            result = JSON.stringify(result);
        }
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The evaluated content of '" + command[1] + "' is " + (html ? result : helpers.escapehtml(result)) + ".", channel);
        return;
    }
    
    ,
    
    content: function (src, channel, command) {
        var forbidden = ["=", ";", "+", "-", "*", "/", "add", "del", "sys.system", "remove", "erase", "write", "append", "change", "set"], allow = true, content = [], result;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.main, "Error 404, object not found.");
            return;
        }
        for (var i in forbidden) {
            if (command[1].indexOf(forbidden[i]) != -1) {
                allow = false;
                break;
            }
        }
        if (!allow) {
            helpers.starfox(src, channel, command, bots.main, "Error 403, you are not allowed to use '" + forbidden[i] + "'!");
            return;
        }
        result = eval(command[1]);
        if (typeof(result) != "object") {
            helpers.starfox(src, channel, command, bots.main, "Error 404, object is undefined or is not an object.");
            return;
        }
        for (var i in result) {
            content.push(result[i]);
        }
        content = JSON.stringify(content);
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The evaluated content of '" + command[1] + "' is " + content + ".", channel);
        return;
    }
    
    ,
    
    time: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), starttime, runtime;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.main, "Error 404, command not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER).replace(DELIMITER, ' ');
        command = COMMAND_SYMBOL + command;
        starttime = new Date();
        parseCommand(src, command, channel, name, auth, true);
        runtime = new Date() - starttime;
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The runtime of '" + command + "' was " + runtime + " milliseconds.", channel);
        return;
    }
    
    ,
    
    eval: function (src, channel, command) {
        var name = sys.name(src), starttime, runtime;
        command.splice(0, 1);
        command = command.join(DELIMITER);
        sys.sendHtmlAll(BORDER + "<br><timestamp/> <b>" + helpers.user(name) + " executed the following code:</b><br><b style='font-family: courier new;'>"
        + helpers.escapehtml(command) + "</b><br>" + BORDER2, channel);
        starttime = new Date();
        try {
            eval(command);
            sys.sendHtmlAll(helpers.bot(bots.script) + "Script ran successfully.", channel);
        }
        catch (error) { 
            sys.sendHtmlAll(helpers.bot(bots.script) + "An error occurred: " + error, channel);
        }
        runtime = new Date() - starttime;
        sys.sendHtmlAll(helpers.bot(bots.script) + "The eval runtime was " + runtime + " milliseconds.", channel);
    }
    
    ,
    
    silenteval: function (src, channel, command) {
        var name = sys.name(src), starttime, runtime;
        command.splice(0, 1);
        command = command.join(DELIMITER);
        sys.sendHtmlMessage(src, BORDER + "<br><timestamp/> <b>You executed the following code silently:</b><br><b style='font-family:courier new;'>"
        + helpers.escapehtml(command) + "</b><br>" + BORDER2, channel);
        starttime = new Date();
        try {
            eval(command);
            sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Script ran successfully.", channel);
        }
        catch (error) { 
            sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred: " + error, channel);
        }
        runtime = new Date() - starttime;
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The eval runtime was " + runtime + " milliseconds.", channel);
    }
    
    ,
    
    seval: function (src, channel, command) {
        this.silenteval(src, channel, command);
    }
    
    ,
    
    secretsilenteval: function (src, channel, command) {
        var name = sys.name(src);
        command.splice(0, 1);
        command = command.join(DELIMITER);
        var starttime = new Date();
        try {
            eval(command);
        }
        catch (error) { 
            sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred: " + error, channel);
        }
    }
    
    ,
    
    sseval: function (src, channel, command) {
        this.secretsilenteval(src, channel, command);
    }
    
    ,
    
    /**
        ------------------------------
        Banner and Description Options
        ------------------------------
    **/
    banneroptions: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands ~ Banner and Description Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/banner ") + helpers.arg("html") + "</b>: changes the banner to <b>html</b>.<br>"
        + "<b>" + helpers.user("/description ") + helpers.arg("html") + "</b>: changes the server description to <b>html</b>.<br>"
        + "<b>" + helpers.user("/testbanner ") + helpers.arg("html") + "</b>: changes the banner to <b>html</b>, but only for yourself. If <b>html</b> is not specified, resets the banner.<br>"
        + "<b>" + helpers.user("/testdescription ") + helpers.arg("html") + "</b>: posts <b>html</b> to yourself, to test a server description with.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
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
        sys.sendHtmlAuths(helpers.bot(bots.main) + sys.name(src) + " has changed the banner!");
    }
    
    ,
    
    description: function (src, channel, command) {
        var description = command[1];
        if (!description) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The description is currently: " + helpers.escapehtml(sys.getDescription()) + ".");
            return;
        }
        sys.changeDescription(banner);
        sys.sendHtmlAuths(helpers.bot(bots.main) + sys.name(src) + " has changed the description!");
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
        -------------
        Auth Settings
        -------------
    **/
    authsettings: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands ~ Auth Settings</h2>"
        + "<br>"
        + "The following players have auth:<br>"
        + "<br>"
        + sys.dbAuths().join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/user ") + helpers.arg("player") + "</b> to change <b>player</b>'s auth level to user.<br>"
        + "Use <b>" + helpers.user("/moderator ") + helpers.arg("player") + "</b> to change <b>player</b>'s auth level to moderator. Also /mod.<br>"
        + "Use <b>" + helpers.user("/administrator ") + helpers.arg("player") + "</b> to change <b>player</b>'s auth level to administrator. Also /admin.<br>"
        + "Use <b>" + helpers.user("/owner ") + helpers.arg("player") + "</b>: to change <b>player</b>'s auth level to owner.<br>"
        + "Use <b>" + helpers.user("/invisibleowner ") + helpers.arg("player") + helpers.arg2("*placement") + "</b>: to change <b>player</b>'s auth level to owner (invisible), "
        + "placed together with auth level <b>placement</b> on the player list. Also /invisible or /invis.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    user: function (src, channel, command) {
        var name = sys.name(src), trgtauth;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1];
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't user " + trgtname + " because they don't exist in the database.");
            return;
        }
        var trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth === 0) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change a user's auth to user.");
            return;
        }
        trgt ? sys.changeAuth(trgt, 0) : sys.changeDbAuth(trgtname, 0);
        sys.sendHtmlMain(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2("User") + " by " + helpers.user(name) + "!</font></b>");
    }

    ,

    moderator: function (src, channel, command) {
        var name = sys.name(src), ttrgtauth, newauth = 1;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1];
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't moderator " + trgtname + " because they don't exist in the database.");
            return;
        }
        if (!sys.dbRegistered(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not moderator " + trgtname + " because they haven't registered. Authority must be secure!");
            return;
        }
        var trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth == 1) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change a moderator's auth to moderator.");
            return;
        }
        if (trgt) {
            sys.changeAuth(trgt, 1);
        }
        sys.changeDbAuth(trgtname, 1);
        sys.sendHtmlMain(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2("Moderator") + " by " + helpers.user(name) + "!</font></b>");
    }

    ,
    
    mod: function (src, channel, command) {
        this.moderator(src, channel, command);
    }
    
    ,

    administrator: function (src, channel, command) {
        var name = sys.name(src), trgtauth;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1];
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't administrator " + trgtname + " because they don't exist in the database.");
            return;
        }
        if (!sys.dbRegistered(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not administrator " + trgtname + " because they haven't registered. Authority must be secure!");
            return;
        }
        var trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth == 2) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change an administrator's auth to administrator.");
            return;
        }
        if (trgt) {
            sys.changeAuth(trgt, 2);
        }
        sys.changeDbAuth(trgtname, 2);
        sys.sendHtmlMain(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2("Administrator") + " by " + helpers.user(name) + "!</font></b>");
    }

    ,
    
    admin: function (src, channel, command) {
        this.administrator(src, channel, command);
    }
    
    ,

    owner: function (src, channel, command) {
        var name = sys.name(src), trgtauth;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1];
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't owner " + trgtname + " because they don't exist in the database.");
            return;
        }
        if (!sys.dbRegistered(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not owner " + trgtname + " because they haven't registered. Authority must be secure!");
            return;
        }
        var trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth == 3) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change an owner's auth to owner.");
            return;
        }
        if (trgt) {
            sys.changeAuth(trgt, 3);
        }
        sys.changeDbAuth(trgtname, 3);
        sys.sendHtmlMain(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2("Owner") + " by " + helpers.user(name) + "!</font></b>");
    }
    
    ,

    invisibleowner: function (src, channel, command) {
        var name = sys.name(src), trgt, trgtname, trgtauth, placement;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        trgtname = command[1];
        command[2] ? placement = command[2] : placement = 4;
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't invisible owner " + trgtname + " because they don't exist in the database.");
            return;
        }
        if (!sys.dbRegistered(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not invisible owner " + trgtname + " because they haven't registered. Authority must be secure!");
            return;
        }
        trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth == placement) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change an auth level to the same auth level.");
            return;
        }
        if (placement < 1 || placement > 9) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, invalid placement.");
            return;
        }
        placement < 4 ? auth = placement * 10 : auth = placement;
        if (trgt) {
            sys.changeAuth(trgt, auth);
        }
        sys.changeDbAuth(trgtname, auth);
        sys.sendHtmlMessage(src, helpers.bot(bots.auth) + "You made " + trgtname + " Invisible Owner (placement " + placement + ").", channel);
    }
    
    ,
    
    invisible: function (src, channel, command) {
        this.invisibleowner(src, channel, command);
    }
    
    ,
    
    invis: function (src, channel, command) {
        this.invisibleowner(src, channel, command);
    }
    
    ,
    
    /**
        ------------------
        Whitelist Settings
        ------------------
    **/
    whitelistsettings: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands ~ Whitelist Settings</h2>"
        + "<br>"
        + "The server is currently <b>" + (open === true ? "open" : "closed") + "</b>.<br>"
        + "The following IPs and ranges are allowed to enter the server through server closure:<br>"
        + "<br>"
        + allowed.join(", ") + (allowedrange.length > 0 ? ", " + allowedrange.join(", ") : "") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/allow ") + helpers.arg("IP") + "</b> to allow <b>IP</b> through server closure.<br>"
        + "Use <b>" + helpers.user("/disallow ") + helpers.arg("IP") + "</b> to disallow <b>IP</b> through server closure.<br>"
        + "Use <b>" + helpers.user("/allowrange ") + helpers.arg("range") + "</b> to allow <b>range</b> through server closure.<br>"
        + "Use <b>" + helpers.user("/disallowrange ") + helpers.arg("range") + "</b> to disallow <b>range</b> through server closure.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    open: function (src, channel, command) {
        var name = sys.name(src);
        if (open) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, the server is already open!");
            return;
        }
        open = true;
        sys.write("data/open.txt", "true");
        sys.sendHtmlMain(helpers.bot(bots.priv) + "The server has been opened by " + name + ".");
    }
    
    ,
    
    close: function (src, channel, command) {
        var name = sys.name(src);
        if (!open) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, the server is already closed!");
            return;
        }
        open = false;
        sys.write("data/open.txt", "false");
        sys.sendHtmlMain(helpers.bot(bots.priv) + "The server has been closed by " + name + ".");
    }
    
    ,
    
    allow: function (src, channel, command) {
        var name = sys.name(src), ip;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, IP not found.");
            return;
        }
        ip = command[1];
        if (!helpers.isIp(ip)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid IP.");
            return;
        }
        if (helpers.isInArray(ip, allowed)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that IP is already allowed through closure!");
            return;
        }
        allowed.push(ip);
        sys.write("data/allowed.txt", JSON.stringify(allowed));
        sys.sendHtmlMessage(src, helpers.bot(bots.priv) + "You allowed the IP " + ip + " through server closure and bans.", channel);
    }
    
    ,
    
    disallow: function (src, channel, command) {
        var name = sys.name(src), ip;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, IP not found.");
            return;
        }
        ip = command[1];
        if (!helpers.isIp(ip)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid IP.");
            return;
        }
        if (!helpers.isInArray(ip, allowed)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that IP is already disallowed through closure!");
            return;
        }
        allowed.splice(allowed.indexOf(ip), 1);
        sys.write("data/allowed.txt", JSON.stringify(allowed));
        sys.sendHtmlMessage(src, helpers.bot(bots.priv) + "You disallowed the IP " + ip + " through server closure and bans.", channel);
    }
    
    ,
    
    allowrange: function (src, channel, command) {
        var name = sys.name(src), range;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, range not found.");
            return;
        }
        range = command[1];
        if (!helpers.isRange(range)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid range.");
            return;
        }
        if (helpers.isInArray(range, allowedrange)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that range is already allowed through closure!");
            return;
        }
        allowedrange.push(range);
        sys.write("data/allowedrange.txt", JSON.stringify(allowedrange));
        sys.sendHtmlMessage(src, helpers.bot(bots.priv) + "You allowed the range " + range + " through server closure and bans.", channel);
    }
    
    ,
    
    disallowrange: function (src, channel, command) {
        var name = sys.name(src), range;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, range not found.");
            return;
        }
        range = command[1];
        if (!helpers.isRange(range)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid range.");
            return;
        }
        if (!helpers.isInArray(range, allowedrange)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that range is already disallowed through closure!");
            return;
        }
        allowedrange.splice(allowedrange.indexOf(range), 1);
        sys.write("data/allowedrange.txt", JSON.stringify(allowedrange));
        sys.sendHtmlMessage(src, helpers.bot(bots.priv) + "You disallowed the range " + range + " through server closure and bans.", channel);
    }
    
    ,
    
    /**
        ----------------
        AntiDoS Settings
        ----------------
    **/
    antidossettings: function (src, channel, command) {
        var trustedIps = sys.trustedIps(), dosChannel = sys.dosChannel() === "" ? "none" : sys.dosChannel(), commandsmessage = BORDER
        + "<h2>Owner Commands ~ Anti DoS Settings</h2>"
        + "<br>"
        + "The current anti DoS message channel is " + (dosChannel == "none" ? "none" : "<a href='po:join/" + dosChannel + "'>#" + dosChannel + "</a>") + ".<br>"
        + "The following IPs are trusted and will bypass the server anti DoS:<br>"
        + "<br>"
        + trustedIps.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/trust ") + helpers.arg("IP") + "</b> to add <b>IP</b> to the trusted IPs.<br>"
        + "Use <b>" + helpers.user("/distrust ") + helpers.arg("IP") + "</b> to remove <b>IP</b> from the trusted IPs.<br>"
        + "Use <b>" + helpers.user("/doschannel ") + helpers.arg("channel") + "</b> to change the anti DoS message channel to <b>channel</b>.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    trust: function (src, channel, command) {
        var trustedIps = sys.trustedIps(), ip;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, IP not found.");
            return;
        }
        ip = command[1];
        if (!helpers.isIp(ip)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid IP.");
            return;
        }
        if (helpers.isInArray(ip, trustedIps)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that IP is already trusted!");
            return;
        }
        sys.addTrustedIp(ip);
        sys.sendHtmlMessage(src, helpers.bot(bots.priv) + "You added the IP " + ip + " to the list of trusted IPs.", channel);
    }
    
    ,
    
    distrust: function (src, channel, command) {
        var trustedIps = sys.trustedIps(), ip;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, IP not found.");
            return;
        }
        ip = command[1];
        if (!helpers.isIp(ip)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid IP.");
            return;
        }
        if (!helpers.isInArray(ip, trustedIps)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that IP isn't trusted!");
            return;
        }
        sys.removeTrustedIp(ip);
        sys.sendHtmlMessage(src, helpers.bot(bots.priv) + "You removed the IP " + ip + " from the list of trusted IPs.", channel);
    }
    
    ,
    
    doschannel: function (src, channel, command) {
        var dosChannel = command[1];
        if (!dosChannel) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, channel not found.");
            return;
        }
        if (sys.dosChannel() == dosChannel) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that channel is already the anti DoS message channel!");
            return;
        }
        sys.changeDosChannel(dosChannel);
        sys.sendHtmlMessage(src, helpers.bot(bots.priv) + "You made " + dosChannel + " the anti DoS message channel.", channel);
    }
    
    ,
    
    /**
        --------------
        Flood Settings
        --------------
    **/
    floodsettings: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands ~ Flood Settings</h2>"
        + "<br>"
        + "<b>Flood Level:</b> " + floodlevel + "<br>"
        + "<b>Flood Time:</b> " + floodtime + " seconds<br>"
        + "<b>Message Allowance:</b> " + allowance + " messages<br>"
        + "Someone will be flooding if they exceed " + allowance + " messages in " + floodtime + " seconds,";
        if (floodlevel == 4) {
            commandsmessage += " regardless of their auth level.<br>";
        } else {
            commandsmessage += " if their auth level is lower than " + AUTH_NAME[floodlevel] + ".<br>";
        }
        commandsmessage += "<br>"
        + "Use <b>" + helpers.user("/floodlevel ") + helpers.arg("number") + "</b> to change the flood level into <b>number</b>.<br>"
        + "Use <b>" + helpers.user("/floodtime ") + helpers.arg("number") + "</b> to change the flood time into <b>number</b> seconds.<br>"
        + "Use <b>" + helpers.user("/allowance ") + helpers.arg("number") + "</b> to change the message allowance into <b>number</b> messages.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
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
        floodlevel = parseInt(command[1]);
        sys.write("data/floodlevel.txt", floodlevel);
        sys.sendHtmlMessage(src, helpers.bot(bots.flood) + "The flood level has been changed to " + floodlevel + ".", channel);
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
        sys.write("data/floodtime.txt", floodtime);
        sys.sendHtmlMessage(src, helpers.bot(bots.flood) + "The flood time has been changed to " + floodtime + " seconds.", channel);
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
        sys.write("data/allowance.txt", allowance);
        sys.sendHtmlMessage(src, helpers.bot(bots.flood) + "The message allowance has been changed to " + allowance + " messages.", channel);
    }
    
    ,
    
    /**
        ---------------
        Server Settings
        ---------------
    **/
    serversettings: function (src, channel, command) {
        var commandsmessage = BORDER, serverprivate = sys.isServerPrivate(), serveropen = open;
        var ports = sys.serverPorts().length, proxies = sys.proxyServers().length, serverport;
        var uptime = sys.profileDump().split('\n')[0].split(',')[0].split(':')[1].slice(1, -2);
        var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var d = new Date(), day = d.getDay(), date, time;
        date = d.getDate(), month = d.getMonth(), year = d.getFullYear();
        date = DAYS[day] + ", " + MONTHS[month] + " " + date + ", " + year;
        time = d.toTimeString().substr(0, 15);
        time = time.replace("+01", "+1 (Central European Time)");
        time = time.replace("+02", "+2 (Central European Summer Time)");
        time = time.replace("-04", "-4 (Eastern Daylight Time)");
        time = time.replace("-05", "-5 (Eastern Standard Time)");
        serverprivate = (serverprivate ? "<span style='color:red'>No</span>" : "<b style='color:green'>Yes</b>");
        serveropen = (serveropen ? "<b style='color:green'>Yes</b>" : "<span style='color:red'>No</span>");
        commandsmessage += "<h2>Owner Commands ~ Server Settings</h2>"
        + "<br>"
        + "<b>Name:</b> " + sys.getServerName() + "<br>"
        + "<b>Host OS:</b> " + helpers.os(sys.os()) + "<br>"
        + "<b>Version:</b> " + sys.serverVersion() + "<br>"
        + "<b>IP:</b> " + hostIp + "<br>"
        + "<b>Hosted from:</b> " + (hostCountry ? FLAGS[helpers.toFlagKey(hostCountry)] + " " + hostCountry : "[no data]") + "<br>"
        + "<b>" + (ports == 1 ? "Port" : "Ports") + ":</b> " + sys.serverPorts().join(", ") + "<br>"
        + "<b>" + (proxies == 1 ? "Proxy" : "Proxies") + ":</b> " + sys.proxyServers().join(", ") + "<br>"
        + "<b>Public:</b> " + serverprivate + "<br>"
        + "<b>Open:</b> " + serveropen + "<br>"
        + "<br>" + "<b>Local Date:</b> " + date + "<br>"
        + "<b>Local Time:</b> " + time + "<br>"
        + "<b>Server Uptime:</b> " + helpers.formatUptime(uptime) + "<br><br>"
        + "Use <b>" + helpers.user("/open") + "</b> to open the server.<br>"
        + "Use <b>" + helpers.user("/close") + "</b> to close the server.<br>"
        + "Use <b>" + helpers.user("/public") + "</b> to make the server public.<br>"
        + "Use <b>" + helpers.user("/private") + "</b> to make the server private.<br>"
        + "Use <b>" + helpers.user("/shutdown") + "</b> to shut down the server.<br>"
        + "Use <b>" + helpers.user("/restart") + "</b> to restart the server.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    'private': function (src, channel, command) {
        sys.makeServerPublic(false);
        sys.sendHtmlMain(helpers.bot(bots.priv) + "<b>" + helpers.user(sys.name(src)) +
        " made the server " + helpers.arg("private") + "!</b>");
    }
    
    ,
    
    'public': function (src, channel, command) {
        sys.makeServerPublic(true);
        sys.sendHtmlMain(helpers.bot(bots.priv) + "<b>" + helpers.user(sys.name(src)) +
        " made the server " + helpers.arg("public") + "!</b>");
    }
    
    ,
    
    shutdown: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlMain(helpers.bot(bots.priv) + "<b>" + helpers.user(name) + " has shut down the server!</b>");
        sys.setTimer(function () {sys.shutDown();}, 1000, 0);
    }
    
    ,
    
    restart: function (src, channel, command) {
        var name = sys.name(src);
        sys.setTimer(function () {sys.shutDown();}, 1000, 0);
        sys.system("wait.bat 1 && start Server.exe");
        sys.sendHtmlMain(helpers.bot(bots.priv) + "<b>" + helpers.user(name) + " has restarted the server!</b>");
    }
    
    ,
    
    /**
        ---------------
        Silent Settings
        ---------------
    **/
    silentsettings: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands ~ Silent Settings</h2>"
        + "<br>"
        + "The following commands will currently bypass logging in <a href='po:join/" + permchannels[0] + "'>#" + permchannels[0] + "</a>:<br>"
        + "<br>"
        + silentcommands.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/addsilentcommand ") + helpers.arg("command") + "</b> to make <b>command</b> a silent command. Also /addsc.<br>"
        + "Use <b>" + helpers.user("/removesilentcommand ") + helpers.arg("command") + "</b> to make <b>command</b> from the list of silent commands. Also /removesc.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    addsilentcommand: function (src, channel, command) {
        var sc = command[1];
        if (!sc || !helpers.isInArray(sc, allcommands)) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, command not found.");
            return;
        }
        silentcommands.push(sc);
        sys.write("data/silentcmds.txt", JSON.stringify(silentcommands));
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The command '/" + sc + "' is now a silent command.", channel);
    }
    
    ,
    
    addsc: function (src, channel, command) {
        this.addsilentcommand(src, channel, command);
    }
    
    ,
    
    removesilentcommand: function (src, channel, command) {
        var sc = command[1];
        if (!sc || !helpers.isInArray(sc, allcommands)) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, command not found.");
            return;
        }
        if (!helpers.isInArray(sc, silentcommands)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, that command is not a silent command.");
            return;
        }
        silentcommands.splice(silentcommands.indexOf(sc), 1);
        sys.write("data/silentcmds.txt", JSON.stringify(silentcommands));
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The command '/" + sc + "' is no longer a silent command.", channel);
    }
    
    ,
    
    removesc: function (src, channel, command) {
        this.removesilentcommand(src, channel, command);
    }
    
    ,
    
    /**
        ---------------
        Filter Settings
        ---------------
    **/
    filtersettings: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands ~ Filter Settings</h2>"
        + "<br>"
        + "The following words are currently not allowed to be in a username:<br>"
        + "<br>"
        + nameblocklist.join(", ") + "<br>"
        + "<br>"
        + "The following names are exceptions to this:<br>"
        + "<br>"
        + exceptions.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/block ") + helpers.arg("text") + "</b> to filter <b>text</b>.<br>"
        + "Use <b>" + helpers.user("/unblock ") + helpers.arg("text") + "</b> to stop filtering <b>text</b>.<br>"
        + "Use <b>" + helpers.user("/addexception ") + helpers.arg("name") + "</b> to allow <b>name</b> to bypass filtering. Also /exception.<br>"
        + "Use <b>" + helpers.user("/removeexception ") + helpers.arg("name") + "</b> to disallow <b>name</b> to bypass filtering.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    block: function (src, channel, command) {
        var word;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, word not found.");
            return;
        }
        word = command[1].toLowerCase();
        nameblocklist.push(word);
        sys.write("data/nameblocklist.txt", JSON.stringify(nameblocklist));
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The word '" + word + "' has been added to the filter list.", channel);
    }
    
    ,
    
    unblock: function (src, channel, command) {
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
        sys.write("data/nameblocklist.txt", JSON.stringify(nameblocklist));
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The word '" + word + "' has been removed from the filter list.", channel);
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
        sys.write("data/exceptions.txt", JSON.stringify(exceptions));
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The name '" + name + "' will now bypass filtering.", channel);
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
        sys.write("data/exceptions.txt", JSON.stringify(exceptions));
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The name '" + name + "' will no longer bypass filtering.", channel);
    }
    
    ,
    
    exception: function (src, channel, command) {
        this.addexception(src, channel, command);
    }
    
    ,
    
    /**
        -------------
        Miscellaneous
        -------------
    **/
    miscellaneous: function (src, channel, command) {
        var commandsmessage = BORDER
        + "<h2>Owner Commands ~ Miscellaneous</h2>"
        + "<br>";
        if (API === "") {
            commandsmessage += "<b>" + helpers.user("/setapi ") + helpers.arg("API") + "</b>: sets the IPinfoDB API key for country and time zone retrieval to <b>API</b>.<br>"
            + "<u>Be careful with this command!</u> Entering an invalid API key will break things!<br>";
        } else {
            commandsmessage += "<b>" + helpers.user("/removeapi") + "</b>: removes your IPinfoDB API key. This will disable country and time zone retrieval and reset all corresponding data.<br>";
        }
        commandsmessage += "<b>" + helpers.user("/layout") + "</b>: changes the layout of certain messages to the old one or the new one.<br>"
        + "<b>" + helpers.user("/commandcolor ") + helpers.arg("number") + helpers.arg2("*color") + "</b>: changes command color <b>number</b> to <b>color</b>. 0 is the user, 1 is the first argument, and so on.<br>"
        + "<b>" + helpers.user("/clearpass ") + helpers.arg("player") + "</b>: clears <b>player</b>'s password.<br>"
        + "<b>" + helpers.user("/servertopic ") + helpers.arg("text") + "</b>: changes the server topic to <b>text</b>.<br>"
        + "<b>" + helpers.user("/regchannelinfo") + "</b>: lists all registered channels and their info.<br>"
        + "<b>" + helpers.user("/commandlist") + "</b>: lists all available commands.<br>"
        + "<b>" + helpers.user("/stopbattles") + "</b>: disallows battles to be started.<br>"
        + "<b>" + helpers.user("/resumebattles") + "</b>: allows battles to be started again.<br>"
        + "<b>" + helpers.user("/updatetiers") + "</b>: updates the server tier list to the most recent version of the main server tier list.<br>"
        + "<b>" + helpers.user("/exportmembers") + "</b>: exports the member database.<br>"
        + "<br><timestamp/><br>"
        + BORDER2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    setapi: function (src, channel, command) {
        if (API !== "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you already have an API key set!");
            return;
        }
        var api = command[1];
        if (!api) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, API key not found.");
            return;
        }
        API = api;
        sys.write("data/API_KEY.txt", api);
        sys.webCall(IP_RETRIEVAL_URL, function (resp) {
            if (resp === "") {
                print("An error occurred while loading the host IP address.");
                return;
            }
            hostIp = resp;
            sys.webCall(helpers.countryRetrievalUrl(hostIp), function (resp) {
                resp = JSON.parse(resp);
                hostTimeZone = helpers.timezonedata(resp.countryName, resp.timeZone);
                hostCountry = helpers.countrydata(resp.countryName);
                hostCity = helpers.citydata(resp.cityName);
                print("Host location data has been loaded.");
            });
        });
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your API key has been set.", channel);
    }
    
    ,
    
    removeapi: function (src, channel, command) {
        if (API === "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you cannot remove an API key when you don't have one!");
            return;
        }
        API = "";
        sys.write("data/API_KEY.txt", "");
        sys.write("data/countryname.txt", "{}");
        sys.write("data/cityname.txt", "{}");
        sys.write("data/timezone.txt", "{}");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your API key has been removed.", channel);
    }
    
    ,
    
    layout: function (src, channel, command) {
        var name = sys.name(src);
        if (!command[1] || (command[1] != "old" && command[1] != "new")) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, layout not found.");
            return;
        }
        if (command[1] == "new") {
            layout = "new";
            sys.sendHtmlMain(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed certain messages to the new layout!</b>");
        } else {
            layout = "old";
            sys.sendHtmlMain(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed certain messages to the old, nostalgic layout!</b>");
        }
    }
    
    ,
    
    commandcolor: function (src, channel, command) {
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, number not found.");
            return;
        }
        if (isNaN(command[1]) || command[1] < 0 ||command[1] >= cmdcolors.length) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid number.");
            return;
        }
        if (!command[2]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, color not found.");
            return;
        }
        cmdcolors[command[1]] = command[2];
        sys.write("data/cmdcolors.txt", JSON.stringify(cmdcolors));
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Command color " + command[1] + " has been changed to " + command[2] + ".", channel);
    }
    
    ,
    
    clearpass: function (src, channel, command) {
        var name = sys.name(src), player, trgt;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.pass, "Error 404, player not found.");
            return;
        } else {
            player = command[1];
            if (members[player]) {
                player = members[player];
            }
        }
        if (!sys.dbRegistered(player)) {
            helpers.starfox(src, channel, command, bots.pass, "Error 400, you can't clear the password of a player that hasn't registered!");
            return;
        }
        sys.clearPass(command[1].toLowerCase());
        trgt = sys.id(player);
        if (trgt) {
            sys.sendHtmlMessage(trgt, helpers.bot(bots.pass) + "Your password was cleared by " + name + "! The Register button will be reactivated.");
            sys.sendNetworkCommand(trgt, REACTIVATE_REGISTER_BUTTON);
        }
        sys.sendHtmlAuths(helpers.bot(bots.pass) + "The password of " + player + " has been cleared by " + name + "!");
    }
    
    ,
    
    servertopic: function (src, channel, command) {
        var name = sys.name(src);
        if (!command[1]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.topic) + "The current server topic is: " + servertopic, channel);
            return;
        }
        servertopic = command[1];
        sys.write("data/servertopic.txt", servertopic);
        sys.sendHtmlMain(helpers.bot(bots.topic) + "<b>" + helpers.user(name) + " changed the server topic to " + helpers.arg(command[1]) + ".</b>");
    }
    
    ,
    
    regchannelinfo: function (src, channel, command) {
        var message = BORDER + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" 
        + "thead {font-weight:bold;}</style><h2>Registered Channels</h2><br>"
        + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
        + "<td>Channel</td><td>Permanent</td><td>Private</td><td>Closure Level</td><td>Owners</td></tr></thead><tbody>";
        for (var i in regchannels) {
            message += "<tr>";
            typeof(sys.channelId(i)) == "number" ? message += "<td><a href='po:join/" + sys.channel(sys.channelId(i)) +
            "'>#" + sys.channel(sys.channelId(i)) + "</a></td>" : message += "<td>#" + i + "</td>";
            regchannels[i].stay || sys.channelId(i) <= permchannels.length ? message += "<td><b style='color:green'>Yes</b></td>" : message += "<td><b style='color:red'>No</b></td>";
            regchannels[i].priv ? message += "<td><b style='color:green'>Yes</b></td>" : message += "<td><b style='color:red'>No</b></td>";
            message += "<td>" + regchannels[i].close + "</td><td>" + regchannels[i].owners.join(", ") + "</td></tr>";
            
        }
        message += "</tbody></table><br><br><timestamp/><br>" + BORDER2;
        sys.sendHtmlMessage(src, message, channel);
    }
    
    ,
    
    commandlist: function (src, channel, command) {
        var scriptmessage = BORDER + "<h2>List of Commands</h2><br>", length, totallength;
        length = Object.keys(usercommands1).length;
        length = eval(length) + Object.keys(usercommands2).length * 1;
        scriptmessage += "<b>User Commands:</b> " + Object.keys(usercommands1).sort().join(", ") + ", " + Object.keys(usercommands2).join(", ") + "<br>" +
        "<b>Moderator Commands:</b> " + Object.keys(modcommands).sort().join(", ") + "<br>" +
        "<b>Administrator Commands:</b> " + Object.keys(admincommands).sort().join(", ") + "<br>" +
        "<b>Owner Commands:</b> " + Object.keys(ownercommands).sort().join(", ") + "<br>" +
        "<b>Channel User Commands:</b> " + Object.keys(cusercommands).sort().join(", ") + "<br>" +
        "<b>Channel Moderator Commands:</b> " + Object.keys(cmodcommands).sort().join(", ") + "<br>" +
        "<b>Channel Administrator Commands:</b> " + Object.keys(cadmincommands).sort().join(", ") + "<br>" +
        "<b>Channel Owner Commands:</b> " + Object.keys(cownercommands).sort().join(", ") + "<br>" +
        "<b>All Commands:</b> " + allcommands.sort().join(", ") + "<br>" +
        "<b>Helpers:</b> " + Object.keys(helpers).sort().join(", ") + "<br><br>" +
        "<b>Total User Commands:</b> " + length + "<br>" +
        "<b>Total Moderator Commands:</b> " + Object.keys(modcommands).length + "<br>" +
        "<b>Total Administrator Commands:</b> " + Object.keys(admincommands).length + "<br>" +
        "<b>Total Owner Commands:</b> " + Object.keys(ownercommands).length + "<br>" +
        "<b>Total Channel User Commands:</b> " + Object.keys(cusercommands).length + "<br>" +
        "<b>Total Channel Mod Commands:</b> " + Object.keys(cmodcommands).length + "<br>" +
        "<b>Total Channel Admin Commands:</b> " + Object.keys(cadmincommands).length + "<br>" +
        "<b>Total Channel Owner Commands:</b> " + Object.keys(cownercommands).length + "<br>" +
        "<b>Total Helpers:</b> " + Object.keys(helpers).length + "<br>" +
        "<b><u>Total Commands:</u></b> " + allcommands.length + "<br>";
        scriptmessage += "<br><timestamp/><br>" + BORDER2;
        sys.sendHtmlMessage(src, scriptmessage, channel);
    }
    
    ,
    
    stopbattles: function (src, channel, command) {
        stopbattles = true;
        sys.sendHtmlMain(helpers.bot(bots.main) + "<b>" + helpers.user(sys.name(src)) + " has stopped battles! No battles can be started anymore!</b>");
    }
    
    ,
    
    resumebattles: function (src, channel, command) {
        stopbattles = false;
        sys.sendHtmlMain(helpers.bot(bots.main) + "<b>" + helpers.user(sys.name(src)) + " has resumed battles! Everyone can battle again!</b>");
    }
    
    ,
    
    updatetiers: function (src, channel, command) {
        sys.sendHtmlMain(helpers.bot(bots.tour) + "Tiers will be updated. The server might experience lag during this process.");
        sys.webCall(BETA_TIERS_URL, function (resp) {
            sys.write("tiers.xml", resp);
            sys.reloadTiers();
        });
    }
    
    ,
    
    exportmembers: function (src, channel, command) {
        sys.exportMemberDatabase();
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The member database has been successfully exported.", channel);
    }
};
