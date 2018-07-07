import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {setName, IState as ISetName} from './setName';
import {setProfile} from './profileReducer';
import { IState as ISetProfile, ISelectedConversation} from '../types/stateTypes';
import thunk from 'redux-thunk';
import { selectConversation } from './selectConversation';
// import { setSelectedConversation } from '../actions';
// import { SET_CONTACTS } from '../constants';

export interface IMyStore {
    setName: ISetName,
    setProfile:ISetProfile,
    selectConversation:ISelectedConversation,
    // setContacts:
}
declare const window :{__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :typeof compose}
const rootReducer = combineReducers<IMyStore>({setName, setProfile, selectConversation});

const create= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ (applyMiddleware(thunk))(createStore);
export default create(rootReducer);