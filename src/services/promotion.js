import API from '../services/api'

export async function findPromotions(params) {
  let resp = await API.get('/promotions/' + params);

  console.log(resp.data,params)
  return resp.data;
}

export async function addPromotion(payload) {
  return API.post('/promotions/', payload);
}

export async function inativatePromotion(promotion) {
  return API.put('/promotions/' + promotion.id + '/' + promotion.createdAt);
}