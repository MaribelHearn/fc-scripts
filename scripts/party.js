/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY PARTY COMMANDS party.js
     - by Maribel Hearn, 2015-2015
    
    This file contains the scripts necessary
    for the Party channel, a channel in which
    you can mess with posts or the chat.
    The commands in it can only be run
    in the Party channel.
    ----------------------------------------------
*/
partycommands = {
    partycommands: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Party Commands</h2>"
        + "<br>"
        + "<b>" + helpers.user("/mode ") + helpers.arg("mode") + "</b>: changes the current party mode to <b>mode</b>. If <b>mode</b> is 'off', ends the current party mode. Only for channel auth.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    mode: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), lower = sys.name(src).toLowerCase(), channelname = sys.channel(channel).toLowerCase(), oldmode = partymode, mode;
        if (helpers.cauth(lower, channelname) <= 0) {
            helpers.starfox(src, channel, command, bots.starfox, "I can't let you do that star " + sys.name(src) + "!");
            return;
        }
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.party, "Error 404, mode not found.");
            return;
        }
        if (command[1] == "off") {
            if (partymode == "none") {
                helpers.starfox(src, channel, command, bots.party, "Error 400, you can't turn the current party mode off, because it is already off!");
                return;
            }
            mode = helpers.cap(partymode) + " Mode";
            if (partymode == "nightclub") {
                sys.sendHtmlAll(":<div>", channel);
            }
            sys.sendHtmlAll(border + "<br>" + helpers.bot(bots.party) + "<b>" + helpers.user(name) + " has turned " + helpers.arg(mode) + " off.</b><br>" + border2, channel);
            partymode = "none";
            sys.write("data/partymode.txt", "none");
            regchannels[permchannels[3].toLowerCase()].topic = ["Welcome to " + permchannels[3] + "!"];
            sys.write("data/regchannels.txt", JSON.stringify(regchannels));
            return;
        }
        for (var index in PARTY_MODES) {
            if (PARTY_MODES[index] == command[1].toLowerCase()) {
                partymode = PARTY_MODES[index];
                sys.write("data/partymode.txt", PARTY_MODES[index]);
                mode = helpers.cap(PARTY_MODES[index]) + " Mode";
                if (oldmode == "nightclub") {
                    sys.sendHtmlAll(":<div>", channel);
                }
                sys.sendHtmlAll(border + "<br>" + helpers.bot(bots.party) + "<b>" + helpers.user(name) + " has turned " + helpers.arg(mode) + " on!</b><br>" + border2, channel);
                if (partymode == "nightclub") {
                    sys.sendHtmlAll("<font color='white'>:</font><div style='background:black'>", channel);
                    regchannels[permchannels[3].toLowerCase()].topic = ["This channel is currently in " + mode + ".<font color='white'>:</font><div style='background:black'>"];
                    sys.write("data/regchannels.txt", JSON.stringify(regchannels));
                } else {
                    regchannels[permchannels[3].toLowerCase()].topic = ["This channel is currently in " + mode + "."];
                    sys.write("data/regchannels.txt", JSON.stringify(regchannels));
                }
                return;
            }
        }
        helpers.starfox(src, channel, command, bots.party, "Error 403, invalid mode.");
    }
};