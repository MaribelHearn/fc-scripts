/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
/*
    ----------------------------------------------
    FUN COMMUNITY OWNER COMMANDS ownercmds.js
     - by Maribel Hearn, 2012-2020

    This file contains commands that can be
    run by owners.
    ----------------------------------------------
*/

ownercommands = {
    ownercommands: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands</h2>"
        + "<br>"
        + "<b>" + helpers.userl("/authsettings") + "</b>: displays auth settings.<br>"
        + "<b>" + helpers.userl("/filesettings") + "</b>: displays file system options.<br>"
        + "<b>" + helpers.userl("/scriptsettings") + "</b>: displays script options.<br>"
        + "<b>" + helpers.userl("/whitelistsettings") + "</b>: displays whitelist settings.<br>"
        + "<b>" + helpers.userl("/antidossettings") + "</b>: displays anti DoS settings.<br>"
        + "<b>" + helpers.userl("/serversettings") + "</b>: displays server settings.<br>"
        + "<b>" + helpers.userl("/silentsettings") + "</b>: displays silent settings.<br>"
        + "<b>" + helpers.userl("/channelsettings") + "</b>: displays channel settings.<br>"
        + "<b>" + helpers.userl("/miscellaneous") + "</b>: displays other commands.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    /**
        -------------
        Auth Settings
        -------------
    **/
    authsettings: function (src, channel, command) {
        var DISPLAY_USER = true, commandsmessage = border + "<h2>Owner Commands ~ Auth Settings</h2><br>";
        var auths = sys.dbAuths().sort(), authLevels = [], titles = [], names = [], lastLogins = [], index = 0, lower;
        for (var i in auths) {
            authLevels.push(sys.dbAuth(auths[i]));
            names.push(auths[i]);
            lower = names[index].toLowerCase();
            titles.push(authtitles[lower] ? authtitles[lower] : '-');
            lastLogins.push(helpers.formatLastOn(src, sys.dbLastOn(auths[i])));
            if (members[lower]) {
                names[index] = members[lower];
            }
            index++;
        }
        if (helpers.isAndroid(src)) {
            commandsmessage += "<tt>";
            for (var i in auths) {
                commandsmessage += names[i] + ": " + authLevels[i] + "<br>";
            }
            commandsmessage += "</tt>";
        } else {
            commandsmessage += "<style>table {border-width: 1px; border-style: solid; border-color: #000000;}</style>"
            + "<table cellpadding='2' cellspacing='0'><thead><tr style='background-color: #B0B0B0;'>"
            + "<th>Icon</th><th>Auth</th><th>Level</th><th>Title</th><th>Name</th><th>Last Online</th></tr></thead><tbody>";
            for (var i in auths) {
                commandsmessage += "<tr>"
                + "<td>" + helpers.authimage(src, authLevels[i] >= 4 ? 0 : authLevels[i]) + "</td>"
                + "<td>" + helpers.authName(authLevels[i], DISPLAY_USER) + "</td>"
                + "<td>" + authLevels[i] + "</td>"
                + "<td>" + titles[i] + "</td>"
                + "<td>" + names[i] + "</td>"
                + "<td>" + lastLogins[i] + "</td>"
                + "</tr>";
            }
            commandsmessage += "</tbody><tfoot><tr><td colspan='6'><b>Total Auth Members:</b> " + auths.length + "</td></tr></tfoot></table><br><br>";
        }
        commandsmessage += "Use <b>" + helpers.user("/user ") + helpers.arg("player") + "</b> to change <b>player</b>'s auth level to user.<br>"
        + "Use <b>" + helpers.user("/moderator ") + helpers.arg("player") + "</b> to change <b>player</b>'s auth level to moderator. Also /mod.<br>"
        + "Use <b>" + helpers.user("/administrator ") + helpers.arg("player") + "</b> to change <b>player</b>'s auth level to administrator. Also /admin.<br>"
        + "Use <b>" + helpers.user("/owner ") + helpers.arg("player") + "</b> to change <b>player</b>'s auth level to owner.<br>"
        + "Use <b>" + helpers.user("/invisibleowner ") + helpers.arg("player") + helpers.arg2("*placement") + "</b> to change <b>player</b>'s auth level to owner (invisible), "
        + "placed together with auth level <b>placement</b> on the player list, placement being a number from 1 to 9. Also /invisible or /invis.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    user: function (src, channel, command) {
        var name = sys.name(src), trgtauth;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1];
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't user " + trgtname + " because they don't exist in the database.");
            return;
        }
        var trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth === 0) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change a user's auth to user.");
            return;
        }
        trgt ? sys.changeAuth(trgt, 0) : sys.changeDbAuth(trgtname, 0);
        sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2(AUTH_NAMES[0]) + " by " + helpers.user(name) + "!</font></b>");
    }

    ,

    moderator: function (src, channel, command) {
        var name = sys.name(src), ttrgtauth, newauth = 1;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1];
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't moderator " + trgtname + " because they don't exist in the database.");
            return;
        }
        if (!sys.dbRegistered(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not moderator " + trgtname + " because they haven't registered. Authority must be secure!");
            return;
        }
        var trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth == 1) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change a moderator's auth to moderator.");
            return;
        }
        if (trgt) {
            sys.changeAuth(trgt, 1);
        }
        sys.changeDbAuth(trgtname, 1);
        sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2(AUTH_NAMES[1]) + " by " + helpers.user(name) + "!</font></b>");
    }

    ,

    mod: function (src, channel, command) {
        this.moderator(src, channel, command);
    }

    ,

    administrator: function (src, channel, command) {
        var name = sys.name(src), trgtauth;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1];
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't administrator " + trgtname + " because they don't exist in the database.");
            return;
        }
        if (!sys.dbRegistered(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not administrator " + trgtname + " because they haven't registered. Authority must be secure!");
            return;
        }
        var trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth == 2) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change an administrator's auth to administrator.");
            return;
        }
        if (trgt) {
            sys.changeAuth(trgt, 2);
        }
        sys.changeDbAuth(trgtname, 2);
        sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2(AUTH_NAMES[2]) + " by " + helpers.user(name) + "!</font></b>");
    }

    ,

    admin: function (src, channel, command) {
        this.administrator(src, channel, command);
    }

    ,

    owner: function (src, channel, command) {
        var name = sys.name(src), trgtauth;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1];
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't owner " + trgtname + " because they don't exist in the database.");
            return;
        }
        if (!sys.dbRegistered(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not owner " + trgtname + " because they haven't registered. Authority must be secure!");
            return;
        }
        var trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth == 3) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change an owner's auth to owner.");
            return;
        }
        if (trgt) {
            sys.changeAuth(trgt, 3);
        }
        sys.changeDbAuth(trgtname, 3);
        sys.sendHtmlAll(helpers.bot(bots.auth) + "<b>" + helpers.arg(trgtname) + " has been made " + helpers.arg2(AUTH_NAMES[3]) + " by " + helpers.user(name) + "!</font></b>");
    }

    ,

    invisibleowner: function (src, channel, command) {
        var name = sys.name(src), trgt, trgtname, trgtauth, placement;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.auth, "Error 404, player not found.");
            return;
        }
        trgtname = command[1];
        command[2] ? placement = command[2] : placement = 4;
        if (!sys.dbIp(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't invisible owner " + trgtname + " because they don't exist in the database.");
            return;
        }
        if (!sys.dbRegistered(trgtname)) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, you may not invisible owner " + trgtname + " because they haven't registered. Authority must be secure!");
            return;
        }
        trgt = sys.id(trgtname);
        trgt ? trgtauth = sys.auth(trgt) : trgtauth = sys.dbAuth(trgtname);
        if (trgtauth == placement) {
            helpers.starfox(src, channel, command, bots.auth, "Error 400, you can't change an auth level to the same auth level.");
            return;
        }
        if (isNaN(placement) || placement < 1 || placement > 9) {
            helpers.starfox(src, channel, command, bots.auth, "Error 403, invalid placement.");
            return;
        }
        placement < 4 ? auth = placement * 10 : auth = placement;
        if (trgt) {
            sys.changeAuth(trgt, auth);
        }
        sys.changeDbAuth(trgtname, auth);
        sys.sendHtmlMessage(src, helpers.bot(bots.auth) + "You made " + trgtname + " " + AUTH_NAMES[4] + " (placement " + placement + ").", channel);
    }

    ,

    invisible: function (src, channel, command) {
        this.invisibleowner(src, channel, command);
    }

    ,

    invis: function (src, channel, command) {
        this.invisibleowner(src, channel, command);
    }

    ,

    /**
        ---------------
        File Settings
        ---------------
    **/
    filesettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ File Settings</h2>"
        + "<br>"
        + "The current working directly is <b>" + sys.cwd() + "</b>.<br>"
        + "<br>";
        commandsmessage += "<br>"
        + "<b>" + helpers.user("/ls ") + helpers.arg("directory") + "</b>: shows the contents of <b>directory</b>. Shows the current working directory by default. Also /dir.<br>"
        + "<b>" + helpers.user("/cat ") + helpers.arg("file") + "</b>: shows the contents of <b>file</b>. Also /type.<br>"
        + "<b>" + helpers.user("/rm ") + helpers.arg("file") + "</b>: deletes <b>file</b> from the file system.<br>"
        + "<b>" + helpers.user("/mkdir ") + helpers.arg("directory") + "</b>: creates a new directory called <b>directory</b>. Also /md.<br>"
        + "<b>" + helpers.user("/rmdir ") + helpers.arg("directory") + "</b>: deletes <b>directory</b> if it is empty. Also /rd.<br>"
        + "<b>" + helpers.user("/zip ") + helpers.arg("name") + helpers.arg2("*directory") + "</b>: creates a new archive called <b>name</b> that contains the files of <b>directory</b>.<br>"
        + "<b>" + helpers.user("/unzip ") + helpers.arg("name") + helpers.arg2("*directory") + "</b>: extracts the archive called <b>name</b> to <b>directory</b>. If <b>directory</b> is not specified, extracts to the current working directory.<br>"
        + "<b>" + helpers.user("/exec ") + helpers.arg("command") + "</b>: executes <b>command</b> on the underlying operating system. <u>Be careful with this command!</u> It can break your computer!<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    ls: function (src, channel, command) {
        var dir = command[1], index = 0, message, dirs, files;
        if (!dir) {
            dir = sys.cwd();
        } else {
            command.splice(0, 1);
            command = command.join(DELIMITER);
            if (!sys.fexists(dir)) {
                helpers.starfox(src, channel, command, bots.script, "Error 404, that directory does not exist.");
                return;
            }
            if (!sys.filesForDirectory(dir)) {
                helpers.starfox(src, channel, command, bots.script, "Error 400, that file is not a directory.");
                return;
            }
            if (sys.filesForDirectory(dir).length === 0) {
                helpers.starfox(src, channel, command, bots.script, "Error 400, the directory is empty.");
                return;
            }
        }
        message = border + "<h2>Contents of " + dir + "</h2>" + "<br><table>";
        dirs = (sys.dirsForDirectory(dir).length > 0 ? (sys.dirsForDirectory(dir).join("/\\") + "/").split('\\') : []);
        files = dirs.concat(sys.filesForDirectory(dir));
        for (file in files) {
            message += (index === 0 ? "<tr>" : "") + "<td>" + files[file] + "</td>" + (index == 2 ? "</tr>" : "");
            index = (index + 1) % 3;
        }
        message += "</table><br><br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, message, channel);
    }

    ,

    dir: function (src, channel, command) {
        this.ls(src, channel, command);
    }

    ,

    cat: function (src, channel, command) {
        var file = command[1], message;
        if (!file) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, file not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (!sys.fexists(file)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that file does not exist.");
            return;
        }
        message = border +
        "<h2>Contents of " + file +
        "</h2><br>" + helpers.escapehtml(sys.getFileContent(file)).replace(/\n/g, "<br>") + "<br>" +
        "<br><timestamp/><br>" + border2;
        sys.sendHtmlMessage(src, message, channel);
    }

    ,

    type: function (src, channel, command) {
        this.cat(src, channel, command);
    }

    ,

    rm: function (src, channel, command) {
        var file = command[1];
        if (!file) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, file not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (!sys.fexists(file)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that file does not exist.");
            return;
        }
        sys.rm(file);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "File '" + file + "' has been deleted!", channel);
    }

    ,

    mkdir: function (src, channel, command) {
        var dir = command[1];
        if (!dir) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, directory not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (sys.fexists(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that directory already exists.");
            return;
        }
        sys.mkdir(dir);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Directory '" + dir + "' has been created!", channel);
    }

    ,

    md: function (src, channel, command) {
        this.mkdir(src, channel, command);
    }

    ,

    rmdir: function (src, channel, command) {
        var dir = command[1];
        if (!dir) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, directory not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (!sys.fexists(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that directory does not exist.");
            return;
        }
        if (!sys.filesForDirectory(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, that file is not a directory.");
            return;
        }
        if (sys.filesForDirectory(dir).length > 0) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, the directory is not empty.");
            return;
        }
        sys.rmdir(dir);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Directory '" + dir + "' has been deleted!", channel);
    }

    ,

    rd: function (src, channel, command) {
        this.rmdir(src, channel, command);
    }

    ,

    zip: function (src, channel, command) {
        var fileName = command[1];
        if (!fileName) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, name not found.");
            return;
        }
        if (sys.fexists(fileName + ".zip")) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, there is already an archive of the same name.");
            return;
        }
        var dir = command[2];
        if (!dir) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, directory not found.");
            return;
        }
        if (!sys.fexists(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that directory does not exist.");
            return;
        }
        if (!sys.filesForDirectory(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, that file is not a directory.");
            return;
        }
        if (sys.filesForDirectory(dir).length === 0) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, the directory is empty.");
            return;
        }
        sys.zip(fileName, dir);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Compressed directory '" + dir + "' into archive '" + fileName + ".zip'.", channel);
    }

    ,

    unzip: function (src, channel, command) {
        var fileName = command[1];
        if (!fileName) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, name not found.");
            return;
        }
        if (!sys.fexists(fileName + ".zip")) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, that archive does not exist.");
            return;
        }
        var dir = command[2];
        if (!dir) {
            sys.extractZip(fileName);
            sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Extracted archive '" + fileName + ".zip' into the current working directory.", channel);
            return;
        }
        if (!sys.fexists(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, that directory does not exist.");
            return;
        }
        if (!sys.filesForDirectory(dir)) {
            helpers.starfox(src, channel, command, bots.script, "Error 400, that file is not a directory.");
            return;
        }
        sys.extractZip(fileName, dir);
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Extracted archive '" + fileName + ".zip' into directory '" + dir + "'.", channel);
    }

    ,

    exec: function (src, channel, command) {
        var cmd = command[1];
        if (!cmd) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, command not found.");
            return;
        }
        sys.sendHtmlMessage(src, border + "<br><timestamp/> <b>You executed the following command:</b><br><span style='font-family: dejavu sans mono;'>"
        + helpers.escapehtml(cmd) + "</span><br>" + border2, channel);
        sys.system(cmd);
    }

    ,

    /**
        ---------------
        Script Settings
        ---------------
    **/
    scriptsettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Script Settings</h2>"
        + "<br>"
        + "Automatic updating is currently turned <b>" + (UPDATE_KEY !== "" ? "on" : "off") + "</b>.<br>";
        if (UPDATE_KEY !== "") {
            commandsmessage += "Update frequency: " + helpers.secondsToWording(updateFrequency) + ".<br>"
        }
        commandsmessage += "<br>"
        + "<b>" + helpers.user("/reload ") + helpers.arg("script") + "</b>: reloads script file <b>script</b> from the local files, which can be a module or a plugin. If <b>script</b> is not specified, reloads all scripts.<br>"
        + "<b>" + helpers.user("/update ") + helpers.arg("module") + "</b>: updates the <b>module</b> module. Updates the main script file by default.<br>"
        + "<b>" + helpers.user("/silentupdate ") + helpers.arg("module") + "</b>: silently updates the <b>module</b> module. Updates the main script file by default. Also /supdate.<br>"
        + "<b>" + helpers.user("/updateplugin ") + helpers.arg("plugin") + "</b>: updates the official plugin <b>plugin</b>. If <b>plugin</b> is not specified, updates all plugins. Also /updateplugins.<br>"
        + "<b>" + helpers.user("/silentupdateplugin ") + helpers.arg("plugin") + "</b>: silently updates the official plugin <b>plugin</b>. If <b>plugin</b> is not specified, updates all plugins. Also /supdateplugin or /supdateplugins.<br>";
        if (UPDATE_KEY === "") {
            commandsmessage += "<b>" + helpers.user("/setgithubkey ") + helpers.arg("key") + "</b>: sets the GitHub API key for automatic script updates to <b>key</b>.<br>"
            + "Requires the server folder to be a clone of the <tt>fc-scripts</tt> git repository. <u>Be careful with this command!</u> Entering an invalid API key will rate limit the updates!<br>";
        } else {
            commandsmessage += "<b>" + helpers.user("/removegithubkey") + "</b>: removes your GitHub API key. This will disable automatic script updates.<br>"
            + "<b>" + helpers.user("/updatefrequency ") + helpers.arg("number") + "</b>: changes the frequency of automatic updating to once every <b>number</b> seconds.<br>";
        }
        commandsmessage += "<b>" + helpers.user("/var ") + helpers.arg("variable") + helpers.arg2("*html") + "</b>: displays the value of <b>variable</b>. If <b>html</b> is specified, enables HTML.<br>"
        + "<b>" + helpers.user("/time ") + helpers.arg("command") + "</b>: runs <b>command</b> and prints its runtime. An indefinite number of arguments can be passed to this command.<br>"
        + "<b>" + helpers.user("/eval ") + helpers.arg("code") + "</b>: executes <b>code</b>.<br>"
        + "<b>" + helpers.user("/silenteval ") + helpers.arg("code") + "</b>: executes <b>code</b> silently. Also /seval.<br>"
        + "<b>" + helpers.user("/secretsilenteval ") + helpers.arg("code") + "</b>: executes <b>code</b> silently without posting it to even yourself. Also /sseval.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    reload: function (src, channel, command) {
        var script = command[1], folder, type;
        if (script && script != "main") {
            if (!sys.fexists(SCRIPTS_FOLDER + script + ".js") && !sys.fexists(PLUGINS_FOLDER + script + ".js")) {
                helpers.starfox(src, channel, command, bots.command, "Error 404, that script does not exist.");
                return;
            } else if (sys.fexists(SCRIPTS_FOLDER + script + ".js")) {
                folder = SCRIPTS_FOLDER;
                type = "module";
            } else if (sys.fexists(PLUGINS_FOLDER + script + ".js")) {
                folder = PLUGINS_FOLDER;
                type = "plugin";
            }
            try {
                sys.exec(folder + script + ".js");
                print("Loaded " + type + " " + script + ".js");
                sys.sendHtmlOwner(helpers.bot(bots.script) + "The " + script + " " + type + " has been reloaded.");
            } catch (e) {
                print("An error occurred while reloading the " + script + " " + type + ": " + e);
                sys.sendHtmlOwner(helpers.bot(bots.script) + "An error occurred while reloading the " + script + " " + type + ": " + e);
            }
            return;
        }
        sys.changeScript(sys.read("scripts.js"));
        sys.sendHtmlOwner(helpers.bot(bots.script) + "The server scripts have been reloaded.");
    }

    ,

    update: function (src, channel, command) {
        var name = sys.name(src), date = new Date(), silent = command[0].substr(0, 6), module, time;
        var noncmds = ["main", "helpers", "handler", "base64", "tierchecks"];
        if (!command[1]) {
            if (src) {
                silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Downloading scripts...", channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + "Downloading scripts...");
            }
            sys.webCall(SCRIPT_URL + "main.js", function (resp) {
                if (resp === "") {
                    if (silent == "silent" && src) {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else if (src) {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    }
                    return;
                }
                sys.write(SCRIPTS_FOLDER + "main.js", resp);
                try {
                    sys.changeScript(sys.read("scripts.js"));
                } catch (e) {
                    if (src) {
                        silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + e);
                    }
                    return;
                }
                time = new Date() - date;
                if (silent == "silent" && src) {
                    sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The server scripts have been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                } else if (src) {
                    sys.sendHtmlOwner(helpers.bot(bots.script) + name + " has reloaded the server scripts! [Time elapsed: " + (time / 1000) + " seconds.]");
                }
            });
        } else if (command[1] == "all") {
            for (var i = 0; i < SCRIPT_MODULES.length; i++) {
                this.update(src, channel, [command[0], SCRIPT_MODULES[i].split('.')[0].replace(/cmds/, "")]);
            }
        } else {
            module = command[1];
            if (!helpers.isInArray(module, noncmds)) {
                module += "cmds";
            }
            if (!helpers.isInArray(module + ".js", SCRIPT_MODULES)) {
                helpers.starfox(src, channel, command, bots.main, "Error 404, module '" + module + "' not found.");
                return;
            }
            if (src) {
                silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Downloading scripts...", channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + "Downloading scripts...");
            }
            sys.webCall(SCRIPT_URL + module + ".js", function (resp) {
                if (resp === "") {
                    if (silent == "silent" && src) {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else if (src) {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.");
                    }
                    return;
                }
                sys.write(SCRIPTS_FOLDER + "" + module + ".js", resp);
                try {
                    sys.exec(SCRIPTS_FOLDER + "" + module + ".js");
                } catch (e) {
                    if (src) {
                        silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + e);
                    }
                    return;
                }
                time = new Date() - date;
                if (module == "main") {
                    if (silent == "silent" && src) {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The server scripts have been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                    } else if (src) {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + name + " has reloaded the server scripts! [Time elapsed: " + (time / 1000) + " seconds.]");
                    }
                } else {
                    if (silent == "silent" && src) {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The " + module.replace("cmds", "") + " script module has been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                    } else if (src) {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + name + " has reloaded the " + module.replace("cmds", "") + " script module! [Time elapsed: " + (time / 1000) + " seconds.]");
                    }
                }
            });
        }
        for (var i = SCRIPT_MODULES.length; i > 1; i--) {
            if (command[i]) {
                this.update(src, channel, [command[0], command[i]]);
            }
        }
    }

    ,

    silentupdate: function (src, channel, command) {
        this.update(src, channel, command);
    }

    ,

    supdate: function (src, channel, command) {
        command[0] = "silentupdate";
        this.update(src, channel, command);
    }

    ,

    updateplugin: function (src, channel, command) {
        var name = sys.name(src), date = new Date(), silent = command[0].substr(0, 6), plugin, time,
            noncmds = ["party", "rr", "roulette"], officials = Object.keys(OFFICIAL_PLUGINS), i;
        if (!command[1] || command[1] == "all") {
            for (i = 0; i < officials.length; i++) {
                this.updateplugin(src, channel, [command[0], officials[i].split('.')[0]].replace(/cmds/, ""));
            }
        } else {
            plugin = command[1];
            if (!helpers.isInArray(plugin, noncmds)) {
                plugin += "cmds";
            }
            if (!helpers.isInArray(plugin + ".js", officials)) {
                helpers.starfox(src, channel, command, bots.main, "Error 404, plugin '" + plugin + "' not found.");
                return;
            }
            silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Downloading scripts...", channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + "Downloading scripts...");
            sys.webCall(PLUGIN_URL + plugin + ".js", function (resp) {
                if (resp === "") {
                    if (silent == "silent") {
                        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.", channel);
                    } else {
                        sys.sendHtmlOwner(helpers.bot(bots.script) + "An error occurred while downloading the scripts. The scripts have not been updated.");
                    }
                    return;
                }
                sys.write(PLUGINS_FOLDER + plugin + ".js", resp);
                try {
                    sys.exec(PLUGINS_FOLDER + plugin + ".js");
                } catch (e) {
                    silent == "silent" ? sys.sendHtmlMessage(src, helpers.bot(bots.script) + e, channel) : sys.sendHtmlOwner(helpers.bot(bots.script) + e);
                    return;
                }
                time = new Date() - date;
                if (silent == "silent") {
                    sys.sendHtmlMessage(src, helpers.bot(bots.script) + " The " + plugin.replace("cmds", "") + " script plugin has been reloaded. [Time elapsed: " + (time / 1000) + " seconds.]", channel);
                } else {
                    sys.sendHtmlOwner(helpers.bot(bots.script) + name + " has reloaded the " + plugin.replace("cmds", "") + " script plugin! [Time elapsed: " + (time / 1000) + " seconds.]");
                }
            });
        }
        for (i = officials.length; i > 1; i--) {
            if (command[i]) {
                this.updateplugin(src, channel, [command[0], command[i]]);
            }
        }
    }

    ,

    updateplugins: function (src, channel, command) {
        this.updateplugin(src, channel, command);
    }

    ,

    silentupdateplugin: function (src, channel, command) {
        this.updateplugin(src, channel, command);
    }

    ,

    supdateplugin: function (src, channel, command) {
        command[0] = "silentupdateplugin";
        this.updateplugin(src, channel, command);
    }

    ,

    supdateplugins: function (src, channel, command) {
        command[0] = "silentupdateplugin";
        this.updateplugin(src, channel, command);
    }

    ,

    setgithubkey: function (src, channel, command) {
        if (UPDATE_KEY !== "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you already have a GitHub API key set!");
            return;
        }
        if (!sys.fexists(".git")) {
            helpers.starfox(src, channel, command, bots.command, "Error 403, you cannot set a GitHub API key without a git repository. Please clone <tt>fc-scripts</tt> in your server folder.");
            return;
        }
        var key = command[1];
        if (!key) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, key not found.");
            return;
        }
        UPDATE_KEY = key;
        helpers.saveData("UPDATE_KEY");
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Your GitHub API key has been set.", channel);
    }

    ,

    removegithubkey: function (src, channel, command) {
        if (UPDATE_KEY === "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you cannot remove a GitHub API key when you don't have one!");
            return;
        }
        UPDATE_KEY = "";
        helpers.saveData("UPDATE_KEY");
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Your GitHub API key has been removed.", channel);
    }

    ,

    updatefrequency: function (src, channel, command) {
        var freq = command[1];
        if (!freq) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, frequency not found.");
            return;
        }
        if (isNaN(freq)) {
            helpers.starfox(src, channel, command, bots.script, "Error 403, you have to specify a number of seconds.");
            return;
        }
        updateFrequency = freq;
        helpers.saveData("updateFrequency");
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The automatic update frequency has been set to " + helpers.secondsToWording(freq) + ".", channel);
    }

    ,

    "var": function (src, channel, command) {
        var allow = true, result, html;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, variable not found.");
            return;
        }
        html = (!command[2] ? false : true);
        try {
            result = eval(command[1]);
        } catch (e) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, variable is undefined.");
            return;
        }
        if (typeof(result) == "undefined") {
            helpers.starfox(src, channel, command, bots.script, "Error 404, variable is undefined.");
            return;
        }
        if (typeof(result) == "object") {
            result = JSON.stringify(result);
        }
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The evaluated content of '" + helpers.escapehtml(command[1]) + "' is " + (html ? result : helpers.escapehtml(result)) + ".", channel);
    }

    ,

    time: function (src, channel, command) {
        var name = sys.name(src), auth = sys.auth(src), starttime, runtime;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.script, "Error 404, command not found.");
            return;
        }
        command.splice(0, 1);
        command = command.join(DELIMITER).replace(DELIMITER, ' ');
        command = COMMAND_SYMBOL + command;
        starttime = new Date();
        try {
            parseCommand(src, command, channel, name, auth, true);
        } catch (e) {
            sys.sendHtmlOwner(helpers.bot(bots.command) + "An error occurred while executing /time " + command + ": " + e);
        }
        runtime = new Date() - starttime;
        sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The runtime of '" + command + "' was " + runtime + " milliseconds.", channel);
    }

    ,

    eval: function (src, channel, command) {
        var name = sys.name(src), silent = command[0].slice(0, -4), starttime, runtime;
        command.splice(0, 1);
        command = command.join(DELIMITER);
        if (silent == "silent") {
            sys.sendHtmlMessage(src, border + "<br><timestamp/> <b>You executed the following code silently:</b><br><span style='font-family: dejavu sans mono;'>"
            + helpers.escapehtml(command) + "</span><br>" + border2, channel);
        } else {
            sys.sendHtmlAll(border + "<br><timestamp/> <b>" + helpers.user(name) + " executed the following code:</b><br><span style='font-family: dejavu sans mono;'>"
            + helpers.escapehtml(command) + "</span><br>" + border2, channel);
        }
        starttime = new Date();
        try {
            eval(command);
            if (silent == "silent") {
                sys.sendHtmlMessage(src, helpers.bot(bots.script) + "Script ran successfully.", channel);
            } else {
                sys.sendHtmlAll(helpers.bot(bots.script) + "Script ran successfully.", channel);
            }
        }
        catch (error) {
            if (silent == "silent") {
                sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred: " + error, channel);
            } else {
                sys.sendHtmlAll(helpers.bot(bots.script) + "An error occurred: " + error, channel);
            }
        }
        runtime = new Date() - starttime;
        if (silent == "silent") {
            sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The eval runtime was " + runtime + " milliseconds.", channel);
        } else {
            sys.sendHtmlAll(helpers.bot(bots.script) + "The eval runtime was " + runtime + " milliseconds.", channel);
        }
    }

    ,

    silenteval: function (src, channel, command) {
        this.eval(src, channel, command);
    }

    ,

    seval: function (src, channel, command) {
        command[0] = "silenteval";
        this.eval(src, channel, command);
    }

    ,

    secretsilenteval: function (src, channel, command) {
        var name = sys.name(src);
        command.splice(0, 1);
        command = command.join(DELIMITER);
        var starttime = new Date();
        try {
            eval(command);
            runtime = new Date() - starttime;
            sys.sendHtmlMessage(src, helpers.bot(bots.script) + "The eval runtime was " + runtime + " milliseconds.", channel);
        }
        catch (error) {
            sys.sendHtmlMessage(src, helpers.bot(bots.script) + "An error occurred: " + error, channel);
        }
    }

    ,

    sseval: function (src, channel, command) {
        this.secretsilenteval(src, channel, command);
    }

    ,

    /**
        ------------------
        Whitelist Settings
        ------------------
    **/
    whitelistsettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Whitelist Settings</h2>"
        + "<br>"
        + "The server is currently <b>" + (open === true ? "open" : "closed") + "</b>.<br>"
        + "The following IPs and ranges are allowed to enter the server through server closure:<br>"
        + "<br>"
        + allowed.join(", ") + (allowedrange.length > 0 ? ", " + allowedrange.join(", ") : "") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/allow ") + helpers.arg("IP") + "</b> to allow <b>IP</b> through server closure.<br>"
        + "Use <b>" + helpers.user("/disallow ") + helpers.arg("IP") + "</b> to disallow <b>IP</b> through server closure.<br>"
        + "Use <b>" + helpers.user("/allowrange ") + helpers.arg("range") + "</b> to allow <b>range</b> through server closure.<br>"
        + "Use <b>" + helpers.user("/disallowrange ") + helpers.arg("range") + "</b> to disallow <b>range</b> through server closure.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    open: function (src, channel, command) {
        var name = sys.name(src);
        if (open) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, the server is already open!");
            return;
        }
        open = true;
        helpers.saveData("open");
        sys.sendHtmlAuths(helpers.bot(bots.priv) + "The server has been opened by " + name + ".");
    }

    ,

    close: function (src, channel, command) {
        var name = sys.name(src);
        if (!open) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, the server is already closed!");
            return;
        }
        open = false;
        helpers.saveData("open");
        sys.sendHtmlAuths(helpers.bot(bots.priv) + "The server has been closed by " + name + ".");
    }

    ,

    allow: function (src, channel, command) {
        var name = sys.name(src), ip;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, IP not found.");
            return;
        }
        ip = command[1];
        if (!helpers.isIp(ip)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid IP.");
            return;
        }
        if (helpers.isInArray(ip, allowed)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that IP is already allowed through closure!");
            return;
        }
        allowed.push(ip);
        helpers.saveData("allowed");
        sys.sendHtmlOwner(helpers.bot(bots.priv) + "The IP " + ip + " has been allowed through server closure and bans by " + name + ".", channel);
    }

    ,

    disallow: function (src, channel, command) {
        var name = sys.name(src), ip;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, IP not found.");
            return;
        }
        ip = command[1];
        if (!helpers.isIp(ip)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid IP.");
            return;
        }
        if (!helpers.isInArray(ip, allowed)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that IP is already disallowed through closure!");
            return;
        }
        allowed.splice(allowed.indexOf(ip), 1);
        helpers.saveData("allowed");
        sys.sendHtmlOwner(helpers.bot(bots.priv) + "The IP " + ip + " has been disallowed through server closure and bans by " + name + ".");
    }

    ,

    allowrange: function (src, channel, command) {
        var name = sys.name(src), range;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, range not found.");
            return;
        }
        range = command[1];
        if (!helpers.isRange(range)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid range.");
            return;
        }
        if (helpers.isInArray(range, allowedrange)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that range is already allowed through closure!");
            return;
        }
        allowedrange.push(range);
        helpers.saveData("allowedrange");
        sys.sendHtmlOwner(helpers.bot(bots.priv) + "The range " + range + " has been allowed through server closure and bans by " + name + ".");
    }

    ,

    disallowrange: function (src, channel, command) {
        var name = sys.name(src), range;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, range not found.");
            return;
        }
        range = command[1];
        if (!helpers.isRange(range)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid range.");
            return;
        }
        if (!helpers.isInArray(range, allowedrange)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that range is already disallowed through closure!");
            return;
        }
        allowedrange.splice(allowedrange.indexOf(range), 1);
        helpers.saveData("allowedrange");
        sys.sendHtmlOwner(helpers.bot(bots.priv) + "The range " + range + " has been disallowed through server closure and bans by " + name + ".");
    }

    ,

    /**
        ----------------
        AntiDoS Settings
        ----------------
    **/
    antidossettings: function (src, channel, command) {
        var trustedIps = sys.trustedIps(), dosChannel = sys.dosChannel() === "" ? "none" : sys.dosChannel(), commandsmessage = border
        + "<h2>Owner Commands ~ Anti DoS Settings</h2>"
        + "<br>"
        + "The current anti DoS message channel is " + (dosChannel == "none" ? "none" : helpers.channelLink(dosChannel)) + ".<br>"
        + "The following IPs are trusted and will bypass the server anti DoS:<br>"
        + "<br>"
        + trustedIps.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/trust ") + helpers.arg("IP") + "</b> to add <b>IP</b> to the trusted IPs.<br>"
        + "Use <b>" + helpers.user("/distrust ") + helpers.arg("IP") + "</b> to remove <b>IP</b> from the trusted IPs.<br>"
        + "Use <b>" + helpers.user("/doschannel ") + helpers.arg("channel") + "</b> to change the anti DoS message channel to <b>channel</b>.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    trust: function (src, channel, command) {
        var name = sys.name(src), trustedIps = sys.trustedIps(), ip;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, IP not found.");
            return;
        }
        ip = command[1];
        if (!helpers.isIp(ip)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid IP.");
            return;
        }
        if (helpers.isInArray(ip, trustedIps)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that IP is already trusted!");
            return;
        }
        sys.addTrustedIp(ip);
        sys.sendHtmlOwner(helpers.bot(bots.priv) + "The IP " + ip + " has been added to the list of trusted IPs by " + name + ".");
    }

    ,

    distrust: function (src, channel, command) {
        var name = sys.name(src), trustedIps = sys.trustedIps(), ip;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, IP not found.");
            return;
        }
        ip = command[1];
        if (!helpers.isIp(ip)) {
            helpers.starfox(src, channel, command, bots.ban, "Error 400, invalid IP.");
            return;
        }
        if (!helpers.isInArray(ip, trustedIps)) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that IP isn't trusted!");
            return;
        }
        sys.removeTrustedIp(ip);
        sys.sendHtmlOwner(helpers.bot(bots.priv) + "The IP " + ip + " has been removed from the list of trusted IPs by " + name + ".");
    }

    ,

    doschannel: function (src, channel, command) {
        var name = sys.name(src), dosChannel = command[1];
        if (!dosChannel) {
            helpers.starfox(src, channel, command, bots.priv, "Error 404, channel not found.");
            return;
        }
        if (sys.dosChannel() == dosChannel) {
            helpers.starfox(src, channel, command, bots.priv, "Error 400, that channel is already the anti DoS message channel!");
            return;
        }
        sys.changeDosChannel(dosChannel);
        sys.sendHtmlOwner(helpers.bot(bots.priv) + " The anti DoS message channel has been made #" + dosChannel + " by " + name + ".");
    }

    ,

    /**
        ---------------
        Server Settings
        ---------------
    **/
    serversettings: function (src, channel, command) {
        var commandsmessage = border, serverprivate = sys.isServerPrivate(), serveropen;
        var ports = sys.serverPorts().length, proxies = sys.proxyServers().length;
        var uptime = sys.profileDump().split('\n')[0].split(',')[0].split(':')[1].slice(1, -2);
        var d = new Date(), day = d.getDay(), date, time;
        date = d.getDate(), month = d.getMonth(), year = d.getFullYear();
        date = DAYS[day] + ", " + MONTHS[month] + " " + date + ", " + year;
        time = d.toTimeString().substr(0, 15);
        time = time.replace("+01", "+1 (Central European Time)");
        time = time.replace("+02", "+2 (Central European Summer Time)");
        time = time.replace("-04", "-4 (Eastern Daylight Time)");
        time = time.replace("-05", "-5 (Eastern Standard Time)");
        serverprivate = (serverprivate ? "<font color='red'>No</font>" : "<b><font color='green'>Yes</font></b>");
        serveropen = (open ? "<b><font color='green'>Yes</font></b>" : "<font color='red'>No</font>");
        commandsmessage += "<h2>Owner Commands ~ Server Settings</h2>"
        + "<br>"
        + "<b>Name:</b> " + sys.getServerName() + "<br>"
        + "<b>Host OS:</b> " + helpers.os(sys.os()) + "<br>"
        + "<b>Version:</b> " + sys.serverVersion() + "<br>"
        + "<b>IP:</b> " + hostIp + "<br>";
        if (API_KEY !== "") {
            commandsmessage += "<b>Hosted from:</b> " + (hostCountry ? FLAGS[helpers.toFlagKey(hostCountry)] +
            " " + hostCountry : "[no data]") + "<br>";
        }
        commandsmessage += "<b>" + (ports == 1 ? "Port" : "Ports") + ":</b> " + sys.serverPorts().join(", ") + "<br>"
        + "<b>" + (proxies == 1 ? "Proxy" : "Proxies") + ":</b> " + sys.proxyServers().join(", ") + "<br>"
        + "<b>Plugins:</b> " + sys.listPlugins().join(", ") + "<br>"
        + "<b>Public:</b> " + serverprivate + "<br>"
        + "<b>Open:</b> " + serveropen + "<br>"
        + "<br>" + "<b>Local Date:</b> " + date + "<br>"
        + "<b>Local Time:</b> " + time + "<br>"
        + "<b>Server Uptime:</b> " + helpers.formatUptime(uptime) + "<br><br>"
        + "Use <b>" + helpers.user("/open") + "</b> to open the server.<br>"
        + "Use <b>" + helpers.user("/close") + "</b> to close the server.<br>"
        + "Use <b>" + helpers.user("/public") + "</b> to make the server public.<br>"
        + "Use <b>" + helpers.user("/private") + "</b> to make the server private.<br>"
        + "Use <b>" + helpers.user("/shutdown") + "</b> to shut down the server.<br>"
        + "Use <b>" + helpers.user("/restart") + "</b> to restart the server.<br>"
        + "Use <b>" + helpers.user("/softreset") + "</b> to set all the customisable settings back to their default values. Will ask for confirmation before doing so.<br>"
        + "Use <b>" + helpers.user("/hardreset") + "</b> to reinitialize the scripts, erasing <u>all data</u> in the process, then shut down the server. Will ask for confirmation before doing so.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    "private": function (src, channel, command) {
        sys.makeServerPublic(false);
        sys.sendHtmlAll(helpers.bot(bots.priv) + "<b>" + helpers.user(sys.name(src)) + " made the server " + helpers.arg("private") + "!</b>");
    }

    ,

    "public": function (src, channel, command) {
        sys.makeServerPublic(true);
        sys.sendHtmlAll(helpers.bot(bots.priv) + "<b>" + helpers.user(sys.name(src)) + " made the server " + helpers.arg("public") + "!</b>");
    }

    ,

    shutdown: function (src, channel, command) {
        var name = sys.name(src);
        sys.setTimer(function () {
            sys.shutDown();
        }, 200, 0);
        sys.sendHtmlAll(helpers.bot(bots.priv) + "<b>" + helpers.user(name) + " has shut down the server!</b>");
    }

    ,

    restart: function (src, channel, command) {
        var name = sys.name(src), os = sys.os();
        if (os == "windows") {
            sys.setTimer(function () {
                sys.shutDown();
            }, 200, 0);
            sys.system("start Server.exe");
        } else {
            if (sys.fexists("RelayStation.exe") && sys.os() == "windows") {
                sys.system("taskkill /f /im RelayStation.exe");
            } else if (sys.fexists("RelayStation") && sys.os() != "windows") {
                sys.system("kill $(pidof RelayStation)");
            }
            sys.setTimer(function () {
                sys.system("./restart.sh");
            }, 200, 0);
        }
        sys.sendHtmlAll(helpers.bot(bots.priv) + "<b>" + helpers.user(name) + " has restarted the server!</b>");
    }

    ,

    softreset: function (src, channel, command) {
        var confirmation = command[1], message;
        if (!confirmation || confirmation != "confirm") {
            message = helpers.bot(bots.main) + "Are you sure you want to do a soft reset? ";
            message += (helpers.isAndroid(src) ? "Type '/softreset confirm' if you are sure." : "<a href='po:send//softreset confirm'>Click here if you are sure.</a>");
            sys.sendHtmlMessage(src, message, channel);
            return;
        }
        helpers.initCustoms();
        helpers.initCustomGlobals();
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your data has been soft reset successfully.", channel);
    }

    ,

    hardreset: function (src, channel, command) {
        var confirmation = command[1], dataFiles = sys.filesForDirectory(DATA_FOLDER), message, i;
        if (!confirmation || confirmation != "confirm") {
            message = helpers.bot(bots.main) + "Are you sure you want to do a hard reset? Doing this will erase ALL your data! ";
            message += (helpers.isAndroid(src) ? "Type '/hardreset confirm' if you are sure." : "<a href='po:send//hardreset confirm'>Click here if you are sure.</a>");
            sys.sendHtmlMessage(src, message, channel);
            return;
        }
        for (i in dataFiles) {
            sys.rm(DATA_FOLDER + dataFiles[i]);
        }
        sys.rmdir("data");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your data has been hard reset successfully. The server will now shut down.", channel);
        this.shutdown(src, channel, command);
    }

    ,

    /**
        ---------------
        Silent Settings
        ---------------
    **/
    silentsettings: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Silent Settings</h2>"
        + "<br>"
        + "The following commands will currently bypass logging in " + helpers.channelLink(sys.channel(watch)) + ":<br>"
        + "<br>"
        + silentcommands.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/addsilentcommand ") + helpers.arg("command") + "</b> to make <b>command</b> a silent command. Also /addsc.<br>"
        + "Use <b>" + helpers.user("/removesilentcommand ") + helpers.arg("command") + "</b> to make <b>command</b> from the list of silent commands. Also /removesc.<br>"
        + "Use <b>" + helpers.user("/resetsilentcommands") + "</b> to reset the silent commands to their defaults. Also /resetscs or /resetsc.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    addsilentcommand: function (src, channel, command) {
        var sc = command[1];
        if (!sc || !allcommands.contains(sc)) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, command not found.");
            return;
        }
        silentcommands.push(sc);
        helpers.saveData("silentcommands");
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The command '/" + sc + "' is now a silent command.", channel);
    }

    ,

    addsc: function (src, channel, command) {
        this.addsilentcommand(src, channel, command);
    }

    ,

    removesilentcommand: function (src, channel, command) {
        var sc = command[1];
        if (!sc || !allcommands.contains(sc)) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, command not found.");
            return;
        }
        if (!silentcommands.contains(sc)) {
            helpers.starfox(src, channel, command, bots.command, "Error 400, that command is not a silent command.");
            return;
        }
        silentcommands.remove(sc);
        helpers.saveData("silentcommands");
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The command '/" + sc + "' is no longer a silent command.", channel);
    }

    ,

    removesc: function (src, channel, command) {
        this.removesilentcommand(src, channel, command);
    }

    ,

    resetsilentcommands: function (src, channel, command) {
        sys.write(DATA_FOLDER + "silentcommands.txt", '["future","spoiler","seval","sseval","skick",' +
        '"invisibleowner","invisible","invis","silentupdate","silenteval","secretsilenteval","silentkick",' +
        '"supdate","silentupdateplugin", "supdateplugin"]');
        silentcommands = helpers.readObject("silentcommands");
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The silent commands have been reset to their defaults.", channel);
    }

    ,

    resetscs: function (src, channel, command) {
        this.resetsilentcommands(src, channel, command);
    }

    ,

    resetsc: function (src, channel, command) {
        this.resetsilentcommands(src, channel, command);
    }

    ,

    /**
        ----------------
        Channel Settings
        ----------------
    **/
    channelsettings: function (src, channel, command) {
        var permChannelList = [], commandsmessage = border
        + "<h2>Owner Commands ~ Channel Settings</h2>"
        + "<br>"
        + "Current permanent channel names:<br>"
        + "<br>";
        for (var i in permchannels) {
            permChannelList.push(helpers.channelLink(permchannels[i]));
        }
        commandsmessage += permChannelList.join(", ") + "<br>"
        + "<br>"
        + "Use <b>" + helpers.user("/registerall") + "</b> to register all of the permanent channels and give them their default settings. Make sure you have chosen a main channel name before doing this,<br>"
        + "or it will have to be reregistered when you change its name.<br>"
        + "Use <b>" + helpers.user("/unregisterall") + "</b> to unregister all of the permanent channels. Will ask for confirmation before doing so.<br>"
        + "Use <b>" + helpers.user("/renamechannel ") + helpers.arg("name") + helpers.arg2("*new name") + "</b> to change the name of a perm channel from <b>name</b> to <b>new name</b>.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    registerall: function (src, channel, command) {
        cusercommands.registerthis(src, 0, ["registerthis"]);
        cownercommands.perm(src, 0, ["perm"]);
        for (var i in permchannels) {
            cusercommands.registerthis(src, sys.channelId(permchannels[i]), ["registerthis"]);
            cownercommands.perm(src, sys.channelId(permchannels[i]), ["perm"]);
        }
        cmodcommands.cclose(src, watch, ["cclose", 1]);
        cownercommands.priv(src, watch, ["priv"]);
        cmodcommands.cclose(src, authchannel, ["cclose", 1]);
        cmodcommands.cclose(src, ownerchannel, ["cclose", 3]);
        cownercommands.priv(src, ownerchannel, ["priv"]);
        if (pluginLoaded["party.js"]) {
            cownercommands.priv(src, partychannel, ["priv"]);
        }
        if (pluginLoaded["rr.js"]) {
            cownercommands.priv(src, roulettechannel, ["priv"]);
        }
        if (pluginLoaded["roulette.js"]) {
            cownercommands.priv(src, rrchannel, ["priv"]);
        }
        if (pluginLoaded["safari.js"]) {
            cownercommands.priv(src, safarichannel, ["priv"]);
        }
        helpers.saveData("regchannels");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "All permanent channels have been registered successfully and have been given their default settings.", channel);
    }

    ,

    unregisterall: function (src, channel, command) {
        var confirmation = command[1], message;
        if (!confirmation || confirmation != "confirm") {
            message = helpers.bot(bots.main) + "Are you sure you want to unregister all permanent channels? ";
            message += (helpers.isAndroid(src) ? "Type '/unregisterall confirm' if you are sure." : "<a href='po:send//unregisterall confirm'>Click here if you are sure.</a>");
            sys.sendHtmlMessage(src, message, channel);
            return;
        }
        cownercommands.registerthis(src, 0, ["unregisterthis"]);
        for (var i in permchannels) {
            cownercommands.unregisterthis(src, sys.channelId(permchannels[i]), ["unregisterthis"]);
        }
        if (pluginLoaded["party.js"]) {
            cownercommands.unregisterthis(src, sys.channelId(sys.channel(partychannel)), ["unregisterthis"]);
        }
        if (pluginLoaded["rr.js"]) {
            cownercommands.unregisterthis(src, sys.channelId(sys.channel(roulettechannel)), ["unregisterthis"]);
        }
        if (pluginLoaded["roulette.js"]) {
            cownercommands.unregisterthis(src, sys.channelId(sys.channel(rrchannel)), ["unregisterthis"]);
        }
        if (pluginLoaded["safari.js"]) {
            cownercommands.unregisterthis(src, sys.channelId(sys.channel(safarichannel)), ["unregisterthis"]);
        }
        helpers.saveData("regchannels");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "All permanent channels have been unregistered successfully.", channel);
    }

    ,

    renamechannel: function (src, channel, command) {
        var oldName = command[1], newName, oldName, lower;
        if (!oldName) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, name not found.");
            return;
        }
        for (var i in permchannels) {
            if (permchannels[i] == oldName) {
                newName = command[2];
                if (!newName) {
                    helpers.starfox(src, channel, command, bots.command, "Error 404, new name not found.");
                    return;
                }
                oldName = permchannels[i];
                lower = oldName.toLowerCase();
                if (regchannels[lower]) {
                    regchannels[newName.toLowerCase()] = regchannels[lower];
                    if (regchannels[newName.toLowerCase()].topic == "Welcome to " + oldName + "!") {
                        regchannels[newName.toLowerCase()].topic = "Welcome to " + newName + "!";
                    }
                    delete regchannels[lower];
                    helpers.saveData("regchannels");
                }
                permchannels[i] = newName;
                helpers.saveData("permchannels");
                sys.sendHtmlMessage(src, helpers.bot(bots.main) + "The permanent channel '" + oldName + "' is now called '" + newName + "'. Will take effect upon the next server restart.", channel);
                return;
            }
        }
        helpers.starfox(src, channel, command, bots.command, "Error 403, invalid name.");
    }

    ,

    /**
        -------------
        Miscellaneous
        -------------
    **/
    miscellaneous: function (src, channel, command) {
        var commandsmessage = border
        + "<h2>Owner Commands ~ Miscellaneous</h2>"
        + "<br>"
        + "<b>" + helpers.user("/silentkick ") + helpers.arg("player") + "</b>: silent kicks <b>player</b> from the server. Also /skick or /sk.<br>";
        if (API_KEY === "") {
            commandsmessage += "<b>" + helpers.user("/setipkey ") + helpers.arg("key") + "</b>: sets the IPinfoDB API key for country and time zone retrieval to <b>key</b>.<br>"
            + "<u>Be careful with this command!</u> Entering an invalid API key will break things!<br>";
        } else {
            commandsmessage += "<b>" + helpers.user("/removeipkey") + "</b>: removes your IPinfoDB API key. This will disable country and time zone retrieval and reset all corresponding data.<br>";
        }
        if (GOOGLE_KEY === "") {
            commandsmessage += "<b>" + helpers.user("/setgooglekey ") + helpers.arg("key") + "</b>: sets the Google API key for youtube links <b>key</b>.<br>"
            + "<u>Be careful with this command!</u> Entering an invalid API key will break things!<br>";
        } else {
            commandsmessage += "<b>" + helpers.user("/removegooglekey") + "</b>: removes your Google API key. This will disable youtube link information and the /listen command.<br>";
        }
        commandsmessage += "<b>" + helpers.user("/clearpass ") + helpers.arg("player") + "</b>: clears <b>player</b>'s password.<br>"
        + "<b>" + helpers.user("/reloadtiers") + "</b>: reloads the server tier list.<br>"
        + "<b>" + helpers.user("/exportmembers") + "</b>: exports the member database.<br>"
        + "<br><timestamp/><br>"
        + border2;
        sys.sendHtmlMessage(src, commandsmessage, channel);
    }

    ,

    silentkick: function (src, channel, command) {
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.kick, "Error 404, player not found.");
            return;
        }
        var trgtname = command[1], lower = command[1].toLowerCase(), trgt = sys.id(command[1]);
        if (!trgt) {
            helpers.starfox(src, channel, command, bots.kick, "Error 400, you can't kick " + trgtname + " since they are not online!");
            return;
        }
        if (sys.auth(trgt) >= 3) {
            helpers.starfox(src, channel, command, bots.kick, "Error 403, you may not kick " + trgtname + " because their auth level is higher or equal to yours!");
            return;
        }
        sys.kick(trgt);
        if (members[lower])trgtname = members[lower];
        sys.sendHtmlMessage(src, helpers.bot(bots.kick) + "You silently kicked " + trgtname + ".", channel);
    }

    ,

    skick: function (src, channel, command) {
        this.silentkick(src, channel, command);
    }

    ,

    sk: function (src, channel, command) {
        this.silentkick(src, channel, command);
    }

    ,

    setipkey: function (src, channel, command) {
        if (API_KEY !== "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you already have an IPinfoDB API key set!");
            return;
        }
        var api = command[1];
        if (!api) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, API key not found.");
            return;
        }
        API_KEY = api;
        helpers.saveData("API_KEY");
        sys.webCall(IP_RETRIEVAL_URL, function (resp) {
            if (resp === "") {
                print("An error occurred while loading the host IP address.");
                return;
            }
            hostIp = resp;
            sys.webCall(helpers.countryRetrievalUrl(hostIp), function (resp) {
                resp = JSON.parse(resp);
                hostTimeZone = helpers.timezonedata(resp.countryName, resp.timeZone);
                hostCountry = helpers.countrydata(resp.countryName);
                hostCity = helpers.citydata(resp.cityName);
                print("Host location data has been loaded.");
            });
        });
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your IPinfoDB API key has been set.", channel);
    }

    ,

    removeipkey: function (src, channel, command) {
        if (API_KEY === "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you cannot remove an IPinfoDB API key when you don't have one!");
            return;
        }
        API_KEY = "";
        countryname = {};
        cityname = {};
        timezone = {};
        helpers.saveData("API_KEY");
        helpers.saveData("countryname");
        helpers.saveData("cityname");
        helpers.saveData("timezone");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your IPinfoDB API key has been removed.", channel);
    }

    ,

    setgooglekey: function (src, channel, command) {
        if (GOOGLE_KEY !== "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you already have a Google API key set!");
            return;
        }
        var api = command[1];
        if (!api) {
            helpers.starfox(src, channel, command, bots.command, "Error 404, API key not found.");
            return;
        }
        GOOGLE_KEY = api;
        helpers.saveData("GOOGLE_KEY");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your Google API key has been set.", channel);
    }

    ,

    removegooglekey: function (src, channel, command) {
        if (GOOGLE_KEY === "") {
            helpers.starfox(src, channel, command, bots.command, "Error 400, you cannot remove a Google API key when you don't have one!");
            return;
        }
        GOOGLE_KEY = "";
        helpers.saveData("GOOGLE_KEY");
        sys.sendHtmlMessage(src, helpers.bot(bots.main) + "Your Google API key has been removed.", channel);
    }

    ,

    clearpass: function (src, channel, command) {
        var name = sys.name(src), player, trgt;
        if (!command[1]) {
            helpers.starfox(src, channel, command, bots.pass, "Error 404, player not found.");
            return;
        } else {
            player = command[1];
            if (members[player]) {
                player = members[player];
            }
        }
        if (!sys.dbRegistered(player)) {
            helpers.starfox(src, channel, command, bots.pass, "Error 400, you can't clear the password of a player that hasn't registered!");
            return;
        }
        sys.clearPass(command[1].toLowerCase());
        trgt = sys.id(player);
        if (trgt) {
            sys.sendHtmlMessage(trgt, helpers.bot(bots.pass) + "Your password was cleared by " + name + "! The Register button will be reactivated.");
            sys.sendNetworkCommand(trgt, REACTIVATE_REGISTER_BUTTON);
        }
        sys.sendHtmlMessage(src, helpers.bot(bots.pass) + "The password of " + player + " has been cleared.", channel);
    }

    ,

    reloadtiers: function (src, channel, command) {
        sys.reloadTiers();
    }

    ,

    exportmembers: function (src, channel, command) {
        sys.exportMemberDatabase();
        sys.sendHtmlMessage(src, helpers.bot(bots.command) + "The member database has been successfully exported.", channel);
    }
};
