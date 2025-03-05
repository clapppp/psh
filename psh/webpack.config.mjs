export default {
    module: {
        rules: [
            {
                test: /\.gltf$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/models',
                        },
                    },
                ],
            },
        ],
    },
};
