import { Markup } from "telegraf";

class ButtonsAdmin {
    constructor(ctx) {
        this.i18n = ctx.i18n;
    };

    // keyboard menu
    mainButtonAdmin() {
        return Markup.keyboard([
            [this.i18n.t("PANEL.MENU_PANEL.TOTAL")],
            [this.i18n.t("PANEL.MENU_PANEL.MESSAGE_ALL"), this.i18n.t("PANEL.MENU_PANEL.FORWARD_ALL")]
        ])
            .resize()
            .oneTime();
    };

    // answer support 
    AnswerSupport(userId) {
        return Markup.inlineKeyboard([
            [Markup.button.callback(this.i18n.t("SUPPORT.MENU.ANSWER"), `ANSWERSUPPORT_${userId}`)]
        ]);
    };

    // back
    BackAdmin() {
        return Markup.keyboard([["/panel"]]).resize().oneTime();
    };
};

export default ButtonsAdmin;