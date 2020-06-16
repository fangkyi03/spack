const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

function rollupPluginDependencyStats(cb) {
    let outputDir;
    let existingFileCache = {};
    let statsSummary = {
        direct: {},
        common: {}
    };
    function buildExistingFileCache(bundle) {
        for (let fileName of Object.keys(bundle)) {
            const filePath = path.join(outputDir, fileName);
            if (fs.existsSync(filePath)) {
                const { size } = fs.statSync(filePath);
                existingFileCache[fileName] = size;
            }
        }
    }
    function compareDependencies(files, type) {
        for (let {
            fileName,
            contents
        } of files) {
            const size = contents.byteLength;
            statsSummary[type][fileName] = {
                size: size,
                gzip: zlib.gzipSync(contents).byteLength,
                brotli: zlib.brotliCompressSync ? zlib.brotliCompressSync(contents).byteLength : 0
            };
            if (existingFileCache[fileName]) {
                const delta = (size - existingFileCache[fileName]) / 1000;
                statsSummary[type][fileName].delta = delta;
            }
        }
    }
    return {
        name: 'snowpack:rollup-plugin-stats',
        generateBundle(options, bundle) {
            outputDir = options.dir;
            buildExistingFileCache(bundle);
        },
        writeBundle(options, bundle) {
            const directDependencies = [];
            const commonDependencies = [];
            for (const [fileName, assetOrChunk] of Object.entries(bundle)) {
                const raw = assetOrChunk.type === 'asset' ? assetOrChunk.source : assetOrChunk.code;
                const contents = Buffer.isBuffer(raw) ? raw : typeof raw === 'string' ? Buffer.from(raw, 'utf8') : Buffer.from(raw);
                if (fileName.startsWith('common')) {
                    commonDependencies.push({
                        fileName,
                        contents
                    });
                } else {
                    directDependencies.push({
                        fileName,
                        contents
                    });
                }
            }
            compareDependencies(directDependencies, 'direct');
            compareDependencies(commonDependencies, 'common');
            cb(statsSummary);
        }
    };
}

module.exports = rollupPluginDependencyStats