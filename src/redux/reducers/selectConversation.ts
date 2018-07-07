import {AnyAction} from 'redux';
import {SET_SELECTED_CONTACT} from '../constants/setSelectedContact';
import {initialSelectedConversation} from '../types/initialState';

export const selectConversation  = ( state = initialSelectedConversation, action: AnyAction) =>{
    switch (action.type){
        case SET_SELECTED_CONTACT:
        console.log('on reducer ',action.payload)
        return {...state, selectedConversation:action.payload}
        default:
        return state;
    }
}