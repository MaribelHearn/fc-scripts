/*
    ----------------------------------------------
    FUN COMMUNITY TIER CHECKS tierchecks.js
     - by Maribel Hearn, 2012-2021

    This file contains checks for specific
    tiers.
    ----------------------------------------------
*/
function isMiddle(poke) {
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

function colorCheck(poke) {
    var POKEMON_COLORS = {
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

function pokeGen(pokeNum) {
    var NUMBER_OF_GENS = 6;
    var NUMBER_OF_POKEMON_GEN = [151, 251, 386, 493, 649, 718];

    for (var i = 0; i < NUMBER_OF_GENS; i++) {
        if (pokeNum < NUMBER_OF_POKEMON_GEN[i]) {
            return i + 1;
        }
    }

    return 0;
}

module.exports = {
    // TODO ban use of weather setting moves
    weatherless: function (src, team, tier) {
        var hasIllegalWeather = false;
        var drizzle = sys.abilityNum("Drizzle");
        var drought = sys.abilityNum("Drought");
        var sandstorm = sys.abilityNum("Sand Stream");
        var hail = sys.abilityNum("Snow Warning");

        for (var slot = 0; slot < 6; slot++) {
            if (sys.teamPokeAbility(src, team, slot) == drizzle && tier != "Rain Dance") {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as it contains Drizzle.");
                hasIllegalWeather = true;
                break;
            } else if (sys.teamPokeAbility(src, team, slot) == drought && tier != "Sunny Day") {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as it contains Drought.");
                hasIllegalWeather = true;
                break;
            } else if (sys.teamPokeAbility(src, team, slot) == sandstorm && tier != "Sandstorm") {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as it contains Sand Stream.");
                hasIllegalWeather = true;
                break;
            } else if (sys.teamPokeAbility(src, team, slot) == hail && tier != "Hail") {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for " + tier + " as it contains Snow Warning.");
                hasIllegalWeather = true;
                break;
            }
        }

        if (hasIllegalWeather) {
            sys.changeTier(src, team, "Challenge Cup");
            sys.stopEvent();
        }
    },

    metronome: function (src, team) {
        var metronome = sys.moveNum("Metronome");
        var leppa = sys.itemNum("Leppa Berry");

        for (var slot = 0; slot < 6; slot++) {
            sys.changePokeMove(src, team, slot, 0, metronome);
            sys.changePokeMove(src, team, slot, 1, 0);
            sys.changePokeMove(src, team, slot, 2, 0);
            sys.changePokeMove(src, team, slot, 3, 0);
            sys.changePokeItem(src, team, slot, leppa);

            for (var stat = 0; stat < 6; stat++) {
                sys.changeTeamPokeEV(src, team, slot, stat, 85);
            }
        }
    },

    middleCup: function (src, team) {
        var poke;

        for (var slot = 0; slot < 6; slot++) {
            poke = sys.pokemon(sys.teamPoke(src, team, slot));

            if (!isMiddle(poke)) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for Middle Cup as not every Pokemon is in the middle of an evolution family.");
                sys.changeTier(src, team, "Challenge Cup");
                sys.stopEvent();
                return;
            }
        }
    },

    monoColor: function (src, team) {
        var poke, color;

        for (var slot = 0; slot < 6; slot++) {
            poke = sys.pokemon(sys.teamPoke(src, team, slot));

            if (slot === 0) {
                color = colorCheck(poke);
            } else if (colorCheck(poke) != color) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for Monocolour as not every Pokemon is of the same colour.");
                sys.changeTier(src, team, "Challenge Cup");
                sys.stopEvent();
                return;
            }
        }
    },

    monoType: function (src, team) {
        var pokeNum, types;

        for (var slot = 0; slot < 6; slot++) {
            pokeNum = sys.teamPoke(src, team, slot);

            if (slot > 0 && types.indexOf(sys.pokeType1(pokeNum)) == -1) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for Monotype as not every Pokemon is of the same type.");
                sys.changeTier(src, team, "Challenge Cup");
                sys.stopEvent();
                return;
            }
            types = [sys.pokeType1(pokeNum), sys.pokeType2(pokeNum)];
        }
    },

    monoSpecies: function (src, team) {
        var pokeNum;

        for (var slot = 0; slot < 6; slot++) {
            if (slot === 0) {
                pokeNum = sys.teamPoke(src, team, slot);
            } else if (pokeNum != sys.teamPoke(src, team, slot)) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for Monospecies as not every Pokemon is of the same species.");
                sys.changeTier(src, team, "Challenge Cup");
                sys.stopEvent();
                return;
            }
        }
    },

    monoGen: function (src, team) {
        var gen;

        for (var slot = 0; slot < 6; slot++) {
            if (slot === 0) {
                gen = pokeGen(sys.teamPoke(src, team, slot));
            } else if (gen != pokeGen(sys.teamPoke(src, team, slot))) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for Monogen as not every Pokemon is of the same gen.");
                sys.changeTier(src, team, "Challenge Cup");
                sys.stopEvent();
                return;
            }
        }
    },

    monoLetter: function (src, team) {
        var letter;

        for (var slot = 0; slot < 6; slot++) {
            if (slot === 0) {
                letter = sys.pokemon(sys.teamPoke(src, team, slot)).charAt(0);
            } else if (letter != sys.pokemon(sys.teamPoke(src, team, slot)).charAt(0)) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for Monoletter as not every Pokemon name starts with the same letter.");
                sys.changeTier(src, team, "Challenge Cup");
                sys.stopEvent();
                return;
            }
        }
    },

    zuSpecies: function (src, team) {
        var speciesList = [];
        var species;

        for (var slot = 0; slot < 6; slot++) {
            species = sys.pokemon(sys.teamPoke(src, team, slot));
            if (speciesList.contains(species)) {
                sys.sendHtmlMessage(src, helpers.bot(bots.tour) + "Your team is invalid for Fundex ZU as it contains the same species twice.");
                sys.changeTier(src, team, "Challenge Cup");
                sys.stopEvent();
                return;
            }
            speciesList.push(species);
        }
    }
};