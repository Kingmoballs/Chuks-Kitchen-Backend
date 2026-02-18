const User = require("./user.model");

exports.createUser = async (data) => {
    return User.create(data);
};

exports.findByEmail = async (email) => {
    return User.findOne({ email });
};

exports.findByPhone = async (phone) => {
    return User.findOne({ phone });
};

exports.findByReferralCode = async (referralCode) => {
    return User.findOne({ referralCode });
};

exports.findById = async (id) => {
    return User.findById(id);
};

exports.updateUser = async (id, updateData) => {
    return User.findByIdAndUpdate(id, updateData, { new: true });
};
