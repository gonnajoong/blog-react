const config = require(`./${process.env.NODE_ENV}`);
let common = require('./common');

for (let k in common) {
    let std = config[k];
    if (typeof std === 'number') {
        if (config[k] !== undefined) {
            common[k] = config[k];
        }
    } else if (typeof std === 'string') {
        if (config[k]) {
            common[k] = config[k];
        }
    } else if (std instanceof Object) {
        for (let kk in std) {
            if (std[kk] !== undefined) {
                common[k][kk] = std[kk];
            }
        }
    } else if (std instanceof Array) {
        for (let i=0; i<std.length; i++) {
            common[k][i] = std[i];
        }
    }
}

module.exports = common;
