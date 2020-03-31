module.exports = function(RED) {
    const chokidar = require('chokidar')
    const path = require('path');

  function  WatchDirectory(config) {
    RED.nodes.createNode(this,config);
    this.folder = path.normalize( config.folder).replace(/\\/g,"/")
    this.recursive = config.recursive ? true : false;
    this.typeEvent = config.typeEvent;
    this.ignoreInitial = config.ignoreInitial;
    this.ignoredFiles = config.ignoredFiles || false;
    this.startListening();  
  }

  WatchDirectory.prototype.startListening = function() {
    var node = this;
    // Initialize watcher.
    const watcher = chokidar.watch(node.folder, {
      ignored: (filename) => {
        filename = path.normalize( filename ).replace(/\\/g,"/")
        let file = path.basename(filename) 
        //filename.match(/([^\\ | ^/]*)\..{3}$/)
        if (file && file.length){ 
          re = new RegExp(node.ignoredFiles)
          return re.test(file)
        }      
      },
      persistent: true,
      depth: node.recursive,
      ignoreInitial: node.ignoreInitial,
      awaitWriteFinish:true,
      usePolling:true,
    });

    switch (node.typeEvent) {
      case 'create': 
        watcher.on('add', filename => {
          const file = path.basename(filename) 
          const fileDir = path.dirname(filename) 
          node.send({file,fileDir,filename, payload: filename})
        })
        break;
      case 'update': 
        watcher.on('change', path => log(`File ${path} has been added`))
        break;
      case 'delete': 
        watcher.on('unl', path => log(`File ${path} has been added`))
        break;
    }

    watcher.on('all', (event,path) => {
      node.status({fill:"purple", shape: "ring", text: "work on "+event+" "+ path});
    }).on('ready', () => {
      node.status({fill:"green", shape: "ring", text: "Clear"})
    })


    //on close
    node.on('close', () => {
      watcher.close()
    })
  }
  RED.nodes.registerType("watch-directory",WatchDirectory);
}
