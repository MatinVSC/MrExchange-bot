import { LIST_SESSION_ADMIN } from "../sessionAdmin/state.js";

const Support = {
    ANSWERSUPPORT: async ({ ctx, i18n, menu, match }) => {
        const userId = match[0].split("_")[1];
        ctx.replyWithHTML(i18n.t("SUPPORT.ADMIN_ANSWER"), menu.BackAdmin());
        ctx.session.state = LIST_SESSION_ADMIN.ANSWERSUPPORT;
        ctx.session.id = userId;
    },
};

export default Support;