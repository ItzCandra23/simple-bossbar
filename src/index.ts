import { events } from "bdsx/event";
import { BossbarTitle, SimpleBossBar } from "./bossbar";
import { bedrockServer } from "bdsx/launcher";
import "./command";
import "./bossbar";
import "./form";

const bossbar = setInterval(() => {
    for (const player of bedrockServer.serverInstance.getPlayers()) {
        const data = SimpleBossBar.getPlayer(player);

        if (data.hidden === true) {
            player.removeBossBar();
            return;
        }

        player.setBossBar(BossbarTitle(), 200, data.color);
    }
}, SimpleBossBar.getTitleSpeed());

events.serverStop.on(() => {
    clearInterval(bossbar);
});
