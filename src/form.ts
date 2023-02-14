import { CustomForm, FormButton, FormInput, FormLabel, FormSlider, FormStepSlider, FormToggle, ModalForm, SimpleForm } from "bdsx/bds/form";
import { ServerPlayer } from "bdsx/bds/player";
import { BossbarConfig } from ".";
import { SimpleBossBar } from "..";

export function SimpleBossbarForm(player: ServerPlayer): void {
    let color = SimpleBossBar.getColor(player);
    let isHidden = SimpleBossBar.isHidden(player);
    const form = new CustomForm('§2Simple§dBossbar§6Settings');

    form.addComponent(
        new FormStepSlider('Bossbar Color', [
            "§1Blue",
            "§cRed",
            "§aGreen",
            "§eYellow",
            "§dPurple",
            "§fWhite"
        ], color-1),
    );
    form.addComponent(new FormToggle('Hidden Mode', isHidden));

    form.sendTo(player.getNetworkIdentifier(), (f) => {
        const r = f.response;
        if (r === null) return;
        SimpleBossBar.setColor(player, 1+r[0], true);
        SimpleBossBar.setHiddenMode(player, Boolean(r[1]), true);
    });
}

export namespace BossbarAdminForm {

    export function menu(player: ServerPlayer): void {
        const form = new SimpleForm("§2Simple§dBossbar§bAdmin");

        form.addButton(new FormButton('§2EditTitle', 'path', 'textures/ui/pencil_edit_icon'));
        form.addButton(new FormButton('§eAddTitle', 'path', 'textures/ui/color_plus'));
        form.addButton(new FormButton('§cRemoveTitle', 'path', 'textures/ui/icon_none'));
        form.addButton(new FormButton('§dEditTitleSpeed', 'path', 'textures/ui/icon_setting'));

        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null) return;
            if (r === 0) editTitle(player);
            if (r === 1) addTitle(player);
            if (r === 2) removeTitle(player);
            if (r === 3) setSpeed(player);
        });
    }

    export function editTitle(player: ServerPlayer): void {
        const data = BossbarConfig.getTitles();
        let b: FormButton[] = [];

        data.forEach(v => {
            b.push(new FormButton(`${v}\n§r§7[Click to Edit]`));
        });

        const form = new SimpleForm('§2Simple§dBossbar§bEdit', '', b);
        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null) return;
            editTitleMode(player, +r);
        });
    }

    export function editTitleMode(player: ServerPlayer, index: number): void {
        const title = BossbarConfig.getTitles()[index];
        const form = new CustomForm(`§7Edit: §r${title}`);

        form.addComponent(new FormInput(`Title`, title));
        form.addComponent(new FormLabel('Are you sure to edit this title?'));

        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null) return;
            if (r[0]) BossbarConfig.setTitle(index, r[0], true, player);
        });
    }

    export function addTitle(player: ServerPlayer): void {
        const form = new CustomForm('§2Simple§dBossbar§bAdd');
        form.addComponent(new FormInput('Title', 'Welcome'));
        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null) return;
            if (r[0]) BossbarConfig.addTitle(r[0], true, player);
        });
    }

    export function removeTitle(player: ServerPlayer): void {
        const titles = BossbarConfig.getTitles();
        let b: FormButton[] = [];

        titles.forEach(v => {
            b.push(new FormButton(`${v}\n§r§7[Click to Remove]`));
        });

        const form = new SimpleForm('§2Simple§dBossbar§bRemove', '', b);
        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null) return;
            const confirm = new ModalForm(`§4Remove: §r${titles[+r]}`, `Are you sure §4remove §r${titles[+r]}§r from bossbar titles?`);

            confirm.setButtonConfirm("l§4Remove");
            confirm.setButtonCancel("§l§cCancel");

            confirm.sendTo(player.getNetworkIdentifier(), (ff) => {
                const rr = ff.response;
                if (rr === null) return;
                if (rr === false) player.sendMessage(`§cCanceled for remove title in bossbar`);
                if (rr === true) BossbarConfig.removeTitle(+r, true, player);
            });
        });
    }

    export function setSpeed(player: ServerPlayer): void {
        const form = new CustomForm(`§2Simple§dBossbar§bSpeed`);

        form.addComponent(new FormSlider('Speed (seconds)', 1, 60));
        form.addComponent(new FormLabel(`Restar your server to reload`));

        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null) return;

            if (BossbarConfig.getTitleSpeed() === r[0]) return;

            player.sendMessage(`§aSuccessfully change speed to §e${r[0]}`);
            BossbarConfig.setTitleSpeed(+r[0], true, player);
        });
    }
}