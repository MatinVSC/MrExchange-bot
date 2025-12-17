import { UpdateSendAll } from "../../../database/controllers/sendAll.js";

const MessageSession = {
    //session for message admin
    MESSAGEALL: async ({ ctx, i18n, menu }) => {
        const adminText = ctx.message.text;
        await UpdateSendAll({
            step: "message",
            text: adminText,
            user: 0,
        });
        delete ctx.session.state;
        ctx.replyWithHTML(i18n.t("PANEL.SUCCFULLY"), menu.mainButtonAdmin());
    },
    FORWARDALL: async ({ ctx, i18n, menu }) => {
        const chatId = ctx.message.forward_from_chat.id; //chat id
        const messageId = ctx.message.forward_from_message_id; // message id
        await UpdateSendAll({
            step: "forward",
            messageId,
            chatId,
            user: 0,
        });
        delete ctx.session.state;
        ctx.replyWithHTML(i18n.t("PANEL.SUCCFULLY"), menu.mainButtonAdmin());
    },
};

export default MessageSession; 