const rollupPluginReplace = require('@rollup/plugin-replace')
const rollupPluginAlias = require('@rollup/plugin-alias')
const rollupPluginNodeResolve = require('@rollup/plugin-node-resolve').default
const rollupPluginJson = require('@rollup/plugin-json')
const rollupPluginCss = require('../plugin/rollupPluginCss')
const rollupPluginCommonjs = require('@rollup/plugin-commonjs')
const rollupPluginDependencyStats = require('../plugin/rollupPluginDependencyStats')
const rollupPluginReactFix = require('../plugin/rollupPluginReactFix')
const isNodeBuiltin = require('is-builtin-module')

function getRollupReplaceKeys(env) {
    const result = Object.keys(env).reduce((acc, id) => {
        const val = env[id];
        acc[`process.env.${id}`] = `${JSON.stringify(val === true ? process.env[id] : val)}`;
        return acc;
    }, {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        'process.platform': JSON.stringify('browser'),
        'process.env.': '({}).'
    });
    return result;
}

function isTruthy(item) {
    return Boolean(item);
}

function input(config) {
    // delete config.input['react-router-dom']
    // delete config.input['react']
    // delete config.input['react-dom']
    // Object.keys(config.input).forEach((e)=>{
    //     if (e.indexOf('css') !== -1) {
    //         delete config.input[e]
    //     }
    // })

        // config.input = {
        //     'react': config.input['react'],
        //     'antd/es/button':config.input['antd/es/button'],
        //     'antd/es/button/style/css': config.input['antd/es/button/style/css'],
        //     'react-dom':config.input['react-dom']
        // }
    return {
        external: [],
        treeshake: {
            moduleSideEffects: 'no-external'
        },
        cache:config.input,
        ...config,
        plugins: [
            rollupPluginReplace(getRollupReplaceKeys({
                NODE_ENV: "development"
            })),
            rollupPluginAlias({
                entries: Object.entries({}).map(([alias, mod]) => ({
                    find: alias,
                    replacement: mod
                }))
            }), 
            rollupPluginNodeResolve({
                mainFields: ['browser:module', 'module', 'browser', 'main'].filter(isTruthy),
                extensions: ['.mjs', '.cjs', '.js', '.json'],
                // whether to prefer built-in modules (e.g. `fs`, `path`) or local ones with the same names
                preferBuiltins: false,
                dedupe: []
            }), 
            rollupPluginJson({
                preferConst: true,
                indent: '  ',
                compact: false,
                namedExports: true
            }), 
            rollupPluginCss(), 
            rollupPluginCommonjs({
                extensions: ['.js', '.cjs'],
                // namedExports: knownNamedExports
            }), 
            rollupPluginDependencyStats(info => dependencyStats = info), 
            rollupPluginReactFix(), 
        ].filter(Boolean),
        onwarn(warning, warn) {
            if (warning.code === 'CIRCULAR_DEPENDENCY') {
                // if (!isCircularImportFound) {
                //     isCircularImportFound = true;
                //     // logUpdate(`Warning: 1+ circular dependencies found via "${warning.importer}".`);
                // }
                return;
            }
            if (warning.code === 'UNRESOLVED_IMPORT') {
                // if (isNodeBuiltin(warning.source)) {
                //     // console.log(chalk.dim(`  '${warning.source}' is a Node.js builtin module that won't exist in the browser.`));
                //     // console.log(chalk.dim(`  Search pika.dev for a web-friendly alternative to ${chalk.bold(warning.importer)}`));
                //     // console.log(chalk.dim(`  Or, add ${chalk.bold('"rollup-plugin-node-polyfills"')} to installOptions.rollup.plugins in your Snowpack config file.`));
                // } else {
                //     // console.log(chalk.dim(`  Make sure that the package is installed and that the file exists.`));
                // }
                // return;
            }
            // warn(warning);
        }
    };
}

module.exports = input