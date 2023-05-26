module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
    "env": {
        "test": {
            "presets": [
                "@babel/preset-env",
                [
                    "@babel/preset-react",
                    {
                        "runtime": "automatic"
                    }
                ]
            ],
            "plugins": [
                function () {
                    return {
                        visitor: {
                            MetaProperty(path) {
                                path.replaceWithSourceString('process')
                            },
                        },
                    }
                },
                "@babel/plugin-transform-runtime"
            ]
        }
    }
};
