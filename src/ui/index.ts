import { CustomForm, Form, FormButton, FormData, FormInput, FormLabel, FormSlider, FormStepSlider, FormToggle, SimpleForm } from "bdsx/bds/form";
import { BossEventPacket } from "bdsx/bds/packets";
import { ServerPlayer } from "bdsx/bds/player";
import { BossbarColorIndex, SimpleBossBar, SimpleBossBarAdmin } from "../bossbar";

export function SimpleBossbarUI(player: ServerPlayer): void {
    const data = SimpleBossBar.getPlayer(player);
    new CustomForm('§2Simple§dBossbar§6Settings', [
        new FormStepSlider('Bossbar Color', [
            "§1Blue",
            "§cRed",
            "§aGreen",
            "§eYellow",
            "§dPurple",
            "§fWhite"
        ], BossbarColorIndex(data.color)-1),
        new FormToggle('Hidden Mode', data.hidden)
    ]).sendTo(player.getNetworkIdentifier(), (f: Form<FormData>, t) => {
        const pl = t.getActor();
        if (pl === null) return;
        const r = f.response;
        if (r === null) return;
        if (r[0] === 0) {
            if (SimpleBossBar.setColor(pl, 1) === false) {} else {
            pl.sendMessage(`§aColor: §1Blue`);
            SimpleBossBar.setColor(pl, BossEventPacket.Colors.Blue);
            }
        }
        if (r[0] === 1) {
            if (SimpleBossBar.setColor(pl, 2) === false) {} else {
            pl.sendMessage(`§2Color: §cRed`);
            SimpleBossBar.setColor(pl, BossEventPacket.Colors.Red);
        }
        }
        if (r[0] === 2) {
            if (SimpleBossBar.setColor(pl, 3) === false) {} else {
            pl.sendMessage(`§2Color: §aGreen`);
            SimpleBossBar.setColor(pl, BossEventPacket.Colors.Green);
        }
        }
        if (r[0] === 3) {
            if (SimpleBossBar.setColor(pl, 4) === false) {} else {
            pl.sendMessage(`§2Color: §eYellow`);
            SimpleBossBar.setColor(pl, BossEventPacket.Colors.Yellow);
        }
        }
        if (r[0] === 4) {
            if (SimpleBossBar.setColor(pl, 5) === false) {} else {
            pl.sendMessage(`§2Color: §dPurple`);
            SimpleBossBar.setColor(pl, BossEventPacket.Colors.Purple);
        }
        }
        if (r[0] === 5) {
            if (SimpleBossBar.setColor(pl, 6) === false) {} else {
            pl.sendMessage(`§2Color: §fWhite`);
            SimpleBossBar.setColor(pl, BossEventPacket.Colors.White);
        }
        }
        if (r[1] === true) {
            if (data.hidden === true) {} else {
            pl.sendMessage(`§2Hidden Mode: §btrue`);
            SimpleBossBar.setHiddenMode(pl, true);
            pl.removeBossBar()
        }
        }
        if (r[1] === false) {
            if (data.hidden === false) {} else {
            pl.sendMessage(`§2Hidden Mode: §bfalse`);
            SimpleBossBar.setHiddenMode(pl, false);
        }
        }
    });
}

export class SimpleBossbarUIAdmin {
    static menu(player: ServerPlayer): void {
        let b: FormButton[] = [];
        b.push(new FormButton('§2EditTitle', 'path', 'textures/ui/pencil_edit_icon'));
        b.push(new FormButton('§eAddTitle', 'path', 'textures/ui/color_plus'));
        b.push(new FormButton('§cRemoveTitle', 'path', 'textures/ui/icon_none'));
        b.push(new FormButton('§dEditTitleSpeed', 'path', 'textures/ui/icon_setting'));
        new SimpleForm("§2Simple§dBossbar§bAdmin", '', b).sendTo(player.getNetworkIdentifier(), (f: Form<FormData>) => {
            const r = f.response;
            if (r === null) return;
            if (r === 0) this.editTitle(player);
            if (r === 1) this.addTitle(player);
            if (r === 2) this.removeTitle(player);
            if (r === 3) this.editSpeed(player);
        });
    }
    static editTitle(player: ServerPlayer): void {
        const data = SimpleBossBarAdmin.getAllTitle();
        let b: FormButton[] = [];
        data.forEach(v => {
            b.push(new FormButton(`${v}\n§r§7[Click to Edit]`));
        });
        new SimpleForm('§2Simple§dBossbar§bEdit', '', b).sendTo(player.getNetworkIdentifier(), (f: Form<FormData>) => {
            const r = f.response;
            if (r === null) return;
            this.editTitleMode(player, r);
        });
    }
    static editTitleMode(player: ServerPlayer, index: number): void {
        new CustomForm(`§7Edit: §r${SimpleBossBarAdmin.getTitle(index)}`, [new FormInput(`Title`, SimpleBossBarAdmin.getTitle(index)), new FormLabel('Are you sure to edit this title?')])
        .sendTo(player.getNetworkIdentifier(), (f: Form<FormData>) => {
            const r = f.response;
            if (r === null) return;

            if (r[0] === '') {
                player.sendMessage(`§cEdit canceled.`);
                return;
            }

            if (r[0]) {
                player.sendMessage(`§aSuccessfully edited title §5[§r${SimpleBossBarAdmin.getTitle(index)}§r§5]§a to §5[§r${r[0]}§r§5]`);
                SimpleBossBarAdmin.editTitle(r[0], index);
            }
        });
    }
    static addTitle(player: ServerPlayer): void {
        new CustomForm('§2Simple§dBossbar§bAdd', [new FormInput('Title', 'Welcome')]).sendTo(player.getNetworkIdentifier(), (f: Form<FormData>) => {
            const r = f.response;
            if (r === null) return;

            if (r[0] === '') {
                player.sendMessage(`§cError!`);
                return;
            }

            player.sendMessage(`§aSuccessfully added §d[§r${r[0]}§r§d]§a as title.`);
            SimpleBossBarAdmin.addTitle(r[0]);
        });
    }
    static removeTitle(player: ServerPlayer): void {
        const data = SimpleBossBarAdmin.getAllTitle();
        let b: FormButton[] = [];
        data.forEach(v => {
            b.push(new FormButton(`${v}\n§r§7[Click to Remove]`));
        });
        new SimpleForm('§2Simple§dBossbar§bRemove', '', b).sendTo(player.getNetworkIdentifier(), (f: Form<FormData>) => {
            const r = f.response;
            if (r === null) return;
            new SimpleForm(`§4Remove: §r${data[r]}`, 'Are you sure remove this title?', [new FormButton('§4Remove'), new FormButton('§aCancel')])
            .sendTo(player.getNetworkIdentifier(), (ff: Form<FormData>) => {
                const rr = ff.response;
                if (rr === null) return;

                if (rr === 1) this.removeTitle(player);

                if (rr === 0) {
                    player.sendMessage(`§aManaged to remove the title §d[§r${data[r]}§r§d]§a.`);
                    SimpleBossBarAdmin.removeTitle(r);
                }
            });
        });
    }
    static editSpeed(player: ServerPlayer): void {
        new CustomForm(`§2Simple§dBossbar§bSpeed`, [new FormSlider('Speed (seconds)', 1, 60), new FormLabel(`Restar your server to work`)]).sendTo(player.getNetworkIdentifier(), (f: Form<FormData>) => {
            const r = f.response;
            if (r === null) return;

            if (SimpleBossBarAdmin.getTitleSpeed() === r[0]) return;

            player.sendMessage(`§aSuccessfully change speed to §e${r[0]}`);
            SimpleBossBarAdmin.setTitleSpeed(r[0]);
        });
    }
}