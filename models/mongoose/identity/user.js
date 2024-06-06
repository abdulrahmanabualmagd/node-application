module.exports = (mongoose) => {
    const userSchema = new mongoose.Schema(
        {
            username: {
                type: String,
                required: [true, "Field required"],
                unique: [true, "Value already Taken"],
                match: [/.+/, "Empty strings not allowed"],
            },
            email: {
                type: String,
                required: [true, "Field required"],
                unique: [true, "Value already Taken"],
                match: [/^\S+@\S+\.\S+$/, "Email is invalid"],
            },
            passwordHash: {
                type: String,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
            },
            firstName: {
                type: String,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
            },
            lastName: {
                type: String,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
            },
            phone: {
                type: String,
                required: [true, "Field required"],
                unique: [true, "Value is already taken"],
                match: [/^[0-9]+$/i, "Invalid Phone Number"],
            },
            address: {
                type: String,
                required: [true, "Field required"],
                default: "N/A",
            },
            status: {
                type: String,
                required: [true, "Field required"],
                defaultValue: "active",
                enum: ["active", "inactive", "suspend"],
            },
            salt: {
                type: String,
                required: [true, "Field required"],
            },
        },
        {
            timestamps: true,
            collection:'users'
        }
    );

    const User = mongoose.model("User", userSchema);
    return User;
};
