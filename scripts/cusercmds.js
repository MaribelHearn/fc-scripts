/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY CUSER COMMANDS cusercmds.js
     - by Maribel Hearn, 2012-2015
    
    This file contains commands that can be
    run by channel users.
    ----------------------------------------------
*/

cusercommands = {
    cusercommands: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Channel User Commands</h2>"
        + "<br>"
        + "<b>" + helpers.user("/registerthis") + "</b>: registers the current channel. Also /register.<br>"
        + "<b>" + helpers.user("/channelinfo ") + helpers.arg("channel") + "</b>: displays information about <b>channel</b>. <b>channel</b> must be online except if it's registered." +
        " If <b>channel</b> is not specified, displays the current channelo info. Also /cinfo.<br>"
        + "<b>" + helpers.user("/channelonline") + "</b>: shows the users who are currently online on this channel in a neat table. Also /conline.<br>"
        + "<b>" + helpers.user("/channelauth") + "</b>: displays the current channel's auth members in a neat table. Also /channelauths, /cauth and /cauths.<br>"
        + "<b>" + helpers.user("/channelrules") + "</b>: displays the current channel's rules. Note that these rules are not official server rules, as they are created by users. Also /crules.<br>"
        + "<b>" + helpers.user("/channeljoin ") + helpers.arg("channel") + "</b>: makes you join <b>channel</b>. Also /cjoin.<br>"
        + "<b>" + helpers.user("/channelleave ") + helpers.arg("channel") + "</b>: makes you leave <b>channel</b>. If <b>channel</b> is not specified, makes you leave the current channel. Also /cleave.<br>"
        + "<b>" + helpers.user("/leaveall") + "</b>: makes you leave every channel you are on, except the current channel.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    registerthis: function (src, channel, command) {
        var name = sys.name(src), lower = sys.channel(channel).toLowerCase();
        if (regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 403, this channel has already been registered!");
            return;
        }
        regchannels[lower] = {};
        regchannels[lower].stay = false;
        regchannels[lower].priv = false;
        regchannels[lower].caps = false;
        regchannels[lower].flood = false;
        regchannels[lower].zalgo = false;
        regchannels[lower].reverse = false;
        regchannels[lower].extending = false;
        regchannels[lower].backward = false;
        regchannels[lower].topic = ["Welcome to " + sys.channel(channel) + "!"];
        regchannels[lower].topicmakers = [players[src].name.toLowerCase()];
        regchannels[lower].mods = [];
        regchannels[lower].admins = [];
        regchannels[lower].owners = [players[src].name.toLowerCase()];
        regchannels[lower].mutelist = {};
        regchannels[lower].mutedips = {};
        regchannels[lower].banlist = {};
        regchannels[lower].rangebanlist = {};
        regchannels[lower].rules = [];
        regchannels[lower].silence = 0;
        regchannels[lower].close = 0;
        sys.write("data/regchannels.txt", JSON.stringify(regchannels));
        sys.sendHtmlAll(helpers.bot(bots.channel) + "The channel has been registered by " + name + "!", channel);
    }
    
    ,
    
    register: function (src, channel, command) {
        this.registerthis(src, channel, command);
    }
    
    ,
    
    channelinfo: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase(), reg = false, stay = false, priv = false, close = 0, silence = 0, caps = false, flood = false;
        var zalgo2 = false, reverse2 = false, extending2 = false, backward2 = false, topic = false, channelmessage;
        var channelname = command[1];
        if (!channelname) {
            channelname = sys.channel(channel);
        } else {
            if (!sys.existChannel(channelname) && !helpers.isInArray(channelname.toLowerCase(), Object.keys(regchannels))) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, that channel is not currently online!");
                return;
            }
            channelname = (sys.existChannel(channelname) ? sys.channel(sys.channelId(channelname)) : channelname);
            lower = channelname.toLowerCase();
        }
        if (regchannels[lower]) {
            reg = true;
            stay = regchannels[lower].stay;
            priv = regchannels[lower].priv;
            close = regchannels[lower].close;
            silence = regchannels[lower].silence;
            caps = regchannels[lower].caps;
            flood = regchannels[lower].flood;
            zalgo2 = regchannels[lower].zalgo;
            reverse2 = regchannels[lower].reverse;
            extending2 = regchannels[lower].extending;
            backward2 = regchannels[lower].backward;
            topic = regchannels[lower].topic;
        }
        reg ? reg = "<b style='color:green'>Yes</b>" : reg = "<b style='color:red'>No</b>";
        stay ? stay = "<b style='color:green'>Yes</b>" : stay = "<b style='color:red'>No</b>";
        priv ? priv = "<b style='color:green'>Yes</b>" : priv = "<b style='color:red'>No</b>";
        caps ? caps = "<b style='color:green'>Yes</b>" : caps = "<b style='color:red'>No</b>";
        flood ? flood = "<b style='color:green'>Yes</b>" : flood = "<b style='color:red'>No</b>";
        zalgo2 ? zalgo2 = "<b style='color:green'>Yes</b>" : zalgo2 = "<b style='color:red'>No</b>";
        reverse2 ? reverse2 = "<b style='color:green'>Yes</b>" : reverse2 = "<b style='color:red'>No</b>";
        extending2 ? extending2 = "<b style='color:green'>Yes</b>" : extending2 = "<b style='color:red'>No</b>";
        backward2 ? backward2 = "<b style='color:green'>Yes</b>" : backward2 = "<b style='color:red'>No</b>";
        topic ? topic = topic : topic = ["Welcome to " + channelname + "!"];
        channelmessage = border + "<h2>Channel Info" + (command[1] ? " ~ " + channelname : "") + "</h2><br>" +
        "<br><b>Name:</b> " + channelname +
        "<br><b>Registered:</b> " + reg +
        "<br><b>Permanent:</b> " + stay +
        "<br><b>Private:</b> " + priv +
        "<br><b>Closure Level:</b> " + close +
        "<br><b>Silence Level:</b> " + silence +
        "<br><b>Excessive Caps Allowed:</b> " + caps +
        "<br><b>Flooding Allowed:</b> " + flood +
        "<br><b>Zalgo Characters Allowed:</b> " + zalgo2 +
        "<br><b>Reverse Characters Allowed:</b> " + reverse2 +
        "<br><b>Extending Characters Allowed:</b> " + extending2 +
        "<br><b>Backward Pushing Characters Allowed:</b> " + backward2 +
        "<br><b>Topic:</b> " + topic.join(TOPIC_DELIMITER) +
        "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, channelmessage, channel);
    }
    
    ,
    
    cinfo: function (src, channel, command) {
        this.channelinfo(src, channel, command);
    }
    
    ,
    
    channelonline: function (src, channel, command) {
        var DISPLAY_USER = true, HIDE_INVIS = true, onlinemessage = border + "<h2>Players Online on " + sys.channel(channel) + "</h2><br>", srcauth = sys.auth(src), lower;
        var channelPlayers = sys.playersOfChannel(channel), auths = [], names = [], colors = [], ids = [], ips = [], clients = [], countries = [], timeZones = [], lastMessages = [], times = [];
        for (var i in channelPlayers) {
            ids.push(channelPlayers[i]);
            ips.push(sys.ip(ids[i]));
            auths.push(sys.auth(ids[i]));
            clients.push(sys.os(ids[i]));
            colors.push(helpers.color(ids[i]));
            names.push(players[ids[i]].name + (sys.name(ids[i]) != players[ids[i]].name ? " (" + sys.name(ids[i]) + ")" : ""));
            lower = names[i].toLowerCase();
            countries.push(countryname[lower] ? countryname[lower] : "[no data]");
            timeZones.push(timezone[lower] ? timezone[lower] : "[no data]");
            lastMessages.push(helpers.escapehtml(players[ids[i]].lastmessage));
            times.push(helpers.timePassed(colors[i], players[ids[i]].lastmessagetime));
        }
        if (helpers.isAndroid(src)) {
            onlinemessage += "<tt>";
            for (var i in ids) {
                onlinemessage += helpers.authname(auths[i], true) + " | " + "<b><font color='" + colors[i] + "'>" + names[i] + "</font></b> | " + ids[i];
                if (srcauth >= 1) {
                    onlinemessage += " | " + ips[i] + " | " + helpers.osName(clients[i]);
                }
                onlinemessage += "<br>";
            }
            onlinemessage += "</tt><br><br><b>Total Players Online:</b> " + channelPlayers.length;
        } else {
            onlinemessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Icon</th><th>Auth</th><th>Name</th><th>ID</th>";
            if (srcauth >= 1) {
                onlinemessage += "<th>IP Address</th><th>Client</th><th>Country</th><th>Time Zone</th><th>Last Message</th>";
            }
            onlinemessage += "</tr></thead><tbody>";
            for (var i in ids) {
                onlinemessage += "<tr>"
                + "<td>" + helpers.authimage(src, helpers.imageIndex(ids[i])) + "</td>"
                + "<td>" + helpers.authname(auths[i], DISPLAY_USER, HIDE_INVIS) + "</td>"
                + "<td><b><font color='" + colors[i] + "'>" + names[i] + "</font></b></td>"
                + "<td>" + ids[i] + "</td>";
                if (srcauth >= 1) {
                    onlinemessage += "<td>" + ips[i] + "</td>"
                    + "<td>" + helpers.osImage(clients[i]) + "</td>"
                    + "<td>" + FLAGS[helpers.toFlagKey(countries[i])] + "</td>"
                    + "<td>" + timeZones[i] + "</td>"
                    + "<td>" + lastMessages[i] + " " + times[i] + "</td>";
                }
                onlinemessage += "</tr>";
            }
            onlinemessage += "</tbody><tfoot><tr><td colspan='" + (srcauth >= 1 ? 9 : 4) + "'><b>Total Players Online:</b> " + channelPlayers.length + "</td></tr></tfoot></table>";
        }
        onlinemessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, onlinemessage, channel);
    }
    
    ,
    
    conline: function (src, channel, command) {
        this.channelonline(src, channel, command);
    }
    
    ,
    
    channelauth: function (src, channel, command) {
        var authmessage = border + "<h2>Channel Authority of " + sys.channel(channel) + "</h2><br>", authList = helpers.cauthSort(channel), srcauth = sys.auth(src), index = 0;
        var lower = sys.channel(channel).toLowerCase(), auths = [], names = [], lastLogins = [], statuses = [];
        if (!regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
            return;
        }
        for (var i in authList) {
            names.push(authList[i]);
            auths.push(helpers.cauthname(names[i], channel));
            lower = names[index].toLowerCase();
            lastLogins.push(helpers.formatLastOn(src, sys.dbLastOn(authList[i])));
            statuses.push(sys.id(lower) ? "<b><font color='green'>Online</font></b>" : "<font color='red'>Offline</font>");
            if (members[lower]) {
                names[index] = members[lower];
            }
            index++;
        }
        if (helpers.isAndroid(src)) {
            authmessage += "<tt>";
            for (var i in auths) {
                authmessage += auths[i] + " | " + names[i] + " | " + statuses[i] + "<br>";
            }
            authmessage += "</tt><br><br><b>Total Channel Auth Members:</b> " + authList.length;
        } else {
            authmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Icon</th><th>Auth</th><th>Name</th><th>Last Online</th><th>Status</th></tr></thead><tbody>";
            for (var i in auths) {
                authmessage += "<tr>"
                + "<td>" + helpers.authimage(src, sys.dbAuth(names[i]) >= 4 ? 0 : sys.dbAuth(names[i])) + "</td>"
                + "<td>" + auths[i] + "</td>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + lastLogins[i] + "</td>"
                + "<td>" + statuses[i] + "</td>"
                + "</tr>";
            }
            authmessage += "</tbody><tfoot><tr><td colspan='5'><b>Total Channel Auth Members:</b> " + authList.length + "</td></tr></tfoot></table>";
        }
        authmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, authmessage, channel);
    }
    
    ,
    
    channelauths: function (src, channel, command) {
        this.channelauth(src, channel, command);
    }
    
    ,
    
    cauth: function (src, channel, command) {
        this.channelauth(src, channel, command);
    }
    
    ,
    
    cauths: function (src, channel, command) {
        this.channelauth(src, channel, command);
    }
    
    ,
    
    channelrules: function (src, channel, command) {
        var rulesmessage = border + "<h2>" + sys.channel(channel) + "'s Rules</h2><br>", lower = sys.channel(channel).toLowerCase();
        if (channel === 0) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, the main channel cannot have channel rules.");
            return;
        }
        if (regchannels[lower]) {
            if (JSON.stringify(regchannels[lower].rules) == "[]") {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, rules not found. Try adding some!");
                return;
            }
            for (var i in regchannels[lower].rules) {
                if (regchannels[lower].rules[i] !== null) {
                    rulesmessage += helpers.bot("• ±Rule " + i + ": " + regchannels[lower].rules[i] + "<br>");
                }
            }
            rulesmessage += "<br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, rulesmessage, channel);
        } else {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
            return;
        }
    }
    
    ,
    
    crules: function (src, channel, command) {
        this.channelrules(src, channel, command);
    }
    
    ,
    
    channeljoin: function (src, channel, command) {
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 404, channel not found.");
            return;
        }
        var newchannel = sys.channelId(command[1]);
        if (sys.channelId(command[1]) && sys.isInChannel(src, newchannel)) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, you are already in that channel!");
            return;
        }
        if (!newchannel) {
            sys.createChannel(command[1]);
            sys.putInChannel(src, sys.channelId(command[1]));
        } else {
            sys.putInChannel(src, newchannel);
        }
    }
    
    ,
    
    cjoin: function (src, channel, command) {
        this.channeljoin(src, channel, command);
    }
    
    ,
    
    channelleave: function (src, channel, command) {
        var oldchannel = channel, id;
        if (sys.channelsOfPlayer(src).length == 1) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't leave the only channel you are on!");
            return;
        }
        if (command[1]) {
            id = sys.channelId(command[1]);
            if (!id) {
                helpers.starfox(src, channel, command, bots.channel, "Error 404, channel not found.");
                return;
            }
            if (!sys.isInChannel(src, id)) {
                helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't leave that channel because you haven't joined it!");
                return;
            }
            sys.kick(src, id);
        } else {
            sys.kick(src, oldchannel);
        }
    }
    
    ,
    
    cleave: function (src, channel, command) {
        this.channelleave(src, channel, command);
    }
    
    ,
    
    leaveall: function (src, channel, command) {
        var channels = sys.channelsOfPlayer(src);
        for (var index in channels) {
            if (channels[index] != channel) {
                sys.kick(src, channels[index]);
            }
        }
    }
};