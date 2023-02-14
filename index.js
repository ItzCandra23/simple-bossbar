"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleBossBar = void 0;
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
const message_1 = require("./src/utils/message");
const src_1 = require("./src");
const path = require("path");
const fs = require("fs");
let players = {};
const dataPath = path.join(__dirname, "player_data.json");
try {
    players = require(dataPath);
}
catch (e) { }
var SimpleBossBar;
(function (SimpleBossBar) {
    function addPlayer(player) {
        if (players.hasOwnProperty(player.getNameTag()))
            return false;
        players[player.getNameTag()] = {
            color: src_1.BossbarConfig.getBossbarColor(),
            hidden: false
        };
        return true;
    }
    SimpleBossBar.addPlayer = addPlayer;
    function setColor(player, color, message = false) {
        addPlayer(player);
        const send = new message_1.sendMessage(player, message);
        const data = players[player.getNameTag()];
        if (data.color === color)
            return false;
        if (color > 6 || color < 0) {
            send.error(`Invalid bossbar`);
            return false;
        }
        send.success(`Color: &f${[packets_1.BossEventPacket.Colors[color]]}`);
        players[player.getNameTag()].color = color;
        return true;
    }
    SimpleBossBar.setColor = setColor;
    function getColor(player) {
        addPlayer(player);
        return players[player.getNameTag()].color;
    }
    SimpleBossBar.getColor = getColor;
    function setHiddenMode(player, hidden, message = false) {
        addPlayer(player);
        const send = new message_1.sendMessage(player, message);
        const data = players[player.getNameTag()];
        if (data.hidden === hidden)
            return false;
        if (data.hidden === true) {
            player.removeBossBar();
        }
        send.success(`IsHidden: &f${hidden}`);
        data.hidden = hidden;
        return true;
    }
    SimpleBossBar.setHiddenMode = setHiddenMode;
    function isHidden(player) {
        addPlayer(player);
        return players[player.getNameTag()].hidden;
    }
    SimpleBossBar.isHidden = isHidden;
    function save(message = false) {
        fs.writeFile(dataPath, JSON.stringify(players, null, 2), "utf8", (err) => {
            if (message) {
                if (err)
                    message_1.send.error(`players.json ${err}`);
                else
                    message_1.send.success(`players.json Saved!`);
            }
        });
    }
    SimpleBossBar.save = save;
})(SimpleBossBar = exports.SimpleBossBar || (exports.SimpleBossBar = {}));
const networks = new Map();
const bossbar = setInterval(() => {
    for (const [netId, player] of networks) {
        if (SimpleBossBar.isHidden(player)) {
            player.removeBossBar();
            return;
        }
        player.setBossBar(src_1.BossbarConfig.BossbarTitle(), 200, SimpleBossBar.getColor(player));
    }
}, src_1.BossbarConfig.getTitleSpeed());
event_1.events.playerJoin.on(ev => {
    networks.set(ev.player.getNetworkIdentifier(), ev.player);
    SimpleBossBar.addPlayer(ev.player);
});
event_1.events.playerLeft.on((ev) => { networks.delete(ev.player.getNetworkIdentifier()); });
event_1.events.serverOpen.on(() => {
    require("./src");
    require("./src/commands");
    message_1.send.success(`Started!`);
});
event_1.events.serverClose.on(() => {
    clearInterval(bossbar);
    src_1.BossbarConfig.save(true);
    SimpleBossBar.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBbUQ7QUFHbkQsc0NBQW9DO0FBQ3BDLGlEQUF3RDtBQUN4RCwrQkFBc0M7QUFDdEMsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQU96QixJQUFJLE9BQU8sR0FBa0MsRUFBRSxDQUFDO0FBRWhELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFFMUQsSUFBSTtJQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7Q0FBRTtBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7QUFFaEQsSUFBaUIsYUFBYSxDQThEN0I7QUE5REQsV0FBaUIsYUFBYTtJQUUxQixTQUFnQixTQUFTLENBQUMsTUFBb0I7UUFDMUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRTlELE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRztZQUMzQixLQUFLLEVBQUUsbUJBQWEsQ0FBQyxlQUFlLEVBQUU7WUFDdEMsTUFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQTtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFSZSx1QkFBUyxZQVF4QixDQUFBO0lBRUQsU0FBZ0IsUUFBUSxDQUFDLE1BQW9CLEVBQUUsS0FBNkIsRUFBRSxVQUFtQixLQUFLO1FBQ2xHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQixNQUFNLElBQUksR0FBRyxJQUFJLHFCQUFXLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUUxQyxJQUFJLElBQUksQ0FBQyxLQUFL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