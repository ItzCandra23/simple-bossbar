import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { BossEventPacket } from "bdsx/bds/packets";
import { ServerPlayer } from "bdsx/bds/player";
import { send, sendMessage } from "./utils/message";
import { SimpleBossBar } from "..";
import * as path from "path";
import * as fs from "fs";

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

try { config = require(configPath) } catch (e) {}

export namespace BossbarConfig {

    export function BossbarTitle(): string {
        const random = Math.floor(Math.random() * config.titles.length);
        return config.titles[random];
    }

    export function getTitles(): string[] {
        return config.titles;
    }

    export function getTitleSpeed(): number {
        return config.change_title_speed;
    }

    export function getBossbarColor(): BossEventPacket.Colors {
        return config.default_color;
    }

    export function setTitleSpeed(seconds: number, message: boolean = false, actor?: ServerPlayer): boolean {
        const send = new sendMessage(actor, message);
        if (seconds < 0||seconds === 0) {
            send.error(`Invalid time`);
            return false;
        }

        send.success(`Set &f${seconds}s&r for bossbar titles speed`);
        config.change_title_speed=(seconds*1000);
        return true;
    }

    export function setTitle(index: number, title: string, message: boolean = false, actor?: ServerPlayer): boolean {
        const send = new sendMessage(actor, message);
        if (index > (config.titles.length-1)||index < 0) {
            send.error(`Invalid index`);
            return false;
        }
        if (title === "") {
            send.error(`Invalid title`);
            return false;
        }

        send.success(`Success to change title to &f${title}`);
        config.titles[index]=title;
        return true;
    }

    export function addTitle(title: string, message: boolean = false, actor?: ServerPlayer): boolean {
        const send = new sendMessage(actor, message);
        if (title === "") {
            send.error(`Invalid title`);
            return false;
        }

        send.success(`Success to add &f${title}&r in bossbar titles`);
        config.titles.push(title);
        return true;
    }

    export function removeTitle(index: number, message: boolean = false, actor?: ServerPlayer): boolean {
        const send = new sendMessage(actor, message);
        if (index > (config.titles.length-1)||index < 0) {
            send.error(`Invalid index`);
            return false;
        }

        const title = config.titles[index];
        send.success(`Success to remove &f${title}&r in bossbar titles`);
        config.titles=config.titles.filter((v) => title !== v);
        return true;
    }

    export function save(message: boolean = false): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    send.error(`config.json ${err}`);
                    throw err;
                }
                else send.success(`config.json Saved!`);
            }
        });
    }
}
