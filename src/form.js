"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossbarAdminForm = exports.SimpleBossbarForm = void 0;
const form_1 = require("bdsx/bds/form");
const _1 = require(".");
const __1 = require("..");
function SimpleBossbarForm(player) {
    let color = __1.SimpleBossBar.getColor(player);
    let isHidden = __1.SimpleBossBar.isHidden(player);
    const form = new form_1.CustomForm('§2Simple§dBossbar§6Settings');
    form.addComponent(new form_1.FormStepSlider('Bossbar Color', [
        "§1Blue",
        "§cRed",
        "§aGreen",
        "§eYellow",
        "§dPurple",
        "§fWhite"
    ], color - 1));
    form.addComponent(new form_1.FormToggle('Hidden Mode', isHidden));
    form.sendTo(player.getNetworkIdentifier(), (f) => {
        const r = f.response;
        if (r === null)
            return;
        __1.SimpleBossBar.setColor(player, 1 + r[0], true);
        __1.SimpleBossBar.setHiddenMode(player, Boolean(r[1]), true);
    });
}
exports.SimpleBossbarForm = SimpleBossbarForm;
var BossbarAdminForm;
(function (BossbarAdminForm) {
    function menu(player) {
        const form = new form_1.SimpleForm("§2Simple§dBossbar§bAdmin");
        form.addButton(new form_1.FormButton('§2EditTitle', 'path', 'textures/ui/pencil_edit_icon'));
        form.addButton(new form_1.FormButton('§eAddTitle', 'path', 'textures/ui/color_plus'));
        form.addButton(new form_1.FormButton('§cRemoveTitle', 'path', 'textures/ui/icon_none'));
        form.addButton(new form_1.FormButton('§dEditTitleSpeed', 'path', 'textures/ui/icon_setting'));
        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            if (r === 0)
                editTitle(player);
            if (r === 1)
                addTitle(player);
            if (r === 2)
                removeTitle(player);
            if (r === 3)
                setSpeed(player);
        });
    }
    BossbarAdminForm.menu = menu;
    function editTitle(player) {
        const data = _1.BossbarConfig.getTitles();
        let b = [];
        data.forEach(v => {
            b.push(new form_1.FormButton(`${v}\n§r§7[Click to Edit]`));
        });
        const form = new form_1.SimpleForm('§2Simple§dBossbar§bEdit', '', b);
        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            editTitleMode(player, +r);
        });
    }
    BossbarAdminForm.editTitle = editTitle;
    function editTitleMode(player, index) {
        const title = _1.BossbarConfig.getTitles()[index];
        const form = new form_1.CustomForm(`§7Edit: §r${title}`);
        form.addComponent(new form_1.FormInput(`Title`, title));
        form.addComponent(new form_1.FormLabel('Are you sure to edit this title?'));
        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            if (r[0])
                _1.BossbarConfig.setTitle(index, r[0], true, player);
        });
    }
    BossbarAdminForm.editTitleMode = editTitleMode;
    function addTitle(player) {
        const form = new form_1.CustomForm('§2Simple§dBossbar§bAdd');
        form.addComponent(new form_1.FormInput('Title', 'Welcome'));
        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            if (r[0])
                _1.BossbarConfig.addTitle(r[0], true, player);
        });
    }
    BossbarAdminForm.addTitle = addTitle;
    function removeTitle(player) {
        const titles = _1.BossbarConfig.getTitles();
        let b = [];
        titles.forEach(v => {
            b.push(new form_1.FormButton(`${v}\n§r§7[Click to Remove]`));
        });
        const form = new form_1.SimpleForm('§2Simple§dBossbar§bRemove', '', b);
        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            const confirm = new form_1.ModalForm(`§4Remove: §r${titles[+r]}`, `Are you sure §4remove §r${titles[+r]}§r from bossbar titles?`);
            confirm.setButtonConfirm("l§4Remove");
            confirm.setButtonCancel("§l§cCancel");
            confirm.sendTo(player.getNetworkIdentifier(), (ff) => {
                const rr = ff.response;
                if (rr === null)
                    return;
                if (rr === false)
                    player.sendMessage(`§cCanceled for remove title in bossbar`);
                if (rr === true)
                    _1.BossbarConfig.removeTitle(+r, true, player);
            });
        });
    }
    BossbarAdminForm.removeTitle = removeTitle;
    function setSpeed(player) {
        const form = new form_1.CustomForm(`§2Simple§dBossbar§bSpeed`);
        form.addComponent(new form_1.FormSlider('Speed (seconds)', 1, 60));
        form.addComponent(new form_1.FormLabel(`Restar your server to reload`));
        form.sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            if (_1.BossbarConfig.getTitleSpeed() === r[0])
                return;
            player.sendMessage(`§aSuccessfully change speed to §e${r[0]}`);
            _1.BossbarConfig.setTitleSpeed(+r[0], true, player);
        });
    }
    BossbarAdminForm.setSpeed = setSpeed;
})(BossbarAdminForm = exports.BossbarAdminForm || (exports.BossbarAdminForm = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQTRJO0FBRTVJLHdCQUFrQztBQUNsQywwQkFBbUM7QUFFbkMsU0FBZ0IsaUJBQWlCLENBQUMsTUFBb0I7SUFDbEQsSUFBSSxLQUFLLEdBQUcsaUJBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsSUFBSSxRQUFRLEdBQUcsaUJBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxpQkFBVSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFFM0QsSUFBSSxDQUFDLFlBQVksQ0FDYixJQUFJLHFCQUFjLENBQUMsZUFBZSxFQUFFO1FBQ2hDLFFBQVE7UUFDUixPQUFPO1FBQ1AsU0FBUztRQUNULFVBQVU7UUFDVixVQUFVO1FBQ1YsU0FBUztLQUNaLEVBQUUsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUNkLENBQUM7SUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksaUJBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUUzRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxJQUFJO1lBQUUsT0FBTztRQUN2QixpQkFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxpQkFBYSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxD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