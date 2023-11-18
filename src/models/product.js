import {
  findProductsBySucursal,
  findStockBySucursal
} from '@/services/product';
const ProductModel = {
  namespace: 'product',
  state: {
    products: [],
    stocks: [],
    currentProduct: {},
  },
  effects: {

    *setCurrentProduct({ payload }, { call, put }){
      yield put({
        type: 'setProduct',
        payload
      });
    },

    *fetchAll({ payload }, { call, put }) {
      const response = yield call(findProductsBySucursal, payload);
      yield put({
        type: 'queryProducts',
        payload: response,
      });
    },

    *fetchStocks({ payload }, { call, put }) {
      const response = yield call(findStockBySucursal, payload);
      yield put({
        type: 'queryStocks',
        payload: response,
      });
    },

  },
  reducers: {
    queryProducts(state, action) {
      return {
        ...state,
        products: action.payload,
      };
    },

    
    queryStocks(state, action) {
      return {
        ...state,
        stocks: action.payload,
      };
    },


    add(state, action) {
      const found = state.products.find(element => element.id === action.payload.id);
      if (!found) {
        let newList = [...state.products].concat(action.payload);
        return {
          ...state,
          products: newList,
        };
      }
      else {
        return {
          ...state
        };
      }

    },

 
    remove(state, action) {
      return {
        ...state,
        products: state.products.filter(item => item.id !== action.payload.id),
      };
    },


    setCurrentPromotion(state, action) {
      return { ...state, currentPromotion: action.payload || {} };
    },

    setProduct(state, action) {
      return { ...state, currentProduct: action.payload || {} };
    },
  },
};
export default ProductModel;
