import Users from "../models/users.js";

// ایجاد کاربر اگر وجود نداشت
const CreateUsers = async ({ id, language }) => {
  const findUser = await FindUsers({ id });
  if (!findUser) {
    return Users.create({ id, language });
  };
  return findUser;
};

// پیدا کردن کاربر
const FindUsers = async ({ id }) => {
  return Users.findOne({ id });
};

// آپدیت کاربر
const UpdateUsers = async ({ id }, object) => {
  return Users.updateOne({ id }, object);
};

export { CreateUsers, UpdateUsers, FindUsers };