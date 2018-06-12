import { connect } from 'react-redux';
import { IMyStore } from '../../redux/reducers';
import * as React from 'react';
import LFU from '../dashboardComponents/lookForContacts';
import MainHub from '../mainHubComponents/mainHub';
import { setName } from '../../redux/actions';

// import { Link } from 'react-router-dom';
interface IReDashboard {
    value: string;
    response: any;
    username: string;
    email: string;

}
interface IProps {
    name: string;
    setName: (name: string) => void
}
class ReDashboard extends React.Component<IProps, IReDashboard>{
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

    public onChange = ({currentTarget}: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setName(currentTarget.value);
    }
    // this.confirmAuth.catch((err:any)=> {console.log('error', err)})
    public render() {

        return (
            <div className="RegisterMain">
                <MainHub />
                <LFU />
                <div>Store value: {this.props.name}</div>
                <input value={this.props.name} onChange={this.onChange} />
                {/* <button onClick={this.confirmAuth} className="inputButton">input</button> */}

            </div >
        );
    }
}

export default connect((Store: IMyStore) => ({ name: Store.setName.name }), { setName })(ReDashboard);