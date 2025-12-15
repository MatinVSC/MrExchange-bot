import Buttons from "../buttons/index.js";
import Help from "../command/help.js";
import Locales from "../command/locales.js";
import Panel from "../panelAdmin/command/panel.js";
import Start from "../command/start.js";

// event listner
const event_listner = {
    // start
    ...Start,
    // Help
    ...Help,
    // Locales
    ...Locales,
    // panel
    ...Panel
};

// command list
const LIST_COMMAND = {
    START: {
        pattern: "/start",
        handler: event_listner.START
    },
    HELP: {
        pattern: "/help",
        handler: event_listner.HELP
    },
    LOCALES: {
        pattern: "/locales",
        handler: event_listner.LOCALES
    },
    PANEL: {
        pattern: "/panel",
        handler: event_listner.PANEL,
        isAdmin: true
    },
};


export default async (ctx) => {
    const text = ctx.message.text;
    const menu = new Buttons(ctx);

    for (const [key, { pattern, handler, isAdmin }] of Object.entries(LIST_COMMAND)) {
        if (pattern == text) {
            if (isAdmin) {
                const admin = JSON.parse(process.env.ADMIN);
                if (admin.includes(ctx.from.id)) return false
            };
            return handler({ ctx, i18n: ctx.i18n, menu });
        };
    };
};