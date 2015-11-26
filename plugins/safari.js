/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY SAFARI safari.js
     - by Maribel Hearn, 2015-2015
    
    This file contains the scripts necessary
    for Safari, a game based on the in-game
    Safari Zone in which you try to catch as
    many Pokemon as possible.
    ----------------------------------------------
*/
safaricommands = {
    start: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase(), startermessage = "";
        if (safari[lower]) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you have already joined the Safari game!");
            return;
        }
        safari[lower] = {};
        helpers.saveData("safari");
        sys.sendHtmlMessage(src, helpers.bot(bots.safari) + "Welcome to the Safari Zone, " + name + "! Please choose one of the following Pokémon by "
        + (helpers.isAndroid(src) ? "typing '/choose <pokemon>'!" : "clicking on them!"), channel);
        for (var i in STARTER_POKEMON) {
            startermessage += "<a href='po:send//choose " + STARTER_POKEMON[i] + "'>" + helpers.pokeIcon(sys.pokeNum(STARTER_POKEMON[i])) + "</a> ";
        }
        sys.sendHtmlMessage(src, startermessage, channel);
    }
    
    ,
    
    choose: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase(), starter = command[1], starterNum;
        if (!safari[lower]) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you haven't yet joined the Safari game!");
            return;
        }
        if (safari[lower].starter) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you already have a starter Pokémon!");
            return;
        }
        if (!starter) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, Pokémon not found.");
            return;
        }
        if (!helpers.isInArray(starter, STARTER_POKEMON)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid starter.");
            return;
        }
        safari[lower].starter = starter;
        safari[lower].pokemon = [];
        safari[lower].pokemon.push(sys.pokeNum(starter));
        helpers.saveData("safari");
        starterNum = sys.pokeNum(starter);
        starter = sys.pokemon(starterNum);
        sys.sendHtmlAll(helpers.bot(bots.safari) + name + " has joined the Safari game! They are starting with <b><font color='" + helpers.typecolor(starterNum) + "'>" + starter + "</font></b>!", safarichannel);
    }
    
    ,
    
    spawn: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase(), channelname = sys.channel(channel).toLowerCase(), pokemon = command[1], pokeNum, shine;
        if (helpers.cauth(lower, channelname) === 0) {
            helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
            return;
        }
        if (!pokemon) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, Pokémon not found.");
            return;
        }
        if (!sys.pokeNum(pokemon)) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid Pokémon name.");
            return;
        }
        shine = (command[2] ? true : false);
        pokeNum = sys.pokeNum(pokemon);
        pokemon = sys.pokemon(pokeNum);
        currentWild = pokeNum;
        currentWildShiny = shine;
        sys.sendHtmlAll(helpers.bot(bots.safari) + "A wild " + (shine ? "<b><font color='#FFA500'>Shiny</font></b> " : "") +
        "<b><font color='" + helpers.typecolor(pokeNum) + "'>" + pokemon + "</font></b> appeared!<br>" + helpers.pokeImage(pokeNum, shine), safarichannel);
    }
};