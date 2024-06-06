module.exports = (mongoose) => {
    const usersRolesSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "roles",
            },
            roleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "permissions",
            },
        },
        {
            timestamps: true,
            collection:'users_roles'
        }
    );

    const UsersRoles = mongoose.model("UserRole", usersRolesSchema);

    return UsersRoles;
};
