// import '../constants/index';
import { SET_NAME } from '../constants/setName';
// import {} from '../constants/setName';

export const setName = (name:any) => ({ type: SET_NAME, payload: {name} });