import axios from "axios";

class Zibal {
    constructor() {
        this.merchant = process.env.MERCHANT;

        // ساخت axios instance با تنظیمات پیش‌فرض
        this.http = axios.create({
            baseURL: "https://gateway.zibal.ir/v1/",
        });
    };

    async RequestPayment({ amount, description, mobile, allowedCards }) {
        try {
            const response = await this.http.post("request", {
                merchant: this.merchant,
                amount,
                callbackUrl: `${process.env.URL}/paymentzibal`,
                description,
                mobile,
                allowedCards,
                // chekMobilrWithCrad: true
            });

            return response.data;
        } catch (error) {
            const err = error.response?.data || error.message;
            console.error("❌ خطا در پرداخت:", err);
            throw err;
        };
    };

    async Verify({ trackId }) {
        try {
            const response = await this.http.post("verify", {
                merchant: this.merchant,
                trackId,
            });

            return response.data;
        } catch (error) {
            const err = error.response?.data || error.message;
            console.error("❌ حطا در تراکنش", err);
            throw err;
        };
    };
};

export default Zibal;
