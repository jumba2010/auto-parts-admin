import { findPromotions } from '@/services/promotion';
const PromotionModel = {
  namespace: 'promotion',
  state: {
    promotions:[],
    currentPromotion:{},
  },
  effects: {
    *fetch({ payload }, { call, put }) {
        const response = yield call(findPromotions,payload);
        yield put({
          type: 'queryPromotions',
          payload: response,
        });
      },

  },
  reducers: {
    queryPromotions(state, action) {
      return {
        ...state,
        promotions: action.payload,
      };
      },
      addToList(state, action) {
        let newList=[...promotions].concat(action.payload);
        return {
          ...state,
          promotions: newList,
        };
        },
  },
};
export default PromotionModel;
