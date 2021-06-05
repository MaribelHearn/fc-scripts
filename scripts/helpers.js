/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY HELPER METHODS helpers.js
     - by Maribel Hearn, 2012-2020,
       with tournament methods by Lutra and
       pokemon db methods from main server
       scripts

    This script file contains utility
    methods that almost every other
    script file uses.
    ----------------------------------------------
*/

helpers = {
    defaultValue: function (dataFile, type) {
        var values = {
            "botcolor": "#318739",
            "botsymbol": "±",
            "botsymbolcolor": "#318739",
            "servertopic": "Welcome to ~Server~!",
            "bordercolor": "#00008B",
            "servertopiccolor": "#FF0000",
            "channeltopiccolor": "#FFA500",
            "welcomemessage": "Please welcome ~Player~ to ~Server~!",
            "leavemessage": "~Player~ has left ~Server~!",
            "channelwelcomemessage": "Please welcome ~Player~ to ~Channel~!",
            "channelleavemessage": "~Player~ has left ~Channel~!",
            "silencemessage": "This channel has been silenced by ~Player~!",
            "unsilencemessage": "This channel has been unsilenced by ~Player~! Everyone can talk again!",
            "nopermissionmessage": "Can't let you do that, Star ~Player~!",
            "border": "<font color='#00008B'><b>" +
                ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></b></font>",
            "border2": "<font color='#00008B'><b>" +
                "&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;" +
                "&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;" +
                "&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</b></font>",
            "cmdcolors": ["#4169E1","#008000","#FF0000","#FFA500","#FFD700","#0000FF"],
            "listcolors": {"mute":"#1E90FF","ban":"#FF6900","rangeban":"#008000","megaban":"#800080","gigaban":"#AA0000"},
            "bots": {"attack":"AttackBot","armyof":"ArmyBot","auth":"AuthBot","ban":"BanBot",
                "battle":"BattleBot","caps":"CapsBot","channel":"ChannelBot","clear":"ClearBot","command":"CommandBot",
                "cow":"Miltank","flood":"FloodBot","fun":"FunBot","gigaban":"GigabanBot","idle":"IdleBot","kick":"KickBot",
                "main":"Bot","megaban":"MegabanBot","mute":"MuteBot","name":"NameBot","party":"PartyBot","pass":"PassBot",
                "priv":"PrivacyBot","reverse":"ReverseBot","rr":"RussiaBot","russia":"RussiaBot","safari":"SafariBot",
                "script":"ScriptBot","silence":"SilenceBot","spy":"WatchBot","starfox":"Wolf","status":"StatusBot",
                "tour":"TourBot","topic":"TopicBot","warn":"WarnBot","welcome":"WelcomeBot","roulette": "RouletteBot"},
            "allowance": 8,
            "floodtime": 10,
            "floodlevel": 1,
            "updatefrequency": 3600,
            "allowed": ["127.0.0.1"],
            "allowedrange": ["192.168"],
            "permchannels": ["Watch", "Auth Channel", "Owner Channel"],
            "silentcommands": ["future", "spoiler", "seval", "sseval", "skick", "invisibleowner", "invisible", "invis",
                "silentupdate", "silenteval", "secretsilenteval", "silentkick", "supdate", "silentupdateplugin", "supdateplugin"],
            "rules": {"rules":["No spamming (including challenge spamming), trolling, flaming, bashing or advertising. ",
                "No abusing commands or auth powers.", "Do not talk about inappropriate or obscene subjects, " +
                "nor mention words that refer to such.", "No asking for auth.", "Do not attempt to circumvent the rules."],
                "explanations":["These things cause disorder in the chat. You can get kicked, muted or banned depending on how " +
                "severely you are breaking this rule.","This should make sense without any explanation. " +
                "Commands exist to be used for what they are meant for, not for mistakes to be exploited. " +
                "The same goes for auths; do what you should do and not beyond that.",
                "Anything inappropriate or obscene will result in a mute, or ban after multiple occasions.",
                "You may get auth when recognized for coming on a lot, chat activity, good behaviour and maybe even contribution. " +
                "Asking for it will not get you any further.","Taking the rules too literally is no use when you know you are " +
                "supposed to be punished anyway. Do not try to find loopholes in the rules, it will result in even more punishment."]}
        };
        if (values.hasOwnProperty(dataFile)) {
            return values[dataFile];
        }
        switch (type) {
            case "number": return 0;
            case "boolean": return true;
            case "array": return [];
            case "object": return {};
            default: return "";
        }
    }

    ,

    initCustoms: function () {
        var dataFiles = {
            "botcolor": "string",
            "botsymbol": "string",
            "servertopic": "string",
            "botsymbolcolor": "string",
            "bordercolor": "string",
            "servertopiccolor": "string",
            "channeltopiccolor": "string",
            "welcomemessage": "string",
            "leavemessage": "string",
            "channelwelcomemessage": "string",
            "channelleavemessage": "string",
            "silencemessage": "string",
            "unsilencemessage": "string",
            "nopermissionmessage": "string",
            "border": "string",
            "border2": "string",
            "cmdcolors": "array",
            "listcolors": "object",
            "bots": "object",
            "authtitles": "object",
            "selfkickmessages": "object",
            "kickmessages": "object",
            "mutemessages": "object",
            "banmessages": "object",
            "rangebanmessages": "object"
        }, dataFile, defaultVal;
        for (dataFile in dataFiles) {
            defaultVal = this.defaultValue(dataFile, dataFiles[dataFile]);
            sys.write(DATA_FOLDER + dataFile + ".txt", (typeof(defaultVal) == "object" ? JSON.stringify(defaultVal) : defaultVal));
        }
        if (pluginLoaded["funcmds.js"]) {
            sys.write(DATA_FOLDER + "bigtexts.txt", "{}");
        } else if (sys.fexists(DATA_FOLDER + "bigtexts.txt")) {
            sys.rm(DATA_FOLDER + "bigtexts.txt");
        }
    }

    ,

    initData: function () {
        var dataFiles = {
            "open": "boolean",
            "allowance": "number",
            "floodtime": "number",
            "floodlevel": "number",
            "maxplayers": "number",
            "updatefrequency": "number",
            "API_KEY": "string",
            "GOOGLE_KEY": "string",
            "UPDATE_KEY": "string",
            "latestshahash": "string",
            "allowed": "array",
            "exceptions": "array",
            "permchannels": "array",
            "allowedrange": "array",
            "namestounban": "array",
            "silentcommands": "array",
            "nameblocklist": "array",
            "rules": "object",
            "regchannels": "object",
            "banlist": "object",
            "mutelist": "object",
            "timezone": "object",
            "operatingsystem": "object",
            "megabanlist": "object",
            "gigabanlist": "object",
            "countryname": "object",
            "rangebanlist": "object"
        }, dataFile, defaultVal;
        sys.mkdir("data");
        for (dataFile in dataFiles) {
            defaultVal = this.defaultValue(dataFile, dataFiles[dataFile]);
            sys.write(DATA_FOLDER + dataFile + ".txt", (typeof(defaultVal) == "object" ? JSON.stringify(defaultVal) : defaultVal));
        }
        permchannels = JSON.parse(this.defaultValue("permchannels"));
        if (pluginLoaded["party.js"]) {
            permchannels.push("Party");
            sys.write(DATA_FOLDER + "permchannels.txt", JSON.stringify(permchannels));
        }
        if (pluginLoaded["roulette.js"]) {
            permchannels.push("Roulette");
            sys.write(DATA_FOLDER + "permchannels.txt", JSON.stringify(permchannels));
        }
        if (pluginLoaded["rr.js"]) {
            permchannels.push("Russian Roulette");
            sys.write(DATA_FOLDER + "permchannels.txt", JSON.stringify(permchannels));
        }
        if (pluginLoaded["safari.js"]) {
            permchannels.push("Safari");
            sys.write(DATA_FOLDER + "permchannels.txt", JSON.stringify(permchannels));
        }
        this.initCustoms();
    }

    ,

    readData: function (dataFile) {
        if (!sys.fexists(DATA_FOLDER + dataFile + ".txt")) {
            sys.write(DATA_FOLDER + dataFile + ".txt", this.defaultValue(dataFile));
            print("Missing data file " + dataFile + ".txt created");
            return "";
        }
        return sys.read(DATA_FOLDER + dataFile + ".txt");
    }

    ,

    readNumber: function (dataFile) {
        if (!sys.fexists(DATA_FOLDER + dataFile + ".txt")) {
            sys.write(DATA_FOLDER + dataFile + ".txt", this.defaultValue(dataFile));
            print("Missing data file " + dataFile + ".txt created");
            return 0;
        }
        return parseInt(this.readData(dataFile));
    }

    ,

    readBoolean: function (dataFile) {
        if (!sys.fexists(DATA_FOLDER + dataFile + ".txt")) {
            sys.write(DATA_FOLDER + dataFile + ".txt", this.defaultValue(dataFile));
            print("Missing data file " + dataFile + ".txt created");
            return true;
        }
        return this.readData(dataFile) == "true" ? true : false;
    }

    ,

    readArray: function (dataFile) {
        if (!sys.fexists(DATA_FOLDER + dataFile + ".txt")) {
            sys.write(DATA_FOLDER + dataFile + ".txt", JSON.stringify(this.defaultValue(dataFile)));
            print("Missing data file " + dataFile + ".txt created");
            return [];
        }
        try {
            return JSON.parse(this.readData(dataFile));
        } catch (err) {
            print("JSON data file " + dataFile + ".txt failed to parse: " + err);
            return [];
        }
    }

    ,

    readObject: function (dataFile) {
        if (!sys.fexists(DATA_FOLDER + dataFile + ".txt")) {
            sys.write(DATA_FOLDER + dataFile + ".txt", JSON.stringify(this.defaultValue(dataFile)));
            print("Missing data file " + dataFile + ".txt created");
            return {};
        }
        try {
            return JSON.parse(this.readData(dataFile));
        } catch (err) {
            print("JSON data file " + dataFile + ".txt failed to parse: " + err);
            return {};
        }
    }

    ,

    saveData: function (dataFile) {
        var data = (typeof(global[dataFile]) == "object" ? JSON.stringify(global[dataFile]) : global[dataFile]);
        sys.write(DATA_FOLDER + (dataFile.match("KEY") ? dataFile : dataFile.toLowerCase()) + ".txt", data);
    }

    ,

    setVariable: function (variable, data) {
        if (typeof(global[variable]) == "undefined") {
            global[variable] = data;
        }
    }

    ,

    initCustomGlobals: function () {
        botcolor = this.readData("botcolor");
        botsymbol = this.readData("botsymbol");
        servertopic = this.readData("servertopic");
        botsymbolcolor = this.readData("botsymbolcolor");
        borderColor = this.readData("bordercolor");
        serverTopicColor = this.readData("servertopiccolor");
        channelTopicColor = this.readData("channeltopiccolor");
        welcomeMessage = this.readData("welcomemessage");
        leaveMessage = this.readData("leavemessage");
        channelWelcomeMessage = this.readData("channelwelcomemessage");
        channelLeaveMessage = this.readData("channelleavemessage");
        noPermissionMessage = this.readData("nopermissionmessage");
        silenceMessage = this.readData("silencemessage");
        unsilenceMessage = this.readData("unsilencemessage");
        cmdcolors = this.readArray("cmdcolors");
        listcolors = this.readObject("listcolors");
        bots = this.readObject("bots");
        authtitles = this.readObject("authtitles");
        selfkickmessages = this.readObject("selfkickmessages");
        kickmessages = this.readObject("kickmessages");
        mutemessages = this.readObject("mutemessages");
        banmessages = this.readObject("banmessages");
        rangebanmessages = this.readObject("rangebanmessages");
        this.setVariable("border", this.readData("border"));
        this.setVariable("border2", this.readData("border2"));
    }

    ,

    initServerGlobals: function () {
        open = this.readBoolean("open");
        latestShaHash = this.readData("latestshahash");
        updateFrequency = this.readNumber("updatefrequency");
        allowance = this.readNumber("allowance");
        floodtime = this.readNumber("floodtime");
        floodlevel = this.readNumber("floodlevel");
        maxplayers = this.readNumber("maxplayers");
        allowed = this.readArray("allowed");
        exceptions = this.readArray("exceptions");
        permchannels = this.readArray("permchannels");
        allowedrange = this.readArray("allowedrange");
        namestounban = this.readArray("namestounban");
        nameblocklist = this.readArray("nameblocklist");
        silentcommands = this.readArray("silentcommands");
        rules = this.readObject("rules");
        banlist = this.readObject("banlist");
        mutelist = this.readObject("mutelist");
        timezone = this.readObject("timezone");
        cityname = this.readObject("cityname");
        versions = this.readObject("versions");
        members = this.readObject("members");
        operatingsystem = this.readObject("operatingsystem");
        regchannels = this.readObject("regchannels");
        megabanlist = this.readObject("megabanlist");
        gigabanlist = this.readObject("gigabanlist");
        countryname = this.readObject("countryname");
        rangebanlist = this.readObject("rangebanlist");
    }

    ,

    initTempVars: function () {
        this.setVariable("stopbattles", false);
        this.setVariable("megabancheck", false);
        this.setVariable("gigabancheck", false);
        this.setVariable("serverStarting", false);
        this.setVariable("timer", 0);
        this.setVariable("currentSpoiler", 0);
        this.setVariable("layout", "new");
        this.setVariable("hostIp", "");
        this.setVariable("hostCountry", "");
        this.setVariable("hostCity", "");
        this.setVariable("hostTimeZone", "");
        this.setVariable("players", []);
        this.setVariable("floodplayers", []);
        this.setVariable("spoilers", []);
        this.setVariable("tour", {});
        this.setVariable("battles", {});
        this.setVariable("heightList", {});
        this.setVariable("weightList", {});
        this.setVariable("movepoolList", {});
        this.setVariable("powerList", {});
        this.setVariable("categoryList", {});
        this.setVariable("accList", {});
        this.setVariable("ppList", {});
        this.setVariable("moveEffList", {});
        this.setVariable("moveFlagList", {});
        this.setVariable("movePriorityList", {});
        this.setVariable("moveRangeList", {});
        this.setVariable("abilityList", {});
        this.setVariable("pokemonWithAbilityList", {});
        this.setVariable("itemList", {});
        this.setVariable("berryList", {});
        this.setVariable("flingPowerList", {});
        this.setVariable("berryPowerList", {});
        this.setVariable("berryTypeList", {});
    }

    ,

    /**
        ----------------
        Checking Helpers
        ----------------
    **/
    isMutable: function (command) {
        return /sendAll|sendHtmlAll|sendHtmlMain|sendHtmlAuths|sendHtmlAuth|sendHtmlOwner/.test(command.toString());
    }

    ,

    isAndroid: function (src) {
        return sys.os(src) == "android";
    }

    ,

    isWeb: function (src) {
        return sys.os(src) == "webclient";
    }

    ,

    isAndroidOrWeb: function (src) {
        return sys.os(src) == "android" || sys.os(src) == "webclient";
    }

    ,

    isLetter: function (c) {
        var lower = c.toLowerCase();
        return lower >= 'a' && lower <= 'z';
    }

    ,

    isVowel: function (letter) {
        letter = letter.toLowerCase();
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u';
    }

    ,

    isHexColor: function (code) {
        return /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(code);
    }

    ,

    floodCheck: function (src, channelname) {
        var auth = (sys.auth(src) == 10 ? 3 : sys.auth(src));
        if (regchannels[channelname]) {
            if (regchannels[channelname].flood) {
                return false;
            }
            if (players[src].floodcount > allowance) {
                floodplayers.splice(floodplayers.indexOf(src), 1);
                if (players[src].floodcount != Infinity && auth < floodlevel) {
                    return true;
                }
                players[src].floodcount = Infinity;
            }
            return false;
        }
        if (players[src].floodcount > allowance) {
            floodplayers.splice(floodplayers.indexOf(src), 1);
            if (players[src].floodcount != Infinity && auth < floodlevel) {
                return true;
            }
            players[src].floodcount = Infinity;
        }
        return false;
    }

    ,

    muteCheck: function (name) {
        for (var i in mutelist) {
            if (sys.dbIp(name) == mutelist[i].ip) {
                return true;
            }
        }
        return false;
    }

    ,

    cmuteCheck: function (name, lower) {
        if (regchannels[lower]) {
            return regchannels[lower].mutelist[name.toLowerCase()] || regchannels[lower].mutedips[sys.dbIp(name)];
        }
        return false;
    }

    ,

    closeCheck: function (src, name, lower) {
        return regchannels[lower].close > sys.auth(src) && regchannels[lower].close > helpers.cauth(name.toLowerCase(), sys.channelId(lower));
    }

    ,

    /**
        --------------
        Method Helpers
        --------------
    **/
    starfox: function (src, channel, command, bot, message, team) {
        var name = sys.name(src), channelname = sys.channel(channel), index = 0, regular = 0;
        sys.sendHtmlMessage(src, this.bot(bot) + message, channel);
        if (regchannels[channelname.toLowerCase()]) {
            if (regchannels[channelname.toLowerCase()].priv) {
                return;
            }
        }
        if (command) {
            cmd = (typeof(command) == "string" ? command : command.join(DELIMITER).replace(DELIMITER, ' '));
            if ((message.indexOf("Error 403, ") != -1 || bot == bots.starfox) && message != "Error 403, you are not allowed to post banned links or characters.") {
                sys.sendHtmlWatch(this.bot(bots.spy ) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b><font color='" + this.color(src) + "'>" + this.escapehtml(name) + "</font></b> got Star Fox'd because of trying to run /" + this.escapehtml(cmd) + " (Error 403 Forbidden).");
            } else if (message.indexOf("Error 404, ") != -1) {
                sys.sendHtmlWatch(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b><font color='" + this.color(src) + "'>" + this.escapehtml(name) + "</font></b> got Star Fox'd because of trying to run /" + this.escapehtml(cmd) + " (Error 404 Not Found).");
            } else if (message.indexOf("Error 400, ") != -1) {
                sys.sendHtmlWatch(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b><font color='" + this.color(src) + "'>" + this.escapehtml(name) + "</font></b> got Star Fox'd because of trying to run /" + this.escapehtml(cmd) + " (Error 400 Bad Request).");
            } else if (message.indexOf("I KILL YOOOOUUUU!!!") != -1 || message.indexOf("Sorry, this channel is currently silenced.") != -1) {
                sys.sendHtmlWatch(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b><font color='" + this.color(src) + "'>" + this.escapehtml(name) + "</font></b> got Star Fox'd because of trying to post during silence.");
            } else if (message == "You tried.") {
                sys.sendHtmlWatch(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b><font color='" + this.color(src) + "'>" + this.escapehtml(name) + "</font></b> got Star Fox'd because of trying to kill Chuck Norris. How silly.");
            } else if (message == "Error 403, you are not allowed to post banned links or characters.") {
                sys.sendHtmlWatch(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b><font color='" + this.color(src) + "'>" + name + "</font></b> tried to  post (a) banned link(s) or character(s). (Error 403 Forbidden)");
            } else {
                sys.sendHtmlWatch(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b><font color='" + this.color(src) + "'>" + this.escapehtml(name) + "</font></b> got Star Fox'd because of trying to run /" + this.escapehtml(cmd) + ".");
            }
        } else {
            if (message.indexOf("I KILL YOOOOUUUU!!!") != -1 || message.indexOf("Sorry, this channel is currently silenced.") != -1) {
                sys.sendHtmlWatch(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b><font color='" + this.color(src) + "'>" + this.escapehtml(name) + "</font></b> got Star Fox'd because of trying to talk during silence.");
            } else {
                sys.sendHtmlWatch(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname + "</a>] <b><font color='" + this.color(src) + "'>" + this.escapehtml(name) +
                "</font></b> got Star Fox'd.");
            }
        }
    }

    ,

    muteMessage: function (src, channel, message) {
        var alts = sys.aliases(sys.ip(src)), lower;
        for (var i in alts) {
            if (mutelist[alts[i]]) {
                lower = alts[i];
            }
        }
        if (mutelist[lower].silent) {
            var name = (members[lower] ? members[lower] : lower);
            if (message.charAt(0) == '/' && message.length > 1) {
                helpers.starfox(src, channel, command, bots.starfox, noPermissionMessage.replace(/~Player~/, name));
                return;
            }
            sys.sendMessage(src, name + ": " + message, channel);
            return;
        }
        sys.sendHtmlMessage(src, this.bot(bots.mute) + "Sorry, you are muted on the server. [Time until expiration: " + this.formatJusticeTime(mutelist[lower].time) +
        "] [Reason: " + mutelist[lower].reason + "]", channel);
    }

    ,

    channelMuteMessage: function (src, channel) {
        sys.sendHtmlMessage(src, this.bot(bots.mute) + "Sorry, you are muted on this channel.", channel);
    }

    ,

    silenceMessage: function (src, channel) {
        sys.sendHtmlMessage(src, this.bot(bots.silence) + (bots.silence == "Achmed the Dead Terrorist" ? "I KILL YOOOOUUUU!!!" : "Sorry, this channel is currently silenced."), channel);
    }

    ,

    reset: function (src) {
        sys.changeName(src, players[src].name);
    }

    ,

    formatEvent: function (event) {
        var eventFormats = {"frenzy": "<b>Shiny Frenzy</b>", "fest": "<b>Chainfest</b>", "legendary": "<b>Legendary Swarm</b>"};
        return (eventFormats[event] ? eventFormats[event] : "<b>Typeframe</b>");
    }

    ,

    /**
        --------------
        Return Helpers
        --------------
    **/
    originalToID: function (name) {
        for (var i in players) {
            if (players[i].name.toLowerCase() == name.toLowerCase()) {
                return i;
            }
        }
        return false;
    }

    ,

    calcDamage: function (attack, defense, power, modifier) {
        // assumes the attacking Pokémon is level 100
        var damage = Math.floor((0.84 * (attack / defense) * power + 2) * modifier);
        return [Math.floor(damage * 0.85), damage];
    }

    ,

    timePassed: function (color, lastMessageTime) {
        var timePassed = new Date() - lastMessageTime, unit;
        timePassed = Math.round(timePassed / 1000);
        unit = (timePassed == 1 ? "second" : "seconds");
        if (timePassed > 60) {
            timePassed = Math.round(timePassed / 60);
            unit = (timePassed == 1 ? "minute" : "minutes");
        }
        if (timePassed > 60) {
            timePassed = Math.round((timePassed / 60) * 10) / 10;
            unit = (timePassed == 1 ? "hour" : "hours");
        }
        if (isNaN(timePassed)) {
            timePassed = "";
            unit = "";
        }
        if (unit == "minutes" && timePassed > 5 && timePassed <= 15) {
            color = "#FFA500";
        } else if ((unit == "minutes" && timePassed > 15) || unit == "hour") {
            color = "#FF4500";
        } else if (unit == "hours") {
            color = "#FF0000";
        } else {
            color = "#008000";
        }
        return "<b><font color='" + color + "'>(" + timePassed + " " + unit + " ago)</font></b>";
    }

    ,

    imageIndex: function (src) {
        var imageIndex = sys.auth(src);
        if (imageIndex > 3) {
            imageIndex = 0;
        }
        if (sys.battling(src)) {
            imageIndex += 8;
        } else if (sys.away(src)) {
            imageIndex += 4;
        }
        return imageIndex;
    }

    ,

    channelLink: function (channelName) {
        return "<a href='po:join/" + channelName + "'>#" + channelName + "</a>";
    }

    ,

    battleLink: function (battle) {
        return "<a href='po:watch/" + battle + "'>Watch</a>";
    }

    ,

    syntaxHighlight: function (code) {
        var KEYWORDS = ["abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger",
        "default", "delete", "do", "double", "else", "enum", "export", "extends", "final", "finally", "float", "for", "function",
        "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "long", "native", "new", "package", "private",
        "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient",
        "try", "typeof", "var", "void", "volatile", "while", "with", "true", "false", "prototype"];
        var NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var index = 0, pattern, pattern1, pattern2;
        code = code.replace(/;/g, ";<br>").replace(/\}/g, "}<br>").replace(/\{/g, "{<br>");
        if (code.substr(code.length - 4) == "<br>") {
            code = code.slice(0, -4);
        }
        for (var i in KEYWORDS) {
            pattern1 = new RegExp(KEYWORDS[i] + ' ', "g");
            pattern2 = new RegExp(' ' + KEYWORDS[i], "g");
            code = code.replace(pattern1, "<b><font color='#00008B'>" + KEYWORDS[i] + "</font></b> ");
            code = code.replace(pattern2, " <b><font color='#00008B'>" + KEYWORDS[i] + "</font></b>");
        }
        for (var i in NUMBERS) {
            pattern = new RegExp(NUMBERS[i], "g");
            if (pattern.test(this.strip(code))) {
                code = code.replace(pattern, "<font color='#FF4500'>" + NUMBERS[i] + "</font>");
            }
        }
        while (code.indexOf('"') != -1) {
            code = code.replace('"', (index % 2 === 0 ? "<font color='#808080'>&quot;" : "&quot;</font>"));
            index++;
        }
        code = code.replace(/\/\*/g, "<font color='#008000'>/*").replace(/\*\//g, "*/</font>");
        return code;
    }

    ,

    sum: function (array) {
        var sum = 0;
        for (var i in array) {
            sum += parseInt(array[i]);
        }
        return sum;
    }

    ,

    timestampify: function (time) { // time must be a date object
        var hours = JSON.stringify(time.getHours());
        if (hours.length == 1) {
            hours = "0" + hours;
        }
        var minutes = JSON.stringify(time.getMinutes());
        if (minutes.length == 1) {
            minutes = "0" + minutes;
        }
        var seconds = JSON.stringify(time.getSeconds());
        if (seconds.length == 1) {
            seconds = "0" + seconds;
        }
        return "(" + hours + ":" + minutes + ":" + seconds + ")";
    }

    ,

    type: function (variable) {
        return variable.constructor.toString().replace("function ", "").replace("native code", "").replace(/[^A-Za-z]/g, "");
    }

    ,

    bannedchars: function (string) {
        if (CYRILLIC.test(string)) {
            return [true, "Cyrillic that is similar to letters"];
        } else if (GREEK.test(string)) {
            return [true, "Greek that is similar to letters"];
        } else if (HEBREW.test(string)) {
            return [true, "Hebrew"];
        } else if (ARABIC.test(string)) {
            return [true, "Arabic"];
        } else if (THAI.test(string)) {
            return [true, "Thai"];
        } else if (ZALGO.test(string)) {
            return [true, "zalgo"];
        } else if (FAKEI.test(string)) {
            return [true, "a fake I"];
        } else if (SPACE.test(string)) {
            return [true, "space characters"];
        } else if (DASH.test(string)) {
            return [true, "dash characters"];
        } else if (SPECIAL.test(string) || OTHER.test(string)) {
            return [true, "special characters"];
        } else {
            return [false, ""];
        }
    }

    ,

    countryRetrievalUrl: function (ip) {
        return "http://api.ipinfodb.com/v3/ip-city/?key=" + API_KEY + "&ip=" + ip + "&format=json";
    }

    ,

    mapsUrl: function (city, country) {
        return "https://www.google.com/maps?q=" + city + ", " + country;
    }

    ,

    youtubeDataUrl: function (video) {
        if (GOOGLE_KEY === "") {
            return false;
        }
        return "https://www.googleapis.com/youtube/v3/videos?id=" + video + "&key=" + GOOGLE_KEY + "&part=snippet,contentDetails,statistics,status";
    }

    ,

    countrydata: function (country) {
        if (country == '-' || country === "") {
            return hostCountry;
        } else if (country == "Puerto Rico") {
            return "United States (Puerto Rico)";
        } else if (country == "Virgin Islands, U.S.") {
            return "United States (Virgin Islands)";
        } else if (country == "United Arab Emirates") {
            return "U.A.E.";
        } else if (country == "Venezuela, Bolivarian Republic of") {
            return "Venezuela";
        } else if (country == "Korea, Republic of") {
            return "South Korea";
        } else if (country == "Iran, Islamic Republic of") {
            return "Iran";
        } else if (country == "Taiwan, Province of China") {
            return "China (Taiwan)";
        } else if (country == "Brunei Darussalam") {
            return "Brunei";
        } else if (country == "Russian Federation") {
            return "Russia";
        } else if (country == "Hong Kong") {
            return "China (Hong Kong)";
        } else if (country == "Macao") {
            return "China (Macao)";
        } else if (country == "Moldova, Republic") {
            return "Moldova";
        } else if (country == "Macedonia, The") {
            return "Macedonia";
        } else if (country == "Viet Nam") {
            return "Vietnam";
        } else if (country == "Martinique") {
            return "France (Martinique)";
        } else if (country == "Guadeloupe") {
            return "France (Guadeloupe)";
        } else if (country == "Reunion") {
            return "France (Reunion)";
        } else if (country == "Bolivia, Plurinational State of") {
            return "Bolivia";
        } else if (country == "Curacao") {
            return "Netherlands (Curacao)";
        } else if (country == "Sint Maarten (Dutch Part)") {
            return "Netherlands (Sint Maarten)";
        } else if (country == "Cote D'ivoire") {
            return "Ivory Coast";
        } else if (country == "Anguilla") {
            return "Anguilla (United Kingdom)";
        } else if (country == "Cabo Verde") {
            return "Cape Verde";
        } else if (country == "Palestine, State of") {
            return "Palestine";
        } else if (country == "Syrian Arab Republic") {
            return "Syria";
        } else {
            return country;
        }
    }

    ,

    toFlagKey: function (country) {
        country = this.removespaces(country).toUpperCase();
        if (country == "U.A.E.") {
            return "UAE";
        } else if (country == "CHINA(TAIWAN)" || country == "CHINA(HONGKONG)" || country == "CHINA(MACAO)") {
            return "CHINA";
        } else if (country == "UNITEDSTATES(PUERTORICO)" || country == "UNITEDSTATES(VIRGINISLANDS)") {
            return "UNITEDSTATES";
        } else if (country == "FRANCE(MARTINIQUE)" || country == "FRANCE(GUADELOUPE)" || country == "FRANCE(REUNION)") {
            return "FRANCE";
        } else if (country == "NETHERLANDS(CURACAO)" || country == "NETHERLANDS(SINTMAARTEN)") {
            return "NETHERLANDS";
        } else if (country == "COTED'IVOIRE") {
            return "IVORYCOAST";
        } else if (country == "ANGUILLA(UNITEDKINGDOM)") {
            return "UNITEDKINGDOM";
        } else {
            return country;
        }
    }

    ,

    citydata: function (city) {
        if (city == '-' || city === "") {
            return hostCity;
        } else {
            if (city.indexOf(' ') != -1) {
                city = city.split(' ');
                for (var index in city) {
                    city[index] = this.cap(city[index].toLowerCase());
                }
                city = city.join(' ');
                return city;
            } else {
                return this.cap(city.toLowerCase());
            }
        }
    }

    ,

    timezonedata: function (country, zone) {
        if (country == '-' || country === "") {
            return hostTimeZone;
        } else {
            return zone;
        }
    }

    ,

    formatJusticeTime: function (justiceTime) { // justiceTime is in seconds
        var str = "", days = 0, hours = 0, minutes = 0, seconds = 0;
        if (justiceTime == '-') {
            return "indefinite";
        }
        if (isNaN(justiceTime)) {
            return justiceTime;
        }
        if (justiceTime === null) {
            return "indefinite";
        }
        while (justiceTime >= 86400) {
            days += 1;
            justiceTime -= 86400;
        }
        if (days >= 1) {
            str += days + " days, ";
        }
        while (justiceTime >= 3600) {
            hours += 1;
            justiceTime -= 3600;
        }
        if (hours >= 1) {
            str += hours + " hours, ";
        }
        while (justiceTime >= 60) {
            minutes += 1;
            justiceTime -= 60;
        }
        if (minutes >= 1) {
            str += minutes + " minutes and ";
        }
        while (justiceTime >= 1) {
            seconds += 1;
            justiceTime -= 1;
        }
        if (seconds >= 1) {
            str += seconds + " seconds";
        }
        return str;
    }

    ,

    formatUptime: function (uptime) { // uptime is in milliseconds
        var days = 0, hours = 0, minutes = 0, seconds = 0;
        while (uptime >= 86400000) {
            days += 1;
            uptime -= 86400000;
        }
        while (uptime >= 3600000) {
            hours += 1;
            uptime -= 3600000;
        }
        while (uptime >= 60000) {
            minutes += 1;
            uptime -= 60000;
        }
        while (uptime >= 1000) {
            seconds += 1;
            uptime -= 1000;
        }
        if (uptime >= 500) {
            seconds += 1;
        }
        return days + " days, " + hours + " hours, " + minutes + " minutes and " + seconds + " seconds.";
    }

    ,

    formatLastOn: function (src, lastlogin) {
        return (timezone[players[src].name.toLowerCase()] ? this.toTimeZone(lastlogin, timezone[players[src].name.toLowerCase()].split(':')[0]) : lastlogin).split('.')[0].replace('T', ", ");
    }

    ,

    secondsToWording: function (seconds) {
        var result = [], days = 0, hours = 0, minutes = 0;

        while (seconds >= 86400) {
            days += 1;
            seconds -= 86400;
        }
        while (seconds >= 3600) {
            hours += 1;
            seconds -= 3600;
        }
        while (seconds >= 60) {
            minutes += 1;
            seconds -= 60;
        }

        if (days >= 1) {
            result.push(days + " day" + (days != 1 ? "s" : ""));
        }
        if (hours >= 1) {
            result.push(hours + " hour" + (hours != 1 ? "s" : ""));
        }
        if (minutes >= 1) {
            result.push(minutes + " minute" + (minutes != 1 ? "s" : ""));
        }
        if (seconds >= 1) {
            result.push(seconds + " second" + (seconds != 1 ? "s" : ""));
        }

        return result.join(", ");
    }

    ,

    version: function (version) {
        switch (version) {
            case 2630:
                return "2.6.3";
            case 2621:
                return "2.6.2.1";
            case 2620:
                return "2.6.2";
            case 2601:
                return "2.6.1";
            case 2600:
                return "2.6.0";
            case 2520:
                return "2.5.2";
            case 2510:
                return "2.5.1";
            case 2500:
                return "2.5.0";
            case 2402:
                return "2.4.2";
            case 2302:
                return "2.3.2 / 2.4.0 / 2.4.1";
            case 2209:
                return "2.2.9";
            case 2205:
                return "2.2.5";
            case 2203:
                return "2.2.3 / 2.2.4";
            case 2202:
                return "2.2.2";
            case 2201:
                return "2.2.1";
            case 2200:
                return "2.2.0";
            case 2100:
                return "2.1.0 / 2.1.1 / 2.1.2";
            case 2020:
                return "2.0.20 / 2.0.21 / 2.0.22";
            case 2010:
                return "2.0.1";
            case 2007:
                return "2.0.07";
            case 2006:
                return "2.0.06";
            case 2005:
                return "2.0.05";
            case 2002:
                return "2.0.02";
            default:
                return "";
        }
    }

    ,

    isGuest: function (name) {
        return (/\bguest[0-9]/i).test(name);
    }

    ,

    os: function (srcos) {
        if (srcos == "windows") {
            return WINDOWS_BASE64 + " Windows";
        } else if (srcos == "mac") {
            return APPLE_BASE64 + " Mac";
        } else if (srcos == "linux") {
            return LINUX_BASE64 + " Linux";
        } else if (srcos == "android") {
            return ANDROID_BASE64 + " Android";
        } else if (srcos == "webclient") {
            return IE_BASE64 + " Web Client";
        }
    }

    ,

    osImage: function (srcos) {
        if (srcos == "windows") {
            return WINDOWS_BASE64;
        } else if (srcos == "mac") {
            return APPLE_BASE64;
        } else if (srcos == "linux") {
            return LINUX_BASE64;
        } else if (srcos == "android") {
            return ANDROID_BASE64;
        } else if (srcos == "webclient") {
            return IE_BASE64;
        }
    }

    ,

    osName: function (srcos) {
        return (srcos == "webclient" ? "Web Client" : this.cap(srcos));
    }

    ,

    bannedcharacters: function (message, lower) {
        for (var i in bansites) {
            if (message.indexOf(bansites[i]) != -1) {
                return true;
            }
        }
        if (regchannels[lower]) {
            if (ZALGO.test(message) && !regchannels[lower].zalgo) {
                return true;
            }
            if (/[\u202E\u202D]/.test(message) && !regchannels[lower].reverse) {
                return true;
            }
            if (THAI.test(message) && !regchannels[lower].extending) {
                return true;
            }
            if (SPECIAL.test(message) && !regchannels[lower].backward) {
                return true;
            }
            if (ARABIC.test(message) || HEBREW.test(message)) {
                return true;
            }
        } else {
            if (ZALGO.test(message) || /[\u202E\u202D]/.test(message) || THAI.test(message) || SPECIAL.test(message) || ARABIC.test(message) || HEBREW.test(message)) {
                return true;
            }
        }
    }

    ,

    nyancolor: function (number) {
        switch (number) {
            case 1:
                return "#FF4500";
            case 2:
                return "#FFD700";
            case 3:
                return "#008000";
            case 4:
                return "#0000FF";
            case 5:
                return "#00008B";
            case 6:
                return "#800080";
            default:
                return "#FF0000";
        }
    }

    ,

    tominutes: function (time, unit) {
        if (unit == "seconds" || unit == "second") {
            return (time / 60);
        } else if (unit == "hours" || unit == "hour") {
            return (time * 60);
        } else if (unit == "days" || unit == "day") {
            return (time * 1440);
        } else {
            return time;
        }
    }

    ,

    toTimeZone: function (d, zone) {
        d = d.split('T');
        d[0] = d[0].split('-');
        var derp = d[0][1] + '/' + d[0][2] + '/' + d[0][0] + " " + d[1], localTime, localOffset, utc, offset, time, newdate;
        date = new Date(derp);
        //sys.sendMessage(src, "Date: " + date.toString(), 0);
        localTime = date.getTime();
        //sys.sendMessage(src, "Local Time: " + localTime, 0);
        localOffset = date.getTimezoneOffset() * 60000;
        //sys.sendMessage(src, "Local Offset: " + localOffset, 0);
        utc = localTime + localOffset;
        //sys.sendMessage(src, "UTC: " + utc, 0);
        if (zone.charAt(0) == '-') {
            if (zone.charAt(1) == '0') {
                zone = '-' + zone.charAt(2);
            }
        } else if (zone.charAt(0) == '+') {
            zone = zone.slice(1);
            if (zone.charAt(0) == '0') {
                zone = zone.slice(1);
            }
        }
        //sys.sendMessage(src, "Time Zone (without the +2): " + zone, 0);
        offset = eval(zone) - parseInt(hostTimeZone.slice(2, -3)) * 1;
        //sys.sendMessage(src, "Offset: " + offset, 0);
        time = utc + (3600000 * offset);
        //sys.sendMessage(src, "Time: " + time, 0);
        newdate = new Date(time);
        return newdate.toISOString();
    }

    ,

    shortdate: function (d) {
        var f = "yyyy-MM-ddThh:mm:ss", y = d.getFullYear(), m = d.getMonth() + 1, hours = d.getHours(), minutes = d.getMinutes(), seconds = d.getSeconds();
        d = d.getDate();
        function z(s) {s=''+s;return s.length>1?s:'0'+s;}
        f = f.replace(/yyyy/, y);
        f = f.replace(/yy/, String(y).substr(2));
        f = f.replace(/MM/, z(m));
        f = f.replace(/M/, m);
        f = f.replace(/dd/, z(d));
        f = f.replace(/d/, d);
        f = f.replace(/hh/, z(hours));
        f = f.replace(/mm/, z(minutes));
        f = f.replace(/ss/, z(seconds));
        return f;
    }

    ,

    isRange: function (range) {
        var ipdigits = range.split(".").join(""), iparray;
        if (isNaN(parseInt(ipdigits))) {
            return false;
        }
        iparray = range.split(".");
        if (iparray.length != 2) {
            return false;
        }
        for (var ipindex in iparray) {
            if (parseInt(iparray[ipindex]) < 0 || parseInt(iparray[ipindex]) > 255) {
                return false;
            }
        }
        return true;
    }

    ,

    isIp: function (ip) {
        var ipdigits = ip.split(".").join(""), iparray;
        if (isNaN(parseInt(ipdigits))) {
            return false;
        }
        iparray = ip.split(".");
        if (iparray.length != 4) {
            return false;
        }
        for (var i in iparray) {
            if (parseInt(iparray[i]) < 0 || parseInt(iparray[i]) > 255) {
                return false;
            }
        }
        return true;
    }

    ,

    isauthip: function (ip) {
        var alts = sys.aliases(ip);
        for (var index in alts) {
            if (sys.dbAuth(alts[index]) > 0) {
                return true;
            }
        }
        return false;
    }

    ,

    ipRange: function (ip) {
        var ipdigits = ip.split(".");
        return ipdigits[0] + "." + ipdigits[1];
    }

    ,

    sameIp: function (ip1, ip2) {
        if (ip1 == "127.0.0.1" && this.ipRange(ip2) == "192.168") {
            return true;
        } else if (ip2 == "127.0.0.1" && this.ipRange(ip1) == "192.168") {
            return true;
        }
        return ip1 == ip2;
    }

    ,

    isInArray: function (string, array) {
        for (var i in array) {
            if (array[i] == string) {
                return true;
            }
        }
        return false;
    }

    ,

    isInString: function (string, array) {
        for (var i in array) {
            if (string.indexOf(array[i]) != -1) {
                return true;
            }
        }
        return false;
    }

    ,

    allCommands: function () {
        var array = [], i;
        for (i in usercommands) {
            array.push(i);
        }
        for (i in modcommands) {
            array.push(i);
        }
        for (i in admincommands) {
            array.push(i);
        }
        for (i in ownercommands) {
            array.push(i);
        }
        for (i in cusercommands) {
            array.push(i);
        }
        for (i in cmodcommands) {
            array.push(i);
        }
        for (i in cadmincommands) {
            array.push(i);
        }
        for (i in cownercommands) {
            array.push(i);
        }
        if (pluginLoaded["safari.js"]) {
            for (i in safaricommands) {
                array.push(i);
            }
        }
        if (pluginLoaded["roulette.js"]) {
            for (i in roulettecommands) {
                array.push(i);
            }
        }
        if (pluginLoaded["rr.js"]) {
            for (i in rrcommands) {
                array.push(i);
            }
        }
        if (pluginLoaded["party.js"]) {
            for (i in partycommands) {
                array.push(i);
            }
        }
        if (pluginLoaded["funcmds.js"]) {
            for (i in funcommands) {
                array.push(i);
            }
        }
        for (i in array) {
            if (array[i].substr(0, 4) == "this") {
                array.splice(i, 1);
            }
        }
        return array;
    }

    ,

    objecttoarray: function (object) {
        var array = [];
        for (var index in object) {
            array.push(object[index]);
        }
        return array;
    }

    ,

    bot: function (string) {
        if (string.charAt(0) == '•') {
            return "<b><font color='" + botsymbolcolor + "'>" + string.substr(0, 3) + "</font></b><b><font color='" + botcolor + "'>" + string.slice(3) + "</font></b>";
        }
        return "<font color='" + botcolor + "'><timestamp/></font><font color='" + botsymbolcolor + "'><b>" + this.escapehtml(botsymbol) + "</b></font><font color='" + botcolor + "'><b>" + string + ": </b></font>";
    }

    ,

    colorcheck: function (poke) {
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

    ,

    date: function (date) {
        date = date.toString().split(' ');
        date[5] = date[5].replace(/0/g, "");
        if (date[7]) {
            date.splice(7, 1);
        }
        date.splice(6, 1);
        return date.join(' ');
    }

    ,

    gen: function (pokenum) {
        var NUMBER_OF_GENS = 6, NUMBER_OF_POKEMON_GEN = [151, 251, 386, 493, 649, 718];
        for (var i = 0; i < NUMBER_OF_GENS; i++) {
            if (pokenum < NUMBER_OF_POKEMON_GEN[i]) {
                return i + 1;
            }
        }
        return 0;
    }

    ,

    middlecup: function (poke) {
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

    ,

    getmoves: function (id, num, moves, form, derp) {
        if (form > 0)id = derp;
        var moveindex = moves.indexOf(id + ":" + form);
        moveindex = eval(moveindex) + 3 * 1 + num * 1;
        moves = moves.substr(moveindex);
        var movesarraya = moves.split('\n');
        movesarraya[0] = movesarraya[0].split(" ");
        for (var i in movesarraya[0]) {
            movesarraya[0][i] = sys.move(movesarraya[0][i]);
        }
        return movesarraya[0].join(", ");
    }

    ,

    getmovesarraya: function (id, num, moves, form, derp) {
        if (form > 0)id = derp;
        var moveindex = moves.indexOf(id + ":" + form);
        moveindex = eval(moveindex) + 3 * 1 + num * 1;
        moves = moves.substr(moveindex);
        var movesarraya = moves.split('\n');
        movesarraya[0] = movesarraya[0].split(" ");
        for (var i in movesarraya[0]) {
            movesarraya[0][i] = sys.move(movesarraya[0][i]);
        }
        return movesarraya[0];
    }

    ,

    htmlLinks:  function (text, type) {
        var exp = /([a-zA-Z]+:\/\/|www\.)[^\s]+/ig;
        var found = text.match(exp);
        var newtext;
        var newfound;
        for (var x in found) {
            if (found.hasOwnProperty(x)) {
                var link = found[x];
                newfound = found[x].replace(/\//g, sys.md5('/')).replace(/_/g, sys.md5('_'));
                var regex = /.*(?:youtu.be\/|youtube.*v=|youtube.*\/embed\/|youtube.*\/v\/|youtube.*videos\/)([^#\&\?]*).*/;
                if (link.match(regex)) {
                    var name = link.match(regex)[link.match(regex).length - 1];
                    var resp;
                    try {
                        resp = JSON.parse(sys.synchronousWebCall(helpers.youtubeDataUrl(name)));
                        link = '<a href="' + this.escapehtml(link) + '">' + resp.items[0].snippet.title + '</a>';
                    }
                    catch (e) {
                        sys.sendAll(e, 0);
                        link = newfound;
                    }
                }
                else {
                    link = newfound;
                }
                newtext = ('<a href ="' + newfound + '">' + link + '</a>').replace(/&amp;/gi, "&");
                text = text.replace(found[x], newtext);
            }
        }
        return type ? resp : link;
    }

    ,

    idsort: function (array) {
        // array consists of multiple numbers. Using array.sort() would put 1000 in front of 995, for example
        // this sorting function puts 1000 after 995
        var x, y, z, sorted = [], maxlength = 1;
        array = array.sort();
        for (x in array) {
            array[x] = JSON.stringify(array[x]);
            if (array[x].length > maxlength) {
                maxlength = array[x].length;
            }
        }
        for (y = 1; y <= maxlength; y++) {
            for (z in array) {
                if (array[z].length == y) {
                    sorted.push(array[z]);
                }
            }
        }
        return sorted;
    }

    ,

    authSort: function () {
        var i, authArray = [], highestAuth = 0, list = sys.dbAuths().sort();
        for (i in list) {
            auth = sys.dbAuth(list[i]);
            if (auth > highestAuth) {
                highestAuth = auth;
            }
        }
        while (highestAuth > 0) {
            for (i in list) {
                if (sys.dbAuth(list[i]) == highestAuth && sys.dbAuth(list[i]) <= 3) {
                    authArray.push(list[i]);
                }
            }
            highestAuth--;
        }
        return authArray;
    }

    ,

    cauthSort: function (channel) {
        var lower = sys.channel(channel).toLowerCase();
        return regchannels[lower].owners.sort().concat(regchannels[lower].admins.sort()).concat(regchannels[lower].mods.sort());
    }

    ,

    userg: function (string) {
        return (layout == "old" ? "\u2022 " : "") + "<b><font color='#808080'>" + this.escapehtml(string) + "</font></b>";
    }

    ,

    userl: function (string) {
        if (layout == "new") {
            return "<a href='po:send/" + string + "' style='text-decoration: none;'><font color='" + cmdcolors[0] + "'>" + this.escapehtml(string) + "</font></a>";
        } else {
            return "\u2022 <a href='po:send/" + string + "' style='text-decoration: none;'><font color='green'>" + this.escapehtml(string) + "</font></a>";
        }
    }

    ,

    user: function (string) {
        if (layout == "new") {
            return "<font color='" + cmdcolors[0] + "'>" + this.escapehtml(string) + "</font>";
        } else {
            return (!sys.id(string) ? "\u2022 <font color='green'>" : "") + this.escapehtml(string) + "</font>";
        }

    }

    ,

    arg: function (string) {
        if (layout == "new") {
            return "<font color='" + cmdcolors[1] + "'>" + this.escapehtml(string) + "</font>";
        } else {
            return "<font color='" + (string.toLowerCase() !== string ? "green" : "red") + "'>" + this.escapehtml(string) + "</font>";
        }

    }

    ,

    arg2: function (string) {
        return "<font color='" + (layout == "new" ? cmdcolors[2] : "blue") + "'>" + this.escapehtml(string) + "</font>";
    }

    ,

    arg3: function (string) {
        return "<font color='" + (layout == "new" ? cmdcolors[3] : "blueviolet") + "'>" + this.escapehtml(string) + "</font>";
    }

    ,

    arg4: function (string) {
        return "<font color='" + (layout == "new" ? cmdcolors[4] : "olive") + "'>" + this.escapehtml(string) + "</font>";
    }

    ,

    arg5: function (string) {
        return "<font color='" + (layout == "new" ? cmdcolors[5] : "orange") + "'>" + this.escapehtml(string) + "</font>";
    }

    ,

    rainbow: function (text) {
        var colors = ["#FF0000", "#FFA500", "#FFD700", "#008000", "#0000FF", "#4B0082", "#800080"],
            array = [], toggle = 0, i;
        for (i = 0; i < text.length; i++) {
            array.push("<font color='" + colors[toggle] + "'>" + text.charAt(i) + "</font>");
            toggle = (toggle + 1) % colors.length;
        }
        return array.join("");
    }

    ,

    duoColor: function (text, colorX, colorY) {
        var array = [], toggle = false, i;
        for (i = 0; i < text.length; i++) {
            array.push("<font color='" + (toggle ? colorY : colorX) + "';>" + text.charAt(i) + "</font>");
            toggle = !toggle;
        }
        return array.join("");
    }

    ,

    desu: function (text) {
        var firstColor = ["#008000", "#FF0000"][sys.rand(0, 2)];
        return this.duoColor(text, firstColor, (firstColor == "#008000" ? "#FF0000" : "#008000"));
    }

    ,

    leet: function (text) {
        var charset = ['o', 'l', 'z', 'e', 'a', 's', '6', 't', 'b', 'g'], i;
        for (i = 0; i < charset.length; i++) {
            text = text.replace(new RegExp(charset[i], "gi"), i);
        }
        return text.toLowerCase();
    }

    ,

    morse: function (text) {
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789 ", morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
        "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--",
        "--..", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----", ""], newText = [], i;
        text = text.toLowerCase();
        for (i = 0; i < text.length; i++) {
            if (charset.contains(text[i])) {
                newText.push(morse[charset.indexOf(text[i])]);
            }
        }
        return newText.join(" ");
    }

    ,

    reverse: function (text) {
        return text.split("").reverse().join("");
    }

    ,

    statName: function (stat) {
        return([
            "HP",
            "Attack",
            "Defense",
            "Sp. Atk.",
            "Sp. Def.",
            "Speed"
        ][stat]);
    }

    ,

    colorStat: function (stat) {
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

    ,

    cap: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    ,


    sep: function (num) {
        if (isNaN(num)) {
            return '-';
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    ,

    correctDateNotation: function (date) {
        var tmp, time, year, month, day;
        tmp = date.split('T')[0].split('-');
        time = date.split('T')[1].replace(".000Z", "");
        year = tmp[0];
        month = tmp[1];
        day = tmp[2];
        if (day.charAt(0) == '0') {
            day = day.slice(1);
        }
        if (month.charAt(0) == '0') {
            month = month.slice(1);
        }
        return day + '-' + month + '-' + year + ", " + time.replace('Z', "");
    }

    ,

    noflash: function (name) {
        return name[0] + "\u200b" + name.substr(1);
    }

    ,

    removespaces: function (string) {
        return string.split(" ").join("");
    }

    ,

    spaces: function (num) {
        if (isNaN(num)) {
            return "";
        }
        var spaces = "";
        while (num > 0) {
            spaces += "&nbsp;";
            num--;
        }
        return spaces;
    }

    ,

    strip: function (str) {
        return str.replace(/<\/?[^>]*>/g, "");
    }

    ,

    breakinghtml: function (string) {
        if (string.split("<").length > string.split(">").length) {
            return true;
        } else if (this.removespaces(string) == "><") {
            return true;
        } else if (this.removespaces(string).indexOf("<center>") >= 0) {
            return true;
        } else if (this.removespaces(string).replace(/'|"/g, "").indexOf("dir=rtl") >= 0) {
            return true;
        }
        return false;
    }

    ,

    escapehtml: function (string) {
        return string.toString().replace(/&/g, "&amp;").replace(/\>/g, "&gt;").replace(/</g, "&lt;");
    }

    ,

    escapehtmluser: function (string) {
        return "<font color='" + cmdcolors[0] + "'>" + string.replace(/&/g, "&amp;").replace(/\>/g, "&gt;").replace(/</g, "&lt;") + "</font>";
    }

    ,

    escapehtmlarg: function (string) {
        return "<font color='" + cmdcolors[1] + "'>" + string.replace(/&/g, "&amp;").replace(/\>/g, "&gt;").replace(/</g, "&lt;") + "</font>";
    }

    ,

    toseconds: function (time, unit) {
        return({"minutes": time*60 , "minute": time*60, "hours": time*3600, "hour": time*3600, "days": time*86400,"day": time*86400, "weeks": time*604800, "week": time*604800, "months": time*2592000 , "month": time*2592000, "year": time*31536000 , "years": time*31536000}[unit] || time);
    }

    ,

    timeplurality: function (time, unit) {
        if (unit == "s") {
            unit = "seconds";
        } else if (unit == "m") {
            unit = "minutes";
        } else if (unit == "h") {
            unit = "hours";
        } else if (unit == "d") {
            unit = "days";
        }
        if (time == 1 && unit[unit.length-1] == "s") {
            unit = unit.replace(/s$/, "");
        } else if (time != 1 && unit[unit.length-1] != "s" && unit != "feet" && unit != "km") {
            unit = unit + "s";
        } else if (unit == "feet") {
            unit = "foot";
        } else if (unit == "foot") {
            unit = "feet";
        }
        return unit;
    }

    ,

    unitplural: function (unit) {
        if (unit[unit.length-1] != "s") {
            unit = unit + "s";
        }
        return unit;
    }

    ,

    typecolor: function (pokeNum) {
        return ([
            "#808000",
            "#8B0000",
            "#6A5ACD",
            "#800080",
            "#A52A2A",
            "#8B4513",
            "#00FF00",
            "#4B0082",
            "#808080",
            "#FF0000",
            "#0000FF",
            "#008000",
            "#FFD700",
            "#FF00FF",
            "#00FFFF",
            "#00008B",
            "#000000",
            "#EE82EE",
            "#2E8B57",
        ][sys.pokeType1(pokeNum)]);
    }

    ,

    pokeImage: function (pokeNum, shine) {
        return (shine ? "<img src='pokemon:" + pokeNum + "&shiny=true'>" : "<img src='pokemon:" + pokeNum + "'>");
    }

    ,

    pokeIcon: function (pokeNum) {
        return "<img src='icon:" + pokeNum + "'>";
    }

    ,

    itemImage: function (itemNum) {
        return "<img src='item:" + itemNum + "'>";
    }

    ,

    typeImage: function (src, type) {
        if (this.isAndroidOrWeb(src)) {
            return sys.type(type);
        }
        return "<img src='Themes/Classic/types/type" + type + ".png'>";
    }

    ,

    genderImage: function (src, gender) {
        if (this.isAndroidOrWeb(src)) {
            return this.cap(sys.gender(gender));
        }
        return "<img src='Themes/Classic/genders/gender" + gender + ".png'>";
    }

    ,

    pokeBallImage: function (src, ball) {
        var mapping;
        if (this.isAndroidOrWeb(src)) {
            mapping = {"poke": "USER", "great": "MOD", "ultra": "ADMIN", "master": "OWNER"};
            return AUTHIMAGE[mapping[ball]];
        }
        mapping = {"poke": "u", "great": "m", "ultra": "a", "master": "o"};
        return "<img src='Themes/Classic/client/" + mapping[ball] + "Available.png'>";
    }

    ,

    statusImage: function (src, status) {
        if (this.isAndroidOrWeb(src)) {
            return STATUS[status.toUpperCase()];
        }
        return "<img src='Themes/Classic/status/battle_status" + this.toStatusNumber(status) + ".png'>";
    }

    ,

    toStatusNumber: function (status) {
        return ({
            "paralyze": 1,
            "sleep": 2,
            "freeze": 3,
            "burn": 4,
            "poison": 5
        }[status]);
    }

    ,

    color: function (src) {
        if (sys.getColor(src) == "#000000") {
            var colorlist = ["#5811B1", "#399BCD", "#0474BB", "#F8760D", "#A00C9E", "#0D762B", "#5F4C00", "#9A4F6D", "#D0990F", "#1B1390", "#028678", "#0324B1"];
            return colorlist[src % colorlist.length];
        }
        return sys.getColor(src);
    }

    ,

    isTooGreen: function (color) {
        var hex = color.substr(3, 2).toUpperCase(), first = hex.charAt(0), second = hex.charAt(1);
        if (second == 'D' || second == 'E' || second == 'F') {
            return true;
        }
        if (!isNaN(first) && typeof(parseInt(first)) == "number" || first == 'A' || first == 'B') {
            return false;
        }
        if (!isNaN(second) && typeof(parseInt(second)) == "number" && parseInt(second) <= 7) {
            return false;
        }
        return true;
    }

    ,

    authName: function (auth, displayuser, hideinvis) {
        if (auth === 0) {
            return displayuser ? AUTH_NAMES[auth] : "";
        } else if (auth == 1 || auth == 2 || auth == 3) {
            return AUTH_NAMES[auth];
        } else if (auth >= 4) {
            return hideinvis ? AUTH_NAMES[0] : AUTH_NAMES[4];
        }
    }

    ,

    cauth: function (name, channel) {
        var lower = sys.channel(channel).toLowerCase();
        name = name.toLowerCase();
        if (regchannels[lower]) {
            if (regchannels[lower].owners.contains(name) || sys.dbAuth(name) >= 3) {
                return 3;
            }
            if (regchannels[lower].admins.contains(name) || sys.dbAuth(name) >= 2) {
                return 2;
            }
            if (regchannels[lower].mods.contains(name) || sys.dbAuth(name) >= 1) {
                return 1;
            }
            return 0;
        } else {
            return (sys.dbAuth(name) >= 4 ? 3 : sys.dbAuth(name));
        }
    }

    ,

    cauthname: function (name, channel) {
        var auth = this.cauth(name, channel);
        if (auth == 1) {
            return "Channel Mod";
        } else if (auth == 2) {
            return "Channel Admin";
        } else if (auth == 3) {
            return "Channel Owner";
        }
        return "";
    }

    ,

    authimage: function (src, authlevel) {
        if (this.isAndroidOrWeb(src)) {
            return ({
                11: AUTHIMAGE.BATTLING_OWNER,
                10: AUTHIMAGE.BATTLING_ADMIN,
                9: AUTHIMAGE.BATTLING_MOD,
                8: AUTHIMAGE.BATTLING_USER,
                7: AUTHIMAGE.IDLE_OWNER,
                6: AUTHIMAGE.IDLE_ADMIN,
                5: AUTHIMAGE.IDLE_MOD,
                4: AUTHIMAGE.IDLE_USER,
                3: AUTHIMAGE.OWNER,
                2: AUTHIMAGE.ADMIN,
                1: AUTHIMAGE.MOD,
                0: AUTHIMAGE.USER
            }[authlevel] || AUTHIMAGE.IDLE_USER);
        }
        return ({
        11: "<img src='Themes/Classic/client/oBattle.png'>",
        10: "<img src='Themes/Classic/client/aBattle.png'>",
        9: "<img src='Themes/Classic/client/mBattle.png'>",
        8: "<img src='Themes/Classic/client/uBattle.png'>",
        7: "<img src='Themes/Classic/client/oAway.png'>",
        6: "<img src='Themes/Classic/client/aAway.png'>",
        5: "<img src='Themes/Classic/client/mAway.png'>",
        4: "<img src='Themes/Classic/client/uAway.png'>",
        3: "<img src='Themes/Classic/client/oAvailable.png'>",
        2: "<img src='Themes/Classic/client/aAvailable.png'>",
        1: "<img src='Themes/Classic/client/mAvailable.png'>",
        0: "<img src='Themes/Classic/client/uAvailable.png'>",
        }[authlevel] || "<img src='Themes/Classic/client/uAway.png'>");

    }

    ,

    listOfClauses: function (number) {
        var clauses = ["Inverted Battle", "Self-KO Clause", "Wifi Battle", "Species Clause", "No Timeout", "Challenge Cup", "Item Clause", "Disallow Spects", "Freeze Clause", "Sleep Clause"],
            list = [], clause = 512, i = 0;
        while (number >= 1) {
            if (number >= clause) {
                list.push(clauses[i]);
                number -= clause;
            }
            clause /= 2;
            i += 1;
        }
        if (list.join("").length < 1) {
            list = list.join("");
            list = "none";
        }
        return list;
    }

    ,

    calcStat: function (stat, base, IV, EV, nature) {
        if (stat == '0') {
            return this.calcHP(base, IV, EV);
        }
        return Math.floor(Math.floor((IV + (2 * base) + Math.floor(EV / 4)) * 100 / 100 + 5) * nature);
    }

    ,

    calcHP: function (base, IV, EV) {
        if (base == 1) {
            return 1;
        }
        return Math.floor((IV + (2 * base) + Math.floor(EV / 4) + 100) + 10);
    }

    ,

    getDbIndex: function (pokeId) {
        var id = pokeId % 65536, forme = (pokeId - id) / 65536;
        return id + ':' + forme;
    }

    ,

    displayNum: function (pokeId) {
        var id = pokeId % 65536, forme = (pokeId - id) / 65536;
        return forme === 0 ? id : id + '-' + forme;
    }

    ,

    height: function (pokeId) {
        if (Object.keys(heightList).length === 0) {
            var data = sys.read("db/pokes/height.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var id = data[i].substr(0, index);
                var height = data[i].substr(index + 1);
                heightList[id] = height;
            }
        }
        var key = this.getDbIndex(pokeId);
        if (heightList[key] !== undefined) {
            return heightList[key].trim();
        }
        var index = key.indexOf(':') + 1;
        var base = key.substr(0, index);
        return heightList[base + '0'].trim();
    }

    ,

    weight: function (pokeId) {
        if (Object.keys(weightList).length === 0) {
            var data = sys.read("db/pokes/weight.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var id = data[i].substr(0, index);
                var weight = data[i].substr(index + 1);
                weightList[id] = weight;
            }
        }
        var key = this.getDbIndex(pokeId);
        if (weightList[key] !== undefined) {
            return weightList[key];
        }
        var index = key.indexOf(':') + 1;
        var base = key.substr(0, index);
        return weightList[base + '0'];
    }

    ,

    movepool: function (pokeId) {
        if (Object.keys(movepoolList).length === 0) {
            var data = sys.read("db/pokes/" + (pokeId > 999 ? "5G" : "6G") + "/all_moves.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var id = data[i].substr(0, index);
                var movepool = data[i].substr(index + 1).split(' ');
                for (var j in movepool) {
                    movepool[j] = sys.move(movepool[j]);
                }
                movepoolList[id] = movepool;
            }
        }
        var key = this.getDbIndex(pokeId);
        if (movepoolList[key] !== undefined) {
            return movepoolList[key];
        }
        var index = key.indexOf(':') + 1;
        var base = key.substr(0, index);
        return movepoolList[base];
    }

    ,

    weightPower: function (weight) {
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

    ,

    teamOrdinal: function (team) {
        return ({ 0:"first", 1:"second", 2:"third", 3:"fourth", 4:"fifth", 5:"sixth" }[team]);
    }

    ,

    ordinal: function (num) {
        var str = String(num), lastDigit = str.charAt(str.length - 1);
        if (Number(lastDigit) >= 3) {
            lastDigit = "3";
        }
        return num + ({ "1":"st", "2":"nd", "3":"th" }[lastDigit]);
    }

    ,

    // Chuck Norris tier is at index 23
    tierOf: function (pokeId) {
        var name = sys.pokemon(pokeId), tiers = sys.getFileContent("tiers.xml").split('\n'), start = 23, pokemon,
            tierId = { // + 1 compared to index
                24: "Chuck Norris",
                25: "*** WINNER ***",
                26: "Uber",
                27: "OU",
                28: "UU"
            }

        for (i = start; i < start + 6; i++) {
            pokemon = tiers[i].substring(tiers[i].indexOf("pokemons") + 9, tiers[i].indexOf("abilities")).trim();
            pokemon = pokemon.replace(/"/g, "").split(", ");
            if (pokemon.indexOf(name) > -1) {
                return tierId[i];
            }
        }

        return "NU";
    }

    ,

    movePower: function (moveId, gen) {
        if (!gen) {
            gen = 7;
        }
        if (Object.keys(powerList).length === 0) {
            var data = sys.read("db/moves/" + gen + "G/power.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var power = data[i].substr(index + 1);
                powerList[key] = power;
            }
        }
        if (powerList[moveId] === undefined || powerList[moveId] == '1') {
            return '-';
        }
        return powerList[moveId];
    }

    ,

    moveCategory: function (moveId, gen) {
        if (!gen) {
            gen = 7;
        }
        if (Object.keys(categoryList).length === 0) {
            var data = sys.read("db/moves/" + gen + "G/damage_class.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var category = data[i].substr(index + 1);
                categoryList[key] = category;
            }
        }
        if (categoryList[moveId] == 1) {
            return "<font color='#800000'>Physical</font>";
        }
        if (categoryList[moveId] == 2) {
            return "<font color='#FF69B4'>Special</font>";
        }
        return "<font color='#2E8B57'>Other</font>";
    }

    ,

    moveAccuracy: function (moveId, gen) {
        if (!gen) {
            gen = 7;
        }
        if (Object.keys(accList).length === 0) {
            var data = sys.read("db/moves/" + gen + "G/accuracy.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var accuracy = data[i].substr(index + 1);
                accList[key] = accuracy;
            }
        }
        if (accList[moveId] == 101) {
            return '-';
        }
        return accList[moveId];
    }

    ,

    movePP: function (moveId, gen) {
        if (!gen) {
            gen = 7;
        }
        if (Object.keys(ppList).length === 0) {
            var data = sys.read("db/moves/" + gen + "G/pp.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var pp = data[i].substr(index + 1);
                ppList[key] = pp;
            }
        }
        return [ppList[moveId], ppList[moveId] * 8 / 5];
    }

    ,

    moveEffect: function (moveId, gen) {
        if (!gen) {
            gen = 7;
        }
        if (Object.keys(moveEffList).length === 0) {
            var data = sys.read("db/moves/" + gen + "G/effect.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(" ");
                var key = data[i].substr(0, index);
                var effect = data[i].substr(index + 1);
                moveEffList[key] = effect;
            }
        }
        if (moveEffList[moveId] === undefined) {
            return "Deals normal damage.";
        }
        return moveEffList[moveId].replace(/[\[\]{}]/g, "");
    }

    ,

    moveContact: function (moveId, gen) {
        if (!gen) {
            gen = 7;
        }
        if (Object.keys(moveFlagList).length === 0) {
            var data = sys.read("db/moves/" + gen + "G/flags.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var flags = data[i].substr(index + 1);
                moveFlagList[key] = flags;
            }
        }
        return (moveFlagList[moveId] % 2 === 1) ? "<font color='#008000'>Yes</font>" : "<font color='#FF0000'>No</font>";
    }

    ,

    movePriority: function (moveId, gen) {
        if (!gen) {
            gen = 7;
        }
        if (Object.keys(movePriorityList).length === 0) {
            var data = sys.read("db/moves/" + gen + "G/priority.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var priority = data[i].substr(index + 1);
                movePriorityList[key] = priority;
            }
        }
        if (movePriorityList[moveId] === undefined) {
            return 0;
        }
        return movePriorityList[moveId];
    }

    ,

    moveRange: function (moveId, gen) {
        if (!gen) {
            gen = 7;
        }
        if (Object.keys(moveRangeList).length === 0) {
            var data = sys.read("db/moves/" + gen + "G/range.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var range = data[i].substr(index + 1);
                moveRangeList[key] = range.replace(/\r/g, "");
            }
        }
        if (moveRangeList[moveId] === undefined) {
            return "Single Target";
        }
        return this.moveRangeToText(parseInt(moveRangeList[moveId]));
    }

    ,

    moveRangeToText: function (moveRange) {
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

    ,

    ability: function (abilityId) {
        if (Object.keys(abilityList).length === 0) {
            var data = sys.read("db/abilities/ability_battledesc.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var ability = data[i].substr(index + 1);
                abilityList[key] = ability.replace(/\r/g, "");
            }
        }
        return abilityList[abilityId];
    }

    ,

    pokemonWithAbility: function (abilityId) {
        if (!pokemonWithAbilityList[abilityId]) {
            var data1, data2, data3, index;
            data1 = sys.read("db/pokes/6G/ability1.txt").split('\n');
            data2 = sys.read("db/pokes/6G/ability2.txt").split('\n');
            data3 = sys.read("db/pokes/6G/ability3.txt").split('\n');
            pokemonWithAbilityList[abilityId] = [];
            for (var index1 in data1) {
                index = data1[index1].split(' ');
                if (index[1] == abilityId) {
                    pokemonWithAbilityList[abilityId].push(sys.pokemon(index[0].split(':')[0]));
                }
            }
            for (var index2 in data2) {
                index = data2[index2].split(' ');
                if (index[1] == abilityId) {
                    pokemonWithAbilityList[abilityId].push(sys.pokemon(index[0].split(':')[0]));
                }
            }
            for (var index3 in data3) {
                index = data3[index3].split(' ');
                if (index[1] == abilityId) {
                    pokemonWithAbilityList[abilityId].push(sys.pokemon(index[0].split(':')[0]));
                }
            }
        }
        return pokemonWithAbilityList[abilityId];
    }

    ,

    getItem: function (itemId) {
        if (Object.keys(itemList).length === 0) {
            var data = sys.read("db/items/items_description.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var item = data[i].substr(index + 1);
                itemList[key] = item;
            }
        }
        return itemList[itemId];
    }

    ,

    getBerry: function (berryId) {
        if (Object.keys(berryList).length === 0) {
            var data = sys.read("db/items/berries_description.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var berry = data[i].substr(index + 1);
                berryList[key] = berry;
            }
        }
        return berryList[berryId];
    }

    ,

    getFlingPower: function (itemId) {
        if (Object.keys(flingPowerList).length === 0) {
            var data = sys.read("db/items/items_pow.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var power = data[i].substr(index + 1);
                flingPowerList[key] = power;
            }
        }
        return flingPowerList[itemId];
    }

    ,

    getBerryPower: function (berryId) {
        if (Object.keys(berryPowerList).length === 0) {
            var data = sys.read("db/items/berry_pow.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var power = data[i].substr(index + 1);
                berryPowerList[key] = power;
            }
        }
        return +berryPowerList[berryId] + 20;
    }

    ,

    getBerryType: function (berryId) {
        if (Object.keys(berryTypeList).length === 0) {
            var data = sys.read("db/items/berry_type.txt").split('\n');
            for (var i = 0; i < data.length; i++) {
                var index = data[i].indexOf(' ');
                var key = data[i].substr(0, index);
                var type = data[i].substr(index + 1);
                berryTypeList[key] = type;
            }
        }
        return berryTypeList[berryId].trim();
    }

    ,

    /**
        ------------
        Tour Helpers
        ------------
    **/
    fisheryates: function (myarraya) {
        var i = myarraya.length;
        if (i === 0) {
            return false;
        }
        while (--i) {
            var j = Math.floor(Math.random()*(i + 1));
            var tempi = myarraya[i];
            var tempj = myarraya[j];
            myarraya[i] = tempj;
            myarraya[j] = tempi;
        }
    }

    ,

    tourstart: function (channel) {
        tour[channel].tourmode = 2;
        tour[channel].roundnumber = 0;
        this.roundpairing(channel);
    }

    ,

    tourcount: function (channel) {
        return tour[channel].tournumber - tour[channel].tourmembers.length;
    }

    ,

    tourdisplay: function (tourdisplayversion, channel) {
        var correctborder = border;
        var minutesago = Math.floor((new Date() - tour[channel].tourstarttime) / 60000);
        var minutesstring = minutesago == 1 ? "minute" : "minutes";
        var minutesagostring = minutesago === 0 ? "" : " (started " + String(minutesago) + " " + minutesstring + " ago)";
        var spotsleftstring = this.tourcount(channel) == 1 ? "1 spot is left!" : String(this.tourcount(channel)) + " spots are left!";
        var joinmodestring = tourdisplayversion === 0 || tourdisplayversion == 1 ? this.bot(bots.tour) +
        "Type /join to enter the tournament! " + spotsleftstring : "<timestamp/>Currently in Round " + tour[channel].roundnumber +
        ". Number of players left is " + (tour[channel].tourcurrentnumber - tour[channel].tourlosers.length) + ".";
        var tourdisplay = border + "<br>"
        + this.bot(bots.tour) + "A Tournament has been started by " + tour[channel].tourstarter + "!" + minutesagostring + "<br>"
        + this.bot("<timestamp/>" + botsymbol + "Players: ") + String(tour[channel].tournumber) + "<br>"
        + this.bot("<timestamp/>" + botsymbol + "Battle Type: ") + "Singles<br>"
        + this.bot("<timestamp/>" + botsymbol + "Tier: ") + tour[channel].tourtier + "<br>"
        + this.bot("<timestamp/>" + botsymbol + "Clauses: ") + String(this.listOfClauses(tour[channel].tourclauses)).replace(/,/g, ", ") + "<br><br>"
        + joinmodestring + "<br>"
        + border2;
        tourdisplayversion === 0 ? sys.sendHtmlMain(tourdisplay) : sys.sendHtmlMessage(src, tourdisplay, channel);
    }

    ,

    roundincrease: function (winnername, losername, channel) {
        var tourloser = tour[channel].tourbattlers.indexOf(losername);
        if (tourloser != - 1) {
            tour[channel].tourbattlers.splice(tourloser,1);
            var tourwinner = tour[channel].tourbattlers.indexOf(winnername);
            tour[channel].tourbattlers.splice(tourwinner,1);
        }
        if (winnername != "|bye|") {
            if (tour[channel].tourlosers.indexOf(winnername) == -1) {
                tour[channel].tourlosers.push(losername);
                tour[channel].tourwinners.push(winnername);
                sys.sendHtmlAll("<b>" + members[winnername] + " advances to the next round.</b>", channel);
            }
            else{
                tour[channel].tourwinners.splice(tour[channel].tourwinners.indexOf(losername), 1);
                tour[channel].tourlosers.splice(tour[channel].tourlosers.indexOf(winnername), 1);
                tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf(winnername), 1);
                tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf(losername), 1);
                tour[channel].tourcurrentnumber-= 2;
            }
        }
        else{
            tour[channel].tourmembers.splice(tour[channel].tourcurrentnumber, 1);
            tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf(losername), 1);
            tour[channel].tourwinners.splice(tour[channel].tourwinners.indexOf(losername), 1);
            tour[channel].tourcurrentnumber--;
        }
        sys.sendHtmlAll(members[losername] + " is out of the tournament.", channel);
        var battlesleft = Math.floor((tour[channel].tourcurrentnumber - tour[channel].tourlosers.length - tour[channel].tourwinners.length)/2);
        if (battlesleft !== 0 && tour[channel].tourlosers.indexOf(winnername) == -1 && tour[channel].tourmembers.indexOf(winnername) != -1) {
            var plurality = battlesleft == 1 ? "match" : "matches";
            var battlesleftstring =  border2 + "<br/>"
            + "<font color='blue'><b>" + battlesleft + " more " + plurality  + " to be completed in this round!</b></font>";
            sys.sendHtmlMain(battlesleftstring);
        }
        sys.sendHtmlAll(border2, channel);
        if (battlesleft === 0) {
            if (tour[channel].tourmembers[tour[channel].tourcurrentnumber] == "|bye|") {
                tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf("|bye|"),1);
            }
            tour[channel].tourcurrentnumber -= tour[channel].tourlosers.length;
            if (tour[channel].tourcurrentnumber == 1) {
                tour[channel].tourmode = 0;
                var winnermessage = border + "<br>"
                + this.bot(bots.tour) + "The *** WINNER *** of the tournament is... <b>" + members[winnername] + "!</b><br>"
                + this.bot(bots.tour) + "Congratulations, " + members[winnername] + ", on your success!<br>"
                + border2;
                sys.sendHtmlMain(winnermessage);
                sys.write("data/lasttourmatch.txt", 1);
                return;
            }
            this.roundpairing(channel);
        }
    }

    ,

    roundpairing: function (channel) {
        while (0 in tour[channel].tourlosers) {
            tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf(tour[channel].tourlosers[0]),1);
            tour[channel].tourlosers.splice(0,1);
        }
        while (0 in tour[channel].tourwinners) {
            tour[channel].tourwinners.splice(0,1);
        }
        tour[channel].roundnumber++;
        this.fisheryates(tour[channel].tourmembers);
        this.rounddisplay(1, channel);
        /*for (var tourmembersindex = 0; tourmembersindex < tour[channel].tourcurrentnumber-1; tourmembersindex+=2) {
            var player1 = sys.id(tour[channel].tourmembers[tourmembersindex]), player2 = sys.id(tour[channel].tourmembers[tourmembersindex+1]);
            var team1 = tour[channel].tourteams[tourmembersindex], team2 = tour[channel].tourteams[tourmembersindex+1];
            if (player1 != undefined && player2 != undefined) {
                var player1tier = sys.tier(player1, team1), player2tier = sys.tier(player2, team2);
                if (player1tier == player2tier && player1tier == tour[channel].tourtier) {
                    sys.forceBattle(player1, player2, team1, team2, tour[channel].tourclauses, 0, false);
                }
            }
        }*/
    }

    ,

    rounddisplay: function (rounddisplayversion, channel) {
        var send = rounddisplayversion === 0 ? this.sendmessage : sys.sendHtmlAll;
        var correctborder = rounddisplayversion === 0 ? border : border2;
        var finalroundcheck = tour[channel].tourcurrentnumber == 2 ? "Final Round" : "Round " + tour[channel].roundnumber;
        var roundstring = correctborder + "<br/>"
        + "<timestamp/><font size=4><b>" + finalroundcheck + " of " + tour[channel].tourtier + " Tournament</b></font><br/>"
        + correctborder + "<br/>";
        for (var tourmembersindex = 0 ; tourmembersindex < tour[channel].tourcurrentnumber-rounddisplayversion; tourmembersindex+=2) {
            var tourspotone = tour[channel].tourlosers.indexOf(tour[channel].tourmembers[tourmembersindex]) != -1 ? "<s>" + members[tour[channel].tourmembers[tourmembersindex]] + "</s>" : members[tour[channel].tourmembers[tourmembersindex]];
            var tourspottwo = tour[channel].tourlosers.indexOf(tour[channel].tourmembers[tourmembersindex+1]) != -1 ? "<s>" + members[tour[channel].tourmembers[tourmembersindex+1]] + "</s>" : members[tour[channel].tourmembers[tourmembersindex+1]];
            tourspotone = tour[channel].tourbattlers.indexOf(tour[channel].tourmembers[tourmembersindex]) != -1 ? "<i>" + members[tour[channel].tourmembers[tourmembersindex]] + "</i>" : tourspotone;
            tourspottwo = tour[channel].tourbattlers.indexOf(tour[channel].tourmembers[tourmembersindex+1]) != -1 ? "<i>" + members[tour[channel].tourmembers[tourmembersindex+1]] + "</i>" : tourspottwo;
            tourspotone = tour[channel].tourmembers[tourmembersindex] == "|bye|" ? "|bye|" : tourspotone;
            tourspottwo = tour[channel].tourmembers[tourmembersindex+1] == "|bye|" ? "|bye|" : tourspottwo;
            roundstring += "<b>" + (tourmembersindex+2)/2 + ". " + tourspotone + " VS " + tourspottwo + "</b><br/>";
        }
        if (tour[channel].tourwinners.length > 0) {
            var tourwinnerslist = "<b><small>", tourwinnersindex;
            for (tourwinnersindex in tour[channel].tourwinners) {
                tourwinnerslist += members[tour[channel].tourwinners[tourwinnersindex]] + ", ";
            }
            tourwinnerslist = tourwinnerslist.substring(0, tourwinnerslist.length-2) + ".</small></b>";
            roundstring += correctborder + "<br/>"
            + "<font color='green'><b>Players through to the Next Round</b></font><br/>"
            + correctborder + "<br/>"
            + tourwinnerslist + "<br/>";
        }
        if (tour[channel].tourlosers.length > 0) {
            var tourloserslist = "<b><small>", tourlosersindex;
            for (tourlosersindex in tour[channel].tourlosers) {
                tourloserslist += members[tour[channel].tourlosers[tourlosersindex]] + ", ";
            }
            tourloserslist = tourloserslist.substring(0, tourloserslist.length-2) + ".</small></b>";
            roundstring += correctborder + "<br/>"
            + "<font color='red'><b>Players out of the tournament</b></font><br/>"
            + correctborder + "<br/>"
            + "<b><small>" + tourloserslist + "</small></b><br/>";
        }
        roundstring += correctborder;
        if (tour[channel].tourmembers.length % 2 == 1) {
            tour[channel].tourmembers.push("|bye|");
            tour[channel].tourwinners.push(tour[channel].tourmembers[tour[channel].tourcurrentnumber-1]);
            roundstring += "<br/>"
            + "<font color='green'><b>" + members[tour[channel].tourmembers[tour[channel].tourcurrentnumber-1]] + " is randomly selected to go through to the next round!</b></font><br/>"
            + correctborder;
        }
        sys.sendHtmlMain(roundstring);
    }

    ,

    tourmembersnumber: function (name, channel) {
        if (tour[channel].tourmode !== 0) {
            var tourmembersnumber = tour[channel].tourmembers.indexOf(name);
            if (tourmembersnumber != -1) {
                return tourmembersnumber;
            }
        }
    }

    ,

    tourmembersname: function (number, channel) {
        if (number <= tour[channel].tourcurrentnumber) {
            return members[tour[channel].tourmembers[number]];
        }
    }

    ,

    tourloserscheck: function (name, channel) {
        return tour[channel].tourlosers.indexOf(name) == -1 ? true: false;
    }

    ,

    opponentof: function (name, channel) {
        var tourmembersnumber = this.tourmembersnumber(name, channel);
        return tourmembersnumber % 2 === 0 ? tour[channel].tourmembers[tourmembersnumber+1]: tour[channel].tourmembers[tourmembersnumber-1];
    }

    ,

    nopair: function (index1, index2) {
        return (index1 % 2 === 0 && index2 != index1 + 1) || (index1 % 2 == 1 && index1 != index2 + 1) ? true: false;
    }
};
