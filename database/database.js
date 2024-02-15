import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    "balpisa-db",
    "postgres",
    "root",
    {
        host: "localhost",
        dialect: "postgres",
    }
);