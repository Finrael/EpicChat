import * as React from 'react';
interface ILogin {
  value: string;
  response: any;
  email: string;
  password: string;
  unauthorized: boolean;
}

class Login extends React.Component<{}, ILogin>{
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      response: '',
      email: '',
      password: '',
      unauthorized: false
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  public onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch('/api/logIn',
      {
        method: 'post', body: JSON.stringify(
          {
            email: this.state.email,
            password: this.state.password
          }),
        credentials:'include',
        headers: { 'Content-Type': 'application/json' }
      });
    // debugger;
    if (response.status !== 200) {return this.setState({unauthorized: true}) }
    const body = await response.json();
    return body;
  }
  public componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }
  public callApi = async () => {
    const response = await fetch('/api/logIn');
    const body = await response.json();
    sessionStorage.setItem('jwtToken', body.password)
    if (response.status !== 200) { throw Error(body.message); }
    return body;
  };
  // function to stablish state.email
  public handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  }
  // function to stablish state.password
  public handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  }
  public render() {
    return (
      <div className="loginMain">
        <form onSubmit={this.onSubmit}>
          <p className="App-intro">{this.state.response}</p>
          <div>
          <label>email:</label>
          <input className='inputEmail' onChange={this.handleChangeEmail} value={this.state.email} type='text' />
          </div>
          <div>
          <label>password:</label>
          <input className='inputPassword' onChange={this.handleChangePassword} value={this.state.password} type='text' />
          </div>
          <button type="submit" className="inputButton">input</button>
          {
            this.state.unauthorized ? "Username or password is incorrect": ""
          }
        </form>
      </div>
    );
  }
}

export default Login;