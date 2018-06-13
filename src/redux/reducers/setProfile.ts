import { AnyAction } from "redux";
import {SET_PROFILE} from '../constants';
import {initialState} from '../types/initialState';

export const setProfile = (state = initialState, action: AnyAction) => {
  switch(action.type){
    case SET_PROFILE:
    return {...state,name:action.payload.name, email: action.payload.email}
    default:
    return state;
  }
}
