import { bot, i18nL } from "../bot/index.js";
import { UpdatePayment } from "../database/controllers/payment.js";
import TRC20Wallet from "../network/trc20.js";

const Trc20 = {
    TRX: async ({ payment, user }) => {
        const { wallet, count, id, type, trackId } = payment;
        const trc = new TRC20Wallet();
        const result = trc.sendTRX(wallet, count);
        console.log(result);

        if (result?.result) {
            try {
                await UpdatePayment({ trackId }, { despot: 1 });
                bot.telegram.sendMessage(
                    id, i18nL.t(
                        user.language,
                        "CRYPRO.SUCCFULLY",
                        { type, hash: result.txid }
                    ));
            } catch (error) { };
        };
    },
    USDT: async ({ payment, user }) => {
        const { wallet, count, id, type, trackId } = payment;
        const trc = new TRC20Wallet();
        const result = trc.sendUSDT(wallet, count);
        console.log(result);

        if (result?.result) {
            try {
                await UpdatePayment({ trackId }, { despot: 1 });
                bot.telegram.sendMessage(
                    id, i18nL.t(
                        user.language,
                        "CRYPRO.SUCCFULLY",
                        { type, hash: result.txid }
                    ));
            } catch (error) { };
        };
    },
};

export default Trc20; 