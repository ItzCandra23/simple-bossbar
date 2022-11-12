import { events } from "bdsx/event";

events.serverOpen.on(() => {
    console.log("[SSimpleBossbar] Started!");
    require("./src");
});