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

export const removeContact = removeContactId => async dispatch => {
  firebaseContact.child(removeContactId).remove();
};

export const updateContact = (id, data) => async dispatch => {  
  return firebaseContact
    .child(id)
    .update(data)
    .then(() => firebaseContact.once('value'))
    .then(snapshot => snapshot.val())
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message
    }));
}