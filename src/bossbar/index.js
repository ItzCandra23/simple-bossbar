"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossbarColorIndex = exports.SimpleBossBarAdmin = exports.SimpleBossBar = exports.BossbarTitle = void 0;
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
const fs = require("fs");
let db = {};
let config = {
    "title": [
        "Welcome you",
        "Simple-Bossbar",
        "github.com/itzcandra23/simple-bossbar"
    ],
    "default_color": packets_1.BossEventPacket.Colors.Green,
    "title_speed": 2000
};
try {
    config = require(__dirname + '/config.json');
}
catch (e) { }
try {
    db = require(__dirname + '/player_data.json');
}
catch (e) { }
function BossbarTitle() {
    const random = Math.floor(Math.random() * config.title.length);
    return config.title[random];
}
exports.BossbarTitle = BossbarTitle;
class SimpleBossBar {
    static getTitleSpeed() {
        return config.title_speed;
    }
    static addPlayer(player) {
        if (db.hasOwnProperty(player.getName()))
            return false;
        db[player.getName()] = {
            "color": config.default_color,
            "hidden": false
        };
        return true;
    }
    static getPlayer(player) {
        this.addPlayer(player);
        return db[player.getName()];
    }
    static setColor(player, color) {
        this.addPlayer(player);
        const data = db[player.getName()];
        if (data.color === color)
            return false;
        data.color = color;
        return true;
    }
    static setHiddenMode(player, hidden) {
        this.addPlayer(player);
        const data = db[player.getName()];
        if (data.hidden === hidden)
            return false;
        data.hidden = hidden;
        if (data.hidden === true) {
            player.removeBossBar();
        }
        return true;
    }
    static save() {
        fs.writeFile(__dirname + '/config.json', JSON.stringify(config), () => { });
        fs.writeFile(__dirname + '/player_data.json', JSON.stringify(db), () => { });
        console.log(`[Simple-Bossbar] Save.`);
    }
    static saveSync() {
        fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config), () => { });
        fs.writeFileSync(__dirname + '/player_data.json', JSON.stringify(db), () => { });
        console.log(`[Simple-Bossbar] SaveSync.`);
    }
}
exports.SimpleBossBar = SimpleBossBar;
class SimpleBossBarAdmin {
    static addTitle(title) {
        const data = config.title;
        data.push(title);
    }
    static removeTitle(index) {
        if (config.title.length < index) {
            return false;
        }
        config.title = config.title.filter((value, index_) => {
            return index_ !== index;
        });
        return true;
    }
    static editTitle(title, index) {
        if (config.title.length < index)
            return false;
        if (config.title[index] === title)
            return false;
        config.title[index] = title;
        return true;
    }
    static getTitle(index) {
        return config.title[index];
    }
    static getAllTitle() {
        return config.title;
    }
    static setTitleSpeed(speed) {
        if (speed < 0)
            return false;
        if (speed > 60)
            return false;
        if (config.title_speed === speed)
            return false;
        config.title_speed = speed * 1000;
        return true;
    }
    static getTitleSpeed() {
        return config.title_speed;
    }
}
exports.SimpleBossBarAdmin = SimpleBossBarAdmin;
function BossbarColorIndex(color) {
    return color;
}
exports.BossbarColorIndex = BossbarColorIndex;
event_1.events.playerJoin.on(ev => {
    SimpleBossBar.addPlayer(ev.player);
});
event_1.events.serverStop.on(() => {
    SimpleBossBar.save();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBbUQ7QUFFbkQsc0NBQW9DO0FBRXBDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixJQUFJLEVBQUUsR0FBb0MsRUFBRSxDQUFDO0FBTzdDLElBQUksTUFBTSxHQUFHO0lBQ1QsT0FBTyxFQUFFO1FBQ0wsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQix1Q0FBdUM7S0FDMUM7SUFDRCxlQUFlLEVBQUUseUJBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSztJQUM3QyxhQUFhLEVBQUUsSUFBSTtDQUN0QixDQUFDO0FBR0YsSUFBSTtJQUFFLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxDQUFBO0NBQUU7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0FBQ2pFLElBQUk7SUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFBO0NBQUU7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0FBRWxFLFNBQWdCLFlBQVk7SUFDeEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUhELG9DQUdDO0FBRUQsTUFBYSxhQUFhO0lBQ3RCLE1BQU0sQ0FBQyxhQUFhO1FBQ2hCLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUM5QixDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFvQjtRQUNqQyxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQUUsT0FBTyxLQUFLLENB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