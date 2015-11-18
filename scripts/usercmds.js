/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY USER COMMANDS usercmds.js
     - by Maribel Hearn, 2012-2015
    
    This file contains commands that can be
    run by any user.
    ----------------------------------------------
*/
usercommands = {
    /**
        -------------
        Command Lists
        -------------
    **/
    commands: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase(), auth = sys.auth(src), commandsmessage = border + "<h2>Commands</h2><br>" +
        "<b>" + helpers.userl("/usercommands") + "</b>: displays user commands.<br>";
        commandsmessage += (auth >= 1 ? "<b>" + helpers.userl("/modcommands") + "</b>: displays moderator commands.<br>" : "");
        commandsmessage += (auth >= 2 ? "<b>" + helpers.userl("/admincommands") + "</b>: displays administrator commands.<br>" : "");
        commandsmessage += (auth >= 3 ? "<b>" + helpers.userl("/ownercommands") + "</b>: displays owner commands.<br>" : "");
        commandsmessage += "<b>" + helpers.userl("/cusercommands") + "</b>: displays channel user commands.<br>";
        commandsmessage += (helpers.cauth(lower, channel) >= 1 ? "<b>" + helpers.userl("/cmodcommands") + "</b>: displays channel moderator commands.<br>" : "");
        commandsmessage += (helpers.cauth(lower, channel) >= 2 ? "<b>" + helpers.userl("/cadmincommands") + "</b>: displays channel administrator commands.<br>" : "");
        commandsmessage += (helpers.cauth(lower, channel) >= 3 ? "<b>" + helpers.userl("/cownercommands") + "</b>: displays channel owner commands.<br>" : "");
        if (helpers.isLoaded("funcmds.js") || helpers.isLoaded("party.js") || helpers.isLoaded("rr.js") || helpers.isLoaded("roulette.js")) {
            commandsmessage += "<br>";
        }
        if (helpers.isLoaded("funcmds.js")) {
            commandsmessage += "<b>" + helpers.userl("/funcommands") + "</b>: displays fun commands.<br>"
        }
        if (helpers.isLoaded("party.js")) {
            commandsmessage += "<b>" + helpers.userl("/partycommands") + "</b>: displays Party commands. Only for the <a href='po:join/" + permchannels[3] + "'>#" + permchannels[3] + "</a> channel.<br>";
        }
        if (helpers.isLoaded("roulette.js")) {
            commandsmessage += "<b>" + helpers.userl("/roulettecommands") + "</b>: displays Roulette commands. Only for the <a href='po:join/" + permchannels[5] + "'>#" + permchannels[5] + "</a> channel.<br>";
        }
        if (helpers.isLoaded("rr.js")) {
            commandsmessage += "<b>" + helpers.userl("/rrcommands") + "</b>: displays Russian Roulette options. Only for the <a href='po:join/" + permchannels[4] + "'>#" + permchannels[4] + "</a> channel.<br>";
        }
        commandsmessage += "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    usercommands: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>User Commands</h2>"
        + "<br>"
        + "<b>" + helpers.userl("/infooptions") + "</b>: displays information options.<br>"
        + "<b>" + helpers.userl("/interactoptions") + "</b>: displays interaction options.<br>"
        + "<b>" + helpers.userl("/messageoptions") + "</b>: displays message options.<br>"
        + "<b>" + helpers.userl("/touroptions") + "</b>: displays tour options.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    infooptions: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>User Commands ~ Info Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/rules") + "</b>: displays the server's rules.<br>"
        + "<b>" + helpers.user("/online") + "</b>: shows the users who are currently online in a neat table.<br>"
        + "<b>" + helpers.user("/auth") + "</b>: shows the server authority in a neat table. Also /auths or /authlist.<br>"
        + "<b>" + helpers.user("/channels") + "</b>: shows the channels that are currently online in a neat table.<br>"
        + "<b>" + helpers.user("/battles") + "</b>: shows the battles that are currently going on in a neat table.<br>"
        + "<b>" + helpers.user("/mp") + "</b>: displays your own Control Panel data.<br>"
        + "<b>" + helpers.user("/myalts") + "</b>: displays info about your alts in a neat table.<br>"
        + "<b>" + helpers.user("/uptime") + "</b>: displays for how long the server has been up since its last restart.<br>"
        + "<b>" + helpers.user("/registry") + "</b>: shows the current Pokémon Online registry.<br>"
        + "<b>" + helpers.user("/serverinfo") + "</b>: displays server information.<br>"
        + "<b>" + helpers.user("/scriptinfo") + "</b>: displays script information.<br>"
        + "<b>" + helpers.user("/playerinfo ") + helpers.arg("player") + "</b>: displays information about <b>player</b>, including when they were last seen. "
        + "If <b>player</b> is not specified, displays your own player info. Cannot show gradients.<br>"
        + "<b>" + helpers.user("/help ") + helpers.arg("topic") + "</b>: displays help on <b>topic</b>. <b>topic</b> can be any of the game channels: Party, Roulette or Russian Roulette (RR).<br>"
        + "<b>" + helpers.user("/team ") + helpers.arg("number") + "</b>: displays your team with number <b>number</b>. If <b>number</b> is not specified, displays your first team.<br>"
        + "<b>" + helpers.user("/pokedex ") + helpers.arg("Pokémon") + "</b>: displays <b>Pokémon</b>'s data in a neat table. Also /pokemon.<br>"
        + "<b>" + helpers.user("/movedex ") + helpers.arg("move") + "</b>: displays data for <b>move</b> in a neat table. Also /move.<br>"
        + "<b>" + helpers.user("/abilitydex ") + helpers.arg("ability") + "</b>: displays data for <b>ability</b> in a neat table. Also /ability.<br>"
        + "<b>" + helpers.user("/movepool ") + helpers.arg("Pokémon") + helpers.arg2("*move") + "</b>: displays if <b>move</b> is in <b>Pokémon</b>'s movepool. If <b>move</b> is not specified, displays <b>Pokémon</b>'s movepool. Also /canlearn.<br>"
        + "<b>" + helpers.user("/gradient ") + helpers.arg("gradient") + "</b>: tests <b>gradient</b>. Useful for trainer info.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    interactoptions: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>User Commands ~ Interact Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/color ") + helpers.arg("color") + "</b>: changes your color to <b>color</b>. <b>color</b> must be valid. Also /colour.<br>"
        + "<b>" + helpers.user("/idle") + "</b>: changes your status to idle. Also /afk or /away.<br>"
        + "<b>" + helpers.user("/unidle") + "</b>: changes your status to available. Also /(go)back.<br>"
        + "<b>" + helpers.user("/unregister") + "</b>: clears your password.<br>"
        + "<b>" + helpers.user("/name ") + helpers.arg("text") + "</b>: changes your username to <b>text</b>.<br>"
        + "<b>" + helpers.user("/reset") + "</b>: sets your username and color back to their original states.<br>"
        + "<b>" + helpers.user("/resetname") + "</b>: sets your username back to its original state.<br>"
        + "<b>" + helpers.user("/resetcolor") + "</b>: sets your color back to its original state. Also /resetcolour.<br>"
        + "<b>" + helpers.user("/reverse") + "</b>: reverses your username.<br>"
        + "<b>" + helpers.user("/selfkick") + "</b>: kicks yourself from the server.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    messageoptions: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>User Commands ~ Message Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/me ") + helpers.arg("message") + "</b>: posts <b>message</b> between asterisks, in bold and your name color.<br>"
        + "<b>" + helpers.user("/poke ") + helpers.arg("text/player") + "</b>: pokes <b>text</b> or <b>player</b>. If <b>player</b> is specified over <b>text</b>, they are online and you have auth, they get flashed.<br>"
        + "<b>" + helpers.user("/imp ") + helpers.arg("text") + helpers.arg2("*message") + "</b>: posts <b>message</b> as <b>text</b>.<br>"
        + "<b>" + helpers.user("/impme ") + helpers.arg("text") + helpers.arg2("*message") + "</b>: posts <b>message</b> between asterisks and in bold in your name color as <b>text</b>.<br>"
        + "<b>" + helpers.user("/future ") + helpers.arg("text") + helpers.arg2("*time") + "</b>: posts <b>message</b> into the future, to arrive in <b>time</b>. <b>message</b> can also be a command.<br>"
        + "<b>" + helpers.user("/listen ") + helpers.arg("youtube link") + "</b>: posts a message saying that you're listening to <b>youtube link</b>. The link will turn into the video's title.<br>"
        + "<b>" + helpers.user("/quote ") + helpers.arg("text") + helpers.arg2("*author") + "</b>: posts <b>text</b> as a quote, cited from <b>author</b>.<br>"
        + "<b>" + helpers.user("/spoiler ") + helpers.arg("text") + helpers.arg2("*source") + "</b>: posts <b>text</b> as a spoiler of <b>source</b>. <b>source</b> is optional.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    touroptions: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>User Commands ~ Tour Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/join") + "</b>: join the current tour.<br>"
        + "<b>" + helpers.user("/leave") + "</b>: leave the current tour.<br>"
        + "<b>" + helpers.user("/viewtour") + "</b>: display the current tour.<br>"
        + "<b>" + helpers.user("/viewround") + "</b>: view the current round.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    help: function (src, channel, command) {
        var helpmessage = border, topic = command[1];
        if (!topic) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, topic not found.");
            return;
        }
        topic = topic.toLowerCase();
        if (topic == "roulette") {
            helpmessage += "<h2>Roulette Help</h2>"
            + "<br>"
            + "<h3>General</h3>"
            + "Use the <b>" + helpers.user("/roulette") + "</b> command to generate a Pokémon.<br>"
            + "It can be any Pokémon, including Shiny ones. They can have any nature and any held item.<br>"
            + "<h3>Shiny Pokémon and Random Events</h3>"
            + "Shiny Pokémon are very rare by default, having the same probability of encounter as in the games, but<br>"
            + "this probability can increase under certain conditions.<br>"
            + "Random events will occur in the " + permchannels[5] + " channel, one of which is the \"Shiny Frenzy\", which<br>"
            + "will increase your odds of generating a Shiny by a significant amount.<br>"
            + "<h3>Chaining</h3>"
            + "Whenever you generate a Pokémon, your chances of generating that same Pokémon are<br>"
            + "bigger than generating any other Pokémon; when you get the same Pokémon multiple times in a row,<br>"
            + "you are getting a chain of that Pokémon. Chaining a Pokémon will double the probability to<br>"
            + "generate a shiny one on each successive generation of the same Pokémon.<br>"
            + "<br>"
            + "Use <b>" + helpers.user("/roulettecommands") + "</b> to list the commands for Roulette.<br>";
        } else if (topic == "party") {
            helpmessage += "<h2>Party Help</h2>"
            + "<br>"
            + "<h3>General</h3>"
            + "In the #" + permchannels[3] + " channel, a so-called 'mode' can be active, activated by channel auth,<br>"
            + "which will affect your posts or the entire chat in some way. A list of modes can be found below.<br>"
            + "<h3>Modes</h3>"
            + "<b>Joke</b>: makes everyone post as a random user that is currently on the server.<br>"
            + "<b>Nightclub</b>: gives the chat a black background with white posts, and usernames rainbow colors.<br>"
            + "<b>Desu</b>: gives all posts desu colors, red and green, and they are bolded as well.<br>"
            + "<b>Rainbow</b>: the same as Desu, except posts will be rainbow colored.<br>"
            + "<b>Nyan</b>: every character in your post will be replaced by Nyan and will be posted on<br>"
            + "a colored background, which changes with every post to follow the rainbow pattern.<br>"
            + "<b>Dennis</b>: turns your post into DENNIS! It will be elongated the longer your post is.<br>"
            + "<b>Cirno</b>: similar to Dennis, except your post turns into (9) and BAKA.<br>"
            + "<b>Sparta</b>: similar to Dennis, except your post turns into THIS IS SPARTA!<br>"
            + "<b>Luigi</b>: similar to Dennis, except your post turns into spaghEEEEEtti!<br>"
            + "<b>Roflcopter</b>: similar to Dennis, except your post turns into 'soi'.<br>"
            + "<b>Derp</b>: similar to Dennis, except your post turns into random derp family members.<br>"
            + "<b>Asdf</b>: similar to Dennis, except your post turns into asdf.<br>"
            + "<b>Leet</b>: posts will be converted to Leet.<br>"
            + "<b>Morse</b>: posts will be converted to Morse code.<br>"
            + "<b>Reverse</b>: posts will be reversed.<br>"
            + "<b>Russian</b>: posts will be converted to the Cyrillic alphabet.<br>"
            + "<br>"
            + "Use <b>" + helpers.user("/partycommands") + "</b> to list the commands for Party.<br>";
        } else if (topic == "russian roulette" || topic == "rr") {
            helpmessage += "<h2>Russian Roulette Help</h2>"
            + "<br>"
            + "<h3>General</h3>"
            + "In Russian Roulette, the point is to try to survive as many shots as possible.<br>"
            + "With a single bullet loaded, your chance to die is 1 / 6. If you die,<br>"
            + "you will get kicked from the channel. Try to get your longest survival streak<br>"
            + "as long as possible! Use <b>" + helpers.user("/load") + "</b> to load a bullet into your revolver,<br>"
            + "and <b>" + helpers.user("/shoot") + "</b> to pull the trigger. The <b>" + helpers.user("/load") + "</b> command<br>"
            + "will automatically start the game for you, by initialising your data on top of loading a bullet.<br>"
            + "<br>"
            + "Use <b>" + helpers.user("/rrcommands") + "</b> to list the commands for Russian Roulette.<br>";
        } else {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid topic.");
            return;
        }
        helpmessage += "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, helpmessage, channel);
    }
    
    ,

    /**
        ------------
        Info Options
        ------------
    **/
    rules: function (src, channel, command) {
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
        sys.sendHtmlMessage(src, rulesmessage, channel);
    }
    
    ,
    
    online: function (src, channel, command) {
        var onlinemessage = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" 
        + "thead {font-weight:bold;}</style><h2>Players Online</h2><br>"
        + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
        + "<td>Icon</td><td>Auth</td><td>Name</td><td>ID</td>", srcauth = sys.auth(src), date = new Date(), unit;
        if (srcauth >= 1) {
            onlinemessage += "<td>IP Address</td><td>Client</td><td>Country</td><td>Time Zone</td><td>Last Message</td>";
        }
        onlinemessage += "</tr></thead><tbody>";
        for (var index in players) {
            var id = index, timepassed = date - players[index].lastmessagetime, name = players[index].name;
            var auth = sys.auth(id), imageindex = sys.auth(id), lower = name.toLowerCase(), os, country, timezone2;
            timepassed = Math.round(timepassed / 1000);
            unit = "seconds";
            if (timepassed == 1) {
                unit = "second";
            }
            if (timepassed > 60) {
                timepassed = Math.round(timepassed / 60);
                unit = "minutes";
                if (timepassed == 1) {
                    unit = "minute";
                }
            }
            if (timepassed > 60) {
                timepassed = Math.round((timepassed / 60) * 10) / 10;
                unit = "hours";
                if (timepassed == 1) {
                    unit = "hour";
                }
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
            "<td>" + helpers.authimage(src, imageindex) + "</td>" +
            "<td>" + helpers.authname(auth, true) + "</td>" +
            "<td><b style='color:" + helpers.color(id) + "'>" + name + "</b></td>" +
            "<td>" + id + "</td>";
            !operatingsystem[lower] ? os = "[no data]" : os = operatingsystem[lower].split(' ')[0] + " " + operatingsystem[lower].split(' ')[1];
            !timezone[lower] ? timezone2 = "[no data]" : timezone2 = timezone[lower];
            if (!countryname[lower]) {
                country = "[no data]";
            } else {
                country = helpers.toFlagKey(helpers.removespaces(countryname[lower].toUpperCase()));
                !FLAGS[country] ? country = "[no data]" : country = FLAGS[country];
            }
            if (srcauth >= 1) {
                onlinemessage += "<td>" + sys.ip(id) + "</td>" +
                "<td>" + os + "</td>" +
                "<td>" + country + "</td>" +
                "<td>" + timezone2 + "</td>" +
                "<td>" + helpers.escapehtml(players[id].lastmessage) + " <b style='color:" + color + "'>(" + timepassed + " " + unit + " ago)</b></td>";
            }
            onlinemessage += "</tr>";
        }
        var playernum = sys.numPlayers();
        onlinemessage += "</tbody></table><br><br><b>Total Players Online:</b> " + playernum + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, onlinemessage, channel);
    }
    
    ,
    
    channels: function (src, channel, command) {
        var channelmessage = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" 
        + "thead {font-weight:bold;}</style><h2>Channels Online</h2><br>"
        + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
        + "<td>ID</td><td>Name</td><td>Description</td>";
        var channellist = sys.channelIds().sort(), total = channellist.length;
        channelmessage += "</tr></thead>";
        for (var index in channellist) {
            var name = sys.channel(channellist[index]), id = sys.channelId(name), descr;
            if (id === 0) {
                descr = "Main channel.";
            } else if (name == permchannels[0]) {
                descr = "The watch channel, for server authorities.";
            } else if (name == permchannels[1]) {
                descr = "Server authorities discuss things here.";
            } else if (name == permchannels[2]) {
                descr = "For the server owners.";
            } else if (name == permchannels[3]) {
                descr = "To have some fun.";
            } else if (name == permchannels[4]) {
                descr = "To play Russian Roulette.";
            } else if (name == permchannels[5]) {
                descr = "To play Roulette.";
            } else {
                descr = "An unofficial channel.";
            }
            channelmessage += "<tr><td>" + id + "</td><td><a href='po:join/" + name + "'>#" + name + "</a></td><td>" + descr + "</td></tr>";
        }
        channelmessage += "</table><br><br><b>Total Channels Online:</b> " + total + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, channelmessage, channel);
    }
    
    ,
    
    battles: function (src, channel, command) {
        var battlemessage = border + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" 
        + "thead {font-weight:bold;}</style><h2>Battles Online</h2><br>"
        + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
        + "<td>ID</td><td>Player 1</td><td>Player 2</td><td>Tier</td><td>Clauses</td><td>Start Time</td><td>Link</td>";
        battlemessage += "</tr></thead>";
        for (var index in battles) {
            var p1 = battles[index].p1, p2 = battles[index].p2, tier = battles[index].tier, clauses = battles[index].clauses, start = battles[index].start;
            var link = "<a href='po:watch/" + index + "'>Watch Battle</a>";
            start = helpers.toTimeZone(start, timezone[players[src].name.toLowerCase()].split(":")[0]);
            start = start.split(".")[0];
            start = start.replace("T", ", ");
            battlemessage += "<tr><td>" + index + "</td><td>" + p1 + "</td><td>" + p2 + "</td><td>" + tier + "</td><td>" + clauses + "</td><td>" + start + "</td><td>" + link + "</td></tr>";
        }
        var total = Object.keys(battles).length;
        battlemessage += "</table><br><br><b>Total Battles Online:</b> " + total + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, battlemessage, channel);
    }
    
    ,
    
    uptime: function (src, channel, command) {
        var uptime = sys.profileDump().split('\n')[0].split(',')[0].split(':')[1].slice(1, -2);
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The server has been up for " + helpers.formatUptime(uptime), channel);
    }
    
    ,
    
    registry: function (src, channel, command) {
        var auth = sys.auth(src), registrymessage = border + "<style type='text/css'>table {border-width: 1px; border-style: solid; border-color: black;}</style><h2>Pokémon Online Registry</h2><br>" +
        "<table cellpadding=2 cellspacing=0><thead><tr style='background-color: #b0b0b0;'><th>Server</th><th>Players Online</th><th>Advanced Connection</th>";
        if (auth >= 1) {
            registrymessage += "<th>Host Country</th>";
        }
        registrymessage += "</tr></thead><tbody>";
        var servername = sys.getServerName(), servers = [], playernums = [], serverIps = [], serverCountries = [], advConnects = [], total = 0, tmp1, tmp2;
        sys.webCall(REGISTRY_URL, function (resp) {
            if (resp === "") {
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + "An error occurred while fetching the registry.", channel);
            }
            tmp1 = helpers.strip(resp.slice(resp.indexOf("<ul class=\"list-group\">") + 23, resp.indexOf("</ul>"))).replace(/: /g, ',').replace(/[\n\r]/g, ' ').replace(/players/g, "players,").split(',');
            for (var i in tmp1) {
                tmp1[i] = tmp1[i].trim();
                if (i == tmp1.length - 1) {
                    continue;
                } else if (i % 2 !== 0) {
                    playernums.push(tmp1[i].split(' ')[0]);
                } else {
                    servers.push(tmp1[i]);
                }
            }
            tmp2 = resp.split(/\n|\r| /);
            for (var j in tmp2) {
                if (tmp2[j].substr(0, 4) == "<!--") {
                    advConnects.push(tmp2[j].slice(4, -3));
                }
                if (tmp2[j].substr(0, 3) == "ip=") {
                    ip = tmp2[j].slice(4, -1);
                    serverIps.push(ip);
                    serverCountries.push(helpers.serverCountry(ip));
                }
            }
            for (var k in servers) {
                registrymessage += "<tr><td>" + (servers[k] == servername ? "<b>" + servers[k] + "</b>" : servers[k]) + "</td><td>" + playernums[k] + "</td><td>" + advConnects[k] + "</td>";
                if (auth >= 1) {
                    registrymessage += "<td>" + serverCountries[k] + "</td>";
                }
                registrymessage += "</tr>";
                total += parseInt(playernums[k]);
            }
            registrymessage += "</tbody></table><br>" +
            "<br><b>Total Servers:</b> " + servers.length +
            "<br><b>Total Players:</b> " + total +
            "<br><b>Percentage on " + servername + ":</b> " + (sys.numPlayers() / total * 100).toPrecision(2) + "%" +
            "<br>Players that are logged onto multiple servers are counted multiple times.<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, registrymessage, channel);
        });
    }
    
    ,
    
    serverinfo: function (src, channel, command) {
        var servermessage = border + "<h2>Server Info</h2><br>", ports = sys.serverPorts().length,
        DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        uptime = sys.profileDump().split('\n')[0].split(',')[0].split(':')[1].slice(1, -2),
        serverprivate = sys.isServerPrivate(), d = new Date(), day = d.getDay();
        date = d.getDate(), month = d.getMonth(), year = d.getFullYear();
        date = DAYS[day] + ", " + MONTHS[month] + " " + date + ", " + year;
        var time = d.toTimeString().substr(0, 15).replace("+0", "+");
        serverprivate === true ? serverprivate = "<font color='red'>No</font>" : serverprivate = "<b style='color:green'>Yes</b>";
        open === false ? serveropen = "<font color='red'>No</font>" : serveropen = "<b style='color:green'>Yes</b>";
        servermessage += "<br><b>Name:</b> " + sys.getServerName() +
        "<br><b>Host OS:</b> " + helpers.os(sys.os()) +
        "<br><b>Version:</b> " + sys.serverVersion() +
        "<br><b>IP:</b> " + hostIp +
        "<br><b>" + (ports == 1 ? "Port" : "Ports") + ":</b> " + sys.serverPorts().join(", ") +
        "<br><b>Public:</b> " + serverprivate + "<br><b>Open:</b> " + serveropen + "<br><br>" + "<b>Local Date:</b> " + date +
        "<br><b>Local Time:</b> " + time + "<br><b>Server Uptime:</b> " + helpers.formatUptime(uptime) + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, servermessage, channel);
    }
    
    ,
    
    scriptinfo: function (src, channel, command) {
        var scriptmessage = border + "<h2>Script Info</h2>", scriptcontent = [], length;
        scriptcontent.push(sys.read("scripts.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "main.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "base64.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "tierchecks.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "helpers.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "usercmds.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "modcmds.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "admincmds.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "ownercmds.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "cusercmds.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "cmodcmds.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "cadmincmds.js"));
        scriptcontent.push(sys.read(SCRIPTS_FOLDER + "cownercmds.js"));
        if (helpers.isLoaded("funcmds.js")) {
            scriptcontent.push(sys.read(PLUGINS_FOLDER + "funcmds.js"));
        }
        if (helpers.isLoaded("party.js")) {
            scriptcontent.push(sys.read(PLUGINS_FOLDER + "party.js"));
        }
        if (helpers.isLoaded("rr.js")) {
            scriptcontent.push(sys.read(PLUGINS_FOLDER + "rr.js"));
        }
        if (helpers.isLoaded("roulette.js")) {
            scriptcontent.push(sys.read(PLUGINS_FOLDER + "roulette.js"));
        }
        scriptcontent = scriptcontent.join();
        scriptmessage += "<h3>Basic Information</h3><br>" +
        "<b>Name:</b> Fun Community Scripts<br>" +
        "<b>Creator:</b> Maribel Hearn<br>" +
        "<b>Characters:</b> " + scriptcontent.length + "<br>" +
        "<b>Lines:</b> " + scriptcontent.split(/\u000A/g).length + "<br>" +
        "<h3>Contribution</h3><br>" +
        "Contributed to by: General Thor<br>";
        scriptmessage += "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, scriptmessage, channel);
    }
    
    ,
    
    playerinfo: function (src, channel, command) {
        var infomessage = border + "<h2>Player Info</h2><br>", player = command[1], trgt, auth, imageindex, status, lastlogin;
        if (!player) {
            player = sys.name(src);
        }
        if (!sys.dbExists(player)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you can't check the player info of " + name + " because they do not exist in the database.");
            return;
        }
        trgt = sys.id(player);
        lastlogin = helpers.formatLastOn(src, sys.dbLastOn(player));
        if (members[player.toLowerCase()]) {
            player = members[player.toLowerCase()];
        }
        if (trgt) {
            auth = (sys.auth(trgt) >= 4 ? 0 : sys.auth(trgt));
            imageindex = auth;
            if (sys.battling(trgt)) {
                imageindex += 8;
            } else if (sys.away(trgt)) {
                imageindex += 4;
            }
            status = "<font color='green'><b>Online</b></font>";
            infomessage += helpers.authimage(src, imageindex) + " " + player + " " + status +
            "<br><b>Auth:</b> " + helpers.authname(sys.dbAuth(player), true, true) +
            "<br><b>Avatar:</b> <img src='trainer:" + sys.avatar(trgt) + "'>" +
            "<br><b>Trainer Info:</b> " + sys.info(trgt) + "";
        } else {
            auth = (sys.dbAuth(player) >= 4 ? 0 : sys.dbAuth(player));
            imageindex = auth + 4;
            status = "<font color='red'>Offline</font>";
            infomessage += helpers.authimage(src, imageindex) + " " + player + " " + status +
            "<br><b>Auth:</b> " + helpers.authname(sys.dbAuth(player), true, true);
        }
        infomessage += "<br><b>Last Online:</b> " + lastlogin +
        "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, infomessage, channel);
    }
    
    ,
    
    auth: function (src, channel, command) {
        var srcauth = sys.auth(src), index, auth, authname, name, ip, lastlogin, status, total, country, timezone2;
        var authlist = helpers.authSort(), length = 0;
        var message = border + "<h2>Server Authority</h2>"
        + "<br><style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}thead {font-weight:bold;}</style>"
        + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
        + "<td>Icon</td><td>Auth</td><td>Title</td><td>Name</td>";
        if (srcauth > 0) {
            message += "<td>IP</td><td>Country</td><td>Time Zone</td>";
        }
        message += "<td>Last Online</td><td>Status</td></tr></thead>";
        for (index in authlist) {
            name = authlist[index];
            auth = sys.dbAuth(name);
            if (auth >= 4) {
                continue; // do not display invisible owners
            }
            lastlogin = helpers.formatLastOn(src, sys.dbLastOn(name));
            ip = sys.dbIp(name);
            authname = helpers.authname(auth, true);
            sys.id(name) ? status = "<font color='green'><b>Online</b></font>" : status = "<font color='red'>Offline</font>";
            !timezone[name] ? timezone2 = "[no data]" : timezone2 = timezone[name];
            if (!countryname[name]) {
                country = "[no data]";
            } else {
                country = helpers.toFlagKey(helpers.removespaces(countryname[name].toUpperCase()));
                !FLAGS[country] ? country = "[no data]" : country = FLAGS[country];
            }
            if (members[name]) {
                name = members[name];
            }
            message += "<tr><td>" + helpers.authimage(src, auth) + "</td><td>" + authname + "</td><td>" + authtitles[name.toLowerCase()] + "</td><td>" + name + "</td>";
            if (srcauth >= 1) {
                message += "<td>" + ip + "</td><td>" + country + "</td><td>" + timezone2 + "</td>";
            }
            message += "<td>" + lastlogin + "</td><td>" + status + "</td></tr>";
            length++;
        }
        message += "</table><br><br><b>Total Auth Members:</b> " + length + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, message, channel);
    }
    
    ,
    
    auths: function (src, channel, command) {
        this.auth(src, channel, command);
    }
    
    ,
    
    authlist: function (src, channel, command) {
        this.auth(src, channel, command);
    }
    
    ,
    
    mp: function (src, channel, command) {
        command[1] = players[src].name;
        modcommands.cp(src, channel, command);
    }
    
    ,

    myalts: function (src, channel, command) {
        var altsmessage = border + "<h2>My Alts</h2><br><style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}"
        + "thead {font-weight:bold;}</style>"
        + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'>"
        + "<td>Icon</td><td>Auth</td><td>Title</td><td>Name</td><td>Registered</td><td>Last Online</td></tr></thead><tbody>", total = 0, alts = sys.aliases(sys.ip(src)), title = "", name, auth, registered, lastlogin;
        for (var index in alts) {
            name = alts[index];
            auth = sys.dbAuth(name);
            authtitles[name] ? title = authtitles[name] : title = '-';
            sys.dbRegistered(name) ? registered = "<b style='color:green'>Yes</b>" : registered = "<font color='red'>No</font>";
            lastlogin = helpers.formatLastOn(src, sys.dbLastOn(name));
            if (members[alts[index]]) {
                name = members[alts[index]];
            }
            altsmessage += "<tr><td>" + helpers.authimage(src, auth > 3 ? 0 : auth) + "</td><td>" + helpers.authname(auth, true) + "</td><td>" + title +
            "</td><td>" + name + "</td><td>" + registered + "</td><td>" + lastlogin + "</td></tr>";
            total++;
        }
        altsmessage += "</tbody></table><br><br><b>Total Alts:</b> " + total + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, altsmessage, channel);
    }
    
    ,
    
    pokedex: function (src, channel, command) {
        var UNKNOWN_TYPE = 18, MAX_IV = 31, MIN_EV = 0, MAX_EV = 252, MIN_NATURE = 0.9, NEUTRAL_NATURE = 1.0, MAX_NATURE = 1.1;
        var pokemon = command[1], pokeNum, type1, type2, types = [], abilities = [], genders = [], height, weight, americanHeight, americanWeight, weightPower, baseStats, bst, dexmessage, stat;
        if (!pokemon) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, Pokémon not found.");
            return;
        }
        if (!sys.pokeNum(pokemon)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid Pokémon name.");
            return;
        }
        pokeNum = sys.pokeNum(pokemon);
        pokemon = sys.pokemon(pokeNum);
        type1 = sys.pokeType1(pokeNum);
        type2 = sys.pokeType2(pokeNum);
        types.push(helpers.typeImage(src, type1));
        if (type2 != UNKNOWN_TYPE) {
            types.push(helpers.typeImage(src, type2));
        }
        for (var i = 0; i <= 2; i++) {
            if (sys.pokeAbility(pokeNum, i) !== 0) {
                abilities.push(sys.ability(sys.pokeAbility(pokeNum, i)) + (i == 2 ? " (Hidden)" : ""));
            }
        }
        for (var j in sys.pokeGenders(pokeNum)) {
            genders.push(helpers.genderImage(src, sys.genderNum(j == "neutral" ? "genderless" : j)));
        }
        height = helpers.height(pokeNum);
        weight = helpers.weight(pokeNum);
        americanHeight = parseInt(height * 32.808399) / 10;
        americanWeight = parseInt(weight * 22) / 10;
        weightPower = helpers.weightPower(pokeNum);
        baseStats = sys.pokeBaseStats(pokeNum);
        bst = helpers.sum(baseStats);
        dexmessage = border + "<h2>#" + helpers.displayNum(pokeNum) + " " + pokemon + "</h2>"
        + "<br>" + helpers.pokeImage(pokeNum)
        + "<br><b>Type:</b> " + types.join("")
        + "<br><b>Abilities:</b> " + abilities.join(" / ")
        + "<br><b>Gender:</b> " + genders.join(/img/.test(genders.toString()) ? "" : " / ")
        + "<br><b>Height:</b> " + height + " m / " + americanHeight + " ft"
        + "<br><b>Weight:</b> " + weight + " kg / " + americanWeight + " lbs"
        + "<br><b>Power of Grass Knot / Low Kick:</b> " + weightPower
        + "<style>table {border-width:1px; border-style:solid; border-color:#000;} thead {font-weight:bold;}</style>"
        + "<br><table cellpadding='2' cellspacing='0'><thead><tr><th>Stat</th><th>Base</th><th>Min-</th><th>Min</th><th>Max</th><th>Max+</th></tr></thead><tbody>";
        for (var k in baseStats) {
            stat = baseStats[k];
            dexmessage += "<tr>"
            + "<th>" + helpers.statName(k) + "</th>"
            + "<td>" + helpers.colorStat(stat) + "</td>"
            + "<td>" + (k === 0 ? '-' : helpers.calcStat(k, stat, MAX_IV, MIN_EV, MIN_NATURE)) + "</td>"
            + "<td>" + helpers.calcStat(k, stat, MAX_IV, MIN_EV, NEUTRAL_NATURE) + "</td>"
            + "<td>" + helpers.calcStat(k, stat, MAX_IV, MAX_EV, NEUTRAL_NATURE) + "</td>"
            + "<td>" + (k === 0 ? '-' : helpers.calcStat(k, stat, MAX_IV, MAX_EV, MAX_NATURE)) + "</td>"
            + "</tr>";
        }
        dexmessage += "</tbody><tfoot><tr><td colspan='6'><b>Base Stat Total:</b> " + bst + "</td></tr></tfoot></table><br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, dexmessage, channel);
    }
    
    ,
    
    pokemon: function (src, channel, command) {
        this.pokedex(src, channel, command);
    }
    
    ,
    
    movedex: function (src, channel, command) {
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid move name or ID.");
            return;
        }
        if (!isNaN(command[1])) {
            id = command[1];
            if (id < 1 || id > 1122) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid move ID.");
                return;
            }
        } else {
            id = sys.moveNum(command[1]);
            if (id === undefined || id < 1 || id > 1122) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid move name.");
                return;
            }
        }
        var type = "<img src='Themes/Classic/types/type" + sys.moveType(id) + ".png'>", name = sys.move(id);
        var movedexmessage = border + "<br><h2>Movedex</h2><br>"
        + "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}thead {font-weight:bold;}tfoot {font-style:italic;}</style>"
        + "<table cellpadding=2 cellspacing=0><thead><tr style='background-color:#b0b0b0;'><td>Number</td><td>Name</td><td>Type</td><td>Category</td><td>Base Power</td>"
        + "<td>PP</td><td>Accuracy</td><td>Priority</td><td>Range</td></tr></thead><tbody><tr><td>" + id + "</td><td>" + name + "</td><td>" + type + "</td>";
        var powers = sys.read("db/moves/5G/power.txt"), pps = sys.read("db/moves/5G/pp.txt"), accs = sys.read("db/moves/5G/accuracy.txt");
        var prios = sys.read("db/moves/5G/priority.txt"), ranges = sys.read("db/moves/5G/range.txt");
        var cats = sys.read("db/moves/5G/damage_class.txt"), chances = sys.read("db/moves/5G/effect_chance.txt");
        var effects = sys.read("db/moves/5G/power.txt"), descrs = sys.read("db/moves/move_description.txt");
        powers = powers.split("\n");pps = pps.split("\n");accs = accs.split("\n");descrs = descrs.split("\n");cats = cats.split("\n");prios = prios.split("\n");ranges = ranges.split("\n");
        var powerarray = [], pparray = [], accarray = [], catarray = [], prioarray = [], rangearray = [], derp;
        for (var index in powers) {
            derp = powers[index].split(" ");
            powerarray[derp[0]] = derp[1];
        }
        for (var index2 in pps) {
            derp = pps[index2].split(" ");
            pparray[derp[0]] = derp[1];
        }
        for (var index3 in accs) {
            derp = accs[index3].split(" ");
            accarray[derp[0]] = derp[1];
        }
        for (var index4 in cats) {
            derp = cats[index4].split(" ");
            catarray[derp[0]] = derp[1];
        }
        for (var index5 in prios) {
            derp = prios[index5].split(" ");
            prioarray[derp[0]] = derp[1];
        }
        for (var index6 in ranges) {
            derp = ranges[index6].split(" ");
            rangearray[derp[0]] = derp[1];
        }
        var power = powerarray[id], pp = pparray[id], acc = accarray[id], descr = descrs[id], cat = catarray[id], prio = prioarray[id], range = rangearray[id];
        if (power === undefined)power = "-";if (prio === undefined)prio = "0";if (range === undefined)range = "Single foe";
        if (range === 0)range = "Single foe";else if (range == 4)range = "All";else if (range == 5)range = "Both foes";else if (range == 7)range = "Self";
        if (range == 12)range = "Team";if (cat == 1)cat = "Physical";else if (cat == 2)cat = "Special";else if (cat === 0)cat = "Other";
        if (acc > 100)acc = "-";if (cat == 1)cat = "Physical";else if (cat == 2)cat = "Special";else if (cat === 0)cat = "Other";else if (cat === undefined)cat = "-";
        movedexmessage += "<td>" + cat + "</td><td>" + power + "</td><td>" + pp + "</td><td>" + acc + "</td><td>" + prio + "</td><td>" + range + "</td></tbody>"
        + "<tfoot><tr><td colspan=9>" + descr.slice(id.toString().length + 1) + "</td></tr></tfoot></table><br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, movedexmessage, channel);
    }
    
    ,
    
    move: function (src, channel, command) {
        this.movedex(src, channel, command);
    }
    
    ,
    
    movepool: function (src, channel, command) {
        var learnmessage = border, index = 27, form = 0, pokenum, pokenumdisplay, pokemon, move, id, movelist;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, Pokémon not found.");
            return;
        } else {
            if (isNaN(command[1]) || command[1] == "2012") {
                if (!sys.pokeNum(command[1])) {
                    helpers.starfox(src, channel, command, bots.command, "Error 403, invalid Pokémon name.", channel);
                    return;
                }
                pokenum = sys.pokeNum(command[1]);
                if (pokenum < 1) {
                    helpers.starfox(src, channel, command, bots.command, "Error 403, invalid Pokémon name.", channel);
                    return;
                }
                pokemon = sys.pokemon(pokenum);
            } else {
                if (!sys.pokemon(command[1])) {
                    helpers.starfox(src, channel, command, bots.command, "Error 403, invalid Pokémon ID.", channel);
                    return;
                }
                pokenum = command[1];
                if (pokenum < 1) {
                    helpers.starfox(src, channel, command, bots.command, "Error 403, invalid Pokémon ID.", channel);
                    return;
                }
                pokemon = sys.pokemon(command[1]);
            }
        }
        if (command[2]) {
            if (!isNaN(command[2])) {
                id = command[2];
                if (id < 1 || id > 1122) {
                    helpers.starfox(src, channel, command, bots.command, "Error 403, invalid move ID.");
                    return;
                }
            } else {
                id = sys.moveNum(command[2]);
                if (id === undefined || id < 1 || id > 1122) {
                    helpers.starfox(src, channel, command, bots.command, "Error 403, invalid move name.");
                    return;
                }
            }
            move = sys.move(id);
        }
        var moves = sys.read("db/pokes/5G/all_moves.txt");
        moves = moves.split("\n");
        while (index > 0) {
            if (pokenum >= (65536 * index)) {
                form = Math.floor(pokenum / (65536 * index));
                pokenumdisplay = (pokenum - (65536 * index)).toString() + "-" + index;
                break;
            }
            index--;
            if (index === 0) {
                pokenumdisplay = pokenum;
            }
        }
        learnmessage += "<br><h2>#" + pokenumdisplay + " " + pokemon + "</h2><br><b>Movepool:</b> ";
        if (form > 0) {
            pokenum = pokenumdisplay.slice(0, -2);
        }
        for (var index2 in moves) {
            movelist = moves[index2].split(" ");
            if (movelist[0].split(":")[0] == pokenum && movelist[0].split(":")[1] == form) {
                movelist.splice(0, 1);
                for (var index2 in movelist) {
                    movelist[index2] = sys.move(movelist[index2]);
                }
                learnmessage += movelist.sort().join(", ") + ".<br><br><b>Total Moves:</b> " + movelist.length + "<br><br><timestamp/><br>" + border2;
                if (command[2]) {
                    for (var index2 in movelist) {
                        if (movelist[index2] == move) {
                            sys.sendHtmlMessage(src, helpers.bot(bots.command) + pokemon + " can learn " + move + ".", channel);
                            return;
                        }
                    }
                    sys.sendHtmlMessage(src, helpers.bot(bots.command) + pokemon + " can't learn " + move + ".", channel);
                    return;
                }
            }
        }
        sys.sendHtmlMessage(src, learnmessage, channel);
    }
    
    ,
    
    canlearn: function (src, channel, command) {
        this.movepool(src, channel, command);
    }
    
    ,
    
    abilitydex: function (src, channel, command) {
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid ability name or ID.");
            return;
        }
        if (!isNaN(command[1])) {
            id = command[1];
            if (id < 1 || id > 192) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid ability ID.");
                return;
            }
        } else {
            id = sys.abilityNum(command[1]);
            if (id === undefined || id < 1 || id > 192) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid ability name.");
                return;
            }
        }
        var name = sys.ability(id), descrs = sys.read("db/abilities/ability_battledesc.txt"), abdexmessage = border + "<br><h2>#" + id + " " + name + "</h2><br><b>Description:</b> ";
        descrs = descrs.split("\n");
        var descrarray = [], derp, herp;
        for (var index in descrs) {
            derp = descrs[index].split(" ");
            herp = derp[0];
            delete derp[0];
            derp = derp.join(" ");
            descrarray[herp] = derp;
        }
        var descr = descrarray[id], ablist = [];
        abdexmessage += descr + "<br><b>Pokemon that get this ability:</b> ";
        var ab1 = sys.read("db/pokes/5G/ability1.txt"), ab2 = sys.read("db/pokes/5G/ability2.txt"), ab3 = sys.read("db/pokes/5G/ability3.txt");
        ab1 = ab1.split("\n");ab2 = ab2.split("\n");ab3 = ab3.split("\n");
        for (var index1 in ab1) {
            derp = ab1[index1].split(" ");
            if (derp[1] == id)ablist.push(derp[0]);
        }
        for (var index2 in ab2) {
            derp = ab2[index2].split(" ");
            if (derp[1] == id)ablist.push(derp[0]);
        }
        for (var index3 in ab3) {
            derp = ab3[index3].split(" ");
            if (derp[1] == id)ablist.push(derp[0]);
        }
        for (var index4 in ablist) {
            derp = ablist[index4].split(":");
            ablist[index4] = derp[0];
            ablist[index4] = sys.pokemon(ablist[index4]);
        }
        abdexmessage += ablist.join(", ") + ".<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, abdexmessage, channel);
    }
    
    ,
    
    ability: function (src, channel, command) {
        this.abilitydex(src, channel, command);
    }
    
    ,
    
    team: function (src, channel, command) {
        command[1] ? team = command[1] : team = 0;
        if (team >= sys.teamCount(src)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid team number.");
            return;
        }
        var slot, name = sys.name(src), gen = sys.gen(src, team), viewteammessage = border + "<h2>" + name + "'s Gen " + gen + " Team</h2><br><table>", index = 1, iddisplay;
        for (slot = 0; slot < 6; slot++) {
            var id = sys.teamPoke(src, team, slot);
            if (id === 0) {
                break;
            }
            var name = sys.pokemon(id), nick = sys.teamPokeNick(src, team, slot), gender = sys.teamPokeGender(src, team, slot);
            var genderletter = ({ 2: "(F)", 1: "(M)", 0: ""}[gender]), item = sys.teamPokeItem(src, team, slot);
            if (slot === 0 || slot == 3) {
                viewteammessage += "<tr>";
            }
            viewteammessage += "<td><b>" + nick + " (" + name + ") " + genderletter + "</b><br>";
            iddisplay = id;
            while (index < 5) {
                if (id >= (65536 * index)) {
                    iddisplay = id - (65536 * index);
                    iddisplay = iddisplay.toString();
                    iddisplay += "-" + index;
                }
                index++;
            }
            viewteammessage += "<img src='pokemon:" + iddisplay + "' /><img src='item:" + item + "' /><br>";
            if (gen > 2) {
                var ability = sys.teamPokeAbility(src, team, slot), abilityname = sys.ability(ability);
                viewteammessage += "Ability: " + abilityname + "<br>";
            }
            var ivs = [], evs = [], stat = {5: " Spd", 4: " SDef", 3: " SAtk", 2: " Def", 1: " Atk", 0: " HP"}, statslot;
            ivs.push(gen);
            for (statslot = 0; statslot < 6; statslot++) {
                var ivstat = sys.teamPokeDV(src, team, slot, statslot);    
                if (statslot < 4) {
                    ivs.push(ivstat);
                }
                if (statslot == 4) {
                    ivs[5] = ivstat;
                }
                if (statslot == 5) {
                    ivs[6] = ivstat;
                }
                if (statslot == 6) {
                    ivs[4] = ivstat;
                }
                var evstat = sys.teamPokeEV(src, team, slot, statslot);            
                if (evstat !== 0) {
                    evs.push(evstat + stat[statslot]);
                }
            }
            if (evs.length !== 0 && gen > 2) {
                viewteammessage += "EVs: " + evs.join(", ") + "<br>";
            }
            if (gen > 2) {
                var nature = sys.teamPokeNature(src, team, slot), naturename = ({24: "Quirky Nature", 23: "Careful Nature (+SDef, -SAtk)", 22: "Sassy Nature (+SDef, -Spd)", 21: "Gentle Nature (+SDef, -Def)", 20: "Calm Nature (+SDef, -Atk)", 19: "Rash Nature (+SAtk, -SDef)", 18: "Bashful Nature", 17: "Quiet Nature (+SAtk, -Spd)", 16: "Mild Nature (+SAtk, -Def)", 15: "Modest Nature (+SAtk, -Atk)",
                14: "Naive Nature (+Spd, -SDef)", 13: "Jolly Nature (+Spd, -SAtk)", 12: "Serious Nature", 11: "Hasty Nature (+Spd, -Def)", 10: "Timid Nature (+Spd, -Atk)", 9: "Lax Nature (+Def, -SDef)", 8: "Impish Nature (+Def, -SAtk)", 7: "Relaxed Nature (+Def, -Spd)", 6: "Docile Nature", 5: "Bold Nature (+Def, -Atk)", 4: "Naughty Nature (+Atk, -SDef)", 3: "Adamant Nature (+Atk, -SAtk)",
                2: "Brave Nature (+Atk, -Spd)", 1: "Lonely Nature (+Atk, -Def)", 0: "Hardy Nature"})[nature];
                viewteammessage += naturename + "<br>";
            }
            var moveslot;
            for (moveslot = 0; moveslot < 4; moveslot++) {
                var move = sys.teamPokeMove(src, team, slot, moveslot), movename = sys.move(move);
                if (move === 0) {
                    break;
                }
                if (move == 237) {
                    var hptype = sys.hiddenPowerType.apply(null,ivs), hptypename = sys.type(hptype);
                    movename = "Hidden Power [" + hptypename + "]";
                }
                viewteammessage += "- " + movename +  "<br>";
            }
            viewteammessage += "</td>";
            if (slot == 2 || slot == 5) {
                viewteammessage += "</tr>";
            }
        }
        viewteammessage += "</table><b>" + helpers.user("/team") + "</b> without an argument displays your first team. To see your other teams, use <b>" + helpers.user("/team") + " " + helpers.arg("1/2/3/4/5") + "</b>." +
        "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, viewteammessage, channel);
    }
    
    ,
    
    damagecalc: function (src, channel, command) {
        var args = ["Pokémon", "Pokémon", "attack", "defense", "HP", "power", "modifier"], message = "";
        var poke1, poke2, attack, defense, power, modifier, damage, percentage1, percentage2;
        if (sys.auth(src) < 3) {
            return;
        }
        for (var i = 0; i < args.length; i++) {
            if (!command[i]) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, " + args[i] + " not found.");
                return;
            }
        }
        poke1 = sys.pokeNum(command[1]);
        poke2 = sys.pokeNum(command[2]);
        pokemon1 = sys.pokemon(poke1);
        pokemon2 = sys.pokemon(poke2);
        attack = command[3];
        defense = command[4];
        HP = command[5];
        power = command[6];
        modifier = command[7];
        damage = sys.calcDamage(attack, defense, power, modifier);
        percentage1 = Math.round(damage[0] / HP * 100);
        percentage2 = Math.round(damage[1] / HP * 100);
        message += "<img src='pokemon:" + poke1 + "'> Your " + pokemon1 + " deals <b>" + damage[0] +
        " - " + damage[1] + "</b> damage to the opponent's " + pokemon2 + " (" + percentage1 + " - " + percentage2 + "%";
        if (percentage1 >= 100) {
            message += ", <b>OHKO</b>). <img src='pokemon:" + poke2 + "'>";
        } else if (percentage2 >= 100) {
            message += ", possible OHKO). <img src='pokemon:" + poke2 + "'>";
        } else {
            message += "). <img src='pokemon:" + poke2 + "'>";
        }
        sys.sendHtmlMessage(src, message, channel);
    }
    
    ,
    
    gradient: function (src, channel, command) {
        var gradient = command[1];
        if (!gradient) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, gradient not found.");
            return;
        }
        if (sys.os(src) == "webclient") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, this command won't work on the web client.");
            return;
        }
        if (sys.os(src) == "android") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, this command won't work on Android.");
            return;
        }
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Your gradient will be shown below. If it's not there, or it's wrong, it doesn't work. Gradient:<br>" +
        "<table style='background-color: " + gradient + "' width='50%'><tr><td><br><br><br><br><br><br><br><br><br><br></td></tr></table>", channel);
    }
    
    ,
    
    /**
        ----------------
        Interact Options
        ----------------
    **/
    idle: function (src, channel, command) {
        if (sys.away(src)) {
            helpers.starfox(src, channel, command, bots.idle, "Error 400, you are already idling!");
            return;
        }
        sys.changeAway(src, true);
    }

    ,
    
    afk: function (src, channel, command) {
        this.idle(src, channel, command);
    }

    ,

    away: function (src, channel, command) {
        this.idle(src, channel, command);
    }

    ,
    
    back: function (src, channel, command) {
        if (!sys.away(src)) {
            helpers.starfox(src, channel, command, bots.idle, "Error 400, you aren't idling!");
            return;
        }
        sys.changeAway(src, false);
    }

    ,

    goback: function (src, channel, command) {
        this.back(src, channel, command);
    }

    ,

    unidle: function (src, channel, command) {
        this.back(src, channel, command);
    }

    ,

    tier: function (src, channel, command) {
        var tierlist = sys.getTierList(), tier;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, tier not found.");
            return;
        }
        tier = command[1];
        for (var index in tierlist) {
            if (tierlist[index] == tier) {
                sys.changeTier(src, 0, tier);
                return;
            }
        }
        helpers.starfox(src, channel, command, bots.command, "Error 403, invalid tier.");
    }

    ,
    
    unregister: function (src, channel, command) {
        if (sys.auth(src) > 0) {
            helpers.starfox(src, channel, command, bots.pass, "Error 403, you may not unregister if you have authority!");
            return;
        }
        sys.clearPass(players[src].name);
        sys.sendNetworkCommand(src, REACTIVATE_REGISTER_BUTTON);
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Your password has been successfully cleared.", channel);
    }
    
    ,
    
    selfkick: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase();
        if (selfkickmessages[lower]) {
            msg = selfkickmessages[lower].replace(/~Self~/gi, name).replace(/~Server~/gi, sys.getServerName());
            sys.sendHtmlAll(helpers.bot(bots.kick) + msg, channel);
        } else {
            sys.sendHtmlAll(helpers.bot(bots.kick) + name + " has kicked themselves from the server!", channel);
        }
        sys.kick(src);
    }
    
    ,
    
    /**
        ------------
        Tour Options
        ------------
    **/
    viewtour: function (src, channel, command) {
        if (tour[channel].tourmode === 0) {
            helpers.starfox(src, channel, command, bots.tour, "Error 400, there is no tour running!");
            return;
        }
        if (tour[channel].tourmode == 1) {
            receiver = src;
            helpers.tourdisplay(1, channel);
            return;
        }
        receiver = src;
        helpers.tourdisplay(2, channel);
    }

    ,

    viewround: function (src, channel, command) {
        if (tour[channel].tourmode === 0) {
            helpers.starfox(src, channel, command, bots.tour, "Error 400, there is no tour running!");
            return;
        }
        if (tour[channel].tourmode == 1) {
            var tourplayerlist = "", tourmembersindex;
            for (tourmembersindex = 0; tourmembersindex < tour[channel].tourmembers.length; tourmembersindex++) {
                tourplayerlist += "<b>" + (tourmembersindex+1) + ". " + members[tour[channel].tourmembers[tourmembersindex]] + "</b><br>";
            }
            var viewroundmessage = border
            + "<h3> Players in the " + tour[channel].tourtier + " Tournament: </h3>"
            + tourplayerlist
            + "<br>"
            + "<timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, viewroundmessage, channel);
            return;
        }
        receiver = src;
        helpers.rounddisplay(0, channel);
    }
    
    ,
    
    join: function (src, channel, command) {
        var name = players[src].name, lower = players[src].name.toLowerCase(), index = 0, team = 6;
        if (tour[channel].tourmode === 0) {
            helpers.starfox(src, channel, command, bots.tour, "Error 400, there is no tour running!");
            return;
        }
        if (tour[channel].tourmode == 2) {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "The tour has already passed the sign-up phase!", channel);
        }
        if (sys.battling(src)) {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "You are already battling!", channel);
            return;
        }
        if (helpers.tourmembersnumber(lower, channel) !== undefined ) {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "You are already in the tour in this channel!", channel);
            return;
        }
        while (index < sys.teamCount(src)) {
            if (sys.tier(src, index) == tour[channel].tourtier) {
                team = index;
                break;
            }
            index++;
        }
        if (team > 5) {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "You aren't in the " + tour[channel].tourtier + " tier! Change one of your team's tiers to " + tour[channel].tourtier + " to join.", channel);
            return;
        }
        if (helpers.tourcount(channel) > 0) {
            tour[channel].tourmembers.push(lower);
            var plurality = helpers.tourcount(channel) == 1 ? "spot" : "spots";
            sys.sendHtmlMain(helpers.bot(bots.tour) + name + " has joined the tournament! " + helpers.tourcount(channel) + " more " + plurality + " left!");
            if (helpers.tourcount(channel) === 0) {
                helpers.tourstart(channel);
            } 
        }
    }
    
    ,
    
    leave: function (src, channel, command) {
        if (tour[channel].tourmode === 0) {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Error 400, there is no tour running!");
            return;
        }
        var leavebattler = players[src].name.toLowerCase();
        if (tour[channel].tourmembers.indexOf(leavebattler) == -1) {
            helpers.starfox(src, channel, command, bots.tour, "Error 400, you can't leave the tour when you haven't yet joined!");
            return;
        }
        if (tour[channel].tourmode == 1) {
            tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf(leavebattler),1);
            sys.sendHtmlMain(helpers.bot(bots.tour) + members[leavebattler] + " has left the tournament! " + helpers.tourcount(channel) + " more spots left!");
            return;
        }
        if (tour[channel].tourlosers.indexOf(leavebattler) != -1) {
            helpers.starfox(src, channel, command, bots.tour, "Error 400, you've already left the tour!");
            return;
        }
        var unleavebattler = helpers.opponentof(leavebattler, channel);
        sys.sendHtmlMain(helpers.bot(bots.tour) + members[leavebattler] + " has left the tournament! " + helpers.tourcount(channel) + " more spots left!");
        helpers.roundincrease(unleavebattler, leavebattler, channel);
    }
    
    ,
    
    /**
        ----------------
        Interact Options
        ----------------
    **/
    color: function (src, channel, command) {
        var color = command[1], name = sys.name(src), auth = sys.auth(src);
        if (!color) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your " + command[0] + " is " + helpers.color(src) + ".", channel);
            return;
        }
        if (!sys.validColor(color) && color != "random") {
            helpers.starfox(src, channel, command, bots.main, "Error 403, invalid " + command[0] + ".");
            return;
        }
        if (color == "#000000") {
            sys.changeColor(src, "#000001");
        } else if (color == "random") {
            sys.changeColor(src, "#000000");
        } else {
            if (auth === 0 && color != "random") {
                sys.changeColorStrict(src, color);
            } else {
                sys.changeColor(src, color);
            }
        }
        sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed their " + command[0] + " to " + helpers.arg(color) + "!</b>", channel);
    }
    
    ,
    
    colour: function (src, channel, command) {
        this.color(src, channel, command);
    }
    
    ,
    
    name: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src);
        if (!command[1] || command[1] === "" || command[1] === null) {
            helpers.starfox(src, channel, command, bots.name, "Error 404, name not found.");
            return;
        }
        var newname = command[1];
        newname = newname.replace(/\s{2,}/g, ' ');
        if (newname.charAt(0) == ' ') {
            newname = newname.slice(1);
        }
        var lower = newname.toLowerCase();
        if (newname.length > 42 && auth < 1) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 403, your name is invalid. It may not be over 42 characters long.", channel);
            return;
        }
        if (sys.dbIp(lower)) {
            if (helpers.isauthip(sys.dbIp(lower)) && sys.dbRegistered(lower)) {
                helpers.starfox(src, channel, command, bots.name, "Error 403, that name is in use by an auth member.", channel);
                return;
            }
        }
        if (sys.id(newname)) {
            helpers.starfox(src, channel, command, bots.name, "Error 403, that name is online at the moment.", channel);
            return;
        }
        for (var index in nameblocklist) {
            if (newname.toLowerCase().indexOf(nameblocklist[index]) != -1 && !helpers.isInArray(newname, exceptions)) {
                helpers.starfox(src, channel, command, bots.name, "Error 403, your name contains a banned word: " + nameblocklist[index] + ". Please try another name.");
                return;
            }
        }
        if (helpers.bannedchars(newname)[0]) {
            helpers.starfox(src, channel, command, bots.name, "Error 403, your name contains " + helpers.bannedchars(newname)[1] + ". Please try another name.");
            return;
        }
        sys.changeName(src, newname);
        sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(name) +
        " changed their name to " + helpers.escapehtmlarg(newname) + "!</b>", channel);
    }
    
    ,
    
    reverse: function (src, channel, command) {
        var name = sys.name(src);
        var newname = "";
        name = name.split("");
        for (var index2 in name) {
            newname = name[index2] + newname;
        }
        name = name.join("");
        for (var index in players) {
            if (newname.toLowerCase() == players[index].name.toLowerCase() && players[index].name.toLowerCase() != players[src].name.toLowerCase()) {
                sys.sendHtmlMessage(src, helpers.bot(bots.reverse) + "Error 403, that name is already in use.", channel);
                return;
            }
        }
        sys.changeName(src, newname);
        sys.sendHtmlAll(helpers.bot(bots.reverse) + "<b>" + helpers.user(name) + " reversed their name!</b>", channel);
    }
    
    ,
    
    reset: function (src, channel, command) {
        sys.changeName(src, players[src].name);
        sys.changeColor(src, players[src].color);
        sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(players[src].name) + " set their name and color back to their original states!</b>", channel);
    }
    
    ,
    
    resetname: function (src, channel, command) {
        sys.changeName(src, players[src].name);
        sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(players[src].name) + " set their name back to its original state!</b>", channel);
    }
    
    ,
    
    resetcolor: function (src, channel, command) {
        sys.changeColor(src, players[src].color);
        sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(sys.name(src)) + " set their " + command[0].slice(5) + " back to its original state!</b>", channel);
    }
    
    ,
    
    resetcolour: function (src, channel, command) {
        this.resetcolor(src, channel, command);
    }
    
    ,
    
    /**
        ---------------
        Message Options
        ---------------
    **/
    me: function (src, channel, command) {
        var name = sys.name(src), color = helpers.color(src);
        command.splice(0, 1);
        command = command.join(DELIMITER);
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " " + helpers.escapehtml(command) + " ***</b></font>", channel);
    }
    
    ,
    
    poke: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src), trgtt;
        command.splice(0, 1);
        command = command.join(DELIMITER);
        trgt = sys.id(command);
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " pokes " + helpers.escapehtml(command) + " ***</b></font>", channel);
        if (auth >= 1 && trgt) {
            sys.sendHtmlMessage(trgt, helpers.bot(bots.command) + " You got flashed by " + name + "!<ping/>");
        }
    }
    
    ,
    
    listen: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), color = helpers.color(src), link;
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (command.indexOf("www.youtube.com/watch?v=") != -1) {
            link = helpers.htmlLinks(command);
            sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " is listening to " + link + " d^_^b ***</b></font>", channel);
            return;
        }
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " is listening to " + helpers.escapehtml(command) + " d^_^b ***</b></font>", channel);
    }
    
    ,
    
    imp: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src), message;
        if (!command[1]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 404, name not found. Please specify one!", channel);
            return;
        }
        if (!command[2]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 404, message not found. Please specify one!", channel);
            return;
        }
        if (auth < 1) {
            message = "<font color='" + color + "'><timestamp/> <b>" + helpers.escapehtml(command[1]) + ":</b></font> " + helpers.escapehtml(command[2]);
        } else {
            message = "<font color='" + color + "'><timestamp/> +<b><i>" + helpers.escapehtml(command[1]) + ":</i></b></font> " + helpers.escapehtml(command[2]);
        }
        sys.sendHtmlAll(message + " <small><b>-Imp by " + name + "</b></small>", channel);
    }
    
    ,
    
    impme: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src);
        if (!command[1]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 404, name not found. Please specify one!", channel);
            return;
        }
        if (!command[2]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 404, message not found. Please specify one!", channel);
            return;
        }
        var message = "<font color='" + color + "'><timestamp/> <b>*** " + helpers.escapehtml(command[1]) + " " + helpers.escapehtml(command[2]) + " ***</b></font>";
        sys.sendHtmlAll(message + " <small><b>-Imp by " + name + "</b></small>", channel);
    }
    
    ,
    
    future: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src), message, lower, time, unit, derp;
        var units = ["s", "m", "h", "d", "seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, message not found.");
            return;
        }
        message = command[1];
        lower = command[1].toLowerCase();
        if (!command[2]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, time not found.");
            return;
        }
        if (command[2].indexOf(" ") != -1) {
            command[2] = command[2].split(" ");
            time = command[2][0];
            unit = command[2][1];
        } else {
            derp = command[2].split("");
            time = "", unit = "";
            for (var index in derp) {
                if (!isNaN(derp[index])) {
                    time += derp[index];
                } else {
                    unit += derp[index];
                }
            }
            time = parseInt(time);
        }
        if (isNaN(time) || time < 1) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, invalid time.");
            return;
        }
        if (!helpers.isInArray(unit, units)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, invalid unit.");
            return;
        }
        unit = helpers.timeplurality(time, unit);
        var milliseconds = helpers.toseconds(time, unit) * 1000;
        if (auth < 1) {
            message = "<font color='" + color + "'><timestamp/> <b>" + name + ":";
        } else {
            message = "<font color='" + color + "'><timestamp/> +<b><i>" + name + ":</i>";
        }
        message += "</b></font> " + helpers.escapehtml(command[1]) + "<b><small> -Sent " + time + " " + unit + " ago</small></b>";
        sys.setTimer(function () {
            if (command[1][0] == COMMAND_SYMBOL && command[1].length > 1) {
                message = "<timestamp/><b><small> -" + name + ", sent " + time + " " + unit + " ago</small></b>";
                parseCommand(src, command[1], channel, name, auth, false);
            } else {
                sys.sendHtmlAll(message, channel);
            }
        }, milliseconds, 0);
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Your message has been sent " + time + " " + unit + " into the future!", channel);
    }
    
    ,
    
    quote: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), quote = "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
        "thead {font-weight:bold;}</style><table cellpadding=2 cellspacing=0><tr style='background-color:#b0b0b0;'><td>";
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
            return;
        }
        if (!command[2]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, author not found.");
            return;
        }
        command[1] = helpers.escapehtml(command[1]);command[2] = helpers.escapehtml(command[2]);
        quote += "<font size='8'>\"</font>" + command[1] + "<font size='8'>\"</font></td></tr></table><br>~" + command[2] + "<br>";
        sys.sendHtmlAll(helpers.bot(bots.main) + name + " posted the following quote:", channel);
        sys.sendHtmlAll(quote, channel);
    }
    
    ,
    
    spoiler: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), text = command[1], origin, firstchar;
        if (!text) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
            return;
        }
        text = text.replace(/\s{2,}/g, " ");
        if (text.charAt(0) == ' ') {
            text = text.slice(1);
        }
        origin = (command[2] ? command[2] : ' ');
        if (origin !== ' ') {
            origin = (helpers.isVowel(origin.charAt(0)) ? "n " + origin : ' ' + origin) + ' ';
        }
        sys.sendHtmlAll(helpers.bot(bots.warn) + "CAUTION! " + name + " posted a" + origin + "spoiler! <font style='background-color: black;'>" + helpers.escapehtml(text) + "</font>", channel);
    }
};