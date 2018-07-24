import {IState, ISelectedConversation, IgetAvailableContacts, IMessages, IGetMessages, IHandleConversations, IConversations} from './stateTypes';
export const initialState:IState = {
    name: '',
    email: '',
    contacts:[],
    selectedContact:'',
  };
export const initialSelectedConversation: ISelectedConversation ={
  selectedConversation:'',
}
export const initialStateAvailableContacts: IgetAvailableContacts={
  contacts:[]
}
export const initialMessage:IMessages={
  messageText:'',
  messageTime:new Date(),
  messageOriginator:{_Id:'', name:''},
  conversationId:'',
}

export const initialGetMessages:IGetMessages={
  conversations:{}
}

// TODO probably should not be used
export const initialConversations:IConversations={
  participants:[],
  creationTime:new Date(),
  messageList: []
}


// TODO not needed
export const initialHandleConversations:IHandleConversations={
  conversations:{}
}