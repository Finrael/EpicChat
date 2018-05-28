import * as React from 'react';
interface IRegister {
    value: string;
    response: any;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string
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
            passwordConfirm: ''
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
        const body = await response.json();
        if (response.status !== 200) { throw Error(body.message); }
        return body;
    }
    public componentDidMount() {
        // this.callApi()
        //     .then(res => this.setState({ response: res.express }))
        //     .catch(err => console.log(err));

    }
    public callApi = async () => {
        const response = await fetch('/api/getRegister');
        
        const body = await response.json();
        if (response.status !== 200) { throw Error(body.message); }
        return body;
    };

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
    public confirmPassword = () => {
        if ((this.state.password !== '') && (this.state.passwordConfirm !== '') && (this.state.password === this.state.passwordConfirm)) {
            this.inputName();
        } else {
            alert('Password and confirmation are not equal')
        }
    }
    public render() {
        return (
            <div className="RegisterMain">
                <form>
                    <p className="App-intro">{this.state.response}</p>
                    <label>username:</label>
                    <input className='inputUserName' onChange={this.handleChangeUser} value={this.state.username} type='text' />
                    <label>email:</label>
                    <input className='inputEmail' onChange={this.handleChangeEmail} value={this.state.email} type='text' />
                    <label>password:</label>
                    <input className='inputPassword' onChange={this.handleChangePassword} value={this.state.password} type='text' />
                    <label> Confirm password:</label>
                    <input className='inputPasswordConfirm' onChange={this.handleChangePasswordConfirm} value={this.state.passwordConfirm} type='text' />
                    <button onClick={this.confirmPassword} className="inputButton">input</button>
                </form>
            </div>
        );
    }
}

export default Register;