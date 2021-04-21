const attachZero = (data) => {
    let temp = Number(data);
    if (temp < 10 && temp >= 0) {
        return '0' + data;
    } else {
        return data;
    }
};

const date = (data, pattern) => {
    let temp = new Date(data);

    const yyyy = temp.getFullYear();
    const HH = temp.getHours();
    const dateObject = {
        yyyy: yyyy,
        MM: attachZero(temp.getMonth() + 1),
        dd: attachZero(temp.getDate()),
        yy: yyyy.toString().substr(2, 4),
        HH: attachZero(HH),
        hh: attachZero(HH % 12),
        mm: attachZero(temp.getMinutes()),
        ss: attachZero(temp.getSeconds())
    };

    Object.keys(dateObject).forEach(function (key) {
        pattern = pattern.replace(key, dateObject[key]);
    });

    return pattern;
};

const timestampToDate = (data) => {
    return new Date(data.replace(' ', 'T') + '.000Z');
};

const empty = (data) => {
    return (data ? data : '');
};

const emptyAll = (data, fields) => {
    let temp = Object.assign({}, data);
    fields.forEach((field) => {
        temp[field] = empty(temp[field]);
    });
    return temp;
};

const phoneNum = data => {
    if (data) {
        if (data.length === 9) {
            return data.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
        } else if (data.length === 10) {
            return data.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        } else if (data.length === 11) {
            return data.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else {
            return 'wrong phone num';
        }
    } else {
        return '';
    }
};

export {
    attachZero,
    date,
    timestampToDate,
    empty,
    emptyAll,
    phoneNum,
};

export default {
    attachZero,
    date,
    timestampToDate,
    empty,
    emptyAll,
    phoneNum,
};
