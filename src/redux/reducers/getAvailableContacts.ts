import {AnyAction} from "redux";
import {GET_AVAILABLE_CONTACTS} from '../constants';
import {initialStateAvailableContacts} from '../types/initialState';

export const getAvailableContacts = (state = initialStateAvailableContacts, action:AnyAction)=>{
switch(action.type){
    case GET_AVAILABLE_CONTACTS:
    return {...state, contacts: action.payload}
    default:
    return state;
}
}