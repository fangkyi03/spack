const express = require('express')
const app = express()
const mime = require('mime-types')
const etag = require('etag')
const p = require('path')
const fs = require('fs')
const cache = require('../../cache')

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

    readFile (filePath) {
        return fs.readFileSync(p.join(process.cwd(), filePath), 'utf-8')
    }

    readPublicFile(filePath) {
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

    createHTML(url) {
        return `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="Web site created using create-snowpack-app" />
                    <title>测试</title>
                </head>
                <body>
                    <div id="root"></div>
                    <noscript>You need to enable JavaScript to run this app.</noscript>
                    <script>
                    window.wx = {}
                    window.getApp = function() {
                        return {}
                    }
                    </script>
                    <script type="module">
                        import App from '/src/app.js';
                        import Page from '/${url}/index.js';
                        import React from '/web_modules/react.js';
                        import ReactDom from '/web_modules/react-dom.js';
                        ReactDom.render(
                            React.createElement(App,{},React.createElement(Page)),
                            document.getElementById('root')
                        );
                    </script>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
                    <script>
                    var ws = new WebSocket('ws://localhost:8001');
                    ws.onmessage = function(e){
                        console.log('接受返回数据',e)
                        window.location.reload()
                    }
                    </script>
                </body>
            </html>
        `
    }   

    onServerCallBack (req,res) {
        if (fs.existsSync(p.join(process.cwd(), req.path))) {
            if (req.path == '/') {
                return res.send(this.createHTML(p.join('src', 'pages', 'index')))
            }else if (req.path.indexOf('web_modules') !== -1) {
                return this.getData(this.readFile(req.path), res)
            }else {
                return this.getData(this.readSrcFile(req.path.replace('/src/', 'src/')), res)
            }
        } else if (fs.existsSync(p.join(process.cwd(),'src','pages',req.path))){
            return res.send(this.createHTML(p.join('src', 'pages',req.path)))
        } else {
            return this.getData(this.readSrcFile(req.path.replace('/src/', 'src/')), res)
        }
    }

    openServer() {
        app.get('*',(req,res)=>this.onServerCallBack(req,res))
        app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))
    }
}

function server(config) {
    return ({state})=> {
        if (!state.httpServer) {
            state.httpServer = true
            const httpServer = new Server(config)
            httpServer.openServer()
        }
    }
}
module.exports = server