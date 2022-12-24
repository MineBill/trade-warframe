import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, Relation, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.js";
import { Item } from "./Item.js";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
};