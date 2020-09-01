/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY CMOD COMMANDS cmodcmds.js
     - by Maribel Hearn, 2012-2015

    This file contains commands that can be
    run by channel moderators.
    ----------------------------------------------
*/

cmodcommands = {
    cmodcommands: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Channel Moderator Commands</h2>"
        + "<br>"
        + "<b>" + helpers.user("/topic ") + helpers.arg("text") + "</b>: changes the entire channel topic to <b>text</b>. Only allowed if you are allowed to remove all of its parts. "
        + "If <b>text</b> is not specified, displays the current channel topic.<br>"
        + "<b>" + helpers.user("/addpart ") + helpers.arg("text") + "</b>: adds <b>text</b> to the current channel topic. Also /topicadd.<br>"
        + "<b>" + helpers.user("/removepart ") + helpers.arg("number") + "</b>: removes part <b>number</b> from the current channel topic. Part <b>number</b> must be yours.<br>"
        + "<b>" + helpers.user("/changepart ") + helpers.arg("number") + helpers.arg2("*text") + "</b>: changes part <b>number</b> to <b>text</b> in the current channel topic. "
        + "Part <b>number</b> must be yours. Also /updatepart.<br>"
        + "<b>" + helpers.user("/ckick ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: kicks <b>player</b> from the current channel for <b>reason</b>. Also /ck.<br>"
        + "<b>" + helpers.user("/cmute ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: mutes <b>player</b> on the current channel for <b>reason</b>.<br>"
        + "<b>" + helpers.user("/cunmute ") + helpers.arg("player") + "</b>: unmutes <b>player</b> on the current channel.<br>"
        + "<b>" + helpers.user("/cmutelist") + "</b>: displays the current channel's mute list in a neat table.<br>"
        + "<b>" + helpers.user("/cbanlist") + "</b>: displays the current channel's ban list in a neat table.<br>"
        + "<b>" + helpers.user("/cclose ") + helpers.arg("auth") + "</b>: closes the current channel for any player below level <b>auth</b>.<br>"
        + "<b>" + helpers.user("/copen") + "</b>: opens the current channel.<br>"
        + "<b>" + helpers.user("/silence ") + helpers.arg("level") + "</b>: sets the silence level of the current channel to <b>level</b>. <b>level</b> is 1, 2 or 3 and cannot exceed your channel auth level. "
        + "If <b>level</b> is not specified, uses your channel auth level.<br>"
        + "<b>" + helpers.user("/unsilence") + "</b>: removes the silence level of the current channel.<br>"
        + "<b>" + helpers.user("/caps") + "</b>: allows or disallows excessive usage of caps on the current channel.<br>"
        + "<b>" + helpers.user("/flood") + "</b>: allows or disallows flooding on the current channel.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    topic: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase(), name = sys.name(src).toLowerCase(), text = command[1];
        if (!text) {
            if (regchannels[lower]) {
                sys.sendHtmlMessage(src, helpers.bot(bots.channel) + "Current channel topic: " + regchannels[lower].topic.join(TOPIC_DELIMITER), channel);
            } else {
                sys.sendHtmlMessage(src, helpers.bot(bots.channel) + "Current channel topic: Welcome to " + sys.channel(channel) + "!", channel);
            }
            return;
        }
        if (!regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
            return;
        }
        for (var i in regchannels[lower].topicmakers) {
            if (helpers.cauth(regchannels[lower].topicmakers[i], channel) > helpers.cauth(name, channel)) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, you may not change topic parts that are not yours and were made by higher channel auth.", channel);
                return;
            }
        }
        regchannels[lower].topic = [];
        if (text.indexOf(helpers.removespaces(TOPIC_DELIMITER)) >= 0) {
            text = text.split(helpers.removespaces(TOPIC_DELIMITER));
            for (var i in text) {
                regchannels[lower].topic.push(text[i]);
            }
        } else {
            regchannels[lower].topic.push(text);
        }
        helpers.saveData("regchannels");
        sys.sendHtmlAll(helpers.bot(bots.channel) + sys.name(src) + " changed the channel topic to '" + helpers.escapehtml(((typeof(text)) == "string" ? text : text.join(TOPIC_DELIMITER))) + "'", channel);
    }

    ,

    addpart: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase(), name = sys.name(src).toLowerCase(), text = command[1];
        if (!text) {
            helpers.starfox(src, channel, command, bots.channel, "Error 404, text not found.", channel);
            return;
        }
        if (regchannels[lower]) {
            regchannels[lower].topic.push(text);
            regchannels[lower].topicmakers.push(name);
            helpers.saveData("regchannels");
            sys.sendHtmlAll(helpers.bot(bots.channel) + sys.name(src) + " added '" + helpers.escapehtml(text) + "' to the channel topic!", channel);
        } else {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
            return;
        }
    }

    ,

    topicadd: function (src, channel, command) {
        this.addpart(src, channel, command);
    }

    ,

    removepart: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase(), name = sys.name(src).toLowerCase(), number = command[1], oldtext;
        if (!number) {
            helpers.starfox(src, channel, command, bots.channel, "Error 404, number not found.", channel);
            return;
        }
        if (regchannels[lower]) {
            if (isNaN(number) || number < 0 || number > regchannels[lower].topic.length) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, invalid number.", channel);
                return;
            }
            if (regchannels[lower].topicmakers[number] != name && helpers.cauth(regchannels[lower].topicmakers[number], channel) > helpers.cauth(name, channel)) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, you may not remove a topic part that is not yours and was made by higher channel auth.", channel);
                return;
            }
            if (number > 0) {
                number -= 1;
            }
            oldtext = regchannels[lower].topic[number];
            regchannels[lower].topic.splice(number, 1);
            regchannels[lower].topicmakers.splice(number, 1);
            helpers.saveData("regchannels");
            sys.sendHtmlAll(helpers.bot(bots.channel) + sys.name(src) + " removed '" + helpers.escapehtml(oldtext) + "' from the channel topic!", channel);
        } else {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
            return;
        }
    }

    ,

    changepart: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase(), name = sys.name(src).toLowerCase(), number = command[1], oldtext;
        if (!number) {
            helpers.starfox(src, channel, command, bots.channel, "Error 404, number not found.", channel);
            return;
        }
        var text = command[2];
        if (!text) {
            helpers.starfox(src, channel, command, bots.channel, "Error 404, text not found.", channel);
            return;
        }
        if (regchannels[lower]) {
            if (isNaN(number) || number < 0 || number > regchannels[lower].topic.length) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, invalid number.", channel);
                return;
            }
            if (regchannels[lower].topicmakers[number] != name && helpers.cauth(regchannels[lower].topicmakers[number], channel) > helpers.cauth(name, channel)) {
                helpers.starfox(src, channel, command, bots.channel, "Error 403, you may not change a topic part that is not yours and was made by higher channel auth.", channel);
                return;
            }
            if (number > 0) {
                number -= 1;
            }
            oldtext = regchannels[lower].topic[number];
            regchannels[lower].topic[number] = text;
            helpers.saveData("regchannels");
            sys.sendHtmlAll(helpers.bot(bots.channel) + sys.name(src) + " changed '" + helpers.escapehtml(oldtext) + "' to '" + helpers.escapehtml(text) + "' in the channel topic!", channel);
        } else {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
            return;
        }
    }

    ,

    updatepart: function (src, channel, command) {
        this.changepart(src, channel, command);
    }

    ,

    ckick: function (src, channel, command) {
        var name = sys.name(src), trgtname = command[1], lower = sys.channel(channel).toLowerCase(), reason = command[2], trgt;
        if (!trgtname) {
            helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.", channel);
            return;
        }
        if (!sys.id(trgtname)) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, that player is not currently on the server!", channel);
            return;
        }
        trgt = sys.id(trgtname);
        if (!sys.isInChannel(trgt, channel)) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, that player is not currently on this channel!", channel);
            return;
        }
        trgtname = sys.name(trgt);
        if (helpers.cauth(trgtname, channel) >= helpers.cauth(name, channel)) {
            helpers.starfox(src, channel, command, bots.channel, "Error 403, you may not channel kick " + trgtname + " because their auth level is higher or equal to yours!", channel);
            return;
        }
        sys.kick(trgt, channel);
        if (!reason) {
            reason = "Unknown";
        }
        sys.sendHtmlAll(helpers.bot(bots.channel) + trgtname + " has been kicked from this channel by " + name + "! [Reason: " + reason + "]", channel);
    }

    ,

    ck: function (src, channel, command) {
        this.ckick(src, channel, command);
    }

    ,

    cmute: function (src, channel, command) {
        var name = sys.name(src), trgtname = command[1], lower = sys.channel(channel).toLowerCase(), reason = command[2], trgtip;
        if (!regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
            return;
        }
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.");
            return;
        }
        if (!sys.dbIp(command[1])) {
            helpers.starfox(src, channel, command, bots.mute, "You can't channel mute " + trgtname + " because they do not exist in the database.");
            return;
        }
        trgtip = sys.dbIp(command[1]);
        if (helpers.cauth(trgtname, channel) >= helpers.cauth(name, channel)) {
            helpers.starfox(src, channel, command, bots.channel, "Error 403, you may not channel mute " + trgtname + " because their auth level is higher or equal to yours!", channel);
            return;
        }
        if (!reason) {
            reason = "Unknown";
        }
        trgtname = trgtname.toLowerCase();
        regchannels[lower].mutelist[trgtname] = {};
        regchannels[lower].mutelist[trgtname].ip = trgtip;
        regchannels[lower].mutedips[trgtip] = true;
        regchannels[lower].mutelist[trgtname].mutedby = players[src].name;
        regchannels[lower].mutelist[trgtname].reason = reason;
        regchannels[lower].mutelist[trgtname].date = helpers.date(new Date());
        helpers.saveData("regchannels");
        sys.sendHtmlAll(helpers.bot(bots.channel) + trgtname + " has been muted on this channel by " + name + "! [Reason: " + reason + "]", channel);
    }

    ,

    cunmute: function (src, channel, command) {
        var name = sys.name(src), lower = sys.channel(channel).toLowerCase();
        if (!regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
            return;
        }
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.", channel);
            return;
        }
        if (!sys.dbIp(command[1])) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't channel unmute " + command[1] + " because they do not exist in the database.");
            return;
        }
        var trgtip = sys.dbIp(command[1]);
        if (!helpers.cmuteCheck(command[1], sys.channel(channel).toLowerCase())) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't channel unmute " + command[1] + " because they aren't channel muted!");
            return;
        }
        delete regchannels[lower].mutelist[command[1].toLowerCase()];
        delete regchannels[lower].mutedips[trgtip];
        helpers.saveData("regchannels");
        sys.sendHtmlAll(helpers.bot(bots.channel) + command[1] + " has been unmuted on this channel by " + name + "!", channel);
    }

    ,

    cmutelist: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase(), list, names = [], ips = [], muters = [], reasons = [], dates = [], mutelistmessage;
        if (!regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
            return;
        }
        list = regchannels[lower].mutelist;
        for (var i in list) {
            names.push(members[i] ? members[i] : i);
            ips.push(list[i].ip);
            muters.push(list[i].mutedby);
            reasons.push(list[i].reason);
            dates.push(list[i].date);
        }
        mutelistmessage = border + "<h2>" + sys.channel(channel) + " Mute List</h2><br>";
        if (helpers.isAndroid(src)) {
            mutelistmessage += "<tt>";
            for (var i in names) {
                mutelistmessage += names[i] + " | " + ips[i] + " | </tt>" + dates[i] + "<tt><br>";
            }
            mutelistmessage += "</tt>";
        } else {
            mutelistmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Name</th><th>IP Address</th><th>Muter</th><th>Reason</th><th>Date of muting</th></tr></thead><tbody>";
            for (var i in names) {
                mutelistmessage += "<tr>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + ips[i] + "</td>"
                + "<td>" + muters[i] + "</td>"
                + "<td>" + reasons[i] + "</td>"
                + "<td>" + dates[i] + "</td>"
                + "</tr>";
            }
            mutelistmessage += "</tbody></table>"
        }
        mutelistmessage += "<br><br><b>Total Muted Players:</b> " + Object.keys(list).length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, mutelistmessage, channel);
    }

    ,

    cbanlist: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase(), list, names = [], ips = [], banners = [], reasons = [], dates = [], banlistmessage;
        if (!regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
            return;
        }
        list = regchannels[lower].banlist;
        for (var i in list) {
            names.push(members[i] ? members[i] : i);
            ips.push(list[i].ip);
            banners.push(list[i].banner);
            reasons.push(list[i].reason);
            dates.push(list[i].date);
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
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Name</th><th>IP Address</th><th>Banner</th><th>Reason</th><th>Date of banning</th></tr></thead><tbody>";
            for (var i in names) {
                banlistmessage += "<tr>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + ips[i] + "</td>"
                + "<td>" + banners[i] + "</td>"
                + "<td>" + reasons[i] + "</td>"
                + "<td>" + dates[i] + "</td>"
                + "</tr>";
            }
            banlistmessage += "</tbody></table>"
        }
        banlistmessage += "<br><br><b>Total Banned Players:</b> " + Object.keys(list).length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, banlistmessage, channel);
    }

    ,

    cclose: function (src, channel, command) {
        var name = sys.name(src), cauth = helpers.cauth(players[src].name.toLowerCase(), channel), lower = sys.channel(channel).toLowerCase();
        if (channel === 0) {
            helpers.starfox(src, channel, command, bots.channel, "Error 403, you may not close the main channel!");
            return;
        }
        if (!regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
            return;
        }
        if (regchannels[lower].close > 0) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel is already closed!");
            return;
        }
        var strength = command[1];
        if (!command[1] || isNaN(strength) || strength < 1) {
            strength = 1;
        }
        if (strength > cauth) {
            strength = cauth;
        }
        regchannels[lower].close = strength;
        helpers.saveData("regchannels");
        sys.sendHtmlAll(helpers.bot(bots.channel) + "This channel has been closed for any channel auth level lower than Channel " + AUTH_NAMES[strength] + " by " + name + ".", channel);
    }

    ,

    copen: function (src, channel, command) {
        var name = sys.name(src), lower = sys.channel(channel).toLowerCase();
        if (!regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
            return;
        }
        if (regchannels[lower].close < 1) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel is already open!");
            return;
        }
        regchannels[lower].close = 0;
        helpers.saveData("regchannels");
        sys.sendHtmlAll(helpers.bot(bots.channel) + "This channel has been opened by " + name + ".", channel);
    }

    ,

    silence: function (src, channel, command) {
        var name = sys.name(src), cauth = helpers.cauth(name.toLowerCase(), channel), lower = sys.channel(channel).toLowerCase(), strength = command[1], silencemessage = helpers.bot(bots.silence);
        if (regchannels[lower]) {
            if (helpers.muteCheck(name)) {
                helpers.muteMessage(src, channel);
                return;
            }
            if (!strength) {
                strength = cauth;
            }
            if (isNaN(strength) || strength < 1 || strength > 3) {
                helpers.starfox(src, channel, command, bots.silence, "Error 403, invalid silence level.");
                return;
            }
            if (strength > cauth) {
                helpers.starfox(src, channel, command, bots.silence, "Error 403, you may not silence with a silence level higher than your auth level.");
                return;
            }
            if (regchannels[sys.channel(channel).toLowerCase()].silence > cauth) {
                helpers.starfox(src, channel, command, bots.silence, "Error 403, you can't lower the silence when the silence level is higher than your auth level!");
                return;
            }
            if (strength == regchannels[sys.channel(channel).toLowerCase()].silence) {
                helpers.starfox(src, channel, command, bots.silence, "Error 400, this channel already has silence level " + strength + "!");
                return;
            }
            regchannels[sys.channel(channel).toLowerCase()].silence = strength;
            if (bots.silence == "Achmed the Dead Terrorist") {
                silencemessage += "SILENCE! I KILL YOU! ";
            }
            silencemessage += "This channel has been silenced by " + name + ". [Silence Level: " + strength + "]";
            helpers.saveData("regchannels");
            sys.sendHtmlAll(silencemessage, channel);
        } else {
            helpers.starfox(src, channel, command, bots.silence, "Error 400, this channel isn't registered!");
            return;
        }
    }

    ,

    unsilence: function (src, channel, command) {
        var name = sys.name(src), cauth = helpers.cauth(name.toLowerCase(), channel), lower = sys.channel(channel).toLowerCase(), unsilencemessage = helpers.bot(bots.silence);
        if (regchannels[lower]) {
            if (regchannels[lower].silence > cauth) {
                helpers.starfox(src, channel, command, bots.silence, "Error 403, you can't unsilence this channel because the silence level is higher than your auth level!");
                return;
            }
            if (regchannels[lower].silence === 0) {
                helpers.starfox(src, channel, command, bots.silence, "Error 400, you can't unsilence when there is no silence in this channel!");
                return;
            }
            if (regchannels[lower].silence <= cauth) {
                regchannels[lower].silence = 0;
                if (bots.silence == "Achmed the Dead Terrorist") {
                    unsilencemessage += "UNSILENCE! I WON'T KILL YOU! ";
                }
                unsilencemessage += "This channel has been unsilenced by " + name + ".";
                helpers.saveData("regchannels");
                sys.sendHtmlAll(unsilencemessage, channel);
            }
        } else {
            helpers.starfox(src, channel, command, bots.silence, "Error 400, this channel isn't registered!");
            return;
        }
    }

    ,

    caps: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase();
        if (regchannels[lower]) {
            if (regchannels[lower].caps) {
                regchannels[lower].caps = false;
                sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(sys.name(src)) + " has disallowed excessive usage of caps on the channel.</b>", channel);
            } else {
                regchannels[lower].caps = true;
                sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(sys.name(src)) + " has allowed excessive usage of caps on the channel.</b>", channel);
            }
            helpers.saveData("regchannels");
        } else {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
            return;
        }
    }

    ,

    flood: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase();
        if (regchannels[lower]) {
            if (regchannels[lower].flood) {
                regchannels[lower].flood = false;
                sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(sys.name(src)) + " has disallowed flooding on the channel.</b>", channel);
            } else {
                regchannels[lower].flood = true;
                sys.sendHtmlAll(helpers.bot(bots.channel) + "<b>" + helpers.user(sys.name(src)) + " has allowed flooding on the channel.</b>", channel);
            }
            helpers.saveData("regchannels");
        } else {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
            return;
        }
    }
};
