import * as React from 'react';
import { connect } from 'react-redux';
import { IMyStore } from '../../redux/reducers';
import { setProfile } from '../../redux/actions';
// import { Link } from 'react-router-dom';
interface Imain {
    value: string;
    response: any;
    username: string;
    email: string;
    id:string;
  }
  interface Iprops{
      username:string,
      email:string,
  }
class MainHub extends React.Component <Iprops, Imain>{
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
        // this.getData();
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
               <label> Username: {this.props.username}</label>
               <label> Email: {this.props.email}</label>
               {/* <label> ID:{this.state.id}</label> */}
               {/* <label>from the store: {this.props.username}</label> */}
            </div>
        );
    }
}
export default connect((Store: IMyStore) => ({ username: Store.setProfile.name, email: Store.setProfile.email }), {setProfile})(MainHub);
// export default MainHub;