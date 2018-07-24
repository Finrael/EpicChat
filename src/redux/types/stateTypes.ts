export interface IState {
  name: string,
  email: string,
  contacts: Array<{ contactName: string, _id: string }>,
  selectedContact: string,
}

export interface ISelectedConversation {
  selectedConversation: string
}

export interface IgetAvailableContacts {
  contacts: Array<{
    convId: string,
    contactId: string
  }>
}

export interface IMessages {
  messageText: string,
  messageTime: Date,
  messageOriginator: { _Id: string, name: string },
  conversationId: string,
}

export interface IGetMessages {
  conversations: {[convId:string]: IConversations};
  // messageList: IMessages[],
  // conversationId: string,
}

export interface IConversations {
  participants: Array<{
    participant: string,
    joinedDate: Date, 
    status: number
  }>;
  creationTime: Date;
  messageList: IMessages[];
}


export interface IHandleConversations {
  conversations: {[convId:string]: IConversations};
}
