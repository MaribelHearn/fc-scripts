# fc-scripts
The Fun Community server scripts. Currently still quite a mixture of old code and new code, though everything does work and the old code has mostly been updated to my current standards. I never intended to release the scripts to the public, and as a result, many things had to be adapted to that. Recently, however, I became active in the main server community, started using GitHub for once, and decided to ready my scripts for release. I have been spending time doing that, and now, here they are!

Server version **2.6.2** or newer is required to run the scripts.

### About

The Fun Community scripts, or FC scripts for short, were used on my server Fun Community back when it was hosted (of course!). They are intended for small servers and are mainly known for their long list of fun commands. A main focus of the scripts is customisation and tweaking, customising settings to your liking, as well as making the most out of Pokémon Online's script functions. They have been developed by me since the adoption of V2 by Fun Community , on July 9, 2012, and are loosely based on the V1 server scripts by [Lutra](https://github.com/Jakilutra). Fun Community used to run the Lutra scripts, with my own code added to it (which has existed since July 16, 2011, like my server), but when V2 was released, I decided to branch off and started developing the Fun Community scripts. Some functionality, such as a few methods, some general implementation and tours, is code written by Lutra from their V1 server scripts, though modified to work with these scripts.

### How to use

Click 'Download ZIP' to download this repository, then extract the content of the `fc-scripts-master` folder from the ZIP into your server folder. The scripts will initialise the data that they use when you open your server, for which they will create a folder called `data`, and with that, immediately work on server startup. Be careful if you touch this folder; you might break the scripts! If you by any chance already have a folder called `data` in your server folder, make sure you either rename or delete it before running your server with the scripts for the first time, or else they won't initialise and, therefore, won't work.

If you wish for the scripts to automatically update, `git` has to be installed on your computer and this repository has to be cloned in your server folder. After having done so, this feature can be enabled by using `/setgithubkey <API key>` to add a GitHub API key. To change how often the script will attempt to automatically update, use `/updatefrequency <number of seconds>`. To disable automatic updating again, use `/removegithubkey`.

The scripts offer country and time zone retrieval functionality, for which it uses the [IPinfoDB](http://ipinfodb.com/) API service. If you want this functionality, you will need to register at IPinfoDB and obtain a free API key. Add it with the `/setipkey <API key>` command, assuming `<API key>` is a valid API key. If you want to remove the functionality again, use the `/removeipkey` command. This will also erase all country and time zone data. There is Google API functionality as well, which is used for YouTube link information and the `/listen` command. Similarly to the IPinfoDB API system, you can use `/setgooglekey <API key>` to enable it and `/removegooglekey` to disable it again.

By default, the official channels are not registered. You should run the `/registerall` command (assuming you are Owner) to register them and give them their default settings. For this reason you should, if your server is new, decide your main channel name before running the command; since, if you change your main channel name, you will have to register it again. If your server is running in a command line environment, run `/owner <username>` in said command line to make yourself Owner.

### Plugins

There are optional script files as well; those are within a folder called `plugins`; the main files are in the folder called `scripts`. If you do not want the plugins, simply do not extract them from the zip once you have downloaded the scripts. The plugins consist of fun commands and a few small game channel scripts, including a very unfinished (and therefore not yet playable) own Safari. It is not a modification of the official side channel, but written from scratch.

You can also add your own plugins. Every JavaScript file present in the `plugins` folder will be executed on startup and when the `/reload` command is used.
