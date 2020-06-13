const express = require('express')
const app = express()
const mime = require('mime-types')
const etag = require('etag')
const p = require('path')
const fs = require('fs')
const c = require('../cache')
const cache = require('../cache')
const watch = require('watch')

class Server {
    constructor(config){
        this.config = config
    }

    getData(body, res) {
        const ETag = etag(body);
        const headers = {
            'Content-Type': mime.contentType('js') || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*',
            ETag,
            Vary: 'Accept-Encoding'
        };
        res.writeHead(200, headers);
        res.write(body, 'utf-8');
        res.end()
    }

    readFile(filePath) {
        return fs.readFileSync(p.join(process.cwd(),'public',filePath),'utf-8')
    }

    readCacheFile(filePath) {
        return fs.readFileSync(p.join(process.cwd(),'cache',filePath),'utf-8')
    }

    readSrcFile(filePath) {
        const key = cache.getName(filePath)
        if (cache.has(key)) {
            return cache.get(key)
        }else {
            return ''
        }
    }

    readPublicFile (filePath) {
        return fs.readFileSync(p.join(process.cwd(), 'public', filePath), 'utf-8')
    }

    onServerCallBack (req,res) {
        if (req.path.indexOf('web_modules') !== -1) {
            this.getData(this.readCacheFile(req.path.replace('/web_modules/','')), res)
        } else if (req.path == '/' || req.path == '/favicon.ico'){
            res.send(this.readFile('index.html'))
        }else if (req.path.indexOf('dist') !== -1 ){
            this.getData(this.readPublicFile(req.path.replace('/dist/', '')), res)
        }else {
            this.getData(this.readSrcFile(req.path.replace('/src/', 'src/')), res)
        }
    }

    openServer() {
        app.get('*',(req,res)=>this.onServerCallBack(req,res))
        app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))
        var that = this
        watch.createMonitor(p.join(process.cwd(),'src'), (monitor)=>{
            // monitor.files[p.join(process.cwd(),'src','index.jsx')]
            monitor.on('changed',(data)=>{
                console.log('that',)
            })
        })
    }
}

module.exports = Server