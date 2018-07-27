import * as React from 'react';
import './conversationComponent.css';
import { IMyStore } from '../../../redux/reducers';
import { message, getMessages, getConversation } from '../../../redux/actions'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router'
import { sm } from '../../../Socket'
import { IConversations } from '../../../redux/types/stateTypes';
import { translate, Trans } from 'react-i18next';

interface Imessage {
    conversationId: string;
    messageText: string,
    messageList: Array<{
    }>
}
interface Iprops extends RouteComponentProps<{ id: string }> {
    message: (messageText: string, convId: string) => void,
    getMessages: (convId: string) => void,
    getConversation: (convId: string) => Promise<void>,
    conversation: IConversations;
    // messageBos:
    // setProfile:()=>void,

}

class Conversation extends React.Component<Iprops, Imessage>{
    public messagesBox: HTMLDivElement | undefined;
    constructor(props: Iprops) {
        super(props);
        this.state = {
            conversationId: '',
            messageText: '',
            messageList: [],

        };

    }
    public sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // console.log('no empty')
        this.props.message(this.state.messageText, this.state.conversationId)
        this.printMessages();
        this.setState({ messageText:'' })
    }
    public componentDidMount() {
        this.setState({ conversationId: this.props.match.params.id })
        const convId = this.props.match.params.id
        this.props.getConversation(convId).then(() => {
            this.props.getMessages(convId);
        });
        this.messagesBox = (document.getElementsByClassName('mainchat')[0] as HTMLDivElement);
        this.scrollDown(this.messagesBox);

    }
    public componentDidUpdate() {
        this.scrollDown(this.messagesBox);
    }
    public scrollDown = (element?: HTMLElement) => {
        if (element) {
            element.scrollTop = element.scrollHeight - element.clientHeight;
        }
    }
    public handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ messageText: event.target.value })
    }
    public GETMessages = async () => {
        this.setMessagesOnScreen()
    }

    public setMessagesOnScreen = async () => {
        const messages = this.props.conversation;
        // const x = Object.keys(messages)
        console.log('from messages', messages.messageList)

        return messages.messageList.map(m => (
            <div key={m.conversationId}> {m.messageOriginator.name}:{m.messageText} </div>
        ))

    }
    public printMessages = () => {
        try {
            const messages = this.props.conversation;

            return messages.messageList.map(m => (
                <div key={m.messageTime.toString()}> {m.messageOriginator.name}:{m.messageText} </div>
            ))
        } catch{
            return []

        }
    }
    public render() {
        sm.emit('ss');
        const msgs = this.printMessages();
        return (

            <div className="RegisterMain">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />

                {/* <textarea defaultValue='messages'/> */}
                <div className="mainchat">
                    {msgs}
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.sendMessage}><Trans>Send</Trans></button>
                    </div>
                    <input type="text" id='textToSend' className="form-control" placeholder="" aria-label=""
                     aria-describedby="basic-addon1" onChange={this.handleChangeMessage} value={this.state.messageText} />
                </div>
                {/* <button className="btn btn-outline-secondary" type="button" onClick={this.GETMessages}>AUXILIAR BUTTON</button> */}
            </div>
        );
    }
}
export default connect<{}, {}, {}, IMyStore>((Store, props: Iprops) => ({

    conversation: Store.getMessages.conversations[props.match.params.id],
    language: Store.setProfile.language

}), { message, getMessages, getConversation })(translate('translations')(Conversation))