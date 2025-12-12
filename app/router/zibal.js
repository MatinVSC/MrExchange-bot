import { Router } from "express";
import Zibal from "../payment/zibal.js";

const router = Router();

router.get('/paymentzibal', async (req, res) => {
    const { success, status, trackId } = req.query;
    if (!success || !status || !trackId) return res.send("تراکنش ناموفق");

    const apiZibal = new Zibal();
    const createPaymant = await apiZibal.Verify({ trackId });
    if (createPaymant.result == 100 && createPaymant.status == 1) {
        res.send("تراکنش موفق");
    } else {

        res.send("تراکنش ناموفق");
    };
});

export default router;