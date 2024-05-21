import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Duenos } from './duenos.models';
import { HistoriaClinica } from './historial_clinico';
import { Veterinaria } from './veterinarias.models';


@Entity()
export class Mascotas extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true })
    idCard: string;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 100 })
    raza: string;

    @Column({ type: 'varchar', length: 100 })
    color: string;

    @Column({ type: 'date' })
    fechaNacimiento: Date;

    @Column({ type: 'varchar', length: 100 })
    pais: string;

    @Column({ type: 'varchar', length: 100 })
    departamento: string;

    @Column({ type: 'varchar', length: 100 })
    provincia: string;

    @Column({ type: 'text' })
    detalles: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToMany(() => Duenos, dueno => dueno.mascotas)
    duenos: Array<Duenos>;

    @ManyToOne(() => Veterinaria, veterinaria => veterinaria.mascotas)
    veterinaria: Veterinaria;
    
    @OneToMany(() => HistoriaClinica, historiaClinica => historiaClinica.mascota)
    historiasClinicas: HistoriaClinica[];

   
}
