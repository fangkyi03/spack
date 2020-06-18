const fs = require('fs')
const p = require('path')
class cache {
    constructor() {
        this.cache = {}
    }

    has (key) {
        return !!this.cache[key]
    }

    getName(key) {
        const isIndexof = key.indexOf('.') !== -1
        if (isIndexof){
            return key
        }else {
            let isFile = true
            if (fs.existsSync(key)) {
                isFile = fs.statSync(key).isFile()
            }
            const extname = ['.js','.jsx','.ts','.tsx']
            let find = null
            if (isFile) {
                find = extname.find((e) => fs.existsSync(key + e))
                return key + find
            }else {
                find = extname.find((e) => fs.existsSync(p.join(key,'index' + e)))
                return p.join(key,'index' + find)
            }
        }
    }

    add (key,value) {
        this.cache[key] = value
    }

    get (key) {
        return this.cache[key] 
    }
    
    del (key) {
        delete this.cache[key]
    }
}

module.exports = new cache()