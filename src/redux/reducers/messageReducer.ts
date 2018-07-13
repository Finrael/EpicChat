import { AnyAction } from "redux";
import {MESSAGE} from '../constants';
import {initialMessage} from '../types/initialState';

export const message = (state = initialMessage, action: AnyAction) => {
    switch (action.type) {
      case MESSAGE:
        return {
             ...state,
             messageText:action.payload.messageText,
             messageTime:action.payload.messageTime,
             messageOriginator:{_Id:action.payload.messageOriginator._Id, name:action.payload.messageOriginator.name},
             conversationId:action.payload.conversation,         
            }
      default:
        return state;
  
    }
  }