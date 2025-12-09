import { LIST_SESSION } from "../session/state.js";
import Buttons from "../buttons/index.js";
import AuthSession from "../session/authSession.js";
import CryptoSession from "../session/cryptoSession.js";

// event listner
const event_listner = {
    // session auth
    ...AuthSession,
    // session crypto
    ...CryptoSession
};


export default async (ctx) => {
    const menu = new Buttons(ctx);

    if (ctx.session?.state) {
        for (const [key, path] of Object.entries(LIST_SESSION)) {
            if (path == ctx.session.state) return event_listner[key]({ ctx, i18n: ctx.i18n, menu });
        };
    };
};