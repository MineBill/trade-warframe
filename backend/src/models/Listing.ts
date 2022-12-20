import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, Relation } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Listing {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @ManyToOne(() => User, user => user.listings)
    user: Relation<User>;

    @Column()
    quantity: number = 0;

    @Column()
    price: number = 0;
};