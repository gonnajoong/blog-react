const standard = require('./' + process.env.NODE_ENV + '.js');
let commonStandard = require('./common.js');

for (let k in commonStandard) {
    let std = standard[k];
    if (typeof std === 'number') {
        if (standard[k] !== undefined) {
            commonStandard[k] = standard[k];
        }
    } else if (typeof std === 'string') {
        if (standard[k]) {
            commonStandard[k] = standard[k];
        }
    } else if (std instanceof Object) {
        for (let kk in std) {
            if (std[kk] !== undefined) {
                commonStandard[k][kk] = std[kk];
            }
        }
    } else if (std instanceof Array) {
        for (let i=0; i<std.length; i++) {
            commonStandard[k][i] = std[i];
        }
    }
}

module.exports = commonStandard;
