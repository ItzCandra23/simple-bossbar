import { CommandPermissionLevel } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { BossbarAdminForm, SimpleBossbarForm } from "./form";
import { send } from "./utils/message";

command.register('bossbar', 'Open ui for your bossbar setting.')
.overload((p, o) => {
    const entity = o.getEntity();
    if (!entity) {
        send.error(`This command not for console.`);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleBossbarForm(pl);
}, {});

command.register('bossbaradm', 'Bossbar command for admin.', CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (!entity) {
        send.error(`This command not for console.`);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    BossbarAdminForm.menu(pl);
}, {});