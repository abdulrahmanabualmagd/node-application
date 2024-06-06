module.exports = (mongoose) => {
    const passwordResetTokenSchema = new mongoose.Schema(
        {
            token: {
                type: String,
                unique: [true, "Already Taken"],
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
            },
            ipAddress: {
                type: String,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
                default: "N/A",
            },
            userAgent: {
                type: String,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
                default: "N/A",
            },
            expiresAt: {
                type: Date,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
                default: new Date(Date.now() + 1000 * 60 * 30), // 30 Minutes
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
        },
        {
            timestamps: true,
            collection: 'password_reset_tokens'
        }
    );

    const PasswordResetToken = mongoose.model("PasswordResetToken", passwordResetTokenSchema);

    return PasswordResetToken;
};
