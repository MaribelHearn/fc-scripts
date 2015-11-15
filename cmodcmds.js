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
            var commandsmessage = BORDER
            + "<h2>Channel Moderator Commands</h2>"
            + "<br>"
            + "<b>" + helpers.user("/topic ") + helpers.arg("text") + "</b>: changes the entire channel topic to <b>text</b>. Only allowed if you are allowed to remove all of its parts. "
            + "If <b>text</b> is not specified, displays the current channel topic.<br>"
            + "<b>" + helpers.user("/addpart ") + helpers.arg("text") + "</b>: adds <b>text</b> to the current channel topic. Also /topicadd.<br>"
            + "<b>" + helpers.user("/removepart ") + helpers.arg("number") + "</b>: removes part <b>number</b> from the current channel topic. Part <b>number</b> must be yours.<br>"
            + "<b>" + helpers.user("/changepart ") + helpers.arg("text") + "</b>: changes part <b>number</b> to <b>text</b> in the current channel topic. Part <b>number</b> must be yours. Also /updatepart.<br>"
            + "<b>" + helpers.user("/ckick ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: kicks <b>player</b> from the current channel for <b>reason</b>.<br>"
            + "<b>" + helpers.user("/cmute ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: mutes <b>player</b> on the current channel for <b>reason</b>.<br>"
            + "<b>" + helpers.user("/cunmute ") + helpers.arg("player") + "</b>: unmutes <b>player</b> on the current channel.<br>"
            + "<b>" + helpers.user("/cmutelist") + "</b>: displays the current channel's mute list in a neat table.<br>"
            + "<b>" + helpers.user("/cbanlist") + "</b>: displays the current channel's ban list in a neat table.<br>"
            + "<b>" + helpers.user("/crangebanlist") + "</b>: displays the current channel's range ban list in a neat table.<br>"
            + "<b>" + helpers.user("/cclose ") + helpers.arg("auth") + "</b>: closes the current channel for any player below level <b>auth</b>.<br>"
            + "<b>" + helpers.user("/copen") + "</b>: opens the current channel.<br>"
            + "<b>" + helpers.user("/silence ") + helpers.arg("level") + "</b>: sets the silence level of the current channel to <b>level</b>. The level cannot be higher than your auth's.<br>"
            + "<b>" + helpers.user("/unsilence") + "</b>: removes the silence level of the current channel.<br>"
            + "<b>" + helpers.user("/caps") + "</b>: allows or disallows excessive usage of caps on the current channel.<br>"
            + "<b>" + helpers.user("/flood") + "</b>: allows or disallows flooding on the current channel.<br>"
            + "<br><timestamp/><br>"
            + BORDER2;
            sys.sendHtmlMessage(src, commandsmessage, channel);
        }
        
        ,
        
        topic: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase(), name = sys.name(src).toLowerCase(), text = command[1];
            if (!text) {
                if (regchannels[lower]) {
                    sys.sendHtmlMessage(src, helpers.bot(bots.channel) + "Current channel topic: " + helpers.escapehtml(regchannels[lower].topic.join(TOPIC_DELIMITER)), channel);
                } else {
                    sys.sendHtmlMessage(src, helpers.bot(bots.channel) + "Current channel topic: Welcome to " + sys.channel(channel) + "!", channel);
                }
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
            sys.write("data/regchannels.txt", JSON.stringify(regchannels));
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
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
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
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
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
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
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
            var lower = sys.channel(channel).toLowerCase(), reason = command[2];
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.", channel);
                return;
            }
            if (!sys.id(command[1])) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, that player is not currently on the server!", channel);
                return;
            }
            var trgt = sys.id(command[1]);
            if (!sys.isInChannel(trgt, channel)) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, that player is not currently on this channel!", channel);
                return;
            }
            sys.kick(trgt, channel);
            if (!reason) {
                reason = "Unknown";
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + command[1] + " has been kicked from this channel by " + sys.name(src) + "! [Reason: " + reason + "]", channel);
        }
        
        ,
        
        cmute: function (src, channel, command) {
            var lower = sys.channel(channel).toLowerCase(), reason = command[2];
            if (!command[1]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.");
                return;
            }
            if (!sys.dbIp(command[1])) {
                helpers.starfox(src, channel, command, bots.mute, "You can't channel mute " + trgtname + " because they do not exist in the database.");
                return;
            }
            var trgtip = sys.dbIp(command[1]), trgtname = command[1];
            if (!reason) {
                reason = "Unknown";
            }
            if (regchannels[lower]) {
                var name = trgtname.toLowerCase();
                regchannels[lower].mutelist[name] = {};
                regchannels[lower].mutelist[name].ip = trgtip;
                regchannels[lower].mutedips[trgtip] = true;
                regchannels[lower].mutelist[name].mutedby = players[src].name;
                regchannels[lower].mutelist[name].reason = reason;
                var date = helpers.date(new Date());
                regchannels[lower].mutelist[name].date = date;
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
            var trgt = sys.id(trgtname);
            sys.sendHtmlAll(helpers.bot(bots.channel) + trgtname + " has been muted on this channel by " + sys.name(src) + "! [Reason: " + reason + "]", channel);
        }
        
        ,
        
        cunmute: function (src, channel, command) {
            var name = sys.name(src), lower = sys.channel(channel).toLowerCase();
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
            if (regchannels[lower]) {
                delete regchannels[lower].mutelist[command[1].toLowerCase()];
                delete regchannels[lower].mutedips[trgtip];
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
            sys.sendHtmlAll(helpers.bot(bots.channel) + command[1] + " has been unmuted on this channel by " + name + "!", channel);
        }
        
        ,
        
        cmutelist: function (src, channel, command) {
            var onlinemessage = BORDER + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
            "thead {font-weight:bold;}</style><h2>Channel Mute List</h2><br><table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>" +
            "<td>Name</td><td>IP</td><td>Muter</td><td>Reason</td><td>Date</td></tr></thead>", id, lower = sys.channel(channel).toLowerCase();
            if (!regchannels[lower]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
            var cmutelist = regchannels[lower].mutelist;
            for (var index in cmutelist) {
                id = cmutelist[index];
                onlinemessage += "<tr><td>" + index + "</td><td>" + id.ip + "</td><td>" + id.mutedby + "</td><td>" + id.reason + "</td><td>" + id.date + "</td></tr>";
            }
            var playernum = Object.keys(cmutelist).length;
            onlinemessage += "</table><br><br><b>Total Muted Players:</b> " + playernum + "<br><br><timestamp/><br>" + BORDER2;
            sys.sendHtmlMessage(src, onlinemessage, channel);
        }
        
        ,
        
        cbanlist: function (src, channel, command) {
            var onlinemessage = BORDER + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
            "thead {font-weight:bold;}</style><h2>Channel Ban List</h2><br><table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>" +
            "<td>Name</td><td>IP</td><td>Banner</td><td>Reason</td><td>Date</td></tr></thead>", id, lower = sys.channel(channel).toLowerCase();
            if (!regchannels[lower]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
            var cbanlist = regchannels[lower].banlist;
            for (var index in cbanlist) {
                id = cbanlist[index];
                onlinemessage += "<tr><td>" + index + "</td><td>" + id.ip + "</td><td>" + id.banner + "</td><td>" + id.reason + "</td><td>" + id.date + "</td></tr>";
            }
            var playernum = Object.keys(cbanlist).length;
            onlinemessage += "</table><br><br><b>Total Banned Players:</b> " + playernum + "<br><br><timestamp/><br>" + BORDER2;
            sys.sendHtmlMessage(src, onlinemessage, channel);
        }
        
        ,
        
        crangebanlist: function (src, channel, command) {
            var onlinemessage = BORDER + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
            "thead {font-weight:bold;}</style><h2>Channel Range Ban List</h2><br><table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>" +
            "<td>Name</td><td>Range</td><td>Banner</td><td>Reason</td><td>Date</td></tr></thead>", id, lower = sys.channel(channel).toLowerCase();
            if (!regchannels[lower]) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
            var crangebanlist = regchannels[lower].rangebanlist;
            for (var index in crangebanlist) {
                id = crangebanlist[index];
                onlinemessage += "<tr><td>" + index + "</td><td>" + id.range + "</td><td>" + id.banner + "</td><td>" + id.reason + "</td><td>" + id.date + "</td></tr>";
            }
            var playernum = Object.keys(crangebanlist).length;
            onlinemessage += "</table><br><br><b>Total Range Banned Players:</b> " + playernum + "<br><br><timestamp/><br>" + BORDER2;
            sys.sendHtmlMessage(src, onlinemessage, channel);
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
            if (!command[1])strength = 1;
            if (isNaN(strength))strength = 1;
            if (strength > cauth)strength = cauth;
            if (strength < 1)stength = 1;
            regchannels[lower].close = strength;
            sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            sys.sendHtmlAll(helpers.bot(bots.channel) + "This channel has been closed for any channel auth level lower than Channel " + AUTH_NAME[strength] + " by " + name + ".", channel);
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
            sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            sys.sendHtmlAll(helpers.bot(bots.channel) + "This channel has been opened by " + name + ".", channel);
        }
        
        ,
        
        silence: function (src, channel, command) {
            var name = sys.name(src), lower = sys.channel(channel).toLowerCase();
            if (regchannels[lower]) {
                if (helpers.muteCheck(name)) {
                    helpers.muteMessage(src, channel);
                    return;
                }
                var strength = command[1], auth = sys.auth(src);
                if (isNaN(strength))strength = 1;
                if (strength > auth)strength = auth;
                if (strength < 1)stength = 1;
                if (!command[1])strength = 1;
                if (regchannels[sys.channel(channel).toLowerCase()].silence > auth) {
                    helpers.starfox(src, channel, command, bots.silence, "Error 403, you can't lower the silence when the silence is above your auth!");
                    return;
                }
                if (strength == regchannels[sys.channel(channel).toLowerCase()].silence) {
                    helpers.starfox(src, channel, command, bots.silence, "Error 400, you can't silence the chat on the same level!");
                    return;
                }
                regchannels[sys.channel(channel).toLowerCase()].silence = strength;
                var color = global["auth" + strength + "color"];
                var silencemessage = BORDER + "<br>"
                + helpers.bot(bots.silence) + "<b><font color='" + color + "'>SILENCE! I KILL YOU!</font> <small>-" + name + ".</small></b><br>"
                + BORDER2;
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
                sys.sendHtmlAll(silencemessage, channel);
            } else {
                helpers.starfox(src, channel, command, bots.silence, "Error 400, this channel isn't registered!");
                return;
            }
        }
        
        ,

        unsilence: function (src, channel, command) {
            var auth = sys.auth(src), lower = sys.channel(channel).toLowerCase();
            if (regchannels[lower]) {
                if (regchannels[lower].silence > auth) {
                    helpers.starfox(src, channel, command, bots.silence, "Error 403, you can't unsilence this channel because the silence is too strong!");
                    return;
                }
                if (regchannels[lower].silence === 0) {
                    helpers.starfox(src, channel, command, bots.silence, "Error 400, you can't unsilence when there is no silence in this channel!");
                    return;
                }
                if (regchannels[lower].silence <= auth) {
                    var color = global["auth" + regchannels[lower].silence + "color"];
                    regchannels[lower].silence = 0;
                    var unsilencemessage = BORDER + "<br>"
                    + helpers.bot(bots.silence) + "<b><font color='" + color + "'>UNSILENCE! I WON'T KILL YOU!</font> <small>-" + sys.name(src)
                    + ".</small></b><br>" + BORDER2;
                    sys.write("data/regchannels.txt", JSON.stringify(regchannels));
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
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
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
                sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            } else {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
                return;
            }
        }
    };
