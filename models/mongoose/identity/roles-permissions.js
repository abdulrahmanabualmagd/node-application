module.exports = (mongoose) => {
    const rolesPermissionsSchema = new mongoose.Schema(
        {
            roleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "roles",
            },
            permissionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "permissions",
            },
        },
        {
            timestamps: true,
            collection:'roles_permissions'
        }
    );

    const RolesPermissions = mongoose.model("RolePermission", rolesPermissionsSchema);

    return RolesPermissions;
};
