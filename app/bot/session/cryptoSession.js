import { FindCrypto } from "../../database/controllers/crypto.js";
import { LIST_SESSION } from "./state.js";

const CryptoSession = {
    //session send count crypto
    SENDCOUNTCRYPTO: async ({ ctx, i18n }) => {
        const { minCrypto, maxCrypto } = ctx.session;
        const textUser = +ctx.message.text.trim();
        // error limited
        if (isNaN(textUser) || textUser > maxCrypto || textUser < minCrypto) return ctx.reply(i18n.t("CRYPTO.ERRORCOUNT"));
        ctx.session.countCrypto = textUser;
        ctx.session.state = LIST_SESSION.SENDWALLETCRYPTO;
        ctx.reply(i18n.t("CRYPTO.SENDWALLET"));
    },

    // session send wallet address
    SENDWALLETCRYPTO: async ({ ctx, i18n, menu }) => {
        const textUser = ctx.message.text;
        // error chek wallet
        // if (chekWallet(address)) return ctx.reply(i18n.t("CRYPTO.ERRORWALLET"));
        const { cryptoName } = ctx.session;
        const { network } = await FindCrypto({ nickname: cryptoName });
        ctx.session.walletCrypto = textUser;
        ctx.replyWithHTML(i18n.t("CRYPTO.SELECTNETWORK"), menu.NetworkCrypto(network, cryptoName));
    },
};

export default CryptoSession; 