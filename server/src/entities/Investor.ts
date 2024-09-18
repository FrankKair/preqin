import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Commitment } from "./Commitment";

@Entity('investors')
export class Investor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  country!: string;

  @Column()
  dateAdded!: Date;

  @Column()
  lastUpdated!: Date;

  @OneToMany(() => Commitment, commitment => commitment.investor)
  commitments!: Commitment[];
}
