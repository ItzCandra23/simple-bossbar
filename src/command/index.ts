import { command } from "bdsx/command";
import { events } from "bdsx/event";
import { SimpleBossbarUI, SimpleBossbarUIAdmin } from "../ui";

events.serverOpen.on(() => {
command.register('bossbar', 'Show settings ui bossbar.')
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleBossbarUI(pl);
}, {});

command.register('bossbaradm', 'Edit SimpleBossbar config.')
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleBossbarUIAdmin.menu(pl);
}, {});
});