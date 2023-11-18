import API from '../services/api';
import { getDateInterval } from '@/utils/DateTimeUtils';

export async function findPaymentsByDateInterval(params) {
  let dateInterval =getDateInterval(params.dateEum);
  return API.get('/orders/' + params.sucursalId+'/'+dateInterval.startDate+'/'+dateInterval.endDate).data;
}

export async function findRefundedPaymentsByDateInterval(params) {
  let dateInterval =getDateInterval(params.dateEum);
  return API.get('/orders/refunded/' + params.sucursalId+'/'+dateInterval.startDate+'/'+dateInterval.endDate).data;
}

export async function confirmPayment(order,payload) {
  return API.put('/orders/' + order.id + '/' + order.createdAt,payload);
}

export async function refundPayment(order,payload) {
  return API.put('/orders/refunded/' + order.id + '/' + order.createdAt,payload);
}