import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { LIST_SESSION } from './state.js';
import { getBankNameFromCardNumber, verifyCardNumber, verifyIranianNationalId } from '@persian-tools/persian-tools';
import { UpdateUsers } from "../../database/controllers/users.js";
// import IpPanel from '../../api/ipPanel.js';
// import Zibal from '../../api/zibal.js';

const AuthSession = {
    //session sendphone
    SENDPHONE: async ({ ctx, i18n }) => {
        const textUser = ctx.message.text;
        if (isNaN(textUser) || textUser.length < 10) return ctx.reply(i18n.t("Auth.ERRORNUMBER"))
        const phoneNumber = parsePhoneNumber(textUser, "IR");
        if (!isValidPhoneNumber(phoneNumber?.number, "IR")) return ctx.reply(i18n.t("Auth.ERRORNUMBER"));
        ctx.reply(i18n.t("Auth.SENDCODE"));

        // const sms = new IpPanel();
        const code = Math.floor(1000 + Math.random() * 9000);
        // sms.sendPattern(
        //     {
        //         pattern: "test",
        //         recipient: phoneNumber?.number,
        //         values: code
        //     }
        // );
        console.log(code);

        ctx.session.state = LIST_SESSION.GETCODE;
        ctx.session.get_code = code;
        ctx.session.timeout_code = (Date.now() / 1000) + 120;
        ctx.session.phoneNumber = phoneNumber?.number;
    },

    // session getcode
    GETCODE: async ({ ctx, i18n, menu }) => {
        const { timeout_code, get_code } = ctx.session;
        const textUser = ctx.message.text;
        // error time out
        if ((Date.now() / 1000) > timeout_code) {
            delete ctx.session.state;
            return ctx.reply(i18n.t("Auth.ERRORTIME"), menu.mainButton());
        };
        // eeror code 
        if (textUser != get_code) return ctx.reply(i18n.t("Auth.ERRORCODE"), menu.mainButton());
        // successfuly code
        ctx.session.state = LIST_SESSION.SENDNATION;
        ctx.reply(i18n.t("Auth.SENDNATION"));
    },

    // send nation
    // format : nation \n birthdat
    SENDNATION: async ({ ctx, i18n }) => {
        const text = ctx.message.text.split("\n");
        // error line
        if (!text[1]) return ctx.reply(i18n.t("Auth.ERRORLINE"));
        // error nation
        if (!verifyIranianNationalId(text[0])) return ctx.reply(i18n.t("Auth.ERRORNATION"));
        const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
        if (!dateRegex.test(text[1])) return ctx.reply(i18n.t("Auth.ERRORBIRTH"));
        // shahkar
        // const zbl = new Zibal();
        // const estelam = await zbl.shahkarInquiry({ mobile: ctx.session.phoneNumber, nationalCode: text[0] });
        // error
        // if (estelam.result != 1) return ctx.reply(i18n.t("Auth.ERRORNATPHONE"));
        ctx.session.state = LIST_SESSION.SENDCARD;
        ctx.session.nation = text[0];
        ctx.session.barth = text[1];
        ctx.reply(i18n.t("Auth.SENDCARD"));
    },


    // send card
    SENDCARD: async ({ ctx, i18n, menu }) => {
        const textUser = ctx.message.text;
        // error verify card
        if (!verifyCardNumber(textUser)) return ctx.reply(i18n.t("Auth.ERRORCARD"));
        // const zbl = new Zibal();
        // const estelamcard = await zbl.cardInquiry({ cardNumber: text });
        // error estelamcard
        // if (estelamcard.result != 1) return ctx.reply(i18n.t("Auth.ERRORGET"));
        const { nation, barth, phoneNumber } = ctx.session;
        // const estelamcardnation = await zbl.checkCardWithNationalCode({ cardNumber: textUser, nationalCode: nation, birthDate: barth });
        // error estelamcardnation
        // if (estelamcardnation.result != 1 || !estelamcardnation.data.matched) return ctx.reply(i18n.t("Auth.ERRORNATIONCARD"));
        const cards = [
          {
            number: textUser,
            name: "userName", // estelamcard.data?.name,
            bank: getBankNameFromCardNumber(textUser),
          },
        ];
        await UpdateUsers({ id: ctx.from.id }, { verify: true, phonenumber: phoneNumber, nation, birthday: barth, cards });
        delete ctx.session.state;
        ctx.reply(i18n.t("Auth.SUCCESSFULY"), menu.mainButton());
    },
};

export default AuthSession;