import { FindUsers } from "../../database/controllers/users.js";

const Account = {
    ACCOUNT: async ({ ctx, i18n, menu }) => {
        const user = await FindUsers({ id: ctx.from.id });
        const { verify, nation, birthday } = user;
        ctx.replyWithHTML(i18n.t("ACCOUNT_INFO",
            {
                verify: !verify ? " ❌" : " ✅",
                nation: nation ?? " نامشخص",
                birthday: birthday ?? " نامشخص"
            }),
            !verify ? menu.Auth() : ""
        );
    },
};

export default Account; 