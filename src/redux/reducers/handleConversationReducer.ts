import { AnyAction } from "redux";
import {HANDLE_CONVERSATION} from '../constants';
import {initialHandleConversations} from '../types/initialState';


export const handleConversation=(state=initialHandleConversations, action:AnyAction)=>{
    switch(action.type){
        
        case HANDLE_CONVERSATION:
        default:
        return state;
    }
}