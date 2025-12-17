import Auth from "../action/auth.js";
import Crypto from "../action/crypto.js";
import Locales from "../action/locales.js";
import Buttons from "../buttons/index.js";
import Support from "../panelAdmin/action/support.js";

// event listner
const event_listner = {
    // action Locales
    ...Locales,
    // action Verify
    ...Auth,
    // action crypto
    ...Crypto,
    // action admin support
    ...Support
};

// action list
const LIST_ACTION = [
    {
        key: "CHANGELOCALES",
        pattern: /^CHANGELOCALES_\w+/
    },
    {
        key: "AUTH",
        pattern: /^AUTH$/
    },
    {
        key: "CRYPTO",
        pattern: /^BUYCRYPTO_\w+/
    },
    {
        key: "NETWORKCRYPTO",
        pattern: /^NETWORKCRYPTO_(\w+)$/
    },
    {
        key: "ANSWERSUPPORT",
        pattern: /^ANSWERSUPPORT_(\w+)$/,
        isAmin: true
    },
];


export default async (ctx) => {
    const callback_data = ctx.update.callback_query.data;
    const menu = new Buttons(ctx);

    for (const { key, pattern } of (LIST_ACTION)) {
        const match = callback_data.match(pattern);
        if (match && event_listner[key]) return event_listner[key]({ ctx, i18n: ctx.i18n, match, menu });
    };
};