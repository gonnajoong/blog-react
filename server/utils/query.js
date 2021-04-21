module.exports = {
    attributes: (table, keys) => {
        let query = '';
        keys.forEach((key, index) => {
            if (index) query += ', ';
            query += `${table}.${key}`
        });
        return query;
    },
    generateQueryString: query => {
        if (query && query instanceof Object) {
            const keys = Object.keys(query);
            if (keys.length) {
                let queryString = '?';
                keys.forEach(function (key, index) {
                    if (index) queryString += '&';
                    queryString += key + '=' + encodeURIComponent(query[key]);
                });
                return queryString;
            } else {
                return '?';
            }
        } else {
            return '?';
        }
    }
};
