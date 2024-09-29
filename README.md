![](https://img.shields.io/badge/Foundry-v12-informational) 

# Hide Player Camera

This module for Foundry VTT allows Game Masters to automatically hide the cameras of specified users in the audio/video chat. It’s particularly useful for live streams or recorded sessions where non-player users, such as OBS or virtual cameras, should not be displayed.


## How to install 

1. Copy `https://github.com/Oxy949/fvtt-hide-camera/releases/latest/download/module.json` 
2. Paste it in your Foundry VTT, wait for install
3. Enable the module in your world
4. Enjoy!

## Module settings

* Players UUID's to Hide - Specify the UUID's of the players whose cameras should be hidden, separated by commas without space.
Example: `User.P8Nf7OHeWo3ERqFB,User.dbM9ONZc3K10dZmh`


## How it's work?

This code uses the `renderPlayerList` hook in Foundry VTT to automatically hide `.camera-view[data-user="${user.id}"]` elements.