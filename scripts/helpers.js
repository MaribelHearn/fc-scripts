/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY HELPER METHODS helpers.js
     - by Maribel Hearn, 2012-2015
    
    This script file contains utility
    methods that almost every other
    script file uses.
    ----------------------------------------------
*/

helpers = {
    /**
        ---------------
        Setting Helpers
        ---------------
    **/
    initData: function () {
        sys.mkdir("data");
        
        // Booleans
        sys.write("data/open.txt", "true");
        
        // Numbers
        sys.write("data/allowance.txt", 8);
        sys.write("data/floodtime.txt", 10);
        sys.write("data/floodlevel.txt", 1);
        sys.write("data/maxplayers.txt", 0);
        
        // Strings
        sys.write("data/API_KEY.txt", "");
        sys.write("data/botcolor.txt", "#318739");
        sys.write("data/partymode.txt", "none");
        sys.write("data/botsymbol.txt", "±");
        sys.write("data/servertopic.txt", "Welcome to " + sys.getServerName() + "!");
        sys.write("data/botsymbolcolor.txt", "#318739");
        sys.write("data/bordercolor.txt", "darkblue");
        
        // Arrays
        sys.write("data/allowed.txt", '["127.0.0.1"]');
        sys.write("data/cmdcolors.txt", '["royalblue","green","red","orange","gold","blue"]');
        sys.write("data/exceptions.txt", '["cofagrigus"]');
        sys.write("data/permchannels.txt", '["Watch","Auth Channel","Owner Channel","Party","Russian Roulette","Roulette"]');
        sys.write("data/allowedrange.txt", '["192.168"]');
        sys.write("data/namestounban.txt", "[]");
        sys.write("data/silentcmds.txt", '["future","spoiler","seval","sseval","skick",' +
        '"invisibleowner","invisible","invis","silentupdate","silenteval","secretsilenteval","silentkick","supdate"]');
        sys.write("data/nameblocklist.txt", '["fuck","bitch","gay","fag","sex","condom",' +
        '"vagina","dildo","vibrator","orgasm","cunt","cock","dick","asshole","blow","slut","pussy","rape","penis",' +
        '"horny","intercourse","nigger","nigga","shit","cum","bastard","anus","porn","fap","hitler",":","masturbat","rapist"]');
        sys.write("data/proxylist.txt", sys.read("proxy_list.txt"));
        sys.write("data/bansites.txt", sys.read("bansites.txt"));
        sys.rm("proxy_list.txt");
        sys.rm("bansites.txt");
        
        // Objects
        sys.write("data/bots.txt", '{"attack":"AttackBot","armyof":"ArmyBot","auth":"AuthBot","ban":"BanBot","caps":"CapsBot","channel":"ChannelBot",' +
        '"clear":"ClearBot","command":"CommandBot","flood":"FloodBot","fun":"FunBot","gigaban":"GigabanBot","idle":"IdleBot","kick":"KickBot",' +
        '"main":"Bot","megaban":"MegabanBot","mute":"MuteBot","name":"NameBot","party":"PartyBot","pass":"PassBot",' +
        '"priv":"PrivacyBot","reverse":"ReverseBot","rr":"RussiaBot","russia":"RussiaBot","script":"ScriptBot","silence":"SilenceBot",' +
        '"spy":"WatchBot","starfox":"Wolf","status":"StatusBot","tour":"TourBot","topic":"TopicBot","warn":"WarnBot","welcome":"WelcomeBot",' +
        '"roulette": "RouletteBot"}');
        sys.write("data/regchannels.txt", "{}");
        sys.write("data/rr.txt", "{}");
        sys.write("data/iplist.txt", "{}");
        sys.write("data/banlist.txt", "{}");
        sys.write("data/roulette.txt", "{}");
        sys.write("data/mutelist.txt", "{}");
        sys.write("data/bigtexts.txt", "{}");
        sys.write("data/timezone.txt", "{}");
        sys.write("data/cityname.txt", "{}");
        sys.write("data/versions.txt", "{}");
        sys.write("data/memberlist.txt", "{}");
        sys.write("data/banmsg.txt", "{}");
        sys.write("data/os.txt", "{}");
        sys.write("data/kickmsg.txt", "{}");
        sys.write("data/mutemsg.txt", "{}");
        sys.write("data/authtitles.txt", "{}");
        sys.write("data/megabanlist.txt", "{}");
        sys.write("data/gigabanlist.txt", "{}");
        sys.write("data/countryname.txt", "{}");
        sys.write("data/rangebanlist.txt", "{}");
        sys.write("data/selfkickmsg.txt", "{}");
        sys.write("data/rangebanmsg.txt", "{}");
    }
    
    ,
    
    setvariable: function (variable, data) {
        if (typeof(global[variable]) == "undefined") {
            global[variable] = data;
        }
    }
    
    ,
    
    memberslist: function () {
        var membersdatabase = sys.dbAll(), membersindex, playernumber;
        members = {};
        for (membersindex in membersdatabase) {
            members[membersdatabase[membersindex]] = membersdatabase[membersindex];
            playernumber = sys.id(membersdatabase[membersindex]);
            if (playernumber !== undefined) {
                members[membersdatabase[membersindex]] = sys.name(playernumber);
            }
        }
    }
    
    ,
    
    /**
        ----------------
        Checking Helpers
        ----------------
    **/
    isLetter: function (c) {
        var lower = c.toLowerCase();
        return lower >= 'a' && lower <= 'z';
    }
    
    ,
    
    floodCheck: function (src, channelname) {
        if (regchannels[channelname]) {
            return regchannels[channelname].flood;
        }
        if (players[src].floodcount > allowance) {
            floodplayers.splice(floodplayers.indexOf(src), 1);
            if (players[src].floodcount != Infinity && sys.auth(src) < floodlevel) {
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
                sys.sendHtmlAuth(this.bot(bots.spy ) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b style='color:" + this.color(src) + "'>" + this.escapehtml(name) + "</b> got Star Fox'd because of trying to run /" + this.escapehtml(cmd) + " (Error 403 Forbidden).");
            } else if (message.indexOf("Error 404, ") != -1) {
                sys.sendHtmlAuth(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b style='color:" + this.color(src) + "'>" + this.escapehtml(name) + "</b> got Star Fox'd because of trying to run /" + this.escapehtml(cmd) + " (Error 404 Not Found).");
            } else if (message.indexOf("Error 400, ") != -1) {
                sys.sendHtmlAuth(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b style='color:" + this.color(src) + "'>" + this.escapehtml(name) + "</b> got Star Fox'd because of trying to run /" + this.escapehtml(cmd) + " (Error 400 Bad Request).");
            } else if (message.indexOf("I KILL YOOOOUUUU!!!") != -1) {
                sys.sendHtmlAuth(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b style='color:" + this.color(src) + "'>" + this.escapehtml(name) + "</b> got Star Fox'd because of trying to post during silence.");
            } else if (message == "You tried.") {
                sys.sendHtmlAuth(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b style='color:" + this.color(src) + "'>" + this.escapehtml(name) + "</b> got Star Fox'd because of trying to kill Chuck Norris. How silly.");
            } else if (message == "Error 403, you are not allowed to post banned links or characters.") {
                sys.sendHtmlAuth(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b style='color:" + color + "'>" + name + "</b> tried to  post (a) banned link(s) or character(s). (Error 403 Forbidden)");
            } else {
                sys.sendHtmlAuth(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b style='color:" + this.color(src) + "'>" + this.escapehtml(name) + "</b> got Star Fox'd because of trying to run /" + this.escapehtml(cmd) + ".");
            }
        } else {
            if (message.indexOf("I KILL YOOOOUUUU!!!") != -1) {
                sys.sendHtmlAuth(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname +
                "</a>] <b style='color:" + this.color(src) + "'>" + this.escapehtml(name) + "</b> got Star Fox'd because of trying to talk during silence.");
            } else {
                sys.sendHtmlAuth(this.bot(bots.spy) + "[<a href=\"po:join/" + channelname + "\">#" + channelname + "</a>] <b style='color:" + this.color(src) + "'>" + this.escapehtml(name) +
                "</b> got Star Fox'd.");
            }
        }
    }
    
    ,
    
    muteMessage: function (src, channel) {
        var lower = players[src].name.toLowerCase();
        sys.sendHtmlMessage(src, this.bot(bots.mute) + "Sorry, you are muted on the server. [Time until expiration: " + this.formatMuteTime(mutelist[lower].time) +
        "] [Reason: " + mutelist[lower].reason + "]", channel);
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
    
    rouletteEventMessage: function (event, ended) {
        var eventMessage;
        if (ended) {
            eventMessage = "The " + this.formatEvent(event) + " has ended!";
        } else {
            if (event == "frenzy") {
                eventMessage = "A <b>Shiny Frenzy</b> has begun! Shiny odds will be greatly increased for a limited amount of time!";
            } else if (event == "fest") {
                eventMessage = "A <b>Chainfest</b> has begun! There will be a higher probability to chain Pokémon for a short time!";
            } else if (event == "legendary") {
                eventMessage = "A <b>Legendary Swarm</b> has begun! There will be a lot of them for a while!";
            } else {
                eventMessage = "A <b>Typeframe</b> has begun! There will be many Pokémon of the <img src='Themes/Classic/types/type" + sys.typeNum(event) + ".png'> type!";
            }
        }
        sys.sendHtmlAll(this.bot(bots.roulette) + eventMessage, roulettechannel);
    }
    
    ,
    
    /**
        --------------
        Return Helpers
        --------------
    **/
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
    
    isVowel: function (letter) {
        letter = letter.toLowerCase();
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u';
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
        } else if (LAGCHAR.test(string)) {
            return [true, "lagging characters"];
        } else if (SPECIAL.test(string) || OTHER.test(string)) {
            return [true, "special characters"];
        } else {
            return [false, ""];
        }
    }
    
    ,
    
    countryRetrievalUrl: function (ip) {
        return "http://api.ipinfodb.com/v3/ip-city/?key=" + API + "&ip=" + ip + "&format=json";
    }
    
    ,
    
    mapsUrl: function (city, country) {
        return "https://www.google.com/maps?q=" + city + ", " + country;
    }
    
    ,
    
    youtubeDataUrl: function (video) {
        return "http://crystal.moe/youtube?id=" + video;
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
        } else if (country == "Cote D'ivoire") {
            return "Ivory Coast";
        } else {
            return country;
        }
    }
    
    ,
    
    toFlagKey: function (country) {
        country = this.removespaces(country).toUpperCase();
        if (country == "U.A.E.") {
            return "UAE";
        } else if (country == "CHINA(TAIWAN)" || country == "CHINA(HONGKONG)") {
            return "CHINA";
        } else if (country == "UNITEDSTATES(PUERTORICO)" || country == "UNITEDSTATES(VIRGINISLANDS)") {
            return "UNITEDSTATES";
        } else if (country == "FRANCE(MARTINIQUE)" || country == "FRANCE(GUADELOUPE)" || country == "FRANCE(REUNION)") {
            return "FRANCE";
        } else if (country == "NETHERLANDS(CURACAO)") {
            return "NETHERLANDS";
        } else if (country == "COTED'IVOIRE") {
            return "IVORYCOAST";
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
    
    formatMuteTime: function (muteTime) { // muteTime is in seconds
        var str = "", days = 0, hours = 0, minutes = 0, seconds = 0;
        while (muteTime >= 86400) {
            days += 1;
            muteTime -= 86400;
        }
        if (days >= 1) {
            str += days + " days, ";
        }
        while (muteTime >= 3600) {
            hours += 1;
            muteTime -= 3600;
        }
        if (hours >= 1) {
            str += hours + " hours, ";
        }
        while (muteTime >= 60) {
            minutes += 1;
            muteTime -= 60;
        }
        if (minutes >= 1) {
            str += minutes + " minutes and ";
        }
        while (muteTime >= 1) {
            seconds += 1;
            muteTime -= 1;
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
    
    version: function (version) {
        switch (version) {
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
        } else if (srcos == "freebsd") {
            return FREEBSD_BASE64 + " FreeBSD";
        } else if (srcos == "android") {
            return ANDROID_BASE64 + " Android";
        } else if (srcos == "webclient") {
            return IE_BASE64 + " Web Client";
        }
    }
    
    ,
    
    bannedcharacters: function (message, lower) {
        for (var index in blocklist) {
            if (message.indexOf(blocklist[index]) != -1) {
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
                return "orangered";
            case 2:
                return "gold";
            case 3:
                return "green";
            case 4:
                return "blue";
            case 5:
                return "darkblue";
            case 6:
                return "purple";
            default:
                return "red";
        }
    }
    
    ,
    
    mode: function (src, message, channel, mode) {
        var name = this.escapehtml(sys.name(src)), auth = sys.auth(src), color = this.color(src), length = message.length;
        if (mode == "joke") {
            var playerids = sys.playerIds(), random;
            length = playerids.length;
            random = sys.rand(0, length);
            color = this.color(playerids[random]);
            message = this.escapehtml(message);
            if (sys.auth(sys.playerIds()[random]) > 0) {
                message = "<font color='" + color + "'><timestamp/> +<b><i>" + sys.name(playerids[random]) + ":</i></b></font> " + message;
            } else {
                message = "<font color='" + color + "'><timestamp/> <b>" + sys.name(playerids[random]) + ":</b></font> " + message;
            }
            sys.sendHtmlAll(message, channel);
            return;
        } else if (mode == "nightclub") {
            message = this.escapehtml(message);
            if (auth > 0) {
                message = "<span style='font-size:16px;color:white'><timestamp/> <b><i>" + this.rainbow(name + ":") + "</i> " + message + "</b></span>";
            } else {
                message = "<span style='font-size:16px;color:white'><timestamp/> <b>" + this.rainbow(name + ":") + " " + message + "</b></span>";
            }
            sys.sendHtmlAll(message, channel);
            return;
        } else if (mode == "rainbow" || mode == "desu" || mode == "leet" || mode == "morse") {
            mode == "leet" || mode == "morse" ? message = helpers[mode](message) : message = "<b>" + helpers[mode](message) + "</b>";
        } else if (mode == "nyan") {
            var index = 1;
            message = "Nyan";
            while (index < length) {
                message += " Nyan";
                index++;
            }
            sys.sendHtmlAll("<font color='white'>:</font><div style='background:" + this.nyancolor(partynyan) + "'><center><span style='font-size:16px'>" + message + "</span></center>", channel);
            partynyan++;
            if (partynyan == 7) {
                partynyan = 0;
            }
            return;
        } else if (mode == "dennis") {
            if (message.toLowerCase() == "/dennis") {
                usercommands2.dennis(src, channel, ["dennis"]);
                return true;
            }
            var index = 1;
            message = "D";
            while (index < length) {
                message += "D";
                index++;
            }
            index = 0;
            while (index < length) {
                message += "E";
                index++;
            }
            index = 0;
            while (index < length) {
                message += "N";
                index++;
            }
            index = 0;
            while (index < length) {
                message += "N";
                index++;
            }
            index = 0;
            while (index < length) {
                message += "I";
                index++;
            }
            index = 0;
            while (index < length) {
                message += "S";
                index++;
            }
            message += "!";
        } else if (mode == "sparta") {
            var index = 0;
            message = "This.. is.. SPART";
            while (index < length) {
                message += "A";
                index++;
            }
            message += "!";
        } else if (mode == "luigi") {
            var index = 1;
            message = "SpaghE";
            while (index < length) {
                message += "E";
                index++;
            }
            message += "tti!";
        } else if (mode == "roflcopter") {
            var index = 1;
            message = "soi";
            while (index < length) {
                message += " soi";
                index++;
            }
        } else if (mode == "asdf") {
            var index = 1;
            message = "asdf";
            while(index < length) {
                message += "asdf";
                index++;
            }
        } else if (mode == "derp") {
            var index = 0;
            message = "";
            while (index < length) {
                random = sys.rand(0, 7);
                if (random === 0) {
                    message += " derp";
                } else if (random == 1) {
                    message += " herp";
                } else if (random == 2) {
                    message += " merp";
                } else if (random == 3) {
                    message += " ferp";
                } else if (random == 4) {
                    message += " bulbaderp";
                } else if (random == 5) {
                    message += " darp";
                } else if (random == 6) {
                    message += " durp";
                }
                index++;
            }
        } else if (mode == "cirno") {
            var index = 1;
            random = sys.rand(0, 2);
            random === 0 ? message = "BAKA" : message = "&#x2788;";
            while (index < length) {
                random === 0 ? message += "BAKA" : message += " &#x2788;";
                index++;
            }
        } else if (mode == "reverse") {
            message = this.reverse(this.escapehtml(message));
        } else if (mode == "russian") {
            message = this.russian(this.escapehtml(message));
        }
        if (auth > 0) {
            message = "<font color='" + color + "'><timestamp/> +<b><i>" + name + ":</i></b></font> " + message;
        } else {
            message = "<font color='" + color + "'><timestamp/> <b>" + name + ":</b></font> " + message;
        }
        sys.sendHtmlAll(message, channel);
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
        var array = [];
        for (var i in usercommands1) {
            array.push(i);
        }
        for (var i in usercommands2) {
            array.push(i);
        }
        for (var i in modcommands) {
            array.push(i);
        }
        for (var i in admincommands) {
            array.push(i);
        }
        for (var i in ownercommands) {
            array.push(i);
        }
        for (var i in cusercommands) {
            array.push(i);
        }
        for (var i in cmodcommands) {
            array.push(i);
        }
        for (var i in cadmincommands) {
            array.push(i);
        }
        for (var i in cownercommands) {
            array.push(i);
        }
        for (var i in roulettecommands) {
            array.push(i);
        }
        for (var i in rrcommands) {
            array.push(i);
        }
        for (var i in partycommands) {
            array.push(i);
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
            return "<b style='color:" + botsymbolcolor + "'>" + string.substr(0, 3) + "</b><b style='color:" + botcolor + "'>" + string.slice(3) + "</b>";
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
        var string = date.toString();
        if (string.indexOf("GMT-0400 (Eastern Daylight Time)") != -1) {
            return string.replace("GMT-0400 (Eastern Daylight Time)", "GMT-4");
        } else if (string.indexOf("GMT-0500 (Eastern Standard Time)") != -1) {
            return string.replace("GMT-0500 (Eastern Standard Time)", "GMT-5");
        } else if (string.indexOf("GMT+0200 (West-Europa (zomertijd))") != -1) {
            return string.replace("GMT+0200 (West-Europa (zomertijd))", "GMT+2");
        } else if (string.indexOf("GMT+0100 (West-Europa (standaardtijd))") != -1) {
            return string.replace("GMT+0100 (West-Europa (standaardtijd))", "GMT+1");
        }
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
        var movesarraya = moves.split("\n");
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
        var movesarraya = moves.split("\n");
        movesarraya[0] = movesarraya[0].split(" ");
        for (var i in movesarraya[0]) {
            movesarraya[0][i] = sys.move(movesarraya[0][i]);
        }
        return movesarraya[0];
    }
    
    ,
    
    htmlLinks:  function (text) {
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
        return link;
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
        var x, y = [], highestauth = 0, list = sys.dbAuths().sort();
        for (x in list) {
            auth = sys.dbAuth(list[x]);
            if (auth > highestauth) {
                highestauth = auth;
            }
        }
        while (highestauth > 0) {
            for (x in list) {
                if (sys.dbAuth(list[x]) == highestauth) {
                    y.push(list[x]);
                }
            }
            highestauth--;
        }
        return y;
    }
    
    ,
    
    userb: function (string) {
        return "<b style='color:" + cmdcolors[0] + "'>" + this.escapehtml(string) + "</b>";
    }
    
    ,
    
    userg: function (string) {
        return "<b style='color:gray'>" + this.escapehtml(string) + "</b>";
    }
    
    ,
    
    userl: function (string) {
        return "<a href='po:send/" + string + "' style='text-decoration: none;'><font color='" + cmdcolors[0] + "'>" + this.escapehtml(string) + "</font></a>";
    }
    
    ,
    
    user: function (string) {
        return "<font color='" + cmdcolors[0] + "'>" + this.escapehtml(string) + "</font>";
    }
    
    ,
    
    arg: function (string) {
        return "<font color='" + cmdcolors[1] + "'>" + this.escapehtml(string) + "</font>";
    }
    
    ,
    
    arg2: function (string) {
        return "<font color='" + cmdcolors[2] + "'>" + this.escapehtml(string) + "</font>";
    }
    
    ,
    
    arg3: function (string) {
        return "<font color='" + cmdcolors[3] + "'>" + this.escapehtml(string) + "</font>";
    }
    
    ,
    
    arg4: function (string) {
        return "<font color='" + cmdcolors[4] + "'>" + this.escapehtml(string) + "</font>";
    }
    
    ,
    
    arg5: function (string) {
        return "<font color='" + cmdcolors[5] + "'>" + this.escapehtml(string) + "</font>";
    }
    
    ,
    
    rainbow: function (given_text) {
        var x = [], y = 0, z = 0;
        while (y < given_text.length) {
            x[y] = given_text.charAt(y);
            if(z === 0) {x[y] = "<font color='red'>"+x[y]+"</font>";z = 1;}
            else if(z == 1) {x[y] = "<font color='orange'>"+x[y]+"</font>";z = 2;}
            else if(z == 2) {x[y] = "<font color='gold'>"+x[y]+"</font>";z = 3;}
            else if(z == 3) {x[y] = "<font color='green'>"+x[y]+"</font>";z = 4;}
            else if(z == 4) {x[y] = "<font color='blue'>"+x[y]+"</font>";z = 5;}
            else if(z == 5) {x[y] = "<font color='indigo'>"+x[y]+"</font>";z = 6;}
            else if(z == 6) {x[y] = "<font color='purple'>"+x[y]+"</font>";z = 0;}
            y++;
        }
        var a = 0;var text = "";
        while (a < given_text.length) {
            text = text + x[a];
            a++;
        }
        return text;
    }

    ,
    
    desu: function (given_text) {
        var x = [], y = 0, z = 0;
        var f = sys.rand(0, 2);
        if(f === 0) {
            while (y < given_text.length) {
                x[y] = given_text.charAt(y);
                if(z === 0) {x[y] = "<font color='green'>"+x[y]+"</font>";z = 1;}
                else if(z == 1) {x[y] = "<font color='red'>"+x[y]+"</font>";z = 0;}
                y++;
            }
        }
        else{
            while (y < given_text.length) {
                x[y] = given_text.charAt(y);
                if(z === 0) {x[y] = "<font color='red'>"+x[y]+"</font>";z = 1;}
                else if(z == 1) {x[y] = "<font color='green'>"+x[y]+"</font>";z = 0;}
                y++;
            }
        }
        var a = 0;var text = "";
        while (a < given_text.length) {
            text = text + x[a];
            a++;
        }
        return text;
    }

    ,
    
    duoColor: function (given_text, colorX, colorY) {
        var x = [], y = 0, z = 0, a = 0, text = "";
        while (y < given_text.length) {
            x[y] = given_text.charAt(y);
            if (z === 0) {
                x[y] = "<font color='" + colorX + "'>" + this.escapehtml(x[y]) + "</font>";
                z = 1;
            } else if (z == 1) {
                x[y] = "<font color='" + colorY + "'>" + this.escapehtml(x[y]) + "</font>";
                z = 0;
            }
            y++;
        }
        while (a < given_text.length) {
            text = text + x[a];
            a++;
        }
        return text;
    }

    ,
        
    leet: function (text) {
        return text.toLowerCase().replace(/a/g, "4").replace(/e/g, "3").replace(/g/g, "9").replace(/l/g, "1").replace(/o/g, "0").replace(/s/g, "5").replace(/t/g, "7").replace(/z/g, "2");
    }
        
    ,
    
    morse: function (text) {
        text = text.replace(/a/gi, ".- ");
        text = text.replace(/b/gi, "-... ");
        text = text.replace(/c/gi, "-.-. ");
        text = text.replace(/d/gi, "-.. ");
        text = text.replace(/e/gi, ". ");
        text = text.replace(/f/gi, "..-. ");
        text = text.replace(/g/gi, "--. ");
        text = text.replace(/h/gi, ".... ");
        text = text.replace(/i/gi, ".. ");
        text = text.replace(/j/gi, ".--- ");
        text = text.replace(/k/gi, "-.- ");
        text = text.replace(/l/gi, ".-.. ");
        text = text.replace(/m/gi, "-- ");
        text = text.replace(/n/gi, "-. ");
        text = text.replace(/o/gi, "--- ");
        text = text.replace(/p/gi, ".--. ");
        text = text.replace(/q/gi, "--.- ");
        text = text.replace(/r/gi, ".-. ");
        text = text.replace(/s/gi, "... ");
        text = text.replace(/t/gi, "- ");
        text = text.replace(/u/gi, "..- ");
        text = text.replace(/v/gi, "...- ");
        text = text.replace(/w/gi, ".-- ");
        text = text.replace(/x/gi, "-..- ");
        text = text.replace(/y/gi, "-.-- ");
        text = text.replace(/z/gi, "--.. ");
        text = text.replace(/0/g, "----- ");
        text = text.replace(/1/g, ".---- ");
        text = text.replace(/2/g, "..--- ");
        text = text.replace(/3/g, "...-- ");
        text = text.replace(/4/g, "....- ");
        text = text.replace(/5/g, "..... ");
        text = text.replace(/6/g, "-.... ");
        text = text.replace(/7/g, "--... ");
        text = text.replace(/8/g, "---.. ");
        text = text.replace(/9/g, "----. ");
        return text;
    }
    
    ,
    
    reverse: function (text) {
        return text.split("").reverse().join("");
    }
    
    ,
    
    statcolor: function (stat) {
        if (stat <= 30) {
            return "darkred";
        } else if (stat < 60) {
            return "red";
        } else if (stat < 90) {
            return "orangered";
        } else if (stat < 120) {
            return "lime";
        } else if (stat < 150) {
            return "green";
        } else if (stat < 180) {
            return "blue";
        } else {
            return "darkblue";
        }
    }
    
    ,
    
    cap: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    ,

    removespaces: function (string) {
        return string.split(" ").join("");
    }

    ,
    
    strip: function (str) {
        return str.replace(/<\/?[^>]*>/g, "");
    }
    
    ,

    breakinghtml: function (string) {
        return string.split("<").length > string.split(">").length || this.removespaces(string).indexOf("<center>") >= 0 || this.removespaces(string).indexOf("dir=rtl") >= 0;
    }

    ,

    escapehtml: function (string) {
        return string.toString().replace(/&/g, "&amp;").replace(/\>/g, "&gt;").replace(/</g, "&lt;");
    }

    ,
    
    escapehtmluser: function (string) {
        return "<font color='royalblue'>" + string.replace(/&/g, "&amp;").replace(/\>/g, "&gt;").replace(/</g, "&lt;") + "</font>";
    }
    
    ,
    
    escapehtmlarg: function (string) {
        return "<font color='green'>" + string.replace(/&/g, "&amp;").replace(/\>/g, "&gt;").replace(/</g, "&lt;") + "</font>";
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
    
    typecolor: function (pokenum) {
        return ([
            "olive",
            "darkred",
            "slateblue",
            "purple",
            "brown",
            "saddlebrown",
            "lime",
            "indigo",
            "grey",
            "red",
            "blue",
            "green",
            "gold",
            "violet",
            "cyan",
            "darkblue",
            "black",
            "fuchsia",
            "seagreen",
        ][sys.pokeType1(pokenum)]);
    }
    
    ,
    
    color: function (src) {
        if (sys.getColor(src) == '#000000') {
            var colorlist = ['#5811b1', '#399bcd', '#0474bb', '#f8760d', '#a00c9e', '#0d762b', '#5f4c00', '#9a4f6d', '#d0990f', '#1b1390', '#028678', '#0324b1'];
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
    
    authname: function (auth, displayuser, hideinvis) {
        if (auth === 0) {
            return displayuser ? "User" : "";
        } else if (auth == 1) {
            return "Moderator";
        } else if (auth == 2) {
            return "Administrator";
        } else if (auth == 3) {
            return "Owner";
        } else if (auth >= 4) {
            return hideinvis ? "User" : "Invisible Owner";
        }
    }
    
    ,
    
    cauth: function (name, channel) {
        var lower = sys.channel(channel).toLowerCase();
        if (regchannels[lower]) {
            for (var ownerindex in regchannels[lower].owners) {
                if (regchannels[lower].owners[ownerindex] == name || sys.dbAuth(name) == 3) {
                    return 3;
                }
            }
            for (var adminindex in regchannels[lower].admins) {
                if (regchannels[lower].admins[adminindex] == name || sys.dbAuth(name) == 2) {
                    return 2;
                }
            }
            for (var modindex in regchannels[lower].mods) {
                if (regchannels[lower].mods[modindex] == name || sys.dbAuth(name) == 1) {
                    return 1;
                }
            }
            return 0;
        } else {
            return 0;
        }
    }
    
    ,
    
    cauthname: function (src, channel) {
        var auth = this.cauth(src, channel);
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
        if (sys.os(src) == "webclient" || sys.os(src) == "android") {
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
