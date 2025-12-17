import Users from "../models/users.js";

const CreateUsers = async ({ id, language }) => {
  const findUser = await FindUsers({ id });
  if (!findUser) {
    return Users.create({ id, language });
  };
  return findUser;
};

const FindUsers = async ({ id }) => {
  return Users.findOne({ id });
};

const FindAllUsers = async () => {
  return Users.find();
};

const FindUsersPaginate = async (skip, limit) => {
  return await Users.find().skip(skip).limit(limit);
};

const CountUsers = async () => {
  return Users.countDocuments();
};

const UpdateUsers = async ({ id }, object) => {
  return Users.updateOne({ id }, object);
};

export { CreateUsers, UpdateUsers, FindUsers, FindAllUsers, CountUsers, FindUsersPaginate };