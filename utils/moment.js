import moment from 'utils/moment';

export default () => {
    moment.locale('kr', {
        months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
        weekdaysShort : '일._월._화._수._목._금._토.'.split('_'),
        weekdaysMin : '일_월_화_수_목_금_토'.split('_')
    });
};