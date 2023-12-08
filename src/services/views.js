import API from './api';

export async function findViewsByDateInterval(params) {
  return API.get('/views/' + params.sucursalId+'/'+params.startDate+'/'+params.endDate).data;
}
