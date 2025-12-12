import { FindCrypto } from "../../database/controllers/crypto.js";
import { FindUsers } from "../../database/controllers/users.js";
import { CreatePayment } from "../../database/controllers/payment.js";
import { LIST_SESSION } from "../session/state.js";
import Zibal from "../../payment/zibal.js";
import { cardUser } from "../utils/cardUser.js";

const Crypto = {
    // actions crypto
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

    // actions network
    NETWORKCRYPTO: async ({ ctx, i18n, menu, match }) => {
        const split = match[0].split("_");
        const { cryptoName, countCrypto, walletCrypto } = ctx.session;
        const { price } = await FindCrypto({ nickname: cryptoName });
        const total = (+countCrypto * price) + (+split[2] * price);
        const { verify, phonenumber, cards } = await FindUsers({ id: ctx.from.id });
        // create payment in zibal 
        const apiZibal = new Zibal();
        const cardsUser = cardUser(cards);
        const handlerPayment = await apiZibal.RequestPayment({
            amount: (total * 10),
            description: `خرید ${countCrypto} ${countCrypto}`,
            mobile: phonenumber,
            allowedCards: cardsUser
        });

        // create payment db
        await CreatePayment({
            id: ctx.from.id,
            type: cryptoName,
            count: countCrypto,
            wallet: walletCrypto,
            network: split[1],
            amount: total,
            trackId: handlerPayment.trackId
        });

        ctx.replyWithHTML(i18n.t("CRYPTO.PAYMENT",
            { cryptoName, countCrypto, walletCrypto, network: split[1], price, fee: split[2], total }
        ),
            verify
                ? menu.Payment(`https://gateway.zibal.ir/start/${handlerPayment.trackId}`)
                : menu.Auth()
        );
    },
};

export default Crypto; 