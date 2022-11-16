import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import orderListApp from './store/buildingVisitingOrderList/buildingVisitingOrderList'

const store = createStore(orderListApp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
);


