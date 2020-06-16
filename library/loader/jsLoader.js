const babel = require('@babel/core')
const traverse = require('@babel/traverse').default
const cache = require('../cache')
const p = require('path')
const fs = require('fs')

function jsLoader() {
    return ({context,filePath,config,state}) => {
        if (!state.importsObj) state.importsObj = {}
        const tranform = babel.transform(context)
        const ast = babel.parseSync(tranform.code)
        traverse(ast, {
            ImportDeclaration(path) {
                const source = path.node.source
                if (source && source.value.indexOf('./') == -1) {
                    if (!state.importsObj[source.value]) {
                        const nodePath = p.join(config.cwd, 'node_modules')
                        const indexjs = p.join(nodePath, source.value, 'index.js')
                        const js = p.join(nodePath, source.value) + '.js'
                        if (fs.existsSync(indexjs)) {
                            state.importsObj[source.value] = indexjs
                        } else {
                            state.importsObj[source.value] = js
                        }
                    }
                    source.value = '/web_modules/' + source.value + '.js'
                } else if (source.value.indexOf('.css') !== -1) {
                    source.value += '.proxy.js'
                }
            }
        })
        const tranText = babel.transformFromAstSync(ast, tranform.code)
        cache.add(filePath, tranText.code)
    }
}
module.exports = jsLoader