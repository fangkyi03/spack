const spack = require('./library').spack
const { jsLoader } = require('./library/loader')
const { rollup } = require('./library/plugin')
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
        rollup()
    ]
})