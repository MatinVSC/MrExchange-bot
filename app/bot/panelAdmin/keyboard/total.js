import { CountUsers } from "../../../database/controllers/users.js";

const Total = {
    TOTAL: async ({ ctx, i18n }) => {
        const total = await CountUsers();
        ctx.replyWithHTML(i18n.t("PANEL.TOTAL", { total }));
    },
};

export default Total; 