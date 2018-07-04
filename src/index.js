import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

function contacts (state = {}, action) { 
	console.log('action --- ', action) 
   	switch (action.type) {
    	case "FETCH_CONTACTS":
      	return [...state, action.payload];
    	default:
      	return state;
  	}
};

const store = createStore(contacts, composeWithDevTools(applyMiddleware(reduxThunk)));

store.subscribe(() => {
	console.log('subscribe --- ', store.getState());
})

store.dispatch({ 
  type: 'FETCH_CONTACTS',
  payload: 'first contact'
});
store.dispatch({ 
  type: 'FETCH_CONTACTS2',
  payload: 'other contact'
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
