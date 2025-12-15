import { LIST_SESSION } from "../session/state.js";

const Support = {
    SUPPORT: async ({ ctx, i18n, menu }) => {
        ctx.session.state = LIST_SESSION.SUPPORT;
        ctx.replyWithHTML(i18n.t("SUPPORT.ANSWER", { support: process.env.SUPPORT }), menu.Back());
    },
};

export default Support; 