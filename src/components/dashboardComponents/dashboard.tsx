import { connect } from 'react-redux';
import { IMyStore } from '../../redux/reducers';
import * as React from 'react';
import LFU from '../dashboardComponents/lookForContacts';
import MainHub from '../mainHubComponents/mainHub';
import { setProfile } from '../../redux/actions';
import { HOC, ISocketProps } from '../utility/HOCDash';
import { sm } from '../../Socket';
// import { Link } from 'react-router-dom';
interface IReDashboard {
    value: string;
    response: any;
    name: string;
    email: string;

}
interface IProps extends ISocketProps {
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
                sm.connect();
            });
        //        console.log('name from the store: ', this.props.name)
    }


    public componentDidMount() {
        this.getProfile();
        // this.connectToSockets();
        // sm.on('connect', ()=>{
        // sm.connect('',()=>{})
        // sm.emit('something here opn the emmit')
        // console.log('this is connecteds')
        // });
    }
    public checkProfile() {
        if (this.props.name !== '') {
            return <MainHub />
        } else {
            return <p />
        }
    }
    public connectToSockets=async()=>{
        const response = await fetch('/connectSockets', {
            credentials: 'include'
        });
       await response.json();
        try {
            if (response.status !== 200) { throw Error('body.message'); }
        } catch (error) {
            console.log(error)
        }

        // console.log(body);
        // return body;
    }
    public render() {

        return (
            <div className="RegisterMain">

                {this.checkProfile()}
                <LFU />
            </div >
        );
    }
}

export default connect((Store: IMyStore) => ({ name: Store.setProfile.name, email: Store.setProfile.email, contacts: Store.setProfile.contacts }), { setProfile })(HOC(ReDashboard));
