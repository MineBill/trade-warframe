import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Relation, JoinColumn } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Ban {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @OneToOne(() => User)
    @JoinColumn()
    bannedUser: User;

    @OneToOne(() => User)
    @JoinColumn()
    admin: User;

    @Column({ type: "text" })
    reason: string = "";
}