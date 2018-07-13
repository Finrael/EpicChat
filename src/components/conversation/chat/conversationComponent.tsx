import * as React from 'react';
import './conversationComponent.css';
import { IMyStore } from '../../../redux/reducers';
import {message, getMessages} from '../../../redux/actions'
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router'

interface Imessage {
    conversationId: string;
    messageText: string
    messagesToShow:string[]
    // message: (messageText: string) => void;
}
interface Iprops{
    message:(messageText:string, convId:string)=>void,
    getMessages:(convId:string)=>void,
    messageList:ImessageType[],
    
    // messageText: string,
    // messageTime: Date,
    // messageOriginator: { _Id: string, name: string },
    // conversationId: string,
}
// interface IMessageList{
//     messageList:ImessageType[]
//     conversationId: string,
// }
interface ImessageType{
    messageText: string,
    messageTime: Date,
    messageOriginator: { _Id: string, name: string },
    conversationId: string,
    _id:string,
}
class Conversation extends React.Component<RouteComponentProps<{id:string}> &Iprops, Imessage>{
    constructor(props: RouteComponentProps<{id:string}> & Iprops) {
        super(props);
        this.state = {
            conversationId: '',
           messageText:'',
           messagesToShow:[]
            // message:('')=>void
        };
        
    }
public sendMessage=(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    // console.log('no empty')
    this.props.message(this.state.messageText, this.state.conversationId)
    // this.props.getMessages(this.state.conversationId);
}
public componentDidMount() {
    // console.log(this.props.match.params.id)
    this.setState({conversationId: this.props.match.params.id})
    this.props.getMessages(this.props.match.params.id);
    
}
public handleChangeMessage = (event:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({messageText:event.target.value})
    // console.log(this.state.messageText)
}
public GETMessages=async()=>{
    console.log(this.state.conversationId)
    await  this.props.getMessages(this.state.conversationId);
          const messages=    this.props.messageList;
        //   console.log(this.props.messageList)
        // const options:any = []
        console.log('list of messages:', messages)
        this.setMessagesOnScreen()
}
public setMessagesOnScreen=async()=>{
    const messages=    this.props.messageList;
    console.log('from messages',messages)
    const messageDepure:string[] = [];
    for (let i =0; messages.length>i;i++){
        messageDepure.push(
        'From:'+messages[i].messageOriginator.name+
        ' '+messages[i].messageText)
    }

  await  this.setState({messagesToShow:messageDepure})
  console.log(this.state.messagesToShow)
}
public printMessages=()=>{
    return this.props.messageList.map(m=>(
        <div key={m._id}> {m.messageOriginator.name}:{m.messageText} </div>
    ))
}
    public render() {

        return (
           
            <div className="RegisterMain">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />

                <textarea defaultValue='messages'/>
                    {this.printMessages()}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.sendMessage}>Send</button>
                    </div>
                    <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" onChange={this.handleChangeMessage}/>
                </div>
                <button className="btn btn-outline-secondary" type="button" onClick={this.GETMessages}>AUXILIAR BUTTON</button>
            </div>
        );
    }
}
export default connect<{},{},{},IMyStore>((Store)=>({
    messageText:Store.message.messageText,
    messageTime:Store.message.messageTime,
    messageOriginator:Store.message.messageOriginator,
    conversationId:Store.message.conversationId,
    messageList:Store.getMessages.messageList,
}),{message, getMessages})(Conversation)


// export default Conversation;