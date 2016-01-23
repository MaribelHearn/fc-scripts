# fc-scripts
The Fun Community server scripts. Currently still quite a mixture of old code and new code, though everything does work and the old code has mostly been updated to my current standards. I never intended to release the scripts to the public, and as a result, many things had to be adapted to that. Recently, however, I became active in the main server community, and decided to ready my scripts for release for once. I have been spending time getting my scripts ready for release, and now, here they are!

Server version **2.6.2** or newer is required to run the scripts.

### About

The Fun Community scripts, used on my server Fun Community of course, are intended for small servers, with a main focus being (besides the obvious having fun) customisation and tweaking, customise settings to your liking, as well as making the most out of Pokémon Online's script functions. They have been developed by me since the adoption of V2 by Fun Community , on July 9, 2012, and are loosely based on the V1 server scripts by @Lutra. Fun Community used to run the Lutra scripts, with my own code added to it (which has existed since July 2011, like my server), but when V2 was released, I decided to branch off and started developing the Fun Community scripts. Some functionality, such as a few methods, some general implementation and tours, is taken from the Lutra scripts, though modified to work with these scripts.

### How to use

Click 'Download ZIP' to download this repository, then extract the ZIP into your server folder. The scripts will initialise the data that they use when you open your server, for which they will create a folder called `data`. Be careful if you touch this folder; you might break the scripts! If you by any chance already have a folder called `data` in your server folder, make sure you either rename or delete it before running your server with the scripts for the first time, or else they won't initialise and, therefore, won't work.

You will also need to put the `bansites.txt` and `proxy_list.txt` files from the [po-server-goodies](https://github.com/po-devs/po-server-goodies) repository in your server folder. The scripts will read these and use them when they initialise.

By default, the official channels are not registered. You should run the `/registerall` command (assuming you are Owner) to register them and give them their default settings. For this reason you should, if your server is new, decide your main channel name before running the command; since, if you change your main channel name, you will have to register it again.

The scripts offer country and time zone retrieval functionality, for which it uses the [IPinfoDB](http://ipinfodb.com/) API service. If you want this functionality, you will need to register at IPinfoDB and get a free API key. Add it with the `/setapi <API key>` command, assuming `<API key>` is a valid API key. If you want to remove the functionality again, use the `/removeapi` command. This will also erase all country and time zone data.

### Plugins

There are optional script files as well; those are within a folder called `plugins`; the main files are in the folder called `scripts`. If you do not want the plugins, simply do not extract them from the zip once you have downloaded the scripts. The plugins consist of fun commands and a few small game channel scripts, including a very unfinished (and therefore not yet playable) own version of Safari.