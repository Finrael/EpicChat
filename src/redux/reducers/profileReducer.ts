import { AnyAction } from "redux";
import { SET_PROFILE, SET_CONTACTS, SAVE_LANGUAGE } from '../constants';
import { initialState } from '../types/initialState';

export const setProfile = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, name: action.payload.name, email: action.payload.email, contacts: action.payload.contacts, language:action.payload.language }
    case SET_CONTACTS:
      return { ...state, contacts: [...action.payload.contacts] }
    case SAVE_LANGUAGE:
      console.log('saving new language on redux: ', action.payload);
      return{...state, language:action.payload}
    default:
      return state;

  }
}
