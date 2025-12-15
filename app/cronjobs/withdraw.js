import { FindAllPaymentFailed } from "../database/controllers/payment.js";
// import withdraw from "../withdraw/index.js";

const withdrawFailed = async () => {
    const payments = await FindAllPaymentFailed();

    // for (const item of payments) {
    //     await withdraw(item)
    // };
};

export default withdrawFailed;