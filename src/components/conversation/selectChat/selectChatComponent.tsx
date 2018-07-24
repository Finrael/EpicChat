import * as React from 'react';
import { connect } from 'react-redux';
import { IMyStore } from '../../../redux/reducers';
import { setProfile, getAvailableContacts, handleConversations } from '../../../redux/actions';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router';
// import { selectConversation } from '../../../redux/reducers/selectConversation';

interface ISelect {
    selectedConversation: string;
    availableContacts: string[];
    
}
interface IProps {
    name: string;
    email: string;
    // contacts: string[];
    selectedConversation:string;
    availableContacts:IAvailableContacts
    // setContacts: (contacts: string) => void;
    setProfile: () => Promise<void>;
    getAvailableContacts:()=>void;
    handleConversations: (convId:string)=>void;
}
interface IAvailableContacts{
    contacts:Array<{
        _id:string,
        username:string,
        email:string,
        conversationId:string
    }>
}
class Select extends React.Component<IProps, ISelect>{
    constructor(props: any) {
        super(props);
        this.state = {
            selectedConversation: '',
            availableContacts: [],
        }
    }
    public fetchAvailable = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await this.props.getAvailableContacts();
        console.log('props: ',this.props.availableContacts, 'end props')
        const options: IAvailableContacts = this.props.availableContacts;
        // const optionItems: any = [];
console.log('from options', options.contacts[0].conversationId)
    }
    public setSelectedOption = (e: any) => {
        e.preventDefault();
        console.log('target',e.target)
         this.props.setProfile()
       
        // this.setState({ selectedConversation: e.target.value })
    }
    public checkForConv = (e:any)=>{
        e.preventDefault();
        // console.log('bjoa')
        this.props.handleConversations(e.target.value)
        const auxString: string =  '/chat/'+e.target.value;
        return  <Redirect to={auxString}/>
    }
    public render() {
        const options: IAvailableContacts = this.props.availableContacts;
        const optionItems: any = [];
        // optionItems.push(<option key= 'select' value='' >select 1 option</option>)
        for (let i = 0; options.contacts.length > i; i++) {

            optionItems.push(<Link to={'/chat/'+options.contacts[i].conversationId} > <li key={options.contacts[i]._id} value={options.contacts[i]._id} className='dropdown-item' >{options.contacts[i].email}</li></Link>)
        }

        return (
            <div>
                <p>Select from the avaialable Contacts </p>
                <button onClick={this.fetchAvailable}>Search</button>
                {/* <Link to={'/chat/'+{}}>Open Conversation </Link> */}
                <div id='search'>
                    <ul onClick={this.setSelectedOption} className='dropdown'>
                        {optionItems}
                    </ul>
                </div>

            </div>

        )
    }
}
// export default Select;
export default connect((Store: IMyStore) => ({
    contacts: Store.setProfile.contacts,
    name: Store.setProfile.name,
    email: Store.setProfile.email,
    selectedConversation:Store.selectConversation,
    availableContacts:Store.getAvailableContacts,
    // conversations:Store.handleConversation
}),{ setProfile,getAvailableContacts, handleConversations })(Select)