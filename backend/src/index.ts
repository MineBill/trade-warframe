import "reflect-metadata";
import moment from "moment";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { DataSource } from "typeorm";
import { User } from "./models/User.js";
import { Listing, ListingType } from "./models/Listing.js";
import { Item } from "./models/Item.js"
import { verifyJWT, generateJWT, hashPassword, comparePasswords } from "./utils.js"

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
    app.use(express.json());


    const authFilter = expressjwt({ secret: process.env.JWT_PRIVATE_KEY, algorithms: ["RS256"] });

    app.get("/", (_req, res) => {
        res.send("Hello, World");
    });

    app.post("/listings", authFilter, async (req: JWTRequest, res) => {
        const { itemName, quantity, price, type } = req.body;

        if (price == null || price <= 0) {
            return res.status(400).send({ message: "Invalid price number" });
        }

        if (quantity == null || quantity <= 0) {
            return res.status(400).send({ message: "Invalid quantity number" });
        }

        if (type != "BUY" && type != "SELL") {
            return res.status(400).send({ message: "Invalid type for listing" });
        }

        const items = AppDataSource.getRepository(Item);
        const item = await items.findOne({ where: { uniqueName: itemName } });
        if (item == null) {
            return res.status(400).send({ message: "Item does not exist" });
        }

        const users = AppDataSource.getRepository(User);
        const user = await users.findOne({ where: { id: req.auth.data.id } });
        if (user == null) {
            return res.status(400).send({ message: "Invalid user id" });
        }

        const listing = new Listing();
        listing.user = user;
        listing.price = price;
        listing.quantity = quantity;
        listing.type = type as ListingType;
        listing.item = item;

        const listings = AppDataSource.getRepository(Listing);
        listings.save(listing);

        return res.status(200).send({});
    });

    app.put("/listings", authFilter, async (req: JWTRequest, res) => {
        const { listingId, itemName, quantity, price, type } = req.body;

        const users = AppDataSource.getRepository(User);
        const user = await users.findOne({ where: { id: req.auth.data.id } });
        if (user == null) {
            return res.status(400).send({ message: "Invalid user id" });
        }

        if (listingId <= 0 || listingId == undefined) {
            return res.status(400).send({ message: "Invalid listing id" });
        }

        const listings = AppDataSource.getRepository(Listing);
        const listing = await listings.findOne({ where: { id: listingId }, relations: { user: true } });
        if (listing == null) {
            return res.status(400).send({ message: "Invalid listing id" });
        }

        if (listing.user.id != user.id) {
            return res.status(403).send({ message: "Cannot modify a listing you do not own" });
        }

        if (price == null || price <= 0) {
            return res.status(400).send({ message: "Invalid price number" });
        }

        if (quantity == null || quantity <= 0) {
            return res.status(400).send({ message: "Invalid quantity number" });
        }

        if (type != "BUY" && type != "SELL") {
            return res.status(400).send({ message: "Invalid type for listing" });
        }

        const items = AppDataSource.getRepository(Item);
        const item = await items.findOne({ where: { uniqueName: itemName } });
        if (item == null) {
            return res.status(400).send({ message: "Item does not exist" });
        }

        listing.price = price;
        listing.quantity = quantity;
        listing.item = item;
        listing.type = type;

        listings.save(listing);

        return res.status(200).send({});
    });

    app.delete("/listings", authFilter, async (req: JWTRequest, res) => {
        const { id } = req.body;

        const listings = AppDataSource.getRepository(Listing);
        const listing = await listings.findOne({ where: { id: id }, relations: { user: true } });
        if (listing == null) {
            return res.status(400).send({ message: "Listing with id does not exist" });
        }

        if (listing.user.id != req.auth.data.id) {
            return res.status(403).send({ message: "User does not own the listing" });
        }

        listing.deleted = true;
        if (req.body.completed != undefined) {
            listing.completed = req.body.completed;
        }

        listings.save(listing);
        return res.status(200).send({});
    });


    app.get("/listings/byName/:byName", async (req, res) => {
        const byname = (req.params.byName);
        const listings = AppDataSource.getRepository(Listing);
        const result = await listings.find({
            order: {
                updatedAt: "DESC"
            },
            take: 25,
            relations: {
                item: true,
                user: true
            },
            where: {
                item: {
                    uniqueName: byname

                },
                deleted: false
            }
        });

        if (result.length == 0) {
            return res.status(404).send();
        }

        result.map(entry => {
            delete entry.user.passwordHash
            delete entry.user.createdAt
            delete entry.user.updatedAt
        });

        return res.send(result);
    });

    app.get("/user/:id", authFilter, async (req: JWTRequest, res) => {
        const id = parseInt(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).send({message: "User id must be a number"});
        }

        const users = AppDataSource.getRepository(User);
        const user = await users.findOne({ where: { id: id } });
        if (user == null) {
            return res.status(400).send({message: "User id is invalid"});
        }

        const listings = AppDataSource.getRepository(Listing);
        const result = await listings.find({ where: { deleted: false, user: { id: user.id } } });
        user.listings = result;

        delete user.passwordHash;
        delete user.passwordSalt;

        if (id == req.auth.data.id) {
            return res.status(200).send(user);
        }

        delete user.email;
        delete user.createdAt;
        delete user.updatedAt;

        return res.status(200).send(user);
    })

    app.get("/listings/:max", async (req, res) => {
        let max = parseInt(req.params.max)
        if (Number.isNaN(max)) {
            return res.status(400).send()
        }

        // Limit maximum listings to 25
        if (max > 25) {
            max = 25
        }

        const listings = AppDataSource.getRepository(Listing);
        const result = await listings.find({
            where: {
                deleted: false
            },
            order: {
                updatedAt: "DESC"
            },
            take: max,
            relations: {
                item: true,
                user: true
            }
        })

        result.map(entry => {
            delete entry.user.passwordHash
            delete entry.user.createdAt
            delete entry.user.updatedAt
        })

        return res.status(200).send(result)
    })

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })

    app.get("/item/:id", async (req, res) => {
        const items = AppDataSource.getRepository(Item)
        const numid = parseInt(req.params.id)

        if (Number.isNaN(numid)) {
            return res.status(400).send();
        }

        let result = await items.findBy({ id: numid });
        if (result.length == 0) {
            return res.status(404).send();
        }

        return res.send(result[0]);
    })

    app.get("/items", async (req, res) => {
        const items = AppDataSource.getRepository(Item);

        let result = await items.find();

        return res.send(result);
    });

    function verifyEmail(email: string): boolean {
        return email != null && email != "";
    }

    function verifyUsername(name: string): boolean {
        return name != null && name != "";
    }

    app.put("/auth/register", async (req, res) => {
        const { email, username, password } = req.body;

        if (!verifyEmail(email) || !verifyUsername(username)) {
            return res.status(400).send({
                message: "Email or password are malformed."
            });
        }

        const users = AppDataSource.getRepository(User);
        const result = await users.find({ where: { email: email } });
        if (result.length > 0) {
            return res.status(400).send({
                message: "Email or password are not correct."
            });
        }

        const user = new User();
        user.email = email;
        const { hash, salt } = hashPassword(password);
        user.passwordHash = hash;
        user.passwordSalt = salt;
        user.name = username;

        users.save(user);

        return res.status(200).send({});
    });

    app.put("/auth/login", async (req, res) => {
        const { email, password } = req.body;

        if (!verifyEmail(email)) {
            return res.status(400).send({
                message: "Email or password are malformed."
            });
        }

        const users = AppDataSource.getRepository(User);
        const result = await users.find({
            where: { email: email }
        });
        if (result.length <= 0) {
            return res.status(404).send({
                message: "Email or password are wrong"
            });
        }

        const user: User = result[0];

        if (!comparePasswords(user.passwordHash, password, user.passwordSalt)) {
            return res.status(404).send({
                message: "Email or password are wrong"
            });
        }

        delete user.passwordSalt;
        delete user.passwordHash;

        const token = generateJWT({ data: user });
        const refreshExpiry = moment().utc().add(3, 'days').endOf('day').format('X');
        const refreshtoken = generateJWT({ exp: parseInt(refreshExpiry), data: { id: user.id } });
        delete user.passwordHash;

        return res.status(200).send({
            data: user,
            token: token,
            refreshtoken: refreshtoken
        });
    });

    app.use(function (err: any, _req: any, res: any, next: any) {
        console.log("LOL");
        if (err.name === "UnauthorizedError") {
            res.status(401).send({ message: "Invalid Token" });
        } else {
            next(err);
        }
    });
}
