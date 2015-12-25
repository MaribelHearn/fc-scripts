/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY MAIN SCRIPT main.js
     - by Maribel Hearn, 2012-2015
    
    The main script file. Defines global
    constants, variables, functions and
    contains the event handlers.
    ----------------------------------------------
*/
(load = function () {
    /**
        ----------------
        Global Constants
        ----------------
    **/
    global = this;
    DELIMITER = '*';
    COMMAND_SYMBOL = '/';
    TOPIC_DELIMITER = " || ";
    RELAY_STATION_PROXY = "::1%0";
    IP_RETRIEVAL_URL = "http://whatismyip.akamai.com";
    REGISTRY_URL = "http://registry.pokemon-online.eu/";
    BETA_TIERS_URL = "https://raw.githubusercontent.com/po-devs/po-server-goodies/master/tiers.xml";
    SCRIPT_URL = "https://raw.githubusercontent.com/MaribelHearn/fc-scripts/master/scripts/";
    PLUGIN_URL = "https://raw.githubusercontent.com/MaribelHearn/fc-scripts/master/plugins/";
    REACTIVATE_REGISTER_BUTTON = 14;
    FAKEI = /\u00A1/;
    OTHER = /\u3061|\u65532/;
    THAI = /[\u0E00-\u0E7F]/;
    GREEK = /[\u0370-\u03FF]/;
    ZALGO = /[\u0300-\u036F]/;
    HEBREW = /[\u0591-\u05F4]/;
    ARABIC = /[\u0600-\u06FF]/;
    NUMBERS = /[\u0030-\u0039]/;
    SPECIAL = /[\ufff0-\uffff]/;
    ARMENIAN = /[\u0555-\u0585]/;
    LOWERCASE = /[\u0061-\u007A]/;
    UPPERCASE = /[\u0041-\u005A]/;
    SPACE = /\u0009-\u000D|\u0085|\u00A0|\u1680|\u180E|\u2000-\u200A|\u2028|\u2029|\u2029|\u202F|\u205F|\u3000/;
    DASH = /\u058A|\u05BE|\u1400|\u1806|\u2010-\u2015|\u2053|\u207B|\u208B|\u2212|\u2E17|\u2E1A|\u301C|\u3030|\u30A0|[\uFE31-\uFE32]|\uFE58|\uFE63|\uFF0D/;
    CYRILLIC = /\u0408|\u03a1|\u0430|\u0410|\u0412|\u0435|\u0415|\u041c|\u041d|\u043e|\u041e|\u0440|\u0420|\u0441|\u0421|\u0422|\u0443|\u0445|\u0425|\u0456|\u0406/;
    AUTH_NAMES = ["User", "Moderator", "Administrator", "Owner", "Invisible Owner"];
    SCRIPT_MODULES = ["usercmds.js", "modcmds.js", "admincmds.js", "ownercmds.js", "cusercmds.js", "cmodcmds.js", "cadmincmds.js", "cownercmds.js", "helpers.js", "handler.js", "tierchecks.js", "base64.js"];
    SCRIPT_PLUGINS = ["funcmds.js", "party.js", "roulette.js", "rr.js", "safari.js"];
    SCRIPTS_FOLDER = "scripts/";
    PLUGINS_FOLDER = "plugins/";
    DATA_FOLDER = "data/";
    /**
        ------------------------
        Load Modules and Plugins
        ------------------------
    **/
    if (typeof(moduleLoaded) == "undefined") {
        moduleLoaded = {};
    }
    for (var i in SCRIPT_MODULES) {
        if (!moduleLoaded[i]) {
            print("Loaded module " + SCRIPT_MODULES[i]);
            sys.exec(SCRIPTS_FOLDER + SCRIPT_MODULES[i]);
            moduleLoaded[i] = true;
        }
    }
    if (typeof(pluginLoaded) == "undefined") {
        pluginLoaded = {};
    }
    if (helpers.isInArray("plugins", sys.dirsForDirectory(sys.cwd()))) {
        for (var i in SCRIPT_PLUGINS) {
            if (sys.fileExists(PLUGINS_FOLDER + SCRIPT_PLUGINS[i]) && !pluginLoaded[i]) {
                print("Loaded plugin " + SCRIPT_PLUGINS[i]);
                sys.exec(PLUGINS_FOLDER + SCRIPT_PLUGINS[i]);
                pluginLoaded[i] = true;
            }
        }
    }
    /**
        -----------------------------------------------
        Initialize data for first time use, set API key
        -----------------------------------------------
    **/
    if (!helpers.isInArray("data", sys.dirsForDirectory(sys.cwd()))) {
        helpers.initData();
    }
    API_KEY = sys.read(DATA_FOLDER + "API_KEY.txt");
    /**
        ----------------------
        Additional Sys Methods
        ----------------------
    **/
    sys.range = function(src) {
        return sys.ip(src).split('.')[0] + '.' + sys.ip(src).split('.')[1];
    };
    sys.dbRange = function(name) {
        return sys.dbIp(name).split('.')[0] + '.' + sys.dbIp(name).split('.')[1];
    };
    sys.sendMain = function (message) {
        sys.sendAll(message, 0);
    };
    sys.sendHtmlMain = function (message) {
        sys.sendHtmlAll(message, 0);
    };
    sys.sendHtmlAuths = function (message, channel) {
        if (!channel) {
            for (var index in players) {
                if (sys.auth(index) > 1) {
                    sys.sendHtmlMessage(index, message, 0);
                }
            }
        } else {
            for (var index in players) {
                if (sys.auth(index) > 1) {
                    sys.sendHtmlMessage(index, message, channel);
                }
            }
        }
    };
    sys.sendHtmlAuth = function (message) {
        sys.sendHtmlAll(message, watch);
    };
    sys.sendHtmlOwner = function (message) {
        sys.sendHtmlAll(message, ownerchannel);
    };
    sys.printStackTrace = function (message) {
        try {
            var table = "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>" +
            "<table cellpadding='2' cellspacing='0'><tr style='background-color: #B0B0B0;'><th>File</th><th>At line</th><th>Variables</th></tr>";
            var stackTrace = message.split("<global>")[0].replace(/at scripts/g, "<br>at scripts").split("<br>");
            var errorMessage = stackTrace[0], tmp, file, line, vars;
            stackTrace.splice(0, 1);
            for (var i in stackTrace) {
                tmp = stackTrace[i].replace("at ", "").split(':');
                file = tmp[0].replace("scripts/", "");
                tmp = tmp[1].split("<anonymous>");
                line = tmp[0].replace('\n', "");
                tmp[1] === undefined ? vars = "" : vars = tmp[1].replace('(', "").replace(')', "");
                table += "<tr><td>" + file + "</td><td>" + line + "</td><td>" + vars + "</td></tr>";
            }
            sys.sendHtmlOwner(helpers.bot(bots.script) + errorMessage + "<br>" + table + "</table>");
        } catch (e) {
            sys.sendHtmlOwner(helpers.bot(bots.script) + "An error occurred while trying to print the stack trace for another error (lol): " + e);
        }
    };
    sys.isMegaBanned = function (cookie) {
        return cookie == "banned" || cookie.substr(0, 6) == "banned";
    };
    sys.isGigaBanned = function (id) {
        for (var i in gigabanlist) {
            if (gigabanlist[i].id == id) {
                return true;
            }
        }
        return false;
    };
    /**
        ----------------
        Global Variables
        ----------------
    **/
    helpers.setVariable("open", helpers.readData("open") == "true" ? true : false);
    allowance = helpers.readNumber("allowance");
    floodtime = helpers.readNumber("floodtime");
    floodlevel = helpers.readNumber("floodlevel");
    maxplayers = helpers.readNumber("maxplayers");
    botcolor = helpers.readData("botcolor");
    botsymbol = helpers.readData("botsymbol");
    servertopic = helpers.readData("servertopic");
    botsymbolcolor = helpers.readData("botsymbolcolor");
    borderColor = helpers.readData("bordercolor");
    serverTopicColor = helpers.readData("servertopiccolor");
    channelTopicColor = helpers.readData("channeltopiccolor");
    welcomeMessage = helpers.readData("welcomemessage");
    leaveMessage = helpers.readData("leavemessage");
    channelWelcomeMessage = helpers.readData("channelwelcomemessage");
    channelLeaveMessage = helpers.readData("channelleavemessage");
    noPermissionMessage = helpers.readData("nopermissionmessage");
    allowed = helpers.readObject("allowed");
    cmdcolors = helpers.readObject("cmdcolors");
    exceptions = helpers.readObject("exceptions");
    permchannels = helpers.readObject("permchannels");
    allowedrange = helpers.readObject("allowedrange");
    namestounban = helpers.readObject("namestounban");
    silentcommands = helpers.readObject("silentcommands");
    nameblocklist = helpers.readObject("nameblocklist");
    proxylist = helpers.readData("proxylist").split('\n');
    bansites = helpers.readData("bansites").replace(/\r/g, "").split('\n');
    bots = helpers.readObject("bots");
    rules = helpers.readObject("rules");
    iplist = helpers.readObject("iplist");
    banlist = helpers.readObject("banlist");
    mutelist = helpers.readObject("mutelist");
    bigtexts = helpers.readObject("bigtexts");
    timezone = helpers.readObject("timezone");
    cityname = helpers.readObject("cityname");
    versions = helpers.readObject("versions");
    members = helpers.readObject("members");
    listcolors = helpers.readObject("listcolors");
    banmessages = helpers.readObject("banmessages");
    operatingsystem = helpers.readObject("operatingsystem");
    kickmessages = helpers.readObject("kickmessages");
    mutemessages = helpers.readObject("mutemessages");
    authtitles = helpers.readObject("authtitles");
    regchannels = helpers.readObject("regchannels");
    megabanlist = helpers.readObject("megabanlist");
    gigabanlist = helpers.readObject("gigabanlist");
    countryname = helpers.readObject("countryname");
    rangebanlist = helpers.readObject("rangebanlist");
    selfkickmessages = helpers.readObject("selfkickmessages");
    rangebanmessages = helpers.readObject("rangebanmessages");
    helpers.setVariable("tor", false);
    helpers.setVariable("stopbattles", false);
    helpers.setVariable("megabancheck", false);
    helpers.setVariable("gigabancheck", false);
    helpers.setVariable("serverStarting", false);
    helpers.setVariable("timer", 0);
    helpers.setVariable("currentSpoiler", 0);
    helpers.setVariable("layout", "new");
    helpers.setVariable("hostIp", "");
    helpers.setVariable("hostCountry", "");
    helpers.setVariable("hostCity", "");
    helpers.setVariable("hostTimeZone", "");
    helpers.setVariable("border", "<font color='" + borderColor + "'><b>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></b></font>");
    helpers.setVariable("border2", "<font color='" + borderColor + "'><b>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;" +
    "&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</b></font>");
    helpers.setVariable("players", []);
    helpers.setVariable("floodplayers", []);
    helpers.setVariable("spoilers", []);
    helpers.setVariable("tour", {});
    helpers.setVariable("battles", {});
    helpers.setVariable("heightList", {});
    helpers.setVariable("weightList", {});
    helpers.setVariable("movepoolList", {});
    helpers.setVariable("powerList", {});
    helpers.setVariable("categoryList", {});
    helpers.setVariable("accList", {});
    helpers.setVariable("ppList", {});
    helpers.setVariable("moveEffList", {});
    helpers.setVariable("moveFlagList", {});
    helpers.setVariable("movePriorityList", {});
    helpers.setVariable("moveRangeList", {});
    helpers.setVariable("abilityList", {});
    helpers.setVariable("pokemonWithAbilityList", {});
    helpers.setVariable("itemList", {});
    helpers.setVariable("berryList", {});
    helpers.setVariable("flingPowerList", {});
    helpers.setVariable("berryPowerList", {});
    helpers.setVariable("berryTypeList", {});
    
    tour[0] = {};
    tour[0].tourmode = 0;
    bansites.splice(bansites.indexOf(""), 1);
    bansites.splice(bansites.lastIndexOf(""), 1);
    allcommands = helpers.allCommands();
    if (permchannels.length == 7) {
        if (!helpers.isLoaded("safari.js")) {
            permchannels.splice(6, 1);
        }
    }
    if (permchannels.length == 6) {
        if (!helpers.isLoaded("roulette.js")) {
            permchannels.splice(5, 1);
        }
    }
    if (permchannels.length == 5) {
        if (!helpers.isLoaded("rr.js")) {
            permchannels.splice(4, 1);
        }
    }
    if (permchannels.length == 4) {
        if (!helpers.isLoaded("party.js")) {
            permchannels.splice(3, 1);
        }
    }
    if (permchannels.length == 3) {
        if (helpers.isLoaded("party.js")) {
            permchannels.push("Party");
        }
    }
    if (permchannels.length == 4) {
        if (helpers.isLoaded("rr.js")) {
            permchannels.push("Russian Roulette");
        }
    }
    if (permchannels.length == 5) {
        if (helpers.isLoaded("roulette.js")) {
            permchannels.push("Roulette");
        }
    }
    if (permchannels.length == 6) {
        if (helpers.isLoaded("safari.js")) {
            permchannels.push("Safari");
        }
    }
    helpers.saveData("permchannels");
}
).call(null);

({
    
    loadScript: function () {
    }
    
    ,
    
    unloadScript: function () {
    }
    
    ,
    
    switchError: function () {
    }
    
    ,
    
    warning: function (warning) {
    }
    
    ,
    
    battleConnectionLost: function () {
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Connection to the battle server was lost.");
    }
    
    ,
    
    serverStartUp: function () {
        serverStarting = true;
        sys.system("start RelayStation");
        /**
            ----------------
            Channel Creation
            ----------------
        **/
        var time = 500;
        sys.setTimer(function () {
            sys.createChannel(permchannels[0]);
        }, time, 0);
        time += 500;
        sys.setTimer(function () {
            sys.createChannel(permchannels[1]);
        }, time, 0);
        time += 500;
        sys.setTimer(function () {
            sys.createChannel(permchannels[2]);
        }, time, 0);
        if (helpers.isLoaded("party.js")) {
            time += 500;
            sys.setTimer(function () {
                sys.createChannel(permchannels[3]);
            }, time, 0);
        }
        if (helpers.isLoaded("rr.js")) {
            time += 500;
            sys.setTimer(function () {
                sys.createChannel(permchannels[4]);
            }, time, 0);
        }
        if (helpers.isLoaded("roulette.js")) {
            time += 500;
            sys.setTimer(function () {
                sys.createChannel(permchannels[5]);
            }, time, 0);
        }
        if (helpers.isLoaded("safari.js")) {
            time += 500;
            sys.setTimer(function () {
                sys.createChannel(permchannels[6]);
            }, time, 0);
        }
        time += 500;
        sys.setTimer(function () {
            watch = sys.channelId(permchannels[0]);
            authchannel = sys.channelId(permchannels[1]);
            ownerchannel = sys.channelId(permchannels[2]);
            if (helpers.isLoaded("party.js")) {
                partychannel = sys.channelId(permchannels[3]);
            }
            if (helpers.isLoaded("rr.js")) {
                rrchannel = sys.channelId(permchannels[4]);
            }
            if (helpers.isLoaded("roulette.js")) {
                roulettechannel = sys.channelId(permchannels[5]);
            }
            if (helpers.isLoaded("safari.js")) {
                safarichannel = sys.channelId(permchannels[6]);
            }
            print("The default channels have been created.");
            serverStarting = false;
        }, time, 0);
        /**
            ----------------------------------
            Set Host IP, Country and Time Zone
            ----------------------------------
        **/
        sys.webCall(IP_RETRIEVAL_URL, function (resp) {
            if (resp === "") {
                print("An error occurred while loading the host IP address.");
                return;
            }
            hostIp = resp;
            if (API_KEY !== "") {
                sys.webCall(helpers.countryRetrievalUrl(hostIp), function (resp) {
                    resp = JSON.parse(resp);
                    hostTimeZone = helpers.timezonedata(resp.countryName, resp.timeZone);
                    hostCountry = helpers.countrydata(resp.countryName);
                    hostCity = helpers.citydata(resp.cityName);
                    print("Host location data has been loaded.");
                });
            }
        });
    }

    ,

    serverShutDown: function () {
        /**
            ---------------------------------------------------------------------
            Close Battle Server, Relay Station and delete some data to save space
            ---------------------------------------------------------------------
        **/
        sys.killBattleServer();
        sys.system("taskkill /f /im RelayStation.exe");
        for (var index in countryname) {
            if (sys.dbAuth(index) <= 0) {
                delete countryname[index];
                delete cityname[index];
                delete timezone[index];
                delete operatingsystem[index];
                delete versions[index];
                helpers.saveData("countryname");
                helpers.saveData("cityname");
                helpers.saveData("timezone");
                helpers.saveData("operatingsystem");
                helpers.saveData("versions");
            }
        }
    }

    ,

    step: function () {
        var name, number, number2, randomEvent;
        /**
            --------
            Flooding
            --------
        **/
        if (floodtime != "off") {
            for (var playersindex in floodplayers) {
                players[floodplayers[playersindex]].floodcounttimer += 1;
                if (players[floodplayers[playersindex]].floodcounttimer == floodtime) {
                    players[floodplayers[playersindex]].floodcount-= Number(allowance);
                    players[floodplayers[playersindex]].floodcounttimer = 0;
                    if (players[floodplayers[playersindex]].floodcount <= 0) {
                        players[floodplayers[playersindex]].floodcount = 0;
                        floodplayers.splice(playersindex, 1);
                    }
                }
            }
        }
        /**
            --------
            Ban Time
            --------
        **/
        for (var index in banlist) {
            if (banlist[index].time) {
                banlist[index].time--;
                if (banlist[index].time === 0) {
                    delete banlist[index];
                    members[index] ? name = members[index] : name = index;
                    sys.sendHtmlMain(helpers.bot(bots.ban) + name + "'s ban has expired!");
                }
                helpers.saveData("banlist");
            }
        }
        /**
            ---------
            Mute Time
            ---------
        **/
        for (var index in mutelist) {
            if (mutelist[index].time) {
                mutelist[index].time--;
                if (mutelist[index].time === 0) {
                    delete mutelist[index];
                    members[index] ? name = members[index] : name = index;
                    sys.sendHtmlMain(helpers.bot(bots.mute) + name + "'s mute has expired!");
                }
                helpers.saveData("mutelist");
            }
        }
        /**
            ---------------
            Roulette Events
            ---------------
        **/
        if (helpers.isLoaded("roulette.js")) {
            if (sys.playersOfChannel(roulettechannel).length !== 0) { // only trigger events when at least one person is in the channel
                rouletteStep += 1;
                
                // if the waiting time's up and there is no event going, start a new event
                if (rouletteEvent === "" && rouletteStep == rouletteTime) {
                    randomEvent = sys.rand(0, 100);
                    if (randomEvent < 34) {
                        rouletteEvent = "frenzy";
                        for (var i in roulette) {
                            roulette[i].shinyChance = parseInt(4096 / (4096 / 33));
                        }
                        rouletteTime = 33;
                    } else if (randomEvent < 55) {
                        rouletteEvent = "fest";
                        rouletteTime = sys.rand(ROULETTE_FEST_MIN, ROULETTE_FEST_MAX);
                    } else if (randomEvent < 76) {
                        rouletteEvent = sys.type(sys.rand(0, 19));
                        rouletteTime = sys.rand(ROULETTE_EVENT_MIN, ROULETTE_EVENT_MAX);
                    } else {
                        rouletteEvent = "legendary";
                        rouletteTime = sys.rand(ROULETTE_EVENT_MIN, ROULETTE_EVENT_MAX);
                    }
                    for (var i in roulette) { // flash those with event flashing on
                        if (roulette[i].eventFlash && sys.id(i)) {
                            sys.sendHtmlMessage(sys.id(i), "<ping/>", roulette);
                        }
                    }
                    helpers.rouletteEventMessage(rouletteEvent, false);
                    rouletteStep = 0;
                }
                
                // stop an event once its time is up and set new waiting time
                if (rouletteEvent !== "" && rouletteStep == rouletteTime) {
                    rouletteTime = sys.rand(ROULETTE_WAIT_MIN, ROULETTE_WAIT_MAX);
                    helpers.rouletteEventMessage(rouletteEvent, true); // sets 'ended' to true
                    if (rouletteEvent == "frenzy") {
                        for (var i in roulette) {
                            roulette[i].shinyChance = parseInt(roulette[i].shinyChance * (4096 / 33));
                        }
                    }
                    rouletteEvent = "";
                    rouletteStep = 0;
                }
            }
        }
    }
    
    ,
    
    beforeIPConnected: function (ip) {
        /**
            ---------------------
            Server Starting Check
            ---------------------
        **/
        if (serverStarting) {
            sys.stopEvent();
            sys.sendMessage(src, "Sorry, the server is still busy setting up at the moment. Please wait a few seconds before entering.");
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> tried to enter during server setup.");
            return;
        }
        /**
            ------------
            IP Ban Check
            ------------
        **/
        var range = ip.split('.')[0] + '.' + ip.split('.')[1];
        for (var i in banlist) {
            if (i == ip) {
                sys.stopEvent();
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Banned IP " + ip + " tried to connect to the server.");
                return;
            }
        }
        for (var i in rangebanlist) {
            if (i == range) {
                sys.stopEvent();
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Banned range " + range + " tried to connect to the server.");
                return;
            }
        }
        /**
            -------------
            Relay Station
            -------------
        **/
        if (ip == RELAY_STATION_PROXY) {
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] The web client is connecting to the server.");
        } else {
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] IP " + ip + " is connecting to the server.");
        }
    }
    
    ,

    beforeLogIn: function (src) {
        var name = sys.name(src), lower = name.toLowerCase(), ip = sys.ip(src), range = sys.range(src), color = helpers.color(src), auth = sys.auth(src);
        /**
            -----------
            Proxy Check
            -----------
        **/
        for (var i in proxylist) {
            if (ip == proxylist[i].split(':')[0]) {
                sys.stopEvent();
                sys.sendMessage(src, "You are banned!");
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server using a proxy.");
                return;
            }
        }
        /**
            ----------------------------------------------
            Allowed IPs and ranges bypass bans and closure
            ----------------------------------------------
        **/
        if (!helpers.isInArray(ip, allowed) && !helpers.isInArray(range, allowedrange)) {
            /**
                ---------
                Ban Check
                ---------
            **/
            for (var i in banlist) {
                if (banlist[i].ip == ip) {
                    sys.stopEvent();
                    sys.sendMessage(src, "You are banned!");
                    sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Banned user <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server.");
                    return;
                }
            }
            /**
                ---------------
                Range Ban Check
                ---------------
            **/
            for (var i in rangebanlist) {
                if (rangebanlist[i].range == range) {
                    sys.stopEvent();
                    sys.sendMessage(src, "You are banned!");
                    sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Range banned user <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server.");
                    return;
                }
            }
            /**
                --------------------
                Server Closure Check
                --------------------
            **/
            if (!open) {
                sys.stopEvent();
                sys.sendMessage(src, "Sorry, the server is closed for maintenance at the moment.");
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server during closure.");
                return;
            }
        }
        /**
            ------------------
            Banned Words Check
            ------------------
        **/
        name = name.toLowerCase();
        for (var index in nameblocklist) {
            if (name.indexOf(nameblocklist[index]) != -1 && !helpers.isInArray(name, exceptions) && auth < 3) {
                sys.stopEvent();
                sys.sendMessage(src, helpers.bot(bots.welcome) + "Your name contains a banned word: " + nameblocklist[index] + ". Please change your name and try entering again.");
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server with a banned word in their username.");
                return;
            }
        }
        /**
            -----------------------
            Banned Characters Check
            -----------------------
        **/
        if (helpers.bannedchars(name)[0] && auth < 3) {
            sys.stopEvent();
            sys.sendMessage(src, helpers.bot(bots.welcome) + "Your name contains " + helpers.bannedchars(name)[1] + ". Please change your name and try entering again.");
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name +
            "</font></b> tried to enter the server with " + helpers.bannedchars(name)[1] + " in their username.");
            return;
        }
    }

    ,

    afterLogIn: function (src) {
        var name = sys.name(src), lower = sys.name(src).toLowerCase(), auth = sys.auth(src), ip = sys.ip(src), range = sys.range(src), cookie = sys.cookie(src) ? sys.cookie(src) : "none";
        var id = sys.uniqueId(src) ? sys.uniqueId(src).id : "none", color = helpers.color(src), os = sys.os(src), version = sys.version(src), ipexists = 0, derp, country;
        var servername = sys.getServerName(), uptime = sys.profileDump().split('\n')[0].split(',')[0].split(':')[1].slice(1, -2), authtitle;
        /**
            -----------------------
            Player Variable Setting
            -----------------------
        **/
        players[src] = {};
        players[src].name = name;
        players[src].color = color;
        players[src].caps = 0;
        players[src].lastmessage = "[entered the server]";
        players[src].lastmessagetime = new Date();
        players[src].lastmessages = [];
        players[src].lastmessagetimes = [];
        players[src].floodcount = 0;
        players[src].floodcounttimer = 0;
        /**
            ---------------
            Giga Ban Check
            ---------------
        **/
        if (sys.isGigaBanned(id)) {
            sys.sendMessage(src, "You are banned!");
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Giga banned user <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server.");
            gigabancheck = true;
            sys.kick(src);
            return;
        }
        /**
            ---------------
            Mega Ban Check
            ---------------
        **/
        if (helpers.isInArray(lower, namestounban)) {
            sys.removeCookie(src);
            namestounban.splice(namestounban.indexOf(name), 1);
            helpers.saveData("namestounban");
        } else {
            if (sys.isMegaBanned(cookie)) {
                sys.sendMessage(src, "You are banned!");
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Mega banned user <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server.");
                megabancheck = true;
                sys.kick(src);
                return;
            }
        }
        /**
            ---------------------------------
            Member List and Auth Title Adding
            ---------------------------------
        **/
        if (authtitles[lower] === undefined) {
            authtitles[lower] = AUTH_NAMES[auth];
        }
        members[name.toLowerCase()] = name;
        helpers.saveData("members");
        if (!iplist[lower]) {
            iplist[lower] = [];
            iplist[lower].push(ip);
        } else {
            for (var index in iplist[lower]) {
                if (iplist[lower][index] == ip) {
                    ipexists++;
                }
            }
            if (ipexists === 0) {
                iplist[lower].push(ip);
            }
        }
        helpers.saveData("iplist");
        /**
            -----------
            Max Players
            -----------
        **/
        if (sys.numPlayers() > maxplayers) {
            maxplayers++;
            helpers.saveData("maxplayers");
        }
        /**
            --------------
            Entry Messages
            --------------
        **/
        sys.sendMessage(src, "Welcome Message: The server has been up for " + helpers.formatUptime(uptime));
        sys.sendMessage(src, "Welcome Message: The current number of players online is " + (eval(sys.numPlayers())) + " out of a record maximum of " + maxplayers + ".");
        if (helpers.isAndroid(src)) {
            sys.sendHtmlMessage(src, "<font color='blue'><timestamp/></font><b><font color='blue'>Welcome Message:</font></b> Type /commands in the chat window "
            + "to view a list of commands. Type /rules for our server rules. You are supposed to know them, so you should read them!");
        } else {
            sys.sendHtmlMessage(src, "<font color='blue'><timestamp/></font><b><font color='blue'>Welcome Message:</font></b> Type /commands in the chat window, "
            + "<a href='po:send//commands'>or click here</a>, to view a list of commands. Type /rules, <a href='po:send//rules'>or click here</a>, "
            + "for our server rules. You are supposed to know them, so you should read them!");
        }
        /**
            ---------------
            Welcome Message
            ---------------
        **/
        authtitle = (authtitles[lower] ? authtitles[lower] : AUTH_NAMES[auth]) + " ";
        if (auth === 0 || auth >= 4) {
            authtitle = "";
        }
        if (layout == "new") {
            sys.sendHtmlMain(helpers.bot(bots.welcome) + welcomeMessage.replace(/~Player~/, authtitle + name).replace(/~Server~/, servername));
        } else {
            sys.sendHtmlMain("<timestamp/><b>~Please Welcome " + (auth >= 1 ? AUTH_NAMES[auth] + " " : "") + helpers.rainbow(name) + "~</b>");
        }
        /**
            -----------------------------------
            Operating System and Client Version
            -----------------------------------
        **/
        operatingsystem[lower] = os;
        helpers.saveData("operatingsystem");
        os = helpers.os(operatingsystem[lower]);
        versions[lower] = helpers.version(version);
        helpers.saveData("versions");
        version = versions[lower];
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> is using " + os + (version === "" ? "" : ", " + version) + ".");
        /**
            -----------------------------
            Fake Guest / Evasion Warnings
            -----------------------------
        **/
        if (helpers.isGuest(name) && sys.os(src) != "android" && sys.os(src) != "webclient") {
            sys.sendHtmlAuths(helpers.bot(bots.welcome) + "This person is using a guest name, but isn't actually on " + helpers.os("android") + " or " + helpers.os("webclient") + ". Keep an eye on them!");
        }
        for (var index in banlist) {
            if (sys.dbIp(index)) {
                if (range == sys.dbRange(index) && !helpers.isauthip(ip) && !helpers.isInArray(ip, allowed) && !helpers.isInArray(range, allowedrange)) {
                    sys.sendHtmlAuths(helpers.bot(bots.welcome) + "This person might be ban evading, as an IP on the banlist is in their range (" + range + "). Keep an eye on them!");
                }
            }
        }
        /**
            ---------------------
            Time Zone and Country
            ---------------------
        **/
        if (API_KEY !== "") {
            if (countryname[lower]) {
                country = helpers.toFlagKey(helpers.removespaces(countryname[lower].toUpperCase()));
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> is from " + FLAGS[country] + " " + countryname[lower] + ".");
            } else {
                sys.webCall(helpers.countryRetrievalUrl(ip), function (resp) {
                    resp = JSON.parse(resp);
                    timezone[lower] = helpers.timezonedata(resp.countryName, resp.timeZone);
                    countryname[lower] = helpers.countrydata(resp.countryName);
                    cityname[lower] = helpers.citydata(resp.cityName);
                    helpers.saveData("timezone");
                    helpers.saveData("countryname");
                    helpers.saveData("cityname");
                    country = helpers.toFlagKey(helpers.removespaces(countryname[lower].toUpperCase()));
                    sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> is from " + FLAGS[country] + " " + countryname[lower] + ".");
                });
            }
        }
    }

    ,

    beforeChannelJoin: function (src, channel) {
        var lower = sys.channel(channel).toLowerCase();
        var name, auth = sys.auth(src), ip = sys.ip(src), range = sys.range(src);
        if (regchannels[lower]) {
            var cbanlist = regchannels[lower].banlist;
            var crangebanlist = regchannels[lower].rangebanlist;
        }
        players[src] ? name = players[src].name : name = sys.name(src);
        /**
            -----------------------
            Channel Closure and Ban
            -----------------------
        **/
        if (regchannels[lower]) {
            if (regchannels[lower].close > auth && regchannels[lower].close > helpers.cauth(name.toLowerCase(), channel)) {
                sys.stopEvent();
                sys.sendHtmlMessage(src, helpers.bot(bots.channel) + "This channel is closed for your auth level.");
                return;
            }
            for (var index in cbanlist) {
                if (ip == cbanlist[index].ip && auth < 3) {
                    sys.stopEvent();
                    sys.sendHtmlMessage(src, helpers.bot(bots.channel) + "You are banned from this channel.");
                    return;
                }
            }
            for (var index in crangebanlist) {
                if (range == crangebanlist[index].range && auth < 3) {
                    sys.stopEvent();
                    sys.sendHtmlMessage(src, helpers.bot(bots.channel) + "You are range banned from this channel.");
                    return;
                }
            }
        }
    }

    ,

    afterChannelJoin: function (src, channel) {
        var name = sys.name(src), channelname = sys.channel(channel), lower = sys.channel(channel).toLowerCase(), cookie = sys.cookie(src) ? sys.cookie(src) : "none", id = sys.uniqueId(src) ? sys.uniqueId(src).id : "none";
        if (cookie == "banned" || cookie.substr(0, 6) === "banned") {
            return;
        }
        if (sys.isGigaBanned(id)) {
            return;
        }
        players[src] ? name = players[src].name : name = sys.name(src);
        /**
            ------------------------
            Server and Channel Topic
            ------------------------
        **/
        sys.sendHtmlMessage(src, "<b><font color='" + serverTopicColor + "'>Server Topic:</font></b> " + servertopic, channel);
        if (regchannels[lower]) {
            sys.sendHtmlMessage(src, "<b><font color='" + channelTopicColor + "'>Channel Topic:</font></b> " + regchannels[lower].topic.join(TOPIC_DELIMITER), channel);
        } else {
            sys.sendHtmlMessage(src, "<b><font color='" + channelTopicColor + "'>Channel Topic:</font></b> Welcome to " + channelname + "!", channel);
        }
        if (helpers.isLoaded("party.js")) {
            if (channel == partychannel && partyMode == "nightclub") {
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</b> has joined the channel " + helpers.channelLink(channelname) + ".");
                return;
            }
        }
        /**
            ---------------
            Welcome Message
            ---------------
        **/
        var cauth = (helpers.cauth(name.toLowerCase(), channel) >= 1 ? helpers.cauthname(name.toLowerCase(), channel) + " " : "");
        if (channel > 0) {
            if (layout == "new") {
                sys.sendHtmlAll(helpers.bot(bots.channel) + channelWelcomeMessage.replace(/~Player~/, cauth + name).replace(/~Channel~/, channelname), channel);
            } else {
                sys.sendHtmlAll("<timestamp/><b>~Please Welcome " + helpers.rainbow(name) + " to " + channelname + "~</b>", channel);
            }
        }
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has joined the channel " + helpers.channelLink(channelname) + ".");
    }

    ,

    beforeChannelLeave: function (src, channel) {
    }

    ,

    afterChannelLeave: function (src, channel) {
        /**
            -------------
            Leave Message
            -------------
        **/
        var name = sys.name(src), lower = players[src].name.toLowerCase(), cauth = (helpers.cauthname(lower, channel) === "" ? "" : helpers.cauthname(lower, channel) + " "), channelname = sys.channel(channel);
        var cookie = sys.cookie(src) ? sys.cookie(src) : "none", id = sys.uniqueId(src) ? sys.uniqueId(src).id : "none";
        if (helpers.isLoaded("party.js")) {
            if (channel == partychannel && partyMode == "nightclub") {
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + helpers.color(src) + "'>" + name + "</font></b> has left the channel " + helpers.channelLink(channelname) + ".");
                return;
            }
        }
        if (cookie == "banned" || cookie.substr(0, 6) === "banned") {
            megabancheck = false;
        } else if (sys.isGigaBanned(id)) {
            gigabancheck = false;
        } else {
            if (channel > 0) {
                if (layout == "new") {
                    sys.sendHtmlAll(helpers.bot(bots.channel) + channelLeaveMessage.replace(/~Player~/, cauth + name).replace(/~Channel~/, channelname), channel);
                } else {
                    sys.sendHtmlAll("<timestamp/><b>~" + helpers.rainbow(name) + " has left " + channelname + "~</b>", channel);
                }
            }
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + helpers.color(src) + "'>" + name + "</font></b> has left the channel " + helpers.channelLink(channelname) + ".");
        }
    }

    ,

    beforeLogOut: function (src) {
        /**
            ----------
            Reset Name
            ----------
        **/
        sys.changeName(src, players[src].name);
    }

    ,

    afterLogOut: function (src) {
        var name = sys.name(src), lower = players[src].name.toLowerCase(), range = sys.range(src), ip = sys.ip(src), auth = sys.auth(src), authtitle = "", cookie = sys.cookie(src) ? sys.cookie(src) : "none";
        var id = sys.uniqueId(src) ? sys.uniqueId(src).id : "none", servername = sys.getServerName();
        /**
            ----------------
            Auth Title Check
            ----------------
        **/
        authtitle = (authtitles[lower] ? authtitles[lower] : AUTH_NAMES[auth]) + " ";
        if (auth === 0 || auth >= 4) {
            authtitle = "";
        }
        /**
            -------------
            Leave Message
            -------------
        **/
        if (cookie == "banned" || cookie.substr(0, 6) === "banned") {
            megabancheck = false;
        } else if (sys.isGigaBanned(id)) {
            gigabancheck = false;
        } else {
            if (layout == "new") {
                sys.sendHtmlMain(helpers.bot(bots.welcome) + leaveMessage.replace(/~Player~/, authtitle + name).replace(/~Server~/, servername));
            } else {
                sys.sendHtmlMain("<timestamp/><b>~" + helpers.rainbow(name) + " has left " + servername + "~</b>");
            }
        }
        /**
            -------------
            Delete Player
            -------------
        **/
        if (floodplayers.indexOf(src) != -1) {
            floodplayers.splice(floodplayers.indexOf(src), 1);
        }
        delete players[src];
    }

    ,

    beforeChangeTeam: function (src, team) {
        /**
            -----------
            Moody Check
            -----------
        **/
        var moody = 141;
        for (var i = 0; i < 6; i++) {
            if (sys.teamPokeAbility(src, team, i) == moody) {
                helpers.starfox(src, 0, undefined, bots.tour, "Error 403, you may not use the Moody ability!", team);
                sys.changeTier(src, team, "Challenge Cup");
                break;
            }
        }
    }

    ,

    afterChangeTeam: function (src, team) {
        var name = sys.name(src), ip = sys.ip(src), color = helpers.color(src), lower = sys.name(src).toLowerCase(), oldName = players[src].name.toLowerCase();
        /**
            -----------------------
            Player Variable Setting
            -----------------------
        **/
        members[name.toLowerCase()] = name;
        helpers.saveData("members");
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b><font color='" + players[src].color + "'>" + players[src].name + "</font></b> changed their team, and their name to <b><font color='" + color +
        "'>" + name + "</font></b>.");
        players[src].name = name;
        players[src].color = color;
        /**
            -----------------------------------
            Operating System and Client Version
            -----------------------------------
        **/
        operatingsystem[lower] = sys.os(src);
        versions[lower] = helpers.version(sys.version(src));
        helpers.saveData("operatingsystem");
        helpers.saveData("versions");
        /**
            ---------------------
            Time Zone and Country
            ---------------------
        **/
        if (API_KEY !== "") {
            timezone[lower] = timezone[oldName];
            countryname[lower] = countryname[oldName];
            cityname[lower] = cityname[oldName];
            helpers.saveData("timezone");
            helpers.saveData("countryname");
            helpers.saveData("cityname");
        }
    }

    ,

    beforeChangeTier: function (src, team, oldtier, newtier) {
    }

    ,

    afterChangeTier: function (src, team, oldtier, newtier) {
        /**
            -----------
            Moody Check
            -----------
        **/
        var moody = 141;
        for (var i = 0; i < 6; i++) {
            if (sys.teamPokeAbility(src, team, i) == moody) {
                helpers.starfox(src, 0, undefined, bots.tour, "Error 403, you may not use the Moody ability!", team);
                sys.changeTier(src, team, "Challenge Cup");
                sys.stopEvent();
                break;
            }
        }
        /**
            -----------------
            Other Tier Checks
            -----------------
        **/
        weatherlesscheck(src, team);
        metronomecheck(src, team);
        middlecupcheck(src, team);
        monocolorcheck(src, team);
        monotypecheck(src, team);
        monospeciescheck(src, team);
        monogencheck(src, team);
        monolettercheck(src, team);
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has changed team " + team + " from the " + oldtier +
        " tier to the " + newtier + " tier.");
    }

    ,
    
    beforeNewPM: function (src) {
    }
    
    ,
    
    afterNewPM: function (src) {
    }
    
    ,

    beforeChannelCreated: function (channel, channelname, creator) {
        if (sys.name(creator)) {
            var cookie = sys.cookie(creator) ? sys.cookie(creator) : "none", id = sys.uniqueId(creator) ? sys.uniqueId(creator).id : "none";
            if (sys.isMegaBanned(cookie)) {
                sys.stopEvent();
                return;
            }
            if (sys.isGigaBanned(id)) {
                sys.stopEvent();
                return;
            }
        }
    }

    ,

    afterChannelCreated: function (channel, channelname, creator) {
        var lower = sys.channel(channel).toLowerCase();
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b><font color='" + helpers.color(creator) + "'>" + sys.name(creator) +
        "</font></b> has created the channel " + helpers.channelLink(sys.channel(channel)) + ".");
    }

    ,

    beforeChannelDestroyed: function (channel) {
        var lower = sys.channel(channel).toLowerCase();
        /**
            --------------------
            Perm Channel Keeping
            --------------------
        **/
        if (channel <= permchannels.length) {
            sys.stopEvent();
            return;
        }
        if (regchannels[lower]) {
            if (regchannels[lower].stay === true) {
                sys.stopEvent();
                return;
            }
        }
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] The channel #" + sys.channel(channel) + " has been destroyed.");
    }

    ,

    afterChannelDestroyed: function (channel) {
    }

    ,

    beforeChatMessage: function (src, message, channel) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src), lower = message.toLowerCase(), channelname = sys.channel(channel), ip = sys.ip(src), random, grammar = "s";
        var channelname2 = sys.channel(channel).toLowerCase();
        /**
            ----------
            Flood Kick
            ----------
        **/
        if (players[src] !== undefined) {
            if (floodplayers.indexOf(src) == -1) {
                floodplayers.push(src);
            }
            players[src].floodcount++;
            if (helpers.floodCheck(src, channelname2)) {
                sys.stopEvent();
                if (layout == "new") {
                    sys.sendHtmlAll(helpers.bot(bots.flood) + name + " has been kicked from the server for flooding!", channel);
                } else {
                    sys.sendHtmlAll("<timestamp/> <b>Chuck Norris kicked " + name + " to Pluto for flooding.</b>", channel);
                }
                sys.kick(src);
                return;
            }
        }
        /**
            ------------------------------
            Banned Link / Characters Check
            ------------------------------
        **/
        if (helpers.bannedcharacters(message, channelname2) && auth < 3) {
            sys.stopEvent();
            helpers.starfox(src, channel, message, bots.command, "Error 403, you are not allowed to post banned links or characters.", channel);
            return;
        }
        /**
            -------------
            Last Messages
            -------------
        **/
        if (regchannels[channelname2]) {
            if (!regchannels[channelname2].priv && !helpers.isInString(message, silentcommands)) {
                players[src].lastmessages.push(message);
                if (players[src].lastmessages.length > 10) {
                    players[src].lastmessages.splice(0, 1);
                }
            }
        }
        /**
            ------------------
            Last Message Times
            ------------------
        **/
        if (regchannels[channelname2]) {
            if (!regchannels[channelname2].priv) {
                if (!helpers.isInString(message, silentcommands)) {
                    players[src].lastmessagetimes.push(new Date());
                    if (players[src].lastmessagetimes.length > 10) {
                        players[src].lastmessagetimes.splice(0, 1);
                    }
                }
            }
        }
        /**
            -----------------------
            Last Message Shortening
            -----------------------
        **/
        if (message.length > 42 && !helpers.isInString(message, silentcommands)) {
            players[src].lastmessage = message.substr(0, 42);
            players[src].lastmessage += "...";
        }
        /**
            -----------------------------------
            Last Message Private Channel Filter
            -----------------------------------
        **/
        if (regchannels[channelname2]) {
            if (!regchannels[channelname2].priv && !helpers.isInString(message, silentcommands)) {
                players[src].lastmessage = message;
                players[src].lastmessagetime = new Date();
            }
        }
        /**
            -----
            Party
            -----
        **/
        if (helpers.isLoaded("party.js")) {
            if (channel == partychannel && partyMode != "none" && message.split(' ')[0] != "/mode") {
                sys.stopEvent();
                helpers.mode(src, message, channel, partyMode);
                return;
            }
        }
        /**
            --------
            Commands
            --------
        **/
        if (message.charAt(0) == COMMAND_SYMBOL && message.length > 1) {
            sys.stopEvent();
            parseCommand(src, message, channel, name, auth, false);
            return;
        }
        /**
            ----------
            Mute Check
            ----------
        **/
        if (helpers.muteCheck(players[src].name) && auth < 3) {
            sys.stopEvent();
            helpers.muteMessage(src, channel);
            return;
        }
        /**
            ------------------
            Channel Mute Check
            ------------------
        **/
        if (helpers.cmuteCheck(players[src].name, channelname2) && auth < 3) {
            sys.stopEvent();
            helpers.channelMuteMessage(src, channel);
            return;
        }
        /**
            -------------
            Silence Check
            -------------
        **/
        if (regchannels[channelname2]) {
            if (regchannels[channelname2].silence > auth) {
                sys.stopEvent();
                helpers.silenceMessage(src, channel);
                return;
            }
        }
        /**
            ---------------------
            Watch Channel Logging
            ---------------------
        **/
        if (regchannels[channelname2]) {
            if (!regchannels[channelname2].priv) {
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[<a href=\"po:join/" + sys.channel(channel) + "\">#" + sys.channel(channel) +
                "</a>] <b><font color='" + color + "'>" + helpers.escapehtml(name) + ":</font></b> " + helpers.escapehtml(message));
            }
        }
    }

    ,

    afterChatMessage: function (src, message, channel) {
        var name = sys.name(src), lower = sys.channel(channel).toLowerCase();
        /**
            -------------------
            Excessive Caps Kick
            -------------------
        **/
        if (regchannels[lower]) {
            if (regchannels[sys.channel(channel).toLowerCase()].priv && channel !== 0) {
                sys.clearChat();
            
            }
            if (!regchannels[lower].caps) {
                if (helpers.isLetter(message) && message == message.toUpperCase()) {
                    players[src].caps++;
                    if (players[src].caps > 4) {
                        if (layout == "new") {
                            sys.sendHtmlAll(helpers.bot(bots.caps) + name + " has been kicked from the server for excessive caps usage!", channel);
                        } else {
                            sys.sendHtmlAll("<timestamp/> <b>" + name + " got FALCON PAWNCHED by Captain Falcon for using too many CAPS in a row!</b>", channel);
                        }
                        players[src].caps = 0;
                        sys.setTimer(function () {
                            sys.kick(src);
                        }, 200, 0);
                    }
                } else if (players[src].caps > 0) {
                    players[src].caps--;
                }
            }
        }
        /**
            -------------------
            Zalgo or Thai Clear
            -------------------
        **/
        if (ZALGO.test(message) || THAI.test(message)) {
            sys.clearChat();
        }
    }

    ,

    beforeNewMessage: function (message) {
        var lower = "", derf;
        /**
            ----------------
            Private Channels
            ----------------
        **/
        if (message.substr(0, 2) == "[#" && message.indexOf(']') != -1) {
            derf = message.toLowerCase();
            derf = derf.split(']');
            lower = derf[0];
            lower = lower.slice(2);
            if (regchannels[lower]) {
                if (regchannels[lower].priv) {
                    sys.stopEvent();
                    return;
                }
            }
        } else {
            /**
                ------------------------
                Prevent Certain Messages
                ------------------------
            **/
            if (message == "Announcement changed.") {
                sys.stopEvent();
                return;
            }
            if (message == "The description of the server changed.") {
                sys.stopEvent();
                return;
            }
            /**
                --------------------------
                Script Errors and Warnings
                --------------------------
            **/
            if (/Script Check: Fatal script error on line \d+\:/.test(message)) {
                sys.stopEvent();
                var errorMessage = message.split("changeScript");
                sys.sendHtmlAuths(helpers.bot(bots.script) + errorMessage[0]);
                return;
            }
            if (/Script Error line \d+\:/.test(message) || /Script Warning:/.test(message) || /Script Warning in/.test(message)) {
                sys.stopEvent();
                if (!serverStarting) {
                    sys.printStackTrace(message);
                }
                return;
            }
        }
    }

    ,

    afterNewMessage: function (message) {
    }

    ,
    
    beforeServerMessage: function (message) {
        sys.stopEvent();
        /**
            ---------------
            Server Commands
            ---------------
        **/
        if (message.charAt(0) == COMMAND_SYMBOL && message.length > 0) {
            var command = message, lower = "", cmd;
            command = command.replace(COMMAND_SYMBOL, "");
            cmd = command;
            while (cmd !== "" && cmd.charAt(0) != ' ') {
                lower += cmd.charAt(0);
                cmd = cmd.slice(1);
            }
            command = command.replace(' ', DELIMITER).split(DELIMITER);
            if (lower == "eval") {
                var starttime = new Date();
                command = command.splice(0, 1);
                command = command.join(DELIMITER);
                try {
                    var code = command;
                    if (!code) {
                        print("Error 404, code not found.");
                        return;
                    }
                    eval(code);
                    print("Script ran successfully.");
                } catch (e) { 
                    print("An error occurred: " + e);
                }
                var runtime = new Date() - starttime;
                print("The eval runtime was " + runtime + " milliseconds.");
            } else if (lower == "var") {
                try {
                    var variable = command[1];
                    if (!variable) {
                        print("Error 404, variable not found.");
                        return;
                    }
                    print(eval(variable));
                } catch (e) { 
                    print("An error occurred: " + e);
                }
            } else if (lower == "print") {
                var text = command[1];
                if (!text) {
                    print("Error 404, text not found.");
                    return;
                }
                print(text);
            } else if (lower == "commands") {
                print("");
                print("/eval <code>: executes <code> and prints its runtime.");
                print("/print <text>: prints <text> to standard output.");
                print("/var <variable>: prints the value of <variable>.");
                print("");
            } else {
                print("Error 404, command '" + lower + "' not found. Use /commands to show the list of commands.");
            }
            return;
        }
        sys.sendHtmlMain("<font color='#FFA500'><timestamp/><b>~~Server~~:</b></font> " + message);
        return;
    }
    
    ,
    
    afterServerMessage: function (message) {
    }
    
    ,

    beforePlayerKick: function (src, trgt) {
        sys.stopEvent();
        var srcauth = sys.auth(src), trgtauth = sys.auth(trgt);
        if (srcauth <= trgtauth) {
            helpers.starfox(src, channel, command, bots.kick, "Error 403, you may not kick " + players[trgt].name + " because their auth level is not below your current!");
            return;
        }
        script.beforeChatMessage(src, "/kick " + players[trgt].name, 0);
    }

    ,

    afterPlayerKick: function (src, trgt) {
    }

    ,

    beforePlayerBan: function (src, trgt) {
        sys.stopEvent();
        var srcauth = sys.auth(src), trgtauth = sys.auth(trgt);
        if (srcauth < 2) {
            helpers.starfox(src, channel, command, bots.ban, "Error 403, you must be admin or higher to ban!");
            return;
        }
        if (srcauth <= trgtauth) {
            helpers.starfox(src, channel, command, bots.ban, "Error 403, you may not ban " + players[trgt].name + " because their auth level is not below your current!");
            return;
        }
        script.beforeChatMessage(src, "/ban " + players[trgt].name, 0);
    }

    ,

    afterPlayerBan: function (src, trgt) {
    }

    ,

    beforePlayerAway: function (src, away) {
    }

    ,

    afterPlayerAway: function (src, away) {
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> is " + (away ? "idling" : "back") + ".");
    }

    ,
    
    beforePlayerRegister: function (src) {
        var name = sys.name(src), color = helpers.color(src);
        if (helpers.isGuest(name)) {
            sys.stopEvent();
            sys.sendMessage(src, helpers.bot(bots.pass) + "You may not register guest names!");
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b><font color='" + color + "'>" + name + "</font></b> tried to register a guest name.");
            return;
        }
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b><font color='" + color + "'>" + name + "</font></b> registered.");
    }
    
    ,
    
    beforeChallengeIssued: function (src, trgt, clauses, rated, mode, team, team2) {
        /**
            ------------
            Stop Battles
            ------------
        **/
        if (stopbattles) {
            sys.sendMessage(src, helpers.bot(bots.main) + "The server is going to restart soon! You can't battle now!");
            sys.sendMessage(trgt, helpers.bot(bots.main) + sys.name(src) + " tried to challenge you while battles weren't allowed.");
            sys.stopEvent();
            return;
        }
        /**
            ----------
            Tour Check
            ----------
        **/
        var lower = players[src].name.toLowerCase(), trgtlower = players[trgt].name.toLowerCase();
        if (tour[0].tourmode == 2) {
            if (tour[0].tourmembers.indexOf(lower) != -1 && tour[0].tourmembers.indexOf(trgtlower) != -1) {
                if (sys.tier(src, team) != tour[0].tourtier) {
                    sys.stopEvent();
                    sys.sendMessage(src, helpers.bot(bots.tour) + "You can't challenge a tour battler with a team in the wrong tier!");
                    return;
                }
            }
        }
    }

    ,

    afterChallengeIssued: function (src, trgt, clauses, rated, mode) {
        if (clauses === 0) {
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has challenged <b><font color='" + helpers.color(trgt) +
            "'>" + sys.name(trgt) + "</font></b> without any clauses.");
        } else {
            var list = helpers.listOfClauses(clauses);
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has challenged <b><font color='" + helpers.color(trgt) +
            "'>" + sys.name(trgt) + "</font></b> with the clauses " + (typeof(list) == "string" ? list : list.join(", ")) + ".");
        }
    }

    ,
    
    beforeFindBattle: function (src, team) {
        /**
            ------------
            Stop Battles
            ------------
        **/
        if (stopbattles) {
            sys.sendMessage(src, helpers.bot(bots.main) + "The server is going to restart soon! You can't battle now!");
            sys.stopEvent();
            return;
        }
    }

    ,
    
    afterFindBattle: function (src, team) {
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has used the Find Battle button.");
    }

    ,

    beforeBattleMatchup: function (src, trgt, clauses, rated, mode, team, team2) {
    }

    ,

    afterBattleMatchup: function (src, trgt, clauses, rated, mode) {
    }

    ,

    battleSetup: function (src, trgt, battle) {
    }

    ,

    beforeBattleStarted: function (src, trgt, clauses, rated, mode, battle, team, team2) {
    }

    ,

    afterBattleStarted: function (src, trgt, clauses, rated, mode, battle, team, team2) {
        /**
            ----------------------
            Battles Object Setting
            ----------------------
        **/
        var list = helpers.listOfClauses(clauses);
        battles[battle] = {};
        battles[battle].p1 = sys.name(src);
        battles[battle].p2 = sys.name(trgt);
        battles[battle].start = helpers.shortdate(new Date());
        battles[battle].tier = sys.tier(src, team) == sys.tier(trgt, team2) ? sys.tier(src, team) : "Mixed";
        battles[battle].clauses = (typeof(list) == "string" ? list : list.join(", "));
        /**
            -----------------------
            Tournament Battle Start
            -----------------------
        **/
        if (tour[0].tourmode == 2) {
            if (tour[0].tourmembers[0]) {
                var name = players[src].name.toLowerCase(), trgtname = players[trgt].name.toLowerCase(), srctier = sys.tier(src, team), trgttier = sys.tier(trgt, team2), tourmemberssrc = helpers.tourmembersnumber(name, 0), tourmemberstrgt = helpers.tourmembersnumber(trgtname, 0);
                if (srctier == tour[0].tourtier && trgttier == tour[0].tourtier && typeof(tourmemberssrc) == "number" && typeof(tourmemberstrgt) == "number" && tour[0].tourwinners.indexOf(name) == -1 && tour[0].tourwinners.indexOf(trgtname) == -1) {
                    if (!helpers.nopair(tourmemberssrc, tourmemberstrgt)) {
                        tour[0].tourbattlers.push(tour[0].tourmembers[tourmemberssrc]);
                        tour[0].tourbattlers.push(tour[0].tourmembers[tourmemberstrgt]);
                        var finalroundcheck = tour[0].tourcurrentnumber == 2 ? "Final Round" : "Round " + tour[0].roundnumber;
                        sys.sendHtmlMain(border + "<br>" + helpers.bot(bots.tour) + finalroundcheck + " match between " + members[name] + " and " + members[trgtname] +
                        " has been started. <br>" + helpers.bot(bots.tour) +  "<a href='po:watch/" + battle + "'>Click here to watch it!</a><br>" + border2);
                    }
                }
            }
        } else {
            sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] A battle has started between <b><font color='" + helpers.color(src) + "'>" + sys.name(src) +
            "</font></b> and <b><font color='" + helpers.color(trgt) + "'>" + sys.name(trgt) + "</font></b>.");
        }
    }

    ,

    attemptToSpectateBattle: function (src, battler1, battler2) {
    }

    ,

    beforeSpectateBattle: function (src, battler1, battler2) {
    }

    ,

    afterSpectateBattle: function (src, battler1, battler2) {
        sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> is spectating the battle between " +
        "<b><font color='" + helpers.color(battler1) + "'>" + sys.name(battler1) + "</font></b> and <b><font color='" + helpers.color(battler2) + "'>" + sys.name(battler2) + "</font></b>.");
    }

    ,    

    beforeBattleEnded: function (winner, loser, result, battle) {
    }

    ,

    afterBattleEnded: function (winner, loser, result, battle) {
        var winnername, losername;
        !players[winner] ? winnername = "[no data]" : winnername = players[winner].name;
        !players[loser] ? losername = "[no data]" : losername = players[loser].name;
        delete battles[battle];
        /**
            ------------------------
            Tournament Battle Ending
            ------------------------
        **/
        if (tour[0].tourmode == 2) {
            var tourmemberswinner = helpers.tourmembersnumber(winnername.toLowerCase(), 0), tourmembersloser = helpers.tourmembersnumber(losername.toLowerCase(), 0);
            if (tour[0].tourbattlers.indexOf(winnername.toLowerCase()) != -1 && tour[0].tourbattlers.indexOf(losername.toLowerCase()) != -1 && !helpers.nopair(tourmemberswinner, tourmembersloser)) {
                if (result == "tie") {
                    var tourwinner = tour[0].tourbattlers.indexOf(winnername.toLowerCase()), tourloser = tour[0].tourbattlers.indexOf(losername.toLowerCase());
                    tour[0].tourbattlers.splice(tourloser,1); 
                    tour[0].tourbattlers.splice(tourwinner,1);
                    var repeatmatchmessage = border + "<br/>"
                    + "<timestamp/><b> A tournament match has been tied.</b></font><br/>"
                    + "<b>" + winnername + " and " + losername + " need to battle again!</b><br/>"
                    + border2;
                    sys.sendHtmlMain(repeatmatchmessage);
                    return;
                }
                var matchcompletemessage = border + "<br>" + helpers.bot(bots.tour) + "A tournament match has been completed!";
                sys.sendHtmlMain(matchcompletemessage);
                helpers.roundincrease(winnername.toLowerCase(), losername.toLowerCase(), 0);
            }
        /**
            ---------------------
            Watch Channel Logging
            ---------------------
        **/
        } else {
            if (result == "tie") {
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(winner) + "'>" + winnername +
                "</font></b> has tied against <b><font color='" + helpers.color(loser) + "'>" + losername + "</font></b>.");
            } else if (result == "forfeit") {
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(loser) + "'>" + losername +
                "</font></b> has forfeited against <b><font color='" + helpers.color(winner) + "'>" + winnername + "</font></b>.");
            } else {
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(winner) + "'>" + winnername +
                "</font></b> has beaten <b><font color='" + helpers.color(loser) + "'>" + losername + "</font></b>.");
            }
        }
    }
});