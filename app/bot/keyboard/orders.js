import { LIST_SESSION } from "../session/state.js";

const Order = {
    ORDER: async ({ ctx, i18n, menu }) => {
        ctx.session.state = LIST_SESSION.ORDERSEARCH;
        ctx.replyWithHTML(i18n.t("ORDER.ANSWER",), menu.Back());
    },
};

export default Order; 