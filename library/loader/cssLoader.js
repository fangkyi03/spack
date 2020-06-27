const postCss = require('postcss')
const postCssModules = require('postcss-modules')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')
const cache = require('../cache')

function createCSS(filePath,json,text) {
    const str = `
            export let code = ${JSON.stringify(text)};
            let json = ${JSON.stringify(json)};
            export default json;
            const styleEl = document.createElement("style");
            const codeEl = document.createTextNode(code);
            styleEl.type = 'text/css';
            styleEl.appendChild(codeEl);
            document.head.appendChild(styleEl);
    `
    cache.add(filePath, str)
}

function cssLoader() {
    return (data)=>{
        return new Promise((resolve, reject) => {
            if (data.filePath.indexOf('module') !== -1) {
                postCss([
                    cssnext(),
                    cssnano(),
                    postCssModules({
                        getJSON: function () {

                        },
                        generateScopedName: "[name]__[local]___[hash:base64:5]",
                    }),
                ]).process(data.context, { from: data.filePath })
                .then((e) => {
                    const find = e.messages.find((el) => el.plugin == 'postcss-modules')
                    if (find) {
                        createCSS(data.filePath, find.exportTokens, e.css)
                        resolve()
                    }
                })  
            }else {
                postCss([
                    cssnext(),
                    cssnano(),
                ]).process(data.context, { from: data.filePath })
                .then((e) => {
                    createCSS(data.filePath, {}, e.css)
                    resolve()
                })  
            }
        })
    }
}
module.exports = cssLoader