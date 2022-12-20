import { CommandPermissionLevel } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { SimpleBossbarUI, SimpleBossbarUIAdmin } from "../ui";

command.register('bossbar', 'Show settings ui for your bossbar.')
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleBossbarUI(pl);
}, {});

command.register('bossbaradm', 'Edit SimpleBossbar config.', CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleBossbarUIAdmin.menu(pl);
}, {});