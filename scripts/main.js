/*
    ----------------------------------------------
    FUN COMMUNITY MAIN SCRIPT main.js
     - by Maribel Hearn, 2012-2023

    The main script file. Defines global
    constants, variables, functions and
    contains the event handlers.
    ----------------------------------------------
    - auto-remove expired channel auth
    - add server silence?
    - allow (un)blocking cyrillic, arabic etc.
    if I want to bother:
    - full auth name customisation
    - silent muting commands and functionality
*/
var hostLocation;
var floodplayers = [];
var channelPlugins = [];
var bansites = sys.read("bansites.txt").replace(/\r/g, "").split('\n');
bansites.splice(bansites.indexOf(""), 1);
bansites.splice(bansites.lastIndexOf(""), 1);

function initServerGlobals() {
    open = helpers.readData("open");
    updateFrequency = helpers.readData("updatefrequency");
    allowance = helpers.readData("allowance");
    floodtime = helpers.readData("floodtime");
    floodlevel = helpers.readData("floodlevel");
    allowed = helpers.readData("allowed");
    exceptions = helpers.readData("exceptions");
    permchannels = helpers.readData("permchannels");
    allowedrange = helpers.readData("allowedrange");
    namestounban = helpers.readData("namestounban");
    nameblocklist = helpers.readData("nameblocklist");
    silentcommands = helpers.readData("silentcommands");
    rules = helpers.readData("rules");
    banlist = helpers.readData("banlist");
    mutelist = helpers.readData("mutelist");
    members = helpers.readData("members");
    regchannels = helpers.readData("regchannels");
    megabanlist = helpers.readData("megabanlist");
    gigabanlist = helpers.readData("gigabanlist");
    rangebanlist = helpers.readData("rangebanlist");
    if (API_KEY !== "") {
        countryname = helpers.readData("countryname");
        cityname = helpers.readData("cityname");
        timezone = helpers.readData("timezone");
    }
}

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
    DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    AUTH_NAMES = ["User", "Moderator", "Administrator", "Owner", "Invisible Owner"];
    OFFICIAL_PLUGINS = {
        funcommands: {
            name: "Fun Commands",
            path: "funcmds.js"
        },
        partycommands: {
            name: "Party",
            path: "party.js"
        },
        roulettecommands: {
            name: "Roulette",
            path: "roulette.js"
        },
        rrcommands: {
            name: "Russian Roulette",
            path: "rr.js"
        },
        safaricommands: {
            name: "Safari",
            path: "safari.js"
        },
        mafia: {
            name: "Mafia",
            path: "mafia.js"
        },
        mafiastats: {
            name: "Mafia Stats",
            path: "mafiastats.js"
        },
        mafiachecker: {
            name: "Mafia Checker",
            path: "mafiachecker.js"
        }
    };
    DATA_FOLDER = "data/";
    /**
        ----------------
        Require Polyfill
        ----------------
    **/
    var require_cache = typeof require != "undefined" ? require.cache : {};
    require = function require(path, retry) {
        if (require.cache[path]) {
            return require.cache[path];
        }

        var module = {};
        module.module = module;
        module.exports = {};
        module.source = path;

        with (module) {
            var backup = path + ".bak";
            var content = sys.read(path);
            if (content) {
                try {
                    eval(sys.read(path));
                    sys.writeToFile(backup, sys.read(path));
                } catch (e) {
                    print("An error occurred in module " + path + ": " + e);
                    sys.writeToFile(path, sys.read(backup));
                    if (!retry) {
                        require(path, true); // prevent loops
                    }
                } finally {
                    if (sys.fexists(backup)) {
                        sys.rm(backup);
                    }
                }
            }
        }

        require.cache[path] = module.exports;
        return module.exports;
    };
    require.cache = require_cache;
    /**
        -------------------------
        Additional Object Methods
        -------------------------
    **/
    String.prototype.contains = function (char) {
        return this.indexOf(char) > -1;
    };
    Object.defineProperty(Object.prototype, "isEmpty", {
        configurable: true,
        enumerable: false,
        value: function (value) {
            return Object.keys(this).length === 0;
        }
    });
    Object.defineProperty(Array.prototype, "contains", {
        configurable: true,
        enumerable: false,
        value: function (value) {
            return this.indexOf(value) > -1;
        }
    });
    Object.defineProperty(Array.prototype, "remove", {
        configurable: true,
        enumerable: false,
        value: function (element) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == element) {
                    this.splice(this.indexOf(element), 1);
                }
            }
            return this;
        }
    });
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
    sys.sendHtmlMain = function (message) {
        sys.sendHtmlAll(message, 0);
    };
    sys.sendHtmlAuths = function (message, channel) {
        var index;
        if (!channel) {
            for (index in players) {
                if (sys.auth(index) > 1) {
                    sys.sendHtmlMessage(index, message);
                }
            }
        } else {
            for (index in players) {
                if (sys.auth(index) > 1) {
                    sys.sendHtmlMessage(index, message, channel);
                }
            }
        }
    };
    sys.sendHtmlWatch = function (message) {
        if (message.contains("<img src='data:image/png;base64,")) {
            message = message.replace(/<img src='data:image\/png;base64,(.*?)>/g, "");
        }
        sys.sendHtmlAll(message, watch);
    };
    sys.sendHtmlOwner = function (message) {
        for (var index in players) {
            if (sys.auth(index) >= 3) {
                sys.sendHtmlMessage(index, message);
            }
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
}).call(null);

({
    loadScript: function () {
        /**
            ------------------------
            Load Modules and Plugins
            ------------------------
        **/
        require.cache = {};
        var modules = sys.filesForDirectory("scripts");
        var numberOfModules = modules.length;
        for (var i = 0; i < numberOfModules; i++) {
            if (modules[i] == "helpers.js") {
                helpers = require("scripts/" + modules[i]);
            } else {
                require("scripts/" + modules[i]);
            }
        }
        var plugins = sys.filesForDirectory("plugins");
        for (var plugin in OFFICIAL_PLUGINS) {
            var path = OFFICIAL_PLUGINS[plugin].path;
            if (sys.fexists("plugins/" + path)) {
                require("plugins/" + path); // retry = false, plugin = true
                if (!["funcmds.js", "mafiastats.js", "mafiachecker.js"].contains(path)) {
                    channelPlugins.push(path.replace(".js", ""));
                }
            }
        }
        // unofficial plugins
        if (sys.dirsForDirectory(sys.cwd()).contains("plugins")) {
            var numberOfPlugins = plugins.length;
            for (var j = 0; j < numberOfPlugins; j++) {
                if (!require.cache.hasOwnProperty("plugins/" + plugins[j]) && plugins[j].split('.')[1] == "js") {
                    require("plugins/" + plugins[j]);
                }
            }
        }
    },

    unloadScript: function () {
    },

    switchError: function (script) {
        print("An error occurred while reloading the scripts; the old script was kept.");
        sys.sendHtmlOwner("An error occurred while reloading the scripts; the old script was kept.");
    },

    warning: function (warning) {
    },

    battleConnectionLost: function () {
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] Connection to the battle server was lost.");
    },

    // returns URL to retrieve country data
    countryRetrievalUrl: function (ip) {
        return "http://api.ipinfodb.com/v3/ip-city/?key=" + API_KEY + "&ip=" + ip + "&format=json";
    },

    // sets host IP and optionally country data
    setHostLocation: function (reload) {
        if (hostLocation && !reload) {
            return;
        }
        sys.webCall("http://whatismyip.akamai.com", function (resp) {
            if (resp === "") {
                print("An error occurred while loading the host IP address.");
                return;
            }
            var result = {"ip": resp};
            if (API_KEY !== "") {
                sys.webCall(this.countryRetrievalUrl(hostIp), function (resp) {
                    resp = JSON.parse(resp);
                    result.timeZone = helpers.timezonedata(resp.countryName, resp.timeZone);
                    result.country = helpers.countrydata(resp.countryName);
                    result.city = helpers.citydata(resp.cityName);
                    print("Host location data has been loaded.");
                    hostLocation = result;
                });
            } else {
                hostLocation = result;
            }
        });
    },

    serverStartUp: function () {
        var time = 100, pluginEvent, i;
        serverStarting = true;
        if (sys.fexists("RelayStation.exe") && sys.os() == "windows") {
            sys.system("start RelayStation");
        } else if (sys.fexists("RelayStation") && sys.os() != "windows") {
            sys.system("(./RelayStation &)");
        }
        /**
            ------------------------------------------------
            Initialize data for first time use, set API keys
            ------------------------------------------------
        **/
        if (!sys.fexists("data/")) {
            if (sys.fexists("data")) {
                sys.rm("data");
            }
            helpers.initData();
        }
        API_KEY = JSON.parse(sys.read(DATA_FOLDER + "API_KEY.txt"));
        GOOGLE_KEY = JSON.parse(sys.read(DATA_FOLDER + "GOOGLE_KEY.txt"));
        UPDATE_KEY = JSON.parse(sys.read(DATA_FOLDER + "UPDATE_KEY.txt"));
        /**
            ----------------
            Global Variables
            ----------------
        **/
        helpers.initCustomGlobals();
        initServerGlobals();
        layout = "new";
        players = [];
        battles = {};
        tour = {};
        tour[0] = {};
        tour[0].tourmode = 0;
        /**
            ----------------
            Channel Creation
            ----------------
        **/
        sys.setTimer(function () {
            sys.createChannel(permchannels[0]);
        }, time, 0);
        time += 100;
        sys.setTimer(function () {
            sys.createChannel(permchannels[1]);
        }, time, 0);
        time += 100;
        sys.setTimer(function () {
            sys.createChannel(permchannels[2]);
        }, time, 0);
        time += 100;
        if (permchannels[3]) {
            sys.setTimer(function () {
                sys.createChannel(permchannels[3]);
            }, time, 0);
            time += 100;
        }
        if (permchannels[4]) {
            sys.setTimer(function () {
                sys.createChannel(permchannels[4]);
            }, time, 0);
            time += 100;
        }
        if (permchannels[5]) {
            sys.setTimer(function () {
                sys.createChannel(permchannels[5]);
            }, time, 0);
            time += 100;
        }
        if (permchannels[6]) {
            sys.setTimer(function () {
                sys.createChannel(permchannels[6]);
            }, time, 0);
            time += 100;
        }
        if (permchannels[7]) {
            sys.setTimer(function () {
                sys.createChannel(permchannels[7]);
            }, time, 0);
            time += 100;
        }
        sys.setTimer(function () {
            watch = sys.channelId(permchannels[0]);
            authchannel = sys.channelId(permchannels[1]);
            ownerchannel = sys.channelId(permchannels[2]);
            for (i = 0; i < channelPlugins.length; i++) {
                global[channelPlugins[i] + "channel"] = sys.channelId(permchannels[i + 3]);
            }
            print("The default channels have been created.");
            serverStarting = false;
        }, time, 0);
        time += 100;
        /**
            ----------------------------------
            Set Host IP, Country and Time Zone
            ----------------------------------
        **/
        this.setHostLocation();
        /**
            --------------
            Custom Plugins
            --------------
        **/
        sys.setTimer(function () {
            var plugins = sys.filesForDirectory("plugins");
            for (var i in plugins) {
                if (Object.keys(OFFICIAL_PLUGINS).contains(plugins[i])) {
                    continue;
                }
                pluginEvent = plugins[i].replace(".js", "") + "Start";
                if (global[pluginEvent]) {
                    global[pluginEvent]();
                }
            }
        }, time, 0);
    },

    serverShutDown: function () {
        /**
            -------------------------------------
            Close Battle Server and Relay Station
            -------------------------------------
        **/
        sys.killBattleServer();
        if (sys.fexists("RelayStation.exe") && sys.os() == "windows") {
            sys.system("taskkill /f /im RelayStation.exe");
        } else if (sys.fexists("RelayStation") && sys.os() != "windows") {
            sys.system("kill $(pidof RelayStation)");
        }
    },

    // updates the scripts from the github repo
    updateScript: function (auto, silent) {
        if (!sys.fexists(".git")) {
            sys.sendHtmlOwner(helpers.bot(bots.script) + "The git clone seems to have been deleted; the scripts will not be automatically updated.");
            return;
        }
        var resp = sys.synchronousWebCall("https://api.github.com/repos/MaribelHearn/fc-scripts/commits" + UPDATE_KEY);
        var json = JSON.parse(resp);
        var i = 0;
        var commitmessage = json[i].commit.message;
        var author = json[i].committer.login;
        var sha = json[i].sha;
        if (commitmessage == "Merge branch 'master' of https://github.com:MaribelHearn/fc-scripts into master" || commitmessage == "Merge git://github.com/MaribelHearn/fc-scripts") {
            i = i + 1;
            commitmessage = json[i].commit.message;
            author = json[i].committer.login;
            sha = json[i].sha;
        }
        var latestShaHash = helpers.readData("latestshahash");
        if (sha == latestShaHash) {
            sys.sendHtmlOwner(helpers.bot(bots.script) + "An" + (auto ? " automatic " : " ") + "update was attempted, but the scripts were already up-to-date.");
            return;
        }
        latestShaHash = sha;
        helpers.saveData("latestShaHash", sha);
        sys.system("git pull");
        sys.changeScript(sys.read("scripts.js"));
        if (!silent) {
            sys.sendHtmlOwner(helpers.bot(bots.script) + "The server scripts have been" + (auto ? " automatically " : " ") + "updated! [Commit Message: " + commitmessage + "]");
        }
    },

    step: function () {
        var pluginEvent, name, index;
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
        for (index in banlist) {
            if (banlist[index].time !== "-") {
                banlist[index].time--;
                if (banlist[index].time === 0) {
                    delete banlist[index];
                    members[index] ? name = members[index] : name = index;
                    sys.sendHtmlAuths(helpers.bot(bots.ban) + name + "'s ban has expired!");
                }
                helpers.saveData("banlist", banlist);
            }
        }
        /**
            ---------
            Mute Time
            ---------
        **/
        for (index in mutelist) {
            if (mutelist[index].time !== "-") {
                mutelist[index].time--;
                if (mutelist[index].time === 0) {
                    delete mutelist[index];
                    members[index] ? name = members[index] : name = index;
                    sys.sendHtmlAuths(helpers.bot(bots.mute) + name + "'s mute has expired!");
                }
                helpers.saveData("mutelist", mutelist);
            }
        }
        /**
            ------------
            Auto-Updates
            ------------
        **/
        if (UPDATE_KEY !== "" && updateFrequency > 0 && sys.time() % updateFrequency === 0) {
            var auto = true;
            var silent = false;
            this.updateScript(auto, silent);
        }
        /**
            ---------------
            Roulette Events
            ---------------
        **/
        if (require.cache.hasOwnProperty("plugins/roulette.js")) {
            rouletteEvents();
        }
        /**
            --------------
            Custom Plugins
            --------------
        **/
        var plugins = sys.filesForDirectory("plugins");
        for (i in plugins) {
            if (Object.keys(OFFICIAL_PLUGINS).contains(plugins[i])) {
                continue;
            }
            pluginEvent = plugins[i].replace(".js", "") + "Step";
            if (global[pluginEvent]) {
                global[pluginEvent]();
            }
        }
    },

    beforeIPConnected: function (ip) {
        /**
            ---------------------
            Server Starting Check
            ---------------------
        **/
        if (serverStarting) {
            sys.stopEvent();
            return;
        }
        /**
            -------------
            Relay Station
            -------------
        **/
        if (ip == "::1%0") {
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] The web client is connecting to the server.");
        } else {
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] IP " + ip + " is connecting to the server.");
        }
    },

    beforeLogIn: function (src) {
        var name = sys.name(src), ip = sys.ip(src), range = sys.range(src), color = helpers.color(src), auth = sys.auth(src), i;
        /**
            ----------------------------------------
            Allowed IPs and ranges bypass all checks
            ----------------------------------------
        **/
        if (!helpers.isInArray(ip, allowed) && !helpers.isInArray(range, allowedrange)) {
            /**
                ---------
                Ban Check
                ---------
            **/
            for (i in banlist) {
                if (banlist[i].ip == ip) {
                    sys.sendMessage(src, "You are banned!");
                    sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] Banned user <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server.");
                    sys.stopEvent();
                    return;
                }
            }
            /**
                ---------------
                Range Ban Check
                ---------------
            **/
            for (i in rangebanlist) {
                if (rangebanlist[i].range == range) {
                    sys.sendMessage(src, "You are banned!");
                    sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] Range banned user <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server.");
                    sys.stopEvent();
                    return;
                }
            }
            /**
                --------------------
                Server Closure Check
                --------------------
            **/
            if (!open) {
                sys.sendMessage(src, "Sorry, the server is closed for maintenance at the moment.");
                sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server during closure.");
                sys.stopEvent();
                return;
            }
            /**
                ------------------
                Banned Words Check
                ------------------
            **/
            name = name.toLowerCase();
            for (var index in nameblocklist) {
                if (name.indexOf(nameblocklist[index]) != -1 && !helpers.isInArray(name, exceptions) && auth < 3) {
                    sys.sendMessage(src, "Your name contains a banned word: " + nameblocklist[index] + ". Please change your name and try entering again.");
                    sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server with a banned word in their username.");
                    sys.stopEvent();
                    return;
                }
            }
            /**
                -----------------------
                Banned Characters Check
                -----------------------
            **/
            var bannedName = this.bannedUsernameCheck(name);
            if (bannedName[0] && auth < 3) {
                sys.sendMessage(src, "Your name contains " + bannedName[1] + ". Please change your name and try entering again.");
                sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server with " + bannedName[1] + " in their username.");
                sys.stopEvent();
                return;
            }
        }
    },

    // return string with first letter capitalised
    cap: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // returns operating system image
    osImage: function (srcos) {
        return require("scripts/base64.js")[srcos];
    },

    // returns formatted operating system name
    osName: function (srcos) {
        return (srcos == "webclient" ? "Web Client" : this.cap(srcos));
    },

    // returns operating system image plus formatted name
    os: function (srcos) {
        return this.osImage(srcos) + " " + this.osName(srcos);
    },

    // returns formatted string of PO version
    formatVersion: function (version) {
        switch (version) {
            case 2721:
                return "2.7.2.1";
            case 2700:
                return "2.7.1 / 2.7.2";
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
    },

    // returns whether given username is a guest name
    isGuest: function (name) {
        return (/\bguest[0-9]/i).test(name);
    },

    afterLogIn: function (src) {
        var name = sys.name(src),
        lower = sys.name(src).toLowerCase(),
        auth = sys.auth(src),
        ip = sys.ip(src),
        cookie = sys.cookie(src) ? sys.cookie(src) : "none",
        id = sys.uniqueId(src) ? sys.uniqueId(src).id : "none",
        color = helpers.color(src),
        os = sys.os(src),
        version = sys.version(src),
        country,
        servername = sys.getServerName(),
        uptime = sys.profileDump().split('\n')[0].split(',')[0].split(':')[1].slice(1, -2),
        authtitle;
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
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] Giga banned user <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server.");
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
            helpers.saveData("namestounban", namestounban);
        } else {
            if (sys.isMegaBanned(cookie)) {
                sys.sendMessage(src, "You are banned!");
                sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] Mega banned user <b><font color='" + color + "'>" + name + "</font></b> tried to enter the server.");
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
        helpers.saveData("members", members);
        /**
            -----------
            Max Players
            -----------
        **/
        var maxplayers = helpers.readData("maxplayers");
        if (sys.numPlayers() > maxplayers) {
            maxplayers++;
            helpers.saveData("maxplayers", maxplayers);
        }
        /**
            --------------
            Entry Messages
            --------------
        **/
        if (layout == "new") {
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
        } else {
            sys.sendHtmlMessage(src, "<b><font color='blueviolet'>Server Run Time:</font></b> " + helpers.formatUptime(uptime));
            sys.sendHtmlMessage(src, "<b><font color='red'>Number of Players Online:</font></b> <em>1 out of a record maximum of 3.</em>");
            sys.sendHtmlMessage(src, "<br><timestamp/><b>Type: <font color='green'>/Commands</font></b> into a channel's main chat to view a list of commands.");
            sys.sendHtmlMessage(src, "<timestamp/><b>Type: <font color='green'>/Rules</font></b> into a channel's main chat to view the server rules.<br>");
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
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> is using " + this.os(os) + " " + this.formatVersion(version) + ".");
        /**
            ------------------
            Fake Guest Warning
            ------------------
        **/
        if (this.isGuest(name) && sys.os(src) != "android" && sys.os(src) != "webclient") {
            sys.sendHtmlAuths(helpers.bot(bots.welcome) + "This person is using a guest name, but isn't actually on " + this.osName("android") + " or " + this.osName("webclient") + ". Keep an eye on them!");
        }
        /**
            ---------------------
            Time Zone and Country
            ---------------------
        **/
        if (API_KEY !== "") {
            var flags = require("scripts/base64.js").flags;
            if (countryname[lower]) {
                country = helpers.toFlagKey(helpers.removespaces(countryname[lower].toUpperCase()));
                sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> is from " + flags[country] + " " + countryname[lower] + ".");
            } else {
                sys.webCall(this.countryRetrievalUrl(ip), function (resp) {
                    resp = JSON.parse(resp);
                    timezone[lower] = helpers.timezonedata(resp.countryName, resp.timeZone);
                    countryname[lower] = helpers.countrydata(resp.countryName);
                    cityname[lower] = helpers.citydata(resp.cityName);
                    helpers.saveData("timezone", timezone);
                    helpers.saveData("countryname", countryname);
                    helpers.saveData("cityname", cityname);
                    country = helpers.toFlagKey(helpers.removespaces(countryname[lower].toUpperCase()));
                    sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + color + "'>" + name + "</font></b> is from " + flags[country] + " " + countryname[lower] + ".");
                });
            }
        }
    },

    beforeChannelJoin: function (src, channel) {
        var lower = sys.channel(channel).toLowerCase();
        var name, auth = sys.auth(src), ip = sys.ip(src);
        if (regchannels[lower]) {
            var cbanlist = regchannels[lower].banlist;
        }
        players[src] ? name = players[src].name : name = sys.name(src);
        /**
            -----------------------
            Channel Closure and Ban
            -----------------------
        **/
        if (regchannels[lower]) {
            if (helpers.closeCheck(src, name, lower)) {
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
        }
    },

    afterChannelJoin: function (src, channel) {
        var name = sys.name(src), channelname = sys.channel(channel), lower = sys.channel(channel).toLowerCase(),
            cookie = sys.cookie(src) ? sys.cookie(src) : "none", id = sys.uniqueId(src) ? sys.uniqueId(src).id : "none";
        if (sys.isMegaBanned(cookie)) {
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
        sys.sendHtmlMessage(src, "<b><font color='" + (layout == "new" ? serverTopicColor : "maroon") +
        "'>Server Topic:</font></b> " + servertopic.replace("~Server~", sys.getServerName()), channel);
        if (regchannels[lower]) {
            sys.sendHtmlMessage(src, "<b><font color='" + (layout == "new" ? channelTopicColor : "indigo") +
            "'>Channel " + (layout == "new" ? "Topic" : "Description") +
            ":</font></b> " + regchannels[lower].topic.join(TOPIC_DELIMITER), channel);
        } else {
            if (require.cache.hasOwnProperty("plugins/party.js") && channel == partychannel) {
                var partycommands = require("plugins/party.js");
                if (partycommands.getPartyMode() != "none") {
                    sys.sendHtmlMessage(src, "<b><font color='" + (layout == "new" ? channelTopicColor : "indigo") +
                    "'>Channel " + (layout == "new" ? "Topic" : "Description") +
                    ":</font></b> This channel is currently in " + helpers.cap(partyMode) + " Mode" +
                    "." + (partyMode == "nightclub" ? "<font color='#FFFFFF'>:</font>" +
                    "<div style='background: #000000;'>" : ""), channel);
                }
            } else {
                sys.sendHtmlMessage(src, "<b><font color='" + (layout == "new" ? channelTopicColor : "indigo") +
                "'>Channel " + (layout == "new" ? "Topic" : "Description") +
                ":</font></b> Welcome to " + channelname + "!", channel);
            }
        }
        if (require.cache.hasOwnProperty("plugins/party.js") && channel == partychannel && require("plugins/party.js").getPartyMode() == "nightclub") {
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</b> has joined the channel " + helpers.channelLink(channelname) + ".");
            return;
        }
        /**
            --------------
            Custom Plugins
            --------------
        **/
        var plugins = sys.filesForDirectory("plugins");
        for (var i in plugins) {
            if (Object.keys(OFFICIAL_PLUGINS).contains(plugins[i])) {
                continue;
            }
            pluginEvent = plugins[i].replace(".js", "") + "AfterChannelJoin";
            if (global[pluginEvent]) {
                global[pluginEvent](src, channel);
            }
        }
        /**
            ---------------
            Welcome Message
            ---------------
        **/
        var cauth = (helpers.cauth(name, channel) >= 1 && sys.dbAuth(name) < 4 ? helpers.cauthname(name, channel) + " " : "");
        if (channel > 0 || players[src]) { // do not send main channel welcome on server join
            if (layout == "new") {
                sys.sendHtmlAll(helpers.bot(bots.channel) + channelWelcomeMessage.replace(/~Player~/, cauth + name).replace(/~Channel~/, channelname), channel);
            } else {
                sys.sendHtmlAll("<timestamp/><b>~Please Welcome " + helpers.rainbow(name) + " to " + channelname + "~</b>", channel);
            }
        }
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has joined the channel " + helpers.channelLink(channelname) + ".");
    },

    beforeChannelLeave: function (src, channel) {
    },

    afterChannelLeave: function (src, channel) {
        /**
            --------------
            Custom Plugins
            --------------
        **/
        var plugins = sys.filesForDirectory("plugins");
        for (var i in plugins) {
            if (Object.keys(OFFICIAL_PLUGINS).contains(plugins[i])) {
                continue;
            }
            pluginEvent = plugins[i].replace(".js", "") + "AfterChannelLeave";
            if (global[pluginEvent]) {
                global[pluginEvent](src, channel);
            }
        }
        /**
            -------------
            Leave Message
            -------------
        **/
        var name = sys.name(src), lower = players[src].name.toLowerCase(),
            cauth = (helpers.cauth(lower, channel) >= 1 && sys.dbAuth(lower) < 4 ? helpers.cauthname(lower, channel) + " " : ""),
            channelname = sys.channel(channel);
        if (require.cache.hasOwnProperty("plugins/party.js")) {
            if (channel == partychannel && require("plugins/party.js").getPartyMode() == "nightclub") {
                sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + helpers.color(src) + "'>" + name + "</font></b> has left the channel " + helpers.channelLink(channelname) + ".");
                return;
            }
        }
        var cookie = sys.cookie(src) ? sys.cookie(src) : "none";
        var id = sys.uniqueId(src) ? sys.uniqueId(src).id : "none";
        if (sys.isMegaBanned(cookie) || sys.isGigaBanned(id)) {
            return;
        }
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] <b><font color='" + helpers.color(src) + "'>" + name + "</font></b> has left the channel " + helpers.channelLink(channelname) + ".");
        if (channel === 0) {
            return;
        }
        if (layout == "new") {
            sys.sendHtmlAll(helpers.bot(bots.channel) + channelLeaveMessage.replace(/~Player~/, cauth + name).replace(/~Channel~/, channelname), channel);
        } else {
            sys.sendHtmlAll("<timestamp/><b>~" + helpers.rainbow(name) + " has left " + channelname + "~</b>", channel);
        }
    },

    beforeLogOut: function (src) {
        sys.changeName(src, players[src].name);
    },

    afterLogOut: function (src) {
        var name = sys.name(src), lower = players[src].name.toLowerCase(), auth = sys.auth(src), authtitle = "";
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
        var cookie = sys.cookie(src) ? sys.cookie(src) : "none";
        var id = sys.uniqueId(src) ? sys.uniqueId(src).id : "none";
        var servername = sys.getServerName();
        if (!sys.isMegaBanned(cookie) && !sys.isGigaBanned(id)) {
            if (layout == "new") {
                sys.sendHtmlMain(helpers.bot(bots.welcome) + leaveMessage.replace(/~Player~/, authtitle + name).replace(/~Server~/, servername));
            } else {
                sys.sendHtmlMain("<timestamp/><b>~" + leaveMessage.replace(/~Player~/, name).replace(/~Server~/, servername) + "~</b>");
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
        if (sys.auth(src) <= 0 && API_KEY !== "") {
            delete countryname[lower];
            delete cityname[lower];
            delete timezone[lower];
            helpers.saveData("countryname", countryname);
            helpers.saveData("cityname", cityname);
            helpers.saveData("timezone", timezone);
        }
        delete players[src];
    },

    beforeChangeTeam: function (src, team) {
    },

    afterChangeTeam: function (src, team) {
        var name = sys.name(src), ip = sys.ip(src), color = helpers.color(src), lower = sys.name(src).toLowerCase(), oldName = players[src].name.toLowerCase();
        /**
            -----------------------
            Player Variable Setting
            -----------------------
        **/
        members[name.toLowerCase()] = name;
        helpers.saveData("members", members);
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Player] <b><font color='" + players[src].color + "'>" + players[src].name + "</font></b> changed their team, and their name to <b><font color='" + color +
        "'>" + name + "</font></b>.");
        players[src].name = name;
        players[src].color = color;
        /**
            ---------------------
            Time Zone and Country
            ---------------------
        **/
        if (API_KEY !== "") {
            timezone[lower] = timezone[oldName];
            countryname[lower] = countryname[oldName];
            cityname[lower] = cityname[oldName];
            helpers.saveData("timezone", timezone);
            helpers.saveData("countryname", countryname);
            helpers.saveData("cityname", cityname);
        }
    },

    beforeChangeTier: function (src, team, oldtier, newtier) {
        var tierchecks = require("scripts/tierchecks.js");
        if (["Clear Skies", "Rain Dance", "Sunny Day", "Hail", "Sandstorm"].indexOf(newtier) != -1) {
            tierchecks.weatherless(src, team, newtier);
        }
        if (newtier == "Metronome") {
            tierchecks.metronome(src, team);
        }
        if (newtier == "Middle Cup") {
            tierchecks.middleCup(src, team);
        }
        if (newtier == "Monocolour") {
            tierchecks.monoColor(src, team);
        }
        if (newtier == "Monotype") {
            tierchecks.monoType(src, team);
        }
        if (newtier == "Monospecies") {
            tierchecks.monoSpecies(src, team);
        }
        if (newtier == "Monogen") {
            tierchecks.monoGen(src, team);
        }
        if (newtier == "Monoletter") {
            tierchecks.monoLetter(src, team);
        }
    },

    afterChangeTier: function (src, team, oldtier, newtier) {
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Player] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has changed team " + team + " from the " + oldtier +
        " tier to the " + newtier + " tier.");
    },

    beforeNewPM: function (src) {
        /**
            --------------------------------------
            Prevent Silent Muted People From PMing
            --------------------------------------
        **/
        sys.sendHtmlOwner("<timestamp/> [Debug] PM is being sent by " + players[src].name + ".");
        var lower = players[src].name.toLowerCase();
        if (helpers.muteCheck(players[src].name)) {
            if (mutelist[lower].silent) {
                sys.stopEvent();
                return;
            }
        }
    },

    afterNewPM: function (src) {
    },

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
    },

    afterChannelCreated: function (channel, channelname, creator) {
        var lower = sys.channel(channel).toLowerCase();
        if (channel > 1 && global.hasOwnProperty("watch")) {
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] " +
            "<b><font color='" + (creator ? helpers.color(creator) : "#FFA500") +
            "'>" + (creator ? sys.name(creator) : "~~Server~~") + "</font></b> " +
            "has created the channel " + helpers.channelLink(sys.channel(channel)) + ".");
        }
    },

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
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Server] The channel #" + sys.channel(channel) + " has been destroyed.");
    },

    afterChannelDestroyed: function (channel) {
    },

    // checks if the given user has exceeded the flood allowance
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
    },

    // returns whether given string contains banned characters
    bannedCharacters: function (message, channelLower) {
        for (var i in bansites) {
            if (message.indexOf(bansites[i]) != -1) {
                return [true, ""];
            }
        }
        var THAI = /[\u0E00-\u0E7F]/;
        var ZALGO = /[\u0300-\u036F]/;
        var ARABIC = /[\u0600-\u06FF]/;
        var HEBREW = /[\u0591-\u05F4]/;
        var REVERSE = /[\u202E\u202D]/;
        var SPECIAL = /[\ufff0-\uffff]/;
        if (ZALGO.test(message) && (!regchannels[channelLower] || !regchannels[channelLower].zalgo)) {
            return [true, "zalgo"];
        }
        if (REVERSE.test(message) && (!regchannels[channelLower] || !regchannels[channelLower].reverse)) {
            return [true, "reverse characters"];
        }
        if (THAI.test(message) && (!regchannels[channelLower] || !regchannels[channelLower].extending)) {
            return [true, "extending characters"];
        }
        if (SPECIAL.test(message) && (!regchannels[channelLower] || !regchannels[channelLower].backward)) {
            return [true, "special characters"];
        }
        if (ARABIC.test(message)) {
            return [true, "Arabic"];
        }
        if (HEBREW.test(message)) {
            return [true, "Hebrew"];
        }
        return [false, ""];
    },

    // returns whether given name contains banned characters for a username
    bannedUsernameCheck: function (name) {
        var FAKEI = /\u00A1/;
        var GREEK = /[\u0370-\u03FF]/;
        var OTHER = /\u3061|\u65532/;
        var SPACE = /\u0009-\u000D|\u0085|\u00A0|\u1680|\u180E|\u2000-\u200A|\u2028|\u2029|\u2029|\u202F|\u205F|\u3000/;
        var DASH = /\u058A|\u05BE|\u1400|\u1806|\u2010-\u2015|\u2053|\u207B|\u208B|\u2212|\u2E17|\u2E1A|\u301C|\u3030|\u30A0|[\uFE31-\uFE32]|\uFE58|\uFE63|\uFF0D/;
        var CYRILLIC = /\u0455|\u04ae|\u04c0|\u04cf|\u050c|\u051a|\u051b|\u051c|\u051d|\u0405|\u0408|\u0430|\u0410|\u0412|\u0435|\u0415|\u041c|\u041d|\u043e|\u041e|\u0440|\u0420|\u0441|\u0421|\u0422|\u0443|\u0445|\u0425|\u0456|\u0406/;
        var bannedCharacters = this.bannedCharacters(name);
        if (bannedCharacters[0]) {
            return bannedCharacters;
        } else if (CYRILLIC.test(name)) {
            return [true, "Cyrillic that is similar to letters"];
        } else if (GREEK.test(name)) {
            return [true, "Greek that is similar to letters"];
        } else if (FAKEI.test(name)) {
            return [true, "a fake I"];
        } else if (SPACE.test(name)) {
            return [true, "space characters"];
        } else if (DASH.test(name)) {
            return [true, "dash characters"];
        } else if (OTHER.test(name)) {
            return [true, "special characters"];
        } else {
            return [false, ""];
        }
    },

    beforeChatMessage: function (src, message, channel) {
        var name = sys.name(src), auth = sys.auth(src), color = helpers.color(src), channelname = sys.channel(channel), channelname2 = sys.channel(channel).toLowerCase(), command;
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
            if (this.floodCheck(src, channelname2)) {
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
        var hasBannedCharacters = this.bannedCharacters(message, channelname2);
        if (hasBannedCharacters[0] && auth < 3) {
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
        if (require.cache.hasOwnProperty("plugins/party.js")) {
            var partycommands = require("plugins/party.js");
            if (channel == partychannel && partycommands.getPartyMode() != "none") {
                partycommands.beforeChatMessage(src, message, channel);
                sys.stopEvent();
                return;
            }
        }
        /**
            -----
            Mafia
            -----
        **/
        if (require.cache.hasOwnProperty("plugins/mafia.js")) {
            if (channel == mafiachannel) {
                mafiaBeforeChat(src, message, channel);
                sys.stopEvent();
                return;
            }
        }
        /**
            --------------
            Custom Plugins
            --------------
        **/
        var plugins = sys.filesForDirectory("plugins");
        for (var i in plugins) {
            pluginEvent = plugins[i].replace(".js", "") + "Commands";
            command = message.replace(COMMAND_SYMBOL, "").replace(' ', DELIMITER).split(' ')[0];
            if (message.charAt(0) == COMMAND_SYMBOL && message.charAt(1) != COMMAND_SYMBOL && global[pluginEvent] && global[pluginEvent].hasOwnProperty(command)) {
                global[pluginEvent][command](src, channel, message.split(DELIMITER));
                sys.sendHtmlWatch(helpers.bot(bots.spy) + "[" + helpers.channelLink(channelname) +
                "] <b><font color='" + color + "'>" + helpers.escapehtml(name) + "</font></b> ran " + message + ".");
                sys.stopEvent();
                return;
            }
        }
        /**
            --------
            Commands
            --------
        **/
        if (message.charAt(0) == COMMAND_SYMBOL && message.charAt(1) != COMMAND_SYMBOL && message.length > 1) {
            var handler = require("scripts/handler.js");
            handler.parseCommand(src, message, channel, name, auth, false);
            sys.stopEvent();
            return;
        }
        /**
            ----------
            Mute Check
            ----------
        **/
        if (helpers.muteCheck(players[src].name) && auth < 3) {
            helpers.muteMessage(src, channel, message);
            sys.stopEvent();
            return;
        }
        /**
            ------------------
            Channel Mute Check
            ------------------
        **/
        if (helpers.cmuteCheck(players[src].name, channelname2) && auth < 3) {
            helpers.channelMuteMessage(src, channel);
            sys.stopEvent();
            return;
        }
        /**
            -------------
            Silence Check
            -------------
        **/
        if (regchannels[channelname2]) {
            if (regchannels[channelname2].silence > auth) {
                helpers.silenceMessage(src, channel);
                sys.stopEvent();
                return;
            }
        }
        /**
            ---------------------
            Watch Channel Logging
            ---------------------
        **/
        if (message.substr(0, 2) == COMMAND_SYMBOL + COMMAND_SYMBOL) {
            sys.stopEvent();
            message = message.slice(1);
            sys.sendAll(name + ": " + message, channel);
        }
        if (regchannels[channelname2] && !regchannels[channelname2].priv || !regchannels[channelname2]) {
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[" + helpers.channelLink(channelname) +
            "] <b><font color='" + color + "'>" + helpers.escapehtml(name) + "</font></b>: " + helpers.escapehtml(message));
        }
    },

    // returns preferred date notation for given date
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
    },

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
            -----------
            YouTube Bot
            -----------
        **/
        if (GOOGLE_KEY !== "") {
            var link = helpers.strip(message).substring(helpers.strip(message).indexOf(": ") + 2, helpers.strip(message).length).trim(),
                regex = /.*(?:youtu.be\/|youtube.*v=|youtube.*\/embed\/|youtube.*\/v\/|youtube.*videos\/)([^#&?]*).*/;
            if (link.match(regex)) {
                try {
                    var data = helpers.htmlLinks(link, "object");
                } catch (error) {
                    sys.sendHtmlOwner(helpers.bot(bots.main) + "An error occurred: " + error);
                    return;
                }

                var title = data.items[0].snippet.title;
                var username = data.items[0].snippet.channelTitle;
                var views = helpers.sep(data.items[0].statistics.viewCount);
                var likes = helpers.sep(data.items[0].statistics.likeCount);
                var dislikes = helpers.sep(data.items[0].statistics.dislikeCount);
                var publishedDate = this.correctDateNotation(data.items[0].snippet.publishedAt);

                sys.sendHtmlAll(helpers.bot(bots.main) + title + ", Uploader: " + username + ", Views: <b>" + views + "</b>, Likes: <b><font color='green'>" + likes + "</font></b>, " +
                "Dislikes: <b><font color='red'>" + dislikes + "</font></b>, Published: " + publishedDate + " UTC.", channel);
            }
        }
        /**
            --------------
            Custom Plugins
            --------------
        **/
        var plugins = sys.filesForDirectory("plugins");
        for (var i in plugins) {
            if (Object.keys(OFFICIAL_PLUGINS).contains(plugins[i])) {
                continue;
            }
            pluginEvent = plugins[i].replace(".js", "") + "AfterChat";
            if (global[pluginEvent]) {
                global[pluginEvent](src, message, channel);
            }
        }
    },

    beforeNewMessage: function (message) {
        /**
            ----------------
            Private Channels
            ----------------
        **/
        if (message.substr(0, 2) == "[#" && message.indexOf(']') != -1) {
            var lower = message.toLowerCase();
            lower = lower.split(']');
            lower = lower[0];
            lower = lower.slice(2);
            if (regchannels[lower] && regchannels[lower].priv) {
                sys.stopEvent();
                return;
            }
        } else {
            if (message.substring(0, 3) == "IP ") {
                sys.stopEvent();
                sys.sendHtmlAll(helpers.bot(bots.spy) + "[Server] " + message, sys.channelId(sys.dosChannel()));
            }
        }
    },

    afterNewMessage: function (message) {
    },

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
            if (lower == "reload") {
                require.cache["ownercmds.js"].reload(0, 0, command);
            } else if (lower == "eval") {
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
            } else if (lower == "owner") {
                var player = command[1];
                if (!player || !sys.id(player)) {
                    print("Error 404, player not found.");
                    return;
                }
                sys.changeAuth(sys.id(player), 3);
                print(members[player.toLowerCase()] + " is now Owner.");
            } else if (lower == "commands") {
                print("/reload <script>: reloads the server script <script>; all if <script> is not given.");
                print("/eval <code>: executes <code> and prints its runtime.");
                print("/print <text>: prints <text> to standard output.");
                print("/var <variable>: prints the value of <variable>.");
            } else {
                print("Error 404, command '" + lower + "' not found. Use /commands to show the list of commands.");
            }
            return;
        }
        /**
            --------------
            Custom Plugins
            --------------
        **/
        var plugins = sys.filesForDirectory("plugins");
        for (var i in plugins) {
            if (Object.keys(OFFICIAL_PLUGINS).contains(plugins[i])) {
                continue;
            }
            pluginEvent = plugins[i].replace(".js", "") + "ServerMessage";
            if (global[pluginEvent]) {
                // on success, prevent ~~Server~~ message
                if (!global[pluginEvent](message)) {
                    return;
                }
            }
        }
        sys.sendHtmlMain("<font color='#FFA500'><timestamp/><b>~~Server~~:</b></font> " + message);
    },

    afterServerMessage: function (message) {
    },

    beforePlayerKick: function (src, trgt) {
        sys.stopEvent();
        var srcauth = sys.auth(src), trgtauth = sys.auth(trgt);
        if (srcauth <= trgtauth) {
            helpers.starfox(src, channel, command, bots.kick, "Error 403, you may not kick " + players[trgt].name + " because their auth level is not below your current!");
            return;
        }
        script.beforeChatMessage(src, "/kick " + players[trgt].name, 0);
    },

    afterPlayerKick: function (src, trgt) {
    },

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
    },

    afterPlayerBan: function (src, trgt) {
    },

    beforePlayerAway: function (src, away) {
    },

    afterPlayerAway: function (src, away) {
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Player] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> is " + (away ? "idling" : "back") + ".");
    },

    beforePlayerRegister: function (src) {
        var name = sys.name(src), color = helpers.color(src);
        if (this.isGuest(name)) {
            sys.stopEvent();
            sys.sendMessage(src, helpers.bot(bots.pass) + "You may not register guest names!");
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Player] <b><font color='" + color + "'>" + name + "</font></b> tried to register a guest name.");
            return;
        }
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Player] <b><font color='" + color + "'>" + name + "</font></b> registered.");
    },

    stopBattles: false,

    beforeChallengeIssued: function (src, trgt, clauses, rated, mode, team, team2) {
        /**
            ------------
            Stop Battles
            ------------
        **/
        if (stopBattles) {
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
    },

    afterChallengeIssued: function (src, trgt, clauses, rated, mode) {
        if (clauses === 0) {
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has challenged <b><font color='" + helpers.color(trgt) +
            "'>" + sys.name(trgt) + "</font></b> without any clauses.");
        } else {
            var list = helpers.listOfClauses(clauses);
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has challenged <b><font color='" + helpers.color(trgt) +
            "'>" + sys.name(trgt) + "</font></b> with the clauses " + (typeof(list) == "string" ? list : list.join(", ")) + ".");
        }
    },

    beforeFindBattle: function (src, team) {
        /**
            ------------
            Stop Battles
            ------------
        **/
        if (stopBattles) {
            sys.sendMessage(src, helpers.bot(bots.main) + "The server is going to restart soon! You can't battle now!");
            sys.stopEvent();
            return;
        }
    },

    afterFindBattle: function (src, team) {
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> has used the Find Battle button.");
    },

    beforeBattleMatchup: function (src, trgt, clauses, rated, mode, team, team2) {
    },

    afterBattleMatchup: function (src, trgt, clauses, rated, mode) {
    },

    battleSetup: function (src, trgt, battle) {
    },

    // randomises the specified Pokemon in a player's team for Fundex Random
    funrand: function (src, team, slot) {
        var poke = sys.rand(1000, 1146), ability = sys.rand(0, 167), nature = sys.rand(0, 15), item = sys.rand(0, 330);

        if (ability > 164) { // Web Browser and Snow Slide
            ability += 68;
        }

        sys.changePokeNum(src, team, slot, poke);
        sys.changePokeName(src, team, slot, sys.pokemon(poke));
        sys.changePokeAbility(src, team, slot, ability);
        sys.changePokeNature(src, team, slot, nature);
        sys.changePokeItem(src, team, slot, item);

        for (var moveSlot = 0; moveSlot < 4; moveSlot++) {
            move = sys.rand(1, 682);

            if (move > 559) { // Fundex moves
                move += 440;
            }

            sys.changePokeMove(src, team, slot, moveSlot, move);

            if (move == 216) {
                sys.changePokeHappiness(src, team, slot, 255);
            } else if (move == 218) {
                sys.changePokeHappiness(src, team, slot, 0);
            }
        }

        for (var stat = 0; stat < 6; stat++) {
            sys.changeTeamPokeDV(src, team, slot, stat, 31);
            sys.changeTeamPokeEV(src, team, slot, stat, 84);
        }
    },

    beforeBattleStarted: function (src, trgt, clauses, rated, mode, battle, team, team2) {
        if (sys.tier(src, team) == "Fundex Random" && sys.tier(trgt, team2) == "Fundex Random") {
            for (var slot = 0; slot < 6; slot++) {
                this.funrand(src, team, slot);
                this.funrand(trgt, team2, slot);
            }
        }

        if (sys.tier(src, team) == "1v1 Fundex Random" && sys.tier(trgt, team2) == "1v1 Fundex Random") {
            this.funrand(src, team, 0);
            this.funrand(trgt, team2, 0);
        }
    },

    // returns short version of given date
    shortdate: function (d) {
        var f = "yyyy-MM-ddThh:mm:ss", y = d.getFullYear(), m = d.getMonth() + 1, hours = d.getHours(), minutes = d.getMinutes(), seconds = d.getSeconds();
        d = d.getDate();
        function z(s) {
            s = '' + s;
            return s.length > 1 ? s : '0' + s;
        }
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
    },

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
            sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Battle] A battle has started between <b><font color='" + helpers.color(src) + "'>" + sys.name(src) +
            "</font></b> and <b><font color='" + helpers.color(trgt) + "'>" + sys.name(trgt) + "</font></b>.");
        }
    },

    attemptToSpectateBattle: function (src, battler1, battler2) {
    },

    beforeSpectateBattle: function (src, battler1, battler2) {
    },

    afterSpectateBattle: function (src, battler1, battler2) {
        sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(src) + "'>" + sys.name(src) + "</font></b> is spectating the battle between " +
        "<b><font color='" + helpers.color(battler1) + "'>" + sys.name(battler1) + "</font></b> and <b><font color='" + helpers.color(battler2) + "'>" + sys.name(battler2) + "</font></b>.");
    },

    beforeBattleEnded: function (winner, loser, result, battle) {
    },

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
                    tour[0].tourbattlers.splice(tourloser, 1);
                    tour[0].tourbattlers.splice(tourwinner, 1);
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
                sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(winner) + "'>" + winnername +
                "</font></b> has tied against <b><font color='" + helpers.color(loser) + "'>" + losername + "</font></b>.");
            } else if (result == "forfeit") {
                sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(loser) + "'>" + losername +
                "</font></b> has forfeited against <b><font color='" + helpers.color(winner) + "'>" + winnername + "</font></b>.");
            } else {
                sys.sendHtmlWatch(helpers.bot(bots.spy) + "[Battle] <b><font color='" + helpers.color(winner) + "'>" + winnername +
                "</font></b> has beaten <b><font color='" + helpers.color(loser) + "'>" + losername + "</font></b>.");
            }
        }
    }
});
