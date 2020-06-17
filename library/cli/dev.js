const fs = require('fs')
const p = require('path')
const tool = require('../command/tool')
class dev {
    constructor(config) {
        this.state = {}
        this.config = this.merge(config,this.getDefault())
        this.scanDir(this.config.input)
        this.startPlugin(this.config.plugin)
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

    scanDir(dir) {
        const { loaders } = this.config
        const dirs = fs.readdirSync(dir)
        const that = this
        dirs.forEach((e) => {
            const filePath = p.join(dir, e)
            if (e == '.DS_Store') return
            if (fs.statSync(filePath).isDirectory()) {
                scanDir(filePath)
            } else {
                const extName = p.extname(filePath)
                const findLoader = loaders.filter((e) => e.test.test(extName)).reduce((a,b)=>a.concat(b.loader),[])
                if (findLoader.length == 0) return null
                try {
                    that.compose(findLoader)(that.getLoaderParams(filePath, extName))   
                } catch (error) {
                    console.log(object)
                }
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
}
module.exports = dev