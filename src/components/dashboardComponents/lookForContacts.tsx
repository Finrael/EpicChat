import * as React from 'react';
interface ILooking {
    value: string;
    response: any;
    username: string;
    email: string;
    id: string;
    emailToLookFor: string;
    results: string[];
    showMenu:boolean;
}
class LFC extends React.Component<{}, ILooking>{
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            response: '',
            username: 'base-username',
            email: 'base-email',
            id: 'base-id',
            emailToLookFor: '',
            results: [],
            showMenu: true
        };
        this.testMenu = this.testMenu.bind(this);
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
    public testMenu = (e:any)=>{
        const testArr: string []=['a','b','c']
        
        // e.preventDefault();
        // if (this.state.showMenu===false){
        //     this.setState({showMenu:true})
        // }else{
        //     this.setState({showMenu:false})
        // }
        return testArr.map(this.createOption);
    }

    public createOption = (name:string)=>{
        // console.log('createOption in:', name)
        return <button key={name} onClick={()=> this.auxConsole(name)}>{name}</button>
    }
    public auxConsole=(toLog:any)=>{
        console.log(toLog,'bla');
    }
    public fetchOcurrences=async (e:any) =>{
        e.preventDefault();
        console.log(this.state.emailToLookFor, "FETCH oCURRENCES")
        const response = await fetch('/api/getContacts',
        {
          method: 'post', body: JSON.stringify(
            {
              emailToLookFor: this.state.emailToLookFor,
            }),
          credentials:'include',
          headers: { 'Content-Type': 'application/json' }
        });
      // debugger;
      const body = await response.json();
      console.log(body,"response")
      return body;
    }
    public render() {
// <button onClick={this.testMenu}>Show menu</button>
        return (
            <div className="LFC">

                <form >
                    <p>Please insert email to look for contacts</p>
                    <input className='inputEmail' onChange={this.handleChangeEmailToSearch} value={this.state.emailToLookFor} type='text' />
                    <button type="submit" className="inputButton">Search</button>                                       
                </form>
                <button onClick={this.fetchOcurrences}>Search2</button>
                <button onClick={this.testMenu}>Show menu</button>
                {
          this.state.showMenu
            ? (
              <div className="menu">
              {/* {this.testMenu('s')} */}
              </div>
            )
            : (
              null
            )}
            <div>
                {/* {this.testMenu} */}
                </div>
            </div>
            
        );
    }
}

export default LFC;