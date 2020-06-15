const BAST_PATH = './'
const f = require('./library/files')
const p = require('path')
const file = new f(BAST_PATH)
file.scanFolder(p.join(BAST_PATH,'src'))
file.execute()

// const a = {
//     loaders:[
//         {
//             test:/.js/,
//             loader:[
//                 jsloader(),
//             ]
//         },
//         {
//             test:/.css/,
//             loader:[
//                 cssloader()
//             ]
//         },
//         {
//             test:/.less/,
//             loader:[
//                 lessloader(),
//                 cssloader()
//             ]
//         }
//     ],
//     plugin:[
//         httpServer(),
        
//     ]
// }
