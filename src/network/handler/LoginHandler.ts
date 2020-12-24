import Identifiers from '../Identifiers';
import type LoginPacket from '../packet/LoginPacket';
import PacketHandler from './PacketHandler';
import PlayStatus from '../type/play-status';
import type Player from '../../player/Player';
import type Server from '../../Server';
import ResourcePacksInfoPacket from '../packet/ResourcePacksInfoPacket';

export default class LoginHandler implements PacketHandler<LoginPacket> {
    public handle(packet: LoginPacket, server: Server, player: Player): void {
        // check if player count >= max players

        // Kick client if has newer / older client version
        if (packet.protocol !== Identifiers.Protocol) {
            if (packet.protocol < Identifiers.Protocol) {
                player
                    .getConnection()
                    .sendPlayStatus(PlayStatus.LoginFailedClient);
            } else {
                player
                    .getConnection()
                    .sendPlayStatus(PlayStatus.LoginFailedServer);
            }
            return;
        }

        if (!packet.displayName) {
            player.kick('Invalid username!');
            return;
        }

        // Player with same name is already online
        let maybePlayer = null;
        if ((maybePlayer = server.getPlayerByExactName(packet.displayName)))
            maybePlayer.kick('Logged in from another location');

        player.username.name = packet.displayName;
        player.locale = packet.languageCode;
        player.randomId = packet.clientRandomId;
        player.uuid = packet.identity;
        player.xuid = packet.XUID;

        player.skin = packet.skin;
        player.device = packet.device;

        player.getConnection().sendPlayStatus(PlayStatus.LoginSuccess);

        const reason = server.getBanManager().isBanned(player);
        if (reason !== false) {
            player.kick(
                `You have been banned${reason ? ` for reason: ${reason}` : ''}!`
            );
            return;
        }

        let pk = new ResourcePacksInfoPacket();
        player.getConnection().sendDataPacket(pk);
    }
}
