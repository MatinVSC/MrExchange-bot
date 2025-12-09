import { FindCrypto } from "../../database/controllers/crypto.js";
import { LIST_SESSION } from "../session/state.js";

const Crypto = {
    CRYPTO: async ({ ctx, i18n, menu, match }) => {
        const split = match[0].split("_");
        const { min, max } = await FindCrypto({ nickname: split[1] });
        ctx.session.cryptoName = split[1];
        ctx.session.minCrypto = min;
        ctx.session.maxCrypto = max;
        ctx.session.state = LIST_SESSION.SENDCOUNTCRYPTO;
        ctx.replyWithHTML(i18n.t("CRYPTO.SENDCOUNT",
            { min, max }
        ),
            menu.Back()
        );
    },
};

export default Crypto; 