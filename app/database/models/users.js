import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    language: {
        type: String,
        required: true,
        minlength: 2,
    },
    verify: {
        type: Boolean,
        default: false
    },
    phonenumber: {
        type: String,
        required: false,
        default: null
    },
    nation: {
        type: Number,
        required: false,
        default: null
    },
    birthday: {
        type: String,
        required: false,
        default: null
    },
    cards: {
        type: Array,
        required: false,
    },
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
