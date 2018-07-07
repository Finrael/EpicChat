import { connect } from 'react-redux';
import { IMyStore } from '../../redux/reducers';
import * as React from 'react';
import LFU from '../dashboardComponents/lookForContacts';
import MainHub from '../mainHubComponents/mainHub';
import { setProfile } from '../../redux/actions';

// import { Link } from 'react-router-dom';
interface IReDashboard {
    value: string;
    response: any;
    name: string;
    email: string;

}
interface IProps {
    name: string;
    setName: (name: string) => void;
    setProfile: () => Promise<void>;
}
class ReDashboard extends React.Component<IProps, IReDashboard>{
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            response: '',
            name: '',
            email: '',
        };
    }
    public showMe = () => {

        // console.log(document.cookie);
    }
    public confirmAuth = async () => {
        this.showMe();
        const response = await fetch('/api/authenticate', {
            credentials: 'include'
        });
        const body = await response.json();
        try {
            if (response.status !== 200) { throw Error(body.message); }
        } catch (error) {
            console.log(error)
        }

        console.log(body);
        return body;
    }//////////////////

    public onChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        // this.props.setProfile(currentTarget.value, 'placeholder for Email');
    }
    public getProfile() {
        this.props.setProfile()
            .then(() => {
                console.log('done');
            });
        //        console.log('name from the store: ', this.props.name)
    }
    // this.confirmAuth.catch((err:any)=> {console.log('error', err)})
    // public getProfileContacts(){
    //     this.props.setProfile('','').then(()=>{
    //         console.log('contactsTEST:' , this.props.name)
    //     });
    // }
   

    public componentDidMount() {
    this.getProfile();
}
      public checkProfile(){
    if (this.props.name !== '') {
        return <MainHub />
    } else {
        return <p />
    }
}
    public render() {

    return (
        <div className="RegisterMain">

            {this.checkProfile()}
            <LFU />

            {/* <div>Store value: {this.props.name}</div> */}
            {/* <input value={this.props.name} onChange={this.onChange} /> */}
            {/* <button onClick={this.getContactsForList} className="inputButton">inputDash</button> */}

        </div >
    );
}
}

export default connect((Store: IMyStore) => ({ name: Store.setProfile.name, email: Store.setProfile.email, contacts: Store.setProfile.contacts }), { setProfile })(ReDashboard);