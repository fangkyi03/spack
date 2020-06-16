const dev = require('./dev')
const build = require('./build')

function spack(config) {
    const { mode = 'dev' } = config
    if (mode == 'dev') {
        return new dev(config)
    } else {
        build(config)
    }
}

module.exports = spack