module.exports = {
    attachZero,
    date: (data, pattern) => {
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
    },
    dateToDb: (data) => {
        let temp = new Date(data);
        let year = temp.getFullYear(),
            month = temp.getMonth() + 1,
            date = temp.getDate(),
            hour = temp.getHours(),
            minute = temp.getMinutes(),
            second = temp.getSeconds();
        return `${year}-${attachZero(month)}-${attachZero(date)} ${attachZero(hour)}:${attachZero(minute)}:${attachZero(second)}`;
    },
    nextYearMonth: (year, month) => {
        if (month === 12) {
            return {
                year: year + 1,
                month: 1
            };
        } else {
            return {
                year,
                month: month + 1
            };
        }
    }
};

function attachZero (data) {
    let temp = Number(data);
    if (temp < 10 && temp >= 0) {
        return '0' + data;
    } else {
        return data;
    }
}
