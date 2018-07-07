import * as React from 'react';
import './conversationComponent.css';
interface IRegister {
    value: string;
}

class Conversation extends React.Component<{}, IRegister>{
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
        };
    }

    public render() {

        return (
            
            <div className="RegisterMain">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <textarea>here for the messages </textarea>
            </div>
        );
    }
}

export default Conversation;