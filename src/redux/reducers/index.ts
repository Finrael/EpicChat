import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {setName, IState as ISetName} from './setName';
import {setProfile} from './setProfile';
import { IState as ISetProfile} from '../types/stateTypes';
import thunk from 'redux-thunk';

export interface IMyStore {
    setName: ISetName,
    setProfile:ISetProfile
}

const rootReducer = combineReducers<IMyStore>({setName, setProfile});

const create= compose(applyMiddleware(thunk))(createStore);
export default create(rootReducer);