"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleBossbarUIAdmin = exports.SimpleBossbarUI = void 0;
const form_1 = require("bdsx/bds/form");
const packets_1 = require("bdsx/bds/packets");
const bossbar_1 = require("../bossbar");
function SimpleBossbarUI(player) {
    const data = bossbar_1.SimpleBossBar.getPlayer(player);
    new form_1.CustomForm('§2Simple§dBossbar§6Settings', [
        new form_1.FormStepSlider('Bossbar Color', [
            "§1Blue",
            "§cRed",
            "§aGreen",
            "§eYellow",
            "§dPurple",
            "§fWhite"
        ], (0, bossbar_1.BossbarColorIndex)(data.color) - 1),
        new form_1.FormToggle('Hidden Mode', data.hidden)
    ]).sendTo(player.getNetworkIdentifier(), (f, t) => {
        const pl = t.getActor();
        if (pl === null)
            return;
        const r = f.response;
        if (r === null)
            return;
        if (r[0] === 0) {
            if (bossbar_1.SimpleBossBar.setColor(pl, 1) === false) { }
            else {
                pl.sendMessage(`§aColor: §1Blue`);
                bossbar_1.SimpleBossBar.setColor(pl, packets_1.BossEventPacket.Colors.Blue);
            }
        }
        if (r[0] === 1) {
            if (bossbar_1.SimpleBossBar.setColor(pl, 2) === false) { }
            else {
                pl.sendMessage(`§2Color: §cRed`);
                bossbar_1.SimpleBossBar.setColor(pl, packets_1.BossEventPacket.Colors.Red);
            }
        }
        if (r[0] === 2) {
            if (bossbar_1.SimpleBossBar.setColor(pl, 3) === false) { }
            else {
                pl.sendMessage(`§2Color: §aGreen`);
                bossbar_1.SimpleBossBar.setColor(pl, packets_1.BossEventPacket.Colors.Green);
            }
        }
        if (r[0] === 3) {
            if (bossbar_1.SimpleBossBar.setColor(pl, 4) === false) { }
            else {
                pl.sendMessage(`§2Color: §eYellow`);
                bossbar_1.SimpleBossBar.setColor(pl, packets_1.BossEventPacket.Colors.Yellow);
            }
        }
        if (r[0] === 4) {
            if (bossbar_1.SimpleBossBar.setColor(pl, 5) === false) { }
            else {
                pl.sendMessage(`§2Color: §dPurple`);
                bossbar_1.SimpleBossBar.setColor(pl, packets_1.BossEventPacket.Colors.Purple);
            }
        }
        if (r[0] === 5) {
            if (bossbar_1.SimpleBossBar.setColor(pl, 6) === false) { }
            else {
                pl.sendMessage(`§2Color: §fWhite`);
                bossbar_1.SimpleBossBar.setColor(pl, packets_1.BossEventPacket.Colors.White);
            }
        }
        if (r[1] === true) {
            if (data.hidden === true) { }
            else {
                pl.sendMessage(`§2Hidden Mode: §btrue`);
                bossbar_1.SimpleBossBar.setHiddenMode(pl, true);
                pl.removeBossBar();
            }
        }
        if (r[1] === false) {
            if (data.hidden === false) { }
            else {
                pl.sendMessage(`§2Hidden Mode: §bfalse`);
                bossbar_1.SimpleBossBar.setHiddenMode(pl, false);
            }
        }
    });
}
exports.SimpleBossbarUI = SimpleBossbarUI;
class SimpleBossbarUIAdmin {
    static menu(player) {
        let b = [];
        b.push(new form_1.FormButton('§2EditTitle', 'path', 'textures/ui/pencil_edit_icon'));
        b.push(new form_1.FormButton('§eAddTitle', 'path', 'textures/ui/color_plus'));
        b.push(new form_1.FormButton('§cRemoveTitle', 'path', 'textures/ui/icon_none'));
        b.push(new form_1.FormButton('§dEditTitleSpeed', 'path', 'textures/ui/icon_setting'));
        new form_1.SimpleForm("§2Simple§dBossbar§bAdmin", '', b).sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            if (r === 0)
                this.editTitle(player);
            if (r === 1)
                this.addTitle(player);
            if (r === 2)
                this.removeTitle(player);
            if (r === 3)
                this.editSpeed(player);
        });
    }
    static editTitle(player) {
        const data = bossbar_1.SimpleBossBarAdmin.getAllTitle();
        let b = [];
        data.forEach(v => {
            b.push(new form_1.FormButton(`${v}\n§r§7[Click to Edit]`));
        });
        new form_1.SimpleForm('§2Simple§dBossbar§bEdit', '', b).sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            this.editTitleMode(player, r);
        });
    }
    static editTitleMode(player, index) {
        new form_1.CustomForm(`§7Edit: §r${bossbar_1.SimpleBossBarAdmin.getTitle(index)}`, [new form_1.FormInput(`Title`, bossbar_1.SimpleBossBarAdmin.getTitle(index)), new form_1.FormLabel('Are you sure to edit this title?'), new form_1.FormToggle('No/Yes', false)])
            .sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            if (r[1] === false || r[0] === '') {
                player.sendMessage(`§cEdit canceled.`);
                return;
            }
            if (r[0]) {
                player.sendMessage(`§aSuccessfully edited title §5[§r${bossbar_1.SimpleBossBarAdmin.getTitle(index)}§r§5]§a to §5[§r${r[0]}§r§5]`);
                bossbar_1.SimpleBossBarAdmin.editTitle(r[0], index);
            }
        });
    }
    static addTitle(player) {
        new form_1.CustomForm('§2Simple§dBossbar§bAdd', [new form_1.FormInput('Title', 'Welcome')]).sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            if (r[0] === '') {
                player.sendMessage(`§cError!`);
                return;
            }
            player.sendMessage(`§aSuccessfully added §d[§r${r[0]}§r§d]§a as title.`);
            bossbar_1.SimpleBossBarAdmin.addTitle(r[0]);
        });
    }
    static removeTitle(player) {
        const data = bossbar_1.SimpleBossBarAdmin.getAllTitle();
        let b = [];
        data.forEach(v => {
            b.push(new form_1.FormButton(`${v}\n§r§7[Click to Remove]`));
        });
        new form_1.SimpleForm('§2Simple§dBossbar§bRemove', '', b).sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            new form_1.SimpleForm(`§4Remove: §r${data[r]}`, 'Are you sure remove this title?', [new form_1.FormButton('§4Remove'), new form_1.FormButton('§aCancel')])
                .sendTo(player.getNetworkIdentifier(), (ff) => {
                const rr = ff.response;
                if (rr === null)
                    return;
                if (rr === 1)
                    this.removeTitle(player);
                if (rr === 0) {
                    player.sendMessage(`§aManaged to remove the title §d[§r${data[r]}§r§d]§a.`);
                    bossbar_1.SimpleBossBarAdmin.removeTitle(r);
                }
            });
        });
    }
    static editSpeed(player) {
        new form_1.CustomForm(`§2Simple§dBossbar§bSpeed`, [new form_1.FormSlider('Speed (seconds)', 1, 60)]).sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            if (bossbar_1.SimpleBossBarAdmin.getTitleSpeed() === r[0])
                return;
            player.sendMessage(`§aSuccessfully change speed to §e${r[0]}`);
            bossbar_1.SimpleBossBarAdmin.setTitleSpeed(r[0]);
        });
    }
}
exports.SimpleBossbarUIAdmin = SimpleBossbarUIAdmin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBaUo7QUFDakosOENBQW1EO0FBRW5ELHdDQUFrRjtBQUVsRixTQUFnQixlQUFlLENBQUMsTUFBb0I7SUFDaEQsTUFBTSxJQUFJLEdBQUcsdUJBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsSUFBSSxpQkFBVSxDQUFDLDZCQUE2QixFQUFFO1FBQzFDLElBQUkscUJBQWMsQ0FBQyxlQUFlLEVBQUU7WUFDaEMsUUFBUTtZQUNSLE9BQU87WUFDUCxTQUFTO1lBQ1QsVUFBVTtZQUNWLFVBQVU7WUFDVixTQUFTO1NBQ1osRUFBRSxJQUFBLDJCQUFpQixFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxpQkFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQzdDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFpQixFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzlELE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixJQUFJLEVBQUUsS0FBSyxJQUFJO1lBQUUsT0FBTztRQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNaLElBQUksdUJBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxHQUFFO2lCQUFNO2dCQUNyRCxFQUFFLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2xDLHVCQUFhLENBQUMsUUFBUSxDQUFDLEVB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