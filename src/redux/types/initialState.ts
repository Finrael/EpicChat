import {IState, ISelectedConversation, IgetAvailableContacts, IMessages, IGetMessages} from './stateTypes';
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
  messageList:[],
  conversationId:''
}