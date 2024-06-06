"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class Student extends Model {
        static associate(models) {
            // Teacher
            Student.belongsToMany(models.Teacher, {
                through: "Student_Teacher",
                as: "teacher",
                foreignKey: "studentId",
            });
        }
    }
    Student.init(
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
            modelName: "Student",   // very important
            tableName: "students",
        }
    );
    return Student;
};
