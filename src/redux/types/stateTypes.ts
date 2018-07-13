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

export interface IMessages  {
  messageText: string,
  messageTime: Date,
  messageOriginator: { _Id: string, name: string },
  conversationId: string,
}

export interface IGetMessages{
  messageList:IMessages[]
  conversationId: string,
}