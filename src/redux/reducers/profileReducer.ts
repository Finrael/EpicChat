import { AnyAction } from "redux";
import { SET_PROFILE, SET_CONTACTS } from '../constants';
import { initialState } from '../types/initialState';

export const setProfile = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, name: action.payload.name, email: action.payload.email, contacts: action.payload.contacts }
    case SET_CONTACTS:
      return { ...state, contacts: [...action.payload.contacts] }
    default:
      return state;

  }
}
