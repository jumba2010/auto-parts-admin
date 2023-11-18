import { formatMessage } from 'umi-plugin-react/locale';

export const dates = [{key:'TODAY',des:formatMessage({ id: 'dates.today'})},
{key:'THIS_WEEK',des:formatMessage({ id: 'dates.thisweek'})},
{key:'THIS_MONTH',des:formatMessage({ id: 'dates.thismonth'})},
{key:'LAST_QUARTER',des:formatMessage({ id: 'dates.lastquarter'})},
{key:'LAST_SEMESTER',des:formatMessage({ id: 'dates.lastsemester'})},
{key:'THIS_YEAR',des:formatMessage({ id: 'dates.thisyear'})},

];

export const  getDateInterval = (enumValue) => {
  const today = new Date();
  let startDate, endDate;

  switch (enumValue) {
    case 'TODAY':
      startDate = today;
      endDate = today;
      break;

    case 'THIS_WEEK':
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
      endDate = today;
      break;

    case 'THIS_MONTH':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = today;
      break;

    case 'LAST_QUARTER':
      startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
      endDate = today;
      break;

    case 'LAST_SEMESTER':
      startDate = new Date(today.getFullYear(), today.getMonth() - 6, 1);
      endDate = today;
      break;

    case 'THIS_YEAR':
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = today;
      break;

    default:
      throw new Error('Invalid enum value');
  }

  // Format the dates as 'YYYY-MM-DD'
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

