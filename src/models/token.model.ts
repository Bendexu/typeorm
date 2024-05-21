import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Veterinaria } from './veterinarias.models';

@Entity()
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    token: string;

    @Column({ type: 'timestamp' })
    vigencia: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Veterinaria, veterinaria => veterinaria.tokens)
    veterinaria: Veterinaria;
   
}
