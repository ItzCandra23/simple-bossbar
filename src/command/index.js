"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const event_1 = require("bdsx/event");
const ui_1 = require("../ui");
event_1.events.serverOpen.on(() => {
    command_1.command.register('bossbar', 'Show settings ui bossbar.')
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        (0, ui_1.SimpleBossbarUI)(pl);
    }, {});
    command_1.command.register('bossbaradm', 'Edit SimpleBossbar config.')
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        ui_1.SimpleBossbarUIAdmin.menu(pl);
    }, {});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QyxzQ0FBb0M7QUFDcEMsOEJBQThEO0FBRTlELGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUMxQixpQkFBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsMkJBQTJCLENBQUM7U0FDdkQsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksTUFBTSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQzVCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BELElBQUksRUFBRSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBRXhCLElBQUEsb0JBQWUsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsNEJBQTRCLENBQUM7U0FDM0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksTUFBTSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQzVCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BELElBQUksRUFBRSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBRXhCLHlCQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9