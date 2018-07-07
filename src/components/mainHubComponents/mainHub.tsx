import * as React from 'react';
import { connect } from 'react-redux';
import { IMyStore } from '../../redux/reducers';
import { setProfile, setContacts } from '../../redux/actions';
import { Dispatch } from 'redux';

// import { Link } from 'react-router-dom';
interface Imain {
    value: string;
    response: any;
    username: string;
    email: string;
    id: string;
    contacts: string[];
    selectedContact: string;
}
interface Iprops {
    username: string,
    email: string,
    contacts: string[],
    selectedContact: string;
    setContacts:  () => (dispatch:Dispatch)=>void;

}
class MainHub extends React.Component<Iprops, Imain>{
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            response: '',
            username: 'base-username',
            email: 'base-email',
            id: 'base-id',
            contacts: [],
            selectedContact: '',
        };
    }
    public componentDidMount() {
        this.props.setContacts()
        // this.checkfor('');
    }
    public getData = async () => {
        const response = await fetch('/api/authenticate', {
            credentials: 'include'
        });
        const body = await response.json();
        this.setState({ email: body.email, username: body.username, id: body._id })
        console.log(body);
        
    }
   
    public setSelectedOption = (e: any) => {
        e.preventDefault();
        this.setState({ selectedContact: e.target.value })
    }
    public checkfor = (e:any)=>{
        e.preventDefault();
        console.log('check for',this.props.contacts)
        // HEREW WE HAVE TO CONTINUE
        // const options2: string[] = this.props.contacts;
        // const optionItems2: any = [];
        // // optionItems.push(<option key= 'select' value='' >select 1 option</option>)
        // for (let i = 0; options2.length > i; i++) {

        //     optionItems2.push(<option key={options2[i]} value={options2[i]} >{options2[i]}</option>)
        // }
        
    }
    public render() {
        const options: string[] = this.state.contacts;
        const optionItems: any = [];
        // optionItems.push(<option key= 'select' value='' >select 1 option</option>)
        for (let i = 0; options.length > i; i++) {

            optionItems.push(<option key={options[i]} value={options[i]} >{options[i]}</option>)
        }

        return (
            <div className="RegisterMain">
                <label>Welcome </label>
                <label> Username: {this.props.username}</label>
                <label> Email: {this.props.email}</label>
                {/* <label> Contacts: {this.props.contacts}</label> */}
                 <button onClick={this.checkfor} className="inputButton">checkfor</button>
                <div id='search'>
                    <select onChange={this.setSelectedOption}>
                        {optionItems}
                    </select>
                    {/* <div>
                       
                        </div> */}
                </div>
            </div>
        );
    }
}

export default connect((Store: IMyStore) => ({
    username: Store.setProfile.name,
    email: Store.setProfile.email,
    contacts: Store.setProfile.contacts
}), {
        setProfile,
        setContacts
    })(MainHub);