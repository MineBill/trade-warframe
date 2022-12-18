import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Sequelize } from "sequelize";

dotenv.config();
const app = express();
const sequelize = new Sequelize(`mariadb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:3306/${process.env.DB_NAME}`)

const modelDefinitions = [
    "./models/User.js",
];

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    setup();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

async function setup() {
    await loadAndSyncModels();

    app.use(cors());

    app.get("/", (req, res) => {
        res.send("Hello, World");
    });

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    });
}

async function loadAndSyncModels() {
    // Import each model from the definitions.
    // Each model is a module so we must import it.
    // Import, however, returns a promise, so we need to await it.
    for (const modelPath of modelDefinitions) {
        const model = (await import(modelPath)).default;
        model(sequelize);
    }

    // Force sequelize to recreate tables everytime, to avoid
    // tables with missing/different columns.
    sequelize.sync({ force: true });
}
