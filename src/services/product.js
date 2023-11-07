import  API from '../services/api'

export async function createProduct(payload) {
  return API.post('/car-parts',payload);
}

export async function findProductsBySucursal(params) {
  let resp =await  API.get('/car-parts/'+params.sucursalId);

  console.log('resp',resp.data)
  return resp.data;

}

export async function findStockBySucursal(sucursalId) {
  let newList = [];


  return newList
}

export async function findCategoriesBySucursal() {
  let newList = [];

  return newList
}


export async function findSuppliersBySucursal(params) {
  let newList = [];
 
  return newList
}

export async function findTaxesBySucursal(sucursalId) {
  let newList = [];

  return newList
}





export async function updateProduct(params) {

}

export async function deleteProduct(product) {
  let resp =await  API.delete('/car-parts/'+product.id+'/'+product.createdAt);
  console.log('resp',resp)
 return resp;
}
