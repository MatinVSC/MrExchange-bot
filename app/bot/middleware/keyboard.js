import Buttons from "../buttons/index.js";
import Account from "../keyboard/account.js";
import Back from "../keyboard/back.js";

// event listner
const event_listner = {
    // keyboard account
    ...Account,
    // keyboard back
    ...Back,
};

// keyboard list
const LIST_KEYBOARD = {
    ACCOUNT: "MENU.ACCOUNT",
    CRYPTO: "MENU.CRYPTO",
    ORDER: "MENU.ORDER",
    SUPPORT: "MENU.SUPPORT",
    BACK: "MENU.BACK",
};


export default async (ctx) => {
    const text = ctx.message.text;
    const menu = new Buttons(ctx);

    for (const [key, path] of Object.entries(LIST_KEYBOARD)) {
        const tra = ctx.i18n.t(path);
        if (tra == text) return event_listner[key]({ ctx, i18n: ctx.i18n, menu });
    };
};