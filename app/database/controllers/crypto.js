import Crypto from "../models/crypto.js";

const CreateCrypto = async ({ name, nickname, network, min, max, price }) => {
    await Crypto.create({ name, nickname, network, min, max, price });
};

const FindCrypto = async (object) => {
    return Crypto.findOne(object);
};

const FindAllCrypto = async (object) => {
    return Crypto.find(object);
};

const UpdateCrypto = async (object2, object) => {
  return Crypto.updateOne(object2, object);
};

export { CreateCrypto, FindCrypto, FindAllCrypto, UpdateCrypto };