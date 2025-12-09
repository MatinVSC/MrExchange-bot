import { FindAllCrypto } from "../../database/controllers/crypto.js";

const Crypto = {
    CRYPTO: async ({ ctx, i18n, menu }) => {
        const allCrypto = await FindAllCrypto();
        ctx.replyWithHTML(i18n.t("CRYPTO.BUYCRYPTO"), menu.BuyCrypto(allCrypto));
    },
};

export default Crypto; 