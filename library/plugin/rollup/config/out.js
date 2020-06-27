function out(config) {
    return {
        dir: 'web_modules',
        format: 'esm',
        sourcemap: false,
        exports: 'named',
        chunkFileNames: 'common/[name]-[hash].js'
    };
}
module.exports = out