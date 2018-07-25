import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/reducers'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {initFunc} from './Socket';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root') as HTMLElement
// );
initFunc(store.dispatch);
ReactDOM.render(
  <Provider store = {store}><App/></Provider>, document.getElementById('root') as HTMLElement
);

registerServiceWorker();
