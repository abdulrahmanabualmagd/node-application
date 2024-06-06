module.exports = (mongoose) => {
    const permissionSchema = new mongoose.Schema(
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
            collection:'permissions'
        }
    );

    const Permission = mongoose.model("Permission", permissionSchema);

    return Permission;
};
