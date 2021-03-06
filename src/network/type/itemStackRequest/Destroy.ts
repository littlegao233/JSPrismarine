import type ItemStackRequestSlotInfo from './ItemStackRequestSlotInfo';

class Destroy {
    public count: number;
    public from: ItemStackRequestSlotInfo;

    constructor({
        count,
        from
    }: {
        count: number;
        from: ItemStackRequestSlotInfo;
    }) {
        this.count = count;
        this.from = from;
    }
}

export default Destroy;
