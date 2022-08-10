import { BossEventPacket } from "bdsx/bds/packets";
import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";

const fs = require("fs");

let db: { [name: string]: player_data } = {};

interface player_data {
    color: BossEventPacket.Colors;
    hidden: boolean;
}

let config = {
    "title": [
        "Welcome you",
        "Simple-Bossbar",
        "github.com/itzcandra23/simple-bossbar"
    ],
    "default_color": BossEventPacket.Colors.Green,
    "title_speed": 2000
};


try { config = require(__dirname + '/config.json') } catch (e) {}
try { db = require(__dirname + '/player_data.json') } catch (e) {}

export function BossbarTitle(): string {
    const random = Math.floor(Math.random() * config.title.length);
    return config.title[random];
}

export class SimpleBossBar {
    static getTitleSpeed(): number {
        return config.title_speed;
    }
    static addPlayer(player: ServerPlayer): boolean {
        if (db.hasOwnProperty(player.getName())) return false;

        db[player.getName()] = {
            "color": config.default_color,
            "hidden": false
        }
        return true;
    }
    static getPlayer(player: ServerPlayer): player_data {
        this.addPlayer(player);
        return db[player.getName()];
    }
    static setColor(player: ServerPlayer, color: BossEventPacket.Colors): boolean {
        this.addPlayer(player);
        const data = db[player.getName()];

        if (data.color === color) return false;

        data.color=color;
        return true;
    }
    static setHiddenMode(player: ServerPlayer, hidden: boolean): boolean {
        this.addPlayer(player);
        const data = db[player.getName()];

        if (data.hidden === hidden) return false;

        data.hidden=hidden;

        if (data.hidden === true) {
            player.removeBossBar();
        }
        return true;
    }

    static save(): void {
        fs.writeFile(__dirname + '/config.json', JSON.stringify(config), () => {});
        fs.writeFile(__dirname + '/player_data.json', JSON.stringify(db), () => {});
        console.log(`[Simple-Bossbar] Save.`);
    }

    static saveSync(): void {
        fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config), () => {});
        fs.writeFileSync(__dirname + '/player_data.json', JSON.stringify(db), () => {});
        console.log(`[Simple-Bossbar] SaveSync.`);
    }
}


export class SimpleBossBarAdmin {
    static addTitle(title: string): void {
        const data = config.title;
        data.push(title);
    }
    static removeTitle(index: number): boolean {
        if (config.title.length < index) {
            return false;
        }

        config.title = config.title.filter((value, index_) => {
            return index_ !== index;
        });
        return true;
    }
    static editTitle(title: string, index: number): boolean {
        if (config.title.length < index) return false;
        if (config.title[index] === title) return false;

        config.title[index]=title;
        return true;
    }
    static getTitle(index: number): string {
        return config.title[index];
    }
    static getAllTitle(): string[] {
        return config.title;
    }
    static setTitleSpeed(speed: number): boolean {
        if (speed < 0) return false;
        if (speed > 60) return false;
        if (config.title_speed === speed) return false;

        config.title_speed=speed*1000;
        return true;
    }
    static getTitleSpeed(): number {
        return config.title_speed;
    }
}


export function BossbarColorIndex(color: BossEventPacket.Colors): number {
    return color;
}

events.playerJoin.on(ev => {
    SimpleBossBar.addPlayer(ev.player);
});

events.serverStop.on(() => {
    SimpleBossBar.save();
});