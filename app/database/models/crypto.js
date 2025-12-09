import mongoose from "mongoose";

const CryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    network: {
        type: Array,
        required: true,
    },
    min: {
        type: Number,
        required: true,
    },
    max: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
    },

);

const Crypto = mongoose.model("Crypto", CryptoSchema);

export default Crypto;
