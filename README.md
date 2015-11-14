# fc-scripts
The Fun Community Pokémon Online server scripts. Not intended for server use outside of Fun Community itself yet (there is still a lot of mess to be fixed); please wait patiently for a thread to appear on the Pokémon Online forums.

(Files are currently being added.)

### About

The Fun Community scripts, used on Fun Community (of course!), are intended for small servers, with a main focus being customisation; you can customise its settings to your liking! They have been developed since the release of Pokémon Online V2, on July 9, 2012, and are loosely based on the V1 server scripts by Lutra (credit to him for these great scripts!). Some functionality, such as a few methods, and tournaments, is taken from those scripts, though modified to work with these scripts.

Currently a large portion of the scripts is still quite messy, although the scripts do work. There are still at least a few features to be added, too.

### How to use

Click 'Download ZIP' to download this repository, then extract it into your server folder. The scripts will initialise the data that they use when you open your server, for which they will create a folder called 'data'. Be careful if you  touch this folder; you might break the scripts! If you already have a folder called 'data' in your server folder, make sure you either rename or delete it before running your server with the scripts for the first time, or else it won't initialise and, therefore, won't work.

By default, channels are not registered, so you will have to register the permanent channels yourself, including the main channel. For this reason you should, if your server is new, decide your main channel name before registering it; if you want to change your main channel name, you will have to register it again.

The scripts offer country and time zone retrieval functionality, for which it uses the [IPinfoDB](http://ipinfodb.com/) API service. If you want this functionality, you will need to register at IPinfoDB and get a free API key. Add it with the `/setapi <API key>` command, assuming `<API key>` is a valid API key. If you want to remove the functionality again, use the `/removeapi` command. This will also erase all country and time zone data.
