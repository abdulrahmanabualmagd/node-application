const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class Student_Teacher extends Model {
        static associate(models) {}
    }
    Student_Teacher.init(
        {
            teacherId: {
                type: DataTypes.INTEGER,
            },
            studentId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "Student_Teacher",
            tableName: "students-teachers",
            primaryKey: ["teacherId", "studentId"],
        }
    );
    return Student_Teacher;
};
