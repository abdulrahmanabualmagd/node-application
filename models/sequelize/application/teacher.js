"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class Teacher extends Model {
        static associate(models) {
            // student
            Teacher.belongsToMany(models.Student, {
                through:"Student_Teacher",
                as: "students",
                foreignKey: "teacherId",
            });
        }
    }
    Teacher.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: "N/A",
            },
        },
        {
            sequelize,
            modelName: "Teacher",
            tableName: "teachers",
        }
    );
    return Teacher;
};
