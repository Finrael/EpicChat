// import '../constants/index';
import { SET_NAME } from '../constants/setName';
import { SET_PROFILE } from '../constants/setProfile';
// import {} from '../constants/setName';

export const setName = (name:any) => ({ type: SET_NAME, payload: {name} });
// export const setProfile = (name:any, email:any) => ({ type: SET_PROFILE, payload: {name, email} });
export const setProfile = (name:any, email:any)=>{
    return  async  (dispatch:any)=>{
        console.log('sending request');
        const response = await fetch('/api/authenticate',{
            credentials:'include'
        });
        const body = await response.json();

        //  this.setState({email:body.email, username:body.username, id:body._id})
        // console.log(body);'
        console.log(body);
        dispatch({type:SET_PROFILE, payload:{name: body.username, email: body.email}});
    }
}