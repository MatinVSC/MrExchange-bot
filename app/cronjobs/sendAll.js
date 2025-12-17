import { bot } from "../bot/index.js";
import { FindSendAll, UpdateSendAll } from "../database/controllers/sendAll.js";
import { CountUsers, FindUsersPaginate } from "../database/controllers/users.js";

const sendAll = async () => {
    try {
        const sendAllData = await FindSendAll();
        if (!sendAllData) return true;

        const { step, text, user = 0, chatId, messageId } = sendAllData;
        const users = await FindUsersPaginate(user, 100);
        if (!users?.length) return true;

        if (step === "message") {

            await Promise.allSettled(
                users.map((item) => bot.telegram.sendMessage(item.id, text))
            );
        } else if (step === "forward") {
            await Promise.allSettled(
                users.map((item) => bot.telegram.forwardMessage(item.id, chatId, messageId))
            );
        };

        // users count
        const countUsers = await CountUsers();

        const nextStep = user + 100;
        if (nextStep >= countUsers) {
            // end sending
            await UpdateSendAll({ step: null, user: 0 });
            console.log("sending all users");
        } else {
            // continue
            await UpdateSendAll({ user: nextStep });
        }
    } catch (error) {
        console.error("❌ error for sending", error);
    };
};

export default sendAll;
