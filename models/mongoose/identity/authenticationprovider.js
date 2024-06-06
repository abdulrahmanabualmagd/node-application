module.exports = (mongoose) => {
    const authenticationProviderSchema = new mongoose.Schema(
        {
            providerName: {
                type: String,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
            },
            providerUserID: {
                type: String,
                required: [true, "Field required"],
                default: "N/A",
                match: [/.+/, "Empty strings not allowed"],
            },
            accessToken: {
                type: String,
                required: [true, "Field required"],
                default: "N/A",
                match: [/.+/, "Empty strings not allowed"],
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
        },
        {
            timestamps: true,
            collection: "authentication_providers",
        }
    );

    const AuthenticationProvider = mongoose.model("AuthenticationProvider", authenticationProviderSchema);
    return AuthenticationProvider;
};
