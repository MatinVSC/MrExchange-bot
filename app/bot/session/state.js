import { LIST_SESSION_ADMIN } from "../panelAdmin/sessionAdmin/state.js";

// session list
export const LIST_SESSION = {
    // auth user
    SENDPHONE: "send_phone",
    GETCODE: "get_code",
    SENDNATION: "send_nation",
    SENDCARD: "send_card",
    //crypto
    SENDCOUNTCRYPTO: "send_count_crypto",
    SENDWALLETCRYPTO: "send_wallet_crypto",
    // order
    ORDERSEARCH: "order_search",
    // support
    SUPPORT: "support",

    // session admin 
    ...LIST_SESSION_ADMIN
};