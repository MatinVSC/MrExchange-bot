import mongoose from "mongoose";

const SendAllSchema = new mongoose.Schema({
    step: { type: String, default: null },
    text: { type: String, default: null },
    messageId: { type: String, default: null },
    chatId: { type: String, default: null },
    user: { type: Number, default: 0 },
});

const SendAll = mongoose.model("SendAll", SendAllSchema);

export default SendAll;
