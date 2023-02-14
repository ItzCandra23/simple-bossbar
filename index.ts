import { BossEventPacket } from "bdsx/bds/packets";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { send, sendMessage } from "./src/utils/message";
import { BossbarConfig } from "./src";
import * as path from "path";
import * as fs from "fs";

export interface PlayerBossbar {
    color: BossEventPacket.Colors;
    hidden: boolean;
}

let players: Record<string, PlayerBossbar> = {};

const dataPath = path.join(__dirname, "player_data.json");

try { players = require(dataPath) } catch (e) {}

export namespace SimpleBossBar {

    export function addPlayer(player: ServerPlayer): boolean {
        if (players.hasOwnProperty(player.getNameTag())) return false;

        players[player.getNameTag()] = {
            color: BossbarConfig.getBossbarColor(),
            hidden: false
        }
        return true;
    }

    export function setColor(player: ServerPlayer, color: BossEventPacket.Colors, message: boolean = false): boolean {
        addPlayer(player);
        const send = new sendMessage(player, message);
        const data = players[player.getNameTag()];

        if (data.color === color) return false;

        if (color > 6||color < 0) {
            send.error(`Invalid bossbar`);
            return false;
        }

        send.success(`Color: &f${[BossEventPacket.Colors[color]]}`);
        players[player.getNameTag()].color=color;
        return true;
    }

    export function getColor(player: ServerPlayer): BossEventPacket.Colors {
        addPlayer(player);
        return players[player.getNameTag()].color;
    }

    export function setHiddenMode(player: ServerPlayer, hidden: boolean, message: boolean = false): boolean {
        addPlayer(player);
        const send = new sendMessage(player, message);
        const data = players[player.getNameTag()];

        if (data.hidden === hidden) return false;
        if (data.hidden === true) {
            player.removeBossBar();
        }

        send.success(`IsHidden: &f${hidden}`);
        data.hidden=hidden;
        return true;
    }

    export function isHidden(player: ServerPlayer): boolean {
        addPlayer(player);
        return players[player.getNameTag()].hidden;
    }

    export function save(message: boolean = false): void {
        fs.writeFile(dataPath, JSON.stringify(players, null, 2), "utf8", (err) => {
            if (message) {
                if (err) send.error(`players.json ${err}`);
                else send.success(`players.json Saved!`);
            }
        });
    }
}

const networks = new Map<NetworkIdentifier, ServerPlayer>();

const bossbar = setInterval(() => {
    for (const [netId, player] of networks) {
        if (SimpleBossBar.isHidden(player)) {
            player.removeBossBar();
            return;
        }

        player.setBossBar(BossbarConfig.BossbarTitle(), 200, SimpleBossBar.getColor(player));
    }
}, BossbarConfig.getTitleSpeed());

events.playerJoin.on(ev => {
    networks.set(ev.player.getNetworkIdentifier(), ev.player);
    SimpleBossBar.addPlayer(ev.player);
});

events.playerLeft.on((ev) => { networks.delete(ev.player.getNetworkIdentifier()) });

events.serverOpen.on(() => {
    require("./src");
    require("./src/commands");
    send.success(`Started!`);
});

events.serverClose.on(() => {
    clearInterval(bossbar);
    BossbarConfig.save(true);
    SimpleBossBar.save(true);
});