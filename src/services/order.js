import API from '../services/api';
import { getDateInterval } from '@/utils/DateTimeUtils';

export async function findOrdersByDateInterval(params) {
  let dateInterval =getDateInterval(params.dateEum);
  return API.get('/orders/' + params.sucursalId+'/'+dateInterval.startDate+'/'+dateInterval.endDate).data;
}

export async function updateOrder(order,payload) {
  return API.put('/orders/' + order.id + '/' + order.createdAt,payload);
}