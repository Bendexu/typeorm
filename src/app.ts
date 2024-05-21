import express  from "express";
import "reflect-metadata"
import cors from "cors";
import AppDataSource from "./datasource";
import { Route } from "./routes/login.routes";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


AppDataSource.initialize()
.then(()=>{
    console.log("Data source has been intilized");
    app.use(Route);
    app.listen(3001,()=>{
        console.log("Serve is runing on port 3001")
    });
})
.catch(()=>{
    console.error("error during data source initializatiosn")
})