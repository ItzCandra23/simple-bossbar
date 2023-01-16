import "./bossbar";
import "./command";
import "./bossbar/interval";
import { events } from "bdsx/event";
import { BossbarTitle, SimpleBossBar } from "./bossbar";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";

const networks = new Map<NetworkIdentifier, string>();

const bossbar = setInterval(() => {
    for (const ni of networks.keys()) {
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

events.playerJoin.on((data) => {
    networks.set(data.player.getNetworkIdentifier(), data.player.getNameTag());
});

events.playerLeft.on((data) => {
    networks.delete(data.player.getNetworkIdentifier());
});

events.serverStop.on(() => {
    clearInterval(bossbar);
});
