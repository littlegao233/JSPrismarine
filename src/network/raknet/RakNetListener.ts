import Connection from './Connection';
import { Socket } from 'dgram';

export default interface RakNetListener {
    sendBuffer(buffer: Buffer, address: string, port: number): void;
    getSocket(): Socket;
    emit(event: string | symbol, ...args: any[]): void; // Class should also extend EventEmitter.
    removeConnection(connection: Connection, reason: string): void; // and also hold connections if needed.
}
