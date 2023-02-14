"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossbarConfig = void 0;
const packets_1 = require("bdsx/bds/packets");
const message_1 = require("./utils/message");
const path = require("path");
const fs = require("fs");
let config = {
    titles: [
        "Welcome you",
        "Simple-Bossbar",
        "github.com/itzcandra23/simple-bossbar"
    ],
    default_color: packets_1.BossEventPacket.Colors.Green,
    change_title_speed: 2000,
};
const configPath = path.join(__dirname, "..", "config.json");
try {
    config = require(configPath);
}
catch (e) { }
var BossbarConfig;
(function (BossbarConfig) {
    function BossbarTitle() {
        const random = Math.floor(Math.random() * config.titles.length);
        return config.titles[random];
    }
    BossbarConfig.BossbarTitle = BossbarTitle;
    function getTitles() {
        return config.titles;
    }
    BossbarConfig.getTitles = getTitles;
    function getTitleSpeed() {
        return config.change_title_speed;
    }
    BossbarConfig.getTitleSpeed = getTitleSpeed;
    function getBossbarColor() {
        return config.default_color;
    }
    BossbarConfig.getBossbarColor = getBossbarColor;
    function setTitleSpeed(seconds, message = false, actor) {
        const send = new message_1.sendMessage(actor, message);
        if (seconds < 0 || seconds === 0) {
            send.error(`Invalid time`);
            return false;
        }
        send.success(`Set &f${seconds}s&r for bossbar titles speed`);
        config.change_title_speed = (seconds * 1000);
        return true;
    }
    BossbarConfig.setTitleSpeed = setTitleSpeed;
    function setTitle(index, title, message = false, actor) {
        const send = new message_1.sendMessage(actor, message);
        if (index > (config.titles.length - 1) || index < 0) {
            send.error(`Invalid index`);
            return false;
        }
        if (title === "") {
            send.error(`Invalid title`);
            return false;
        }
        send.success(`Success to change title to &f${title}`);
        config.titles[index] = title;
        return true;
    }
    BossbarConfig.setTitle = setTitle;
    function addTitle(title, message = false, actor) {
        const send = new message_1.sendMessage(actor, message);
        if (title === "") {
            send.error(`Invalid title`);
            return false;
        }
        send.success(`Success to add &f${title}&r in bossbar titles`);
        config.titles.push(title);
        return true;
    }
    BossbarConfig.addTitle = addTitle;
    function removeTitle(index, message = false, actor) {
        const send = new message_1.sendMessage(actor, message);
        if (index > (config.titles.length - 1) || index < 0) {
            send.error(`Invalid index`);
            return false;
        }
        const title = config.titles[index];
        send.success(`Success to remove &f${title}&r in bossbar titles`);
        config.titles = config.titles.filter((v) => title !== v);
        return true;
    }
    BossbarConfig.removeTitle = removeTitle;
    function save(message = false) {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`config.json ${err}`);
                    throw err;
                }
                else
                    message_1.send.success(`config.json Saved!`);
            }
        });
    }
    BossbarConfig.save = save;
})(BossbarConfig = exports.BossbarConfig || (exports.BossbarConfig = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw4Q0FBbUQ7QUFFbkQsNkNBQW9EO0FBRXBELDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFFekIsSUFBSSxNQUFNLEdBSU47SUFDQSxNQUFNLEVBQUU7UUFDSixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLHVDQUF1QztLQUMxQztJQUNELGFBQWEsRUFBRSx5QkFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLO0lBQzNDLGtCQUFrQixFQUFFLElBQUk7Q0FDM0IsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztBQUU3RCxJQUFJO0lBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtDQUFFO0FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtBQUVqRCxJQUFpQixhQUFhLENBbUY3QjtBQW5GRCxXQUFpQixhQUFhO0lBRTFCLFNBQWdCLFlBQVk7UUFDeEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUhlLDBCQUFZLGVBRzNCLENBQUE7SUFFRCxTQUFnQixTQUFTO1FBQ3JCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRmUsdUJBQVMsWUFFeEIsQ0FBQTtJQUVELFNBQWdCLGFBQWE7UUFDekIsT0FBTyxNQUFNLENBQUMsa0JBQWtCLENBQUM7SUFDckMsQ0FBQztJQUZlLDJCQUFhLGdCQUU1QixDQUFBO0lBRUQsU0FBZ0IsZUFBZTtRQUMzQixPQUFPLE1BQU0sQ0FBQyxhQUFhLENB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