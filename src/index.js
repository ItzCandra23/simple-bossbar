"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./bossbar");
require("./command");
require("./bossbar/interval");
const event_1 = require("bdsx/event");
const bossbar_1 = require("./bossbar");
const networks = new Map();
const bossbar = setInterval(() => {
    for (const ni of networks.keys()) {
        const pl = ni.getActor();
        if (!pl)
            continue;
        const data = bossbar_1.SimpleBossBar.getPlayer(pl);
        if (data.hidden === true) {
            pl.removeBossBar();
            return;
        }
        pl.setBossBar((0, bossbar_1.BossbarTitle)(), 200, data.color);
    }
}, bossbar_1.SimpleBossBar.getTitleSpeed());
event_1.events.playerJoin.on((data) => {
    networks.set(data.player.getNetworkIdentifier(), data.player.getNameTag());
});
event_1.events.serverStop.on(() => {
    clearInterval(bossbar);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFCQUFtQjtBQUNuQixxQkFBbUI7QUFDbkIsOEJBQTRCO0FBQzVCLHNDQUFvQztBQUNwQyx1Q0FBd0Q7QUFHeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQTZCLENBQUM7QUFFdEQsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtJQUM3QixLQUFLLE1BQU0sRUFBRSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM5QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLEVBQUU7WUFBRSxTQUFTO1FBRWxCLE1BQU0sSUFBSSxHQUFHLHVCQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDdEIsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ25CLE9BQU87U0FDVjtRQUVELEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBQSxzQkFBWSxHQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsRDtBQUNMLENBQUMsRUFBRSx1QkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7QUFFbEMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUMxQixRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDL0UsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDIn0=