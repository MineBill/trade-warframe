import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DataSource } from "typeorm";
import { User } from "./models/User.js";
import { Listing } from "./models/Listing.js";

dotenv.config();

const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Listing],
    synchronize: true
});

try {
    await AppDataSource.initialize();
    console.log('Connection has been established successfully.');
    setup();
} catch (error) {
    console.error('Exception caught:', error);
}

async function setup() {
    const app = express();
    app.use(cors());

    app.get("/", (_req, res) => {
        res.send("Hello, World");
    });

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    });
}
