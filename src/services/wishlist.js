import API from './api';
import { getDateInterval } from '@/utils/DateTimeUtils';

export async function findWishListByDateInterval(params) {
  let dateInterval =getDateInterval(params.dateEnum);
  return API.get('/wish-list/' + params.sucursalId+'/'+dateInterval.startDate+'/'+dateInterval.endDate).data;
}
