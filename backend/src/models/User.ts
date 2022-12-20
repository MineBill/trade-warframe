import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Listing } from "./Listing.js";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = "";

    @Column()
    passwordHash: string = "";

    @Column()
    email: string = "";

    @OneToMany(() => Listing, listing => listing.user)
    listings: Listing[];
};
