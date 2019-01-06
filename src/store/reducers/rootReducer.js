import authReducer from './authReducer';
import eventReducer from './eventReducer';
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer,
    firestore: firestoreReducer
})

export default rootReducer;