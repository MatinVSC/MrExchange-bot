import { FindUsers } from "../../database/controllers/users.js";

const Account = {
    ACCOUNT: async ({ ctx, i18n, menu }) => {
        const { nation, birthday, verify } = await FindUsers({ id: ctx.from.id });
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