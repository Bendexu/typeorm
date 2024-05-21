import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, OneToMany } from 'typeorm';
import { HistoriaClinica } from './historial_clinico';
import { Mascotas } from './mascotas.models';
import { Token } from './token.model';



@Entity()
export class Veterinaria extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100 })
    empresa: string;

    @Column({ type: 'varchar', length: 11, unique: true })
    ruc: string;

    @Column({ type: 'varchar', length: 100 })
    contraseña: string;

    @Column({ type: 'varchar', length: 100 })
    encargado: string;

    @Column({ type: 'varchar', length: 100 })
    direccion: string;

    @Column({ type: 'varchar', length: 100 })
    pais: string;

    @Column({ type: 'varchar', length: 100 })
    departamento: string;

    @Column({ type: 'varchar', length: 100 })
    provincia: string;

    @Column({ type: 'varchar', length: 20 })
    numero_telefono: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Mascotas, mascota => mascota.veterinaria)
    mascotas: Mascotas[];

    @OneToMany(() => HistoriaClinica, historiaClinica => historiaClinica.veterinaria)
    historiasClinicas: HistoriaClinica[];

    @OneToMany(() => Token, token => token.veterinaria)
    tokens: Token[];
}

  

