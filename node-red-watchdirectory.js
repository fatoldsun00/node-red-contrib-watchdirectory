module.exports = function(RED) {
  var chokidar = require('chokidar');

  function WatchDirectory(config) {
    RED.nodes.createNode(this,config);
   

    console.log(this,"**************************************************");
  }

  WatchDirectory.prototype.showListening = function() {
    this.status({fill:"green", shape: "ring", text: "File added"})
  }


  RED.nodes.registerType("watchdirectory",WatchDirectory);
}
