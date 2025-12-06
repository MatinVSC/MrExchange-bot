const Locales = {
    LOCALES: ({ctx, i18n, menu}) => {
        ctx.replyWithHTML(i18n.t("LOCALES.ANSWER"), menu.ChangeLocales(i18n.locale()));
    },
};

export default Locales;