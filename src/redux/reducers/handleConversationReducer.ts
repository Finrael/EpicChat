import { AnyAction } from "redux";
import {HANDLE_CONVERSATION} from '../constants';
import {initialHandleConversations} from '../types/initialState';


export const handleConversation=(state=initialHandleConversations, action:AnyAction)=>{
    switch(action.type){
        
        case HANDLE_CONVERSATION:
        // const conv= state.conversations[action.payload];

        // let auxFlag:boolean=false;
        // if (holdConv.length>0){
        //     for (let i = 0; holdConv.length>i;i++){
        //         if (holdConv[i]===action.payload){ auxFlag=true}
                
        //     }
        //     if (auxFlag===true){holdConv.push(action.payload)}
        // }
        // return{...state, conversations:holdConv}
        default:
        return state;
    }
}