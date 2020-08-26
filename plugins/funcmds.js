/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY FUN COMMANDS funcmds.js
     - by Maribel Hearn, 2012-2015

    This file contains the notorious
    fun commands. Can be run by any user.
    ----------------------------------------------
*/
funcommands = {
    funcommands: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Fun Commands</h2>"
        + "<br>"
        + "<b>" + helpers.user("/armyof ") + helpers.arg("Pokémon") + "</b>: posts six of the same <b>Pokémon</b>. If <b>Pokémon</b> is not specified, a random one is selected.<br>"
        + "<b>" + helpers.user("/attack ") + helpers.arg("player") + helpers.arg2("*move") + "</b>: use <b>move</b> on <b>player</b>. If <b>player</b> or <b>move</b> are not specified, random ones are selected.<br>"
        + "<b>" + helpers.user("/attract ") + helpers.arg("player") + "</b>: attracts <b>player</b>. If <b>player</b> is not specified, attracts a random user.<br>"
        + "<b>" + helpers.user("/axolotl") + "</b>: a strange command that makes you post an image of an axolotl.<br>"
        + "<b>" + helpers.user("/bigtext ") + helpers.arg("text") + helpers.arg2("*title") + helpers.arg3("*bot") + helpers.arg4("*color") + helpers.arg5("*size") +
        "</b>: posts <b>text</b> in a large <b>color</b> font of <b>size</b> px in size, titled <b>title</b>, with <b>bot</b> as bot.<br>"
        + "<b>" + helpers.user("/bulbaderp") + "</b>: posts an image of Bulbasaur. Bulbaderp.<br>"
        + "<b>" + helpers.user("/burn ") + helpers.arg("player") + "</b>: burns <b>player</b>. If <b>player</b> is not specified, burns a random user.<br>"
        + "<b>" + helpers.user("/confuse ") + helpers.arg("player") + "</b>: confuses <b>player</b>. If <b>player</b> is not specified, confuses a random user.<br>"
        + "<b>" + helpers.user("/cow") + "</b>: a mysterious command that posts a certain quote. No one truly knows why it actually exists.<br>"
        + "<b>" + helpers.user("/darp") + "</b>: posts an image of Magikarp. Magidarp. Harpadarp.<br>"
        + "<b>" + helpers.user("/dennis") + "</b>: posts an image of Dennis, also known as Ghetsis, yelling out his name in all capitals.<br>"
        + "<b>" + helpers.user("/derp") + "</b>: posts an image of Stunfisk. Derpfisk. Herpaderp.<br>"
        + "<b>" + helpers.user("/die") + "</b>: you die, resulting in a kick from the server.<br>"
        + "<b>" + helpers.user("/dividebyzero") + "</b>: you divide a number by zero, which somehow causes an error that disconnects you from the server.<br>"
        + "<b>" + helpers.user("/durp") + "</b>: posts an image of Feebas. Feedurp. Hurpadurp.<br>"
        + "<b>" + helpers.user("/epicfail ") + helpers.arg("text") + "</b>: posts that <b>text</b> failed epically. Epic fail!<br>"
        + "<b>" + helpers.user("/explod") + "</b>: you unexpectedly explode out of the server, for some reason.<br>"
        + "<b>" + helpers.user("/face ") + helpers.arg("text") + "</b>: you lay your face on <b>text</b>. If <b>text</b> is not specified, you facepalm.<br>"
        + "<b>" + helpers.user("/fail ") + helpers.arg("text") + "</b>: posts that <b>text</b> failed. Fail!<br>"
        + "<b>" + helpers.user("/ferp") + "</b>: posts an image of Bidoof or Bibarel. Biferp or Bibaferp. Ferpaderp.<br>"
        + "<b>" + helpers.user("/flyaway") + "</b>: you fly away from the server, disconnecting you in the process.<br>"
        + "<b>" + helpers.user("/freeze ") + helpers.arg("player") + "</b>: freezes <b>player</b>. If <b>player</b> is not specified, freezes a random user.<br>"
        + "<b>" + helpers.user("/herp") + "</b>: posts an image of Herdier. Herpdier. Derpaherp.<br>"
        + "<b>" + helpers.user("/hug ") + helpers.arg("text") + "</b>: makes you hug <b>text</b>.<br>"
        + "<b>" + helpers.user("/hurrdurr") + "</b>: posts images of the Timburr family. Hurr durr.<br>"
        + "<b>" + helpers.user("/kill ") + helpers.arg("player") + helpers.arg2("*reason") + "</b>: kills <b>player</b> for <b>reason</b>. If <b>reason</b> is not specified, your reason is unknown.<br>"
        + "<b>" + helpers.user("/meme ") + helpers.arg("Pokémon") + helpers.arg2("*text1") + helpers.arg3("*text2") + helpers.arg4("*title") + helpers.arg5("*color") +
        "</b>: posts an image macro of <b>Pokémon</b>, called <b>title</b>, with captions in <b>color</b> saying <b>text1</b> and <b>text2</b> at the top and the bottom.<br>"
        + "<b>" + helpers.user("/merp") + "</b>: posts an image of Dunsparce. Merpsparce. Merpaderp.<br>"
        + "<b>" + helpers.user("/morse ") + helpers.arg("text") + "</b>: translates <b>text</b> to Morse Code.<br>"
        + "<b>" + helpers.user("/nuke ") + helpers.arg("player") + "</b>: nukes <b>player</b>. If <b>player</b> is not specified, nukes a random user.<br>"
        + "<b>" + helpers.user("/paralyze ") + helpers.arg("player") + "</b>: paralyzes <b>player</b>. If <b>player</b> is not specified, paralyzes a random user. Also /paralyse.<br>"
        + "<b>" + helpers.user("/poison ") + helpers.arg("player") + "</b>: poisons <b>player</b>. If <b>player</b> is not specified, poisons a random user.<br>"
        + "<b>" + helpers.user("/random") + "</b>: generates a random post that doesn't make any sense.<br>"
        + "<b>" + helpers.user("/randomsupport") + "</b>: posts a message that you support a randomly generated couple.<br>"
        + "<b>" + helpers.user("/russia ") + helpers.arg("text1") + helpers.arg2("*text2") + "</b>: posts a Russian Reversal joke. In Soviet Russia, <b>text2</b> <b>text1</b> YOU!!<br>"
        + "<b>" + helpers.user("/see ") + helpers.arg("text") + "</b>: you are so afraid of <b>text</b>, you run away from the server in fear. If <b>text</b> is unspecified, you will see Dennis.<br>"
        + "<b>" + helpers.user("/selfpunch") + "</b>: punches yourself from the server.<br>"
        + "<b>" + helpers.user("/sleep ") + helpers.arg("player") + "</b>: puts <b>player</b> to sleep. If <b>player</b> is not specified, puts a random user to sleep.<br>"
        + "<b>" + helpers.user("/wtfboom") + "</b>: an extreme reaction for an astonishing surprise, like a sudden explosion.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    armyof: function (src, channel, command) {
        var shiny = [], sprites = "", chance = 64, name = sys.name(src), pokeNum;
        pokeNum = (!sys.pokeNum(command[1]) && command[1] != "tentaquil" ? sys.rand(0, MAX_POKEMON) : sys.pokeNum(command[1]));
        for (i = 0; i < 6; i++) {
            shiny.push(sys.rand(0, chance) == 0 ? "&shiny=true" : "");
            sprites += "<img src='pokemon:" + pokeNum + shiny[i] + "'>";
            if (shiny[i] == "&shiny=true") {
                chance /= 2;
            }
        }
        sys.sendHtmlAll(helpers.bot(bots.armyof) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("A Army Of " + (chance == 1 ? "<b><font color='#FFA500'>Shiny</font></b>" +
        " " : "") + sys.pokemon(pokeNum)) + " command.</b><br>" + sprites, channel);
    }

    ,

    attack: function (src, channel, command) {
        var name = sys.name(src), random = sys.rand(0, sys.numPlayers()), player, move;
        !command[1] ? player = sys.name(sys.playerIds()[random]) : player = helpers.escapehtml(command[1]);
        !command[2] ? move = move = sys.move(sys.rand(1, 610)) : move = helpers.escapehtml(command[2]);
        sys.sendHtmlAll(helpers.bot(bots.attack) + "<b>" + helpers.user(helpers.escapehtml(name)) + " used " + helpers.arg2(move) + " on " + helpers.arg(player) + "!</b>", channel);
    }

    ,

    attract: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), random = sys.rand(0, sys.numPlayers());
        !command[1] ? player = sys.name(sys.playerIds()[random]) : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll("<font color='#FF00FF'><timestamp/><b><font size='6'>♥</font> " + player + " has been attracted by " + name + "! <font size='6'>♥</font</b></font>", channel);
    }

    ,

    axolotl: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), auth = sys.auth(src), color = helpers.color(src);
        if (auth >= 1 && auth <= 3) {
            sys.sendHtmlAll("<font color='" + color + "'><timestamp/> +<b><i>" + name + ":</i></b></font> " + AXOLOTL_BASE64, channel);
        } else {
            sys.sendHtmlAll("<font color='" + color + "'><timestamp/> <b>" + name + ":</b></font> " + AXOLOTL_BASE64, channel);
        }
    }

    ,

    bigtext: function (src, channel, command) {
        var name = sys.name(src), text, title, bot, color, size;
        !command[1] ? text = "Some text." : text = helpers.escapehtml(command[1]);
        !command[2] ? title = "Big Text" : title = helpers.escapehtml(command[2]);
        !command[3] || command[3] == "default" ? bot = bots.fun : bot = helpers.escapehtml(command[3]);
        !command[4] || !sys.validColor(command[4]) ? color = "#000000" : color = sys.hexColor(command[4]);
        !command[5] ? size = 32 : size = command[5];
        if (isNaN(size)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, the size must be a number.");
            return;
        }
        if (size > 32) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, the size may not be larger than 32 px.");
            return;
        }
        if (helpers.isInArray(allcommands, title.toLowerCase())) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, the title may not be the same as one of an existing command.");
            return;
        }
        sys.sendHtmlAll(helpers.bot(bot) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg(title) + " command.</b><br><span style='font-size:" + size + "px'><font color='" + color + "'>" + text + "</font></span>", channel);
    }

    ,

    bulbaderp: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Bulbaderp") + " command.</b><br><img src='pokemon:1'><b>" + helpers.desu("Bulbaderp!") + "</b>", channel);
    }

    ,

    burn: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), random = sys.rand(0, sys.numPlayers()), channelPlayers = sys.playersOfChannel(channel);
        !command[1] ? player = sys.name(sys.playerIds()[random]) : player = helpers.escapehtml(command[1]);
        for (var i in channelPlayers) {
            if (helpers.isAndroidOrWeb(channelPlayers[i])) {
                sys.sendHtmlMessage(channelPlayers[i], "<font color='#FF0000'><timestamp/><b>" + STATUS[command[0].toUpperCase()] + player +
                " has been burned by " + name + "!" + STATUS[command[0].toUpperCase()] + "</b></font>", channel);
            } else {
                sys.sendHtmlMessage(channelPlayers[i], "<font color='#FF0000'><timestamp/><b>" + helpers.statusImage(command[0]) + player +
                " has been burned by " + name + "!" + helpers.statusImage(command[0]) + "</b></font>", channel);
            }
        }
    }

    ,

    confuse: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), random = sys.rand(0, sys.numPlayers());
        !command[1] ? player = sys.name(sys.playerIds()[random]) : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll("<font color='#8A2BE2'><timestamp/><b><font size='6'>@</font> " + player + " has been confused by " + name + "! <font size='6'>@</font</b></font>", channel);
    }

    ,

    cow: function (src, channel, command) {
        sys.sendHtmlAll(helpers.bot(bots.cow) + "You can call it a 'cow' if you want, the question remains. <small>- " + helpers.user(helpers.escapehtml(sys.name(src))) + "</small></b>", channel);
    }

    ,

    darp: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Darp") + " command.</b><br><img src='pokemon:129'><b>" + helpers.desu("Harpadarp!") + "</b>", channel);
    }

    ,

    dennis: function (src, channel, command) {
        var name = sys.name(src), number = (sys.rand(0, 2) == 1 ? 269 : 250);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Dennis") + " command.</b><br><b>DDDDDDDEEEEEEENNNNNNNNNNNNNNIIIIIIISSSSSSS!!!</b><img src='trainer:" + number + "'>", channel);
    }

    ,

    derp: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Derp") + " command.</b><br><img src='pokemon:618'><b>" + helpers.desu("Herpaderp!") + "</b>", channel);
    }

    ,

    durp: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Durp") + " command.</b><br><img src='pokemon:349'><b>" + helpers.desu("Hurpadurp!") + "</b>", channel);
    }

    ,

    epicfail: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), player, move;
        !command[1] ? player = "Someone" : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>Epic Fail! " + helpers.arg(player) + " epically failed. <small>- " + helpers.user(name) + "</small></b>", channel);
    }

    ,

    face: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), auth = sys.auth(src), color = helpers.color(src), message, text;
        !command[1] ? text = "palm" : text = helpers.escapehtml(command[1]);
        if (auth >= 1 && auth <= 3) {
            message = "<font color='" + color + "'><timestamp/>+<i><b>" + name + ":</b></i></font> ";
        } else {
            message = "<font color='" + color + "'><timestamp/><b>" + name + ":</b></font> ";
        }
        sys.sendHtmlAll(message + "<i><font color='" + cmdcolors[0] + "'>*face" + text + "*</font></i>", channel);
    }

    ,

    fail: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), player, move;
        !command[1] ? player = "Someone" : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.arg(player) + " failed. <small>- " + helpers.user(name) + "</small></b>", channel);
    }

    ,

    ferp: function (src, channel, command) {
        var name = sys.name(src), pokenum;
        pokenum = sys.rand(0, 2);
        pokenum == 1 ? pokenum = 399 : pokenum = 400;
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Ferp") + " command.</b><br><img src='pokemon:" + pokenum + "'><b>" + helpers.desu("Ferpaderp!") + "</b>", channel);
    }

    ,

    freeze: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), random = sys.rand(0, sys.numPlayers()), channelPlayers = sys.playersOfChannel(channel);
        !command[1] ? player = sys.name(sys.playerIds()[random]) : player = helpers.escapehtml(command[1]);
        for (var i in channelPlayers) {
            if (helpers.isAndroidOrWeb(channelPlayers[i])) {
                sys.sendHtmlMessage(channelPlayers[i], "<font color='#87CEEB'><timestamp/><b>" + STATUS[command[0].toUpperCase()] + player +
                " has been frozen by " + name + "!" + STATUS[command[0].toUpperCase()] + "</b></font>", channel);
            } else {
                sys.sendHtmlMessage(channelPlayers[i], "<font color='#87CEEB'><timestamp/><b>" + helpers.statusImage(command[0]) + player +
                " has been frozen by " + name + "!" + helpers.statusImage(command[0]) + "</b></font>", channel);
            }
        }
    }

    ,

    herp: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Herp") + " command.</b><br><img src='pokemon:507'><b>" + helpers.desu("Derpaherp!") + "</b>", channel);
    }

    ,

    hug: function (src, channel, command) {
        var name = sys.name(src), color = helpers.color(src);
        command.splice(0, 1);
        command = command.join(DELIMITER);
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " hugged " + helpers.escapehtml(command) + ". ♥***</b></font>", channel);
    }

    ,

    hurrdurr: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Hurr Durr") + " command.</b><br><span style='font-size:32px'>HURR DURR!</span><br><img src='pokemon:532'><img src='pokemon:534'><img src='pokemon:533'></b>", channel);
    }

    ,

    meme: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), text1, text2, pokenum, title, color;
        !sys.pokeNum(command[1]) ? pokenum = 129 : pokenum = sys.pokeNum(command[1]);
        !command[2] ? text1 = "I DIDN'T SPECIFY TEXT" : text1 = helpers.escapehtml(command[2]);
        !command[3] ? text2 = "BETTER DO IT NEXT TIME" : text2 = helpers.escapehtml(command[3]);
        !command[4] ? title = sys.pokemon(pokenum) : title = helpers.escapehtml(command[4]);
        !command[5] ? color = "black" : color = command[5];
        text1 = text1.replace(/\(asterisk\)/g, "*");text1 = text1.replace(/\[asterisk\]/g, "*");
        text2 = text2.replace(/\(asterisk\)/g, "*");text2 = text2.replace(/\[asterisk\]/g, "*");
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(name) + " has used the " + helpers.arg(title + " Meme") + " command.</b><br><center>" +
        "<font style='font-family:impact;font-size:24px;color:" + color + "'>" + text1 + "<br><img src='pokemon:" + pokenum + "'><br>" + text2 + "</font></center>", channel);
    }

    ,

    merp: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Merp") + " command.</b><br><img src='pokemon:206'><b>" + helpers.desu("Merpaderp!") + "</b>", channel);
    }

    ,

    morse: function (src, channel, command) {
        var name = sys.name(src), color = helpers.color(src), charset = "abcdefghijklmnopqrstuvwxyz0123456789 ", text, message;
        var morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.",
        "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----", ""];
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
            return;
        }
        text = command[1].toLowerCase().split("");
        for (var i in text) {
            if (charset.indexOf(text[i]) < 0) {
                helpers.starfox(src, channel, command, bots.command, "Error 403, invalid text. You may use only letters, numbers and spaces.");
                return;
            }
            text[i] = morse[charset.indexOf(text[i])];
        }
        text = text.join(" ");
        message = "<font color='" + color + "'><timestamp/>" + (sys.auth(src) >= 1 ? "+<b><i>" + name + " MORSE:</i></b></font> " : "<b>" + name + " MORSE:</b></font> ") + text;
        sys.sendHtmlAll(message, channel);
    }

    ,

    nuke: function (src, channel, command) {
        var name = sys.name(src), random = sys.rand(0, sys.numPlayers()), text, nukemessage;
        !command[1] ? player = sys.name(sys.playerIds()[random]) : player = command[1];
        text = player + " has been nuked by " + name + "!";
        nukemessage = "<font color='#800080'><timestamp/></font><b><font size='6' color='#FF0000'>☢</font>" + helpers.duoColor(text, "#800080", "#FF0000");
        if (text.length / 2 != parseInt(text.length / 2)) {
            sys.sendHtmlAll(nukemessage + "<font size='6' color='#FF0000'>☢</font></b>", channel);
        } else {
            sys.sendHtmlAll(nukemessage + "<font size='6' color='#800080'>☢</font></b>", channel);
        }
    }

    ,

    paralyze: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), random = sys.rand(0, sys.numPlayers()), channelPlayers = sys.playersOfChannel(channel);
        !command[1] ? player = sys.name(sys.playerIds()[random]) : player = helpers.escapehtml(command[1]);
        for (var i in channelPlayers) {
            if (helpers.isAndroidOrWeb(channelPlayers[i])) {
                sys.sendHtmlMessage(channelPlayers[i], "<font color='#FFA500'><timestamp/><b>" + STATUS["PARALYZE"] + player +
                " has been " + command[0] + "d by " + name + "!" + STATUS["PARALYZE"] + "</b></font>", channel);
            } else {
                sys.sendHtmlMessage(channelPlayers[i], "<font color='#FFA500'><timestamp/><b>" + helpers.statusImage("paralyze") + player +
                " has been " + command[0] + "d by " + name + "!" + helpers.statusImage("paralyze") + "</b></font>", channel);
            }
        }
    }

    ,

    paralyse: function (src, channel, command) {
        this.paralyze(src, channel, command);
    }

    ,

    poison: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), random = sys.rand(0, sys.numPlayers()), channelPlayers = sys.playersOfChannel(channel);
        !command[1] ? player = sys.name(sys.playerIds()[random]) : player = helpers.escapehtml(command[1]);
        for (var i in channelPlayers) {
            if (helpers.isAndroidOrWeb(channelPlayers[i])) {
                sys.sendHtmlMessage(channelPlayers[i], "<font color='#800080'><timestamp/><b>" + STATUS[command[0].toUpperCase()] + player +
                " has been poisoned by " + name + "!" + STATUS[command[0].toUpperCase()] + "</b></font>", channel);
            } else {
                sys.sendHtmlMessage(channelPlayers[i], "<font color='#800080'><timestamp/><b>" + helpers.statusImage(command[0]) + player +
                " has been poisoned by " + name + "!" + helpers.statusImage(command[0]) + "</b></font>", channel);
            }
        }
    }

    ,

    random: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src);
        var wordamount = Math.ceil(Math.random() * 5), num = 0, number = 94, message, arg;
        var letteramount = [], space = [], letter = [], letters = [];
        var text = "", list = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
        if (!command[1]) {
            arg = "";
        } else {
            arg = command[1].toUpperCase();
        }
        if (arg != "LETTERS" && arg != "NUMBERS") {
            arg = "";
        } else {
            arg = " " + arg;
        }
        while (num < wordamount) {
            space[num] = " ";
            num++;
        }
        num = 0;
        while (num < wordamount) {
            letters[num] = Math.floor(Math.random() * 10);
            num++;
        }
        if (command[1] == "letters") {
            list = "abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            number = 53;
        } else if (command[1] == "numbers") {
            list = "1234567890";
            number = 11;
        }
        num = 0;
        while (num < wordamount) {
            var num2 = 0;
            while (num2 < letters[num]) {
                letteramount[num] = Math.floor(Math.random() * number);
                letter[num] = list.charAt(letteramount[num]);
                text = text + letter[num];
                num2++;
            }
            text = text + space[num];
            num++;
        }
        text = helpers.escapehtml(text);
        if (auth < 1) {
            message = "<font color='" + color + "'><timestamp/><b>" + name + " RANDOM" + arg + ":</b></font> " + text;
        } else {
            message = "<font color='" + color + "'><timestamp/>+<b><i>" + name + " RANDOM" + arg + ":</i></b></font> " + text;
        }
        sys.sendHtmlAll(message, channel);
    }

    ,

    randomsupport: function (src, channel, command) {
        var name = sys.name(src), playerids = sys.playerIds(), random = sys.rand(0, sys.numPlayers()), random2 = sys.rand(0, sys.numPlayers()), name1, name2;
        !players[playerids[random]] ? name1 = sys.name(playerids[random]) : name1 = players[playerids[random]].name;
        !players[playerids[random2]] ? name2 = sys.name(playerids[random2]) : name2 = players[playerids[random2]].name;
        sys.sendHtmlAll("<font color='" + helpers.color(src) + "'><timestamp/><b>*** " + name + " supports " + name1 + " x " + name2 + " *** (random)</b></font>", channel);
    }

    ,

    russia: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), verb, russiaverb, noun, russianoun;
        !command[1] ? verb = "drive" : verb = helpers.escapehtml(command[1]);
        !command[2] ? noun = "a car" : noun = helpers.escapehtml(command[2]);
        if (verb.indexOf(" ") != -1) {
            russiaverb = verb.slice(verb.lastIndexOf(" "));
        } else {
            russiaverb = verb;
        }
        if (noun.substr(0, 2) == "a ") {
            russianoun = noun.slice(2);
        } else if (noun.substr(0, 4) == "the ") {
            russianoun = noun.slice(4);
        } else {
            russianoun = noun;
        }
        sys.sendHtmlAll(helpers.bot(bots.russia) + "<b>In America, you " + verb + " " + noun + ". In Soviet Russia, " + russianoun + " " + russiaverb + " YOU!! <small>- " + helpers.user(name) + "</small></b>", channel);
    }

    ,

    sleep: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), random = sys.rand(0, sys.numPlayers()), channelPlayers = sys.playersOfChannel(channel);
        !command[1] ? player = sys.name(sys.playerIds()[random]) : player = helpers.escapehtml(command[1]);
        for (var i in channelPlayers) {
            if (helpers.isAndroidOrWeb(channelPlayers[i])) {
                sys.sendHtmlMessage(channelPlayers[i], "<timestamp/><b>" + STATUS[command[0].toUpperCase()] + player +
                " has been put to sleep by " + name + "!" + STATUS[command[0].toUpperCase()] + "</b>", channel);
            } else {
                sys.sendHtmlMessage(channelPlayers[i], "<timestamp/><b>" + helpers.statusImage(command[0]) + player +
                " has been put to sleep by " + name + "!" + helpers.statusImage(command[0]) + "</b>", channel);
            }
        }
    }

    ,

    kill: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), player, reason;
        !command[1] ? player = "someone" : player = helpers.escapehtml(command[1]);
        if (player == "Chuck Norris") {
            helpers.starfox(src, channel, command, bots.command, "You tried.");
            return;
        }
        !command[2] ? reason = "Unknown" : reason = helpers.escapehtml(command[2]);
        sys.sendHtmlAll(helpers.bot(bots.attack) + "<b>" + helpers.user(name) + " killed " + helpers.arg(player) + "! [Reason: " + helpers.arg2(reason) + "]</b>", channel);
    }

    ,

    wtfboom: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Wtfboom") + " command.</b><br><span style='font-size: 24px;'><font color='#808080'>WHAT THE FU-" +
        "BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM</font></span>", channel);
    }

    ,

    selfpunch: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.kick) + name + " has punched themselves from the server!", channel);
        sys.kick(src);
    }

    ,

    die: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.kick) + name + " died. rip", channel);
        sys.kick(src);
    }

    ,

    dividebyzero: function (src, channel, command) {
        var name = sys.name(src), number = sys.rand(0, 1338);
        sys.sendAll(name + ": " + number + " / 0 = ...", channel);
        sys.sendHtmlAll(helpers.bot(bots.kick) + name + " divided by zero! OH SHI-", channel);
        sys.kick(src);
    }

    ,

    explod: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll("<span style='font-size:24px;color:grey'>WHAT THE FU-BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO" +
        "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM</span><br><font color='grey'><timestamp/><b>" + name + " explod.</b></font>", channel);
        sys.kick(src);
    }

    ,

    flyaway: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.kick) + name + " flew away!", channel);
        sys.kick(src);
    }

    ,

    see: function (src, channel, command) {
        var name = sys.name(src), text;
        !command[1] ? text = "Dennis" : text = command[1];
        sys.sendHtmlAll(helpers.bot(bots.kick) + name + " saw " + text + " behind them and left the server!", channel);
        sys.kick(src);
    }
};
