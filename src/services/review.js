import API from './api'

export async function findReviews(params) {
  return API.get('/reviews/' + params.sucursalId).data;
}

export async function approveOrInapproveReview(review, payload) {
  return API.put('/reviews/' + review.id + '/' + review.createdAt, payload);
}