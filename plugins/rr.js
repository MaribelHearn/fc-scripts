/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY RUSSIAN ROULETTE rr.js
     - by Maribel Hearn, 2015-2015
    
    This file contains the scripts necessary
    for Russian Roulette, a luck 'game' in
    which you try to survive your own shots.
    The commands in it can only be run
    in the Russian Roulette channel.
    ----------------------------------------------
*/
rr = sys.fileExists(DATA_FOLDER + "rr.txt") ? helpers.readObject("rr") : {};
        
rrcommands = {
    rrcommands: function (src, channel, command) {
        var commandsMessage = border;
        commandsMessage += "<h2>Russian Roulette Commands</h2>"
        + "<br>"
        + "<b>" + helpers.user("/load") + "</b>: load a bullet into your revolver. You can load multiple, but that'll lead to a higher death rate, effectively making you worse ;)<br>"
        + "<b>" + helpers.user("/unload") + "</b>: unload a bullet from your revolver. Probably the best command to use when you have multiple bullets loaded!<br>"
        + "<b>" + helpers.user("/shoot") + "</b>: spin the cylinder and shoot. Results in a death chance of 1 in 6 with one bullet.<br>"
        + "<b>" + helpers.user("/bullets") + "</b>: shows your current number of bullets loaded into your revolver.<br>"
        + "<b>" + helpers.user("/stats") + "</b>: shows your current Russian Roulette play data.<br>"
        + "<b>" + helpers.user("/resetstats") + "</b>: resets your Russian Roulette data. WARNING! This cannot be undone.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsMessage, channel);
    }
    
    ,
    
    load: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase();
        if (!rr[lower]) {
            rr[lower] = {};
            rr[lower].survivals = 0;
            rr[lower].longest = 0;
            rr[lower].bullets = 0;
            rr[lower].deaths = 0;
            rr[lower].streak = 0;
            rr[lower].shots = 0;
        }
        if (rr[lower].bullets == 6) {
            helpers.starfox(src, channel, command, bots.rr, "Error 400, your revolver is full!");
            return;
        }
        rr[lower].bullets++;
        helpers.saveData("rr");
        sys.sendHtmlAll(helpers.bot(bots.rr) + name + " has loaded a bullet into their revolver!", rrchannel);
    }
    
    ,
    
    unload: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase();
        if (!rr[lower]) {
            helpers.starfox(src, channel, command, bots.rr, "Error 400, you haven't played yet!");
            return;
        }
        if (rr[lower].bullets === 0) {
            helpers.starfox(src, channel, command, bots.rr, "Error 400, your revolver is empty!");
            return;
        }
        rr[lower].bullets--;
        helpers.saveData("rr");
        sys.sendHtmlAll(helpers.bot(bots.rr) + name + " has unloaded a bullet from their revolver!", rrchannel);
    }
    
    ,
    
    shoot: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase(), random = sys.rand(0, 6);
        if (!rr[lower]) {
            helpers.starfox(src, channel, command, bots.rr, "Error 400, you haven't played yet!");
            return;
        }
        if (rr[lower].bullets === 0) {
            helpers.starfox(src, channel, command, bots.rr, "Error 400, your revolver is empty!");
            return;
        }
        rr[lower].shots++;
        if (random < (rr[lower].bullets + 1)) {
            rr[lower].bullets--;
            rr[lower].deaths++;
            rr[lower].streak = 0;
            sys.sendHtmlAll(helpers.bot(bots.rr) + name + " has spun the cylinder and pulled the trigger... they shot themselves and they died!", rrchannel);
            sys.kick(src, rrchannel);
        } else {
            rr[lower].survivals++;
            rr[lower].streak++;
            if (rr[lower].streak > rr[lower].longest) {
                rr[lower].longest++;
            }
            sys.sendHtmlAll(helpers.bot(bots.rr) + name + " has spun the cylinder and pulled the trigger... nothing happened! Whew!", rrchannel);
        }
        helpers.saveData("rr");
    }
    
    ,
    
    bullets: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase(), grammar;
        if (!rr[lower]) {
            helpers.starfox(src, channel, command, bots.rr, "Error 400, you haven't played yet!");
            return;
        }
        rr[lower].bullets == 1 ? grammar = "" : grammar = "s";
        sys.sendHtmlMessage(src, helpers.bot(bots.rr) + "You currently have " + rr[lower].bullets + " bullet" + grammar + " loaded.", rrchannel);
    }
    
    ,
    
    stats: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase(), deathrate, message;
        if (!rr[lower]) {
            helpers.starfox(src, channel, command, bots.rr, "Error 400, you haven't played yet!");
            return;
        }
        deathrate = (rr[lower].deaths / rr[lower].shots * 100).toPrecision(2) + "%";
        message = border + "<h2>Russian Roulette Stats</h2><br>"
        + "<br>"
        + "<b>Shots fired:</b> " + rr[lower].shots + "<br>"
        + "<b>Survivals:</b> " + rr[lower].survivals + "<br>"
        + "<b>Deaths:</b> " + rr[lower].deaths + "<br>"
        + "<b>Death rate:</b> " + deathrate + "<br>"
        + "<b>Longest streak:</b> " + rr[lower].longest + "<br>"
        + "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, message, rrchannel);
    }
    
    ,
    
    resetstats: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase();
        if (!rr[lower]) {
            helpers.starfox(src, channel, command, bots.rr, "Error 400, you haven't played yet!");
            return;
        }
        delete rr[lower];
        helpers.saveData("rr");
        sys.sendHtmlMessage(src, helpers.bot(bots.rr) + "Your Russian Roulette data has been reset.", rrchannel);
    }
};