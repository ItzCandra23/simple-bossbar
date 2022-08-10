import { events } from "bdsx/event";
import { BossbarTitle, SimpleBossBar } from ".";
import { connectionList } from "../../../../example_and_test/net-login";

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
