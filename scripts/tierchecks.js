/*
    ----------------------------------------------
    FUN COMMUNITY TIER CHECKS tierchecks.js
     - by Maribel Hearn, 2012-2021

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
        move = sys.teamPokeMove(src, team, s, 0); move2 = sys.teamPokeMove(src, team, s, 1); move3 = sys.teamPokeMove(src, team, s, 2);
        move4 = sys.teamPokeMove(src, team, s, 3); item = sys.teamPokeItem(src, team, s);
        hp = sys.teamPokeEV(src, team, s, 0); atk = sys.teamPokeEV(src, team, s, 1); def = sys.teamPokeEV(src, team, s, 2);
        satk = sys.teamPokeEV(src, team, s, 3); sdef = sys.teamPokeEV(src, team, s, 4); spd = sys.teamPokeEV(src, team, s, 5);
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

function middlecup(poke) {
    var MIDDLE_CUP_POKEMON = "Bayleef, Boldore, Cascoon, Chansey, Charmeleon, Clefairy, Combusken, Croconaw, Dewott, Dragonair, Duosion, Dusclops, Eelektrik, Electabuzz, Flaaffy, " +
    "Fraxure, Gabite, Gloom, Golbat, Gothorita, Graveler, Grotle, Grovyle, Gurdurr, Haunter, Herdier, Ivysaur, Jigglypuff, Kadabra, Kakuna, Kirlia, Klang, Krokorok, Lairon, " +
    "Lampent, Lombre, Loudred, Luxio, Machoke, Magmar, Magneton, Marill, Marshtomp, Metang, Metapod, Monferno, Nidorina, Nidorino, Nuzleaf, Palpitoad, Pidgeotto, Pignite, " +
    "Pikachu, Piloswine, Poliwhirl, Porygon2, Prinplup, Pupitar, Quilava, Rhydon, Roselia, Seadra, Sealeo, Servine, Shelgon, Silcoon, Skiploom, Staravia, Swadloon, Togetic, " +
    "Tranquill, Vanillish, Vibrava, Vigoroth, Wartortle, Weepinbell, Whirlipede, Zweilous";
    MIDDLE_CUP_POKEMON = MIDDLE_CUP_POKEMON.split(", ");
    for (var index in MIDDLE_CUP_POKEMON) {
        if (MIDDLE_CUP_POKEMON[index] == poke) {
            return true;
        }
    }
    return false;
}

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

function colorcheck(poke) {
    POKEMON_COLORS = {
        RED: ['Charmander', 'Charmeleon', 'Charizard', 'Vileplume', 'Paras', 'Parasect', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Goldeen', 'Seaking', 'Jynx', 'Magikarp',
        'Magmar', 'Flareon', 'Ledyba', 'Ledian', 'Ariados', 'Yanma', 'Scizor', 'Slugma', 'Magcargo', 'Octillery', 'Delibird', 'Porygon2', 'Magby', 'Ho-Oh', 'Torchic', 'Combusken',
        'Blaziken', 'Wurmple', 'Medicham', 'Carvanha', 'Camerupt', 'Solrock', 'Corphish', 'Crawdaunt', 'Latias', 'Groudon', 'Deoxys', 'Deoxys-A', 'Deoxys-D', 'Deoxys-S',
        'Kricketot', 'Kricketune', 'Magmortar', 'Porygon-Z', 'Rotom', 'Rotom-H', 'Rotom-F', 'Rotom-W', 'Rotom-C', 'Rotom-S', 'Tepig', 'Pignite', 'Emboar', 'Pansear', 'Simisear',
        'Throh', 'Venipede', 'Scolipede', 'Krookodile', 'Darumaka', 'Darmanitan', 'Dwebble', 'Crustle', 'Scrafty', 'Shelmet', 'Accelgor', 'Druddigon', 'Pawniard', 'Bisharp',
        'Braviary', 'Heatmor'],
        BLUE: ['Squirtle', 'Wartortle', 'Blastoise', 'Nidoran?', 'Nidorina', 'Nidoqueen', 'Oddish', 'Gloom', 'Golduck', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Tentacool',
        'Tentacruel', 'Tangela', 'Horsea', 'Seadra', 'Gyarados', 'Lapras', 'Vaporeon', 'Omanyte', 'Omastar', 'Articuno', 'Dratini', 'Dragonair', 'Totodile', 'Croconaw',
        'Feraligatr', 'Chinchou', 'Lanturn', 'Marill', 'Azumarill', 'Jumpluff', 'Wooper', 'Quagsire', 'Wobbuffet', 'Heracross', 'Kingdra', 'Phanpy', 'Suicune', 'Mudkip',
        'Marshtomp', 'Swampert', 'Taillow', 'Swellow', 'Surskit', 'Masquerain', 'Loudred', 'Exploud', 'Azurill', 'Meditite', 'Sharpedo', 'Wailmer', 'Wailord', 'Swablu', 'Altaria',
        'Whiscash', 'Chimecho', 'Wynaut', 'Spheal', 'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Bagon', 'Salamence', 'Beldum', 'Metang', 'Metagross', 'Regice', 'Latios',
        'Kyogre', 'Piplup', 'Prinplup', 'Empoleon', 'Shinx', 'Luxio', 'Luxray', 'Cranidos', 'Rampardos', 'Gible', 'Gabite', 'Garchomp', 'Riolu', 'Lucario', 'Croagunk',
        'Toxicroak', 'Finneon', 'Lumineon', 'Mantyke', 'Tangrowth', 'Glaceon', 'Azelf', 'Phione', 'Manaphy', 'Oshawott', 'Dewott', 'Samurott', 'Panpour', 'Simipour', 'Roggenrola',
        'Boldore', 'Gigalith', 'Woobat', 'Swoobat', 'Tympole', 'Palpitoad', 'Seismitoad', 'Sawk', 'Tirtouga', 'Carracosta', 'Ducklett', 'Karrablast', 'Eelektrik', 'Eelektross',
        'Elgyem', 'Cryogonal', 'Deino', 'Zweilous', 'Hydreigon', 'Cobalion', 'Thundurus'],
        GREEN: ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Caterpie', 'Metapod', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Scyther', 'Chikorita', 'Bayleef', 'Meganium', 'Spinarak',
        'Natu', 'Xatu', 'Bellossom', 'Politoed', 'Skiploom', 'Larvitar', 'Tyranitar', 'Celebi', 'Treecko', 'Grovyle', 'Sceptile', 'Dustox', 'Lotad', 'Lombre', 'Ludicolo',
        'Breloom', 'Electrike', 'Roselia', 'Gulpin', 'Vibrava', 'Flygon', 'Cacnea', 'Cacturne', 'Cradily', 'Kecleon', 'Tropius', 'Rayquaza', 'Turtwig', 'Grotle', 'Torterra',
        'Budew', 'Roserade', 'Bronzor', 'Bronzong', 'Carnivine', 'Yanmega', 'Leafeon', 'Shaymin', 'Shaymin-S', 'Snivy', 'Servine', 'Serperior', 'Pansage', 'Simisage', 'Swadloon',
        'Cottonee', 'Whimsicott', 'Petilil', 'Lilligant', 'Basculin', 'Maractus', 'Trubbish', 'Garbodor', 'Solosis', 'Duosion', 'Reuniclus', 'Axew', 'Fraxure', 'Golett',
        'Golurk', 'Virizion', 'Tornadus'],
        YELLOW: ['Kakuna', 'Beedrill', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Ninetales', 'Meowth', 'Persian', 'Psyduck', 'Ponyta', 'Rapidash', 'Drowzee', 'Hypno',
        'Exeggutor', 'Electabuzz', 'Jolteon', 'Zapdos', 'Moltres', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Pichu', 'Ampharos', 'Sunkern', 'Sunflora', 'Girafarig', 'Dunsparce',
        'Shuckle', 'Elekid', 'Raikou', 'Beautifly', 'Pelipper', 'Ninjask', 'Makuhita', 'Manectric', 'Plusle', 'Minun', 'Numel', 'Lunatone', 'Jirachi', 'Mothim', 'Combee',
        'Vespiquen', 'Chingling', 'Electivire', 'Uxie', 'Cresselia', 'Victini', 'Sewaddle', 'Leavanny', 'Scraggy', 'Cofagrigus', 'Archen', 'Archeops', 'Deerling', 'Joltik',
        'Galvantula', 'Haxorus', 'Mienfoo', 'Keldeo'],
        PURPLE: ['Rattata', 'Ekans', 'Arbok', 'Nidoran?', 'Nidorino', 'Nidoking', 'Zubat', 'Golbat', 'Venonat', 'Venomoth', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly',
        'Haunter', 'Gengar', 'Koffing', 'Weezing', 'Starmie', 'Ditto', 'Aerodactyl', 'Mewtwo', 'Crobat', 'Aipom', 'Espeon', 'Misdreavus', 'Forretress', 'Gligar', 'Granbull',
        'Mantine', 'Tyrogue', 'Cascoon', 'Delcatty', 'Sableye', 'Illumise', 'Swalot', 'Grumpig', 'Lileep', 'Shellos', 'Gastrodon', 'Ambipom', 'Drifloon', 'Drifblim', 'Mismagius',
        'Stunky', 'Skuntank', 'Spiritomb', 'Skorupi', 'Drapion', 'Gliscor', 'Palkia', 'Purrloin', 'Liepard', 'Gothita', 'Gothorita', 'Gothitelle', 'Mienshao', 'Genesect'],
        PINK: ['Clefairy', 'Clefable', 'Jigglypuff', 'Wigglytuff', 'Slowpoke', 'Slowbro', 'Exeggcute', 'Lickitung', 'Chansey', 'Mr. Mime', 'Porygon', 'Mew', 'Cleffa', 'Igglybuff',
        'Flaaffy', 'Hoppip', 'Slowking', 'Snubbull', 'Corsola', 'Smoochum', 'Miltank', 'Blissey', 'Whismur', 'Skitty', 'Milotic', 'Gorebyss', 'Luvdisc', 'Cherubi', 'Cherrim',
        'Mime Jr.', 'Happiny', 'Lickilicky', 'Mesprit', 'Munna', 'Musharna', 'Audino', 'Alomomola'],
        BROWN: ['Weedle', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Raticate', 'Spearow', 'Fearow', 'Vulpix', 'Diglett', 'Dugtrio', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Abra',
        'Kadabra', 'Alakazam', 'Geodude', 'Graveler', 'Golem', 'Farfetch\'d', 'Doduo', 'Dodrio', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Kangaskhan', 'Staryu', 'Pinsir',
        'Tauros', 'Eevee', 'Kabuto', 'Kabutops', 'Dragonite', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Sudowoodo', 'Teddiursa', 'Ursaring', 'Swinub', 'Piloswine', 'Stantler',
        'Hitmontop', 'Entei', 'Zigzagoon', 'Seedot', 'Nuzleaf', 'Shiftry', 'Shroomish', 'Slakoth', 'Slaking', 'Shedinja', 'Hariyama', 'Torkoal', 'Spinda', 'Trapinch', 'Baltoy',
        'Feebas', 'Regirock', 'Chimchar', 'Monferno', 'Infernape', 'Starly', 'Staravia', 'Staraptor', 'Bidoof', 'Bibarel', 'Buizel', 'Floatzel', 'Buneary', 'Lopunny', 'Bonsly',
        'Hippopotas', 'Hippowdon', 'Mamoswine', 'Heatran', 'Patrat', 'Watchog', 'Lillipup', 'Conkeldurr', 'Sandile', 'Krokorok', 'Sawsbuck', 'Beheeyem', 'Stunfisk', 'Bouffalant',
        'Vullaby', 'Mandibuzz', 'Landorus'],
        BLACK: ['Snorlax', 'Umbreon', 'Murkrow', 'Unown', 'Sneasel', 'Houndour', 'Houndoom', 'Mawile', 'Spoink', 'Seviper', 'Claydol', 'Shuppet', 'Banette', 'Duskull', 'Dusclops',
        'Honchkrow', 'Chatot', 'Munchlax', 'Weavile', 'Dusknoir', 'Giratina', 'Darkrai', 'Blitzle', 'Zebstrika', 'Sigilyph', 'Yamask', 'Chandelure', 'Zekrom'],
        GRAY: ['Machop', 'Machoke', 'Machamp', 'Magnemite', 'Magneton', 'Onix', 'Rhyhorn', 'Rhydon', 'Pineco', 'Steelix', 'Qwilfish', 'Remoraid', 'Skarmory', 'Donphan', 'Pupitar',
        'Poochyena', 'Mightyena', 'Nincada', 'Nosepass', 'Aron', 'Lairon', 'Aggron', 'Volbeat', 'Barboach', 'Anorith', 'Armaldo', 'Snorunt', 'Glalie', 'Relicanth', 'Registeel',
        'Shieldon', 'Bastiodon', 'Burmy', 'Wormadam', 'Wormadam-G', 'Wormadam-S', 'Glameow', 'Purugly', 'Magnezone', 'Rhyperior', 'Probopass', 'Arceus', 'Herdier', 'Stoutland',
        'Pidove', 'Tranquill', 'Unfezant', 'Drilbur', 'Excadrill', 'Timburr', 'Gurdurr', 'Whirlipede', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino', 'Escavalier', 'Ferroseed',
        'Ferrothorn', 'Klink', 'Klang', 'Klinklang', 'Durant', 'Terrakion', 'Kyurem'],
        WHITE: ['Butterfree', 'Seel', 'Dewgong', 'Togepi', 'Togetic', 'Mareep', 'Smeargle', 'Lugia', 'Linoone', 'Silcoon', 'Wingull', 'Ralts', 'Kirlia', 'Gardevoir', 'Vigoroth',
        'Zangoose', 'Castform', 'Absol', 'Shelgon', 'Pachirisu', 'Snover', 'Abomasnow', 'Togekiss', 'Gallade', 'Froslass', 'Dialga', 'Regigigas', 'Swanna', 'Vanillite',
        'Vanillish', 'Vanilluxe', 'Emolga', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent', 'Tynamo', 'Litwick', 'Lampent', 'Cubchoo', 'Beartic', 'Rufflet', 'Larvesta',
        'Volcarona', 'Reshiram', 'Meloetta', 'Meloetta-S']
    };
    for (var index in POKEMON_COLORS.RED) {
        if (POKEMON_COLORS.RED[index] == poke) {
            return "red";
        }
    }
    for (var index2 in POKEMON_COLORS.BLUE) {
        if (POKEMON_COLORS.BLUE[index2] == poke) {
            return "blue";
        }
    }
    for (var index3 in POKEMON_COLORS.GREEBN) {
        if (POKEMON_COLORS.GREEN[index3] == poke) {
            return "green";
        }
    }
    for (var index4 in POKEMON_COLORS.YELLOW) {
        if (POKEMON_COLORS.YELLOW[index4] == poke) {
            return "yellow";
        }
    }
    for (var index5 in POKEMON_COLORS.WHITE) {
        if (POKEMON_COLORS.WHITE[index5] == poke) {
            return "white";
        }
    }
    for (var index6 in POKEMON_COLORS.GRAY) {
        if (POKEMON_COLORS.GRAY[index6] == poke) {
            return "gray";
        }
    }
    for (var index7 in POKEMON_COLORS.BLACK) {
        if (POKEMON_COLORS.BLACK[index7] == poke) {
            return "black";
        }
    }
    for (var index8 in POKEMON_COLORS.PINK) {
        if (POKEMON_COLORS.PINK[index8] == poke) {
            return "pink";
        }
    }
    for (var index9 in POKEMON_COLORS.PURPLE) {
        if (POKEMON_COLORS.PURPLE[index9] == poke) {
            return "purple";
        }
    }
    for (var index10 in POKEMON_COLORS.BROWN) {
        if (POKEMON_COLORS.BROWN[index10] == poke) {
            return "brown";
        }
    }
}

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
