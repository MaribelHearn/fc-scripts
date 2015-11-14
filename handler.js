/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
	----------------------------------------------
	FUN COMMUNITY COMMAND HANDLER handler.js
	 - by Maribel Hearn, 2015-2015
	
	This script file contains the command
	handler, which will parse a given command
	and execute it if possible.
	----------------------------------------------
*/

filterLastMessage = function (src, message, channel) {
	if (regchannels[sys.channel(channel).toLowerCase()]) {
		if (!regchannels[sys.channel(channel).toLowerCase()].priv && !helpers.isInString(message, silentcommands)) {
			players[src].lastmessage = message;
			players[src].lastmessagetime = new Date();
		}
	}
};

mutedOrSilenced = function (src, channel, command, name, auth) {
	if (helpers.muteCheck(name)) {
		helpers.muteMessage(src, channel);
		return true;
	}
	if (helpers.cmuteCheck(players[src].name, sys.channel(channel).toLowerCase())) {
		sys.sendHtmlMessage(src, helpers.bot(bots.mute) + "Sorry, you are muted on this channel.", channel);
		return true;
	}
	if (regchannels[sys.channel(channel).toLowerCase()]) {
		if (regchannels[sys.channel(channel).toLowerCase()].silence > auth) {
			helpers.starfox(src, channel, command, bots.silence, "I KILL YOOOOUUUU!!!");
			return true;
		}
	}
};

bigtextCommand = function (src, channel, command, lower, name, auth) {
	if (bigtexts[lower] !== undefined) {
		if (mutedOrSilenced(src, channel, command, name, auth)) {
			return;
		}
		usercommands2.bigtext(src, channel, bigtexts[lower]);
	}
};

userCommand = function (src, channel, command, lower) {
	if (usercommands1[lower] !== undefined) {
		usercommands1[lower](src, channel, command);
	}
};

mutableUserCommand = function (src, channel, command, lower, name, auth) {
	if (usercommands2[lower] !== undefined) {
		if (mutedOrSilenced(src, channel, command, name, auth)) {
			return;
		}
		usercommands2[lower](src, channel, command);
	}
};

rouletteCommand = function (src, channel, command, lower, name, auth) {
	if (roulettecommands[lower] !== undefined) {
		if (channel != roulettechannel) {
			helpers.starfox(src, channel, command, bots.roulette, "Error 403, this command is meant to be used in the <a href='po:join/" + permchannels[5] + "'>#" + permchannels[5] + "</a> channel.");
			return;
		}
		if (mutedOrSilenced(src, channel, command, name, auth)) {
			return;
		}
		roulettecommands[lower](src, channel, command);
	}
};

russianRouletteCommand = function (src, channel, command, lower, name, auth) {
	if (rrcommands[lower] !== undefined) {
		if (channel != rrchannel) {
			helpers.starfox(src, channel, command, bots.rr, "Error 403, this command is meant to be used in the the <a href='po:join/" + permchannels[4] + "'>#" + permchannels[4] + "</a> channel.");
			return;
		}
		if (mutedOrSilenced(src, channel, command, name, auth)) {
			return;
		}
		rrcommands[lower](src, channel, command);
	}
};

partyCommand = function (src, channel, command, lower, name, auth) {
	if (partycommands[lower] !== undefined) {
		if (channel != partychannel) {
			helpers.starfox(src, channel, command, bots.party, "Error 403, this command is meant to be used in the <a href='po:join/" + permchannels[3] + "'>#" + permchannels[3] + "</a> channel.");
			return;
		}
		if (mutedOrSilenced(src, channel, command, name, auth)) {
			return;
		}
		partycommands[lower](src, channel, command);
	}
};

channelUserCommand = function (src, channel, command, lower) {
	if (cusercommands[lower] !== undefined) {
		cusercommands[lower](src, channel, command);
	}
};

channelModCommand = function (src, channel, command, lower, auth, cauth) {
	if (cmodcommands[lower] !== undefined) {
		if (cauth < 1 && auth < 1) {
			helpers.starfox(src, channel, command, bots.starfox, "I can't let you do that star " + sys.name(src) + "!");
			return;
		} else {
			cmodcommands[lower](src, channel, command);
		}
	}
};

channelAdminCommand = function (src, channel, command, lower, auth, cauth) {
	if (cadmincommands[lower] !== undefined) {
		if (cauth < 2 && auth < 2) {
			helpers.starfox(src, channel, command, bots.starfox, "I can't let you do that star " + sys.name(src) + "!");
			return;
		} else {
			cadmincommands[lower](src, channel, command);
		}
	}
};

channelOwnerCommand = function (src, channel, command, lower, auth, cauth) {
	if (cownercommands[lower] !== undefined) {
		if (cauth < 3 && auth < 3) {
			helpers.starfox(src, channel, command, bots.starfox, "I can't let you do that star " + sys.name(src) + "!");
			return;
		} else {
			cownercommands[lower](src, channel, command);
		}
	}
};

modCommand = function (src, channel, command, lower, auth) {
	if (modcommands[lower] !== undefined) {
		if (auth < 1) {
			helpers.starfox(src, channel, command, bots.starfox, "I can't let you do that star " + sys.name(src) + "!");
			return;
		} else {
			modcommands[lower](src, channel, command);
		}
	}
};

adminCommand = function (src, channel, command, lower, auth) {
	if (admincommands[lower] !== undefined) {
		if (auth < 2) {
			helpers.starfox(src, channel, command, bots.starfox, "I can't let you do that star " + sys.name(src) + "!");
			return;
		} else {
			admincommands[lower](src, channel, command);
		}
	}
};

ownerCommand = function (src, channel, command, lower, auth) {
	if (ownercommands[lower] !== undefined) {
		if (auth < 3) {
			helpers.starfox(src, channel, command, bots.starfox, "I can't let you do that star " + sys.name(src) + "!");
			return;
		} else {
			ownercommands[lower](src, channel, command);
		}
	}
};

executeCommand = function (src, channel, command, name, lower, auth) {
	var cauth = helpers.cauth(players[src].name.toLowerCase(), channel);
	userCommand(src, channel, command, lower);
	mutableUserCommand(src, channel, command, lower, name, auth);
	bigtextCommand(src, channel, command, lower, name, auth);
	rouletteCommand(src, channel, command, lower, name, auth);
	russianRouletteCommand(src, channel, command, lower, name, auth);
	partyCommand(src, channel, command, lower, name, auth);
	channelUserCommand(src, channel, command, lower, auth, cauth);
	channelModCommand(src, channel, command, lower, auth, cauth);
	channelAdminCommand(src, channel, command, lower, auth, cauth);
	channelOwnerCommand(src, channel, command, lower, auth, cauth);
	modCommand(src, channel, command, lower, auth);
	adminCommand(src, channel, command, lower, auth);
	ownerCommand(src, channel, command, lower, auth);
};

watchChannelLogging = function (message, channel, name, lower, color) {
	if (regchannels[sys.channel(channel).toLowerCase()] && !regchannels[sys.channel(channel).toLowerCase()].priv) {
		if (!helpers.isInArray(lower, silentcommands)) {
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[<a href=\"po:join/" + sys.channel(channel) + "\">#" + sys.channel(channel) + "</a>] <b style='color:" + color +
			"'>" + helpers.escapehtml(name) + "</b> ran /" + helpers.escapehtml(message.slice(1)) + ".");
		}
	} else {
		if (!helpers.isInArray(lower, silentcommands)) {
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[<a href=\"po:join/" + sys.channel(channel) + "\">#" + sys.channel(channel) + "</a>] <b style='color:" + color +
			"'>" + helpers.escapehtml(name) + "</b> ran /" + helpers.escapehtml(message.slice(1)) + ".");
		}
    }
};

parseCommand = function (src, message, channel, name, auth) {
	var color = helpers.color(src), lower = "", command, cmd;
	filterLastMessage(src, message, channel);
	command = message.replace(COMMAND_SYMBOL, "");
	cmd = command;
	while (cmd !== "" && cmd.charAt(0) != ' ') {
		lower += cmd.charAt(0).toLowerCase();
		cmd = cmd.slice(1);
	}
	if (allcommands.indexOf(lower) == -1 && !bigtexts[lower]) {
		helpers.starfox(src, channel, command, bots.command, "Error 404, command '" + helpers.escapehtml(lower) + "' not found.");
		return;
	}
	command = command.replace(' ', DELIMITER).split(DELIMITER);
	executeCommand(src, channel, command, name, lower, auth);
	watchChannelLogging(message, channel, name, lower, color);
};
