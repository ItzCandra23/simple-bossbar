"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const _1 = require(".");
const net_login_1 = require("../../../../example_and_test/net-login");
const bossbar = setInterval(() => {
    for (const ni of net_login_1.connectionList.keys()) {
        const pl = ni.getActor();
        if (!pl)
            continue;
        const data = _1.SimpleBossBar.getPlayer(pl);
        if (data.hidden === true) {
            pl.removeBossBar();
            return;
        }
        pl.setBossBar((0, _1.BossbarTitle)(), 200, data.color);
    }
}, _1.SimpleBossBar.getTitleSpeed());
event_1.events.serverStop.on(() => {
    clearInterval(bossbar);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJ2YWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcnZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvQztBQUNwQyx3QkFBZ0Q7QUFDaEQsc0VBQXdFO0FBRXhFLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7SUFDN0IsS0FBSyxNQUFNLEVBQUUsSUFBSSwwQkFBYyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsRUFBRTtZQUFFLFNBQVM7UUFFbEIsTUFBTSxJQUFJLEdBQUcsZ0JBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFekMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN0QixFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDbkIsT0FBTztTQUNWO1FBRUQsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFBLGVBQVksR0FBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEQ7QUFDTCxDQUFDLEVBQUUsZ0JBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBRWxDLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUN0QixhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUMifQ==