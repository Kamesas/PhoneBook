import { firebaseContact } from "../config/firebase";

export const fetchContacts = () => async dispatch => {
  firebaseContact.on("value", snapshot => {
    dispatch({
      type: 'FETCH_CONTACTS',
      payload: snapshot.val()
    });
  });
};

export const addContact = newContact => async dispatch => {
  firebaseContact.push().set(newContact);
};