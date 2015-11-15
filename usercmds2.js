/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY USER COMMANDS 2 usercmds2.js
     - by Maribel Hearn, 2012-2015
    
    This file contains the second part of the
    commands that can be run by any user by
    entering them in the server chat.
    These commands cannot be used by someone
    who is muted; however, the ones in the
    script file 'usercmds1.js' can.
    ----------------------------------------------
*/
usercommands2 = {
    /**
        ------------
        Fun Commands
        ------------
    **/
    armyof: function (src, channel, command) {
        var name = sys.name(src), sprites;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, Pokémon not found.");
            return;
        }
        if (!sys.pokeNum(command[1]) && command[1] != "tentaquil") {
            helpers.starfox(src, channel, command, bots.command, "Error 403, invalid Pokémon name.");
            return;
        }
        sprites = "<img src='pokemon:" + sys.pokeNum(command[1]) + "'>";
        sprites += sprites + sprites + sprites + sprites + sprites;
        sys.sendHtmlAll(helpers.bot(bots.armyof) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("A Army Of " + sys.pokemon(sys.pokeNum(command[1]))) + " command.</b><br>" + sprites, channel);
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
        var name = helpers.escapehtml(sys.name(src));
        !command[1] ? player = "Someone" : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll("<font color='fuchsia'><timestamp/><b><font size='8'>♥</font> " + player + " has been attracted by " + name + "! <font size='8'>♥</font</b></font>", channel);
    }
    
    ,
    
    axolotl: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), auth = sys.auth(src), color = helpers.color(src);
        if (auth < 3 && name != "Wanderer M") {
            helpers.starfox(src, channel, command, bots.command, "Error 403, you may not use this command.");
            return;
        }
        if (auth == 3) {
            sys.sendHtmlAll("<font color='" + color + "'><timestamp /> +<b><i>" + name + ":</i></b></font> " + AXOLOTL_BASE64, channel);
        } else {
            sys.sendHtmlAll("<font color='" + color + "'><timestamp /> <b>" + name + ":</b></font> " + AXOLOTL_BASE64, channel);
        }
    }
    
    ,
    
    bigtext: function (src, channel, command) {
        var name = sys.name(src), text, title, bot, color, size;
        !command[1] ? text = "Some text." : text = helpers.escapehtml(command[1]);
        !command[2] ? title = "Big Text" : title = helpers.escapehtml(command[2]);
        !command[3] ? bot = bots.fun : bot = helpers.escapehtml(command[3]);
        !command[4] ? color = "black" : color = command[4];
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
        " has used the " + helpers.arg(title) + " command.</b><br><span style='font-size:" + size + "px;color:" + color + "'>" + text + "</span>", channel);
    }
    
    ,
    
    bulbaderp: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Bulbaderp") + " command.</b><br><img src='pokemon:1'><b>" + helpers.desu("Bulbaderp!") + "</b>", channel);
    }
    
    ,
    
    burn: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src));
        !command[1] ? player = "Someone" : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll("<font color='red'><timestamp/><b><img src='Themes/Classic/status/battle_status4.png'>" + player + " has been burned by " + name +
        "!<img src='Themes/Classic/status/battle_status4.png'></b></font>", channel);
    }
    
    ,
    
    confuse: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src));
        !command[1] ? player = "Someone" : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll("<font color='blueviolet'><timestamp/><b><font size='8'>@</font> " + player + " has been confused by " + name + "! <font size='8'>@</font</b></font>", channel);
    }
    
    ,
    
    cow: function (src, channel, command) {
        sys.sendAll("±Miltank: You can call it a 'cow' if you want, the question remains.", channel);
    }
    
    ,
    
    darp: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Darp") + " command.</b><br><img src='pokemon:129'><b>" + helpers.desu("Harpadarp!") + "</b>", channel);
    }
    
    ,
    
    dennis: function (src, channel, command) {
        var name = sys.name(src), number;
        number = sys.rand(0, 2);
        number == 1 ? number = 269 : number = 250;
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Dennis") + " command.</b><br><b>DDDDDDDEEEEEEENNNNNNNNNNNNNNIIIIIIISSSSSSS!!!</b><img src='Themes/Classic/Trainer Sprites/" + number + ".png'>", channel);
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
        if (auth > 0) {
            message = "<font color='" + color + "'><timestamp/>+<i><b>" + name + ":</b></i></font> ";
        } else {
            message = "<font color='" + color + "'><timestamp/><b>" + name + ":</b></font> ";
        }
        sys.sendHtmlAll(message + "<i><font color='royalblue'>*face" + text + "*</font></i>", channel);
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
        var name = helpers.escapehtml(sys.name(src));
        !command[1] ? player = "Someone" : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll("<font color='skyblue'><timestamp/><b><img src='Themes/Classic/status/battle_status3.png'>" + player + " has been frozen by " + name +
        "!<img src='Themes/Classic/status/battle_status3.png'></b></font>", channel);
    }
    
    ,
    
    herp: function (src, channel, command) {
        var name = sys.name(src);
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(helpers.escapehtml(name)) +
        " has used the " + helpers.arg("Herp") + " command.</b><br><img src='pokemon:507'><b>" + helpers.desu("Derpaherp!") + "</b>", channel);
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
        message = "<font color='" + color + "'><timestamp/>+<b><i>" + name + " MORSE:</i></b></font> " + text;
        sys.sendHtmlAll(message, channel);
    }
    
    ,
    
    nuke: function (src, channel, command) {
        var name = sys.name(src), text, nukemessage;
        !command[1] ? player = "Someone" : player = command[1];
        text = player + " has been nuked by " + name + "!";
        nukemessage = "<font color='purple'><timestamp/></font><b><font size='6' color='red'>☢</font>" + helpers.duoColor(text, "purple", "red");
        if (text.length / 2 != parseInt(text.length / 2)) {
            sys.sendHtmlAll(nukemessage + "<font size='6' color='red'>☢</font></b>", channel);
        } else {
            sys.sendHtmlAll(nukemessage + "<font size='6' color='purple'>☢</font></b>", channel);
        }
    }
    
    ,
    
    paralyze: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src));
        !command[1] ? player = "Someone" : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll("<font color='orange'><timestamp/><b><img src='Themes/Classic/status/battle_status1.png'>" + player + " has been paralyzed by " + name +
        "!<img src='Themes/Classic/status/battle_status1.png'></b></font>", channel);
    }
    
    ,
    
    poison: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src));
        !command[1] ? player = "Someone" : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll("<font color='purple'><timestamp/><b><img src='Themes/Classic/status/battle_status5.png'>" + player + " has been poisoned by " + name +
        "!<img src='Themes/Classic/status/battle_status5.png'></b></font>", channel);
    }
    
    ,
    
    rage: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src));
        sys.sendHtmlAll(helpers.bot(bots.fun) + "<b>" + helpers.user(name) +
        " has used the " + helpers.arg("Rage") + " command.</b><br><span style='font-size:32px;color:red'>FFFFFFFUUUUUUUUUUUU-</span>", channel);
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
        var name = helpers.escapehtml(sys.name(src));
        !command[1] ? player = "Someone" : player = helpers.escapehtml(command[1]);
        sys.sendHtmlAll("<timestamp/><b><img src='Themes/Classic/status/battle_status2.png'>" + player + " has been put to sleep by " + name +
        "!<img src='Themes/Classic/status/battle_status2.png'></b>", channel);
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
        " has used the " + helpers.arg("Wtfboom") + " command.</b><br><span style='font-size:24px;color:grey'>WHAT THE FU-" +
        "BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM</span>", channel);
    }
    
    ,
    
    /**
        ----------------
        Interact Options
        ----------------
    **/
    selfkick: function (src, channel, command) {
        var name = sys.name(src), lower = name.toLowerCase();
        if (selfkickmessages[lower]) {
            msg = selfkickmessages[lower].replace(/~Self~/gi, name).replace(/~Server~/gi, sys.getServerName());
            sys.sendHtmlAll(helpers.bot(bots.kick) + msg, channel);
        } else {
            sys.sendHtmlAll(helpers.bot(bots.kick) + name + " has kicked themselves from the server!", channel);
        }
        sys.kick(src);
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
        var name = sys.name(src), number;
        number = sys.rand(0, 1338);
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
    
    ,
    
    /**
        ----------------
        Interact Options
        ----------------
    **/
    color: function (src, channel, command) {
        var color = command[1], name = sys.name(src), auth = sys.auth(src);
        if (!color) {
            sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your " + command[0] + " is " + helpers.color(src) + ".", channel);
            return;
        }
        if (!sys.validColor(color) && color != "random") {
            helpers.starfox(src, channel, command, bots.main, "Error 403, invalid " + command[0] + ".");
            return;
        }
        if (color == "#000000") {
            sys.changeColor(src, "#000001");
        } else if (color == "random") {
            sys.changeColor(src, "#000000");
        } else {
            if (auth === 0 && color != "random") {
                sys.changeColorStrict(src, color);
            } else {
                sys.changeColor(src, color);
            }
        }
        sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(name) + " changed their " + command[0] + " to " + helpers.arg(color) + "!</b>", channel);
    }
    
    ,
    
    colour: function (src, channel, command) {
        this.color(src, channel, command);
    }
    
    ,
    
    name: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src);
        if (!command[1] || command[1] === "" || command[1] === null) {
            helpers.starfox(src, channel, command, bots.name, "Error 404, name not found.");
            return;
        }
        var newname = command[1];
        newname = newname.replace(/\s{2,}/g, ' ');
        if (newname.charAt(0) == ' ') {
            newname = newname.slice(1);
        }
        var lower = newname.toLowerCase();
        if (newname.length > 42 && auth < 1) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 403, your name is invalid. It may not be over 42 characters long.", channel);
            return;
        }
        if (sys.dbIp(lower)) {
            if (helpers.isauthip(sys.dbIp(lower)) && sys.dbRegistered(lower)) {
                helpers.starfox(src, channel, command, bots.name, "Error 403, that name is in use by an auth member.", channel);
                return;
            }
        }
        if (sys.id(newname)) {
            helpers.starfox(src, channel, command, bots.name, "Error 403, that name is online at the moment.", channel);
            return;
        }
        for (var index in nameblocklist) {
            if (newname.toLowerCase().indexOf(nameblocklist[index]) != -1 && !helpers.isInArray(newname, exceptions)) {
                helpers.starfox(src, channel, command, bots.name, "Error 403, your name contains a banned word: " + nameblocklist[index] + ". Please try another name.");
                return;
            }
        }
        if (helpers.bannedchars(newname)[0]) {
            helpers.starfox(src, channel, command, bots.name, "Error 403, your name contains " + helpers.bannedchars(newname)[1] + ". Please try another name.");
            return;
        }
        sys.changeName(src, newname);
        sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(name) +
        " changed their name to " + helpers.escapehtmlarg(newname) + "!</b>", channel);
    }
    
    ,
    
    reverse: function (src, channel, command) {
        var name = sys.name(src);
        var newname = "";
        name = name.split("");
        for (var index2 in name) {
            newname = name[index2] + newname;
        }
        name = name.join("");
        for (var index in players) {
            if (newname.toLowerCase() == players[index].name.toLowerCase() && players[index].name.toLowerCase() != players[src].name.toLowerCase()) {
                sys.sendHtmlMessage(src, helpers.bot(bots.reverse) + "Error 403, that name is already in use.", channel);
                return;
            }
        }
        sys.changeName(src, newname);
        sys.sendHtmlAll(helpers.bot(bots.reverse) + "<b>" + helpers.user(name) + " reversed their name!</b>", channel);
    }
    
    ,
    
    reset: function (src, channel, command) {
        sys.changeName(src, players[src].name);
        sys.changeColor(src, players[src].color);
        sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(players[src].name) + " set their name and color back to their original states!</b>", channel);
    }
    
    ,
    
    resetname: function (src, channel, command) {
        sys.changeName(src, players[src].name);
        sys.sendHtmlAll(helpers.bot(bots.name) + "<b>" + helpers.user(players[src].name) + " set their name back to its original state!</b>", channel);
    }
    
    ,
    
    resetcolor: function (src, channel, command) {
        sys.changeColor(src, players[src].color);
        sys.sendHtmlAll(helpers.bot(bots.main) + "<b>" + helpers.user(sys.name(src)) + " set their " + command[0].slice(5) + " back to its original state!</b>", channel);
    }
    
    ,
    
    resetcolour: function (src, channel, command) {
        this.resetcolor(src, channel, command);
    }
    
    ,
    
    /**
        ---------------
        Message Options
        ---------------
    **/
    me: function (src, channel, command) {
        var name = sys.name(src), color = helpers.color(src);
        command.splice(0, 1);
        command = command.join(DELIMITER);
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " " + helpers.escapehtml(command) + " ***</b></font>", channel);
    }
    
    ,
    
    poke: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src), trgtt;
        command.splice(0, 1);
        command = command.join(DELIMITER);
        trgt = sys.id(command);
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " pokes " + helpers.escapehtml(command) + " ***</b></font>", channel);
        if (auth >= 1 && trgt) {
            sys.sendHtmlMessage(trgt, helpers.bot(bots.command) + " You got flashed by " + name + "!<ping/>");
        }
    }
    
    ,
    
    hug: function (src, channel, command) {
        var name = sys.name(src), color = helpers.color(src);
        command.splice(0, 1);
        command = command.join(DELIMITER);
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " hugged " + helpers.escapehtml(command) + ". ♥***</b></font>", channel);
    }
    
    ,
    
    listen: function (src, channel, command) {
        var name = helpers.escapehtml(sys.name(src)), color = helpers.color(src), link;
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (command.indexOf("www.youtube.com/watch?v=") != -1) {
            link = helpers.htmlLinks(command);
            sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " is listening to " + link + " d^_^b ***</b></font>", channel);
            return;
        }
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/><b>*** " + name + " is listening to " + helpers.escapehtml(command) + " d^_^b ***</b></font>", channel);
    }
    
    ,
    
    maps: function (src, channel, command) {
        var name = sys.name(src);
        command.splice(0, 1);
        command = command.join(DELIMITER);
        sys.sendAll(name + ": http://maps.google.com/maps?q=" + command, channel);
    }
    
    ,
    
    wiki: function (src, channel, command) {
        var name = sys.name(src);
        command.splice(0, 1);
        command = command.join(DELIMITER);
        sys.sendAll(name + ": http://en.wikipedia.org/wiki/" + command, channel);
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
    
    support: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src);
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, argument not found.");
            return;
        }
        if (!command[2]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, second argument not found.");
            return;
        }
        sys.sendHtmlAll("<font color='" + color + "'><timestamp/> <b>*** " + name + " supports " + helpers.escapehtml(command[1]) + " x " + helpers.escapehtml(command[2]) + " ***</b></font>", channel);
        var lower = command[1].toLowerCase(), lower2 = command[2].toLowerCase();
    }
    
    ,
    
    randomsupport: function (src, channel, command) {
        var name = sys.name(src), playerids = sys.playerIds(), random = sys.rand(0, sys.numPlayers()), random2 = sys.rand(0, sys.numPlayers()), name1, name2;
        !players[playerids[random]] ? name1 = sys.name(playerids[random]) : name1 = players[playerids[random]].name;
        !players[playerids[random2]] ? name2 = sys.name(playerids[random2]) : name2 = players[playerids[random2]].name;
        sys.sendHtmlAll("<font color='" + helpers.color(src) + "'><timestamp/><b>*** " + name + " supports " + name1 + " x " + name2 + " *** (random)</b></font>", channel);
    }
    
    ,
    
    imp: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src), message;
        if (!command[1]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 404, name not found. Please specify one!", channel);
            return;
        }
        if (!command[2]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 404, message not found. Please specify one!", channel);
            return;
        }
        if (auth < 1) {
            message = "<font color='" + color + "'><timestamp/> <b>" + helpers.escapehtml(command[1]) + ":</b></font> " + helpers.escapehtml(command[2]);
        } else {
            message = "<font color='" + color + "'><timestamp/> +<b><i>" + helpers.escapehtml(command[1]) + ":</i></b></font> " + helpers.escapehtml(command[2]);
        }
        sys.sendHtmlAll(message + " <small><b>-Imp by " + name + "</b></small>", channel);
    }
    
    ,
    
    impme: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src);
        if (!command[1]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 404, name not found. Please specify one!", channel);
            return;
        }
        if (!command[2]) {
            sys.sendHtmlMessage(src, helpers.bot(bots.name) + "Error 404, message not found. Please specify one!", channel);
            return;
        }
        var message = "<font color='" + color + "'><timestamp/> <b>*** " + helpers.escapehtml(command[1]) + " " + helpers.escapehtml(command[2]) + " ***</b></font>";
        sys.sendHtmlAll(message + " <small><b>-Imp by " + name + "</b></small>", channel);
    }
    
    ,
    
    future: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src), message, lower, time, unit, derp;
        var units = ["s", "m", "h", "d", "seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, message not found.");
            return;
        }
        message = command[1];
        lower = command[1].toLowerCase();
        if (!command[2]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, time not found.");
            return;
        }
        if (command[2].indexOf(" ") != -1) {
            command[2] = command[2].split(" ");
            time = command[2][0];
            unit = command[2][1];
        } else {
            derp = command[2].split("");
            time = "", unit = "";
            for (var index in derp) {
                if (!isNaN(derp[index])) {
                    time += derp[index];
                } else {
                    unit += derp[index];
                }
            }
            time = parseInt(time);
        }
        if (isNaN(time) || time < 1) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, invalid time.");
            return;
        }
        if (!helpers.isInArray(unit, units)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, invalid unit.");
            return;
        }
        unit = helpers.timeplurality(time, unit);
        var milliseconds = helpers.toseconds(time, unit) * 1000;
        if (auth < 1) {
            message = "<font color='" + color + "'><timestamp/> <b>" + name + ":";
        } else {
            message = "<font color='" + color + "'><timestamp/> +<b><i>" + name + ":</i>";
        }
        message += "</b></font> " + helpers.escapehtml(command[1]) + "<b><small> -Sent " + time + " " + unit + " ago</small></b>";
        sys.setTimer(function () {
            if (command[1][0] == COMMAND_SYMBOL && command[1].length > 1) {
                message = "<timestamp/><b><small> -" + name + ", sent " + time + " " + unit + " ago</small></b>";
                parseCommand(src, command[1], channel, name, auth, false);
            } else {
                sys.sendHtmlAll(message, channel);
            }
        }, milliseconds, 0);
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "Your message has been sent " + time + " " + unit + " into the future!", channel);
    }
    
    ,
    
    quote: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), quote = "<style type='text/css'>table {border-width:1px; border-style:solid; border-color:#000;}" +
        "thead {font-weight:bold;}</style><table cellpadding=2 cellspacing=0><tr style='background-color:#b0b0b0;'><td>";
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
            return;
        }
        if (!command[2]) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, author not found.");
            return;
        }
        command[1] = helpers.escapehtml(command[1]);command[2] = helpers.escapehtml(command[2]);
        quote += "<font size='8'>\"</font>" + command[1] + "<font size='8'>\"</font></td></tr></table><br>~" + command[2] + "<br>";
        sys.sendHtmlAll(helpers.bot(bots.main) + name + " posted the following quote:", channel);
        sys.sendHtmlAll(quote, channel);
    }
    
    ,
    
    spoiler: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), text = command[1], origin, firstchar;
        if (!text) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, text not found.");
            return;
        }
        text = text.replace(/\s{2,}/g, " ");
        if (text.charAt(0) == ' ') {
            text = text.slice(1);
        }
        origin = (command[2] ? command[2] : ' ');
        if (origin !== ' ') {
            origin = (helpers.isVowel(origin.charAt(0)) ? "n " + origin : ' ' + origin) + ' ';
        }
        sys.sendHtmlAll(helpers.bot(bots.warn) + "CAUTION! " + name + " posted a" + origin + "spoiler! <font style='background-color: black;'>" + helpers.escapehtml(text) + "</font>", channel);
    }
};
