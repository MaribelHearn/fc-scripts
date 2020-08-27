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
        var commandsmessage = border
        + "<h2>Owner Commands</h2>"
        + "<br>"
        + "<b>" + helpers.userl("/ownerjusticeoptions") + "</b>: displays owner justice options.<br>"
        + "<b>" + helpers.userl("/banneroptions") + "</b>: displays banner and description options.<br>"
        + "<b>" + helpers.userl("/authoptions") + "</b>: displays auth settings.<br>"
        + "<b>" + helpers.userl("/filesettings") + "</b>: displays file system options.<br>"
        + "<b>" + helpers.userl("/scriptsettings") + "</b>: displays script options.<br>"
        + "<b>" + helpers.userl("/floodsettings") + "</b>: displays flooding settings.<br>"
        + "<b>" + helpers.userl("/whitelistsettings") + "</b>: displays whitelist settings.<br>"
        + "<b>" + helpers.userl("/antidossettings") + "</b>: displays anti DoS settings.<br>"
        + "<b>" + helpers.userl("/serversettings") + "</b>: displays server settings.<br>"
        + "<b>" + helpers.userl("/silentsettings") + "</b>: displays silent settings.<br>"
        + "<b>" + helpers.userl("/filtersettings") + "</b>: displays name filtering settings.<br>"
        + "<b>" + helpers.userl("/messagesettings") + "</b>: displays message settings.<br>"
        + "<b>" + helpers.userl("/colorsettings") + "</b>: displays color settings. Also /coloursettings.<br>"
        + "<b>" + helpers.userl("/rulesettings") + "</b>: displays rule settings.<br>"
        + "<b>" + helpers.userl("/listsettings") + "</b>: displays mute and banlist customisation settings.<br>"
        + "<b>" + helpers.userl("/channelsettings") + "</b>: displays channel settings.<br>"
        + "<b>" + helpers.userl("/miscellaneous") + "</b>: displays other commands.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    /**
        ---------------------
        Owner Justice Options
        ---------------------
    **/
    ownerjusticeoptions: function (src, channel, command) {
        var commandsmessage = border
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
        + border2;
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
        helpers.saveData("megabanlist");
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
        helpers.saveData("namestounban");
        helpers.saveData("megabanlist");
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
        helpers.saveData("megabanlist");
        sys.sendHtmlMessage(src, helpers.bot(bots.megaban) + "You changed the mega ban reason of " + trgtname + " to '" + reason + "'.", channel);
    }

    ,

    clearmegabanlist: function (src, channel, command) {
        for (var i in megabanlist) {
            namestounban.push(i);
        }
        megabanlist = {};
        helpers.saveData("megabanlist");
        helpers.saveData("namestounban");
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
            helpers.starfox(src, channel, command, bots.gigaban, "Error 400, you can't giga ban " + trgtname + " since they are not online!");
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
        helpers.saveData("gigabanlist");
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
        helpers.saveData("gigabanlist");
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
        helpers.saveData("gigabanlist");
        sys.sendHtmlMessage(src, helpers.bot(bots.gigaban) + "You changed the giga ban reason of " + trgtname + " to '" + reason + "'.", channel);
    }

    ,

    cleargigabanlist: function (src, channel, command) {
        gigabanlist = {};
        helpers.saveData("gigabanlist");
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
        helpers.saveData("rangebanlist");
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
                helpers.saveData("mutelist");
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
                helpers.saveData("banlist");
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
                helpers.saveData("rangebanlist");
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
        helpers.saveData("rangebanlist");
        if (rangebanmessages[name.toLowerCase()]) {
            msg = rangebanmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, range).replace(/~Server~/gi, sys.getServerName());
            sys.sendHtmlMain(helpers.bot(bots.ban) + msg + " [Reason: " + reason + "]");
        } else {
            sys.sendHtmlMain(helpers.bot(bots.ban) + name + " has range banned " + range + " from the server! [Reason: " + reason + "]");
        }
        for (var index in mutelist) {
            if (!sys.dbIp(index)) {
                delete mutelist[index];
                continue;
            }
            if (sys.dbRange(index) == range) {
                delete mutelist[index];
                if (members[index])index = members[index];
                helpers.saveData("mutelist");
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
                helpers.saveData("banlist");
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
        helpers.saveData("rangebanlist");
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
        helpers.saveData("rangebanlist");
        sys.sendHtmlMain(helpers.bot(bots.ban) + banner + " has changed the range ban reason of " + command[1] + " to '" + reason + "'!");
    }

    ,

    clearrangebanlist: function (src, channel, command) {
        var name = sys.name(src);
        rangebanlist = {};
        helpers.saveData("rangebanlist");
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
        helpers.saveData("rangebanmessages");
        sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Your range ban message has been changed successfully.", channel);
    }

    ,

    /**
        ------------------------------
        Banner and Description Options
        ------------------------------
    **/
    banneroptions: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Banner and Description Options</h2>"
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
        sys.sendHtmlAuths(helpers.bot(bots.main) + sys.name(src) + " has changed the banner!");
    }

    ,

    description: function (src, channel, command) {
        var description = command[1];
        if (!description) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The description is currently: " + helpers.escapehtml(sys.getDescription()) + ".");
            return;
        }
        sys.changeDescription(description);
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
        ------------
        Auth Options
        ------------
    **/
    authoptions: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Auth Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/user ") + helpers.arg("player") + "</b>: changes <b>player</b>'s auth level to user.<br>"
        + "<b>" + helpers.user("/moderator ") + helpers.arg("player") + "</b>: changes <b>player</b>'s auth level to moderator. Also /mod.<br>"
        + "<b>" + helpers.user("/administrator ") + helpers.arg("player") + "</b>: changes <b>player</b>'s auth level to administrator. Also /admin.<br>"
        + "<b>" + helpers.user("/owner ") + helpers.arg("player") + "</b>: changes <b>player</b>'s auth level to owner.<br>"
        + "<b>" + helpers.user("/invisibleowner ") + helpers.arg("player") + helpers.arg2("*placement") + "</b>: changes <b>player</b>'s auth level to owner (invisible), "
        + "placed together with auth level <b>placement</b> on the player list, placement being a number from 1 to 9. Also /invisible or /invis.<br>"
        + "<b>" + helpers.user("/authlevels") + "</b>: displays all auth members with their auth levels in a neat table. Useful to check on invisible owners.<br>"
        + "<br><timestamp/><br>"
        + border2;
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
        sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2(AUTH_NAMES[0]) + " by " + helpers.user(name) + "!</font></b>", channel);
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
        sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2(AUTH_NAMES[1]) + " by " + helpers.user(name) + "!</font></b>", channel);
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
        sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2(AUTH_NAMES[2]) + " by " + helpers.user(name) + "!</font></b>", channel);
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
        sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2(AUTH_NAMES[3]) + " by " + helpers.user(name) + "!</font></b>", channel);
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
        if (isNaN(placement) || placement < 1 || placement > 9) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, invalid placement.");
            return;
        }
        placement < 4 ? auth = placement * 10 : auth = placement;
        if (trgt) {
            sys.changeAuth(trgt, auth);
        }
        sys.changeDbAuth(trgtname, auth);
        sys.sendHtmlMessage(src, helpers.bot(bots.auth) + "You made " + trgtname + " " + AUTH_NAMES[4] + " (placement " + placement + ").", channel);
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

    authlevels: function (src, channel, command) {
        var DISPLAY_USER = true, authmessage = border + "<h2>Auth Levels</h2><br>", auths = sys.dbAuths().sort(), index = 0, lower;
        var authLevels = [], titles = [], names = [], lastLogins = [];
        for (var i in auths) {
            authLevels.push(sys.dbAuth(auths[i]));
            names.push(auths[i]);
            lower = names[index].toLowerCase();
            titles.push(authtitles[lower] ? authtitles[lower] : '-');
            lastLogins.push(helpers.formatLastOn(src, sys.dbLastOn(auths[i])));
            if (members[lower]) {
                names[index] = members[lower];
            }
            index++;
        }
        if (helpers.isAndroid(src)) {
            authmessage += "<tt>";
            for (var i in auths) {
                authmessage += names[i] + ": " + authLevels[i] + "<br>";
            }
            authmessage += "</tt>";
        } else {
            authmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Icon</th><th>Auth</th><th>Level</th><th>Title</th><th>Name</th><th>Last Online</th></tr></thead><tbody>";
            for (var i in auths) {
                authmessage += "<tr>"
                + "<td>" + helpers.authimage(src, authLevels[i] >= 4 ? 0 : authLevels[i]) + "</td>"
                + "<td>" + helpers.authName(authLevels[i], DISPLAY_USER) + "</td>"
                + "<td>" + authLevels[i] + "</td>"
                + "<td>" + titles[i] + "</td>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + lastLogins[i] + "</td>"
                + "</tr>";
            }
            authmessage += "</tbody><tfoot><tr><td colspan='6'><b>Total Auth Members:</b> " + auths.length + "</td></tr></tfoot></table>";
        }
        authmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, authmessage, channel);
    }

    ,

    /**
        ---------------
        File Settings
        ---------------
    **/
    filesettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ File Settings</h2>"
        + "<br>"
        + "The current working directly is <b>" + sys.cwd() + "</b>.<br>"
        + "<br>";
        commandsmessage += "<br>"
        + "<b>" + helpers.user("/ls ") + helpers.arg("directory") + "</b>: shows the contents of <b>directory</b>. Shows the current working directory by default. Also /dir.<br>"
        + "<b>" + helpers.user("/cat ") + helpers.arg("file") + "</b>: shows the contents of <b>file</b>. Also /type.<br>"
        + "<b>" + helpers.user("/rm ") + helpers.arg("file") + "</b>: deletes <b>file</b> from the file system.<br>"
        + "<b>" + helpers.user("/mkdir ") + helpers.arg("directory") + "</b>: creates a new directory called <b>directory</b>. Also /md.<br>"
        + "<b>" + helpers.user("/rmdir ") + helpers.arg("directory") + "</b>: deletes <b>directory</b> if it is empty. Also /rd.<br>"
        + "<b>" + helpers.user("/zip ") + helpers.arg("name") + helpers.arg2("*directory") + "</b>: creates a new archive called <b>name</b> that contains the files of <b>directory</b>.<br>"
        + "<b>" + helpers.user("/unzip ") + helpers.arg("name") + helpers.arg2("*directory") + "</b>: extracts the archive called <b>name</b> to <b>directory</b>. If <b>directory</b> is not specified, extracts to the current working directory.<br>"
        + "<b>" + helpers.user("/exec ") + helpers.arg("command") + "</b>: executes <b>command</b> on the underlying operating system. <u>Be careful with this command!</u> It can break your computer!<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    ls: function (src, channel, command) {
        var dir = command[1], message, dirs, files;
        if (!dir) {
            dir = sys.cwd();
        } else {
            command.splice(0, 1);
            command = command.join(DELIMITER);
            if (!sys.fexists(dir)) {
                helpers.starfox(src, channel, command, bots.script, "Error 404, that directory does not exist.");
                return;
            }
            if (!sys.filesForDirectory(dir)) {
                helpers.starfox(src, channel, command, bots.script, "Error 400, that file is not a directory.");
                return;
            }
            if (sys.filesForDirectory(dir).length === 0) {
                helpers.starfox(src, channel, command, bots.script, "Error 400, the directory is empty.");
                return;
            }
        }
        message = border
        + "<h2>Contents of " + dir + "</h2>"
        + "<br>";
        dirs = sys.dirsForDirectory(dir);
        files = sys.filesForDirectory(dir);
        for (subdir in dirs) {
            message += dirs[subdir] + "/<br>";
        }
        for (file in files) {
            message += files[file] + "<br>";
        }
        message += "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, message, channel);
    }

    ,

    dir: function (src, channel, command) {
        this.ls(src, channel, command);
    }

    ,

    cat: function (src, channel, command) {
        var file = command[1], message;
        if (!file) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, file not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (!sys.fexists(file)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that file does not exist.");
            return;
        }
        message = border +
        "<h2>Contents of " + file +
        "</h2><br>" + helpers.escapehtml(sys.getFileContent(file)) + "<br>" +
        "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, message, channel);
    }

    ,

    type: function (src, channel, command) {
        this.cat(src, channel, command);
    }

    ,

    rm: function (src, channel, command) {
        var file = command[1];
        if (!file) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, file not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (!sys.fexists(file)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that file does not exist.");
            return;
        }
        sys.rm(file);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "File '" + file + "' has been deleted!", channel);
    }

    ,

    mkdir: function (src, channel, command) {
        var dir = command[1];
        if (!dir) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, directory not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (sys.fexists(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that directory already exists.");
            return;
        }
        sys.mkdir(dir);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Directory '" + dir + "' has been created!", channel);
    }

    ,

    md: function (src, channel, command) {
        this.mkdir(src, channel, command);
    }

    ,

    rmdir: function (src, channel, command) {
        var dir = command[1];
        if (!dir) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, directory not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (!sys.fexists(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that directory does not exist.");
            return;
        }
        if (!sys.filesForDirectory(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, that file is not a directory.");
            return;
        }
        if (sys.filesForDirectory(dir).length > 0) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, the directory is not empty.");
            return;
        }
        sys.rmdir(dir);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Directory '" + dir + "' has been deleted!", channel);
    }

    ,

    rd: function (src, channel, command) {
        this.rmdir(src, channel, command);
    }

    ,

    zip: function (src, channel, command) {
        var fileName = command[1];
        if (!fileName) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, name not found.");
            return;
        }
        if (sys.fexists(fileName + ".zip")) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, there is already an archive of the same name.");
            return;
        }
        var dir = command[2];
        if (!dir) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, directory not found.");
            return;
        }
        if (!sys.fexists(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that directory does not exist.");
            return;
        }
        if (!sys.filesForDirectory(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, that file is not a directory.");
            return;
        }
        if (sys.filesForDirectory(dir).length === 0) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, the directory is empty.");
            return;
        }
        sys.zip(fileName, dir);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Compressed directory '" + dir + "' into archive '" + fileName + ".zip'.", channel);
    }

    ,

    unzip: function (src, channel, command) {
        var fileName = command[1];
        if (!fileName) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, name not found.");
            return;
        }
        if (!sys.fexists(fileName + ".zip")) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, that archive does not exist.");
            return;
        }
        var dir = command[2];
        if (!dir) {
            sys.extractZip(fileName);
            sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Extracted archive '" + fileName + ".zip' into the current working directory.", channel);
            return;
        }
        if (!sys.fexists(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that directory does not exist.");
            return;
        }
        if (!sys.filesForDirectory(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, that file is not a directory.");
            return;
        }
        sys.extractZip(fileName, dir);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Extracted archive '" + fileName + ".zip' into directory '" + dir + "'.", channel);
    }

    ,

    exec: function (src, channel, command) {
        var cmd = command[1];
        if (!cmd) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, command not found.");
            return;
        }
        sys.sendHtmlMessage(src, border + "<br><timestamp/> <b>You executed the following command:</b><br><span style='font-family: dejavu sans mono;'>"
        + helpers.escapehtml(cmd) + "</span><br>" + border2, channel);
        sys.system(cmd);
    }

    ,

    /**
        ---------------
        Script Settings
        ---------------
    **/
    scriptsettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Script Settings</h2>"
        + "<br>"
        + "Automatic updating is currently turned <b>" + (UPDATE_KEY !== "" ? "on" : "off") + "</b>.<br>";
        if (UPDATE_KEY !== "") {
            commandsmessage += "Update frequency: " + helpers.secondsToWording(updateFrequency) + ".<br>"
        }
        commandsmessage += "<br>"
        + "<b>" + helpers.user("/reload") + "</b>: reloads the scripts from the local files.<br>"
        + "<b>" + helpers.user("/update ") + helpers.arg("module") + "</b>: updates the <b>module</b> module. Updates the main script file by default.<br>"
        + "<b>" + helpers.user("/silentupdate ") + helpers.arg("module") + "</b>: silently updates the <b>module</b> module. Updates the main script file by default. Also /supdate.<br>"
        + "<b>" + helpers.user("/updateplugin ") + helpers.arg("plugin") + "</b>: updates the <b>plugin</b> plugin. Updates the main script file by default.<br>"
        + "<b>" + helpers.user("/silentupdateplugin ") + helpers.arg("plugin") + "</b>: silently updates the <b>plugin</b> plugin. Updates the main script file by default. Also /supdateplugin.<br>";
        if (UPDATE_KEY === "") {
            commandsmessage += "<b>" + helpers.user("/setgithubkey ") + helpers.arg("key") + "</b>: sets the GitHub API key for automatic script updates to <b>key</b>.<br>"
            + "Requires the server folder to be a clone of the <tt>fc-scripts</tt> git repository. <u>Be careful with this command!</u> Entering an invalid API key will rate limit the updates!<br>";
        } else {
            commandsmessage += "<b>" + helpers.user("/removegithubkey") + "</b>: removes your GitHub API key. This will disable automatic script updates.<br>"
            + "<b>" + helpers.user("/updatefrequency ") + helpers.arg("number") + "</b>: changes the frequency of automatic updating to once every <b>number</b> seconds.<br>";
        }
        commandsmessage += "<b>" + helpers.user("/var ") + helpers.arg("variable") + helpers.arg2("*html") + "</b>: displays the value of <b>variable</b>. If <b>html</b> is specified, enables HTML.<br>"
        + "<b>" + helpers.user("/time ") + helpers.arg("command") + "</b>: runs <b>command</b> and prints its runtime. An indefinite number of arguments can be passed to this command.<br>"
        + "<b>" + helpers.user("/eval ") + helpers.arg("code") + "</b>: executes <b>code</b>.<br>"
        + "<b>" + helpers.user("/silenteval ") + helpers.arg("code") + "</b>: executes <b>code</b> silently. Also /seval.<br>"
        + "<b>" + helpers.user("/secretsilenteval ") + helpers.arg("code") + "</b>: executes <b>code</b> silently without posting it to even yourself. Also /sseval.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    reload: function (src, channel, command) {
        try {
            for (var i in SCRIPT_MODULES) {
                print("Loaded module " + SCRIPT_MODULES[i]);
                sys.exec(SCRIPTS_FOLDER + SCRIPT_MODULES[i]);
                moduleLoaded[i] = true;
            }
            if (helpers.isInArray("plugins", sys.dirsForDirectory(sys.cwd()))) {
                for (var i in SCRIPT_PLUGINS) {
                    if (sys.fexists(PLUGINS_FOLDER + SCRIPT_PLUGINS[i])) {
                        print("Loaded plugin " + SCRIPT_PLUGINS[i]);
                        sys.exec(PLUGINS_FOLDER + SCRIPT_PLUGINS[i]);
                        pluginLoaded[i] = true;
                    }
                }
            }
            sys.exec(SCRIPTS_FOLDER + "main.js");
            print("Script Check: OK");
            sys.sendHtmlOwner(helpers.bot(bots.script) + "The server scripts have been reloaded successfully.", channel);
        } catch (e) {
            sys.sendHtmlOwner(helpers.bot(bots.script) + "An error occurred while reloading the scripts: " + e, channel);
        }
    }

    ,

    update: function (src, channel, command) {
        var name = sys.name(src), date = new Date(), silent = command[0].substr(0, 6), module, time;
        var noncmds = ["main", "helpers", "handler", "base64", "tierchecks"];
        if (!command[1]) {
            if (src) {
                silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Downloading scripts...", channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + "Downloading scripts...", channel);
            }
            sys.webCall(SCRIPT_URL + "main.js", function (resp) {
                if (resp === "") {
                    if (silent == "silent" && src) {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else if (src) {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    }
                    return;
                }
                sys.write(SCRIPTS_FOLDER + "main.js", resp);
                try {
                    sys.changeScript(sys.read("scripts.js"));
                    sys.exec(SCRIPTS_FOLDER + "main.js");
                } catch (e) {
                    if (src) {
                        silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + e, channel);
                    }
                    return;
                }
                time = new Date() - date;
                if (silent == "silent" && src) {
                    sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The server scripts have been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                } else if (src) {
                    sys.sendHtmlOwner(helpers.bot(bots.script) + name + " has reloaded the server scripts! [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                }
            });
        } else if (command[1] == "all") {
            for (var i = 0; i < SCRIPT_MODULES.length; i++) {
                this.update(src, channel, [command[0], SCRIPT_MODULES[i].split('.')[0].replace(/cmds/, "")]);
            }
        } else {
            module = command[1];
            if (!helpers.isInArray(module, noncmds)) {
                module += "cmds";
            }
            if (!helpers.isInArray(module + ".js", SCRIPT_MODULES)) {
                helpers.starfox(src, channel, command, bots.main, "Error 404, module '" + module + "' not found.");
                return;
            }
            if (src) {
                silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Downloading scripts...", channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + "Downloading scripts...", channel);
            }
            sys.webCall(SCRIPT_URL + module + ".js", function (resp) {
                if (resp === "") {
                    if (silent == "silent" && src) {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else if (src) {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    }
                    return;
                }
                sys.write(SCRIPTS_FOLDER + "" + module + ".js", resp);
                try {
                    sys.exec(SCRIPTS_FOLDER + "" + module + ".js");
                } catch (e) {
                    if (src) {
                        silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + e);
                    }
                    return;
                }
                time = new Date() - date;
                if (module == "main") {
                    if (silent == "silent" && src) {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The server scripts have been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                    } else if (src) {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + name + " has reloaded the server scripts! [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                    }
                } else {
                    if (silent == "silent" && src) {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The " + module.replace("cmds", "") + " script module has been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                    } else if (src) {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + name + " has reloaded the " + module.replace("cmds", "") + " script module! [Time elapsed: " + (time / 1000) + " seconds.]", channel);
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

    updateplugin: function (src, channel, command) {
        var name = sys.name(src), date = new Date(), silent = command[0].substr(0, 6), plugin, time;
        var noncmds = ["party", "rr", "roulette"];
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, plugin not found.");
            return;
        }
        if (command[1] == "all") {
            for (var i = 0; i < SCRIPT_PLUGINS.length; i++) {
                this.updateplugin(src, channel, [command[0], SCRIPT_PLUGINS[i].split('.')[0]].replace(/cmds/, ""));
            }
        } else {
            plugin = command[1];
            if (!helpers.isInArray(plugin, noncmds)) {
                plugin += "cmds";
            }
            if (!helpers.isInArray(plugin + ".js", SCRIPT_PLUGINS)) {
                helpers.starfox(src, channel, command, bots.main, "Error 404, plugin '" + plugin + "' not found.");
                return;
            }
            silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Downloading scripts...", channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + "Downloading scripts...", channel);
            sys.webCall(PLUGIN_URL + plugin + ".js", function (resp) {
                if (resp === "") {
                    if (silent == "silent") {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    }
                    return;
                }
                sys.write(PLUGINS_FOLDER + plugin + ".js", resp);
                try {
                    sys.exec(PLUGINS_FOLDER + plugin + ".js");
                } catch (e) {
                    silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + e, channel);
                    return;
                }
                time = new Date() - date;
                if (silent == "silent") {
                    sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The " + plugin.replace("cmds", "") + " script plugin has been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                } else {
                    sys.sendHtmlOwner(helpers.bot(bots.script) + name + " has reloaded the " + plugin.replace("cmds", "") + " script plugin! [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                }
            });
        }
        for (var i = SCRIPT_PLUGINS.length; i > 1; i--) {
            if (command[i]) {
                this.updateplugin(src, channel, [command[0], command[i]]);
            }
        }
    }

    ,

    silentupdateplugin: function (src, channel, command) {
        this.updateplugin(src, channel, command);
    }

    ,

    supdateplugin: function (src, channel, command) {
        command[0] = "silentupdateplugin";
        this.updateplugin(src, channel, command);
    }

    ,

    setgithubkey: function (src, channel, command) {
        if (UPDATE_KEY !== "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you already have a GitHub API key set!");
            return;
        }
        if (!sys.fexists(".git")) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, you cannot set a GitHub API key without a git repository. Please clone <tt>fc-scripts</tt> in your server folder.");
            return;
        }
        var key = command[1];
        if (!key) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, key not found.");
            return;
        }
        UPDATE_KEY = key;
        helpers.saveData("UPDATE_KEY");
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Your GitHub API key has been set.", channel);
    }

    ,

    removegithubkey: function (src, channel, command) {
        if (UPDATE_KEY === "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you cannot remove a GitHub API key when you don't have one!");
            return;
        }
        UPDATE_KEY = "";
        helpers.saveData("UPDATE_KEY");
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Your GitHub API key has been removed.", channel);
    }

    ,

    updatefrequency: function (src, channel, command) {
        var freq = command[1];
        if (!freq) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, frequency not found.");
            return;
        }
        if (isNaN(freq)) {
            helpers.starfox(src, channel, command, bots.script, "Error 403, you have to specify a number of seconds.");
            return;
        }
        updateFrequency = freq;
        helpers.saveData("updateFrequency");
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The automatic update frequency has been set to " + helpers.secondsToWording(freq) + ".", channel);
        return;
    }

    ,

    "var": function (src, channel, command) {
        var allow = true, result, html;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, variable not found.");
            return;
        }
        html = (!command[2] ? false : true);
        try {
            result = eval(command[1]);
        } catch (e) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, variable is undefined.");
            return;
        }
        if (typeof(result) == "undefined") {
            helpers.starfox(src, channel, command, bots.script, "Error 404, variable is undefined.");
            return;
        }
        if (typeof(result) == "object") {
            result = JSON.stringify(result);
        }
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The evaluated content of '" + helpers.escapehtml(command[1]) + "' is " + (html ? result : helpers.escapehtml(result)) + ".", channel);
        return;
    }

    ,

    time: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), starttime, runtime;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, command not found.");
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
        var name = sys.name(src), silent = command[0].slice(0, -4), starttime, runtime;
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (silent == "silent") {
            sys.sendHtmlMessage(src, border + "<br><timestamp/> <b>You executed the following code silently:</b><br><span style='font-family: dejavu sans mono;'>"
            + helpers.escapehtml(command) + "</span><br>" + border2, channel);
        } else {
            sys.sendHtmlAll(border + "<br><timestamp/> <b>" + helpers.user(name) + " executed the following code:</b><br><span style='font-family: dejavu sans mono;'>"
            + helpers.escapehtml(command) + "</span><br>" + border2, channel);
        }
        starttime = new Date();
        try {
            eval(command);
            if (silent == "silent") {
                sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Script ran successfully.", channel);
            } else {
                sys.sendHtmlAll(helpers.bot(bots.script) + "Script ran successfully.", channel);
            }
        }
        catch (error) {
            if (silent == "silent") {
                sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred: " + error, channel);
            } else {
                sys.sendHtmlAll(helpers.bot(bots.script) + "An error occurred: " + error, channel);
            }
        }
        runtime = new Date() - starttime;
        if (silent == "silent") {
            sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The eval runtime was " + runtime + " milliseconds.", channel);
        } else {
            sys.sendHtmlAll(helpers.bot(bots.script) + "The eval runtime was " + runtime + " milliseconds.", channel);
        }
    }

    ,

    silenteval: function (src, channel, command) {
        this.eval(src, channel, command);
    }

    ,

    seval: function (src, channel, command) {
        command[0] = "silenteval";
        this.eval(src, channel, command);
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
        ------------------
        Whitelist Settings
        ------------------
    **/
    whitelistsettings: function (src, channel, command) {
        var commandsmessage = border
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
        + border2;
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
        helpers.saveData("open");
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
        helpers.saveData("open");
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
        helpers.saveData("allowed");
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
        helpers.saveData("allowed");
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
        helpers.saveData("allowedrange");
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
        helpers.saveData("allowedrange");
        sys.sendHtmlMessage(src, helpers.bot(bots.priv) + "You disallowed the range " + range + " through server closure and bans.", channel);
    }

    ,

    /**
        ----------------
        AntiDoS Settings
        ----------------
    **/
    antidossettings: function (src, channel, command) {
        var trustedIps = sys.trustedIps(), dosChannel = sys.dosChannel() === "" ? "none" : sys.dosChannel(), commandsmessage = border
        + "<h2>Owner Commands ~ Anti DoS Settings</h2>"
        + "<br>"
        + "The current anti DoS message channel is " + (dosChannel == "none" ? "none" : helpers.channelLink(dosChannel)) + ".<br>"
        + "The following IPs are trusted and will bypass the server anti DoS:<br>"
        + "<br>"
        + trustedIps.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/trust ") + helpers.arg("IP") + "</b> to add <b>IP</b> to the trusted IPs.<br>"
        + "Use <b>" + helpers.user("/distrust ") + helpers.arg("IP") + "</b> to remove <b>IP</b> from the trusted IPs.<br>"
        + "Use <b>" + helpers.user("/doschannel ") + helpers.arg("channel") + "</b> to change the anti DoS message channel to <b>channel</b>.<br>"
        + "<br><timestamp/><br>"
        + border2;
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
        var commandsmessage = border
        + "<h2>Owner Commands ~ Flood Settings</h2>"
        + "<br>"
        + "<b>Flood Level:</b> " + floodlevel + "<br>"
        + "<b>Flood Time:</b> " + floodtime + " seconds<br>"
        + "<b>Message Allowance:</b> " + allowance + " messages<br>"
        + "Someone will be flooding if they exceed " + allowance + " messages in " + floodtime + " seconds,";
        if (floodlevel >= 4) {
            commandsmessage += " regardless of their auth level.<br>";
        } else {
            commandsmessage += " if their auth level is lower than " + AUTH_NAMES[floodlevel] + ".<br>";
        }
        commandsmessage += "<br>"
        + "Use <b>" + helpers.user("/floodlevel ") + helpers.arg("number") + "</b> to change the flood level into <b>number</b>.<br>"
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
        floodlevel = parseInt(command[1]);
        helpers.saveData("floodlevel");
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
        helpers.saveData("floodtime");
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
        helpers.saveData("allowance");
        sys.sendHtmlMessage(src, helpers.bot(bots.flood) + "The message allowance has been changed to " + allowance + " messages.", channel);
    }

    ,

    /**
        ---------------
        Server Settings
        ---------------
    **/
    serversettings: function (src, channel, command) {
        var commandsmessage = border, serverprivate = sys.isServerPrivate(), serveropen;
        var ports = sys.serverPorts().length, proxies = sys.proxyServers().length;
        var uptime = sys.profileDump().split('\n')[0].split(',')[0].split(':')[1].slice(1, -2);
        var d = new Date(), day = d.getDay(), date, time;
        date = d.getDate(), month = d.getMonth(), year = d.getFullYear();
        date = DAYS[day] + ", " + MONTHS[month] + " " + date + ", " + year;
        time = d.toTimeString().substr(0, 15);
        time = time.replace("+01", "+1 (Central European Time)");
        time = time.replace("+02", "+2 (Central European Summer Time)");
        time = time.replace("-04", "-4 (Eastern Daylight Time)");
        time = time.replace("-05", "-5 (Eastern Standard Time)");
        serverprivate = (serverprivate ? "<font color='red'>No</font>" : "<b><font color='green'>Yes</font></b>");
        serveropen = (open ? "<b><font color='green'>Yes</font></b>" : "<font color='red'>No</font>");
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
        + "Use <b>" + helpers.user("/restart") + "</b> to restart the server. Windows only.<br>"
        + "Use <b>" + helpers.user("/softreset") + "</b> to set all the customisable settings back to their default values. Will ask for confirmation before doing so.<br>"
        + "Use <b>" + helpers.user("/hardreset") + "</b> to reinitialize the scripts, erasing <u>all data</u> in the process, then shut down the server. Will ask for confirmation before doing so.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    "private": function (src, channel, command) {
        sys.makeServerPublic(false);
        sys.sendHtmlMain(helpers.bot(bots.priv) + "<b>" + helpers.user(sys.name(src)) +
        " made the server " + helpers.arg("private") + "!</b>");
    }

    ,

    "public": function (src, channel, command) {
        sys.makeServerPublic(true);
        sys.sendHtmlMain(helpers.bot(bots.priv) + "<b>" + helpers.user(sys.name(src)) +
        " made the server " + helpers.arg("public") + "!</b>");
    }

    ,

    shutdown: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlMain(helpers.bot(bots.priv) + "<b>" + helpers.user(name) + " has shut down the server!</b>");
        sys.setTimer(function () {
            sys.shutDown();
        }, 200, 0);
    }

    ,

    restart: function (src, channel, command) {
        var name = sys.name(src), os = sys.os();
        if (os == "windows") {
            sys.setTimer(function () {
                sys.shutDown();
            }, 200, 0);
            sys.system("start Server.exe");
        } else {
            sys.setTimer(function () {
                sys.system("./restart.sh");
            }, 200, 0);
        }
        sys.sendHtmlMain(helpers.bot(bots.priv) + "<b>" + helpers.user(name) + " has restarted the server!</b>");
    }

    ,

    softreset: function (src, channel, command) {
        var confirmation = command[1], message;
        if (!confirmation || confirmation != "confirm") {
            message = helpers.bot(bots.main) + "Are you sure you want to do a soft reset? ";
            message += (helpers.isAndroid(src) ? "Type '/softreset confirm' if you are sure." : "<a href='po:send//softreset confirm'>Click here if you are sure.</a>");
            sys.sendHtmlMessage(src, message, channel);
            return;
        }
        sys.write(DATA_FOLDER + "allowance.txt", 8);
        sys.write(DATA_FOLDER + "floodtime.txt", 10);
        sys.write(DATA_FOLDER + "floodlevel.txt", 1);
        sys.write(DATA_FOLDER + "botcolor.txt", "#318739");
        sys.write(DATA_FOLDER + "botsymbol.txt", "±");
        sys.write(DATA_FOLDER + "servertopic.txt", "Welcome to " + sys.getServerName() + "!");
        sys.write(DATA_FOLDER + "botsymbolcolor.txt", "#318739");
        sys.write(DATA_FOLDER + "bordercolor.txt", "#00008B");
        sys.write(DATA_FOLDER + "servertopiccolor.txt", "#FF0000");
        sys.write(DATA_FOLDER + "channeltopiccolor.txt", "#FFA500");
        sys.write(DATA_FOLDER + "welcomemsg.txt", "Please welcome ~Player~ to ~Server~!");
        sys.write(DATA_FOLDER + "channelwelcomemsg.txt", "Please welcome ~Player~ to ~Channel~!");
        sys.write(DATA_FOLDER + "nopermissionmsg.txt", "Can't let you do that, Star ~Player~!");
        sys.write(DATA_FOLDER + "allowed.txt", '["127.0.0.1"]');
        sys.write(DATA_FOLDER + "cmdcolors.txt", '["#4169E1","#008000","#FF0000","#FFA500","#FFD700","#0000FF"]');
        sys.write(DATA_FOLDER + "exceptions.txt", '["cofagrigus"]');
        sys.write(DATA_FOLDER + "allowedrange.txt", '["192.168"]');
        sys.write(DATA_FOLDER + "silentcmds.txt", '["future","spoiler","seval","sseval","skick",' +
        '"invisibleowner","invisible","invis","silentupdate","silenteval","secretsilenteval","silentkick","supdate","silentupdateplugin", "supdateplugin"]');
        sys.write(DATA_FOLDER + "nameblocklist.txt", '["fuck","bitch","gay","fag","sex","condom",' +
        '"vagina","dildo","vibrator","orgasm","cunt","cock","dick","asshole","blow","slut","pussy","rape","penis",' +
        '"horny","intercourse","nigger","nigga","shit","cum","bastard","anus","porn","fap","hitler",":","masturbat","rapist"]');
        sys.write(DATA_FOLDER + "bots.txt", '{"attack":"AttackBot","armyof":"ArmyBot","auth":"AuthBot","ban":"BanBot","caps":"CapsBot","channel":"ChannelBot",' +
        '"clear":"ClearBot","command":"CommandBot","flood":"FloodBot","fun":"FunBot","gigaban":"GigabanBot","idle":"IdleBot","kick":"KickBot",' +
        '"main":"Bot","megaban":"MegabanBot","mute":"MuteBot","name":"NameBot","party":"PartyBot","pass":"PassBot",' +
        '"priv":"PrivacyBot","reverse":"ReverseBot","rr":"RussiaBot","russia":"RussiaBot","script":"ScriptBot","silence":"SilenceBot",' +
        '"spy":"WatchBot","starfox":"Wolf","status":"StatusBot","tour":"TourBot","topic":"TopicBot","warn":"WarnBot","welcome":"WelcomeBot",' +
        '"roulette": "RouletteBot"}');
        sys.write(DATA_FOLDER + "bigtexts.txt", "{}");
        sys.write(DATA_FOLDER + "banmsg.txt", "{}");
        sys.write(DATA_FOLDER + "kickmsg.txt", "{}");
        sys.write(DATA_FOLDER + "mutemsg.txt", "{}");
        sys.write(DATA_FOLDER + "authtitles.txt", "{}");
        sys.write(DATA_FOLDER + "selfkickmsg.txt", "{}");
        sys.write(DATA_FOLDER + "rangebanmsg.txt", "{}");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your data has been soft reset successfully.", channel);
    }

    ,

    hardreset: function (src, channel, command) {
        var confirmation = command[1], dataFiles = sys.filesForDirectory(DATA_FOLDER), message;
        if (!confirmation || confirmation != "confirm") {
            message = helpers.bot(bots.main) + "Are you sure you want to do a hard reset? Doing this will erase ALL your data! ";
            message += (helpers.isAndroid(src) ? "Type '/hardreset confirm' if you are sure." : "<a href='po:send//hardreset confirm'>Click here if you are sure.</a>");
            sys.sendHtmlMessage(src, message, channel);
            return;
        }
        sys.write("bansites.txt", sys.read(DATA_FOLDER + "bansites.txt"));
        sys.write("proxy_list.txt", sys.read(DATA_FOLDER + "proxylist.txt"));
        for (var i in dataFiles) {
            sys.rm(DATA_FOLDER + dataFiles[i]);
        }
        sys.rmdir("data");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your data has been hard reset successfully. The server will now shut down.", channel);
        this.shutdown(src, channel, command);
    }

    ,

    /**
        ---------------
        Silent Settings
        ---------------
    **/
    silentsettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Silent Settings</h2>"
        + "<br>"
        + "The following commands will currently bypass logging in " + helpers.channelLink(permchannels[0]) + ":<br>"
        + "<br>"
        + silentcommands.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/addsilentcommand ") + helpers.arg("command") + "</b> to make <b>command</b> a silent command. Also /addsc.<br>"
        + "Use <b>" + helpers.user("/removesilentcommand ") + helpers.arg("command") + "</b> to make <b>command</b> from the list of silent commands. Also /removesc.<br>"
        + "<br><timestamp/><br>"
        + border2;
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
        helpers.saveData("silentcommands");
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
        helpers.saveData("silentcommands");
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
        var commandsmessage = border
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
        + border2;
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
        helpers.saveData("nameblocklist");
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
        helpers.saveData("nameblocklist");
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
        helpers.saveData("exceptions");
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
        helpers.saveData("exceptions");
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The name '" + name + "' will no longer bypass filtering.", channel);
    }

    ,

    exception: function (src, channel, command) {
        this.addexception(src, channel, command);
    }

    ,

    /**
        ----------------
        Message Settings
        ----------------
    **/
    messagesettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Message Settings</h2>"
        + "<br>"
        + "Current messages:<br>"
        + "<br>"
        + "<b>Welcome message: </b>" + welcomeMessage + "<br>"
        + "<b>Leave message: </b>" + leaveMessage + "<br>"
        + "<b>Channel welcome message: </b>" + channelWelcomeMessage + "<br>"
        + "<b>Channel leave message: </b>" + channelLeaveMessage + "<br>"
        + "<b>No permission message: </b>" + noPermissionMessage + "<br>"
        + "<br>"
        + "Syntax for the messages:<br>"
        + "<br>"
        + "<b>~Player~</b> will be replaced by someone's username.<br>"
        + "<b>~Server~</b> will be replaced by the server name.<br>"
        + "<b>~Channel~</b> will be replaced by the channel name.<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/layout") + "</b> to toggle the layout of certain messages between the old one and the new one.<br>"
        + "Use <b>" + helpers.user("/welcomemsg ") + helpers.arg("text") + "</b> to change the welcome message to <b>text</b>.<br>"
        + "Use <b>" + helpers.user("/leavemsg ") + helpers.arg("text") + "</b> to change the leave message to <b>text</b>.<br>"
        + "Use <b>" + helpers.user("/channelwelcomemsg ") + helpers.arg("text") + "</b> to change the channel welcome message to <b>text</b>.<br>"
        + "Use <b>" + helpers.user("/channelleavemsg ") + helpers.arg("text") + "</b> to change the channel leave message to <b>text</b>.<br>"
        + "Use <b>" + helpers.user("/nopermissionmsg ") + helpers.arg("text") + "</b> to change the message someone gets when trying to use a command for higher auth to <b>text</b>.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
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

    welcomemsg: function (src, channel, command) {
        var message = command[1];
        if (!message) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current welcome message is: " + welcomeMessage + ".", channel);
            return;
        }
        welcomeMessage = message;
        helpers.saveData("welcomeMessage");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The welcome message has been changed successfully.", channel);
    }

    ,

    leavemsg: function (src, channel, command) {
        var message = command[1];
        if (!message) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current leave message is: " + leaveMessage + ".", channel);
            return;
        }
        leaveMessage = message;
        helpers.saveData("leaveMessage");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The leave message has been changed successfully.", channel);
    }

    ,

    channelwelcomemsg: function (src, channel, command) {
        var message = command[1];
        if (!message) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current channel welcome message is: " + channelWelcomeMessage + ".", channel);
            return;
        }
        channelWelcomeMessage = message;
        helpers.saveData("channelWelcomeMessage");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The channel welcome message has been changed successfully.", channel);
    }

    ,

    channelleavemsg: function (src, channel, command) {
        var message = command[1];
        if (!message) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current channel leave message is: " + channelLeaveMessage + ".", channel);
            return;
        }
        channelLeaveMessage = message;
        helpers.saveData("channelLeaveMessage");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The channel leave message has been changed successfully.", channel);
    }

    ,

    nopermissionmsg: function (src, channel, command) {
        var message = command[1];
        if (!message) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The current no permission message is: " + noPermissionMessage + ".", channel);
            return;
        }
        nopermissionmsg = message;
        helpers.saveData("noPermissionMessage");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The no permission message has been changed successfully.", channel);
    }

    ,

    /**
        --------------
        Color Settings
        --------------
    **/
    colorsettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ " + helpers.cap(command[0].slice(0, -8)) + " Settings</h2>"
        + "<br>"
        + "Current colorings:<br>"
        + "<br>"
        + "<b>Border " + command[0].slice(0, -8) + ":</b> " + borderColor + "<br>"
        + "<b>Server topic " + command[0].slice(0, -8) + ":</b> " + serverTopicColor + "<br>"
        + "<b>Channel topic " + command[0].slice(0, -8) + ":</b> " + channelTopicColor + "<br>"
        + "<b>Command " + command[0].slice(0, -8) + "s:</b> " + cmdcolors.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/bordercolor ") + helpers.arg("color") + "</b> to change the border color to <b>color</b>. Also /bordercolour.<br>"
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
        var color = command[1];
        if (!color) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, " + command[0].slice(6) + " not found.");
            return;
        }
        if (!sys.validColor(color)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + command[0].slice(6) + ".");
            return;
        }
        borderColor = sys.hexColor(color);
        helpers.saveData("borderColor");
        border = "<font color='" + sys.hexColor(color) + "'><b>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></b></font>";
        border2 = "<font color='" + sys.hexColor(color) + "'><b>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;" +
        "&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</b></font>";
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The border " + command[0].slice(6) + " has been changed to " + color + ".", channel);
    }

    ,

    bordercolour: function (src, channel, command) {
        this.bordercolor(src, channel, command);
    }

    ,

    servertopiccolor: function (src, channel, command) {
        var color = command[1];
        if (!color) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, " + command[0].slice(11) + " not found.");
            return;
        }
        if (!sys.validColor(color)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + command[0].slice(11) + ".");
            return;
        }
        serverTopicColor = sys.hexColor(color);
        helpers.saveData("serverTopicColor");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The server topic " + command[0].slice(11) + " has been changed to " + color + ".", channel);
    }

    ,

    servertopiccolour: function (src, channel, command) {
        this.servertopiccolor(src, channel, command);
    }

    ,

    channeltopiccolor: function (src, channel, command) {
        var color = command[1];
        if (!color) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, " + command[0].slice(12) + " not found.");
            return;
        }
        if (!sys.validColor(color)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + command[0].slice(12) + ".");
            return;
        }
        channelTopicColor = sys.hexColor(color);
        helpers.saveData("channelTopicColor");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The channel topic " + command[0].slice(12) + " has been changed to " + color + ".", channel);
    }

    ,

    channeltopiccolour: function (src, channel, command) {
        this.channeltopiccolor(src, channel, command);
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
            helpers.starfox(src, channel, command, bots.command, "Error 404, " + command[0].slice(7) + " not found.");
            return;
        }
        if (!sys.validColor(command[2])) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + command[0].slice(7) + ".");
            return;
        }
        cmdcolors[command[1]] = sys.hexColor(command[2]);
        helpers.saveData("cmdcolors");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Command " + command[0].slice(7) + " " + command[1] + " has been changed to " + command[2] + ".", channel);
    }

    ,

    commandcolour: function (src, channel, command) {
        this.commandcolor(src, channel, command);
    }

    ,

    /**
        -------------
        Rule Settings
        -------------
    **/
    rulesettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Rule Settings</h2>"
        + "<br>"
        + "Current server rules:<br>"
        + "<br>";
        for (var i = 1; i <= rules.rules.length; i++) {
            commandsmessage += helpers.bot("• " + botsymbol + "Rule " + i + ": " + rules.rules[i - 1]) + "<br>" + rules.explanations[i - 1] + "<br>";
        }
        commandsmessage += "<br>"
        + "Use <b>" + helpers.user("/changerule ") + helpers.arg("number") + helpers.arg2("*rule") + "</b> to change rule <b>number</b> to <b>rule</b>.<br>"
        + "Use <b>" + helpers.user("/explanation ") + helpers.arg("number") + helpers.arg2("*explanation") + "</b> to change rule explanation <b>number</b> to <b>explanation</b>.<br>"
        + "Use <b>" + helpers.user("/addrule ") + helpers.arg("rule") + helpers.arg2("*explanation") + "</b> to add <b>rule</b> with <b>explanation</b> to the list of rules.<br>"
        + "Use <b>" + helpers.user("/removerule ") + helpers.arg("number") + "</b> to remove rule <b>number</b> from the list of rules.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    changerule: function (src, channel, command) {
        var number = command[1], rule;
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
        helpers.saveData("rules");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Rule " + number + " has been changed to '" + rule + "'.", channel);
    }

    ,

    explanation: function (src, channel, command) {
        var number = command[1], explanation;
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
        helpers.saveData("rules");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The explanation of rule " + number + " has been changed to '" + explanation + "'.", channel);
    }

    ,

    addrule: function (src, channel, command) {
        var rule = command[1], number = rules.rules.length, explanation;
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
        helpers.saveData("rules");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Rule " + (number + 1) + " has been added to the server rules.", channel);
    }

    ,

    removerule: function (src, channel, command) {
        var number = command[1], previous = 1, changing = false;
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
        helpers.saveData("rules");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Rule " + number + " has been removed. The other rule numbers have been changed accordingly.", channel);
    }

    ,

    /**
        -------------
        List Settings
        -------------
    **/
    listsettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ List Settings</h2>"
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
        var list = command[1], color;
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
        helpers.saveData("listcolors");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The " + command[0].slice(4) + " of the " + list + " list has been changed to " + color + ".", channel);
    }

    ,

    /**
        ----------------
        Channel Settings
        ----------------
    **/
    channelsettings: function (src, channel, command) {
        var permChannelList = [], commandsmessage = border
        + "<h2>Owner Commands ~ Channel Settings</h2>"
        + "<br>"
        + "Current permanent channel names:<br>"
        + "<br>";
        for (var i in permchannels) {
            permChannelList.push(helpers.channelLink(permchannels[i]));
        }
        commandsmessage += permChannelList.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/registerall") + "</b> to register all of the permanent channels and give them their default settings. Make sure you have chosen a main channel name before doing this,<br>"
        + "or it will have to be reregistered when you change its name.<br>"
        + "Use <b>" + helpers.user("/unregisterall") + "</b> to unregister all of the permanent channels. Will ask for confirmation before doing so.<br>"
        + "Use <b>" + helpers.user("/renamechannel ") + helpers.arg("name") + helpers.arg2("*new name") + "</b> to change the name of a perm channel from <b>name</b> to <b>new name</b>.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    registerall: function (src, channel, command) {
        cusercommands.registerthis(src, 0, ["registerthis"]);
        cownercommands.perm(src, 0, ["perm"]);
        for (var i in permchannels) {
            cusercommands.registerthis(src, sys.channelId(permchannels[i]), ["registerthis"]);
            cownercommands.perm(src, sys.channelId(permchannels[i]), ["perm"]);
        }
        cmodcommands.cclose(src, sys.channelId(permchannels[0]), ["cclose", 1]);
        cownercommands.priv(src, sys.channelId(permchannels[0]), ["priv"]);
        cmodcommands.cclose(src, sys.channelId(permchannels[1]), ["cclose", 1]);
        cmodcommands.cclose(src, sys.channelId(permchannels[2]), ["cclose", 3]);
        cownercommands.priv(src, sys.channelId(permchannels[2]), ["priv"]);
        if (helpers.isLoaded("party.js")) {
            cownercommands.priv(src, sys.channelId(permchannels[3]), ["priv"]);
        }
        if (helpers.isLoaded("rr.js")) {
            cownercommands.priv(src, sys.channelId(permchannels[4]), ["priv"]);
        }
        if (helpers.isLoaded("roulette.js")) {
            cownercommands.priv(src, sys.channelId(permchannels[5]), ["priv"]);
        }
        if (helpers.isLoaded("safari.js")) {
            cownercommands.priv(src, sys.channelId(permchannels[6]), ["priv"]);
        }
        helpers.saveData("regchannels");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "All permanent channels have been registered successfully and have been given their default settings.", channel);
    }

    ,

    unregisterall: function (src, channel, command) {
        var confirmation = command[1], message;
        if (!confirmation || confirmation != "confirm") {
            message = helpers.bot(bots.main) + "Are you sure you want to unregister all permanent channels? ";
            message += (helpers.isAndroid(src) ? "Type '/unregisterall confirm' if you are sure." : "<a href='po:send//unregisterall confirm'>Click here if you are sure.</a>");
            sys.sendHtmlMessage(src, message, channel);
            return;
        }
        cownercommands.registerthis(src, 0, ["unregisterthis"]);
        for (var i in permchannels) {
            cownercommands.unregisterthis(src, sys.channelId(permchannels[i]), ["unregisterthis"]);
        }
        if (helpers.isLoaded("party.js")) {
            cownercommands.unregisterthis(src, sys.channelId(permchannels[3]), ["unregisterthis"]);
        }
        if (helpers.isLoaded("rr.js")) {
            cownercommands.unregisterthis(src, sys.channelId(permchannels[4]), ["unregisterthis"]);
        }
        if (helpers.isLoaded("roulette.js")) {
            cownercommands.unregisterthis(src, sys.channelId(permchannels[5]), ["unregisterthis"]);
        }
        if (helpers.isLoaded("safari.js")) {
            cownercommands.unregisterthis(src, sys.channelId(permchannels[6]), ["unregisterthis"]);
        }
        helpers.saveData("regchannels");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "All permanent channels have been unregistered successfully.", channel);
    }

    ,

    renamechannel: function (src, channel, command) {
        var oldName = command[1], newName, oldName, lower;
        if (!oldName) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, name not found.");
            return;
        }
        for (var i in permchannels) {
            if (permchannels[i] == oldName) {
                newName = command[2];
                if (!newName) {
                    helpers.starfox(src, channel, command, bots.command, "Error 404, new name not found.");
                    return;
                }
                oldName = permchannels[i];
                lower = oldName.toLowerCase();
                if (regchannels[lower]) {
                    regchannels[newName.toLowerCase()] = regchannels[lower];
                    if (regchannels[newName.toLowerCase()].topic == "Welcome to " + oldName + "!") {
                        regchannels[newName.toLowerCase()].topic = "Welcome to " + newName + "!";
                    }
                    delete regchannels[lower];
                    helpers.saveData("regchannels");
                }
                permchannels[i] = newName;
                helpers.saveData("permchannels");
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The permanent channel '" + oldName + "' is now called '" + newName + "'. Will take effect upon the next server restart.", channel);
                return;
            }
        }
        helpers.starfox(src, channel, command, bots.command, "Error 403, invalid name.");
    }

    ,

    /**
        -------------
        Miscellaneous
        -------------
    **/
    miscellaneous: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Miscellaneous</h2>"
        + "<br>";
        if (API_KEY === "") {
            commandsmessage += "<b>" + helpers.user("/setipkey ") + helpers.arg("key") + "</b>: sets the IPinfoDB API key for country and time zone retrieval to <b>key</b>.<br>"
            + "<u>Be careful with this command!</u> Entering an invalid API key will break things!<br>";
        } else {
            commandsmessage += "<b>" + helpers.user("/removeipkey") + "</b>: removes your IPinfoDB API key. This will disable country and time zone retrieval and reset all corresponding data.<br>";
        }
        if (GOOGLE_KEY === "") {
            commandsmessage += "<b>" + helpers.user("/setgooglekey ") + helpers.arg("key") + "</b>: sets the Google API key for youtube links <b>key</b>.<br>"
            + "<u>Be careful with this command!</u> Entering an invalid API key will break things!<br>";
        } else {
            commandsmessage += "<b>" + helpers.user("/removegooglekey") + "</b>: removes your Google API key. This will disable youtube link information and the /listen command.<br>";
        }
        commandsmessage += "<b>" + helpers.user("/clearpass ") + helpers.arg("player") + "</b>: clears <b>player</b>'s password.<br>"
        + "<b>" + helpers.user("/servertopic ") + helpers.arg("text") + "</b>: changes the server topic to <b>text</b>.<br>"
        + "<b>" + helpers.user("/regchannelinfo") + "</b>: lists all registered channels and their info.<br>"
        + "<b>" + helpers.user("/commandlist") + "</b>: lists all available commands. Also /allcommands.<br>"
        + "<b>" + helpers.user("/stopbattles") + "</b>: disallows battles to be started.<br>"
        + "<b>" + helpers.user("/resumebattles") + "</b>: allows battles to be started again.<br>"
        + "<b>" + helpers.user("/reloadtiers") + "</b>: reloads the server tier list.<br>"
        + "<b>" + helpers.user("/exportmembers") + "</b>: exports the member database.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    setipkey: function (src, channel, command) {
        if (API_KEY !== "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you already have an IPinfoDB API key set!");
            return;
        }
        var api = command[1];
        if (!api) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, API key not found.");
            return;
        }
        API_KEY = api;
        helpers.saveData("API_KEY");
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
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your IPinfoDB API key has been set.", channel);
    }

    ,

    removeipkey: function (src, channel, command) {
        if (API_KEY === "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you cannot remove an IPinfoDB API key when you don't have one!");
            return;
        }
        API_KEY = "";
        countryname = {};
        cityname = {};
        timezone = {};
        helpers.saveData("API_KEY");
        helpers.saveData("countryname");
        helpers.saveData("cityname");
        helpers.saveData("timezone");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your IPinfoDB API key has been removed.", channel);
    }

    ,

    setgooglekey: function (src, channel, command) {
        if (GOOGLE_KEY !== "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you already have a Google API key set!");
            return;
        }
        var api = command[1];
        if (!api) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, API key not found.");
            return;
        }
        GOOGLE_KEY = api;
        helpers.saveData("GOOGLE_KEY");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your Google API key has been set.", channel);
    }

    ,

    removegooglekey: function (src, channel, command) {
        if (GOOGLE_KEY === "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you cannot remove a Google API key when you don't have one!");
            return;
        }
        GOOGLE_KEY = "";
        helpers.saveData("GOOGLE_KEY");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your Google API key has been removed.", channel);
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
        helpers.saveData("servertopic");
        sys.sendHtmlMain(helpers.bot(bots.topic) + "<b>" + helpers.user(name) + " changed the server topic to " + helpers.arg(command[1]) + ".</b>");
    }

    ,

    regchannelinfo: function (src, channel, command) {
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
        "<b>All Commands:</b> " + allcommands.sort().join(", ") + "<br>" +
        "<b>Helpers:</b> " + Object.keys(helpers).sort().join(", ") + "<br><br>" +
        "<b>Total User Commands:</b> " + Object.keys(usercommands).length + "<br>" +
        "<b>Total Moderator Commands:</b> " + Object.keys(modcommands).length + "<br>" +
        "<b>Total Administrator Commands:</b> " + Object.keys(admincommands).length + "<br>" +
        "<b>Total Owner Commands:</b> " + Object.keys(ownercommands).length + "<br>" +
        "<b>Total Channel User Commands:</b> " + Object.keys(cusercommands).length + "<br>" +
        "<b>Total Channel Mod Commands:</b> " + Object.keys(cmodcommands).length + "<br>" +
        "<b>Total Channel Admin Commands:</b> " + Object.keys(cadmincommands).length + "<br>" +
        "<b>Total Channel Owner Commands:</b> " + Object.keys(cownercommands).length;
        if (helpers.isLoaded("funcmds.js")) {
            scriptmessage += "<br><b>Total Fun Commands:</b> " + Object.keys(funcommands).length;
        }
        if (helpers.isLoaded("party.js")) {
            scriptmessage += "<br><b>Total Party Commands:</b> " + Object.keys(partycommands).length;
        }
        if (helpers.isLoaded("rr.js")) {
            scriptmessage += "<br><b>Total Russian Roulette Commands:</b> " + Object.keys(rrcommands).length;
        }
        if (helpers.isLoaded("roulette.js")) {
            scriptmessage += "<br><b>Total Roulette Commands:</b> " + Object.keys(roulettecommands).length;
        }
        if (helpers.isLoaded("safari.js")) {
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

    reloadtiers: function (src, channel, command) {
        sys.reloadTiers();
    }

    ,

    exportmembers: function (src, channel, command) {
        sys.exportMemberDatabase();
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The member database has been successfully exported.", channel);
    }
};
