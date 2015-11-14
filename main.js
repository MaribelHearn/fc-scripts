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
	SCRIPT_URL = "https://dl.dropboxusercontent.com/u/35166330/scripts/";
	AUTH_NAME = ["User", "Moderator", "Administrator", "Owner"];
	PARTY_MODES = ["joke", "nightclub", "desu", "rainbow", "nyan", "dennis", "cirno", "sparta", "luigi", "roflcopter", "derp", "asdf", "leet", "morse", "reverse"];
	LEGENDARY_LIST = ["Articuno", "Zapdos", "Moltres", "Mewtwo", "Mew", "Raikou", "Entei", "Suicune", "Ho-Oh", "Lugia", "Celebi", "Kyogre", "Groudon", "Rayquaza", "Latios",
	"Latias", "Regirock", "Regice", "Registeel", "Jirachi", "Deoxys", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Giratina", "Heatran", "Regigigas", "Cresselia", "Darkrai",
	"Manaphy", "Shaymin", "Arceus", "Victini", "Cobalion", "Terrakion", "Virizion", "Tornadus", "Thundurus", "Landorus", "Reshiram", "Zekrom", "Kyurem", "Meloetta", "Genesect",
	"Xerneas", "Yveltal", "Zygarde"];
	ROULETTE_EVENTS = ["frenzy", "chainfest", "type", "legendary"];
	BORDER = "<font color='darkblue'><b>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>></b></font>";
	BORDER2 = "<font color='darkblue'><b>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;" +
	"&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</b></font>";
	NUMBER_OF_POKEMON = 721;
	REACTIVATE_REGISTER_BUTTON = 14;
	ROULETTE_WAIT_MIN = 90;
	ROULETTE_WAIT_MAX = 271;
	ROULETTE_EVENT_MIN = 66;
	ROULETTE_EVENT_MAX = 135;
	ROULETTE_FEST_MIN = 22;
	ROULETTE_FEST_MAX = 45;
	FAKEI = /\u00A1/;
	LAGCHAR = /\u0E4F/;
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
	RULE1 = "Rule 1: No spamming (including challenge spamming), trolling, flaming, bashing or advertising.<br>";
	EXPL1 = "These things cause disorder in the chat. You can get kicked, muted or banned depending on how severely you are breaking this rule.<br>";
	RULE2 = "Rule 2: No abusing commands or auth powers.<br>";
	EXPL2 = "This should make sense without any explanation. Commands exist to be used for what they are meant for, not for mistakes to be exploited. The same goes for auths; do what you should do and not beyond that.<br>";
	RULE3 = "Rule 3: Don't talk about inappropriate or obscene subjects, nor mention words that refer to such.<br>";
	EXPL3 = "Anything inappropriate or obscene will result in a mute, or ban after multiple occasions.<br>";
	RULE4 = "Rule 4: No asking for auth.<br>";
	EXPL4 = "You may get auth when recognized for coming on a lot, chat activity, good behaviour and maybe even contribution. Asking for it will not get you any further.<br>";
	RULE5 = "Rule 5: Do not attempt to circumvent the rules.<br>";
	EXPL5 = "Taking the rules too literally is no use when you know you are supposed to be punished anyway. Don't try to find loopholes in the rules, it will result in even more punishment.<br>";
    SCRIPT_MODULES = sys.filesForDirectory("scripts");
	/**
		------------
		Load Modules
		------------
	**/
	if (typeof(moduleLoaded) == "undefined") {
		moduleLoaded = {};
	}
	for (var i in SCRIPT_MODULES) {
		fileName = SCRIPT_MODULES[i].split('.')[0];
		if (fileName != "main") {
			if (!moduleLoaded[fileName]) {
				print("Loaded module " + SCRIPT_MODULES[i]);
				sys.exec("scripts/" + SCRIPT_MODULES[i]);
				moduleLoaded[fileName] = true;
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
	API = sys.read("data/API_KEY.txt");
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
	sys.getDbIndex = function (pokeId) {
		var id = pokeId % 65536;
		var forme = (pokeId - id) / 65536;
		return id + ':' + forme;
	};
	sys.height = function (pokeId) {
		heightList = {};
		var data = sys.getFileContent("db/pokes/height.txt").split('\n');
		for (var i = 0; i < data.length; i++) {
			var index = data[i].indexOf(" ");
			var id = data[i].substr(0, index);
			var height = data[i].substr(index + 1);
			heightList[id] = height;
		}
		var key = sys.getDbIndex(pokeId);
		if (heightList[key] !== undefined) {
			return heightList[key];
		}
		var index = key.indexOf(':') + 1;
		var base = key.substr(0, index);
		return heightList[base + "0"];
	};
	sys.weight = function (pokeId) {
		weightList = {};
		var data = sys.getFileContent("db/pokes/weight.txt").split('\n');
		for (var i = 0; i < data.length; i++) {
			var index = data[i].indexOf(" ");
			var id = data[i].substr(0, index);
			var weight = data[i].substr(index + 1);
			weightList[id] = weight;
		}
		var key = sys.getDbIndex(pokeId);
		if (weightList[key] !== undefined) {
			return weightList[key];
		}
		var index = key.indexOf(':') + 1;
		var base = key.substr(0, index);
		return weightList[base + "0"];
	};
	sys.weightPower = function (weight) {
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
		} else if (weight >= 200) {
			power = 120;
		}
		return power;
	};
	sys.calcStat = function (base, IV, EV, level, nature) {
		var stat = Math.floor(Math.floor((IV + (2 * base) + Math.floor(EV / 4)) * level / 100 + 5) * nature);
		return stat;
	};
	sys.calcHP = function (base, IV, EV, level) {
		if (base == 1) {
			return 1;
		}
		var HP = Math.floor((IV + (2 * base) + Math.floor(EV / 4) + 100) * level / 100 + 10);
		return HP;
	};
	sys.calcDamage = function (attack, defense, power, modifier) {
		// assumes the attacking Pokémon is level 100
		var damage = Math.floor((0.84 * (attack / defense) * power + 2) * modifier);
		return [Math.floor(damage * 0.85), damage];
	};
	sys.printStackTrace = function (message) {
		try {
			var table = "<style type='text/css'>table {border-width: 1px; border-style: solid; border-color: #000;}</style>" +
			"<table cellpadding=2 cellspacing=0><tr style='background-color: #b0b0b0;'><th>File</th><th>At line</th><th>Variables</th>";
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
	// Boolean
	helpers.setvariable("tor", false);
	helpers.setvariable("stopbattles", false);
	helpers.setvariable("megabancheck", false);
	helpers.setvariable("gigabancheck", false);
	helpers.setvariable("serverStarting", false);
	
	// Number
	timer = 0;
	partynyan = 0;
	rouletteStep = 0;
	rouletteTime = sys.rand(ROULETTE_WAIT_MIN, ROULETTE_WAIT_MAX);
	
	// String
	rouletteEvent = "";
	helpers.setvariable("layout", "new");
    helpers.setvariable("hostIp", "");
    helpers.setvariable("hostCountry", "");
    helpers.setvariable("hostCity", "");
    helpers.setvariable("hostTimeZone", "");
	
	// Array
	helpers.setvariable("players", []);
	helpers.setvariable("floodplayers", []);
	
	// Object
	helpers.setvariable("tour", {});
	helpers.setvariable("battles", {});
	helpers.setvariable("battlesf", {});
	
	// Boolean from data file
	helpers.setvariable("open", sys.read("data/open.txt") == "true" ? true : false);
	
	// Number from data file
	helpers.setvariable("allowance", parseInt(sys.read("data/allowance.txt")));
	helpers.setvariable("floodtime", parseInt(sys.read("data/floodtime.txt")));
	helpers.setvariable("floodlevel", parseInt(sys.read("data/floodlevel.txt")));
	helpers.setvariable("maxplayers", parseInt(sys.read("data/maxplayers.txt")));
	
	// String from data file
	helpers.setvariable("botcolor", sys.read("data/botcolor.txt"));
	helpers.setvariable("partymode", sys.read("data/partymode.txt"));
	helpers.setvariable("botsymbol", sys.read("data/botsymbol.txt"));
	helpers.setvariable("servertopic", sys.read("data/servertopic.txt"));
	helpers.setvariable("botsymbolcolor", sys.read("data/botsymbolcolor.txt"));
	
	// Array from data file
	allowed = JSON.parse(sys.read("data/allowed.txt"));
	cmdcolors = JSON.parse(sys.read("data/cmdcolors.txt"));
	exceptions = JSON.parse(sys.read("data/exceptions.txt"));
	permchannels = JSON.parse(sys.read("data/permchannels.txt"));
	allowedrange = JSON.parse(sys.read("data/allowedrange.txt"));
	namestounban = JSON.parse(sys.read("data/namestounban.txt"));
	silentcommands = JSON.parse(sys.read("data/silentcmds.txt"));
	nameblocklist = JSON.parse(sys.read("data/nameblocklist.txt"));
	proxylist = sys.read("data/proxylist.txt").split('\n');
	blocklist = sys.read("data/bansites.txt").replace(/\r/g, "").split('\n');
	
	// Object from data file
	rr = JSON.parse(sys.read("data/rr.txt"));
	bots = JSON.parse(sys.read("data/bots.txt"));
	iplist = JSON.parse(sys.read("data/iplist.txt"));
	banlist = JSON.parse(sys.read("data/banlist.txt"));
	roulette = JSON.parse(sys.read("data/roulette.txt"));
	mutelist = JSON.parse(sys.read("data/mutelist.txt"));
	bigtexts = JSON.parse(sys.read("data/bigtexts.txt"));
	timezone = JSON.parse(sys.read("data/timezone.txt"));
	cityname = JSON.parse(sys.read("data/cityname.txt"));
	versions = JSON.parse(sys.read("data/versions.txt"));
	members = JSON.parse(sys.read("data/memberlist.txt"));
	banmessages = JSON.parse(sys.read("data/banmsg.txt"));
	operatingsystem = JSON.parse(sys.read("data/os.txt"));
	kickmessages = JSON.parse(sys.read("data/kickmsg.txt"));
	mutemessages = JSON.parse(sys.read("data/mutemsg.txt"));
	authtitles = JSON.parse(sys.read("data/authtitles.txt"));
	regchannels = JSON.parse(sys.read("data/regchannels.txt"));
	megabanlist = JSON.parse(sys.read("data/megabanlist.txt"));
	gigabanlist = JSON.parse(sys.read("data/gigabanlist.txt"));
	countryname = JSON.parse(sys.read("data/countryname.txt"));
	rangebanlist = JSON.parse(sys.read("data/rangebanlist.txt"));
	selfkickmessages = JSON.parse(sys.read("data/selfkickmsg.txt"));
	rangebanmessages = JSON.parse(sys.read("data/rangebanmsg.txt"));
	
	// Special
	tour[0] = {};
	tour[0].tourmode = 0;
	allcommands = helpers.allCommands();
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
		sys.setTimer(function () {
			sys.createChannel(permchannels[0]);
		}, 500, 0);
		sys.setTimer(function () {
			sys.createChannel(permchannels[1]);
		}, 1000, 0);
		sys.setTimer(function () {
			sys.createChannel(permchannels[2]);
		}, 1500, 0);
		sys.setTimer(function () {
			sys.createChannel(permchannels[3]);
		}, 2000, 0);
		sys.setTimer(function () {
			sys.createChannel(permchannels[4]);
		}, 2500, 0);
		sys.setTimer(function () {
			sys.createChannel(permchannels[5]);
		}, 3000, 0);
		sys.setTimer(function () {
			watch = sys.channelId(permchannels[0]);
			authchannel = sys.channelId(permchannels[1]);
			ownerchannel = sys.channelId(permchannels[2]);
			partychannel = sys.channelId(permchannels[3]);
			rrchannel = sys.channelId(permchannels[4]);
			roulettechannel = sys.channelId(permchannels[5]);
			print("The default channels have been created.");
            serverStarting = false;
		}, 3500, 0);
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
            if (API !== "") {
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
				sys.write("data/countryname.txt", JSON.stringify(countryname));
				delete cityname[index];
				sys.write("data/cityname.txt", JSON.stringify(cityname));
				delete timezone[index];
				sys.write("data/timezone.txt", JSON.stringify(timezone));
				delete operatingsystem[index];
				sys.write("data/os.txt", JSON.stringify(operatingsystem));
				delete versions[index];
				sys.write("data/versions.txt", JSON.stringify(versions));
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
				sys.write("data/banlist.txt", JSON.stringify(banlist));
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
				sys.write("data/mutelist.txt", JSON.stringify(mutelist));
			}
		}
		/**
			---------------
			Roulette Events
			---------------
		**/
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
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + color + "'>" + name + "</b> tried to enter during server setup.");
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
				sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + color + "'>" + name + "</b> tried to enter the server using a proxy.");
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
					sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Banned user <b style='color:" + color + "'>" + name + "</b> tried to enter the server.");
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
					sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Range banned user <b style='color:" + color + "'>" + name + "</b> tried to enter the server.");
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
				sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + color + "'>" + name + "</b> tried to enter the server during closure.");
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
				sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + color + "'>" + name + "</b> tried to enter the server with a banned word in their username.");
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
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + color + "'>" + name +
			"</b> tried to enter the server with " + helpers.bannedchars(name)[1] + " in their username.");
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
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Giga banned user <b style='color:" + color + "'>" + name + "</b> tried to enter the server.");
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
			sys.write("data/namestounban.txt", JSON.stringify(namestounban));
		} else {
			if (sys.isMegaBanned(cookie)) {
				sys.sendMessage(src, "You are banned!");
				sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] Mega banned user <b style='color:" + color + "'>" + name + "</b> tried to enter the server.");
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
			authtitles[lower] = AUTH_NAME[auth];
		}
		members[name.toLowerCase()] = name;
		sys.write("data/memberlist.txt", JSON.stringify(members));
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
		sys.write("data/iplist.txt", JSON.stringify(iplist));
		/**
			-----------
			Max Players
			-----------
		**/
		if (sys.numPlayers() > maxplayers) {
			maxplayers++;
			sys.write("data/maxplayers.txt", maxplayers);
		}
		/**
			--------------
			Entry Messages
			--------------
		**/
		sys.sendMessage(src, "Welcome Message: The server has been up for " + helpers.formatUptime(uptime));
		sys.sendMessage(src, "Welcome Message: The current number of players online is " + (eval(sys.numPlayers())) + " out of a record maximum of " + maxplayers + ".");
		sys.sendHtmlMessage(src, "<span style='color: #0000FF;'><timestamp/><b>Welcome Message:</b></span> Type /commands in the chat window, <a href='po:send//commands'>or click here</a>, to view a list of commands. " +
		"Type /rules, <a href='po:send//rules'>or click here</a>, for our server rules. You are supposed to know them, so you should read them!");
		/**
			---------------
			Welcome Message
			---------------
		**/
		authtitle = (authtitles[lower] ? authtitles[lower] : AUTH_NAME[auth]);
		if (auth === 0 || auth >= 4) {
			authtitle = "";
		}
		if (layout == "new") {
			if (servername == "Fun Community") {
				sys.sendHtmlMain(helpers.bot(bots.welcome) + "Please welcome " + authtitle + " " + name + " to the " + servername + "!");
			} else {
				sys.sendHtmlMain(helpers.bot(bots.welcome) + "Please welcome " + authtitle + " " + name + " to " + servername + "!");
			}
		} else {
			if (auth > 0) {
				sys.sendHtmlMain("<timestamp/><b>~Please Welcome " + AUTH_NAME[auth] + " " + helpers.rainbow(name) + "~</b>");
			} else {
				sys.sendHtmlMain("<timestamp/><b>~Please Welcome " + helpers.rainbow(name) + "~</b>");
			}
		}
		/**
			-----------------------------------
			Operating System and Client Version
			-----------------------------------
		**/
		operatingsystem[lower] = helpers.os(os);
		sys.write("data/os.txt", JSON.stringify(operatingsystem));
		os = operatingsystem[lower];
		versions[lower] = helpers.version(version);
		sys.write("data/versions.txt", JSON.stringify(versions));
		version = versions[lower];
		/**
			---------------------
			Time Zone and Country
			---------------------
		**/
        if (API !== "") {
            sys.webCall(helpers.countryRetrievalUrl(ip), function (resp) {
                resp = JSON.parse(resp);
                timezone[lower] = helpers.timezonedata(resp.countryName, resp.timeZone);
                countryname[lower] = helpers.countrydata(resp.countryName);
                cityname[lower] = helpers.citydata(resp.cityName);
                sys.write("data/timezone.txt", JSON.stringify(timezone));
                sys.write("data/countryname.txt", JSON.stringify(countryname));
                sys.write("data/cityname.txt", JSON.stringify(cityname));
                country = helpers.toFlagKey(helpers.removespaces(countryname[lower].toUpperCase()));
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + color + "'>" + name + "</b> is using " + os + (version === "" ? "" : ", " + version) + ".");
                sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + color + "'>" + name + "</b> is from " + FLAGS[country] + " " + countryname[lower] + ".");
                if (helpers.isGuest(name) && sys.os(src) != "android") {
                    sys.sendHtmlAuths(helpers.bot(bots.welcome) + "This person is using a guest name, but isn't actually on " + helpers.os("android") + ". Keep an eye on them!");
                }
                for (var index in banlist) {
                    if (sys.dbIp(index)) {
                        if (range == sys.dbRange(index) && !helpers.isauthip(ip) && !helpers.isInArray(ip, allowed) && !helpers.isInArray(range, allowedrange)) {
                            sys.sendHtmlAuths(helpers.bot(bots.welcome) + "This person might be ban evading, as an IP on the banlist is in their range (" + range + "). Keep an eye on them!");
                        }
                    }
                }
            });
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
		sys.sendHtmlMessage(src, "<b style='color:red'>Server Topic:</b> " + servertopic, channel);
		if (regchannels[lower]) {
			sys.sendHtmlMessage(src, "<b style='color:orange'>Channel Topic:</b> " + regchannels[lower].topic.join(TOPIC_DELIMITER), channel);
		} else {
			sys.sendHtmlMessage(src, "<b style='color:orange'>Channel Topic:</b> Welcome to " + channelname + "!", channel);
		}
		if (channel == partychannel && partymode == "nightclub") {
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> has joined the channel <a href=\"po:join/" + sys.channel(channel) +
			"\">#" + sys.channel(channel) + "</a>.");
			return;
		}
		/**
			---------------
			Welcome Message
			---------------
		**/
		var cauth = helpers.cauthname(name.toLowerCase(), channel);
		if (layout == "new") {
			if (channel > 0) {
				sys.sendHtmlAll(helpers.bot(bots.channel) + "Please welcome " + cauth + " "	+ name + " to " + channelname + "!", channel);
			}
		} else {
			if (channel > 0) {
				sys.sendHtmlAll("<timestamp/><b>~Please Welcome " + helpers.rainbow(name) + " to " + channelname + "~</b>", channel);
			}
		}
		sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> has joined the channel <a href=\"po:join/" + sys.channel(channel) +
		"\">#" + sys.channel(channel) + "</a>.");
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
		var cauth = helpers.cauthname(players[src].name.toLowerCase(), channel), channelname = sys.channel(channel), cookie = sys.cookie(src) ? sys.cookie(src) : "none", id = sys.uniqueId(src) ? sys.uniqueId(src).id : "none";
		if (channel == partychannel && partymode == "nightclub") {
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> has left the channel <a href=\"po:join/" + sys.channel(channel) +
			"\">#" + sys.channel(channel) + "</a>.");
			return;
		}
		if (cookie == "banned" || cookie.substr(0, 6) === "banned") {
			megabancheck = false;
		} else if (sys.isGigaBanned(id)) {
			gigabancheck = false;
		} else {
			if (layout == "new") {
				if (channel > 0) {
					sys.sendHtmlAll(helpers.bot(bots.channel) + cauth + " " + sys.name(src) + " has left " + channelname + "!", channel);
				}
			} else {
				if (channel > 0) {
					sys.sendHtmlAll("<timestamp/><b>~" + helpers.rainbow(name) + " has left " + channelname + "~</b>", channel);
				}
			}
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> has left the channel <a href=\"po:join/" + channelname + "\">#" + channelname + "</a>.");
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
		if (auth >= 1 && auth <= 3) {
			if (authtitles[lower] === undefined) {
				authtitles[lower] = AUTH_NAME[sys.auth(src)];
			}
			authtitle = authtitles[lower];
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
				if (servername == "Fun Community") {
					sys.sendHtmlMain(helpers.bot(bots.welcome) + authtitle + " " + name + " has left the " + servername + "!");
				} else {
					sys.sendHtmlMain(helpers.bot(bots.welcome) + authtitle + " " + name + " has left " + servername + "!");
				}
			} else {
				if (servername == "Fun Community") {
					sys.sendHtmlMain("<timestamp/><b>~" + helpers.rainbow(name) + " has left the " + servername + "~</b>");
				} else {
					sys.sendHtmlMain("<timestamp/><b>~" + helpers.rainbow(name) + " has left " + servername + "~</b>");
				}
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
		if (players[src]) {
			delete players[src];
		}
	}

	,

	beforeChangeTeam: function (src, team) {
		/**
			-----------
			Moody Check
			-----------
		**/
		var i = 0, moody = 141;
		while (i < 6) {
			if (sys.teamPokeAbility(src, team, i) == moody) {
				helpers.starfox(src, 0, undefined, bots.tour, "Error 403, you may not use the Moody ability!", team);
				sys.changeTier(src, team, "Challenge Cup");
				break;
			}
			i++;
		}
	}

	,

	afterChangeTeam: function (src, team) {
		var name = sys.name(src), ip = sys.ip(src), color = helpers.color(src), lower = sys.name(src).toLowerCase();
		/**
			-----------------------
			Player Variable Setting
			-----------------------
		**/
		members[name.toLowerCase()] = name;
		sys.write("data/memberlist.txt", JSON.stringify(members));
		sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b style='color:" + players[src].color + "'>" + players[src].name + "</b> changed their team, and their name to <b style='color:" + color +
		"'>" + name + "</b>.");
		players[src].name = name;
		players[src].color = color;
		/**
			-----------------------------------
			Operating System and Client Version
			-----------------------------------
		**/
		operatingsystem[lower] = helpers.os(sys.os(src));
		sys.write("data/os.txt", JSON.stringify(operatingsystem));
		versions[lower] = helpers.version(sys.version(src));
		sys.write("data/versions.txt", JSON.stringify(versions));
		/**
			---------------------
			Time Zone and Country
			---------------------
		**/
        if (API !== "") {
            sys.webCall(helpers.countryRetrievalUrl(ip), function (resp) {
                resp = JSON.parse(resp);
                timezone[lower] = helpers.timezonedata(resp.countryName, resp.timeZone);
                countryname[lower] = helpers.countrydata(resp.countryName);
                cityname[lower] = helpers.citydata(resp.cityName);
                sys.write("data/timezone.txt", JSON.stringify(timezone));
                sys.write("data/countryname.txt", JSON.stringify(countryname));
                sys.write("data/cityname.txt", JSON.stringify(cityname));
            });
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
		var i = 0, moody = 141;
		while (i < 6) {
			if (sys.teamPokeAbility(src, team, i) == moody) {
				helpers.starfox(src, 0, undefined, bots.tour, "Error 403, you may not use the Moody ability!", team);
				sys.changeTier(src, team, "Challenge Cup");
				sys.stopEvent();
				break;
			}
			i++;
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
		sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> has changed team " + team + " from the " + oldtier +
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
		sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Server] <b style='color:" + helpers.color(creator) + "'>" + sys.name(creator) +
		"</b> has created the channel <a href='po:join/" + sys.channel(channel) + "'>#" + sys.channel(channel) + "</a>.");
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
		if (regchannels[sys.channel(channel).toLowerCase()]) {
			if (!regchannels[sys.channel(channel).toLowerCase()].priv && !helpers.isInString(message, silentcommands)) {
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
		if (regchannels[sys.channel(channel).toLowerCase()]) {
			if (!regchannels[sys.channel(channel).toLowerCase()].priv) {
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
		if (regchannels[sys.channel(channel).toLowerCase()]) {
			if (!regchannels[sys.channel(channel).toLowerCase()].priv && !helpers.isInString(message, silentcommands)) {
				players[src].lastmessage = message;
				players[src].lastmessagetime = new Date();
			}
		}
		/**
			-----
			Party
			-----
		**/
		if (channel == partychannel && partymode != "none" && (message.charAt(0) + message.charAt(1) + message.charAt(2) + message.charAt(3) + message.charAt(4)) != "/mode") {
			sys.stopEvent();
			helpers.mode(src, message, channel, partymode);
			return;
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
		if (helpers.cmuteCheck(players[src].name, sys.channel(channel).toLowerCase()) && auth < 3) {
			sys.stopEvent();
			sys.sendHtmlMessage(src, helpers.bot(bots.channel) + "Sorry, you are muted on this channel.", channel);
			return;
		}
		/**
			-------------
			Silence Check
			-------------
		**/
		if (regchannels[sys.channel(channel).toLowerCase()]) {
			if (regchannels[sys.channel(channel).toLowerCase()].silence > auth) {
				sys.stopEvent();
				helpers.starfox(src, channel, [], bots.silence, "I KILL YOOOOUUUU!!!");
				return;
			}
		}
		/**
			---------------------
			Watch Channel Logging
			---------------------
		**/
		if (regchannels[sys.channel(channel).toLowerCase()]) {
			if (!regchannels[sys.channel(channel).toLowerCase()].priv) {
				sys.sendHtmlAuth(helpers.bot(bots.spy) + "[<a href=\"po:join/" + sys.channel(channel) + "\">#" + sys.channel(channel) +
				"</a>] <b style='color:" + color + "'>" + helpers.escapehtml(name) + ":</b> " + helpers.escapehtml(message));
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
			} else if (lower == "memdump") {
				print(sys.memoryDump());
			} else if (lower == "commands") {
				print("");
				print("/eval <code>: executes <code> and prints its runtime.");
				print("/print <text>: prints <text> to standard output.");
				print("/var <variable>: prints the value of <variable>.");
				print("/memdump: prints a memory dump.");
				print("");
			} else {
				print("Error 404, command '" + lower + "' not found. Use /commands to show the list of commands.");
			}
			return;
		}
		sys.sendHtmlMain("<span style='color:orange'><timestamp/><b>~~Server~~:</b></span> " + message);
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
		sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> is " + (away ? "idling" : "back") + ".");
	}

	,
	
	beforePlayerRegister: function (src) {
		var name = sys.name(src), color = helpers.color(src);
		if (helpers.isGuest(name)) {
			sys.stopEvent();
			sys.sendMessage(src, helpers.bot(bots.pass) + "You may not register guest names!");
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b style='color:" + color + "'>" + name + "</b> tried to register a guest name.");
			return;
		}
		sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Player] <b style='color:" + color + "'>" + name + "</b> registered.");
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
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> has challenged <b style='color:" + helpers.color(trgt) +
			"'>" + sys.name(trgt) + "</b> without any clauses.");
		} else {
			var list = helpers.listOfClauses(clauses);
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> has challenged <b style='color:" + helpers.color(trgt) +
			"'>" + sys.name(trgt) + "</b> with the clauses " + (typeof(list) == "string" ? list : list.join(", ")) + ".");
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
		sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> has used the Find Battle button.");
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
		battles[battle].tier = sys.tier(src, team) == sys.tier(trgt, team2) ? sys.tier(src, team) : "none";
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
			sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] A battle has started between <b style='color:" + helpers.color(src) + "'>" + sys.name(src) +
			"</b> and <b style='color:" + helpers.color(trgt) + "'>" + sys.name(trgt) + "</b>.");
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
		sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b style='color:" + helpers.color(src) + "'>" + sys.name(src) + "</b> is spectating the battle between " +
		"<b style='color:" + helpers.color(battler1) + "'>" + sys.name(battler1) + "</b> and <b style='color:" + helpers.color(battler2) + "'>" + sys.name(battler2) + "</b>.");
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
				sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b style='color:" + helpers.color(winner) + "'>" + winnername +
				"</b> has tied against <b style='color:" + helpers.color(loser) + "'>" + losername + "</b>.");
			} else if (result == "forfeit") {
				sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b style='color:" + helpers.color(loser) + "'>" + losername +
				"</b> has forfeited against <b style='color:" + helpers.color(winner) + "'>" + winnername + "</b>.");
			} else {
				sys.sendHtmlAuth(helpers.bot(bots.spy) + "[Battle] <b style='color:" + helpers.color(winner) + "'>" + winnername +
				"</b> has beaten <b style='color:" + helpers.color(loser) + "'>" + losername  + "</b>.");
			}
		}
	}
});
