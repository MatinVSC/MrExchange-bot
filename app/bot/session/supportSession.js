
const SupportSession = {
    //session for support
    SUPPORT: async ({ ctx, i18n, menu }) => {
        const userText = ctx.message.text;
        const admin = JSON.parse(process.env.ADMIN);

        ctx.replyWithHTML(i18n.t(userText), {
            chat_id: admin[0],
            ...menu.AnswerSupport(ctx.from.id)
        });
        delete ctx.session.state;
        ctx.replyWithHTML(i18n.t("SUPPORT.SUCCEFULY_SEND"), menu.mainButton());
    },
};

export default SupportSession; 