const BAST_PATH = './'
const f = require('./library/files')
const p = require('path')
const file = new f(BAST_PATH)
file.scanFolder(p.join(BAST_PATH,'src'))
file.execute()
