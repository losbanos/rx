const path = require('path');

const resolve = loc => path.resolve(__dirname, loc);

const PORT = 8551;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const configuration = {
    pages: {
        index: {
            entry: resolve('src/main.ts'),
            template: resolve('public/index.html'),
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        poke: {
            entry: resolve('src/main/poke.ts'),
            template: resolve('public/poke.html'),
            filename: 'poke.html',
            chunks: ['chunk-vendors', 'chunk-common', 'poke']
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('@views', resolve('src/views'));
        config.resolve.alias.set('@components', resolve('src/components'));
        config.resolve.alias.set('@service', resolve('src/service'));
        config.resolve.alias.set('@apis', resolve('src/api'));
        config.resolve.alias.set('@core', resolve('src/core'));
    },
    devServer: {
        port: PORT,
        historyApiFallback: {
            rewrites: [
                // {from: /^\/poke\/?.*/, to: path.posix.join('/', 'poke.html')},
                {from: /./, to: path.posix.join('/', 'index.html')}
            ]
        }
    }
};

module.exports = configuration;
