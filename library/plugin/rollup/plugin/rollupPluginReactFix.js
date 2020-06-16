const path = require('path')
function rollupPluginReactFix() {
    return {
        name: 'snowpack:rollup-plugin-react-fix',
        transform(code, id) {
            if (id.endsWith(path.join('react', 'index.js')) && !code.includes('as __moduleExports')) {
                return code + `\nexport { react as __moduleExports };`;
            }
            if (id.endsWith(path.join('react-dom', 'index.js')) && !code.includes('as __moduleExports')) {
                return code + `\nexport { reactDom as __moduleExports };`;
            }
        }

    };
}

module.exports = rollupPluginReactFix