import Buttons from "../buttons/index.js";
import Help from "../command/help.js";
import Locales from "../command/locales.js";
import Start from "../command/start.js";

// event listner
const event_listner = {
    // command start
    ...Start,
    //command Help
    ...Help,
    // command Locales
    ...Locales
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
};


export default async (ctx) => {
    const text = ctx.message.text;
    const menu = new Buttons(ctx);

    for (const [key, { pattern, handler }] of Object.entries(LIST_COMMAND)) {
        if (pattern == text) return handler({ ctx, i18n: ctx.i18n, menu });
    };

};