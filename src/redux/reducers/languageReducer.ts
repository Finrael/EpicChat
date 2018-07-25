import { AnyAction } from "redux";
import {LANGUAGE} from '../constants';
import { initialLanguageState } from '../types/initialState';


export const setLanguage = (state = initialLanguageState, action: AnyAction) => {
  switch(action.type){
    case LANGUAGE:
    return {...state,lang:action.payload.lang}

    default:
    return state;
  }
}
