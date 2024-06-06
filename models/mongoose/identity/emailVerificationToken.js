module.exports = (mongoose) => {
    const emailVerificationTokenSchema = new mongoose.Schema(
        {
            token: {
                type: String,
                required: [true, "Field required"],
                default: "N/A",
                match: [/.+/, "Empty strings not allowed"],
            },
            expiresAt: {
                type: Date,
                required: [true, "Field required"],
                default: new Date(Date.now() + 1000 * 60 * 30), // 30 Minutes
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
        },
        {
            timestamps: true,
            collection: "email_verification_tokens",
        }
    );

    const EmailVerificationToken = mongoose.model("EmailVerificationToken", emailVerificationTokenSchema);

    return EmailVerificationToken;
};
