/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
	----------------------------------------------
	FUN COMMUNITY CADMIN COMMANDS cadmincmds.js
	 - by Maribel Hearn, 2012-2015
	
	This file contains commands that can be
    run by channel administrators.
	----------------------------------------------
*/
cadmincommands = {	
	cadmincommands: function (src, channel, command) {
		var commandsmessage = BORDER
		+ "<h2>Channel Administrator Commands</h2>"
		+ "<br>"
		+ "<b>" + helpers.user("/cban ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: bans <b>player</b> from the current channel for <b>reason</b>.<br>"
		+ "<b>" + helpers.user("/cunban ") + helpers.arg("player") + "</b>: unbans <b>player</b> from the current channel.<br>"
		+ "<br><timestamp/><br>"
		+ BORDER2;
		sys.sendHtmlMessage(src, commandsmessage, channel);
	}
	
	,
	
	cban: function (src, channel, command) {
        var trgtname = command[1], lower = sys.channel(channel).toLowerCase(), reason = command[2];
		if (!trgtname) {
			helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.", channel);
			return;
		}
		if (!reason) {
            reason = "Unknown";
        }
		if (!sys.dbExists(trgtname)) {
			helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't channel ban " + trgtname + " because they do not exist in the database.");
			return;
		}
		if (regchannels[lower]) {
			var trgtip = sys.dbIp(command[1]), name = trgtname.toLowerCase();
			if (regchannels[lower].banlist[name]) {
				helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't channel ban " + trgtname + " because they already are!");
				return;
			}
			regchannels[lower].banlist[name] = {};
			regchannels[lower].banlist[name].ip = trgtip;
			regchannels[lower].banlist[name].banner = sys.name(src);
			regchannels[lower].banlist[name].reason = reason;
			var date = helpers.date(new Date());
			regchannels[lower].banlist[name].date = date;
			sys.write("data/regchannels.txt", JSON.stringify(regchannels));
		} else {
			helpers.starfox(src, channel, command, bots.channel, "Error 400, this channel isn't registered!", channel);
			return;
		}
		var trgt = sys.id(trgtname);
		if (trgt && sys.isInChannel(trgt, channel)) {
			sys.kick(trgt, channel);
		}
		sys.sendHtmlAll(helpers.bot(bots.channel) + trgtname + " has been banned from this channel by " + sys.name(src) + "! [Reason: " + reason + "]", channel);
	}
	
	,
	
	cunban: function (src, channel, command) {
		var trgtname = command[1], lower = sys.channel(channel).toLowerCase(), name;
		if (!trgtname) {
			helpers.starfox(src, channel, command, bots.channel, "Error 404, player not found.", channel);
			return;
		}
        name = command[1].toLowerCase();
		if (!sys.dbExists(name)) {
			helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't unban " + trgtname + " because they don't exist in the database.");
			return;
		}
		if (!regchannels[lower].banlist[name]) {
			helpers.starfox(src, channel, command, bots.channel, "Error 400, you can't unban " + trgtname + " because they aren't banned!");
			return;
		}
		for (var index in regchannels[lower].banlist) {
			if (sys.dbIp(index) == sys.dbIp(trgtname)) {
				delete regchannels[lower].banlist[index];
				sys.write("data/regchannels.txt", JSON.stringify(regchannels));
			}
		}
		sys.sendHtmlAll(helpers.bot(bots.channel) + trgtname + " has been unbanned from this channel by " + sys.name(src) + "!", channel);
	}
};
