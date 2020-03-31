# node-red-contrib-watchdirectory
[![BuyMeCoffee][buymecoffee-shield]][buymecoffee-link]

A watcher file/folder changed for [Node-RED](https://nodered.org/), based on [chokidar](https://github.com/paulmillr/chokidar)

## Why a third node for watching folder ?

Because the natif node watcher is low level, and trigger "add file" event before file is completed copy on disk. then we need delai and RBE node ...

The other watcher (wfwatcher) check recursively and attach filename to payload... Most of nodes who work with file check msg.filename.

So this plugin attach to msg :
 - file : the name of the file, with extension
 - fileDir : Directory of file
 - filename: the complete path to the file
 - payload: the complete path to the file

On configuration side we can : 

 - Select the folder to watch (of course ....)
 - Type event : create, update, delete
 - Check for recursively or not
 - ignore file who are in directory are start (or not)
 - ignore files on regex based, only String !, not type the / for regextype (I.E. ^test\.(txt|xls) not /^test\.(txt|xls)/)

### Prerequisites

Have Node-RED installed and working, if you need to
install Node-RED see [here](https://nodered.org/docs/getting-started/installation).

- [Node.js](https://nodejs.org) v10.0 or newer
- [Node-RED](https://nodered.org/) v1.0 or newer

### Installation
 
Install via Node-RED Manage Palette

```
node-red-contrib-watchdirectory
```

Install via npm

```shell
$ cd ~/.node-red
$ npm install node-red-contrib-watchdirectory
# then restart node-red
```

## Contribute

PR are welcome

[release-link]: https://github.com/fatoldsun00/node-red-contrib-watchdirectory
[release-shield]: https://img.shields.io/github/v/release/zachowj/node-red-contrib-home-assistant-websocket?style=for-the-badge
[buymecoffee-link]: https://www.buymeacoffee.com/fatoldsun00
[buymecoffee-shield]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png
