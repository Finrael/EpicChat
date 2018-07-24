import * as io from 'socket.io-client';
import { Dispatch } from '../node_modules/redux';
import {IMessages} from './redux/types/stateTypes';
let dispatchAux:Dispatch;

export function initFunc(dispatch: Dispatch){

    dispatchAux= dispatch
}
const socket = io({ autoConnect: false });

socket.on('newMessage', (payload:IMessages)=>{
    console.log('payload from socket.ts',payload)
    dispatchAux({type:'NEW_MESSAGE', payload})})

socket.on('This is for some reason an event', (data: any) => { console.log('Socket component online', data) })

socket.on('connection', ()=>{
    console.log('socket connected');
})

export const sm =
{
    connect: () => {
        socket.open();
        console.log('something');
    },
    emit: (event: string, ...args: any[]) => {
        socket.emit(event, ...args);
    },
    // on:(event: string, fn: any )=>{
    //     socket.on(event, fn)
    // },
    disconnect:()=>{
        socket.disconnect();
    }

}



// export default sm;