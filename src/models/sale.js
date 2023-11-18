import { findPaymentsByDateInterval,findRefundedPaymentsByDateInterval } from '@/services/sale';
const SalesModel = {
  namespace: 'sale',
  state: {
    sales:[],
    refundedlist:[] 
  },
  effects: {
    *fetchPayments({ payload }, { call, put }) {
        const response = yield call(findPaymentsByDateInterval,payload);
        yield put({
          type: 'queryPayments',
          payload: response,
        });
      },

      *fetchRefundedPayments({ payload }, { call, put }) {
        const response = yield call(findRefundedPaymentsByDateInterval,payload);
        yield put({
          type: 'queryRefundedPayments',
          payload: response,
        });
      },
 
  },
  reducers: {
    queryPayments(state, action) {
      return {
        ...state,
        sales: action.payload,
      };
      },

      queryRefundedPayments(state, action) {
        return {
          ...state,
          refundedlist: action.payload,
        };
        },
      

      add(state, action) {
        const found = state.sales.find(element => element.id === action.payload.id);
        if(!found){
          let newList=[...state.sales].concat(action.payload);
          return {
            ...state,
            sales: newList,
          };
        }
        else {
          return {
            ...state
          };
         }
       
        },

        update(state, action) {
          let newList=[...state.sales];
         let repList= newList.map(function(item) { return item.id == action.payload.id ? action.payload : item; });
          return {
            ...state,
            sales: repList,
          };
          },

  
  },
};

export default SalesModel;
