import { UpdateUsers } from "../../database/controllers/users.js";

const Locales = {
    CHANGELOCALES: async ({ ctx, i18n, menu, match }) => {
        const split = match[0].split("_");
        i18n.locale(split[1]);
        await UpdateUsers({ id: ctx.from.id }, { language: split[1] });
        ctx.replyWithHTML(i18n.t("STARTMESSAGE", { name: ctx.from.first_name }));
        ctx.editMessageText(i18n.t("LOCALES.ANSWER"), menu.ChangeLocales(i18n.locale()));

    },
};

export default Locales;