import { AnyAction } from "redux";
import {SET_NAME} from '../constants'

export interface IState{
  name:string,
  email:string
}
const initialState:IState = {
  name: '',
  email: ''
};

export const setName = (state = initialState, action: AnyAction) => {
  switch(action.type){
    case SET_NAME:
    return {...state,name:action.payload.name}

    default:
    return state;
  }
}
