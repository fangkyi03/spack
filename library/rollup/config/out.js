function out(config) {
    return {
        dir: 'cache',
        format: 'esm',
        sourcemap: false,
        exports: 'named',
        chunkFileNames: 'common/[name]-[hash].js'
    };
}
module.exports = out