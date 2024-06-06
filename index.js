const { dbApplication } = require("./config/database");

async function main() {
    const db = await dbApplication;

    const student = await db.Student.repo.getOne({
        name: "Abdulrahman",
    });

    const teacher = await db.Teacher.repo.getOne({
        name: "Ahmed",
    });

    const result = teacher.addStudent;

    console.log(result);

    return db;
}
main()
    .then((db) => {
        // close the connection
        db.sequelize.close();
        console.log("[SUCCESSFULL!]");
    })
    .catch((err) => {
        console.log(err.message);
    });
