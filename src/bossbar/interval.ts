import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { events } from "bdsx/event";
import { BossbarTitle, SimpleBossBar } from ".";

const connectionList = new Map<NetworkIdentifier, string>();

events.playerJoin.on((data) => {
    connectionList.set(data.player.getNetworkIdentifier(), data.player.getNameTag());
});

events.playerLeft.on((data) => {
    connectionList.delete(data.player.getNetworkIdentifier());
});

const bossbar = setInterval(() => {
    for (const ni of connectionList.keys()) {
        const pl = ni.getActor()!;
        if (!pl) continue;

        const data = SimpleBossBar.getPlayer(pl);

        if (data.hidden === true) {
            pl.removeBossBar();
            return;
        }

        pl.setBossBar(BossbarTitle(), 200, data.color);
    }
}, SimpleBossBar.getTitleSpeed());

events.serverStop.on(() => {
    clearInterval(bossbar);
});
