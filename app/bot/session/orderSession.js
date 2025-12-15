import { FindPayment } from "../../database/controllers/payment.js";

const OrderSession = {
    //session for search orders
    ORDERSEARCH: async ({ ctx, i18n, menu }) => {
        const userTrackId = ctx.message.text;
        const findOrder = await FindPayment({ trackId: userTrackId });
        // error not found order
        if (!findOrder && findOrder?.userId != ctx.from.id) return ctx.reply(i18n.t("ORDER.NOT_FOUND"));
        // delete ctx.session.state;
        // const { type, count, wallet, network } = findOrder;
        // find order message
        ctx.replyWithHTML(i18n.t("ORDER.FOUND", {
            status: findOrder.despot == 0
                ? i18n.t("ORDER.WITHDWAR_UNSUCCFULY")
                : i18n.t("ORDER.WITHDWAR_SUCCFULY"),
            cryptoName: findOrder.type,
            countCrypto: findOrder.count,
            walletCrypto: findOrder.wallet,
            network: findOrder.network
        }),
            menu.mainButton()
        );
    },
};

export default OrderSession; 