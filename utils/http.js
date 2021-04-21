import axios from 'axios';

const refineError = error => {
    let data = error.response.data;

    if (data) {
        if (data instanceof Array) {
            data = data[0];
        } else if (data instanceof Object) {

        } else {
            data = "";
        }
    } else {
        data = "";
    }
    return {
        status: error.response.status,
        data: data
    };
};

const generateQuery = query => {
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
            return '';
        }
    } else {
        return '';
    }
};

class Http {
    constructor(url) {
        this.url = url;
        this.options = {};
    }

    post(body) {
        return axios.post(this.url, body, this.options).catch(refineError);
    }

    postFormData(body) {
        let url = this.url;
        return axios.post(url, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch(refineError);
    }

    put(body) {
        let url = this.url;
        if (body.id) {
            url += '/' + body.id;
            delete body.id;
        }
        return axios.put(url, body, this.options).catch(refineError);
    }

    get(id) {
        return axios.get(this.url + '/' + id, this.options).catch(refineError);
    }

    gets(query) {
        return axios.get(this.url + generateQuery(query), this.options).catch(refineError);
    }

    del() {
        return axios.delete(this.url, this.options).catch(refineError);
    }

    deleteWithParams(params) {
        let url = this.url;
        for(let i=0; i<params.length; i++) {
            url += '/' + params[i];
        }
        return axios({
            method: "delete",
            url: url,
            headers: this.options.headers
        }).catch(refineError);
    }

    delete(query) {
        let url = this.url;
        if (query.id) {
            url += '/' + query.id;
            delete query.id;
        }
        return axios({
            method: 'delete',
            url: url,
            data: query,
            headers: this.options.headers
        }).catch(refineError);
    }
}

const process = (callback) => ({status, data}) => {
    callback(status, data);
};

const validator = (data, acceptable, essential) => {
    return new Promise((resolve, reject) => {
        let body = {};
        acceptable.forEach((key) => {
            if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
                body[key] = data[key];
            }
        });
        for (let i=0; i<essential.length; i++) {
            const key = essential[i];
            if (data[key] === undefined || data[key] === null || data[key] === '') {
                return reject({
                    status: 400,
                    data: {
                        message: '필수 요청 값이 없습니다.'
                    }
                });
            }
        }
        resolve(body);
    });
};

export {
    generateQuery,
    process,
    validator
};

export default (url) => {
    return new Http(url);
};
