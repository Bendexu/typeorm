import "reflect-metadata"
import { DataSource } from "typeorm"

import { Veterinaria } from "./models/veterinarias.models";
import { HistoriaClinica } from "./models/historial_clinico";
import { Mascotas } from "./models/mascotas.models";
import { Duenos } from "./models/duenos.models";
import { Token } from "./models/token.model";



const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "Diego",
    password: "1234",
    database: "typeorm",
    entities: [HistoriaClinica,Mascotas,Duenos,Token,Veterinaria],
    synchronize: true,
    logging: true,
})

export default AppDataSource;