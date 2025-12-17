import Buttons from "../buttons/index.js";
import Account from "../keyboard/account.js";
import Back from "../keyboard/back.js";
import Crypto from "../keyboard/crypto.js";
import Order from "../keyboard/orders.js";
import Support from "../keyboard/support.js";
import Message from "../panelAdmin/keyboard/message.js";
import Total from "../panelAdmin/keyboard/total.js";

// event listner
const event_listner = {
    // account
    ...Account,
    // back
    ...Back,
    // crypto
    ...Crypto,
    // order
    ...Order,
    // support
    ...Support,
    // panel admin
    ...Total,
    // message admin
    ...Message
};

// keyboard list
const LIST_KEYBOARD = {
    BACK: { path: "MENU.BACK" },
    ACCOUNT: { path: "MENU.ACCOUNT" },
    CRYPTO: { path: "MENU.CRYPTO" },
    SUPPORT: { path: "MENU.SUPPORT" },
    ORDER: { path: "MENU.ORDER" },
    TOTAL: { path: "PANEL.MENU_PANEL.TOTAL", isAdmin: true },
    MESSAGE_ALL: { path: "PANEL.MENU_PANEL.MESSAGE_ALL", isAdmin: true },
    FORWARD_ALL: { path: "PANEL.MENU_PANEL.FORWARD_ALL", isAdmin: true },
};


export default async (ctx, next) => {
    const text = ctx.message.text;
    const menu = new Buttons(ctx);

    for (const [key, { path, isAdmin }] of Object.entries(LIST_KEYBOARD)) {
        const tra = ctx.i18n.t(path);
        if (tra == text) {
            if (isAdmin) {
                const admin = JSON.parse(process.env.ADMIN);
                if (!admin.includes(ctx.from.id)) return false;
            };
            return event_listner[key]({ ctx, i18n: ctx.i18n, menu });
        };
    };

    return next();
};