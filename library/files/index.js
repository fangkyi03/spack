
const babel = require('@babel/core')
const traverse = require('@babel/traverse').default
const fs = require('fs')
const p = require('path')
const r = require('../rollup')
const s = require('../server')
const cache = require('../cache')

class FileContainers {

    constructor(basePath) {
        this.basePath = basePath
        this.imports = []
        this.importsObj = {}
        this.server = new s()
        this.rollup = null
    }

    loadFile(filePath) {
        return fs.readFileSync(filePath,'utf-8')
    }

    scanImport(code, filePath) {
        const tranform = babel.transform(code)
        const ast = babel.parseSync(tranform.code)
        const that = this
        traverse(ast,{
            ImportDeclaration(path){
                const source = path.node.source
                if (source && source.value.indexOf('./') == -1) {
                    if (!that.importsObj[source.value]) {
                        const nodePath = p.join(that.basePath, 'node_modules')
                        const indexjs = p.join(nodePath, source.value, 'index.js')
                        const js = p.join(nodePath,source.value) + '.js'
                        if (fs.existsSync(indexjs)) {
                            that.importsObj[source.value] = indexjs
                        }else {
                            that.importsObj[source.value] = js
                        }
                    }
                    source.value = '/web_modules/' + source.value + '.js'
                }else if (source.value.indexOf('.css')!==-1){
                    source.value += '.proxy.js'
                }
            }
        })
        const tranText = babel.transformFromAstSync(ast, tranform.code)
        cache.add(filePath,tranText.code)
    }

    loadCss (fileContent,filePath) {
        const str = `
            export let code = ${JSON.stringify(fileContent)};
            let json = ${JSON.stringify({'a1':'a1'})};
            export default json;

            const styleEl = document.createElement("style");
            const codeEl = document.createTextNode(code);
            styleEl.type = 'text/css';

            styleEl.appendChild(codeEl);
            document.head.appendChild(styleEl);
        `
        cache.add(filePath, str)
    }

    scanFolder(dirPath) {   
        const dirs = fs.readdirSync(dirPath)
        dirs.forEach((e)=>{
            const filePath = p.join(dirPath,e) 
            if (e == '.DS_Store') return 
            if (fs.statSync(filePath).isDirectory()) {
                this.scanFolder(filePath)
            }else {
                const baseName = p.extname(filePath)
                const fileContent = this.loadFile(filePath)
                if (['.jsx','.js','.ts','.tsx'].indexOf(baseName) !== -1) {
                    this.scanImport(fileContent, filePath)
                }else if (baseName.indexOf('.css') !== -1){
                    this.loadCss(fileContent,filePath + '.proxy.js')
                }
            }
        })
    }

    execute () {
        this.rollup = new r({
            input: this.importsObj
        })
        this.rollup.execute()
        .then(()=>{
            this.server.openServer()
        })
    }
}

module.exports = FileContainers