import * as React from 'react';
import { connect } from 'react-redux';
import { IMyStore } from '../../redux/reducers';
import { setLanguage } from '../../redux/actions';
import './lookForContacts.css';
// import { Options } from 'react-i18next/src/i18n';
import { translate, Trans } from 'react-i18next';
import { TransProps } from 'react-i18next/src/trans';
interface ISelectLanguage {
    language: string;
    languageSelected: string;
}
interface Iprops extends TransProps {
    language: string;
    setLanguage: (language: string) => Promise<void>;
    setProfile: () => void;

}
class SelectLanguage extends React.Component<Iprops, ISelectLanguage>{
    constructor(props: any) {
        super(props);
        this.state = {
            language: this.props.language,
            languageSelected: 'en',

        }

    }
    public setSelectedOption = async (e: any) => {
        e.preventDefault();
        this.setState({ language: e.target.value })
        this.changeLanguage(e.target.value);
    }
    public updateLanguage = () => {
        this.props.setLanguage(this.state.language);
    }
    public changeLanguage = (language: string) => {
        this.props.i18n!.changeLanguage(language)
        // this.forceUpdate();
    }
    public render() {
        const { t } = this.props;
        return (
            <div className="selectLanguage">
                <label>{t!('Select your Language')}</label>
                <select onChange={this.setSelectedOption} className='dropdown'>
                    <option key='en' value='en' className='dropdown-item' ><Trans>English</Trans></option>
                    <option key='es' value='es' className='dropdown-item' ><Trans>Espanol</Trans></option>
                </select>
                <button className='input' onClick={this.updateLanguage}>{t!("Save")}</button>
            </div>
        );
    }
}

export default connect((Store: IMyStore) => ({ language: Store.setProfile.language }), { setLanguage })(translate('translations')(SelectLanguage));