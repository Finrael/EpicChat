import * as React from 'react';
import { Redirect } from 'react-router';
import './registerComponent.css';
interface IRegister {
    value: string;
    response: any;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    registerSuccess: boolean;
}

class Register extends React.Component<{}, IRegister>{
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            response: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            registerSuccess: false
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this);
    }
    public inputName = async () => {
        const response = await fetch('/api/register',
            {
                method: 'post', body: JSON.stringify(
                    {
                        username: this.state.username, email: this.state.email,
                        password: this.state.password
                    }),
                headers: { 'Content-Type': 'application/json' }
            });
        if (response.status !== 200) { throw Error('error'); }
        else{
            this.setState({registerSuccess:true});
        }
    
        console.log(this.state.registerSuccess)
    }
    public componentDidMount() {
        // this.callApi()
        //     .then(res => this.setState({ response: res.express }))
        //     .catch(err => console.log(err));

    }
    // public callApi = async () => {
    //     const response = await fetch('/api/getRegister');
        
    //     const body = await response.json();
    //     if (response.status !== 200) { throw Error(body.message); }
    //     return body;
    // };

    // function to stablish state.username
    public handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: event.target.value });
    }
    // function to stablish state.email
    public handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value });
    }
    // function to stablish state.password
    public handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: event.target.value });
    }
    // function to stablish state.passwordConfirm
    public handleChangePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ passwordConfirm: event.target.value });
    }
    public confirmPassword = (e:any) => {
        e.preventDefault();
        if ((this.state.username !=='') && (this.state.email !=='')){
        if ((this.state.password !== '') && (this.state.passwordConfirm !== '') && (this.state.password === this.state.passwordConfirm)) {
            this.inputName();
            // this.redirectToLogin();
        } else {
            alert('Password and confirmation are not equal')
        }
    }else {
        alert('make sure that email and username are valid inputs')
    }
    }
    public redirectToLogin(){
        console.log('second ', this.state.registerSuccess)
        if (this.state.registerSuccess===true){
            return <Redirect to='/logIn'/>}
            else {
              return  console.log('error')
            }
    }
    public render() {
        if (this.state.registerSuccess===true){
            return <Redirect to='/logIn'/>
          }
        return (
            
            <div className="RegisterMain">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <form onSubmit={this.confirmPassword}  className = 'registerForm'>
                    <p className="App-intro">{this.state.response}</p>
                    <input className="form-control" placeholder="username" aria-label="username" aria-describedby="basic-addon1" onChange={this.handleChangeUser} value={this.state.username} type='text' />
                    <input className="form-control" placeholder="email" aria-label="email" aria-describedby="basic-addon1" onChange={this.handleChangeEmail} value={this.state.email} type='text' />
                    <input className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" onChange={this.handleChangePassword} value={this.state.password} type='password' />
                    <input className="form-control" placeholder="Confirm password" aria-label="Confirm password" aria-describedby="basic-addon1" onChange={this.handleChangePasswordConfirm} value={this.state.passwordConfirm} type='password' />
                    <button type="submit" className="inputButton">input</button>
                    {/* <button onClick={this.confirmPassword} className="inputButton">input</button> */}
                </form>
            </div>
        );
    }
}

export default Register;