// import '../constants/index';
import { SET_NAME } from '../constants/setName';
import { SET_PROFILE } from '../constants/setProfile';
// import { SET_CONTACTS } from '../constants/setContacts';
import { SET_SELECTED_CONTACT } from '../constants/setSelectedContact';
import { Dispatch } from 'react-redux';
import { GET_AVAILABLE_CONTACTS, MESSAGE, GET_MESSAGE } from '../constants';

// import { Dispatch } from 'react-redux';
// import {} from '../constants/setName';

export const setName = (name: any) => ({ type: SET_NAME, payload: { name } });
// export const setProfile = (name:any, email:any) => ({ type: SET_PROFILE, payload: {name, email} });
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
// vewrsion 2 of setContacts
export const setContacts = (SelectedConversation: string) => {
    console.log("ActionSetContacts", SelectedConversation)
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
        const response = await fetch('api/getAvailableContacts', {
            method: 'get',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        const body:Ibody= await response.json();
        const convID = body.contacts.map(({ contact: { _id, username, email }, conversationId }) => ({
            _id, username, email, conversationId
        }))
        console.log('convID', convID);
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
    console.log(body)
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
        const body=await response.json();
        // console.log(body)
        dispatch({type:GET_MESSAGE, payload:body})
    }
}