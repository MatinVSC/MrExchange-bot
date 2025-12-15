import Zibal from "../payment/zibal.js";
import withdraw from "../withdraw/index.js";
import { Router } from "express";
import { FindPayment, UpdatePayment } from "../database/controllers/payment.js";
import { bot, i18nL } from "../bot/index.js";
import { FindUsers } from "../database/controllers/users.js";


const router = Router();

router.get('/paymentzibal', async (req, res) => {
    const { success, status, trackId } = req.query;
    if (!success || !status || !trackId) return res.send("تراکنش ناموفق");
    const apiZibal = new Zibal();
    const createPaymant = await apiZibal.Verify({ trackId });

    if (createPaymant.result == 201 || createPaymant.result == 202 || createPaymant.result == 100) {
        try {
            await UpdatePayment({ trackId }, { status: true });
            const payment = await FindPayment({ trackId });
            const { userId } = payment;
            const user = await FindUsers({ id: payment.userId });
            bot.telegram.sendMessage(
                userId, i18nL.t(
                    user.language,
                    "CRYPTO.PAYMENT_SUCCFULLY",
                    { code: trackId }
                ));
        } catch (error) {
            console.log('error catch :', error);
            
         };
        // await withdraw(payment);
        res.send("تراکنش موفق");
    } else {
        res.send("تراکنش ناموفق");
    };
});

export default router;