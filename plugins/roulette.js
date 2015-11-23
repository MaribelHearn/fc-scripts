/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY ROULETTE roulette.js
     - by Maribel Hearn, 2015-2015
    
    This file contains the scripts necessary
    for Roulette, a random Pokemon generation
    game. The commands in it can only be run
    in the Roulette channel.
    ----------------------------------------------
*/
roulettecommands = {
    roulettecommands: function (src, channel, command) {
        var commandsmessage = border;
        commandsmessage += "<h2>Roulette Commands</h2>"
        + "<br>"
        + "<b>" + helpers.user("/roulette") + "</b>: generates a pseudorandom Pokémon with a random nature and a random held item.<br>"
        + "<b>" + helpers.user("/shinies") + "</b>: shows your Shiny Pokémon, if any.<br>"
        + "<b>" + helpers.user("/longestchain") + "</b>: shows how long your longest chain of Pokémon was, and which Pokémon was chained.<br>"
        + "<b>" + helpers.user("/eventflash") + "</b>: toggles whether a random event will flash you or not (see /help for events). Flashing is turned off by default.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }
    
    ,
    
    roulette: function (src, channel, command) {
        var LEGENDARY_LIST = ["Articuno", "Zapdos", "Moltres", "Mewtwo", "Mew", "Raikou", "Entei", "Suicune", "Ho-Oh", "Lugia", "Celebi", "Kyogre", "Groudon", "Rayquaza", "Latios",
        "Latias", "Regirock", "Regice", "Registeel", "Jirachi", "Deoxys", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Giratina", "Heatran", "Regigigas", "Cresselia", "Darkrai",
        "Manaphy", "Shaymin", "Arceus", "Victini", "Cobalion", "Terrakion", "Virizion", "Tornadus", "Thundurus", "Landorus", "Reshiram", "Zekrom", "Kyurem", "Meloetta", "Genesect",
        "Xerneas", "Yveltal", "Zygarde"];
        var name = sys.name(src), rouletteMessage = name + " has rolled ", lower = name.toLowerCase();
        
        if (!roulette[lower]) {
            roulette[lower] = {};
            roulette[lower].shinies = {};
            roulette[lower].chainLength = 1;
            roulette[lower].isChaining = false;
            roulette[lower].eventFlash = false;
            roulette[lower].shinyChance = 4096;
            roulette[lower].longestChain = [1, ""];
        }
        
        var shiny, shinyNumber, pokeName, itemName, typeList = [];
        var pokemon, random, nature = sys.nature(sys.rand(0, 25)), item = sys.rand(1, 393);
        var chainNumber = (rouletteEvent == "fest" ? (42 + (roulette[lower].chainLength - 1) * 3) : 6 * roulette[lower].chainLength), chainRandom = sys.rand(0, 100);
        
        if (roulette[lower].previousPokemon && chainRandom < chainNumber) {
            pokemon = roulette[lower].previousPokemon;
            roulette[lower].isChaining = true;
            roulette[lower].chainLength += 1;
            roulette[lower].shinyChance = parseInt(roulette[lower].shinyChance / 2);
            if (roulette[lower].chainLength > roulette[lower].longestChain[0]) {
                roulette[lower].longestChain = [roulette[lower].chainLength, sys.pokemon(pokemon)];
            }
            rouletteMessage = "<b>Chain!</b> (Length " + roulette[lower].chainLength + ") " + rouletteMessage;
        } else {
            if (rouletteEvent == "frenzy") {
                roulette[lower].shinyChance = 33;
            } else {
                if (roulette[lower].shinyChance < 4096) {
                    for (var j = 1; j < roulette[lower].chainLength; j++) {
                        roulette[lower].shinyChance *= 2;
                    }
                }
            }
            roulette[lower].chainLength = 1;
            if (rouletteEvent == "legendary") {
                random = sys.rand(0, 100);
                pokemon = (random < 33 ? sys.pokeNum(LEGENDARY_LIST[sys.rand(0, LEGENDARY_LIST.length)]) : sys.rand(1, 722));
            } else if (sys.typeNum(rouletteEvent)) {
                for (var i = 0; i < 722; i++) {
                    if (sys.pokeType1(i) == sys.typeNum(rouletteEvent) || sys.pokeType1(i) == sys.typeNum(rouletteEvent)) {
                        typeList.push(i);
                    }
                }
                random = sys.rand(0, 2);
                pokemon = (random === 0 ? typeList[sys.rand(0, typeList.length)] : sys.rand(1, 722));
            } else {
                pokemon = sys.rand(1, 722);
            }
            if (roulette[lower].isChaining) {
                rouletteMessage = "Too bad, the chain broke! " + rouletteMessage;
            }
            roulette[lower].isChaining = false;
        }
        
        rouletteMessage += "<b>" + pokemon + "</b>! ";
        
        if (item == 344 || item == 345) { // Pink Bow and Polkadot Bow
            item += 656;
        } else if (item >= 346) { // Mega Stones
            item += 1655;
        }
        
        shinyNumber = sys.rand(0, roulette[lower].shinyChance);
        shiny = (shinyNumber === 0 ? true : false);
        if (shiny) {
            roulette[lower].shinies[pokemon] = [];
            if (roulette[lower].isChaining) {
                roulette[lower].shinies[pokemon].push("length " + roulette[lower].chainLength + " chain");
                roulette[lower].chainLength = 1;
                roulette[lower].isChaining = false;
            } else {
                roulette[lower].shinies[pokemon].push(helpers.strip(helpers.formatEvent(rouletteEvent)).toLowerCase());
            }
            roulette[lower].shinies[pokemon].push("1 / " + roulette[lower].shinyChance);
            roulette[lower].shinyChance = 4096;
        }
        
        pokeName = sys.pokemon(pokemon);
        itemName = sys.item(item);
        
        roulette[lower].previousPokemon = pokemon;
        helpers.saveData("roulette");
        
        rouletteMessage += "They obtained a" + (helpers.isVowel(nature.charAt(0)) ? "n " + nature : " " + nature) + " " + (shiny ? "<b><font color='#FFA500'>Shiny</font></b> " : "") +
        "<b><font color='" + helpers.typecolor(pokemon) + "'>" + pokeName + "<font></b> holding a" + (helpers.isVowel(itemName.charAt(0)) || itemName.charAt(0) == 'X' ? "n " + itemName : " " + itemName) + "!" +
        "<br><img src='pokemon:" + pokemon + (shiny ? "&shiny=true" : "") + "'><img src='item:" + item + "'>";
        sys.sendHtmlAll(helpers.bot(bots.roulette) + rouletteMessage, channel);
    }
    
    ,
    
    shinies: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase(), shinies = [];
        if (!roulette[lower]) {
            roulette[lower] = {};
            roulette[lower].shinies = {};
            roulette[lower].chainLength = 1;
            roulette[lower].isChaining = false;
            roulette[lower].eventFlash = false;
            roulette[lower].shinyChance = 4096;
            roulette[lower].longestChain = [1, ""];
            helpers.saveData("roulette");
            sys.sendHtmlMessage(src, helpers.bot(bots.roulette) + "You don't have any Shiny Pokémon. :(", channel);
            return;
        }
        if (Object.keys(roulette[lower].shinies).length === 0) {
            sys.sendHtmlMessage(src, helpers.bot(bots.roulette) + "You don't have any Shiny Pokémon. :(", channel);
            return;
        }
        for (var i in roulette[lower].shinies) {
            shinies.push("<img src='pokemon:" + i + "&shiny=true'>" + " <b>" + sys.pokemon(i) +
            "</b> (" + (roulette[lower].shinies[i][0] === "" ? "none" : roulette[lower].shinies[i][0]) + ", " + roulette[lower].shinies[i][1] + ")");
        }
        sys.sendHtmlMessage(src, helpers.bot(bots.roulette) + "Your Shiny Pokémon:<br>" + shinies.join(""), channel);
    }
    
    ,
    
    longestchain: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase();
        if (!roulette[lower]) {
            roulette[lower] = {};
            roulette[lower].shinies = {};
            roulette[lower].chainLength = 1;
            roulette[lower].longestChain = [];
            roulette[lower].isChaining = false;
            roulette[lower].eventFlash = false;
            roulette[lower].shinyChance = 4096;
            roulette[lower].longestChain = [1, ""];
            helpers.saveData("roulette");
            sys.sendHtmlMessage(src, helpers.bot(bots.roulette) + "You haven't chained yet. :(", channel);
            return;
        }
        if (roulette[lower].longestChain[0] === 1) {
            sys.sendHtmlMessage(src, helpers.bot(bots.roulette) + "You haven't chained yet :(", channel);
            return;
        }
        sys.sendHtmlMessage(src, helpers.bot(bots.roulette) + "Your longest chain was a length <b>" + roulette[lower].longestChain[0] + "</b> chain of <b>" + roulette[lower].longestChain[1] + "</b>.", channel);
    }
    
    ,
    
    eventflash: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase();
        if (!roulette[lower]) {
            roulette[lower] = {};
            roulette[lower].shinies = {};
            roulette[lower].chainLength = 1;
            roulette[lower].longestChain = [];
            roulette[lower].isChaining = false;
            roulette[lower].eventFlash = false;
            roulette[lower].shinyChance = 4096;
            helpers.saveData("roulette");
            sys.sendHtmlMessage(src, helpers.bot(bots.roulette) + "You turned event flashing on!", channel);
            return;
        }
        roulette[lower].eventFlash = (roulette[lower].eventFlash ? false : true);
        helpers.saveData("roulette");
        sys.sendHtmlMessage(src, helpers.bot(bots.roulette) + "You turned event flashing " + (roulette[lower].eventFlash ? "on" : "off") + "!", channel);
    }
};