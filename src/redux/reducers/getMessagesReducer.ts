import { AnyAction } from "redux";
import {GET_MESSAGE} from '../constants';
import {initialGetMessages} from '../types/initialState';

export const getMessages = (state = initialGetMessages, action: AnyAction) => {
    // console.log('from reducer ',action.payload)
    switch (action.type) {
      case GET_MESSAGE:
        return {
             ...state,
             messageList:action.payload.messageList,
             conversationId:action.payload.conversation,         
            }
      default:
        return state;
  
    }
  }