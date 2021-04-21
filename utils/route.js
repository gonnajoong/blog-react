const getPath = () => {
    return location.pathname;
};

const getQuery = () => {
    let temp = {};
    if (location.search) {
        location.search.replace('?', '').split('&').forEach((item) => {
            let keyValue = item.split('=');
            if (keyValue[1]) {
                temp[keyValue[0]] = decodeURIComponent(keyValue[1]);
            }
        });
    }
    return temp;
};

const returnQuery = (keyValue) => {
    let query = '';
    if (keyValue) {
        Object.keys(keyValue).forEach((key, index) => {
            let value = keyValue[key];
            if (value !== undefined && value !== null) {
                if (index) {
                    query += '&';
                } else {
                    query += '?';
                }
                query += key + '=' + value;
            }
        });
    }
    return query;
};

const generateQuery = (obj) => {
    return Object.assign(Object.assign({}, obj), getQuery());
};

export {
    getPath,
    getQuery,
    returnQuery,
    generateQuery
};
