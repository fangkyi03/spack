const config = require('./config')
const roll = require('rollup')
const fs = require('fs')
function rollup () {
    return ({state})=>{
        console.log('state',state)
        // roll.rollup()
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