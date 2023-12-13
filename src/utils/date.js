import moment from 'moment';
export const dateHanlder = (date) => {
  let now = moment();
  let momentDate = moment(date);
  let DateByHourAndMin = momentDate.format('HH:mm');
  let time = momentDate.fromNow(true);
  const getDay = () => {
    let days = time.split(' ')[0];
    if (Number(days) < 8) {
      return now.subtract(Number(days), 'days').format('dddd');
    } else {
      return momentDate.format('DD/MM/YYY');
    }
  };
  if (time === 'a few seconds') {
    return 'Now';
  }
  if (time.search('minute') !== -1) {
    let mins = time.split(' ')[0];
    if (mins === 'a') {
      return '1 min';
    } else {
      return `${mins} min`;
    }
  }
  if (time.search('hour') !== -1) {
    return DateByHourAndMin;
  }
  if (time === 'a day') {
    return 'Yesterday';
  }
  if (time.search('days') !== -1) {
    return getDay();
  }
  return time;
};
