import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    amountEUR: number;

    @Column('decimal')
    amountPLN: number;

    @Column('decimal')
    rate: number;

    @CreateDateColumn()
    timestamp: Date;
}
