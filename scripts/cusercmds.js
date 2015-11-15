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
        regchannels[lower].owners = [];
        regchannels[lower].mutelist = {};
        regchannels[lower].mutedips = {};
        regchannels[lower].banlist = {};
        regchannels[lower].rangebanlist = {};
        regchannels[lower].rules = [];
        regchannels[lower].silence = 0;
        regchannels[lower].close = 0;
        regchannels[lower].owners.push(players[src].name.toLowerCase());
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
        var onlinemessage = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" 
        + "thead {font-weight:bold;}</style><h2>Players Online on " + sys.channel(channel) + "</h2><br>"
        + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
        + "<td>Icon</td><td>Auth</td><td>Name</td><td>ID</td>", date = new Date(), cplayers = sys.playersOfChannel(channel), unit, country;
        if (sys.auth(src) >= 1) {
            onlinemessage += "<td>IP Address</td><td>Client</td><td>Country</td><td>Time Zone</td><td>Last Message</td>";
        }
        onlinemessage += "</tr></thead><tbody>";
        for (var index in cplayers) {
            var id = cplayers[index], timepassed = date - players[id].lastmessagetime, name = players[id].name, 
            auth = sys.auth(id), imageindex = sys.auth(id), lower = name.toLowerCase(), os, country, timezone2;
            timepassed = Math.round(timepassed / 1000);
            unit = "seconds";
            if (timepassed == 1) {
                unit = "second";
            }
            if (timepassed > 60) {
                timepassed = Math.round(timepassed / 60);
                unit = "minutes";
                if (timepassed == 1)unit = "minute";
            }
            if (timepassed > 60) {
                timepassed = Math.round((timepassed / 60) * 10) / 10;
                unit = "hours";
                if (timepassed == 1)unit = "hour";
            }
            if (isNaN(timepassed)) {
                timepassed = "";
                unit = "";
            }
            if (unit == "minutes" && timepassed > 5 && timepassed <= 15) {
                color = "orange";
            } else if ((unit == "minutes" && timepassed > 15) || unit == "hour") {
                color = "orangered";
            } else if (unit == "hours") {
                color = "red";
            } else {
                color = "green";
            }
            if (imageindex > 3) {
                imageindex = 0;
            }
            if (sys.battling(id)) {
                imageindex += 8;
            } else if (sys.away(id)) {
                imageindex += 4;
            }
            if (name != sys.name(id)) {
                name += " (" + sys.name(id) + ")";
            }
            onlinemessage += "<tr>" +
            "<td>" + helpers.authimage(imageindex) + "</td>" +
            "<td><font color='" + global["auth" + auth + "color"] + "'>" + helpers.authname(auth, true) + "</font></td>" +
            "<td><b style='color:" + helpers.color(id) + "'>" + name + "</b></td>" +
            "<td>" + id + "</td>";
            !operatingsystem[lower] ? os = "[no data]" : os = operatingsystem[lower].split(" ")[0] + " " + operatingsystem[lower].split(" ")[1];
            !timezone[lower] ? timezone2 = "[no data]" : timezone2 = timezone[lower];
            if (!countryname[lower]) {
                country = "[no data]";
            } else {
                country = helpers.toFlagKey(countryname[lower]);
                !FLAGS[country] ? country = "[no data]" : country = FLAGS[country];
            }
            if (sys.auth(src) >= 1) {
                onlinemessage += "<td>" + sys.ip(id) + "</td>" +
                "<td>" + os + "</td>" +
                "<td>" + country + "</td>" +
                "<td>" + timezone2 + "</td>" +
                "<td>" + helpers.escapehtml(players[id].lastmessage) + " <b style='color:" + color + "'>(" + timepassed + " " + unit + " ago)</b></td>";
            }
            onlinemessage += "</tr>";
        }
        onlinemessage += "</tbody></table><br><br><b>Total Players Online:</b> " + cplayers.length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, onlinemessage, channel);
    }
    
    ,
    
    conline: function (src, channel, command) {
        this.channelonline(src, channel, command);
    }
    
    ,
    
    channelauth: function (src, channel, command) {
        var lower = sys.channel(channel).toLowerCase();
        if (!regchannels[lower]) {
            helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!");
            return;
        }
        var mods = regchannels[lower].mods, admins = regchannels[lower].admins, owners = regchannels[lower].owners;
        var index, i_auth, i_authname, i_name, i_lastlogin, i_status, total = 0;
        var message = border + "<h2>Channel Auth of " + sys.channel(channel) + "</h2><br><style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}"
        + "thead {font-weight:bold;}</style>"
        + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
        + "<td>Icon</td><td>Auth</td><td>Name</td><td>Last Online</td><td>Status</td></tr></thead>";
        // Channel Owners
        for (index in owners) {
            i_name = owners[index];
            i_auth = sys.dbAuth(i_name);
            if (i_auth >= 4) {
                continue; // do not display invisible owners
            }
            i_authname = "Channel Owner";
            lastlogin = sys.dbLastOn(i_name);
            lastlogin = helpers.totimezone(lastlogin, timezone[players[src].name.toLowerCase()].split(':')[0]);
            !timezone[i_name] ? timezone2 = "[no data]" : timezone2 = timezone[i_name];
            lastlogin = lastlogin.split('.')[0];
            lastlogin = lastlogin.replace('T', ", ");
            i_lastlogin = lastlogin;
            i_ip = sys.dbIp(i_name);
            sys.id(i_name) ? i_status = "<font color='green'><b>Online</b></font>" : i_status = "<font color='red'>Offline</font>";
            if (members[i_name]) {
                i_name = members[i_name];
            }
            message += "<tr><td>" + helpers.authimage(i_auth) + "</td><td>" + i_authname + "</td><td>" + i_name + "</td><td>" + i_lastlogin + "</td><td>" + i_status + "</td></tr>";
            total++;
        }
        // Channel Admins
        for (index in admins) {
            i_name = admins[index];
            i_auth = sys.dbAuth(i_name);
            if (i_auth >= 4) {
                continue; // do not display invisible owners
            }
            i_authname = "Channel Admin";
            lastlogin = sys.dbLastOn(i_name);
            lastlogin = helpers.totimezone(lastlogin, timezone[players[src].name.toLowerCase()].split(':')[0]);
            !timezone[i_name] ? timezone2 = "[no data]" : timezone2 = timezone[i_name];
            lastlogin = lastlogin.split('.')[0];
            lastlogin = lastlogin.replace('T', ", ");
            i_lastlogin = lastlogin;
            i_ip = sys.dbIp(i_name);
            sys.id(i_name) ? i_status = "<font color='green'><b>Online</b></font>" : i_status = "<font color='red'>Offline</font>";
            if (members[i_name]) {
                i_name = members[i_name];
            }
            message += "<tr><td>" + helpers.authimage(i_auth) + "</td><td>" + i_authname + "</td><td>" + i_name + "</td><td>" + i_lastlogin + "</td><td>" + i_status + "</td></tr>";
            total++;
        }
        // Channel Mods
        for (index in mods) {
            i_name = mods[index];
            i_auth = sys.dbAuth(i_name);
            if (i_auth >= 4) {
                continue; // do not display invisible owners
            }
            i_authname = "Channel Mod";
            lastlogin = sys.dbLastOn(i_name);
            lastlogin = helpers.totimezone(lastlogin, timezone[players[src].name.toLowerCase()].split(':')[0]);
            !timezone[i_name] ? timezone2 = "[no data]" : timezone2 = timezone[i_name];
            lastlogin = lastlogin.split('.')[0];
            lastlogin = lastlogin.replace('T', ", ");
            i_lastlogin = lastlogin;
            i_ip = sys.dbIp(i_name);
            sys.id(i_name) ? i_status = "<font color='green'><b>Online</b></font>" : i_status = "<font color='red'>Offline</font>";
            if (members[i_name]) {
                i_name = members[i_name];
            }
            message += "<tr><td>" + helpers.authimage(i_auth) + "</td><td>" + i_authname + "</td><td>" + i_name + "</td><td>" + i_lastlogin + "</td><td>" + i_status + "</td></tr>";
            total++;
        }
        message += "</table><br><br><b>Total Channel Auth Members:</b> " + total + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, message, channel);
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
