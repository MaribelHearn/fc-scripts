/*
    ----------------------------------------------
    FUN COMMUNITY POKEDEX METHODS dex.js
     - by Maribel Hearn, 2023-2023

    This file contains Pokedex-related
    data and methods to return Pokemon info.
    ----------------------------------------------
*/
var heightData = {};
var weightData = {};
var movepoolData = {};
var moveData = {
    "power": {},
    "category": {},
    "accuracy": {},
    "pp": {},
    "effect": {},
    "flags": {},
    "priority": {},
    "range": {}
};
var abilityData = {};
var pokemonAbilityData = {};
var itemData = {
    "text": {},
    "power": {}
};
var berryData = {
    "text": {},
    "power": {},
    "type": {}
};

// Private functions
function readHeightData() {
    var data = sys.read("db/pokes/height.txt").split('\n');
    var index, id, height;
    for (var i = 0; i < data.length; i++) {
        index = data[i].indexOf(' ');
        id = data[i].substr(0, index);
        height = data[i].substr(index + 1);
        heightData[id] = height;
    }
}

function readWeightData() {
    var data = sys.read("db/pokes/weight.txt").split('\n');
    var index, id, weight;
    for (var i = 0; i < data.length; i++) {
        index = data[i].indexOf(' ');
        id = data[i].substr(0, index);
        weight = data[i].substr(index + 1);
        weightData[id] = weight;
    }
}

function readMovepoolData() {
    var data = sys.read("db/pokes/7G/all_moves.txt").split('\n');
    var index, id, movepool;
    for (var i = 0; i < data.length; i++) {
        index = data[i].indexOf(' ');
        id = data[i].substr(0, index);
        movepool = data[i].substr(index + 1).trim().split(' ');
        for (var j in movepool) {
            movepool[j] = sys.move(movepool[j]);
        }
        movepoolData[id] = movepool;
    }
}

function readFundexMovepools() {
    var data = sys.read("db/pokes/5G/all_moves.txt").split('\n');
    var index, id, movepool;
    for (var i = 0; i < data.length; i++) {
        index = data[i].indexOf(' ');
        id = data[i].substr(0, index);
        if (parseInt(id.split(':')[0]) < 1000) {
            continue;
        }
        movepool = data[i].substr(index + 1).trim().split(' ');
        for (var j in movepool) {
            movepool[j] = sys.move(movepool[j]);
        }
        movepoolData[id] = movepool;
    }
}

function readMoveData(file) {
    var data = sys.read("db/moves/7G/" + file + ".txt").split('\n');
    var key = (file == "damage_class" ? "category" : file);
    var index, id, entry;
    for (var i = 0; i < data.length; i++) {
        index = data[i].indexOf(' ');
        id = data[i].substr(0, index);
        entry = data[i].substr(index + 1);
        moveData[key][id] = entry;
    }
}

function readAbilityData() {
    var data = sys.read("db/abilities/ability_battledesc.txt").split('\n');
    var index, id, ability;
    for (var i = 0; i < data.length; i++) {
        index = data[i].indexOf(' ');
        id = data[i].substr(0, index);
        ability = data[i].substr(index + 1);
        abilityData[id] = ability.replace(/\r/g, "");
    }
}

function readPokemonAbilityData() {
    var data, index, pokeNum, pokemon, abilityId;
    for (var i = 1; i < 4; i++) {
        data = sys.read("db/pokes/7G/ability" + i + ".txt").trim().split('\n');
        for (var line in data) {
            index = data[line].split(' ');
            pokeNum = index[0].split(':')[0];
            pokemon = sys.pokemon(pokeNum);
            abilityId = index[1].trim();
            if (!pokemonAbilityData.hasOwnProperty(abilityId)) {
                pokemonAbilityData[abilityId] = [];
            }
            pokemonAbilityData[abilityId].push(pokemon);
        }
    }
}

function readItemTexts(itemType) {
    var data = sys.read("db/items/" + itemType + "_description.txt").split('\n');
    var index, id, power;
    for (var i = 0; i < data.length; i++) {
        index = data[i].indexOf(' ');
        id = data[i].substr(0, index);
        power = data[i].substr(index + 1);
        if (itemType == "items") {
            itemData.text[id] = power;
        } else {
            berryData.text[id] = power;
        }
    }
}

function readItemPowers(itemType) {
    var data = sys.read("db/items/" + itemType + "_pow.txt").split('\n');
    var index, id, power;
    for (var i = 0; i < data.length; i++) {
        index = data[i].indexOf(' ');
        id = data[i].substr(0, index);
        power = data[i].substr(index + 1);
        if (itemType == "items") {
            itemData.power[id] = power;
        } else {
            berryData.power[id] = parseInt(power) + 20;
        }
    }
}

function readBerryTypes() {
    var data = sys.read("db/items/berry_type.txt").split('\n');
    var index, id, type;
    for (var i = 0; i < data.length; i++) {
        index = data[i].indexOf(' ');
        id = data[i].substr(0, index);
        type = data[i].substr(index + 1);
        berryData.type[id] = type;
    }
}

// Public functions
function calcHP(base, IV, EV) {
    if (base == 1) {
        return 1;
    }
    return Math.floor((IV + (2 * base) + Math.floor(EV / 4) + 100) + 10);
}

function calcStat(stat, base, IV, EV, nature) {
    if (stat == '0') {
        return calcHP(base, IV, EV);
    }
    return Math.floor(Math.floor((IV + (2 * base) + Math.floor(EV / 4)) * 100 / 100 + 5) * nature);
}

function statName(stat) {
    return([
        "HP",
        "Attack",
        "Defense",
        "Sp. Atk.",
        "Sp. Def.",
        "Speed"
    ][stat]);
}

function colorStat(stat) {
    if (stat <= 30) {
        return "<b><font color='#8B0000'>" + stat + "</font></b>";
    } else if (stat < 60) {
        return "<b><font color='#FF0000'>" + stat + "</font></b>";
    } else if (stat < 90) {
        return "<b><font color='#FF4500'>" + stat + "</font></b>";
    } else if (stat < 120) {
        return "<b><font color='#00FF00'>" + stat + "</font></b>";
    } else if (stat < 150) {
        return "<b><font color='#008000'>" + stat + "</font></b>";
    } else if (stat < 180) {
        return "<b><font color='#0000FF'>" + stat + "</font></b>";
    } else {
        return "<b><font color='#00008B'>" + stat + "</font></b>";
    }
}

function displayNum(pokeId) {
    var id = pokeId % 65536, forme = (pokeId - id) / 65536;
    return forme === 0 ? id : id + '-' + forme;
}

function getDbIndex(pokeId) {
    var id = pokeId % 65536, forme = (pokeId - id) / 65536;
    return id + ':' + forme;
}

function height(pokeId) {
    if (Object.keys(heightData).length === 0) {
        readHeightData();
    }
    var key = getDbIndex(pokeId);
    if (heightData[key]) {
        return heightData[key].trim();
    }
    index = key.indexOf(':') + 1;
    var base = key.substring(0, index);
    return heightData[base + '0'].trim();
}

function weight(pokeId) {
    if (Object.keys(weightData).length === 0) {
        readWeightData();
    }
    var key = getDbIndex(pokeId);
    if (weightData[key]) {
        return weightData[key];
    }
    index = key.indexOf(':') + 1;
    var base = key.substring(0, index);
    return weightData[base + '0'];
}

function movepool(pokeId) {
    var index;
    if (Object.keys(movepoolData).length === 0) {
        readMovepoolData();
    }
    var isFundex = (pokeId > 999 && pokeId < 1200 || pokeId > 66536);
    if (isFundex && Object.keys(movepoolData).length <= 845) {
        readFundexMovepools();
    }
    var key = getDbIndex(pokeId);
    if (movepoolData[key] !== undefined) {
        return movepoolData[key];
    }
    index = key.indexOf(':') + 1;
    var base = key.substring(0, index);
    return movepoolData[base];
}

function weightPower(weight) {
    var power;
    if (weight < 10) {
        power = 20;
    } else if (weight >= 10 && weight < 25) {
        power = 40;
    } else if (weight >= 25 && weight < 50) {
        power = 60;
    } else if (weight >= 50 && weight < 100) {
        power = 80;
    } else if (weight >= 100 && weight < 200) {
        power = 100;
    } else { // weight >= 200
        power = 120;
    }
    return power;
}

function movePower(moveId) {
    if (Object.keys(moveData.power).length === 0) {
        readMoveData("power");
    }
    if (moveData.power[moveId] === undefined || moveData.power[moveId] == '1') {
        return '-';
    }
    return moveData.power[moveId];
}

function moveCategory(moveId) {
    if (Object.keys(moveData.category).length === 0) {
        readMoveData("damage_class");
    }
    if (moveData.category[moveId] == 1) {
        return "<font color='#800000'>Physical</font>";
    }
    if (moveData.category[moveId] == 2) {
        return "<font color='#FF69B4'>Special</font>";
    }
    return "<font color='#2E8B57'>Other</font>";
}

function moveAccuracy(moveId) {
    if (Object.keys(moveData.accuracy).length === 0) {
        readMoveData("accuracy");
    }
    if (moveData.accuracy[moveId] == 101) {
        return '-';
    }
    return moveData.accuracy[moveId];
}

function movePP(moveId) {
    if (Object.keys(moveData.pp).length === 0) {
        readMoveData("pp");
    }
    return [moveData.pp[moveId], moveData.pp[moveId] * 8 / 5];
}

function moveEffect(moveId) {
    if (Object.keys(moveData.effect).length === 0) {
        readMoveData("effect");
    }
    if (moveData.effect[moveId] === undefined) {
        return "Deals normal damage.";
    }
    return moveData.effect[moveId].replace(/[[\]{}]/g, "");
}

function moveContact(moveId) {
    if (Object.keys(moveData.flags).length === 0) {
        readMoveData("flags");
    }
    return (moveData.flags[moveId] % 2 === 1) ? "<font color='#008000'>Yes</font>" : "<font color='#FF0000'>No</font>";
}

function movePriority(moveId) {
    if (Object.keys(moveData.priority).length === 0) {
        readMoveData("priority");
    }
    if (moveData.priority[moveId] === undefined) {
        return 0;
    }
    return moveData.priority[moveId];
}

function moveRange(moveId) {
    if (Object.keys(moveData.range).length === 0) {
        readMoveData("range");
    }
    if (moveData.range[moveId] === undefined) {
        return "Single Target";
    }
    return moveRangeToText(parseInt(moveData.range[moveId]));
}

function moveRangeToText(moveRange) {
    switch (moveRange) {
        case 2:
            return "Ally";
        case 4:
            return "All But Self";
        case 5:
            return "Adjacent Foes";
        case 6:
            return "User's Team";
        case 7:
            return "Self";
        case 8:
            return "All";
        case 9:
            return "Random";
        case 10:
            return "Field";
        case 11:
            return "All Foes";
        case 12:
            return "All Allies";
        case 13:
            return "Special";
        default:
            return "Single Target";
    }
}

function ability(abilityId) {
    if (Object.keys(abilityData).length === 0) {
        readAbilityData();
    }
    return abilityData[abilityId];
}

function pokemonWithAbility(abilityId) {
    if (Object.keys(pokemonAbilityData).length === 0) {
        readPokemonAbilityData();
    }
    return pokemonAbilityData[abilityId];
}

function getItem(itemId) {
    if (Object.keys(itemData.text).length === 0) {
        readItemTexts("items");
    }
    return itemData.text[itemId];
}

function getBerry(berryId) {
    if (Object.keys(berryData.text).length === 0) {
        readItemTexts("berries");
    }
    return berryData.text[berryId];
}

function getFlingPower(itemId) {
    if (Object.keys(itemData.power).length === 0) {
        readItemPowers("items");
    }
    return itemData.power[itemId];
}

function getBerryPower(berryId) {
    if (Object.keys(berryData.power).length === 0) {
        readItemPowers("berry");
    }
    return berryData.power[berryId];
}

function getBerryType(berryId) {
    if (Object.keys(berryData.type).length === 0) {
        readBerryTypes();
    }
    return berryData.type[berryId].trim();
}

module.exports = {
    calcHP: function (base, IV, EV) {
        return calcHP(base, IV, EV);
    },

    calcStat: function (stat, base, IV, EV, nature) {
        return calcStat(stat, base, IV, EV, nature);
    },

    statName: function (stat) {
        return statName(stat);
    },

    colorStat: function (stat) {
        return colorStat(stat);
    },

    displayNum: function (pokeId) {
        return displayNum(pokeId);
    },

    getDbIndex: function (pokeId) {
        return getDbIndex(pokeId);
    },

    height: function (pokeId) {
        return height(pokeId);
    },

    weight: function (pokeId) {
        return weight(pokeId);
    },

    movepool: function (pokeId) {
        return movepool(pokeId);
    },

    weightPower: function (weight) {
        return weightPower(weight);
    },

    movePower: function (moveId) {
        return movePower(moveId);
    },

    moveCategory: function (moveId) {
        return moveCategory(moveId);
    },

    moveAccuracy: function (moveId) {
        return moveAccuracy(moveId);
    },

    movePP: function (moveId) {
        return movePP(moveId);
    },

    moveEffect: function (moveId) {
        return moveEffect(moveId);
    },

    moveContact: function (moveId) {
        return moveContact(moveId);
    },

    movePriority: function (moveId) {
        return movePriority(moveId);
    },

    moveRange: function (moveId) {
        return moveRange(moveId);
    },

    moveRangeToText: function (moveRange) {
        return moveRangeToText(moveRange);
    },

    ability: function (abilityId) {
        return ability(abilityId);
    },

    pokemonWithAbility: function (abilityId) {
        return pokemonWithAbility(abilityId);
    },

    getItem: function (itemId) {
        return getItem(itemId);
    },

    getBerry: function (berryId) {
        return getBerry(berryId);
    },

    getFlingPower: function (itemId) {
        return getFlingPower(itemId);
    },

    getBerryPower: function (berryId) {
        return getBerryPower(berryId);
    },

    getBerryType: function (berryId) {
        return getBerryType(berryId);
    }
};
