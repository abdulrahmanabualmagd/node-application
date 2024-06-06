module.exports = (mongoose) => {
    const loginAttempSchema = new mongoose.Schema(
        {
            ipAddress: {
                type: String,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
            },
            userAgent: {
                type: String,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
            },
            successful: {
                type: Boolean,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
        },
        {
            timestamps: true,
            collection:'login_attempts'
        }
    );

    const LoginAttemp = mongoose.model("LoginAttempt", loginAttempSchema);

    return LoginAttemp;
};
