const cli = require('../cli')
function spack(config) {
    const { mode = 'dev' } = config
    if ( mode == 'dev') {
        return new cli.dev(config)
    }else {
        cli.build(config)
    }
}

module.exports = spack