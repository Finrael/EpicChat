import * as React from 'react'
import * as mySocket from '../../Socket'
// import * as Dashboard from '../dashboardComponents/dashboard';
// import { Socket } from 'socket.io-client';

export interface ISocketProps {
    io: typeof mySocket;
}
export function HOC<P>(Component: React.ComponentClass<P & ISocketProps>) {
    return class extends React.Component<P & ISocketProps> {
        public render() {
            return <Component {...this.props} io={mySocket} />;
        }
    }
}