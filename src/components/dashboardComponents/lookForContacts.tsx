import * as React from 'react';
import { connect } from 'react-redux';
import { IMyStore } from '../../redux/reducers';
import { setProfile } from '../../redux/actions';
import './lookForContacts.css';
// import { FormHTMLAttributes } from 'react';
interface ILooking {
    value: string;
    response: any;
    username: string;
    email: string;
    id: string;
    emailToLookFor: string;
    searchResults: string[];
    selectedOption: string;
    // showMenu:boolean;
}
interface IProps {
    name: string;
    email: string;
    setName: (name: string) => void;
    setProfile:(name:string, email:string)=> Promise<void>;
}
class LFC extends React.Component<IProps, ILooking>{
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            response: '',
            username: 'base-username',
            email: 'base-email',
            id: 'base-id',
            emailToLookFor: '',
            searchResults: [],
            selectedOption: '',
            // showMenu: true
        };
        this.setSelectedOption = this.setSelectedOption.bind(this);
    }


    public componentDidMount() {
        this.getData();
    }
    public getData = async () => {
        const response = await fetch('/api/authenticate', {
            credentials: 'include'
        });
        const body = await response.json();
        this.setState({ email: body.email, username: body.username, id: body._id })

    }
    public handleChangeEmailToSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ emailToLookFor: event.target.value });
    }
    // React.SyntheticEvent<HTMLOptionElement>
    // public handleChangeOptions = (event:any) => {
    //     console.log('event target', event.target)
    //     this.setState({ selectedOption: event.currentTarget.value });

    //         console.log('selected options',this.state.selectedOption);
    //         console.log('state', this.state)

    // }
    public setSelectedOption = (e: any) => {
        // console.log('previous state', this.state.selectedOption);
        e.preventDefault();
        // console.log(e.target.value)
        this.setState({ selectedOption: e.target.value })
        // console.log(this.state.selectedOption);
    }

    public createOption = (name: string) => {
        // console.log('createOption in:', name)
        return <button key={name} onClick={() => this.auxConsole(name)}>{name}</button>
    }
    public auxConsole = (toLog: any) => {
        console.log(toLog, 'bla');
    }
    public fetchOcurrences = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.state.emailToLookFor){
        e.preventDefault();
        console.log(this.state.emailToLookFor, "FETCH OCURRENCES")
        const response = await fetch('/api/getContacts',
            {
                method: 'post', body: JSON.stringify(
                    {
                        emailToLookFor: this.state.emailToLookFor,
                    }),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
        // debugger;
        const body = await response.json();
        console.log(body, "response")
        const optionsArray: string[] = [];
        console.log(body.length)
        for (let i = 0; body.length > i; i++) {

            optionsArray.push(body[i].email)
        }
        console.log(optionsArray);
        this.setState({ searchResults: optionsArray })
        if (optionsArray.length > 0) {
            this.setState({ selectedOption: optionsArray[0] });
        }

        return body;}
        else{
            alert('you need to input a valid term to look for')
        return console.log('input was empty')
        }
    }
     // function to addContacts
  public addContacts = async()=>{
      console.log(this.state.searchResults)
    const response = await fetch('/api/addContacts',
      {
        method: 'post', body: JSON.stringify(
          {
            email: this.state.email,
            userToAdd: this.state.selectedOption,
          }),
        credentials:'include',
        headers: { 'Content-Type': 'application/json' }
      });
    // debugger;
    if (response.status !== 200) {return alert('error on addContacts') }
  }
    public render() {
        const options: string[] = this.state.searchResults;
        const optionItems: any = [];
        // optionItems.push(<option key= 'select' value='' >select 1 option</option>)
        for (let i = 0; options.length > i; i++) {

            optionItems.push(<option key={options[i]} value={options[i]} className='dropdown-item' >{options[i]}</option>)
        }
        return (
            <div className="LFC">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <form >
                    <p>Please insert email to look for contacts</p>
                    <input className='inputEmail' onChange={this.handleChangeEmailToSearch} value={this.state.emailToLookFor} type='text' />
                    {/* <button type="submit" className="inputButton">Search</button> */}
                </form>
                <button onClick={this.fetchOcurrences}>Search</button>
                <button onClick={this.addContacts}>Add Contact</button>
                {/* <button onClick={this.generateMenu}>Show menu</button> */}
                <div id='search'>
                    <select onChange={this.setSelectedOption} className='dropdown'>
                        {optionItems}
                    </select>
                </div>

            </div>

        );
    }
}

export default connect((Store: IMyStore) => ({ username: Store.setProfile.name, email: Store.setProfile.email }), {setProfile})(LFC);
// export default LFC;