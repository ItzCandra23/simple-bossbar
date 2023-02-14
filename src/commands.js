"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const form_1 = require("./form");
const message_1 = require("./utils/message");
command_2.command.register('bossbar', 'Open ui for your bossbar setting.')
    .overload((p, o) => {
    const entity = o.getEntity();
    if (!entity) {
        message_1.send.error(`This command not for console.`);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    (0, form_1.SimpleBossbarForm)(pl);
}, {});
command_2.command.register('bossbaradm', 'Bossbar command for admin.', command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (!entity) {
        message_1.send.error(`This command not for console.`);
        return;
    }
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    form_1.BossbarAdminForm.menu(pl);
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tYW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUEwRDtBQUMxRCwwQ0FBdUM7QUFDdkMsaUNBQTZEO0FBQzdELDZDQUF1QztBQUV2QyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsbUNBQW1DLENBQUM7S0FDL0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxjQUFJLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDNUMsT0FBTztLQUNWO0lBQ0QsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEQsSUFBSSxFQUFFLEtBQUssSUFBSTtRQUFFLE9BQU87SUFFeEIsSUFBQSx3QkFBaUIsRUFBQyxFQUFFLENBQUMsQ0FBQztBQUMxQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFUCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO0tBQzVGLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNmLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsY0FBSSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzVDLE9BQU87S0FDVjtJQUNELE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BELElBQUksRUFBRSxLQUFLLElBQUk7UUFBRSxPQUFPO0lBRXhCLHVCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM5QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMifQ==