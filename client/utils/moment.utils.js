import moment from 'moment';

const convert = {
  convertDate(date) {
    if (!date) {
      return null;
    } else if (/^\d+$/.test(date)) {
      return moment(date, 'X').format('YYYY-MM-DD');
    }
    return moment(date, 'YYYY-MM-DD').format('X');
  },
  convertInverseToFormattedDate(date) {
    if (!date) {
      return null;
    }
    return moment(date, 'YYYY-MM-DD').format('MMM DD, YYYY');
  },
};

export default convert;
