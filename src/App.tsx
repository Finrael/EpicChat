import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboardComponents/dashboard';
import Login from './components/login/loginComponent';
import Receiver from './components/mainReceiver/mainReceiver';
import Register from './components/register/registerComponent';
class App extends React.Component {
  public render() {
    return (
      <div className="App">

        <BrowserRouter>
          <div>
            <header className="App-header">
              <h1 className="App-title">Welcome to Epic Chat</h1>
            </header>


            <div>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/dashboard' component={Dashboard} />
            </div>
            <Receiver />
          </div>
        </BrowserRouter>

        {/* <Register/> */}
      </div>
    );
  }
}

export default App;
