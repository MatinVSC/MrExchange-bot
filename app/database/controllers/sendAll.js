import SendAll from "../models/sendAll.js";

const CreateSendAll = async () => {
    await SendAll.create({});
};

const FindSendAll = async () => {
    return SendAll.findOne().limit(1);
};

const UpdateSendAll = async (object) => {
    return SendAll.updateOne({}, object, { limit: 1 });
};

export { CreateSendAll, FindSendAll, UpdateSendAll };