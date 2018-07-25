// import '../constants/index';
import { SET_NAME } from '../constants/setName';
import { SET_PROFILE } from '../constants/setProfile';
// import { SET_CONTACTS } from '../constants/setContacts';
import { SET_SELECTED_CONTACT } from '../constants/setSelectedContact';
import { Dispatch } from 'react-redux';
import { GET_AVAILABLE_CONTACTS, MESSAGE, GET_MESSAGE, HANDLE_CONVERSATION, GET_CONVERSATION,UPDATE_CONVERSATION } from '../constants';

// add the name of the user to the redux
export const setName = (name: any) => ({ type: SET_NAME, payload: { name } });
// creates the user profile
export const setProfile = () => {
    return async (dispatch: any) => {
        console.log('sending request');
        const response = await fetch('/api/authenticate', {
            credentials: 'include'
        });
        const body = await response.json();

        //  this.setState({email:body.email, username:body.username, id:body._id})
        // console.log(body);'
        console.log(body);
        dispatch({ type: SET_PROFILE, payload: { name: body.username, email: body.email, contacts: body.contacts } });
    }
}
// vewrsion 2 of setContacts  just adds the selected conversation
export const setContacts = (SelectedConversation: string) => {
    // console.log("ActionSetContacts", SelectedConversation)
    return { type: SET_SELECTED_CONTACT, payload: SelectedConversation }
};
interface Ibody  {
    contacts: Icontacts[]
    , _id: string
}
interface Icontacts {
        _id: string,
        contact: {
            _id: string,
            username: string,
            email: string,
        },
        conversationId: string
}
export const getAvailableContacts = () => {
    return async (dispatch: Dispatch) => {
        const response = await fetch('/api/getAvailableContacts', {
            method: 'get',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
console.log(response)
        const body:Ibody= await response.json();
        const convID = body.contacts.map(({ contact: { _id, username, email }, conversationId }) => ({
            _id, username, email, conversationId
        }))
        // console.log('convID', convID);
        dispatch({ type: GET_AVAILABLE_CONTACTS, payload:  convID  });
        return convID;
    }
    
}


export const message=(textMessage:string, convId:string)=>{
return async(dispatch:Dispatch) =>{
    const response = await fetch('/api/message', {
        method: 'post',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({textMessage, convId})
    });
console.log('its in', textMessage)
    const body= await response.json();
    // console.log(body)
    dispatch({ type: MESSAGE, payload:  body  });
    // return convID;

}
}

export const getMessages=(convId: string)=>{
    return async (dispatch:Dispatch)=>{
        const response = await fetch('/api/getMessages', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({convId})
        });
        // console.log('it is on getMessages', convId);
        const msgs=await response.json();
   
        dispatch({type:GET_MESSAGE, payload:{convId, msgs}})
    }
}


export const getConversation=(convId: string) => {
    return async (dispatch: Dispatch) =>{
        const response = await fetch('/api/getConversation', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({convId})
        });

        const convData = await response.json();
     console.log(convData)
        dispatch({type: GET_CONVERSATION, payload:{convId, convData}});
    }
}
export const handleConversations=(convId:string)=>{
    return async (dispatch:Dispatch)=>{
        dispatch({type:HANDLE_CONVERSATION, payload:convId})
    }
}
export const updateConversation=(convId:string)=>{
    return async (dispatch:Dispatch)=>{
        dispatch({type:UPDATE_CONVERSATION, payload:convId})
    }
}