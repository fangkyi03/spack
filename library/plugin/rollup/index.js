const roll = require('rollup')
const fs = require('fs')
const rollupInputConfig = require('./config/input')

function diffImport(newImport,oldImport) {
    const obj = {}
    Object.keys(newImport).forEach((e)=>{
        if (!oldImport[e]) {
            obj[e] = newImport[e]
        }
    })
    return {
        len:Object.keys(obj).length,
        obj
    }
}

function getOldImport() {
    if (fs.existsSync('cache/importMap.json')) {
        const importMap = fs.readFileSync('cache/importMap.json', 'utf-8')
        if (importMap) {
            return JSON.parse(importMap)
        } else {
            return {}
        }
    }else {
        return {}
    }
}

function rollup ({out}) {
    return async({state})=>{
        if (state.importsObj) {
            const diffImportArr = diffImport(getOldImport(),state.importsObj)
            if (diffImportArr.len > 0) {
                console.log('打包中')
                const packageBundle = await roll.rollup(rollupInputConfig(state.importsObj))
                console.log('打包结束')
                return packageBundle.write(out);
            }else {
                return 
            }
        }else {
            return 
        }
    }
}

// class rollup {
//     constructor(configOptions) {
//         this.oldConfig = fs.existsSync('cache/importMap.json') ? JSON.parse(fs.readFileSync('cache/importMap.json')) : {}
//         this.config = configOptions
//         this.inputConfig = config.input(configOptions)
//         this.outConfig = config.out(configOptions)
//     }

//     diffImport () {
//         const {oldConfig,config} = this
//         const obj = {}
//         Object.keys(config.input).forEach((e)=>{
//             if (!oldConfig[e]) {
//                 obj[e] = config.input[e]
//             }
//         })
//         return {
//             len:Object.keys(obj).length,
//             obj
//         }
//     }

//     async execute() {
//         const diffImport = this.diffImport()
//         if (diffImport.len > 0) {
//             const packageBundle = await roll.rollup(this.inputConfig)
//             fs.writeFileSync('cache/importMap.json', JSON.stringify(this.inputConfig.input))
//             return packageBundle.write(this.outConfig);
//         }else {
//             return 
//         }
//     }
// }

module.exports = rollup