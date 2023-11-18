import API from '../services/api'

export async function createProduct(payload) {
  return API.post('/car-parts', payload);
}

export async function findProductsBySucursal(params) {
  let resp = await API.get('/car-parts/' + params.sucursalId);
  return resp.data;

}

export async function updateProduct(product, payload) {
  return API.put('/car-parts/' + product.id + '/' + product.createdAt, payload);
}

export async function findStockBySucursal(params) {
  return API.get('/stock/' + params.sucursalId,
    ).data;

    /* TODO: Paginations to be added later 
    {
      lastEvaluatedKey: params.lastEvaluatedKey,
      pageLimit: params.pageLimit
    }
    */
}

export async function addNewStock(payload) {
  return API.post('/stock/', payload);
}


export async function deleteProduct(product) {
  return API.delete('/car-parts/' + product.id + '/' + product.createdAt);
}
