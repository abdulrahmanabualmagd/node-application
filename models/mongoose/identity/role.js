module.exports = (mongoose) => {
    const roleSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, "Field required"],
                match: [/.+/, "Empty strings not allowed"],
            },
            description: {
                type: String,
                required: [true, "Field required"],
                default: "N/A",
                match: [/.+/, "Empty strings not allowed"],
            },
        },
        {
            timestamps: true,
            collection:'roles'
        }
    );

    const Role = mongoose.model("Role", roleSchema);
    return Role;
};
