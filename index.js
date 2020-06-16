const spack = require('./library/cli')
const { jsLoader } = require('./library/loader')
const { rollup,httpServer } = require('./library/plugin')
spack({
    loaders:[
        {
            test:/.js/,
            loader:[
                jsLoader()
            ]
        }
    ],
    plugin:[
        rollup({
            out:{
                dir: 'cache',
                format: 'esm',
                sourcemap: false,
                exports: 'named',
                chunkFileNames: 'common/[name]-[hash].js'
            }
        }),
        httpServer({
            port:3000,
            openBrowser:true
        })
    ]
})