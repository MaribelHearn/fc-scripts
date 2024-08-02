/*
    ----------------------------------------------
    FUN COMMUNITY HELPER METHODS helpers.js
     - by Maribel Hearn, 2012-2023,
       with tournament methods by Lutra and
       pokemon db methods from main server
       scripts

    This script file contains utility
    methods that almost every other
    script file uses.
    ----------------------------------------------
*/
module.exports = {
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
            "cmdcolors": ["#4169E1", "#008000", "#FF0000", "#FFA500", "#FFD700", "#0000FF"],
            "listcolors": {"mute":"#1E90FF", "ban":"#FF6900", "rangeban":"#008000", "megaban":"#800080", "gigaban":"#AA0000"},
            "bots": {"attack":"AttackBot", "armyof":"ArmyBot", "auth":"AuthBot", "ban":"BanBot",
                "battle":"BattleBot", "caps":"CapsBot", "channel":"ChannelBot", "clear":"ClearBot", "command":"CommandBot",
                "cow":"Miltank", "flood":"FloodBot", "fun":"FunBot", "gigaban":"GigabanBot", "idle":"IdleBot", "kick":"KickBot",
                "main":"Bot", "megaban":"MegabanBot", "mute":"MuteBot", "name":"NameBot", "party":"PartyBot", "pass":"PassBot",
                "priv":"PrivacyBot", "reverse":"ReverseBot", "rr":"RussiaBot", "russia":"RussiaBot", "safari":"SafariBot",
                "script":"ScriptBot", "silence":"SilenceBot", "spy":"WatchBot", "starfox":"Wolf", "status":"StatusBot",
                "tour":"TourBot", "topic":"TopicBot", "warn":"WarnBot", "welcome":"WelcomeBot", "roulette": "RouletteBot"},
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
                "severely you are breaking this rule.", "This should make sense without any explanation. " +
                "Commands exist to be used for what they are meant for, not for mistakes to be exploited. " +
                "The same goes for auths; do what you should do and not beyond that.",
                "Anything inappropriate or obscene will result in a mute, or ban after multiple occasions.",
                "You may get auth when recognized for coming on a lot, chat activity, good behaviour and maybe even contribution. " +
                "Asking for it will not get you any further.", "Taking the rules too literally is no use when you know you are " +
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
            case "string": return "";
            default: return "";
        }
    },

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
            sys.write("data/" + dataFile + ".txt", JSON.stringify(defaultVal));
        }
        if (require.cache.hasOwnProperty("plugins/funcmds.js")) {
            sys.write("data/bigtexts.txt", "{}");
        } else if (sys.fexists("data/bigtexts.txt")) {
            sys.rm("data/bigtexts.txt");
        }
        print("Customisation settings created");
    },

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
            "megabanlist": "object",
            "gigabanlist": "object",
            "rangebanlist": "object",
            "countryname": "object",
            "cityname": "object",
            "members": "object"
        }, dataFile, defaultVal;
        sys.mkdir("data");
        for (dataFile in dataFiles) {
            defaultVal = this.defaultValue(dataFile, dataFiles[dataFile]);
            sys.write("data/" + dataFile + ".txt", JSON.stringify(defaultVal));
        }
        permchannels = this.defaultValue("permchannels");
        if (require.cache.hasOwnProperty("plugins/party.js")) {
            permchannels.push("Party");
        }
        if (require.cache.hasOwnProperty("plugins/roulette.js")) {
            permchannels.push("Roulette");
        }
        if (require.cache.hasOwnProperty("plugins/rr.js")) {
            permchannels.push("Russian Roulette");
        }
        if (require.cache.hasOwnProperty("plugins/safari.js")) {
            permchannels.push("Safari");
        }
        sys.write("data/permchannels.txt", JSON.stringify(permchannels));
        print("Data folder created");
        this.initCustoms();
    },

    readData: function (dataFile) {
        if (!sys.fexists("data/" + dataFile + ".txt")) {
            sys.write("data/" + dataFile + ".txt", this.defaultValue(dataFile));
            print("Missing data file " + dataFile + ".txt created");
        }
        try {
            return JSON.parse(sys.read("data/" + dataFile + ".txt"));
        } catch (err) {
            print("JSON data file " + dataFile + ".txt failed to parse: " + err);
            return null;
        }
    },

    saveData: function (dataFile, data) {
        sys.write("data/" + (dataFile.match("KEY") ? dataFile : dataFile.toLowerCase()) + ".txt", JSON.stringify(data));
    },

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
        cmdcolors = this.readData("cmdcolors");
        listcolors = this.readData("listcolors");
        bots = this.readData("bots");
        authtitles = this.readData("authtitles");
        selfkickmessages = this.readData("selfkickmessages");
        kickmessages = this.readData("kickmessages");
        mutemessages = this.readData("mutemessages");
        banmessages = this.readData("banmessages");
        rangebanmessages = this.readData("rangebanmessages");
        border = this.readData("border");
        border2 = this.readData("border2");
    },

    /**
        ----------------
        Checking Helpers
        ----------------
    **/
    isAndroid: function (src) {
        return sys.os(src) == "android";
    },

    isWeb: function (src) {
        return sys.os(src) == "webclient";
    },

    isAndroidOrWeb: function (src) {
        return sys.os(src) == "android" || sys.os(src) == "webclient";
    },

    isLetter: function (c) {
        var lower = c.toLowerCase();
        return lower >= 'a' && lower <= 'z';
    },

    isVowel: function (letter) {
        letter = letter.toLowerCase();
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u';
    },

    isHexColor: function (code) {
        return /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(code);
    },

    muteCheck: function (name) {
        for (var i in mutelist) {
            if (sys.dbIp(name) == mutelist[i].ip) {
                return true;
            }
        }
        return false;
    },

    cmuteCheck: function (name, lower) {
        if (regchannels[lower]) {
            return regchannels[lower].mutelist[name.toLowerCase()] || regchannels[lower].mutedips[sys.dbIp(name)];
        }
        return false;
    },

    closeCheck: function (src, name, lower) {
        return regchannels[lower].close > sys.auth(src) && regchannels[lower].close > helpers.cauth(name.toLowerCase(), sys.channelId(lower));
    },

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
            var cmd = (typeof(command) == "string" ? command : command.join(DELIMITER).replace(DELIMITER, ' '));
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
    },

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
    },

    channelMuteMessage: function (src, channel) {
        sys.sendHtmlMessage(src, this.bot(bots.mute) + "Sorry, you are muted on this channel.", channel);
    },

    silenceMessage: function (src, channel) {
        sys.sendHtmlMessage(src, this.bot(bots.silence) + (bots.silence == "Achmed the Dead Terrorist" ? "I KILL YOOOOUUUU!!!" : "Sorry, this channel is currently silenced."), channel);
    },

    reset: function (src) {
        sys.changeName(src, players[src].name);
    },

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
    },

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
    },

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
    },

    channelLink: function (channelName) {
        return "<a href='po:join/" + channelName + "'>#" + channelName + "</a>";
    },

    sum: function (array) {
        var sum = 0;
        for (var i in array) {
            sum += parseInt(array[i]);
        }
        return sum;
    },

    type: function (variable) {
        return variable.constructor.toString().replace("function ", "").replace("native code", "").replace(/[^A-Za-z]/g, "");
    },

    youtubeDataUrl: function (video) {
        if (GOOGLE_KEY === "") {
            return false;
        }
        return "https://www.googleapis.com/youtube/v3/videos?id=" + video + "&key=" + GOOGLE_KEY + "&part=snippet,contentDetails,statistics,status";
    },

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
    },

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
    },

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
    },

    timezonedata: function (country, zone) {
        if (country == '-' || country === "") {
            return hostTimeZone;
        } else {
            return zone;
        }
    },

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
    },

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
    },

    formatLastOn: function (src, lastlogin) {
        return (API_KEY !== "" && timezone[players[src].name.toLowerCase()] ? this.toTimeZone(lastlogin, timezone[players[src].name.toLowerCase()].split(':')[0]) : lastlogin).split('.')[0].replace('T', ", ");
    },

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
    },

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
    },

    ipRange: function (ip) {
        var ipdigits = ip.split(".");
        return ipdigits[0] + "." + ipdigits[1];
    },

    isInArray: function (string, array) {
        for (var i in array) {
            if (array[i] == string) {
                return true;
            }
        }
        return false;
    },

    isInString: function (string, array) {
        for (var i in array) {
            if (string.indexOf(array[i]) != -1) {
                return true;
            }
        }
        return false;
    },

    bot: function (string) {
        if (string.charAt(0) == '•') {
            return "<b><font color='" + botsymbolcolor + "'>" + string.substr(0, 3) + "</font></b><b><font color='" + botcolor + "'>" + string.slice(3) + "</font></b>";
        }
        return "<font color='" + botcolor + "'><timestamp/></font><font color='" + botsymbolcolor + "'><b>" + this.escapehtml(botsymbol) + "</b></font><font color='" + botcolor + "'><b>" + string + ": </b></font>";
    },

    date: function (date) {
        date = date.toString().split(' ');
        date[5] = date[5].replace(/0/g, "");
        if (date[7]) {
            date.splice(7, 1);
        }
        date.splice(6, 1);
        return date.join(' ');
    },

    htmlLinks:  function (text, type) {
        var exp = /([a-zA-Z]+:\/\/|www\.)[^\s]+/ig;
        var found = text.match(exp);
        var newtext;
        var newfound;
        for (var x in found) {
            if (found.hasOwnProperty(x)) {
                var link = found[x];
                newfound = found[x].replace(/\//g, sys.md5('/')).replace(/_/g, sys.md5('_'));
                var regex = /.*(?:youtu.be\/|youtube.*v=|youtube.*\/embed\/|youtube.*\/v\/|youtube.*videos\/)([^#&?]*).*/;
                if (link.match(regex)) {
                    var name = link.match(regex)[link.match(regex).length - 1];
                    var resp;
                    try {
                        resp = JSON.parse(sys.synchronousWebCall(this.youtubeDataUrl(name)));
                        link = '<a href="' + this.escapehtml(link) + '">' + resp.items[0].snippet.title + '</a>';
                    } catch (e) {
                        sys.sendAll(e, 0);
                        link = newfound;
                    }
                } else {
                    link = newfound;
                }
                newtext = ('<a href ="' + newfound + '">' + link + '</a>').replace(/&amp;/gi, "&");
                text = text.replace(found[x], newtext);
            }
        }
        return type ? resp : link;
    },

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
    },

    userl: function (string) {
        if (layout == "new") {
            return "<a href='po:send/" + string + "' style='text-decoration: none;'><font color='" + cmdcolors[0] + "'>" + this.escapehtml(string) + "</font></a>";
        } else {
            return "\u2022 <a href='po:send/" + string + "' style='text-decoration: none;'><font color='green'>" + this.escapehtml(string) + "</font></a>";
        }
    },

    user: function (string) {
        if (layout == "new") {
            return "<font color='" + cmdcolors[0] + "'>" + this.escapehtml(string) + "</font>";
        } else {
            return (!sys.id(string) ? "\u2022 <font color='green'>" : "") + this.escapehtml(string) + "</font>";
        }

    },

    arg: function (string) {
        if (layout == "new") {
            return "<font color='" + cmdcolors[1] + "'>" + this.escapehtml(string) + "</font>";
        } else {
            return "<font color='" + (string.toLowerCase() !== string ? "green" : "red") + "'>" + this.escapehtml(string) + "</font>";
        }

    },

    arg2: function (string) {
        return "<font color='" + (layout == "new" ? cmdcolors[2] : "blue") + "'>" + this.escapehtml(string) + "</font>";
    },

    arg3: function (string) {
        return "<font color='" + (layout == "new" ? cmdcolors[3] : "blueviolet") + "'>" + this.escapehtml(string) + "</font>";
    },

    arg4: function (string) {
        return "<font color='" + (layout == "new" ? cmdcolors[4] : "olive") + "'>" + this.escapehtml(string) + "</font>";
    },

    arg5: function (string) {
        return "<font color='" + (layout == "new" ? cmdcolors[5] : "orange") + "'>" + this.escapehtml(string) + "</font>";
    },

    rainbow: function (text) {
        var colors = ["#FF0000", "#FFA500", "#FFD700", "#008000", "#0000FF", "#4B0082", "#800080"],
            array = [], toggle = 0, i;
        for (i = 0; i < text.length; i++) {
            array.push("<font color='" + colors[toggle] + "'>" + text.charAt(i) + "</font>");
            toggle = (toggle + 1) % colors.length;
        }
        return array.join("");
    },

    sep: function (num) {
        if (isNaN(num)) {
            return '-';
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    removespaces: function (string) {
        return string.split(" ").join("");
    },

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
    },

    strip: function (str) {
        return str.replace(/<\/?[^>]*>/g, "");
    },

    cap: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    escapehtml: function (string) {
        return string.toString().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
    },

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
    },

    pokeImage: function (pokeNum, shine, gen) {
        if (gen) {
            return (shine ? "<img src='pokemon:" + pokeNum + "&shiny=true&gen=" + gen + "'>" : "<img src='pokemon:" + pokeNum + "&gen=" + gen + "'>");
        }
        return (shine ? "<img src='pokemon:" + pokeNum + "&shiny=true'>" : "<img src='pokemon:" + pokeNum + "'>");
    },

    pokeIcon: function (pokeNum) {
        return "<img src='icon:" + pokeNum + "'>";
    },

    itemImage: function (itemNum) {
        return "<img src='item:" + itemNum + "'>";
    },

    color: function (src) {
        if (sys.getColor(src) == "#000000") {
            var colorlist = ["#5811B1", "#399BCD", "#0474BB", "#F8760D", "#A00C9E", "#0D762B", "#5F4C00", "#9A4F6D", "#D0990F", "#1B1390", "#028678", "#0324B1"];
            return colorlist[src % colorlist.length];
        }
        return sys.getColor(src);
    },

    authName: function (auth, displayuser, hideinvis) {
        if (auth === 0) {
            return displayuser ? AUTH_NAMES[auth] : "";
        } else if (auth == 1 || auth == 2 || auth == 3) {
            return AUTH_NAMES[auth];
        } else if (auth >= 4) {
            return hideinvis ? AUTH_NAMES[0] : AUTH_NAMES[4];
        }
    },

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
    },

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
    },

    authimage: function (src, authlevel) {
        var authImage = require("scripts/base64.js").auth;
        if (this.isAndroidOrWeb(src)) {
            return ({
                11: authImage.BATTLING_OWNER,
                10: authImage.BATTLING_ADMIN,
                9: authImage.BATTLING_MOD,
                8: authImage.BATTLING_USER,
                7: authImage.IDLE_OWNER,
                6: authImage.IDLE_ADMIN,
                5: authImage.IDLE_MOD,
                4: authImage.IDLE_USER,
                3: authImage.OWNER,
                2: authImage.ADMIN,
                1: authImage.MOD,
                0: authImage.USER
            }[authlevel] || authImage.IDLE_USER);
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

    },

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
    },
    /**
        ------------
        Tour Helpers
        ------------
    **/
    // tour.js?
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
    },

    tourstart: function (channel) {
        tour[channel].tourmode = 2;
        tour[channel].roundnumber = 0;
        this.roundpairing(channel);
    },

    tourcount: function (channel) {
        return tour[channel].tournumber - tour[channel].tourmembers.length;
    },

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
    },

    roundincrease: function (winnername, losername, channel) {
        var tourloser = tour[channel].tourbattlers.indexOf(losername);
        if (tourloser != - 1) {
            tour[channel].tourbattlers.splice(tourloser, 1);
            var tourwinner = tour[channel].tourbattlers.indexOf(winnername);
            tour[channel].tourbattlers.splice(tourwinner, 1);
        }
        if (winnername != "|bye|") {
            if (tour[channel].tourlosers.indexOf(winnername) == -1) {
                tour[channel].tourlosers.push(losername);
                tour[channel].tourwinners.push(winnername);
                sys.sendHtmlAll("<b>" + members[winnername] + " advances to the next round.</b>", channel);
            } else{
                tour[channel].tourwinners.splice(tour[channel].tourwinners.indexOf(losername), 1);
                tour[channel].tourlosers.splice(tour[channel].tourlosers.indexOf(winnername), 1);
                tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf(winnername), 1);
                tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf(losername), 1);
                tour[channel].tourcurrentnumber-= 2;
            }
        } else{
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
                tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf("|bye|"), 1);
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
    },

    roundpairing: function (channel) {
        while (0 in tour[channel].tourlosers) {
            tour[channel].tourmembers.splice(tour[channel].tourmembers.indexOf(tour[channel].tourlosers[0]), 1);
            tour[channel].tourlosers.splice(0, 1);
        }
        while (0 in tour[channel].tourwinners) {
            tour[channel].tourwinners.splice(0, 1);
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
    },

    rounddisplay: function (rounddisplayversion, channel) {
        var send = rounddisplayversion === 0 ? this.sendmessage : sys.sendHtmlAll;
        var correctborder = rounddisplayversion === 0 ? border : border2;
        var finalroundcheck = tour[channel].tourcurrentnumber == 2 ? "Final Round" : "Round " + tour[channel].roundnumber;
        var roundstring = correctborder + "<br/>"
        + "<timestamp/><font size=4><b>" + finalroundcheck + " of " + tour[channel].tourtier + " Tournament</b></font><br/>"
        + correctborder + "<br/>";
        for (var tourmembersindex = 0; tourmembersindex < tour[channel].tourcurrentnumber-rounddisplayversion; tourmembersindex+=2) {
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
    },

    tourmembersnumber: function (name, channel) {
        if (tour[channel].tourmode !== 0) {
            var tourmembersnumber = tour[channel].tourmembers.indexOf(name);
            if (tourmembersnumber != -1) {
                return tourmembersnumber;
            }
        }
    },

    tourmembersname: function (number, channel) {
        if (number <= tour[channel].tourcurrentnumber) {
            return members[tour[channel].tourmembers[number]];
        }
    },

    tourloserscheck: function (name, channel) {
        return tour[channel].tourlosers.indexOf(name) == -1 ? true: false;
    },

    opponentof: function (name, channel) {
        var tourmembersnumber = this.tourmembersnumber(name, channel);
        return tourmembersnumber % 2 === 0 ? tour[channel].tourmembers[tourmembersnumber+1]: tour[channel].tourmembers[tourmembersnumber-1];
    },

    nopair: function (index1, index2) {
        return (index1 % 2 === 0 && index2 != index1 + 1) || (index1 % 2 == 1 && index1 != index2 + 1) ? true: false;
    }
};
