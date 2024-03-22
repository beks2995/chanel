const path = require('path');

const resolvePath = p => path.resolve(__dirname, p);

module.exports = {
    webpack: {
        alias: {
            '@components': resolvePath('./src/components'),
            '@pages': resolvePath('./src/pages'),
            '@store': resolvePath('./src/store'),
        }
    }
};
