import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    trackId: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        default: true
    },
    wallet: {
        type: String,
        required: true,
    },
    network: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: false,
    },
    status: {
        type: Boolean,
        default: false
    },
    // 1 => true // 0 => false // 2 => cancel
    despot: {
        type: Number,
        default: 0
    },
});

const Payments = mongoose.model("payment", paymentSchema);

export default Payments;
