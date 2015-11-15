/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
	----------------------------------------------
	FUN COMMUNITY ADMIN COMMANDS admincmds.js
	 - by Maribel Hearn, 2012-2015
	
	This file contains commands that can be
    run by administrators.
	----------------------------------------------
*/
	admincommands = {
		admincommands: function (src, channel, command) {
			var commandsmessage = BORDER
			+ "<h2>Administrator Commands</h2>"
			+ "<br>"
			+ "<b>" + helpers.userl("/adminjusticeoptions") + "</b>: displays admin justice options.<br>"
			+ "<b>" + helpers.userl("/admintouroptions") + "</b>: displays admin tour options.<br>"
			+ "<b>" + helpers.userl("/dboptions") + "</b>: displays database options.<br>"
			+ "<b>" + helpers.userl("/botsettings") + "</b>: displays bot settings.<br>"
			+ "<br><timestamp/><br>"
			+ BORDER2;
			sys.sendHtmlMessage(src, commandsmessage, channel);
		}
		
		,
		
		/* Admin Justice Options */
		adminjusticeoptions: function (src, channel, command) {
			var commandsmessage = BORDER
			+ "<h2>Administrator Commands ~ Admin Justice Options</h2>"
			+ "<br>"
			+ "<b>" + helpers.user("/ban ") + helpers.arg("player") + helpers.arg2("*reason") + helpers.arg3("*time") + "</b>: bans <b>player</b> from the server for <b>time</b> for <b>reason</b>. Also /b.<br>"
			+ "<b>" + helpers.user("/unban ") + helpers.arg("player") + "</b>: unbans <b>player</b> from the server.<br>"
			+ "<b>" + helpers.user("/ipban ") + helpers.arg("IP") + helpers.arg2("*reason") + helpers.arg3("*time") + "</b>: bans <b>IP</b> from the server for <b>time</b> for <b>reason</b>.<br>"
			+ "<b>" + helpers.user("/ipunban ") + helpers.arg("IP") + "</b>: unbans <b>IP</b> from the server.<br>"
			+ "<b>" + helpers.user("/banreason ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: changes the ban reason for <b>player</b> to <b>reason</b>.<br>"
			+ "<b>" + helpers.user("/clearbanlist") + "</b>: clears the server's ban list.<br>"
			+ "<br><timestamp/><br>"
			+ BORDER2;
			sys.sendHtmlMessage(src, commandsmessage, channel);
		}
		
		,
		
		ban: function (src, channel, command) {
			var name = sys.name(src), trgtname = command[1], trgt = sys.id(trgtname), reason = command[2], auth = sys.auth(src), trgtauth, trgtip;
			if (!trgtname) {
				helpers.starfox(src, channel, command, bots.ban, "Error 404, player not found.");
				return;
			}
			var lower = trgtname.toLowerCase();
			if (helpers.muteCheck(name)) {
				helpers.muteMessage(src, channel);
				return;
			}
			if (sys.dbIp(trgtname) === undefined) {
				helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't ban " + trgtname + " because they do not exist in the database.");
				return;
			}
			if (!trgt) {
				trgtauth = sys.dbAuth(trgtname);
				trgtip = sys.dbIp(trgtname);
			} else {
				trgtauth = sys.auth(trgt);
				trgtip = sys.ip(trgt);
			}
			if (trgtauth >= auth && lower != name.toLowerCase() && lower != players[src].name.toLowerCase()) {
				helpers.starfox(src, channel, command, bots.ban, "Error 403, you may not ban " + trgtname + " because their auth level is higher or equal to yours.");
				return;
			}
			if (!reason) {
				reason = "Unknown";
			} else {
				reason = helpers.escapehtml(reason);
			}
			var units = ["s", "m", "h", "d", "seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
			banlist[lower] = {};
			banlist[lower].ip = trgtip;
			banlist[lower].bannedby = players[src].name;
			banlist[lower].reason = reason;
			if (!command[3]) {
				banlist[lower].time = "5ever";
				banlist[lower].starttime = "5ever";
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
					helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid time.");
					return;
				}
				if (!helpers.isInArray(unit, units)) {
					helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid unit.");
					return;
				}
				if (unit == "s" || unit == "second" || unit == "seconds") {
					banlist[lower].time = time;
					time == 1 ? unit = "second" : unit = "seconds";
				} else if (unit == "m" || unit == "minute" || unit == "minutes") {
					banlist[lower].time = time * 60;
					time == 1 ? unit = "minute" : unit = "minutes";
				} else if (unit == "h" || unit == "hour" || unit == "hours") {
					banlist[lower].time = time * 3600;
					time == 1 ? unit = "hour" : unit = "hours";
				} else if (unit == "d" || unit == "day" || unit == "days") {
					banlist[lower].time = time * 86400;
					time == 1 ? unit = "day" : unit = "days";
				}
				banlist[lower].starttime = time + " " + unit;
			}
			var date = helpers.date(new Date());
			banlist[lower].date = date;
			sys.write("data/banlist.txt", JSON.stringify(banlist));
			if (members[lower]) {
				trgtname = members[lower];
			}
			if (banmessages[name.toLowerCase()]) {
				if (time == "forever") {
					msg = banmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Time~/gi, "forever").replace(/~Server~/gi, sys.getServerName());
				} else {
					msg = banmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtname).replace(/~Time~/gi, time + " " + unit).replace(/~Server~/gi, sys.getServerName());
				}
				sys.sendHtmlAll(helpers.bot(bots.ban) + msg + " [Reason: " + reason + "]", channel);
			} else {
				sys.sendHtmlAll(helpers.bot(bots.ban) + name + " has banned " + trgtname + " from the server" + (time == "forever" ? "" : " for " + time + " ") + unit + "! [Reason: " + reason + "]", channel);
			}
			if (trgt) {
				sys.ban(trgtname);
			}
			for (var index in mutelist) {
				if (!sys.dbIp(index)) {
					delete mutedips[mutelist[index].ip];
					delete mutelist[index];
					continue;
				}
				if (mutelist[index].ip == banlist[lower].ip) {
					delete mutedips[mutelist[index].ip];
					delete mutelist[index];
					if (members[index])index = members[index];
					sys.write("data/mutelist.txt", JSON.stringify(mutelist));
					sys.sendHtmlMessage(src, helpers.bot(bots.mute) + index + " has been automatically unmuted.", channel);
					continue;
				}
			}
		}
		
		,
		
		b: function (src, channel, command) {
			this.ban(src, channel, command);
		}
		
		,
		
		ipban: function (src, channel, command) {
			var name = sys.name(src), reason = command[2], auth = sys.auth(src), aliases;
			if (!command[1]) {
				helpers.starfox(src, channel, command, bots.ban, "Error 404, IP not found.");
				return;
			}
			var trgtip = command[1];
			if (helpers.muteCheck(name)) {
				helpers.muteMessage(src, channel);
				return;
			}
			if (!trgtip) {
				helpers.starfox(src, channel, command, bots.ban, "Error 404, IP not found.");
				return;
			}
			if (!helpers.isIp(trgtip)) {
				helpers.starfox(src, channel, command, bots.ban, "Error 403, invalid IP.");
				return;
			}
			if (banlist[trgtip]) {
				helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't ban " + trgtip + " because it is already banned!");
				return;
			}
			if (sys.aliases(trgtip) === undefined) {
				helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't ban " + trgtip + " because it doesn't exist in the database.");
				return;
			} else {
				aliases = sys.aliases(trgtip);
				for (var index in aliases) {
					if (sys.dbAuth(aliases[index]) >= auth) {
						helpers.starfox(src, channel, command, bots.ban, "Error 403, you may not ban " + trgtip + " because one or more of its alts has / have higher auth.");
						return;
					}
				}
			}
			if (!reason) {
				reason = "Unknown";
			} else {
				reason = helpers.escapehtml(reason);
			}
			var units = ["s", "m", "h", "d", "seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
			banlist[trgtip] = {};
			banlist[trgtip].ip = trgtip;
			banlist[trgtip].bannedby = players[src].name;
			banlist[trgtip].reason = reason;
			if (!command[3]) {
				banlist[trgtip].time = "5ever";
				banlist[trgtip].starttime = "5ever";
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
					helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid time.");
					return;
				}
				if (!helpers.isInArray(unit, units)) {
					helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid unit.");
					return;
				}
				if (unit == "s" || unit == "second" || unit == "seconds") {
					banlist[trgtip].time = time;
					time == 1 ? unit = "second" : unit = "seconds";
				} else if (unit == "m" || unit == "minute" || unit == "minutes") {
					banlist[trgtip].time = time * 60;
					time == 1 ? unit = "minute" : unit = "minutes";
				} else if (unit == "h" || unit == "hour" || unit == "hours") {
					banlist[trgtip].time = time * 3600;
					time == 1 ? unit = "hour" : unit = "hours";
				} else if (unit == "d" || unit == "day" || unit == "days") {
					banlist[trgtip].time = time * 86400;
					time == 1 ? unit = "day" : unit = "days";
				}
				banlist[trgtip].starttime = time + " " + unit;
				time = "for " + time + " ";
			}
			var date = helpers.date(new Date());
			banlist[trgtip].date = date;
			sys.write("data/banlist.txt", JSON.stringify(banlist));
			if (banmessages[name.toLowerCase()]) {
				msg = banmessages[name.toLowerCase()].replace(/~Self~/gi, name).replace(/~Target~/gi, trgtip).replace(/~Time~/gi, time + unit).replace(/~Server~/gi, sys.getServerName());
				sys.sendHtmlAll(helpers.bot(bots.ban) + msg + " [Reason: " + reason + "]", channel);
			} else {
				sys.sendHtmlAll(helpers.bot(bots.ban) + name + " has IP banned " + trgtip + " from the server " + time + unit + "! [Reason: " + reason + "]", channel);
			}
			for (var index in mutelist) {
				if (!sys.dbIp(index)) {
					delete mutedips[mutelist[index].ip];
					delete mutelist[index];
					continue;
				}
				if (mutelist[index].ip == trgtip) {
					delete mutedips[mutelist[index].ip];
					delete mutelist[index];
					if (members[index])index = members[index];
					sys.write("data/mutelist.txt", JSON.stringify(mutelist));
					sys.sendHtmlMessage(src, helpers.bot(bots.mute) + index + " has been automatically unmuted.", channel);
					continue;
				}
			}
		}
		
		,
		
		unban: function (src, channel, command) {
			var name = sys.name(src), ip;
			if (!command[1]) {
				helpers.starfox(src, channel, command, bots.ban, "Error 404, player not found.");
				return;
			}
			var trgtname = command[1], lower = trgtname.toLowerCase();
			if (!sys.dbIp(lower)) {
				helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't unban " + trgtname + " because they don't exist in the database!");
				return;
			}
			if (!banlist[lower]) {
				helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't unban " + trgtname + " because they aren't banned!");
				return;
			}
			for (var index in banlist) {
				if (!sys.dbIp(index) && !helpers.isIp(index)) {
					ip = banlist[index].ip;
					banlist[ip] = banlist[index];
					delete banlist[index];
					continue;
				}
				if (sys.dbIp(index) == sys.dbIp(trgtname)) {
					delete banlist[index];
					sys.write("data/banlist.txt", JSON.stringify(banlist));
				}
			}
			if (members[lower]) {
				trgtname = members[lower];
			}
			sys.unban(trgtname);
			sys.sendHtmlAll(helpers.bot(bots.ban) + trgtname + " has been unbanned by " + name + "!", channel);
		}
		
		,
		
		ipunban: function (src, channel, command) {
			var name = sys.name(src);
			if (!command[1]) {
				helpers.starfox(src, channel, command, bots.ban, "Error 404, IP not found.");
				return;
			}
			var trgtip = command[1];
			if (!helpers.isIp(trgtip)) {
				helpers.starfox(src, channel, command, bots.ban, "Error 403, invalid IP.");
				return;
			}
			if (!banlist[trgtip]) {
				helpers.starfox(src, channel, command, bots.ban, "Error 400, you can't IP unban " + trgtip + " because it isn't banned!");
				return;
			}
			delete banlist[trgtip];
			sys.write("data/banlist.txt", JSON.stringify(banlist));
			sys.sendHtmlAll(helpers.bot(bots.ban) + trgtip + " has been IP unbanned by " + name + "!", channel);
		}
		
		,
		
		clearbanlist: function (src, channel, command) {
			var name = sys.name(src);
			banlist = {};
			sys.write("data/banlist.txt", "{}");
			sys.sendHtmlAll(helpers.bot(bots.ban) + "The ban list has been cleared by " + name + "!", channel);
		}
		
		,
		
		banreason: function (src, channel, command) {
			if (!command[1]) {
				helpers.starfox(src, channel, command, bots.ban, "Error 404, player not found.");
				return;
			}
			var reason;
			if (command[2] === undefined || command[2] === null || command[2] === "" || !command[2]) {
				reason = "None given.";
			} else {
				reason = command[2];
			}
			var banner = sys.name(src), banned = command[1], srcauth = sys.auth(src), lower = command[1].toLowerCase();
			banlist[banned.toLowerCase()].reason = reason;
			sys.write("data/banlist.txt", JSON.stringify(banlist));
			sys.sendHtmlAll(helpers.bot(bots.ban) + banner + " has changed the ban reason of " + command[1] + " to '" + reason + "'!", channel);
		}
		
		,
		
		banmsg: function (src, channel, command) {
			var message = command[1], lower = sys.name(src).toLowerCase(), msg;
			if (!message) {
				!banmessages[lower] ? msg = " the default one." : msg = ": " + banmessages[lower];
				sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Your current ban message is" + msg, channel);
				return;
			}
			banmessages[lower] = message;
			sys.write("data/banmsg.txt", JSON.stringify(banmessages));
			sys.sendHtmlMessage(src, helpers.bot(bots.ban) + "Your ban message has been changed successfully.", channel);
		}
		
		,
		
		/* Tour Options */
		admintouroptions: function (src, channel, command) {
			var commandsmessage = BORDER
			+ "<h2>Administrator Commands ~ Tour Options</h2>"
			+ "<br>"
			+ "<b>" + helpers.user("/tour ") + helpers.arg("tier") + helpers.arg2("*number") + "</b>: starts a <b>tier</b> tournament with <b>number</b> participators.<br>"
			+ "<b>" + helpers.user("/toursize ") + helpers.arg("number") + "</b>: changed the number of participators to <b>number</b>.<br>"
			+ "<b>" + helpers.user("/endtour") + "</b>: ends the current tournament.<br>"
			+ "<br><timestamp/><br>"
			+ BORDER2;
			sys.sendHtmlMessage(src, commandsmessage, channel);
		}
		
		,
		
		tour: function (src, channel, command) {
			if (tour[0].tourmode !== 0) {
				helpers.starfox(src, channel, command, bots.tour, "Error 400, you can't start a tour because there is already a tour running!");
				return;
			}
			var tiers = sys.getTierList();
			for (var tiersindex in tiers) {
				if (command[1].toLowerCase() == tiers[tiersindex].toLowerCase()) {
					var temptourtier = tiers[tiersindex];  
				}
			}
			tour[0].tourtier = temptourtier;
			if (tour[0].tourtier === undefined) {
				helpers.starfox(src, channel, command, bots.tour, "Error 400, the specified tier " + command[1] + " does not exist!");  
				return;
			}
			tour[0].tournumber = command[2];
			if (tour[0].tournumber <= 2) {                        
				helpers.starfox(src, channel, command, bots.tour, "Error 403, you must specify a tour size of 3 or more!");
				return;
			}
			tour[0].tourmode = 1;
			tour[0].tourcurrentnumber = tour[0].tournumber;
			tour[0].tourmembers = [];
			tour[0].tourbattlers = [];
			tour[0].tourwinners = [];
			tour[0].tourlosers = [];
			tour[0].tourstarter = sys.name(src);
			tour[0].tourstarttime = new Date();
			tour[0].tourclauses = sys.getClauses(tour[0].tourtier);
			helpers.tourdisplay(0, 0);
		}
		
		,
		
		toursize: function (src, channel, command) {
			if (tour[0].tourmode !== 0) {
				helpers.starfox(src, channel, command, bots.tour, "Error 400, you can't edit the tour size because there is already a tour running!", channel);
				return;
			}
			if (command[1] == "undefined" || command[1] === undefined || command[1] === "" || command[1] === null || !command[1] || isNaN(command[1])) {
				helpers.starfox(src, channel, command, bots.tour, "You need to specify a number!");
				return;
			}
			tour[0].tournumber = command[1];
			sys.sendHtmlMain(BORDER + "<br>" + helpers.bot(bots.tour) + sys.name(src) + " has changed the number of tournament players to " + command[1] + "!<br>" + BORDER2);
		}
		
		,

		endtour: function (src, channel, command) {
			if (tour[0].tourmode === 0) {
				helpers.starfox(src, channel, command, bots.tour, "Error 400, you can't end the tour because there is none running!");
				return;
			}
			tour[0].tourmode = 0;                        
			sys.sendHtmlMain(BORDER + "<br>" + helpers.bot(bots.tour) + "The " + tour[0].tourtier + " tournament has been cancelled by " + sys.name(src) + ".<br>" + BORDER2);
		}
		
		,

		/* Bot Settings */
		botsettings: function (src, channel, command) {
			var commandsmessage = BORDER
			+ "<h2>Administrator Commands ~ Bot Settings</h2>"
			+ "<br>"
			+ "Current bots and their names:<br>"
			+ "<br>";
			for (var index in bots) {
				commandsmessage += index + ": " + bots[index] + "<br>";
			}
			commandsmessage += "<br>"
			+ "Use <b>" + helpers.user("/bot ") + helpers.arg("bot") + helpers.arg2("*name") + "</b> to change the <b>bot</b> bot's name to <b>name</b>.<br>"
			+ "Use <b>" + helpers.user("/botcolor ") + helpers.arg("color") + "</b> to change the bot color to <b>color</b>. Also /botcolour.<br>"
			+ "Use <b>" + helpers.user("/symbol ") + helpers.arg("character") + "</b> to change the bot symbol to <b>character</b>.<br>"
			+ "Use <b>" + helpers.user("/symbolcolor ") + helpers.arg("color") + "</b> to change the bot symbol color to <b>color</b>. Also /symbolcolour.<br>"
			+ "<br><timestamp/><br>"
			+ BORDER2;
			sys.sendHtmlMessage(src, commandsmessage, channel);
		}
		
		,
		
		bot: function (src, channel, command) {
			var name = sys.name(src), isbot = false, bot;
			if (!command[1]) {
				helpers.starfox(src, channel, command, bots.main, "Error 404, bot not found.");
				return;
			}
			bot = command[1].toLowerCase();
			for (var index in bots) {
				if (bot == index)isbot = true;
			}
			if (!isbot) {
				helpers.starfox(src, channel, command, bots.main, "Error 404, bot not found.");
				return;
			}
			if (!command[2]) {
				command[2] = "undefined";
			}
			bots[bot] = command[2];
			sys.write("data/bots.txt", JSON.stringify(bots));
			sys.sendHtmlMain(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed the " + bot + " bot's name to " + helpers.arg(command[2]) + "!</b>");
		}
		
		,
		
		botcolor: function (src, channel, command) {
			var name = sys.name(src);
			if (!command[1]) {
				sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The bot " + command[0].slice(3) + " is currently " + botcolor + ".", channel);
				return;
			}
			botcolor = command[1];
			sys.write("data/botcolor.txt", botcolor);
			sys.sendHtmlMain(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed the bot " + command[0].slice(3) + " to " + command[1] + "!</b>");
		}
		
		,
		
		botcolour: function (src, channel, command) {
			this.botcolor(src, channel, command);
		}
		
		,
		
		symbol: function (src, channel, command) {
			var name = sys.name(src);
			if (!command[1]) {
				sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The bot symbol is currently " + botsymbol + ".", channel);
				return;
			}
			if (command[1].length != 1) {
				helpers.starfox(src, channel, command, bots.main, "Error 403, the symbol must be 1 character.");
				return;
			}
			botsymbol = command[1];
			sys.write("data/botsymbol.txt", botsymbol);
			sys.sendHtmlMain(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed the bot symbol to " + helpers.escapehtml(command[1]) + "!</b>");
		}
		
		,
		
		symbolcolor: function (src, channel, command) {
			var name = sys.name(src);
			if (!command[1]) {
				sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The bot symbol " + command[0].slice(6) + " is currently " + botsymbolcolor + ".", channel);
				return;
			}
			botsymbolcolor = command[1];
			sys.write("data/botsymbolcolor.txt", botsymbolcolor);
			sys.sendHtmlMain(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed the bot symbol " + command[0].slice(6) + " to " + helpers.escapehtml(command[1]) + "!</b>");
		}
		
		,
		
		symbolcolour: function (src, channel, command) {
			this.symbolcolor(src, channel, command);
		}
		
		,
		
		/* Database Options */
		dboptions: function (src, channel, command) {
			var commandsmessage = BORDER
			+ "<h2>Administrator Commands ~ Database Options</h2>"
			+ "<br>"
			+ "<b>" + helpers.user("/dbinfo") + "</b>: displays information about the database. May cause lag.<br>"
			+ "<b>" + helpers.user("/dbsearch ") + helpers.arg("text") + "</b>: displays all players in the database that match <b>text</b>. Also /search.<br>"
			+ "<b>" + helpers.user("/dbdelete ") + helpers.arg("player") + "</b>: removes <b>player</b> from the database.<br>"
			+ "<br><timestamp/><br>"
			+ BORDER2;
			sys.sendHtmlMessage(src, commandsmessage, channel);
		}
		
		,
		
		dbinfo: function (src, channel, command) {
			var db = sys.dbAll(), infomessage = BORDER + "<h2>Database Info</h2><br>", ipArray = [], rangeArray = [], registeredUsers = 0, users, ip, range, registered;
			users = db.length;
			for (var i in db) {
				ip = sys.dbIp(db[i]);
				range = sys.dbRange(db[i]);
				registeredUsers += (sys.dbRegistered(db[i]) ? 1 : 0);
				if (!helpers.isInArray(ip, ipArray)) {
					ipArray.push(ip);
				}
				if (!helpers.isInArray(range, rangeArray)) {
					rangeArray.push(range);
				}
			}
			infomessage += "<b>Users</b>: " + users + "<br>"
			+ "<b>Registered users</b>: " + registeredUsers + "<br>"
			+ "<b>IPs</b>: " + ipArray.length + "<br>"
			+ "<b>Ranges</b>: " + rangeArray.length + "<br>"
			+ "<br><timestamp/><br>" + BORDER2;
			sys.sendHtmlMessage(src, infomessage, channel);
		}
		
		,
		
		dbsearch: function (src, channel, command) {
			var list = "", term = command[1], resultsmessage = BORDER + "<h2>Database Search</h2><br>Your database search request '" + term + "' returned the following results:<br><br>", total = 0, db;
			if (!term) {
				helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.", channel);
				return;
			}
			if (term.length < 2) {
				helpers.starfox(src, channel, command, bots.command, "Error 403, invalid text. Looking for one specific character can cause a lot of lag, so you must specify more.");
				return;
			}
			db = sys.dbAll();
			for (var index in db) {
				if (db[index].toLowerCase().indexOf(term.toLowerCase()) != -1) {
					resultsmessage += db[index] + "<br>";
					total++;
				}
			}
			resultsmessage += "<br><b>Total Results:</b> " + total + "<br><br><timestamp/><br>" + BORDER2;
			sys.sendHtmlMessage(src, resultsmessage, channel);
		}
		
		,
		
		search: function (src, channel, command) {
			this.dbsearch(src, channel, command);
		}
		
		,
		
		dbdelete: function (src, channel, command) {
			var auth = sys.auth(src), player, aliases;
			if (!command[1]) {
				helpers.starfox(src, channel, command, bots.command, "Error 404, player not found.", channel);
				return;
			}
			player = command[1].toLowerCase();
			if (!sys.dbIp(player)) {
				helpers.starfox(src, channel, command, bots.command, "Error 400, you can't delete " + player + " because they don't exist in the database!");
				return;
			}
			aliases = sys.aliases(sys.dbIp(player));
			for (var index in aliases) {
				if (sys.dbAuth(aliases[index]) >= auth && auth < 3) {
					helpers.starfox(src, channel, command, bots.command, "Error 403, you may not delete " + player + " because one of their alts' auth levels is higher or equal to yours.");
					return;
				}
			}
			if (members[player]) {
				player = members[player];
			}
			sys.dbDelete(player);
			sys.sendHtmlMessage(src, helpers.bot(bots.command) + player + " has been deleted from the database.", channel);
		}
	};
