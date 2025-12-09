import { LIST_SESSION } from "../session/state.js";

const Auth = {
    AUTH: async ({ ctx, i18n, menu }) => {
        ctx.replyWithHTML(i18n.t("Auth.SENDPHONE"), menu.Back());
        ctx.session.state = LIST_SESSION.SENDPHONE;
    },
};

export default Auth;