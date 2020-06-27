module.exports = function(api){
    api.cache(true);
    return {
        "presets": [
            "@babel/preset-react"
        ],
        "plugins": [
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": "css"
                }
            ],
            // [
            //     "@babel/plugin-proposal-decorators",
            //     {
            //         "legacy": true
            //     }
            // ],
            [
                "@babel/plugin-proposal-class-properties",
                {
                    "loose": true
                }
            ],
            ['./babel-plugin-ant-design-icon.js'],
            process.env.platform !== 'wechat' ? ['./babel-plugin-remax-component.js'] : {}
        ]
    }
}