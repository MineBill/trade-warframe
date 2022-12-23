import { Entity, PrimaryGeneratedColumn, Column,OneToMany} from "typeorm";
import { Listing } from "./Listing.js";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number = 0;
    @Column()

    @Column()
    displayName: string = "";

    @Column()
    uniqueName: string = "";

    @OneToMany(() => Listing, listing => listing.item)
    listings: Listing[];
};