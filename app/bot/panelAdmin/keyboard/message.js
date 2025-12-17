import { LIST_SESSION_ADMIN } from "../sessionAdmin/state.js";

const Message = {
    MESSAGE_ALL: async ({ ctx, i18n, menu }) => {
        ctx.session.state = LIST_SESSION_ADMIN.MESSAGEALL;
        ctx.replyWithHTML(i18n.t("PANEL.MESSAGE_ALL.ANSWER"), menu.BackAdmin());
    },
    FORWARD_ALL: async ({ ctx, i18n, menu }) => {
        ctx.session.state = LIST_SESSION_ADMIN.FORWARDALL;
        ctx.replyWithHTML(i18n.t("PANEL.FORWARD_ALL.ANSWER"), menu.BackAdmin());
    },
};

export default Message; 