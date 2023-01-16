import { BossEventPacket } from "bdsx/bds/packets";
import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
import * as fs from "fs";
import * as path from "path";
import { send } from "..";

interface player_data {
    color: BossEventPacket.Colors;
    hidden: boolean;
}

let db: { [name: string]: player_data } = {};

let config: {
    titles: string[];
    default_color: BossEventPacket.Colors;
    change_title_speed: number;
} = {
    titles: [
        "Welcome you",
        "Simple-Bossbar",
        "github.com/itzcandra23/simple-bossbar"
    ],
    default_color: BossEventPacket.Colors.Green,
    change_title_speed: 2000,
};

const configPath = path.join(__dirname, "..", "config.json");
const dataPath = path.join(__dirname, "..", "player_data.json");

try { config = require(configPath) } catch (e) {}
try { db = require(dataPath) } catch (e) {}

export function BossbarTitle(): string {
    const random = Math.floor(Math.random() * config.titles.length);
    return config.titles[random];
}

export namespace SimpleBossBar {
    export function getTitleSpeed(): number {
        return config.change_title_speed;
    }
    export function addPlayer(player: ServerPlayer): boolean {
        if (db.hasOwnProperty(player.getName())) return false;

        db[player.getNameTag()] = {
            color: config.default_color,
            hidden: false
        }
        return true;
    }
    export function getPlayer(player: ServerPlayer): player_data {
        addPlayer(player);
        return db[player.getNameTag()];
    }
    export function setColor(player: ServerPlayer, color: BossEventPacket.Colors): boolean {
        addPlayer(player);
        const data = db[player.getNameTag()];

        if (data.color === color) return false;

        data.color=color;
        return true;
    }
    export function setHiddenMode(player: ServerPlayer, hidden: boolean): boolean {
        addPlayer(player);
        const data = db[player.getNameTag()];

        if (data.hidden === hidden) return false;

        data.hidden=hidden;

        if (data.hidden === true) {
            player.removeBossBar();
        }
        return true;
    }

    export function save(message?: boolean, actor?: ServerPlayer): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 4), (err) => {
            if (message) {
                if (err) send.error(`config.json ${err}`, actor);
                else send.success(`config.json Saved!`, actor);
            }
        });
        fs.writeFile(dataPath, JSON.stringify(db, null, 4), (err) => {
            if (message) {
                if (err) send.error(`config.json ${err}`, actor);
                else send.success(`config.json Saved!`, actor);
            }
        });
    }
}


export namespace SimpleBossBarAdmin {
    export function addTitle(title: string): void {
        const data = config.titles;
        data.push(title);
    }
    export function removeTitle(index: number): boolean {
        if (config.titles.length < index) {
            return false;
        }

        config.titles = config.titles.filter((value, index_) => {
            return index_ !== index;
        });
        return true;
    }
    export function editTitle(title: string, index: number): boolean {
        if (config.titles.length < index) return false;
        if (config.titles[index] === title) return false;

        config.titles[index]=title;
        return true;
    }
    export function getTitle(index: number): string {
        return config.titles[index];
    }
    export function getAllTitle(): string[] {
        return config.titles;
    }
    export function setTitleSpeed(speed: number): boolean {
        if (speed < 0) return false;
        if (speed > 60) return false;
        if (config.change_title_speed === speed) return false;

        config.change_title_speed=speed*1000;
        return true;
    }
    export function getTitleSpeed(): number {
        return config.change_title_speed;
    }
}

events.playerJoin.on(ev => {
    SimpleBossBar.addPlayer(ev.player);
});

events.serverStop.on(() => {
    SimpleBossBar.save();
});