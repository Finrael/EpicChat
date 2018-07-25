import * as React from 'react';
import './conversationComponent.css';
import { IMyStore } from '../../../redux/reducers';
import {message, getMessages, getConversation} from '../../../redux/actions'
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router'
import {sm}  from '../../../Socket'
import { IConversations } from '../../../redux/types/stateTypes';
// import {get} from 'lodash'
interface Imessage {
    conversationId: string;
    messageText: string,
    messageList:Array<{
    }>
    // messagesToShow:string[]
    // message: (messageText: string) => void;
}
interface Iprops extends RouteComponentProps<{id:string}>{
    message:(messageText:string, convId:string)=>void,
    getMessages:(convId:string)=>void,
    // messageList:ImessageType[],
    getConversation:(convId:string)=>Promise<void>,
    conversation:IConversations;
    // messageText: string,
    // messageTime: Date,
    // messageOriginator: { _Id: string, name: string },
    // conversationId: string,
}
// interface IMessageList{
//     messageList:ImessageType[]
//     conversationId: string,
// }
// interface ImessageType{
//     messageText: string,
//     messageTime: Date,
//     messageOriginator: { _Id: string, name: string },
//     conversationId: string,
//     _id:string,
// }
// interface Itmessages{
//     '5b4cdfba6a7f6b3364d54ee6':{},
//     conversationId:{}
// }
class Conversation extends React.Component< Iprops, Imessage>{
    constructor(props:Iprops) {
        super(props);
        this.state = {
            conversationId: '',
           messageText:'',
           messageList:[]
        //    messagesToShow:[]
            // message:('')=>void
        };
        
    }
public sendMessage=(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    // console.log('no empty')
    this.props.message(this.state.messageText, this.state.conversationId)
    this.printMessages();
    // this.props.getMessages(this.state.conversationId);
}
public componentDidMount() {
    // console.log(this.props.match.params.id)
    this.setState({conversationId: this.props.match.params.id})
    // this.props.getMessages(this.props.match.params.id);
    const convId= this.props.match.params.id
    this.props.getConversation(convId).then(()=>{
        this.props.getMessages(convId);
    });
    
}
// public componentWillReceiveProps(newProps:Iprops){
// if (newProps.conversation===undefined){
//     const convId= this.props.match.params.id
//     this.props.getConversation(convId).then(()=>{
//         this.props.getMessages(convId);
//     });
// }
// }
public handleChangeMessage = (event:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({messageText:event.target.value})
    // console.log(this.state.messageText)
}
public GETMessages=async()=>{
    // console.log(this.state.conversationId)
    
        //   const messages=   await  this.props.getMessages(this.state.conversationId);
        //    this.props.getMessages;
        //   console.log(this.props.messageList)
        // const options:any = []
        // console.log('list of messages:', this.props.conversation)
        this.setMessagesOnScreen()
}

public setMessagesOnScreen=async()=>{
    const messages =    this.props.conversation;
    // const x = Object.keys(messages)
    console.log('from messages',messages.messageList)

        return messages.messageList.map(m=>(
        <div key={m.conversationId}> {m.messageOriginator.name}:{m.messageText} </div>
    ))
    // console.log('form messages messagelist',messages.messageList.messageList)
    // console.log('form messages messagelist',messages.messageList)
    // const messageDepure:string[] = [];
    // for (let i =0; messages.length>i;i++){
    //     messageDepure.push(
    //     'From:'+messages[i].messageOriginator.name+
    //     ' '+messages[i].messageText)
    // }

//   await  this.setState({messagesToShow:messageDepure})
//   console.log(this.state.messagesToShow)
} 
public printMessages=()=>{
try{
  const messages =this.props.conversation;

   return messages.messageList.map(m=>(
    <div key={m.messageTime.toString()}> {m.messageOriginator.name}:{m.messageText} </div>
))
}catch{
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
                        <button className="btn btn-outline-secondary" type="button" onClick={this.sendMessage}>Send</button>
                    </div>
                    <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" onChange={this.handleChangeMessage}/>
                </div>
                <button className="btn btn-outline-secondary" type="button" onClick={this.GETMessages}>AUXILIAR BUTTON</button>
            </div>
        );
    } 
}
export default connect<{},{},{},IMyStore>((Store, props: Iprops)=>({
    // messageText:Store.message.messageText,
    // messageTime:Store.message.messageTime,
    // messageOriginator:Store.message.messageOriginator,
    // messageList:Store.getMessages.conversations,
    conversation:Store.getMessages.conversations[props.match.params.id],
    
}),{message, getMessages, getConversation})(Conversation)

// thids to high order

// export default Conversation;