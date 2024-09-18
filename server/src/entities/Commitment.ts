import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Investor } from "./Investor";

@Entity('commitments')
export class Commitment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  assetClass!: string;

  @Column("int")
  amount!: number;

  @Column()
  currency!: string;

  @ManyToOne(() => Investor, investor => investor.commitments)
  investor!: Investor;
}
