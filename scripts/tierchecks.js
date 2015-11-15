/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY TIER CHECKS tierchecks.js
     - by Maribel Hearn, 2012-2015
    
    This file contains checks for specific
    tiers.
    ----------------------------------------------
*/
weatherlesscheck = function (src, team) {
    var tier = sys.tier(src, team),  hasweather = false, drizzle = sys.abilityNum("Drizzle"), drought = sys.abilityNum("Drought"), sandstorm = sys.abilityNum("Sand Stream"), hail = sys.abilityNum("Snow Warning");
    if (["Clear Skies", "Rain Dance", "Sunny Day", "Hail", "Sandstorm"].indexOf(tier) == -1) {
        return;
    }
    for (var s = 0; s < 6; s++) {
        if (sys.teamPokeAbility(src, team, s) == drizzle && tier != "Rain Dance") {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as it contains Drizzle.");
            hasweather = true;
            break;
        } else if (sys.teamPokeAbility(src, team, s) == drought && tier != "Sunny Day") {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as it contains Drought.");
            hasweather = true;
            break;
        } else if (sys.teamPokeAbility(src, team, s) == sandstorm && tier != "Sandstorm") {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as it contains Sand Stream.");
            hasweather = true;
            break;
        } else if (sys.teamPokeAbility(src, team, s) == hail && tier != "Hail") {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as it contains Snow Warning.");
            hasweather = true;
            break;
        }
    }
    if (hasweather) {
        sys.changeTier(src, team, "Challenge Cup");
    }
};
metronomecheck = function (src, team) {
    var tier = sys.tier(src, team), metronome = sys.moveNum("Metronome"), leppa = sys.itemNum("Leppa Berry"), move, move2, move3, move4, item, hp, atk, def, satk, sdef, spd, index = 0;
    if (tier != "Metronome") {
        return;
    }
    for (var s = 0; s < 6; s++) {
        move = sys.teamPokeMove(src, team, s, 0);move2 = sys.teamPokeMove(src, team, s, 1);move3 = sys.teamPokeMove(src, team, s, 2);
        move4 = sys.teamPokeMove(src, team, s, 3);item = sys.teamPokeItem(src, team, s);
        hp = sys.teamPokeEV(src, team, s, 0);atk = sys.teamPokeEV(src, team, s, 1);def = sys.teamPokeEV(src, team, s, 2);
        satk = sys.teamPokeEV(src, team, s, 3);sdef = sys.teamPokeEV(src, team, s, 4);spd = sys.teamPokeEV(src, team, s, 5);
        if (move != metronome) {
            sys.changePokeMove(src, team, s, 0, metronome);
        }
        if (move2 > 0) {
            sys.changePokeMove(src, team, s, 1, 0);
        }
        if (move3 > 0) {
            sys.changePokeMove(src, team, s, 2, 0);
        }
        if (move4 > 0) {
            sys.changePokeMove(src, team, s, 3, 0);
        }
        if (item != leppa) {
            sys.changePokeItem(src, team, s, leppa);
        }
        if (hp != 85 || atk != 85 || def != 85 || satk != 85 || sdef != 85 || spd != 85) {
            while (index < 6) {
                sys.changeTeamPokeEV(src, team, s, index, 85);
                index++;
            }
        }
    }
};
middlecupcheck = function (src, team) {
    var tier = sys.tier(src, team), middlefail = false, poke;
    if (tier != "Middle Cup") {
        return;
    }
    for (var s = 0; s < 6; s++) {
        poke = sys.pokemon(sys.teamPoke(src, team, s));
        if (!helpers.middlecup(poke)) {
            sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as not every Pokemon is in the middle of an evolution family.");
            middlefail = true;
            break;
        }
    }
    if (middlefail) {
        sys.changeTier(src, team, "Challenge Cup");
    }
};
monocolorcheck = function (src, team) {
    var tier = sys.tier(src, team), colourfail = false, poke, color;
    if (tier != "Monocolour") {
        return;
    }
    for (var s = 0; s < 6; s++) {
        poke = sys.pokemon(sys.teamPoke(src, team, s));
        if (s === 0) {
            color = helpers.colorcheck(poke);
        } else {
            if (helpers.colorcheck(poke) != color) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as not every Pokemon is of the same colour.");
                colourfail = true;
                break;
            }
        }
    }
    if (colourfail) {
        sys.changeTier(src, team, "Challenge Cup");
    }
};
monotypecheck = function (src, team) {
    var tier = sys.tier(src, team), typefail = false, pokenum, typecount = [], type1, type2, index = 0;
    if (tier != "Monotype") {
        return;
    }
    while (index < 19) {
        typecount[index] = 0;
        index++;
    }
    for (var s = 0; s < 6; s++) {
        pokenum = sys.teamPoke(src, team, s);
        type1 = sys.pokeType1(pokenum);
        type2 = sys.pokeType2(pokenum);
        typecount[type1]++;
        typecount[type2]++;
    }
    if (JSON.stringify(typecount).indexOf(6) == -1) {
        sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as not every Pokemon is of the same type.");
        typefail = true;
    }
    if (typefail) {
        sys.changeTier(src, team, "Challenge Cup");
    }
};
monospeciescheck = function (src, team) {
    var tier = sys.tier(src, team), speciesfail = false, pokenum;
    if (tier != "Monospecies") {
        return;
    }
    for (var s = 0; s < 6; s++) {
        if (s === 0) {
            pokenum = sys.teamPoke(src, team, s);
        } else {
            if (pokenum != sys.teamPoke(src, team, s)) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as not every Pokemon is of the same species.");
                speciesfail = true;
                break;
            }
        }
    }
    if (speciesfail) {
        sys.changeTier(src, team, "Challenge Cup");
    }
};
monogencheck = function (src, team) {
    var tier = sys.tier(src, team), genfail = false, gen;
    if (tier != "Monogen") {
        return;
    }
    for (var s = 0; s < 6; s++) {
        if (s === 0) {
            gen = helpers.gen(sys.teamPoke(src, team, s));
        } else {
            if (gen != helpers.gen(sys.teamPoke(src, team, s))) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as not every Pokemon is of the same gen.");
                genfail = true;
                break;
            }
        }
    }
    if (genfail) {
        sys.changeTier(src, team, "Challenge Cup");
    }
};
monolettercheck = function (src, team) {
    var tier = sys.tier(src, team), letterfail = false, letter;
    if (tier != "Monoletter") {
        return;
    }
    for (var s = 0; s < 6; s++) {
        if (s === 0) {
            letter = sys.pokemon(sys.teamPoke(src, team, s)).charAt(0);
        } else {
            if (letter != sys.pokemon(sys.teamPoke(src, team, s)).charAt(0)) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as not every Pokemon name starts with the same letter.");
                letterfail = true;
                break;
            }
        }
    }
    if (letterfail) {
        sys.changeTier(src, team, "Challenge Cup");
    }
};