/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY SAFARI safari.js
     - by Maribel Hearn, 2015-2021

    This file contains the scripts necessary
    for Safari, a game based on the in-game
    Safari Zone in which you try to catch as
    many Pokemon as possible.
    ----------------------------------------------
*/
var CATCH_RATES = [0, 45, 45, 45, 45, 45, 45, 45, 45, 45, 255, 120, 45, 255, 120, 45, 255, 120, 45, 255, 127, 255, 90, 255, 90,
190, 75, 255, 90, 235, 120, 45, 235, 120, 45, 150, 25, 190, 75, 170, 50, 255, 90, 255, 120, 45, 190, 75, 190, 75, 255, 50,
255, 90, 190, 75, 190, 75, 190, 75, 255, 120, 45, 200, 100, 50, 180, 90, 45, 255, 120, 45, 190, 60, 255, 120, 45, 190, 60,
190, 75, 190, 60, 45, 190, 45, 190, 75, 190, 75, 190, 60, 190, 90, 45, 45, 190, 75, 225, 60, 190, 60, 90, 45, 190, 75, 45,
45, 45, 190, 60, 120, 60, 30, 45, 45, 225, 75, 225, 60, 225, 60, 45, 45, 45, 45, 45, 45, 45, 255, 45, 45, 35, 45, 45, 45,
45, 45, 45, 45, 45, 45, 45, 25, 3, 3, 3, 45, 45, 45, 3, 45];

var STARTER_POKEMON = ["Bulbasaur", "Charmander", "Squirtle", "Chikorita", "Cyndaquil", "Totodile", "Treecko", "Torchic", "Mudkip",
"Turtwig", "Chimchar", "Piplup", "Snivy", "Tepig", "Oshawott", "Chespin", "Fennekin", "Froakie", "Pikachu", "Eevee"];

var POKE_BALLS = ["poke", "great", "ultra", "master", "repeat", "timer"];

var ITEMS = ["poke", "great", "ultra", "master", "repeat", "timer"];

var RATE_MULTIPLIERS = {
    "poke": 1,
    "great": 1.5,
    "ultra": 2,
    "timer": 1,
    "repeat": 1,
    "master": Infinity
};

var POKEMART_PRICES = {
    "poke": 200,
    "great": 600,
    "ultra": 1200,
    "timer": 1800,
    "repeat": 2400,
    "master": 15000
};

safari = sys.fexists(DATA_FOLDER + "safari.txt") ? helpers.readObject("safari") : {};
helpers.setVariable("currentWild", "none");
helpers.setVariable("currentWildShiny", false);
helpers.setVariable("baseCatchRate", 0);
helpers.setVariable("globalAttempts", 0);

module.exports = {
    safaricommands: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Safari Commands</h2>"
        + "<br>"
        + "<b>" + helpers.user("/startgame") + "</b>: to join the Safari game. Allows you to choose a starter by clicking (on Android, use /choose).<br>"
        + "<b>" + helpers.user("/choose ") + helpers.arg("Pokémon") + "</b>: makes you join the Safari game with <b>Pokémon</b>, assuming <b>Pokémon</b> is a valid starter.<br>"
        + "<b>" + helpers.user("/catch ") + helpers.arg("ball") + "</b>: try to catch the current wild Pokémon in <b>ball</b>.<br>"
        + "<b>" + helpers.user("/pokeball") + "</b>: try to catch the current wild Pokémon in a Poké Ball.<br>"
        + "<b>" + helpers.user("/greatball") + "</b>: try to catch the current wild Pokémon in a Great Ball. Also /great.<br>"
        + "<b>" + helpers.user("/ultraball") + "</b>: try to catch the current wild Pokémon in an Ultra Ball. Also /ultra.<br>"
        + "<b>" + helpers.user("/masterball") + "</b>: try to catch the current wild Pokémon in a Master Ball. Also /master.<br>"
        + "<b>" + helpers.user("/repeatball") + "</b>: try to catch the current wild Pokémon in a Repeat Ball. Also /repeat.<br>"
        + "<b>" + helpers.user("/timerball") + "</b>: try to catch the current wild Pokémon in a Timer Ball. Also /timer.<br>"
        + "<b>" + helpers.user("/spawn ") + helpers.arg("Pokémon") + "</b>: spawns a wild <b>Pokémon</b>. Also /wild.<br>"
        + "<b>" + helpers.user("/pay ") + helpers.arg("player") + helpers.arg2("*money") + "</b>: pay <b>money</b> Poké to <b>player</b>.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    startgame: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase(), startermessage = "";
        if (safari[lower]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you have already joined the Safari game!");
            return;
        }
        sys.sendHtmlMessage(src, helpers.bot(bots.safari) + "Welcome to the Safari Zone, " + name + "! Please choose one of the following Pokémon by "
        + (helpers.isAndroid(src) ? "typing '/choose <pokemon>'!" : "clicking on them!"), channel);
        for (var i in STARTER_POKEMON) {
            startermessage += "<a href='po:send//choose " + STARTER_POKEMON[i] + "'>" + helpers.pokeIcon(sys.pokeNum(STARTER_POKEMON[i])) + "</a> ";
        }
        safari[lower] = {};
        sys.sendHtmlMessage(src, startermessage, channel);
    }

    ,

    choose: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase(), starter = command[1], starterNum;
        if (!safari[lower]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you haven't yet joined the Safari game!");
            return;
        }
        if (safari[lower].starter) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you already have a starter Pokémon!");
            return;
        }
        if (!starter) {
            helpers.starfox(src, channel, command, bots.safari, "Error 404, Pokémon not found.");
            return;
        }
        if (!helpers.isInArray(starter, STARTER_POKEMON)) {
            helpers.starfox(src, channel, command, bots.safari, "Error 403, invalid starter.");
            return;
        }
        safari[lower].starter = starter;
        safari[lower].items = {};
        safari[lower].money = 0;
        safari[lower].attempts = 0;
        safari[lower].rate = 0;
        safari[lower].mercy = 0;
        safari[lower].pokemon = [];
        safari[lower].pokemon.push(sys.pokeNum(starter));
        for (var i in ITEMS) {
            safari[lower].items[i] = 0;
        }
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
            helpers.starfox(src, channel, command, bots.safari, "Error 404, Pokémon not found.");
            return;
        }
        if (!sys.pokeNum(pokemon)) {
            helpers.starfox(src, channel, command, bots.safari, "Error 403, invalid Pokémon name.");
            return;
        }
        pokeNum = sys.pokeNum(pokemon);
        pokemon = sys.pokemon(pokeNum);
        if (pokeNum >= CATCH_RATES.length) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, that Pokémon doesn't have its catch rate set yet.");
            return;
        }
        shine = (command[2] ? true : false);
        currentWild = pokeNum;
        currentWildShiny = shine;
        baseCatchRate = CATCH_RATES[pokeNum];
        sys.sendHtmlAll(helpers.bot(bots.safari) + "A wild " + (shine ? "<b><font color='#FFA500'>Shiny</font></b> " : "") +
        "<b><font color='" + helpers.typecolor(pokeNum) + "'>" + pokemon + "</font></b> appeared!<br>" + helpers.pokeImage(pokeNum, shine), safarichannel);
    }

    ,

    wild: function (src, channel, command) {
        this.spawn(src, channel, command);
    }

    ,

    "catch": function (src, channel, command) {
        var random = sys.rand(0, 100), pokemon = sys.pokemon(currentWild), name = sys.name(src), lower = name.toLowerCase(), ball = command[1], ballName, multiplier, catchRate;
        if (!safari[lower]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you haven't yet joined the Safari game!");
            return;
        }
        if (isNaN(currentWild)) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, there is no wild Pokémon to catch!");
            return;
        }
        if (!ball) {
            helpers.starfox(src, channel, command, bots.safari, "Error 404, ball not found.");
            return;
        }
        if (!helpers.isInArray(ball.toLowerCase().replace("ball", ""), POKE_BALLS)) {
            helpers.starfox(src, channel, command, bots.safari, "Error 403, invalid ball.");
            return;
        }
        if (!helpers.isInArray(ball, Object.keys(safari[lower].items))) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you don't have that type of ball! You can buy one at the Poké Mart.");
            return;
        }
        if (safari[lower].attempts === 0) {
            safari[lower].rate = baseCatchRate;
        }
        multiplier = safariHelpers.getMultiplier(lower, ball);
        catchRate = (multiplier == Infinity ? 100 : Math.round(((1 - 2 / 3) * safari[lower].rate * multiplier * 1) / 256 * 100));
        if (catchRate === 0) {
            catchRate = 1;
        }
        if (multiplier === 0) {
            catchRate = 0;
        }
        ballName = safariHelpers.displayName(ball);
        if (random < catchRate) {
            sys.sendMessage(src, "Base CR: " + baseCatchRate, channel);
            sys.sendMessage(src, "Ball multiplier: x" + multiplier, channel);
            sys.sendMessage(src, "Mercy value: " + safari[lower].mercy, channel);
            sys.sendMessage(src, "Base CR + Mercy value: " + safari[lower].rate, channel);
            sys.sendMessage(src, "Catch probability: " + catchRate + "%", channel);
            sys.sendMessage(src, "Random number selected: " + random, channel);
            sys.sendHtmlAll(helpers.bot(bots.safari) + name + " caught the wild " + pokemon + " in their " + helpers.itemImage(sys.itemNum(ballName)) + " " + ballName + "!", safarichannel);
            safari[lower].pokemon.push(currentWild);
            safari[lower].items[ball]--;
            for (var i in safari) {
                safari[i].attempts = 0;
                safari[i].mercy = 0;
                safari[i].rate = 0;
            }
            helpers.saveData("safari");
            currentWild = "none";
            globalAttempts = 0;
        } else {
            sys.sendMessage(src, "Base CR: " + baseCatchRate, channel);
            sys.sendMessage(src, "Ball multiplier: x" + multiplier, channel);
            sys.sendMessage(src, "Mercy value: " + safari[lower].mercy, channel);
            sys.sendMessage(src, "Base CR + Mercy value: " + safari[lower].rate, channel);
            sys.sendMessage(src, "Catch probability: " + catchRate + "%", channel);
            sys.sendMessage(src, "Random number selected: " + random, channel);
            safari[lower].attempts++;
            safari[lower].mercy += (safari[lower].attempts >= 10 ? Math.sqrt(1 / baseCatchRate) * 100 * 0.5 : Math.sqrt(1 / baseCatchRate) * 100 * (safari[lower].attempts / 20));
            safari[lower].rate = baseCatchRate + safari[lower].mercy;
            safari[lower].items[ball]--;
            helpers.saveData("safari");
            globalAttempts++;
            sys.sendHtmlAll(helpers.bot(bots.safari) + "The wild " + pokemon + " broke out of " + name + "'s " + helpers.itemImage(sys.itemNum(ballName)) + " " + ballName + "!", safarichannel);
        }
    }

    ,

    pokeball: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    great: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    greatball: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    ultra: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    ultraball: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    master: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    masterball: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    repeat: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    repeatball: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    timer: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    timerball: function (src, channel, command) {
        this["catch"](src, channel, ["catch", command[0]]);
    }

    ,

    pay: function (src, channel, command) {
        var name = sys.name(src), trgtname = command[1], lower, money;
        if (!trgtname) {
            helpers.starfox(src, channel, command, bots.safari, "Error 404, player not found.");
            return;
        }
        lower = trgtname.toLowerCase();
        if (!sys.id(trgtname)) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, that player is not currently online!");
            return;
        }
        if (!safari[lower]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, that player hasn't yet joined the Safari game!");
            return;
        }
        money = parseInt(command[2]);
        if (!money) {
            helpers.starfox(src, channel, command, bots.safari, "Error 404, money not found.");
            return;
        }
        if (isNaN(money)) {
            helpers.starfox(src, channel, command, bots.safari, "Error 403, invalid money.");
            return;
        }
        if (!safari[lower].money) {
            safari[lower].money = 0;
        }
        safari[lower].money += money;
        helpers.saveData("safari");
        sys.sendHtmlAll(helpers.bot(bots.safari) + name + " paid " + POKEDOLLAR + money + " to " + (members[lower] ? members[lower] : trgtname) + "!", safarichannel);
    }

    ,

    pokemart: function (src, channel, command) {
        var pokemartmessage = border + "<h2>Poké Mart</h2><br>", lower = sys.name(src).toLowerCase(), i;
        if (!safari[lower]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you haven't yet joined the Safari game!");
            return;
        }
        if (helpers.isAndroid(src)) {
            pokemartmessage += "<tt>";
            for (i in POKEMART_PRICES) {
                pokemartmessage += safariHelpers.displayName(i) + " | " + POKEDOLLAR + POKEMART_PRICES[i] + "<br>";
            }
            pokemartmessage += "</tt>";
        } else {
            pokemartmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Item</th><th>Name</th><th>Price</th><th>Buy / Sell</th></tr></thead><tbody>";
            for (i in POKEMART_PRICES) {
                pokemartmessage += "<tr>"
                + "<td>" + helpers.itemImage(sys.itemNum(safariHelpers.displayName(i))) + "</td>"
                + "<td>" + safariHelpers.displayName(i) + "</td>"
                + "<td>" + POKEDOLLAR + POKEMART_PRICES[i] + "</td>"
                + "<td><a href='po:send//buy " + i + "'>Buy</a> / <a href='po:send//sell " + i + "'>Sell</a></td>"
                + "</tr>";
            }
            pokemartmessage += "</tbody></table>";
        }
        pokemartmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, pokemartmessage, channel);
    }

    ,

    buy: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase(), item = command[1], quantity, price, grammar;
        if (!safari[lower]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you haven't yet joined the Safari game!");
            return;
        }
        if (!item) {
            helpers.starfox(src, channel, command, bots.safari, "Error 404, item not found.");
            return;
        }
        if (!helpers.isInArray(item, ITEMS)) {
            helpers.starfox(src, channel, command, bots.safari, "Error 403, invalid item.");
            return;
        }
        quantity = (command[2] ? parseInt(command[2]) : 1);
        price = POKEMART_PRICES[item];
        if (safari[lower].money === 0) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you have no money!");
            return;
        }
        if (safari[lower].money < price * quantity) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you don't have enough money!");
            return;
        }
        safari[lower].money -= price * quantity;
        safari[lower].items[item] = (!safari[lower].items[item] ? quantity : safari[lower].items[item] + quantity);
        helpers.saveData("safari");
        grammar = (quantity == 1 ? "" : "s");
        sys.sendHtmlMessage(src, helpers.bot(bots.safari) + "You bought " + quantity + " " + safariHelpers.displayName(item) + grammar +
        " for " + POKEDOLLAR + POKEMART_PRICES[item] + ". You now have " + POKEDOLLAR + safari[lower].money + "!", channel);
    }

    ,

    sell: function (src, channel, command) {
        var lower = sys.name(src).toLowerCase(), item = command[1], quantity, price, grammar;
        if (!safari[lower]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you haven't yet joined the Safari game!");
            return;
        }
        if (!item) {
            helpers.starfox(src, channel, command, bots.safari, "Error 404, item not found.");
            return;
        }
        if (!helpers.isInArray(item, ITEMS)) {
            helpers.starfox(src, channel, command, bots.safari, "Error 403, invalid item.");
            return;
        }
        if (!safari[lower].items) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you have no items!");
            return;
        }
        if (!safari[lower].items[item]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you have no such item!");
            return;
        }
        quantity = (command[2] ? parseInt(command[2]) : 1);
        price = POKEMART_PRICES[item] / 2 * quantity;
        safari[lower].money += price;
        safari[lower].items[item] -= quantity;
        helpers.saveData("safari");
        grammar = (quantity == 1 ? "" : "s");
        sys.sendHtmlMessage(src, helpers.bot(bots.safari) + "You sold " + quantity + " " + safariHelpers.displayName(item) + grammar +
        " for " + POKEDOLLAR + price + ". You now have " + POKEDOLLAR + safari[lower].money + "!", channel);
    }

    ,

    bag: function (src, channel, command) {
        var bagmessage = border + "<h2>Bag</h2><br>", lower = sys.name(src).toLowerCase(), items, i;
        if (!safari[lower]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you haven't yet joined the Safari game!");
            return;
        }
        items = safari[lower].items;
        if (helpers.isAndroid(src)) {
            bagmessage += "<tt>";
            for (i in ITEMS) {
                bagmessage += "Money: " + POKEDOLLAR + safari[lower].money + "<br>"
                + helpers.displayName(ITEMS[i]) + ": " + safari[lower].items[ITEMS[i]] + "<br>";
            }
            bagmessage += "</tt>";
        } else {
            bagmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Item</th><th>Name</th><th>Amount</th></tr></thead><tbody>";
            for (i in ITEMS) {
                bagmessage += "<tr>"
                + "<td>" + helpers.itemImage(sys.itemNum(safariHelpers.displayName(ITEMS[i]))) + "</td>"
                + "<td>" + safariHelpers.displayName(ITEMS[i]) + "</td>"
                + "<td>" + safari[lower].items[ITEMS[i]] + "</td>"
                + "</tr>";
            }
            bagmessage += "</tbody></table><br><br><b>Money:</b> " + POKEDOLLAR + safari[lower].money;
        }
        bagmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, bagmessage, channel);
    }

    ,

    box: function (src, channel, command) {
        var boxmessage = border + "<h2>Box</h2><br>", lower = sys.name(src).toLowerCase(), counter = 0, pokemon, i;
        if (!safari[lower]) {
            helpers.starfox(src, channel, command, bots.safari, "Error 400, you haven't yet joined the Safari game!");
            return;
        }
        pokemon = safari[lower].pokemon;
        if (helpers.isAndroid(src)) {
            boxmessage += "<tt>";
            for (i in pokemon) {
                boxmessage += helpers.pokeIcon(pokemon[i]) + " ";
            }
            boxmessage = boxmessage.slice(0, -1) + "</tt>";
        } else {
            boxmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><tbody><tr>";
            for (i in pokemon) {
                if (counter !== 0 && counter % 10 === 0) {
                    boxmessage += "<tr>";
                }
                boxmessage += "<td>" + helpers.pokeIcon(pokemon[i]) + "</td>";
                counter++;
                if (counter % 10 === 0) {
                    boxmessage += "</tr>";
                }
            }
            boxmessage += "</tbody><tfoot><tr><td colspan='10'><b>Total Pokémon</b>: " + pokemon.length + "</td></tr></tfoot></table>";
        }
        boxmessage += "<br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, boxmessage, channel);
    }
};

safariHelpers = {
    getMultiplier: function (lower, ball) {
        if (ball == "repeat" && helpers.isInArray(currentWild, safari[lower].pokemon)) {
            return 3;
        }
        if (ball == "timer") {
            return (globalAttempts >= 40 ? 4 : 1 + (globalAttempts / 10));
        }
        return RATE_MULTIPLIERS[ball];
    }

    ,

    displayName: function (ball) {
        return (ball == "poke" || ball == "poké" ? "Poké Ball" : helpers.cap(ball.toLowerCase().replace("ball", "")) + " Ball");
    }
};
