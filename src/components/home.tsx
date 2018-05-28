import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Login from './login/loginComponent';
import Register from './register/registerComponent';

class Home extends React.Component {
    public render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Epic Chat</h1>
          </header>
          <BrowserRouter>
          <div>
          <Route path='/components/loginComponent' component= {Login}/>.
          
          <Route path='/register' component= {Register}/>
         </div>
         </BrowserRouter>
          {/* <Login/> */}
         {/* <Register/> */}
        </div>
      );
    }
  }

export default Home;