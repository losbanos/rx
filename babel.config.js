module.exports = api => {
    api.cache.never();

    let presets = [
        ['@vue/app', {
            targets: {
                browsers: [
                    '> 0.25%',
                    'last 1 versions',
                    'not dead'
                ]
            },
            ignoreBrowserslistConfig : false
        }]
    ];

    return {
        presets: presets
    }
};
