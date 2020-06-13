const fs = require('fs')

function getInjectorCode(name, code) {
    return `
        /** SNOWPACK INJECT STYLE: ${name} */
        function __snowpack__injectStyle(css) {
        const headEl = document.head || document.getElementsByTagName('head')[0];
        const styleEl = document.createElement('style');
        styleEl.type = 'text/css';
        if (styleEl.styleSheet) {
            styleEl.styleSheet.cssText = css;
        } else {
            styleEl.appendChild(document.createTextNode(css));
        }
        headEl.appendChild(styleEl);
        }
        __snowpack__injectStyle(${JSON.stringify(code)});\n
    `;
}

function rollupPluginCss() {
    return {
        name: 'snowpack:rollup-plugin-css',

        // resolveId(source, importer) {
        //     console.log('importer', importer,source)
        //     if (!source.endsWith('css')) {
        //         return null;
        //     }
        //     return this.resolve(source, importer, {
        //         skipSelf: true
        //     }).then(resolved => {
        //         return resolved || null;
        //     });
        // },
        load(id) {
            if (!id.endsWith('css')) {
                return null;
            }
            const code = fs.readFileSync(id, {
                encoding: 'utf8'
            });
            const humanReadableName = id.replace(/.*node_modules[\/\\]/, '').replace(/[\/\\]/g, '/');
            return getInjectorCode(humanReadableName, code);
        }
    };
}

module.exports = rollupPluginCss