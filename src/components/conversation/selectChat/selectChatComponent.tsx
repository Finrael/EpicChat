import * as React from 'react';
import { connect } from 'react-redux';
import { IMyStore } from '../../../redux/reducers';
import { setProfile, setContacts } from '../../../redux/actions';
import {Link} from 'react-router-dom'
// import { selectConversation } from '../../../redux/reducers/selectConversation';

interface ISelect {
    selectedConversation: string;
    availableContacts: string[];

}
interface IProps {
    name: string;
    email: string;
    contacts: string[];
    selectedConversation:string;
    setContacts: (contacts: string) => void;
    setProfile: () => Promise<void>;
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
        const response = await fetch('/api/getAvailableContacts', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        const body = await response.json();
        console.log('body', body.contacts[0].conversationId.participants);
        let participantsArray:Array<{_id:string, participant:{_id:string, username:string},joinedDate:Date, status:number}>=[];
        participantsArray = body.contacts[0].conversationId.participants;
        console.log(participantsArray[0].participant)
        // const optionsArray: string[] = [];
        // for (let i = 0; participantsArray.length > i; i++) {

        //     optionsArray.push(participantsArray[i].participant)
        // }
        // // console.log('options Array',optionsArray);
        // this.setState({ availableContacts: optionsArray })
        // // if (optionsArray.length > 0) {
        // //     this.setState({ selectedConversation: optionsArray[0] });
        // // }

        return body;
    }
    public setSelectedOption = (e: any) => {
        e.preventDefault();
        console.log('target',e.target)
         this.props.setProfile()
        console.log('props: ',this.props, 'end props')
        // this.setState({ selectedConversation: e.target.value })
    }
    public render() {
        const options: string[] = this.state.availableContacts;
        const optionItems: any = [];
        // optionItems.push(<option key= 'select' value='' >select 1 option</option>)
        for (let i = 0; options.length > i; i++) {

            optionItems.push(<Link to={'/chat/'+options[i]} > <li key={options[i]} value={options[i]} className='dropdown-item' >{options[i]}</li></Link>)
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
    selectedConversation:Store.selectConversation
}),{ setProfile, setContacts})(Select)