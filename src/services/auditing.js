import API from './api';

export async function findAuditingByDateInterval(params) {
  return API.get('/auditing/' + params.sucursalId+'/'+params.startDate+'/'+params.endDate).data;
}
