const Panel = {
    PANEL: ({ ctx, i18n, menu }) => {
        ctx.replyWithHTML(i18n.t("PANEL.MESSAGE_PANEL"), menu.mainButtonAdmin());
    },
};

export default Panel;