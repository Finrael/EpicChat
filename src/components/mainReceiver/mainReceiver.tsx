import * as React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {

    public render() {

        return (
            <div className="RegisterMain">
                <form>
                    <label> Select Route:</label>
                    <ul>
                        <li>
                            <Link to={'./'}> Home</Link>
                        </li>
                        <li>
                            <Link to={`/register`} >Register</Link>
                        </li>
                        <li>
                            <Link to={`/logIn`} >LogIn</Link>
                        </li>
                        <li>
                            <Link to={`/dashboard`} >Dashboard</Link>
                        </li>
                    </ul>
                    {/* <button onClick={} className="inputButton">Register</button> */}
                </form>
            </div>
        );
    }
}

export default Register;