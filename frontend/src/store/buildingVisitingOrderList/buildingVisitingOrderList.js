import { combineReducers } from 'redux';

export function generateOrderList(list) {
    return {
      type: 'GENERATE_ORDER_LIST',
      list,
    }
} // Action

const defaultList = [];

function lists(state=defaultList, action) {
    switch(action.type){
        case 'GENERATE_ORDER_LIST':
            return [...Array(5).keys()]
    }
    return state;
}

const orderListApp = combineReducers({
    lists
  });
  
export default orderListApp;