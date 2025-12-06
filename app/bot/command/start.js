import { CreateUsers } from "../../database/controllers/users.js";

const Start = {
    START: ({ctx, i18n, menu}) => {
        ctx.replyWithHTML(i18n.t("STARTMESSAGE", { name: ctx.from.first_name }), menu.mainButton());
        CreateUsers({ id: ctx.from.id, language: ctx.from.language_code });
    },
};

export default Start;