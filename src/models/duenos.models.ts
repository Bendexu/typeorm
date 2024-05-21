    import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
    import { Mascotas } from './mascotas.models';

    @Entity()
    export class Duenos extends BaseEntity {
        @PrimaryGeneratedColumn('increment')
        id: number;

        @Column({ type: 'varchar', length: 100 })
        nombre: string;

        @Column({ type: 'varchar', length: 100 })
        apellido: string;

        @Column({ type: 'varchar', length: 20, unique: true })
        dni: string;

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

        @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date;

        @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
        updatedAt: Date;

        @ManyToMany(() => Mascotas, mascota => mascota.duenos, { cascade: true })
        @JoinTable()
        mascotas: Mascotas[];

      
    }
