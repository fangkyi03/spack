const lessLoader = require('./less')
const jsLoader = require('./jsLoader')
const cssLoader = require('./cssLoader').default
module.exports = {
    lessLoader,
    jsLoader,
    cssLoader
}