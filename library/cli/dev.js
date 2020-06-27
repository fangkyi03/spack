const fs = require('fs')
const p = require('path')
const watch = require('watch')
const WebSocketServer = require('ws').Server
const tool = require('../command/tool')
const chokidar = require('chokidar')
const child_process = require('child_process')
class dev {
    constructor(config) {
        this.state = {}
        this.config = this.merge(config,this.getDefault())
        // this.copyComponent()
        this.scanDir(this.config.input)
        this.startPlugin(this.config.plugin)
        this.startWebSocket()
        this.startWatcher()
    }

    copyComponent () {
        child_process.execSync('cp -r library/components web_modules/')
    }

    merge (a,b) {
        return {...a,...b}
    }

    getDefault () {
        return {
            input:'src',
            cwd:'./'
        }
    }

    compose (findLoader) {
        if (findLoader.length == 1) {
            return findLoader[0]
        }else {
            return findLoader.reduce((a,b) => (...arg) => a(b(...arg)))
        }
    }

    getLoaderParams(filePath, extName) {
        return {
            context:fs.readFileSync(filePath,'utf-8'),
            config:this.config,
            filePath:tool.getName(filePath),
            state:this.state
        }
    }

    sendLoaderActive(filePath) {
        const { loaders } = this.config
        const extName = p.extname(filePath)
        const findLoader = loaders.filter((e) => e.test.test(extName)).reduce((a, b) => a.concat(b.loader), [])
        if (findLoader.length == 0) return null
        this.compose(findLoader)(this.getLoaderParams(filePath, extName)) 
    }

    scanDir(dir) {
        const dirs = fs.readdirSync(dir)
        const that = this
        dirs.forEach((e) => {
            const filePath = p.join(dir, e)
            if (e == '.DS_Store') return
            if (fs.statSync(filePath).isDirectory()) {
                this.scanDir(filePath)
            } else {
                that.sendLoaderActive(filePath)
            }
        })
    }

    getPluginParam () {
        return {
            state:this.state
        }
    }

    async startPlugin(plugin) {
        for(let i = 0 ;i < plugin.length;i++ ) {
            await plugin[i](this.getPluginParam())
        }
    }
    
    startWebSocket() {
        this.wss = new WebSocketServer({ port: 8001 });
        this.wss.on('connection',(wss)=>{
            const watch  = chokidar.watch('src',{
                // ignored: config.exclude,
                persistent: true,
                ignoreInitial: true,
                disableGlobbing: false
            })
            watch.on('change', (filePath)=>{
                this.sendLoaderActive(filePath)
                this.startPlugin(this.config.plugin)
                wss.send('1')
            })
        })
    }

    startWatcher() {

    }
}
module.exports = dev