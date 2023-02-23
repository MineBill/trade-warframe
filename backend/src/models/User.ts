import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
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
    passwordSalt: string = "";

    @Column()
    email: string = "";

    @Column()
    admin: boolean = false;

    @OneToMany(() => Listing, listing => listing.user)
    listings: Listing[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};
