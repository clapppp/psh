module.exports = {
    module: {
        rules: [
            {
                test: /\.(glb|gltf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/models',
                        },
                    },
                ],
            },
            // 다른 로더 설정들...
        ],
    },
};
