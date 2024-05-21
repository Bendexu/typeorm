import Router from 'express';
import { generarToken, obtenerDuenos, obtenerInformacionCompleta, obtenerMascotas, obtenerMascotasPorVeterinaria, registrarDueno, registrarHistoriaClinica, registrarMascota, registrarVeterinaria } from '../controllers/login.controller';


export const Route = Router()


// RUTA DE REGISTRADO DE CADA UNO 
Route.post('/registrardueno', registrarDueno);
Route.post('/registrarveterinarias', registrarVeterinaria);
Route.post('/registrarmascotas', registrarMascota);
Route.post('/historiasclinicas',registrarHistoriaClinica );
Route.post('/tokens', generarToken);

//RUTAS PARA MOSTRA LOS DATOS DE CADA UNO 

Route.get('/mostrarduenos', obtenerDuenos);
Route.get('/mostrarmascotas', obtenerMascotas);
Route.get('/veterinarias/mascotas/:id', obtenerMascotasPorVeterinaria);
Route.get('/mascotas/informacion-completa/:id', obtenerInformacionCompleta);



