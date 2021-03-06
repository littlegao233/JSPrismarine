import TextHandler from './TextHandler';
import TextPacket from '../packet/TextPacket';

describe('network', () => {
    describe('handler', () => {
        describe('TextHandler', () => {
            it('handle', (done) => {
                const pk = new TextPacket();
                pk.message = 'hello world';

                const handler = new TextHandler();
                handler.handle(
                    pk,
                    {
                        getChatManager: () => ({
                            send: (chat) => {
                                expect(chat.getMessage()).toBe(
                                    'runner hello world'
                                );
                                done();
                            }
                        })
                    } as any,
                    {
                        getFormattedUsername: () => {
                            return 'runner';
                        }
                    } as any
                );
            });
        });
    });
});
