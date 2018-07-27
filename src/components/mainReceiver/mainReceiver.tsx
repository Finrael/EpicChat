import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import  "./mainReceiver.css";
import { translate, Trans } from 'react-i18next';
import { IMyStore } from '../../redux/reducers';
class Register extends React.Component {

    public render() {

        return (
            <div className='mainReceiver'>
                <form>
                    <div className='w-100'>
                    {/* <label className='row'> Select Route:</label> */}
                    <ul className='navigationList'>
                        <li>
                            <Link to={'./'}className='col'><Trans>Home</Trans></Link>
                        </li>
                        <li>
                            <Link to={`/register`}className='col' ><Trans>Register</Trans></Link>
                        </li>
                        <li>
                            <Link to={`/logIn`} className='col'><Trans>LogIn</Trans></Link>
                        </li>
                        <li>
                            <Link to={`/dashboard`} className='col'><Trans>Dashboard</Trans></Link>
                        </li>
                        <li>
                            <Link to={`/dashboard/conversation`} className='col'><Trans>Conversation</Trans></Link>
                        </li>
                        <li>
                            <Link to={`/dashboard/LFU`} className='col'><Trans>Add Contacts</Trans></Link>
                        </li>
                        <li>
                            <Link to={`/dashboard/selectLanguage`} className='col'><Trans>Select Language</Trans></Link>
                        </li>
                    </ul>
                    {/* <button onClick={} className="inputButton">Register</button> */}
                </div>
                </form>
            </div>
        );
    }
}

export default connect((store: IMyStore)=>({language: store.setProfile.language}))(translate('translations') (Register));