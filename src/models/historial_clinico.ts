import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Mascotas } from './mascotas.models';
import { Veterinaria } from './veterinarias.models';

@Entity()
export class HistoriaClinica extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'date' })
    fecha: Date;

    @Column({ type: 'varchar', length: 255 })
    motivo: string;

    @Column({ type: 'text' })
    diagnostico: string;

    @Column({ type: 'text' })
    receta: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Mascotas, mascota => mascota.historiasClinicas)
    mascota: Mascotas;

    @ManyToOne(() => Veterinaria, veterinaria => veterinaria.historiasClinicas)
    veterinaria: Veterinaria;

    
}
