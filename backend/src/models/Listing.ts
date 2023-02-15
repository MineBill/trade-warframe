import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, Relation, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.js";
import { Item } from "./Item.js";

export enum ListingType {
    None = "NONE",
    Buy = "BUY",
    Sell = "SELL"
}

@Entity()
export class Listing {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @ManyToOne(() => User, user => user.listings)
    user: Relation<User>;

    @Column()
    quantity: number = 0;

    @ManyToOne(() => Item, item => item.listings)
    item: Relation<Item>;

    @Column()
    price: number = 0;

    @Column()
    type: ListingType = ListingType.None;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    @Column()
    completed: boolean = false;

    @Column()
    deleted: boolean = false;
};