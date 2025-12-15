import { FindUsers } from "../database/controllers/users.js";
import Trc20 from "./trc20.js";

// event listner
const event_listner = {
    // Trc20 account
    ...Trc20
};

// crypto list
const LIST_CRYPTO = {
    TRX: "trx",
    USDT: "usdt",
    BTC: "btc",
};

export default async (payment) => {
    const user = await FindUsers({ id: payment.userId });
    for (const [key, path] of Object.entries(LIST_CRYPTO)) return event_listner[key]({ payment, user });
};