// import '../constants/index';
import { SET_NAME } from '../constants/setName';
import { SET_PROFILE } from '../constants/setProfile';
// import { SET_CONTACTS } from '../constants/setContacts';
import {SET_SELECTED_CONTACT} from '../constants/setSelectedContact';
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
 return  { type: SET_SELECTED_CONTACT, payload:  SelectedConversation }
};

// version 1 of setContacts
// export const setContacts = () => {
//     return (dispatch: any) => {
//         console.log('sending request from setContacts');
//         fetch('/api/getContactsForList', {
//             credentials: 'include'
//         }).then(res => {
            
//         //  const info:string= JSON.stringify( res.body)
//             console.log('res from the setContacts:', res)
//             return res.json()
//         }).then(res=>{
//              dispatch({type:SET_CONTACTS, payload:{ contacts:[...res.contacts]}})
//             console.log(res)
            
//         })
//         // const body =  response.json();

//         //  console.log(body)
//     }

// }
