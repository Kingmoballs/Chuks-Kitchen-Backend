const userRepo = require("./user.repository");
const otpRepo = require("./otp.repository");
const { generateOtp } = require("../../shared/utils/generateOtp");
const ApiError = require("../../shared/utils/ApiError");

exports.signup = async (payload) => {
    const { name, email, phone, referralCode } = payload;

    if (!email && !phone) {
        throw new ApiError(400, "Email or Phone is required");
    }

    // Check for duplicates
    if (email) {
        const existingEmail = await userRepo.findByEmail(email);
        if (existingEmail) {
            throw new ApiError(409, "Email already exists");
        }
    }

    if (phone) {
        const existingPhone = await userRepo.findByPhone(phone);
        if (existingPhone) {
            throw new ApiError(409, "Phone already exists");
        }
    }

    // Validate Referral
    if (referralCode) {
        const refUser = await userRepo.findByReferralCode(referralCode);
        if (!refUser) {
            throw new ApiError(400, "Invalid referal code")
        }
    }

    // Generate personal referral code
    const newReferralCode = Math.random().toString(36).substring(2, 8);

    const user = await userRepo.createUser({
        name,
        email,
        phone,
        referredBy: referralCode,
        referralCode: newReferralCode
    });

    // Generate OTP
    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await otpRepo.createOTP({
        userId: user._id,
        code,
        expiresAt
    });

    return {
        message: "User created. Verify OTP.",
        userId: user._id,
        otp: code
    };
}

exports.verifyUser = async (payload) => {
    const { userId, code } = payload;

    const otpRecord = await otpRepo.findValidOTP(userId, code);

    if (!otpRecord) {
        throw new ApiError(400, "Invalid OTP");
    }

    if (otpRecord.expiresAt < new Date()) {
        throw new ApiError(400, "OTP expired");
    }

    if (otpRecord.attempts >= 5) {
        throw new ApiError(429, "Too many attempts");
    }

    await otpRepo.markVerified(otpRecord._id);
    await userRepo.updateUser(userId, { status: "ACTIVE" });

    return { message: "Account verified successfully" };
};
