import * as React from 'react';
// import { Link } from 'react-router-dom';
interface IReDashboard {
    value: string;
    response: any;
    username: string;
    email: string;
  }
class ReDashboard extends React.Component <{}, IReDashboard>{
    constructor(props: any) {
        super(props);
        this.state = {
          value: '',
          response: '',
          username: '',
          email: '',
        };
    }
    public showMe = () => {
        console.log(document.cookie);
    }
    public confirmAuth=async ()=>{
        this.showMe();
        const response = await fetch('/api/AuthenticateToken',{
            credentials:'include'
        });
        const body = await response.json();
        try {
            if (response.status !== 200) { throw Error(body.message); }
        } catch (error) {
            console.log(error)
        }
        
        console.log(body);
        return body;
    }

    // this.confirmAuth.catch((err:any)=> {console.log('error', err)})
    public render() {

        return (
            <div className="RegisterMain">
                <label> reached successfully </label>
                <button onClick={this.confirmAuth} className="inputButton">input</button>
            </div>
        );
    }
}

export default ReDashboard;