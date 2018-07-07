export interface IState{
    name:string,
    email:string,
    contacts:Array<{contactName:string, _id:string}>,
    selectedContact:string,
  }

  export interface ISelectedConversation{
    selectedConversation:string
  }