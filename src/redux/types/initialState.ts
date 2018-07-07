import {IState, ISelectedConversation} from './stateTypes';
export const initialState:IState = {
    name: '',
    email: '',
    contacts:[],
    selectedContact:'',
  };
export const initialSelectedConversation: ISelectedConversation ={
  selectedConversation:'',
}
