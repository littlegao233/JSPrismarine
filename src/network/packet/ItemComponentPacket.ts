import DataPacket from './DataPacket';
import Identifiers from '../Identifiers';

export default class ItemComponentPacket extends DataPacket {
    static NetID = Identifiers.ItemComponentPacket;

    public encodePayload(): void {
        this.writeUnsignedVarInt(0); // item count
    }
}
