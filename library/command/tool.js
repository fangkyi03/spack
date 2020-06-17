function getName(fileName) {
    if (/.css/.test(fileName)) {
        return fileName + '.proxy.js'
    }else {
        return fileName
    }
}
module.exports = {
    getName
}