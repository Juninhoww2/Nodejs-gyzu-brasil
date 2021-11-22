import express from "express";
import  { connectToDatabase } from "./services/database.service";
import { eventosRouter } from "./routes/eventos.router";

const app = express()
const port = 8090

app.use(express.json());

connectToDatabase() 
    .then(() => {
        app.use("/eventos", eventosRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        })
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });