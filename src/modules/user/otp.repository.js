const OTP = require("./otp.model");

exports.createOTP = async (data) => {
    return OTP.create(data);
};

exports.findValidOTP = async (userId, code) => {
    return OTP.findOne({
        userId,
        code,
        verified: false
    });
};

exports.incrementAttempts = async (id) => {
    return OTP.findByIdAndUpdate(id, { $inc: { attempts: 1 } });
};

exports.markVerified = async (id) => {
    return OTP.findByIdAndUpdate(id, { verified: true });
};
