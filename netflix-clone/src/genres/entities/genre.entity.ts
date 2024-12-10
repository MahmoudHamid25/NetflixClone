import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Genre {

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    description: string;
}
