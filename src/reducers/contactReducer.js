export default function contactReducer (state = {}, action) {
	// console.log('action --- ', action) 
   	switch (action.type) {

    	case "FETCH_CONTACTS":
      		return [...state, action.payload];

      	case "ADD_CONTACT":
      		return [...state, action.payload];

    	default:
      		return state;

  	}
};