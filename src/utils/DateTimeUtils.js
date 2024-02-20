import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';

export const DateRangeKeys = {
  TODAY: 'TODAY',
  THIS_WEEK: 'THIS_WEEK',
  THIS_MONTH: 'THIS_MONTH',
  LAST_QUARTER: 'LAST_QUARTER',
  LAST_SEMESTER: 'LAST_SEMESTER',
  THIS_YEAR: 'THIS_YEAR',
};

export const dates = [
  { code: DateRangeKeys.TODAY, description: formatMessage({ id: 'dates.today' }) },
  { code: DateRangeKeys.THIS_WEEK, description: formatMessage({ id: 'dates.thisweek' }) },
  { code: DateRangeKeys.THIS_MONTH, description: formatMessage({ id: 'dates.thismonth' }) },
  { code: DateRangeKeys.LAST_QUARTER, description: formatMessage({ id: 'dates.lastquarter' }) },
  { code: DateRangeKeys.LAST_SEMESTER, description: formatMessage({ id: 'dates.lastsemester' }) },
  { code: DateRangeKeys.THIS_YEAR, description: formatMessage({ id: 'dates.thisyear' }) },
];

export const getDateInterval = (enumValue) => {
  const today = new Date();
  let startDate, endDate;

  switch (enumValue) {
    case DateRangeKeys.TODAY:
      startDate = today;
      endDate = today;
      break;

    case DateRangeKeys.THIS_WEEK:
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
      endDate = today;
      break;

    case DateRangeKeys.THIS_MONTH:
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = today;
      break;

    case DateRangeKeys.LAST_QUARTER:
      startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
      endDate = today;
      break;

    case DateRangeKeys.LAST_SEMESTER:
      startDate = new Date(today.getFullYear(), today.getMonth() - 6, 1);
      endDate = today;
      break;

    case DateRangeKeys.THIS_YEAR:
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = today;
      break;

    default:
      throw new Error('Invalid enum value');
  }

  // Format the dates as 'YYYY-MM-DD'
  console.log(startDate,formatDate(startDate))
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return {
    startDate: formattedStartDate,
    endDate: formattedEndDate
  };
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}



// Function to get time distance based on date type
export const  getTimeDistance = (type) => {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  switch (type) {
    case DateRangeKeys.TODAY:
      now.setHours(0, 0, 0, 0);
      return [moment(now), moment(now.getTime() + (oneDay - 1000))];

    case DateRangeKeys.WEEK:
      let day = now.getDay();
      now.setHours(0, 0, 0, 0);

      if (day === 0) {
        day = 6;
      } else {
        day -= 1;
      }

      const beginTime = now.getTime() - day * oneDay;

      return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];

    case DateRangeKeys.THIS_MONTH:
      const year = now.getFullYear();
      const month = now.getMonth();
      const nextDate = moment(now).add(1, 'months');
      const nextYear = nextDate.year();
      const nextMonth = nextDate.month();
      return [
        moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
        moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
      ];

    case DateRangeKeys.LAST_QUARTER:
      const quarter = Math.floor((now.getMonth() / 3));
      const quarterStart = moment(`${now.getFullYear()}-${fixedZero(quarter * 3 + 1)}-01 00:00:00`);
      const quarterEnd = moment(moment(quarterStart).add(3, 'months').valueOf() - 1000);
      return [quarterStart, quarterEnd];

    case DateRangeKeys.LAST_QUARTER:
      const semesterStartMonth = now.getMonth() < 6 ? 0 : 6;
      const semesterStart = moment(`${now.getFullYear()}-${fixedZero(semesterStartMonth + 1)}-01 00:00:00`);
      const semesterEnd = moment(moment(semesterStart).add(6, 'months').valueOf() - 1000);
      return [semesterStart, semesterEnd];

    case DateRangeKeys.THIS_YEAR:
      const yearStart = moment(`${now.getFullYear()}-01-01 00:00:00`);
      const yearEnd = moment(`${now.getFullYear()}-12-31 23:59:59`);
      return [yearStart, yearEnd];

    default:
      return [];
  }
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}




