import * as React from 'react';
// import { Link } from 'react-router-dom';
interface Imain {
    value: string;
    response: any;
    username: string;
    email: string;
    id:string;
  }
class MainHub extends React.Component <{}, Imain>{
    constructor(props: any) {
        super(props);
        this.state = {
          value: '',
          response: '',
          username: 'base-username',
          email: 'base-email',
          id:'base-id',
        };
    }
    public componentDidMount() {
        this.getData();
      }
    public getData=async()=>{
        const response = await fetch('/api/authenticate',{
            credentials:'include'
        });
        const body = await response.json();
         this.setState({email:body.email, username:body.username, id:body._id})
        console.log(body);
        }
   
    public render() {

        return (
            <div className="RegisterMain">
                <label>Welcome </label>
               <label> Username: {this.state.username}</label>
               <label> Email: {this.state.email}</label>
               <label> ID:{this.state.id}</label>
            </div>
        );
    }
}

export default MainHub;