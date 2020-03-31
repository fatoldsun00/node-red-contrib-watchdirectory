module.exports = function(RED) {

  const chokidar = require('chokidar')

  function  WatchDirectory(config) {
    RED.nodes.createNode(this,config);
    this.folder = config.folder;
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
        let file = filename.match(/([^\\ | ^/]*)\..{3}$/)
        if (file && file.length){ 
          re = new RegExp(node.ignoredFiles)
          return re.test(file[0])
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
        watcher.on('add', path => {
          const [file] = path.match(/([^\\ | ^/]*)\..{3}$/)
          const [fileDir] = path.split(file)
          node.send({file,fileDir,filename: path,payload: path})
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
