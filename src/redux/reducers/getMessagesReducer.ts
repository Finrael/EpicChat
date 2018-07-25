import { AnyAction } from "redux";
import { GET_MESSAGE, GET_CONVERSATION } from '../constants';
import { initialGetMessages } from '../types/initialState';
// import { message } from "../actions";

export const getMessages = (state = initialGetMessages, action: AnyAction) => {
  // console.log('from reducer ',action.payload)
  switch (action.type) {

    case GET_CONVERSATION: {
      const {convId, convData} = action.payload;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [convId]: {
            ...convData,
            messageList: []
          }
        }
      }
    }
    case GET_MESSAGE:{
      const { convId, msgs } = action.payload;

      let conversation = state.conversations[convId];
      if (!conversation) { return state; }

      conversation = {
        ...conversation,
        messageList: [...conversation.messageList, ...msgs.messageList]
      };

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [convId]: conversation
        }
      };
    }
    case 'NEW_MESSAGE':{
      const msg = action.payload;
      const conversation= state.conversations[msg.conversationId]
      if (conversation===undefined){return state}
      console.log(msg.conversationId)
      return {
        ...state, 
        conversations:{
          ...state.conversations,
          [msg.conversationId]: {
            ...conversation,
            messageList:[...conversation.messageList,msg]
          }
        }
      }
    }
    default:
      return state;

  }
}