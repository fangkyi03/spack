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
    if (fs.existsSync('web_modules/importMap.json')) {
        const importMap = fs.readFileSync('web_modules/importMap.json', 'utf-8')
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
            if (!fs.existsSync('web_modules')) {
                fs.mkdirSync('web_modules')
            }
            const diffImportArr = diffImport(state.importsObj, getOldImport())
            if (diffImportArr.len > 0) {
                console.log('打包中')
                const packageBundle = await roll.rollup(rollupInputConfig(state.importsObj))
                fs.writeFileSync('web_modules/importMap.json', JSON.stringify(state.importsObj), 'utf-8')
                console.log('打包结束')
                
                return packageBundle.write(out);
            }else {
                fs.writeFileSync('web_modules/importMap.json',JSON.stringify(state.importsObj),'utf-8')
                return 
            }
        }else {
            return 
        }
    }
}

module.exports = rollup