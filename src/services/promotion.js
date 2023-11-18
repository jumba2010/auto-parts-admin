import API from '../services/api'

export async function findPromotions(params) {
  return API.get('/promotions/' + params.sucursalId).data;
}

export async function addPromotion(payload) {
  return API.post('/promotions/', payload);
}

export async function inativatePromotion(promotion) {
  return API.put('/promotions/' + promotion.id + '/' + promotion.createdAt, { active: false });
}