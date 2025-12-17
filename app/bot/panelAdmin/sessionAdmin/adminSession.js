const SupportAdmin = {
  // session admin support
  ANSWERSUPPORT: async ({ ctx, i18n, menu }) => {
    const textAdmin = ctx.message.text;
    ctx.reply(textAdmin, {
      chat_id: ctx.session.id,
    });
    delete ctx.session.state;
    delete ctx.session.id;
    ctx.replyWithHTML(i18n.t("SUPPORT.SUCCEFULY_SEND_ADMIN"), menu.mainButtonAdmin());
  },
};

export default SupportAdmin;
