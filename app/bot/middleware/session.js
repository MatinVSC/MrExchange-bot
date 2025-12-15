import { LIST_SESSION } from "../session/state.js";
import Buttons from "../buttons/index.js";
import AuthSession from "../session/authSession.js";
import CryptoSession from "../session/cryptoSession.js";
import OrderSession from "../session/orderSession.js";
import SupportSession from "../session/supportSession.js";

// event listner
const event_listner = {
    // auth
    ...AuthSession,
    // crypto
    ...CryptoSession,
    // order
    ...OrderSession,
    // support
    ...SupportSession
};


export default async (ctx) => {
    const menu = new Buttons(ctx);

    if (ctx.session?.state) {
        for (const [key, path] of Object.entries(LIST_SESSION)) {
            if (path == ctx.session.state) return event_listner[key]({ ctx, i18n: ctx.i18n, menu });
        };
    };
};