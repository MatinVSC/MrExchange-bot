
const Auth = {
    AUTH: async ({ ctx, i18n, menu, match }) => {
        ctx.replyWithHTML(i18n.t("Auth.SENDPHONE"), menu.Back());
    },
};

export default Auth;