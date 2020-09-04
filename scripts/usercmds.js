/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY USER COMMANDS usercmds.js
     - by Maribel Hearn, 2012-2020

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
        var name = players[src].name, auth = sys.auth(src), cauth = helpers.cauth(name, channel),
            commandsmessage = border + "<h2>Commands</h2><br>" +
        "<b>" + helpers.userl("/usercommands") + "</b>: displays user commands.<br>";
        commandsmessage += (auth >= 1 ? "<b>" + helpers.userl("/modcommands") + "</b>: displays moderator commands.<br>" : "");
        commandsmessage += (auth >= 2 ? "<b>" + helpers.userl("/admincommands") + "</b>: displays administrator commands.<br>" : "");
        commandsmessage += (auth >= 3 ? "<b>" + helpers.userl("/ownercommands") + "</b>: displays owner commands.<br>" : "");
        commandsmessage += "<b>" + helpers.userl("/cusercommands") + "</b>: displays channel user commands.<br>";
        commandsmessage += (cauth >= 1 ? "<b>" + helpers.userl("/cmodcommands") + "</b>: displays channel moderator commands.<br>" : "");
        commandsmessage += (cauth >= 2 ? "<b>" + helpers.userl("/cadmincommands") + "</b>: displays channel administrator commands.<br>" : "");
        commandsmessage += (cauth >= 3 ? "<b>" + helpers.userl("/cownercommands") + "</b>: displays channel owner commands.<br>" : "");
        if (pluginLoaded["funcmds.js"] || pluginLoaded["party.js"] || pluginLoaded["rr.js"] || pluginLoaded["roulette.js"] || pluginLoaded["safari.js"] || pluginLoaded["mafia.js"]) {
            commandsmessage += "<br>";
        }
        if (pluginLoaded["funcmds.js"]) {
            commandsmessage += "<b>" + helpers.userl("/funcommands") + "</b>: displays fun commands.<br>"
        }
        if (pluginLoaded["party.js"]) {
            commandsmessage += "<b>" + helpers.userl("/partycommands") + "</b>: displays Party commands. Only for the " + helpers.channelLink(sys.channel(partychannel)) + " channel.<br>";
        }
        if (pluginLoaded["roulette.js"]) {
            commandsmessage += "<b>" + helpers.userl("/roulettecommands") + "</b>: displays Roulette commands. Only for the " + helpers.channelLink(sys.channel(roulettechannel)) + " channel.<br>";
        }
        if (pluginLoaded["rr.js"]) {
            commandsmessage += "<b>" + helpers.userl("/rrcommands") + "</b>: displays Russian Roulette commands. Only for the " + helpers.channelLink(sys.channel(rrchannel)) + " channel.<br>";
        }
        if (pluginLoaded["safari.js"]) {
            commandsmessage += "<b>" + helpers.userl("/safaricommands") + "</b>: displays Safari commands. Only for the " + helpers.channelLink(sys.channel(safarichannel)) + " channel.<br>";
        }
        if (pluginLoaded["mafia.js"]) {
            commandsmessage += "<b>" + helpers.userl("/mafiacommands") + "</b>: displays Mafia commands. Only for the " + helpers.channelLink(sys.channel(mafiachannel)) + " channel.<br>";
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

    /**
        ------------
        Info Options
        ------------
    **/
    infooptions: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>User Commands ~ Info Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/rules") + "</b>: displays the server rules.<br>"
        + "<b>" + helpers.user("/rule ") + helpers.arg("number") + "</b>: displays server rule <b>number</b>.<br>"
        + "<b>" + helpers.user("/help ") + helpers.arg("topic") + "</b>: displays help on <b>topic</b>. <b>topic</b> can be any of the game channels: Party, Roulette or Russian Roulette (RR).<br>"
        + "<b>" + helpers.user("/online") + "</b>: shows the users who are currently online in a neat table. Also /players.<br>"
        + "<b>" + helpers.user("/auth") + "</b>: shows the server authority in a neat table. Also /auths or /authlist.<br>"
        + "<b>" + helpers.user("/channels") + "</b>: shows the channels that are currently online in a neat table.<br>"
        + "<b>" + helpers.user("/battles") + "</b>: shows the battles that are currently going on in a neat table.<br>"
        + "<b>" + helpers.user("/ranking ") + helpers.arg("player") + helpers.arg2("*tier") + "</b>: shows <b>player</b>'s current rankings in <b>tier</b>. If <b>player</b> is not specified, shows your own rankings. If <b>tier</b> is not specified, uses the tier of the first team.<br>"
        + "<b>" + helpers.user("/intier ") + helpers.arg("tier") + "</b>: shows unidled players currently in <b>tier</b>.<br>"
        + "<b>" + helpers.user("/mp") + "</b>: displays your own Control Panel data.<br>"
        + "<b>" + helpers.user("/myalts") + "</b>: displays info about your alts in a neat table.<br>"
        + "<b>" + helpers.user("/uptime") + "</b>: displays for how long the server has been up since its last restart.<br>"
        + "<b>" + helpers.user("/registry") + "</b>: shows the current Pokémon Online registry. Counts players logged onto multiple servers multiple times.<br>"
        + "<b>" + helpers.user("/serverinfo") + "</b>: displays server information.<br>"
        + "<b>" + helpers.user("/scriptinfo") + "</b>: displays script information.<br>"
        + "<b>" + helpers.user("/playerinfo ") + helpers.arg("player") + "</b>: displays information about <b>player</b>, including when they were last seen. "
        + "If <b>player</b> is not specified, displays your own player info. Also /player.<br>"
        + "<b>" + helpers.user("/team ") + helpers.arg("number") + "</b>: displays your team with number <b>number</b>. If <b>number</b> is not specified, displays your first team.<br>"
        + "<b>" + helpers.user("/pokedex ") + helpers.arg("Pokémon") + "</b>: displays <b>Pokémon</b>'s data in a neat table. Also /pokemon.<br>"
        + "<b>" + helpers.user("/movedex ") + helpers.arg("move") + "</b>: displays data for <b>move</b> in a neat table. Also /move.<br>"
        + "<b>" + helpers.user("/abilitydex ") + helpers.arg("ability") + "</b>: displays data for <b>ability</b> in a neat table. Also /ability.<br>"
        + "<b>" + helpers.user("/itemdex ") + helpers.arg("item") + "</b>: displays data for <b>item</b> in a neat table. Also /item.<br>"
        + "<b>" + helpers.user("/movepool ") + helpers.arg("Pokémon") + helpers.arg2("*move") + "</b>: displays if <b>move</b> is in <b>Pokémon</b>'s movepool. If <b>move</b> is not specified, displays <b>Pokémon</b>'s movepool. Also /canlearn.<br>"
        + "<b>" + helpers.user("/gradient ") + helpers.arg("gradient") + "</b>: tests <b>gradient</b>. Useful for trainer info.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    help: function (src, channel, command) {
        var helpmessage = border, topic = command[1];
        if (!topic) {
            helpmessage += "<h2>User Commands ~ Help</h2>"
            + "<br>"
            + "<b>" + helpers.user("/help ") + helpers.arg("roulette") + "</b>: displays Roulette help.<br>"
            + "<b>" + helpers.user("/help ") + helpers.arg("party") + "</b>: displays Party help.<br>"
            + "<b>" + helpers.user("/help ") + helpers.arg("russian roulette") + "</b>: displays Russian Roulette help. Also /help rr.<br>"
            + "<br><timestamp/><br>"
            + border2;
            sys.sendHtmlMessage(src, helpmessage, channel);
            return;
        }
        topic = topic.toLowerCase();
        if (topic == "roulette") {
            if (!pluginLoaded["roulette.js"]) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, Roulette is not available on this server!");
                return;
            }
            helpmessage += "<h2>Roulette Help</h2>"
            + "<br>"
            + "<h3>General</h3>"
            + "Use the <b>" + helpers.user("/roulette") + "</b> command to generate a Pokémon.<br>"
            + "It can be any Pokémon, including Shiny ones. They can have any nature and any held item.<br>"
            + "<h3>Shiny Pokémon and Random Events</h3>"
            + "Shiny Pokémon are very rare by default, having the same probability of encounter as in the games, but<br>"
            + "this probability can increase under certain conditions.<br>"
            + "Random events will occur in the " + sys.channel(rrchannel) + " channel, one of which is the \"Shiny Frenzy\", which<br>"
            + "will increase your odds of generating a Shiny by a significant amount.<br>"
            + "<h3>Chaining</h3>"
            + "Whenever you generate a Pokémon, your chances of generating that same Pokémon are<br>"
            + "bigger than generating any other Pokémon; when you get the same Pokémon multiple times in a row,<br>"
            + "you are getting a chain of that Pokémon. Chaining a Pokémon will double the probability to<br>"
            + "generate a shiny one on each successive generation of the same Pokémon.<br>"
            + "<br>"
            + "Use <b>" + helpers.user("/roulettecommands") + "</b> to list the commands for Roulette.<br>";
        } else if (topic == "party") {
            if (!pluginLoaded["party.js"]) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, Party is not available on this server!");
                return;
            }
            helpmessage += "<h2>Party Help</h2>"
            + "<br>"
            + "<h3>General</h3>"
            + "In the #" + sys.channel(partychannel) + " channel, a so-called 'mode' can be active, activated by channel auth,<br>"
            + "which will affect your posts or the entire chat in some way. A list of modes can be found below.<br>"
            + "<h3>Modes</h3>"
            + "<b>Joke</b>: makes everyone post as a random user that is currently on the server.<br>"
            + "<b>Nightclub</b>: gives the chat a black background with white posts, and usernames rainbow colors.<br>"
            + "However, this mode will not work on Android, nor on the web client.<br>"
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
            + "<br>"
            + "Use <b>" + helpers.user("/partycommands") + "</b> to list the commands for Party.<br>";
        } else if (topic == "russian roulette" || topic == "rr") {
            if (!pluginLoaded["rr.js"]) {
                helpers.starfox(src, channel, command, bots.command, "Error 400, Russian Roulette is not available on this server!");
                return;
            }
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

    rules: function (src, channel, command) {
        var rulesmessage = border
        + "<h2>Rules</h2>"
        + "<br>";
        for (var i = 1; i <= rules.rules.length; i++) {
            rulesmessage += helpers.bot("• " + botsymbol + "Rule " + i + ": " + rules.rules[i - 1]) + "<br>" + rules.explanations[i - 1] + "<br>";
        }
        rulesmessage += "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, rulesmessage, channel);
    }

    ,

    rule: function (src, channel, command) {
        var number = command[1], rulemessage = border;
        if (!number) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, number not found.");
            return;
        }
        if (isNaN(number) || parseInt(number) < 1 || parseInt(number) > rules.rules.length) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, there is no such rule!");
            return;
        }
        number = parseInt(number);
        rulemessage += "<h2>Rules ~ Rule " + number + "</h2><br>" + helpers.bot("• " + botsymbol + "Rule " + number + ": " + rules.rules[number - 1]) + "<br>" + rules.explanations[number - 1] + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, rulemessage, channel);
    }

    ,

    online: function (src, channel, command) {
        var DISPLAY_USER = true, HIDE_INVIS = true, onlinemessage = border + "<h2>Players Online</h2><br>", srcauth = sys.auth(src), index = 0, lower;
        var auths = [], names = [], colors = [], ids = [], ips = [], clients = [], countries = [], timeZones = [], lastMessages = [], times = [];
        for (var i in players) {
            ids.push(i);
            ips.push(sys.ip(i));
            auths.push(sys.auth(i));
            clients.push(sys.os(i));
            colors.push(helpers.color(i));
            names.push(players[i].name + (sys.name(i) != players[i].name ? " (" + helpers.escapehtml(sys.name(i)) + ")" : ""));
            lower = names[index].toLowerCase();
            countries.push(countryname[lower] ? FLAGS[helpers.toFlagKey(countryname[lower])] : "[no data]");
            timeZones.push(timezone[lower] ? timezone[lower] : "[no data]");
            lastMessages.push(helpers.escapehtml(players[i].lastmessage));
            times.push(helpers.timePassed(colors[i], players[i].lastmessagetime));
            index++;
        }
        if (helpers.isAndroid(src)) {
            onlinemessage += "<tt>";
            for (var i in ids) {
                onlinemessage += helpers.authName(auths[i], DISPLAY_USER, HIDE_INVIS) + " | " + "<b><font color='" + colors[i] + "'>" + names[i] + "</font></b> | " + ids[i];
                if (srcauth >= 1) {
                    onlinemessage += " | " + ips[i] + " | " + helpers.osName(clients[i]);
                }
                onlinemessage += "<br>";
            }
            onlinemessage += "</tt><br><br><b>Total Players Online:</b> " + sys.numPlayers();
        } else {
            onlinemessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Icon</th><th>Auth</th><th>Name</th><th>ID</th>";
            if (srcauth >= 1) {
                onlinemessage += "<th>IP Address</th><th>Client</th>";
                if (API_KEY !== "") {
                    onlinemessage += "<th>Country</th><th>Time Zone</th>";
                }
                onlinemessage += "<th>Last Message</th>";
            }
            onlinemessage += "</tr></thead><tbody>";
            for (var i in ids) {
                onlinemessage += "<tr>"
                + "<td>" + helpers.authimage(src, helpers.imageIndex(ids[i])) + "</td>"
                + "<td>" + helpers.authName(auths[i], DISPLAY_USER, HIDE_INVIS) + "</td>"
                + "<td><b><font color='" + colors[i] + "'>" + names[i] + "</font></b></td>"
                + "<td>" + ids[i] + "</td>";
                if (srcauth >= 1) {
                    onlinemessage += "<td>" + ips[i] + "</td><td>" + helpers.osImage(clients[i]) + "</td>";
                    if (API_KEY !== "") {
                        onlinemessage += "<td>" + countries[i] + "</td><td>" + timeZones[i] + "</td>";
                    }
                    onlinemessage += "<td>" + lastMessages[i] + " " + times[i] + "</td>";
                }
                onlinemessage += "</tr>";
            }
            onlinemessage += "</tbody><tfoot><tr><td colspan='" + (srcauth >= 1 ? (API_KEY !== "" ? 9 : 7) : 4) +
            "'><b>Total Players Online:</b> " + sys.numPlayers() + "</td></tr></tfoot></table>";
        }
        onlinemessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, onlinemessage, channel);
    }

    ,

    players: function (src, channel, command) {
        this.online(src, channel, command);
    }

    ,

    channels: function (src, channel, command) {
        var channelList = sys.channelIds().sort(function(a, b){return a - b;}), total = channelList.length, names = [], ids = [], descriptions = [], channelmessage;
        for (var i in channelList) {
            ids.push(channelList[i]);
            names.push(sys.channel(ids[i]));
            if (ids[i] === 0) {
                descriptions.push("Main channel.");
            } else if (ids[i] == watch) {
                descriptions.push("The watch channel, for server authorities.");
            } else if (ids[i] == authchannel) {
                descriptions.push("Server authorities discuss things here.");
            } else if (ids[i] == ownerchannel) {
                descriptions.push("For the server owners.");
            } else if (pluginLoaded["party.js"] && ids[i] == partychannel) {
                descriptions.push("To have some fun.");
            } else if (pluginLoaded["roulette.js"] && ids[i] == roulettechannel) {
                descriptions.push("To play Roulette.");
            } else if (pluginLoaded["rr.js"] && ids[i] == rrchannel) {
                descriptions.push("To play Russian Roulette.");
            } else if (pluginLoaded["safari.js"] && ids[i] == safarichannel) {
                descriptions.push("To play Safari.");
            } else if (pluginLoaded["mafia.js"] && ids[i] == mafiachannel) {
                descriptions.push("To play Mafia.");
            } else {
                descriptions.push("A user-created channel.");
            }
        }
        channelmessage = border + "<h2>Channels Online</h2><br>";
        if (helpers.isAndroid(src)) {
            channelmessage += "<tt>";
            for (var i in names) {
                channelmessage += ids[i] + " | " + names[i] + " | </tt>" + descriptions[i] + "<tt><br>";
            }
            channelmessage += "</tt><br><br><b>Total Channels Online:</b> " + total;
        } else {
            channelmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'><th>ID</th><th>Name</th><th>Description</th></thead><tbody>";
            for (var i in names) {
                channelmessage += "<tr><td>" + ids[i] + "</td><td>" + helpers.channelLink(names[i]) + "</td><td>" + descriptions[i] + "</td></tr>";
            }
            channelmessage += "</tbody><tfoot><tr><td colspan='3'><b>Total Channels Online:</b> " + total + "</td></tr></tfoot></table>";
        }
        channelmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, channelmessage, channel);
    }

    ,

    battles: function (src, channel, command) {
        var total = Object.keys(battles).length, ids = [], p1s = [], p2s = [], tiers = [], clauses = [], startTimes = [], battlemessage;
        for (var i in battles) {
            ids.push(i);
            p1s.push(battles[i].p1);
            p2s.push(battles[i].p2);
            tiers.push(battles[i].tier);
            clauses.push(battles[i].clauses);
            startTimes.push(helpers.formatLastOn(src, battles[i].start));
        }
        battlemessage = border + "<h2>Battles Online</h2><br>";
        if (helpers.isAndroid(src)) {
            battlemessage += "<tt>";
            for (var i in ids) {
                battlemessage += p1s[i] + " vs " + p2s[i] + " (" + tiers[i] + ") (<watch id='" + ids[i] + "'>Watch</watch>)<br>";
            }
            battlemessage += "</tt><br><br><b>Total Battles Online:</b> " + total;
        } else {
            battlemessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>ID</th><th>Player 1</th><th>Player 2</th><th>Tier</th><th>Clauses</th><th>Start Time</th><th>Link</th></thead><tbody>";
            for (var i in ids) {
                battlemessage += "<tr>"
                + "<td>" + ids[i] + "</td>"
                + "<td>" + p1s[i] + "</td>"
                + "<td>" + p2s[i] + "</td>"
                + "<td>" + tiers[i] + "</td>"
                + "<td>" + clauses[i] + "</td>"
                + "<td>" + startTimes[i] + "</td>"
                + "<td>" + helpers.battleLink(ids[i]) + "</td>"
                + "</tr>";
            }
            battlemessage += "</tbody><tfoot><tr><td colspan='7'><b>Total Battles Online:</b> " + total + "</td></tr></tfoot></table>";
        }
        battlemessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, battlemessage, channel);
    }

    ,

    ranking: function (src, channel, command) {
        var tierList = sys.getTierList(), player = command[1], tier = command[2], trgt, self, rank;
        if (player && tier && !sys.dbExists(player)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, that player does not exist in the database.");
            return;
        }
        if (player && tier && !tierList.contains(tier)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid tier.");
            return;
        }
        if (player && !tier && tierList.contains(player)) {
            tier = player;
            player = players[src].name;
        } else if (player && !tier) {
            trgt = sys.id(player);
            if (trgt) {
                player = players[trgt].name;
                tier = sys.tier(trgt, 0);
            } else {
                helpers.starfox(src, channel, command, bots.command, "Error 400, that player is not currently online. Specify a tier to see their ranking in it.");
                return;
            }
        } else if (!player) {
            player = players[src].name;
            tier = sys.tier(src, 0);
        }
        self = players[src].name == player;
        rank = sys.ranking(player, tier);
        if (!rank) {
            sys.sendHtmlMessage(src, helpers.bot(bots.battle) + (self ? "You are " : "That player is ") +
            "not currently ranked in " + tier + ".", channel);
        } else {
            sys.sendHtmlMessage(src, helpers.bot(bots.battle) + (self ? "You" : player) + " currently " +
            "rank" + (self ? "" : "s") + " " + helpers.ordinal(rank) + " out of " + sys.totalPlayersByTier(tier) +
            " players in " + tier + " (rating: " + sys.ladderRating(src, tier) + ").", channel);
        }
    }

    ,

    intier: function (src, channel, command) {
        var tier = command[1], list = [], i;
        if (!tier) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, tier not found.");
            return;
        }
        if (!sys.getTierList().contains(tier)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid tier.");
            return;
        }
        for (i in players) {
            if (sys.hasTier(i, tier) && !sys.away(i)) {
                list.push(players[i].name + (sys.name(i) != players[i].name ? " (" + helpers.escapehtml(sys.name(i)) + ")" : ""));
            }
        }
        if (list.length === 0) {
            sys.sendHtmlMessage(src, helpers.bot(bots.battle) + "There are currently no unidled players in " + tier + ".", channel);
        } else {
            sys.sendHtmlMessage(src, helpers.bot(bots.battle) + "Unidled players currently in " + tier + ": " + list.join(", ") + ".", channel);
        }
    }

    ,

    uptime: function (src, channel, command) {
        var uptime = sys.profileDump().split('\n')[0].split(',')[0].split(':')[1].slice(1, -2);
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The server has been up for " + helpers.formatUptime(uptime), channel);
    }

    ,

    registry: function (src, channel, command) {
        var auth = sys.auth(src), registrymessage;
        var servername = sys.getServerName(), servers = [], playernums = [], serverIps = [], advConnects = [], total = 0, tmp1, tmp2;
        sys.webCall(REGISTRY_URL, function (resp) {
            if (resp === "") {
                sys.sendHtmlMessage(src, helpers.bot(bots.command) + "An error occurred while fetching the registry.", channel);
                return;
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
                }
            }
            registrymessage = border + "<h2>Pokémon Online Registry</h2><br>";
            if (helpers.isAndroid(src)) {
                registrymessage += "<tt>";
                for (var k in servers) {
                    registrymessage += (servers[k] == servername ? "<b>" + servers[k] + "</b>" : servers[k]) + " | " + playernums[k] + " | " + advConnects[k] + "<br>";
                    total += parseInt(playernums[k]);
                }
                registrymessage += "</tt>";
            } else {
                registrymessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
                + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
                + "<th>Server</th><th>Players Online</th><th>Advanced Connection</th></tr></thead><tbody>";
                for (var l in servers) {
                    registrymessage += "<tr><td>" + (servers[l] == servername ? "<b>" + servers[l] + "</b>" : servers[l]) + "</td><td>" + playernums[l] + "</td><td>" + advConnects[l] + "</td></tr>";
                    total += parseInt(playernums[l]);
                }
                registrymessage += "</tbody></table>";
            }
            registrymessage += "<br><br><b>Total Servers:</b> " + servers.length
            + "<br><b>Total Players:</b> " + total
            + "<br><b>Percentage on " + servername + ":</b> " + (sys.numPlayers() / total * 100).toPrecision(2) + "%"
            + "<br><br><timestamp/><br>" + border2;
            sys.sendHtmlMessage(src, registrymessage, channel);
        });
    }

    ,

    serverinfo: function (src, channel, command) {
        var servermessage = border + "<h2>Server Info</h2><br>", ports = sys.serverPorts().length, serveropen, time,
        uptime = sys.profileDump().split('\n')[0].split(',')[0].split(':')[1].slice(1, -2),
        serverprivate = sys.isServerPrivate(), d = new Date(), day = d.getDay(),
        date = d.getDate(), month = d.getMonth(), year = d.getFullYear();
        date = DAYS[day] + ", " + MONTHS[month] + " " + date + ", " + year;
        time = d.toTimeString().substr(0, 15).replace("+0", "+");
        serverprivate === true ? serverprivate = "<font color='red'>No</font>" : serverprivate = "<b><font color='green'>Yes</font></b>";
        open ? serveropen = "<b><font color='green'>Yes</font></b>" : serveropen = "<font color='red'>No</font>";
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
        var scriptmessage = border + "<h2>Script Info</h2><br>", scriptcontent = [],
            tempPlugins = [], customs = [], length, i;
        scriptcontent.push(sys.read("scripts.js"));
        for (i in SCRIPT_MODULES) {
            scriptcontent.push(sys.read(SCRIPTS_FOLDER + SCRIPT_MODULES[i]));
        }
        if (sys.dirsForDirectory(sys.cwd()).contains("plugins")) {
            for (i in plugins) {
                scriptcontent.push(sys.read(PLUGINS_FOLDER + plugins[i]));
                if (Object.keys(OFFICIAL_PLUGINS).contains(plugins[i])) {
                    tempPlugins.push(OFFICIAL_PLUGINS[plugins[i]]);
                } else {
                    customs.push(helpers.cap(plugins[i]));
                }
            }
        }
        scriptcontent = scriptcontent.join();
        scriptmessage += "<h3>Basic Information</h3>" +
        "<b>Official Repository:</b> <a href='" + REPOSITORY_URL + "'>" + REPOSITORY_URL + "</a><br>" +
        "<b>Name:</b> Fun Community Scripts<br>" +
        "<b>Creator:</b> Maribel Hearn<br>" +
        "<b>Characters:</b> " + helpers.sep(scriptcontent.length) + "<br>" +
        "<b>Lines:</b> " + helpers.sep(scriptcontent.split(/\u000A/g).length) + "<br>" +
        "<b>Enabled Plugins:</b> " + tempPlugins.join(", ") + "<br>" +
        (unofficialPlugins ? "<b>Unofficial Plugins:</b> " + customs.join(", ").replace(/\.js/g, "") + "<br>" : "") +
        "<h3>Contribution</h3>" +
        "Contributed to by: General Thor<br>" +
        "<h3>Credit to</h3>" +
        "Lutra (main inspiration and base behind the scripts tournament code and several utility methods)<br>" +
        "Pokémon Online server scripts (pokemon database methods, idea of safari)<br>" +
        "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, scriptmessage, channel);
    }

    ,

    playerinfo: function (src, channel, command) {
        var infomessage = border + "<h2>Player Info</h2><br>", player = command[1],
            trgt, auth, imageindex, status, lastlogin, nonMatching;
        if (!player) {
            player = sys.name(src);
        }
        trgt = sys.id(player);
        if (!sys.dbExists(player)) {
            if (trgt) {
                nonMatching = true;
                original = players[trgt].name;
            } else {
                helpers.starfox(src, channel, command, bots.command, "Error 404, that player does not exist.");
                return;
            }
        }
        lastlogin = helpers.formatLastOn(src, sys.dbLastOn(original ? original : player));
        if (trgt) {
            player = players[trgt].name;
            auth = (sys.auth(trgt) >= 4 ? 0 : sys.auth(trgt));
            imageindex = helpers.imageIndex(trgt);
            status = "<font color='green'><b>Online</b></font>";
            infomessage += helpers.authimage(src, imageindex) +
            " " + (nonMatching ? original + " (" + sys.name(trgt) + ")" : player) +
            " " + status + "<br><b>Auth:</b> " + helpers.authName(sys.dbAuth(player), true, true) +
            "<br><b>Avatar:</b> <img src='trainer:" + sys.avatar(trgt) + "'>" +
            "<br><b>Color:</b> " + helpers.color(trgt);
        } else {
            trgt = helpers.originalToID(player);
            player = (members[player] ? members[player] : player);
            auth = (sys.dbAuth(player) >= 4 ? 4 : sys.dbAuth(player) + 4);
            status = ( trgt ? "<font color='green'><b>Online</b></font>" : "<font color='red'>Offline</font>");
            infomessage += helpers.authimage(src, imageindex) +
            " " + player + (trgt && player != sys.name(trgt) ? " (" + sys.name(trgt) + ")" : "") +
            " " + status + "<br><b>Auth:</b> " + helpers.authName(sys.dbAuth(player), true, true) +
            (trgt ? "<br><b>Avatar:</b> <img src='trainer:" + sys.avatar(trgt) + "'>" +
            "<br><b>Color:</b> " + helpers.color(trgt) : "");
        }
        infomessage += "<br><b>Last Online:</b> " + lastlogin +
        "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, infomessage, channel);
    }

    ,

    player: function (src, channel, command) {
        this.playerinfo(src, channel, command);
    }

    ,

    auth: function (src, channel, command) {
        var authmessage = border + "<h2>Server Authority</h2><br>", authList = helpers.authSort(), srcauth = sys.auth(src), index = 0, lower;
        var auths = [], titles = [], names = [],  ips = [], countries = [], timeZones = [], lastLogins = [], statuses = [];
        for (var i in authList) {
            authList[i] = (members[authList[i]] ? members[authList[i]] : authList[i]);
            auths.push(sys.dbAuth(authList[i]));
            id = !sys.id(authList[i]) ? helpers.originalToID(authList[i]) : sys.id(authList[i]);
            names.push(authList[i] + (id && sys.name(id) != authList[i] ? " (" + helpers.escapehtml(sys.name(id)) + ")" : ""));
            lower = names[index].toLowerCase();
            titles.push(authtitles[lower] ? authtitles[lower] : '-');
            ips.push(sys.dbIp(authList[i]));
            countries.push(countryname[lower] ? FLAGS[helpers.toFlagKey(countryname[lower])] : "[no data]");
            timeZones.push(timezone[lower] ? timezone[lower] : "[no data]");
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
                authmessage += helpers.authName(auths[i]) + " | " + names[i] + " | " + statuses[i] + "<br>";
            }
            authmessage += "</tt><br><br><b>Total Auth Members:</b> " + authList.length;
        } else {
            authmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Icon</th><th>Auth</th><th>Title</th><th>Name</th>";
            if (srcauth >= 1) {
                authmessage += "<th>IP Address</th>";
                if (API_KEY !== "") {
                    authmessage += "<th>Country</th><th>Time Zone</th>";
                }
            }
            authmessage += "<th>Last Online</th><th>Status</th></tr></thead><tbody>";
            for (var i in auths) {
                authmessage += "<tr>"
                + "<td>" + helpers.authimage(src, auths[i]) + "</td>"
                + "<td>" + helpers.authName(auths[i]) + "</td>"
                + "<td>" + titles[i] + "</td>"
                + "<td>" + names[i] + "</td>";
                if (srcauth >= 1) {
                    authmessage += "<td>" + ips[i] + "</td>";
                    if (API_KEY !== "") {
                        authmessage += "<td>" + countries[i] + "</td><td>" + timeZones[i] + "</td>";
                    }
                }
                authmessage += "<td>" + lastLogins[i] + "</td><td>" + statuses[i] + "</td>";
                authmessage += "</tr>";
            }
            authmessage += "</tbody><tfoot><tr><td colspan='" + (srcauth >= 1 ? (API_KEY !== "" ? 9 : 7) : 4) + "'><b>Total Auth Members:</b> " + authList.length + "</td></tr></tfoot></table>";
        }
        authmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, authmessage, channel);
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
        modcommands.cp(src, channel, ["cp", sys.name(src)]);
    }

    ,

    myalts: function (src, channel, command) {
        var DISPLAY_USER = true, altsmessage = border + "<h2>My Alts</h2><br>", alts = sys.aliases(sys.ip(src)), index = 0, lower;
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
            altsmessage += "<tt>";
            for (var i in auths) {
                altsmessage += names[i] + " | " + registered[i] + "<br>";
            }
            altsmessage += "</tt>";
        } else {
            altsmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Icon</th><th>Auth</th><th>Title</th><th>Name</th><th>Registered</th><th>Last Online</th></tr></thead><tbody>";
            for (var i in auths) {
                altsmessage += "<tr>"
                + "<td>" + helpers.authimage(src, auths[i] >= 4 ? 0 : auths[i]) + "</td>"
                + "<td>" + helpers.authName(auths[i], DISPLAY_USER) + "</td>"
                + "<td>" + titles[i] + "</td>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + registered[i] + "</td>"
                + "<td>" + lastLogins[i] + "</td>"
                + "</tr>";
            }
            altsmessage += "</tbody><tfoot><tr><td colspan='6'><b>Total Alts:</b> " + alts.length + "</td></tr></tfoot></table>";
        }
        altsmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, altsmessage, channel);
    }

    ,

    pokedex: function (src, channel, command) {
        var UNKNOWN_TYPE = 18, MAX_IV = 31, MIN_EV = 0, MAX_EV = 252, MIN_NATURE = 0.9, NEUTRAL_NATURE = 1.0, MAX_NATURE = 1.1;
        var pokemon = command[1], pokeNum, type1, type2, types = [], abilities = [], genders = [],
        height, weight, americanHeight, americanWeight, weightPower, baseStats, bst, stat, dexmessage, tier;
        if (!pokemon) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, Pokémon not found.");
            return;
        }
        if ((!isNaN(pokemon) && sys.pokemon(pokemon)) == "Missingno" || (isNaN(pokemon) && !sys.pokeNum(pokemon))) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid Pokémon.");
            return;
        }
        pokeNum = (isNaN(pokemon) ? sys.pokeNum(pokemon) : pokemon);
        gen = (pokeNum > 999 && pokeNum < 1200 ? 5 : 7);
        pokemon = sys.pokemon(pokeNum);
        type1 = sys.pokeType1(pokeNum, gen);
        type2 = sys.pokeType2(pokeNum, gen);
        types.push(helpers.typeImage(src, type1));
        if (type2 != UNKNOWN_TYPE) {
            types.push(helpers.typeImage(src, type2));
        }
        for (var i = 0; i <= 2; i++) {
            if (sys.pokeAbility(pokeNum, i, gen) !== 0) {
                abilities.push(sys.ability(sys.pokeAbility(pokeNum, i, gen)) + (i == 2 ? " (Hidden)" : ""));
            }
        }
        for (var j in sys.pokeGenders(pokeNum)) {
            genders.push(helpers.genderImage(src, sys.genderNum(j == "neutral" ? "genderless" : j)));
        }
        height = helpers.height(pokeNum);
        weight = helpers.weight(pokeNum);
        americanHeight = (height == "Unknown" ? "Unknown" : parseInt(height * 32.808399) / 10);
        americanWeight = parseInt(weight * 22) / 10;
        weightPower = helpers.weightPower(weight);
        baseStats = sys.pokeBaseStats(pokeNum, gen);
        bst = helpers.sum(baseStats);
        dexmessage = border + "<h2>#" + helpers.displayNum(pokeNum) + " " + pokemon + "</h2>"
        + "<br>" + helpers.pokeImage(pokeNum)
        + "<br><b>Type:</b> " + types.join(/img/.test(types.toString()) ? "" : " / ");
        if (pokeNum > 999 && pokeNum < 1200) {
            dexmessage += "<br><b>Tier:</b> " + helpers.tierOf(pokeNum);
        }
        dexmessage += "<br><b>" + (abilities.length == 1 ? "Ability" : "Abilities") + ":</b> " + abilities.join(" / ")
        + "<br><b>Gender:</b> " + genders.join(/img/.test(genders.toString()) ? "" : " / ")
        + "<br><b>Height:</b> " + height + " m / " + americanHeight + " ft"
        + "<br><b>Weight:</b> " + weight + " kg / " + americanWeight + " lbs"
        + "<br><b>Power of Grass Knot / Low Kick:</b> " + weightPower
        if (helpers.isAndroid(src)) {
            dexmessage += "<tt>";
            for (var k in baseStats) {
                stat = baseStats[k];
                dexmessage += "<br><b>" + helpers.statName(k) + "</b>" + helpers.spaces(8 - helpers.statName(k).length) + " "
                + helpers.colorStat(stat)+ helpers.spaces(3 - stat.toString().length) + " "
                + (k == '0' ? '-' + helpers.spaces(2) : helpers.calcStat(k, stat, MAX_IV, MIN_EV, MIN_NATURE) + helpers.spaces(3 - helpers.calcStat(k, stat, MAX_IV, MIN_EV, MIN_NATURE).toString().length)) + " | "
                + helpers.calcStat(k, stat, MAX_IV, MIN_EV, NEUTRAL_NATURE) + helpers.spaces(3 - helpers.calcStat(k, stat, MAX_IV, MIN_EV, NEUTRAL_NATURE).toString().length) + " | "
                + helpers.calcStat(k, stat, MAX_IV, MAX_EV, NEUTRAL_NATURE) + helpers.spaces(3 - helpers.calcStat(k, stat, MAX_IV, MAX_EV, NEUTRAL_NATURE).toString().length) + " | "
                + (k == '0' ? '-' + helpers.spaces(2) : helpers.calcStat(k, stat, MAX_IV, MAX_EV, MAX_NATURE));
            }
            dexmessage += "<br><b>Base Stat Total:</b> " + bst + "</tt>";
        } else {
            dexmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<br><table cellpadding='2' cellspacing='0'><thead><tr><th>Stat</th><th>Base</th><th>Min-</th><th>Min</th><th>Max</th><th>Max+</th></tr></thead><tbody>"
            for (var k in baseStats) {
                stat = baseStats[k];
                dexmessage += "<tr><th>" + helpers.statName(k) + "</th>"
                + "<td>" + helpers.colorStat(stat) + "</td>"
                + "<td>" + (k == '0' ? '-' : helpers.calcStat(k, stat, MAX_IV, MIN_EV, MIN_NATURE)) + "</td>"
                + "<td>" + helpers.calcStat(k, stat, MAX_IV, MIN_EV, NEUTRAL_NATURE) + "</td>"
                + "<td>" + helpers.calcStat(k, stat, MAX_IV, MAX_EV, NEUTRAL_NATURE) + "</td>"
                + "<td>" + (k == '0' ? '-' : helpers.calcStat(k, stat, MAX_IV, MAX_EV, MAX_NATURE)) + "</td></tr>"
            }
            dexmessage += "</tbody><tfoot><tr><td colspan='6'><b>Base Stat Total:</b> " + bst + "</td></tr></tfoot></table>";
        }
        dexmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, dexmessage, channel);
    }

    ,

    pokemon: function (src, channel, command) {
        this.pokedex(src, channel, command);
    }

    ,

    movedex: function (src, channel, command) {
        var move = command[1], moveNum, type, power, category, accuracy, pp, effect, contact, priority, range, movemessage;
        if (!move) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, move not found.");
            return;
        }
        if (!sys.moveNum(move)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid move.");
            return;
        }
        moveNum = sys.moveNum(move);
        gen = (moveNum > 999 ? 5 : 7);
        move = sys.move(moveNum);
        type = sys.moveType(moveNum, gen);
        power = helpers.movePower(moveNum, gen);
        category = helpers.moveCategory(moveNum, gen);
        accuracy = helpers.moveAccuracy(moveNum, gen);
        pp = helpers.movePP(moveNum, gen);
        effect = helpers.moveEffect(moveNum, gen);
        contact = helpers.moveContact(moveNum, gen);
        range = helpers.moveRange(moveNum, gen);
        movemessage = border + "<h2>#" + moveNum + " " + move + "</h2>"
        + "<br><b>Type:</b> " + helpers.typeImage(src, type)
        + "<br><b>Power:</b> " + power
        + "<br><b>Category:</b> " + category
        + "<br><b>Accuracy:</b> " + accuracy
        + "<br><b>PP:</b> " + pp[0] + " (" + pp[1] + ")"
        + "<br><b>Contact:</b> " + contact
        + "<br><b>Range:</b> " + range
        + "<br><b>Effect:</b> " + effect
        + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, movemessage, channel);
    }

    ,

    move: function (src, channel, command) {
        this.movedex(src, channel, command);
    }

    ,

    movepool: function (src, channel, command) {
        var pokemon = command[1], pokeNum, move, moveNum, movepool, learnmessage;
        if (!pokemon) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, Pokémon not found.");
            return;
        }
        if (!sys.pokeNum(pokemon)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid Pokémon.", channel);
            return;
        }
        pokeNum = sys.pokeNum(pokemon);
        pokemon = sys.pokemon(pokeNum);
        move = command[2];
        if (move) {
            if (!sys.moveNum(move)) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid move name.");
                return;
            }
            moveNum = sys.moveNum(move);
            move = sys.move(moveNum);
        }
        movepool = helpers.movepool(pokeNum);
        learnmessage = border + "<h2>#" + helpers.displayNum(pokeNum) + " " + pokemon + "</h2><br><b>Movepool:</b> " + movepool.join(", ")
        + "<br><br><b>Total Moves:</b> " + movepool.length + "<br><br><timestamp/><br>" + border2;
        if (move) {
            sys.sendHtmlMessage(src, helpers.bot(bots.command) + pokemon + " can" + (!helpers.isInArray(move, movepool) ? "not" : "") + " learn " + move + ".", channel);
            return;
        }
        sys.sendHtmlMessage(src, learnmessage, channel);
    }

    ,

    canlearn: function (src, channel, command) {
        this.movepool(src, channel, command);
    }

    ,

    abilitydex: function (src, channel, command) {
        var ability = command[1], abilityNum, abilitymessage;
        if (!ability) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, ability not found.");
            return;
        }
        if (!sys.abilityNum(ability)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid ability.");
            return;
        }
        abilityNum = sys.abilityNum(ability);
        ability = sys.ability(abilityNum);
        abilitymessage = border + "<h2>#" + abilityNum + " " + ability + "</h2>"
        + "<br><b>Description:</b> " + helpers.ability(abilityNum)
        + "<br><b>Pokémon with this ability:</b> " + helpers.pokemonWithAbility(abilityNum).join(", ")
        + "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, abilitymessage, channel);
    }

    ,

    ability: function (src, channel, command) {
        this.abilitydex(src, channel, command);
    }

    ,

    itemdex: function (src, channel, command) {
        var item = command[1], itemNum, itemmessage, isBerry;
        if (!item) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, item not found.");
            return;
        }
        if (!sys.itemNum(item)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid item.");
            return;
        }
        itemNum = sys.itemNum(item);
        item = sys.item(itemNum);
        isBerry = item.indexOf("Berry") != -1 && item != "Berry Juice";
        itemmessage = border + "<h2>#" + itemNum + " " + item + "</h2>"
        + "<br>" + helpers.itemImage(itemNum) + "<br>";
        if (isBerry) {
            itemNum -= 8000;
        }
        itemmessage += "<br><b>Description:</b> " + (isBerry ? helpers.getBerry(itemNum) : helpers.getItem(itemNum))
        + "<br><b>Fling Power:</b> " + helpers.getFlingPower(itemNum);
        if (isBerry) {
            itemmessage += "<br><b>Natural Gift Type:</b> " + helpers.typeImage(src, helpers.getBerryType(itemNum))
            + "<br><b>Natural Gift Power:</b> " + helpers.getBerryPower(itemNum);
        }
        itemmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, itemmessage, channel);
    }

    ,

    item: function (src, channel, command) {
        this.itemdex(src, channel, command);
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
            if (nick == name) {
                viewteammessage += "<td><b>" + name + " " + genderletter + "</b><br>";
            } else {
                viewteammessage += "<td><b>" + nick + " (" + name + ") " + genderletter + "</b><br>";
            }
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

    gradient: function (src, channel, command) {
        var gradient = command[1];
        if (!gradient) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, gradient not found.");
            return;
        }
        if (helpers.isWeb(src)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, this command does not work on the web client.");
            return;
        }
        if (helpers.isAndroid(src)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, this command does not work on Android.");
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
    interactoptions: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>User Commands ~ Interact Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/color ") + helpers.arg("color") + "</b>: changes your color to <b>color</b>. <b>color</b> must be a valid color, or 'random'. Also /colour.<br>"
        + "<b>" + helpers.user("/idle") + "</b>: changes your status to idle. Also /afk or /away.<br>"
        + "<b>" + helpers.user("/unidle") + "</b>: changes your status to available. Also /(go)back.<br>"
        + "<b>" + helpers.user("/tier ") + helpers.arg("team") + helpers.arg2("*tier") + "</b>: changes the tier of team number <b>team</b> to <b>tier</b>. If <b>team</b> is not specified, uses your first team.<br>"
        + "<b>" + helpers.user("/unregister") + "</b>: clears your password.<br>"
        + "<b>" + helpers.user("/name ") + helpers.arg("text") + "</b>: changes your username to <b>text</b>.<br>"
        + "<b>" + helpers.user("/reset") + "</b>: sets your username and color back to their original states.<br>"
        + "<b>" + helpers.user("/resetname") + "</b>: sets your username back to its original state.<br>"
        + "<b>" + helpers.user("/resetcolor") + "</b>: sets your color back to its original state. Also /resetcolour.<br>"
        + "<b>" + helpers.user("/reverse") + "</b>: reverses your username.<br>"
        + "<b>" + helpers.user("/selfkick") + "</b>: kicks yourself from the server.<br>"
        + "<b>" + helpers.user("/selfmute ") + helpers.arg("reason") + "</b>: mutes yourself on the server for <b>reason</b>.<br>"
        + "<b>" + helpers.user("/selfban ") + helpers.arg("reason") + "</b>: bans yourself from the server for <b>reason</b>.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

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
        var team = (!command[1] ? 0 : command[1]), tier = command[2];
        if (!tier) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, tier not found.");
            return;
        }
        if (!sys.getTierList().contains(tier)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid tier.");
            return;
        }
        sys.changeTier(src, team, tier);
        sys.sendHtmlMessage(src, helpers.bot(bots.battle) + "You changed your " + helpers.teamOrdinal(team) +
        " team's tier to " + tier + ".");
    }

    ,

    unregister: function (src, channel, command) {
        if (sys.auth(src) > 0) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, you may not clear your password if you have authority!");
            return;
        }
        sys.clearPass(players[src].name);
        sys.sendNetworkCommand(src, REACTIVATE_REGISTER_BUTTON);
        sys.sendHtmlMessage(src, helpers.bot(bots.pass) + "Your password has been successfully cleared.", channel);
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

    selfmute: function (src, channel, command) {
        var auth = sys.auth(src), lower = players[src].name.toLowerCase(), original;
        if (auth > 0) {
            original = mutemessages[lower];
        }
        mutemessages[lower] = "~Self~ has muted themselves!";
        modcommands.mute(src, channel, ["mute", sys.name(src), command[1]]);
        if (auth > 0) {
            mutemessages[lower] = original;
        } else {
            delete mutemessages[lower];
        }
    }

    ,

    selfban: function (src, channel, command) {
        var auth = sys.auth(src), lower = players[src].name.toLowerCase(), original;
        if (auth > 0) {
            original = banmessages[lower];
        }
        banmessages[lower] = "~Self~ has banned themselves from the server!";
        admincommands.ban(src, channel, ["ban", sys.name(src), command[1]]);
        if (auth > 0) {
            banmessages[lower] = original;
        } else {
            delete banmessages[lower];
        }
    }

    ,

    color: function (src, channel, command) {
        var color = command[1], name = sys.name(src), auth = sys.auth(src), hexColor;
        if (!color) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your " + command[0] + " is " + helpers.color(src) + ".", channel);
            return;
        }
        if (!sys.validColor(color) && color != "random") {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid " + command[0] + ".");
            return;
        }
        if (color == "#000000") {
            sys.changeColor(src, "#000001");
        } else if (color == "random") {
            sys.changeColor(src, "#000000");
        } else {
            hexColor = (helpers.isHexColor(color) ? color : sys.hexColor(color));
            if (auth === 0 && color != "random") {
                sys.changeColorStrict(src, hexColor);
            } else {
                sys.changeColor(src, hexColor);
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
    messageoptions: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>User Commands ~ Message Options</h2>"
        + "<br>"
        + "<b>" + helpers.user("/me ") + helpers.arg("message") + "</b>: posts <b>message</b> between asterisks, in bold and your name color.<br>"
        + "<b>" + helpers.user("/poke ") + helpers.arg("player") + "</b>: pokes <b>player</b>, flashing them if they are online.<br>"
        + "<b>" + helpers.user("/imp ") + helpers.arg("text") + helpers.arg2("*message") + "</b>: posts <b>message</b> as <b>text</b>.<br>"
        + "<b>" + helpers.user("/impme ") + helpers.arg("text") + helpers.arg2("*message") + "</b>: posts <b>message</b> between asterisks and in bold in your name color as <b>text</b>.<br>"
        + "<b>" + helpers.user("/future ") + helpers.arg("text") + helpers.arg2("*time") + "</b>: posts <b>message</b> into the future, to arrive in <b>time</b>. <b>message</b> can also be a command.<br>"
        if (GOOGLE_KEY !== "") {
            commandsmessage += "<b>" + helpers.user("/listen ") + helpers.arg("youtube link") + "</b>: posts a message saying that you're listening to <b>youtube link</b>. The link will turn into the video's title.<br>"
        }
        commandsmessage += "<b>" + helpers.user("/quote ") + helpers.arg("text") + helpers.arg2("*author") + "</b>: posts <b>text</b> as a quote, cited from <b>author</b>.<br>"
        + "<b>" + helpers.user("/spoiler ") + helpers.arg("text") + helpers.arg2("*source") + "</b>: saves <b>text</b> as a spoiler of <b>source</b>. A link will be posted for users to read it (Android users will be told to use the /view command instead).<br>"
        + "<b>" + helpers.user("/view ") + helpers.arg("number") + "</b>: view spoiler <b>number</b>. The number will roll back to 0 when the 100th spoiler is posted.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    me: function (src, channel, command) {
        var name = sys.name(src), color = helpers.color(src);
        command.splice(0, 1);
        command = command.join(DELIMITER);
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " " + helpers.escapehtml(command) + " ***</b></font>", channel);
    }

    ,

    poke: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src), trgt;
        command.splice(0, 1);
        command = command.join(DELIMITER);
        trgt = sys.id(command);
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " pokes " + helpers.escapehtml(command) + " ***</b></font>", channel);
        if (trgt) {
            sys.sendHtmlMessage(trgt, "<ping/>", channel);
        }
    }

    ,

    listen: function (src, channel, command) {
        if (GOOGLE_KEY === "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, this command is currently disabled.");
            return;
        }
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
                try {
                    parseCommand(src, command[1], channel, name, auth, false);
                } catch (e) {
                    sys.sendHtmlOwner(helpers.bot(bots.command) + "An error occurred while executing /future " + command[1] + ": " + e);
                }
            } else {
                sys.sendHtmlAll(message, channel);
            }
        }, milliseconds, 0);
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Your message has been sent " + time + " " + unit + " into the future!", channel);
    }

    ,

    quote: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), quote;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
            return;
        }
        if (!command[2]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, author not found.");
            return;
        }
        command[1] = helpers.escapehtml(command[1]);command[2] = helpers.escapehtml(command[2]);
        quote = "<blockquote>\"" + command[1] + "\"</blockquote><br> - " + command[2] + "<br>";
        sys.sendHtmlAll(helpers.bot(bots.main) + name + " posted the following quote:<br>" + quote, channel);
    }

    ,

    spoiler: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), text = command[1], channelPlayers = sys.playersOfChannel(channel), origin;
        if (!text) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
            return;
        }
        if (text.length > 42 && auth <= 0) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, you may not post a spoiler longer than 42 characters.");
            return;
        }
        text = text.replace(/\s{2,}/g, ' ');
        if (text.charAt(0) === ' ') {
            text = text.slice(1);
        }
        origin = (command[2] ? command[2] : "");
        if (currentSpoiler == 100) {
            currentSpoiler = 0;
        }
        spoilers[currentSpoiler] = {};
        spoilers[currentSpoiler].text = helpers.escapehtml(text);
        spoilers[currentSpoiler].origin = (origin === "" ? "Unknown" : origin);
        spoilers[currentSpoiler].sender = name;
        if (origin === "") {
            origin = ' ';
        } else {
            origin = (helpers.isVowel(origin.charAt(0)) ? "n " + origin : ' ' + origin) + ' ';
        }
        for (var i in channelPlayers) {
            if (helpers.isAndroid(channelPlayers[i])) {
                sys.sendHtmlMessage(channelPlayers[i], helpers.bot(bots.main) + name + " posted a" + origin + "spoiler! Type '/view " + currentSpoiler + "' to read it!", channel);
            } else {
                sys.sendHtmlMessage(channelPlayers[i], helpers.bot(bots.main) + name + " posted a" + origin + "spoiler! <a href='po:send//view " + currentSpoiler + "'>Click here to read it!</a>", channel);
            }
        }
        currentSpoiler++;
    }

    ,

    view: function (src, channel, command) {
        var spoiler = command[1];
        if (!spoiler) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, number not found.");
            return;
        }
        if (!spoilers[spoiler]) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, that spoiler doesn't exist.");
            return;
        }
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + spoilers[spoiler].text + " [Spoiler from: " + spoilers[spoiler].origin + "] [Sent by: " + spoilers[spoiler].sender + "]", channel);
    }

    ,

    /**
        ------------
        Tour Options
        ------------
    **/
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
};
