import * as React from 'react';
import { Redirect } from 'react-router';
import './registerComponent.css';
import { translate, Trans } from 'react-i18next';
import { IMyStore } from '../../redux/reducers';
import { connect} from 'react-redux';
import { TransProps } from 'react-i18next/src/trans';

interface IRegister {
    value: string;
    response: any;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    registerSuccess: boolean;
    language: string;
}


class Register extends React.Component<{} & TransProps, IRegister>{
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
            response: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            registerSuccess: false,
            language: 'en'
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
                        password: this.state.password, language: this.state.language
                    }),
                headers: { 'Content-Type': 'application/json' }
            });
        if (response.status !== 200) { throw Error('error'); }
        else {
            this.setState({ registerSuccess: true });
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
    public confirmPassword = (e: any) => {
        e.preventDefault();
        if ((this.state.username !== '') && (this.state.email !== '')) {
            if ((this.state.password !== '') && (this.state.passwordConfirm !== '') && (this.state.password === this.state.passwordConfirm)) {
                this.inputName();
                // this.redirectToLogin();
            } else {
                alert('Password and confirmation are not equal')
            }
        } else {
            alert('make sure that email and username are valid inputs')
        }
    }
    public redirectToLogin() {
        console.log('second ', this.state.registerSuccess)
        if (this.state.registerSuccess === true) {
            return <Redirect to='/logIn' />
        }
        else {
            return console.log('error')
        }
    }
    public setSelectedOption = (e: any) => {
        e.preventDefault();
        this.setState({ language: e.target.value })
    }
    public render() {
        if (this.state.registerSuccess === true) {
            return <Redirect to='/logIn' />
        }
        const { t } = this.props;
        return (
            
            <div className="RegisterMain">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
                <form onSubmit={this.confirmPassword} className='registerForm'>
                    <p className="App-intro">{this.state.response}</p>
                    <input className="form-control" placeholder={t!('Username')} aria-label="username" aria-describedby="basic-addon1" onChange={this.handleChangeUser} value={this.state.username} type='text' />
                    <input className="form-control" placeholder={t!('Email')} aria-label="email" aria-describedby="basic-addon1" onChange={this.handleChangeEmail} value={this.state.email} type='text' />
                    <input className="form-control" placeholder={t!('Password')} aria-label="password" aria-describedby="basic-addon1" onChange={this.handleChangePassword} value={this.state.password} type='password' />
                    <input className="form-control" placeholder={t!('Confirm Password')} aria-label="Confirm password" aria-describedby="basic-addon1" onChange={this.handleChangePasswordConfirm} value={this.state.passwordConfirm} type='password' />
                    <div id='search'>
                        <select onChange={this.setSelectedOption} className='dropdown'>
                            <option key='en' value='en' className='dropdown-item' ><Trans>English</Trans></option>
                            <option key='es' value='es' className='dropdown-item' ><Trans>Espanol</Trans></option>
                        </select>
                    </div>
                    <button type="submit" className="inputButton"><Trans>Save</Trans></button>
                    {/* <button onClick={this.confirmPassword} className="inputButton">input</button> */}
                </form>
            </div>
        );
    }
}

export default connect((store: IMyStore)=>({language: store.setProfile.language}))(translate('translations') (Register));
// export default Register;