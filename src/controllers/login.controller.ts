import { Request, Response, request, response } from 'express';
import AppDataSource from '../datasource';
import { Duenos } from '../models/duenos.models';
import { HistoriaClinica } from '../models/historial_clinico';
import { Mascotas } from '../models/mascotas.models';
import { Veterinaria } from '../models/veterinarias.models';
import { Token } from '../models/token.model';


export const registrarDueno = async (request: Request, response: Response) => {
    try {
        const nuevoDueno = AppDataSource.getRepository(Duenos).create(request.body); 
        const resultado = await AppDataSource.getRepository(Duenos).save(nuevoDueno); 
        response.status(201).json({ message: 'Dueño registrado correctamente', data: resultado });
    } catch (error) {
        console.error('Error al registrar el dueño:', error);
        response.status(500).json({ message: 'Error al registrar el dueño' });
    }
};

export const registrarVeterinaria = async (request: Request, response: Response) => {
    try {
        const nuevaVeterinaria = AppDataSource.getRepository(Veterinaria).create(request.body); 
        const resultado = await AppDataSource.getRepository(Veterinaria).save(nuevaVeterinaria);
        response.status(201).json({ message: 'Veterinaria registrada correctamente', data: resultado });
    } catch (error) {
        console.error('Error al registrar la veterinaria:', error);
        response.status(500).json({ message: 'Error al registrar la veterinaria' });
    }
};

export const registrarMascota = async (request: Request, response: Response) => {
    try {
        const { duenoId, veterinariaId, ...mascotaData } = request.body;
     
        const veterinaria = await AppDataSource.getRepository(Veterinaria).findOne({ where: { id: veterinariaId } });
        
        if (!veterinaria) {
            return response.status(404).json({ message: 'Veterinaria no encontrada' });
        }

        const dueno = await AppDataSource.getRepository(Duenos).findOne({ where: { id: duenoId } });
        
        if (!dueno) {
            return response.status(404).json({ message: 'Dueño no encontrado' });
        }

        const nuevaMascota = AppDataSource.getRepository(Mascotas).create({
            ...mascotaData,
            duenos: [dueno],
            veterinaria
        });

        const resultado = await AppDataSource.getRepository(Mascotas).save(nuevaMascota);
        response.status(201).json({ message: 'Mascota registrada correctamente', data: resultado, dueno });
    } catch (error) {
        console.error('Error al registrar la mascota:', error);
        response.status(500).json({ message: 'Error al registrar la mascota', error });
    }
};

export const registrarHistoriaClinica = async (request: Request, response: Response) => {
    try {
        const { mascotaId, veterinariaId, ...historiaClinicaData } = request.body;

        const mascota = await AppDataSource.getRepository(Mascotas).findOne({ where: { id: mascotaId } });
        
        if (!mascota) {
            return response.status(404).json({ message: 'Mascota no encontrada' });
        }

        const veterinaria = await AppDataSource.getRepository(Veterinaria).findOne({ where: { id: veterinariaId } });
        
        if (!veterinaria) {
            return response.status(404).json({ message: 'Veterinaria no encontrada' });
        }

        const nuevaHistoriaClinica = AppDataSource.getRepository(HistoriaClinica).create({
            ...historiaClinicaData,
            mascota,
            veterinaria
        });

        const resultado = await AppDataSource.getRepository(HistoriaClinica).save(nuevaHistoriaClinica);
        response.status(201).json({ message: 'Historia clínica registrada correctamente', data: resultado });
    } catch (error) {
        console.error('Error al registrar la historia clínica:', error);
        response.status(500).json({ message: 'Error al registrar la historia clínica', error });
    }
};

export const generarToken = async (request: Request, response: Response) => {
    try {
        const { veterinariaId, ...tokenData } = request.body;
        
        const veterinaria = await AppDataSource.getRepository(Veterinaria).findOne({ where: { id: veterinariaId } });
        
        if (!veterinaria) {
            return response.status(404).json({ message: 'Veterinaria no encontrada' });
        }

        const nuevoToken = AppDataSource.getRepository(Token).create({ ...tokenData, veterinaria });

        const resultado = await AppDataSource.getRepository(Token).save(nuevoToken);
        
        response.status(201).json({ message: 'Token generado correctamente', data: resultado });
    } catch (error) {
        console.error('Error al generar el token:', error);
        response.status(500).json({ message: 'Error al generar el token', error });
    }
};


export const obtenerDuenos = async (request: Request, response: Response) => {
    try {
        const duenos = await AppDataSource.getRepository(Duenos).find();

        if (!duenos || duenos.length === 0) {
            return response.status(404).json({ message: 'No se encontraron dueños' });
        }

        response.status(200).json({ message: 'Dueños encontrados', data: duenos });
    } catch (error) {
        console.error('Error al obtener los dueños:', error);
        response.status(500).json({ message: 'Error al obtener los dueños', error });
    }
};

export const obtenerMascotas = async (request: Request, response: Response) => {
    try {
        const mascotas = await AppDataSource.getRepository(Mascotas).find();

        if (!mascotas || mascotas.length === 0) {
            return response.status(404).json({ message: 'No se encontraron mascotas registradas' });
        }

        response.status(200).json({ message: 'Mascotas encontradas', data: mascotas });
    } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        response.status(500).json({ message: 'Error al obtener las mascotas', error });
    }
};

export const obtenerMascotasPorVeterinaria = async (req: Request, res: Response) => {
    try {
        const veterinariaId = parseInt(req.params.id);
        const mascotas = await AppDataSource.getRepository(Mascotas).find({ where: { veterinaria: { id: veterinariaId } } });
        res.status(200).json(mascotas);
    } catch (error) {
        console.error('Error al obtener las mascotas por veterinaria:', error);
        res.status(500).json({ message: 'Error al obtener las mascotas por veterinaria' });
    }
};

export const obtenerInformacionCompleta = async (request: Request, response: Response) => {
    try {
        const id = parseInt(request.params.id);

        const mascota = await AppDataSource.getRepository(Mascotas).findOne({ 
            where: { id: id },
            relations: ['duenos', 'veterinaria']
        });

        if (!mascota) {
            return response.status(404).json({ message: 'Mascota no encontrada' });
        }

        if (!mascota.veterinaria) {
            return response.status(500).json({ message: 'Error: No se encontró una veterinaria asociada a la mascota' });
        }

        response.status(200).json({ 
            message: 'Información obtenida correctamente',
            data: {
                dueno: mascota.duenos,
                mascota,
                veterinaria: mascota.veterinaria
            }
        });
    } catch (error) {
        console.error('Error al obtener la información completa:', error);
        response.status(500).json({ message: 'Error al obtener la información completa', error });
    }
};





