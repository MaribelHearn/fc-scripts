# fc-scripts
The Fun Community Pokémon Online server scripts. Currently still quite a mixture of old code and new code, though everything does work. The scripts were never intended to be released to the public, and as a result, many things had to be adapted to that.
Server version **2.6.2** or newer is required to run the scripts.

### About

The Fun Community scripts, used on Fun Community (of course!), are intended for small servers, with a main focus being (besides the obvious having fun) customisation and tweaking, customise settings to your liking, as well as making the most out of Pokémon Online's script functions. They have been developed since the adoption of Pokémon Online V2 by FC, on July 9, 2012, and are loosely based on the V1 server scripts by [Lutra](https://github.com/Jakilutra) (credit to him for those great scripts!). Fun Community used to run the Lutra scripts, but when V2 was released, it branched off and started developing the Fun Community scripts. Some functionality, such as a few methods, and tournaments, is taken from those scripts, though modified to work with these scripts.

### How to use

Click 'Download ZIP' to download this repository, then extract the ZIP into your server folder. The scripts will initialise the data that they use when you open your server, for which they will create a folder called `data`. Be careful if you touch this folder; you might break the scripts! If you already have a folder called `data` in your server folder, make sure you either rename or delete it before running your server with the scripts for the first time, or else they won't initialise and, therefore, won't work.

You will also need to put the `bansites.txt` and `proxy_list.txt` files from the [po-server-goodies](https://github.com/po-devs/po-server-goodies) repository in your server folder. The scripts will read these and use them when they initialise.

By default, the permanent channels are not registered. You should run the `/registerall` command (assuming you are Owner) to register them and give them their default settings. For this reason you should, if your server is new, decide your main channel name before running the command; since, if you want to change your main channel name, you will have to register it again.

The scripts offer country and time zone retrieval functionality, for which it uses the [IPinfoDB](http://ipinfodb.com/) API service. If you want this functionality, you will need to register at IPinfoDB and get a free API key. Add it with the `/setapi <API key>` command, assuming `<API key>` is a valid API key. If you want to remove the functionality again, use the `/removeapi` command. This will also erase all country and time zone data.
