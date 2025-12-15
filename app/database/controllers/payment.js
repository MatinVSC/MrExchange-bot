import Payment from "../models/payment.js";

const CreatePayment = async ({ id, type, count, wallet, network, amount, trackId }) => {
    const transactionId = new Date().getTime().toString();

    await Payment.create({
        transactionId,
        userId: id,
        type,
        count,
        wallet,
        network,
        amount,
        trackId
    });
};

const FindPayment = async (object) => {
    return Payment.findOne(object);
};

const FindAllPayment = async (object) => {
    return Payment.find(object);
};

const FindAllPaymentFailed = async () => {
    return Payment.find({ status: true, despot: 0 });
};

const UpdatePayment = async (object2, object) => {
    return Payment.updateOne(object2, object);
};

export { CreatePayment, FindPayment, FindAllPayment, UpdatePayment, FindAllPaymentFailed };