import * as React from 'react';
import { Link } from 'react-router-dom';
import  "./mainReceiver.css";
class Register extends React.Component {

    public render() {

        return (
            <div className='mainReceiver'>
                <form>
                    <div className='w-100'>
                    <label className='row'> Select Route:</label>
                    <ul className='navigationList'>
                        <li>
                            <Link to={'./'}className='col'> Home</Link>
                        </li>
                        <li>
                            <Link to={`/register`}className='col' >Register</Link>
                        </li>
                        <li>
                            <Link to={`/logIn`} className='col'>LogIn</Link>
                        </li>
                        <li>
                            <Link to={`/dashboard`} className='col'>Dashboard</Link>
                        </li>
                        <li>
                            <Link to={`/conversation`} className='col'>Conversation</Link>
                        </li>
                    </ul>
                    {/* <button onClick={} className="inputButton">Register</button> */}
                </div>
                </form>
            </div>
        );
    }
}

export default Register;