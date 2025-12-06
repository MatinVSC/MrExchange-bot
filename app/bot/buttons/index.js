import { Markup } from "telegraf";
import { chunk } from "../utils/index.js";

class Buttons {
    constructor(ctx) {
        this.i18n = ctx.i18n;
    };

    // keyboard menu
    mainButton() {
        return Markup.keyboard([
            [this.i18n.t("MENU.ACCOUNT"), this.i18n.t("MENU.CRYPTO")],
            [this.i18n.t("MENU.ORDER"), this.i18n.t("MENU.SUPPORT")]
        ])
            .resize()
            .oneTime();
    };

    // auth 
    Auth() {
        return Markup.inlineKeyboard([
            [Markup.button.callback(this.i18n.t("Auth.MENU.AUTH"), "AUTH")]
        ]);
    };

    // change locales
    ChangeLocales(userLocal) {
        const locales = [
            { text: "🇮🇷 فارسی", match: "fa" },
            { text: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 english", match: "en" },
            { text: "🇮🇳 هندی", match: "in" }
        ];
        return Markup.inlineKeyboard(
            chunk(
                locales.map(item =>
                    Markup.button.callback(item.text + (item.match == userLocal ? " ✅" : ""), `CHANGELOCALES_${item.match}`)),
                2
            )
        );

    };


};

export default Buttons;