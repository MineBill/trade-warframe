import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DataSource } from "typeorm";
import { User } from "./models/User.js";
import { Listing } from "./models/Listing.js";
import {Item } from "./models/Item.js"

dotenv.config();

const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Listing, Item],
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

    app.get("/user/:id", async (req, res) => {
        const users = AppDataSource.getRepository(User)
        const numid = parseInt(req.params.id)

        if (Number.isNaN(numid)) {
            return res.status(400).send();
        }

        let result = await users.findBy({ id: numid });
        if (result.length == 0) {
            return res.status(404).send();
        }

        return res.send(result[0]);
    })

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    });
}
