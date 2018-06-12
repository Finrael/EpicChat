import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {setName, IState as ISetName} from './setName';
import thunk from 'redux-thunk';

export interface IMyStore {
    setName: ISetName
}

const rootReducer = combineReducers<IMyStore>({setName});

const create= compose(applyMiddleware(thunk))(createStore);
export default create(rootReducer);