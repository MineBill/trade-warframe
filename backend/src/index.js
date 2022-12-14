const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const { Sequelize } = require('sequelize');
dotenv.config();
const sequelize = new Sequelize(`mariadb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:3306/${process.env.DB_NAME}`)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    setup();
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

function setup() {
    app.use(cors());

    app.get("/", (req, res) => {
        res.send("Hello, World");
    });

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    });
}