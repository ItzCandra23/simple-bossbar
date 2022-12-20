"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const ui_1 = require("../ui");
command_2.command.register('bossbar', 'Show settings ui bossbar.')
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    (0, ui_1.SimpleBossbarUI)(pl);
}, {});
command_2.command.register('bossbaradm', 'Edit SimpleBossbar config.', command_1.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null)
        return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null)
        return;
    ui_1.SimpleBossbarUIAdmin.menu(pl);
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUEwRDtBQUMxRCwwQ0FBdUM7QUFDdkMsOEJBQThEO0FBRTlELGlCQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQztLQUN2RCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDZixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDNUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEQsSUFBSSxFQUFFLEtBQUssSUFBSTtRQUFFLE9BQU87SUFFeEIsSUFBQSxvQkFBZSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVQLGlCQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSw0QkFBNEIsRUFBRSxnQ0FBc0IsQ0FBQyxRQUFRLENBQUM7S0FDNUYsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLElBQUksTUFBTSxLQUFLLElBQUk7UUFBRSxPQUFPO0lBQzVCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BELElBQUksRUFBRSxLQUFLLElBQUk7UUFBRSxPQUFPO0lBRXhCLHlCQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMifQ==