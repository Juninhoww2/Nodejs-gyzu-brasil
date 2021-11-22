import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Evento from "../models/eventos"

export const eventosRouter = express.Router();

eventosRouter.use(express.json());

// External Dependencies

// Global Config

// GET

eventosRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const eventos = (await collections.eventos.find({}).toArray()) as Evento[];

        res.status(200).send(eventos);
    }  catch (error) {
        res.status(500).send(error.message);
    }
});


eventosRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const evento = (await collections.eventos.findOne(query)) as Evento;

        if (evento) {
            res.status(200).send(evento);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
})


// POST


eventosRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newEvento = req.body as Evento;
        const result = await collections.eventos.insertOne(newEvento);

        result 
            ? res.status(201).send(`Successfully created a new evento with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new evento.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
})

// PUT

eventosRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedEvento: Evento = req.body as Evento;
        const query = { _id: new ObjectId(id) };

        const result = await collections.eventos.updateOne(query, { $set: updatedEvento });

        result 
            ? res.status(200).send(`Successfully updated evento with id ${id}`)
            : res.status(303).send(`Evento with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
})

// DELETE

eventosRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.eventos.deleteOne(query);  

        if(result && result.deletedCount) {
            res.status(202).send(`Successfully removed evento with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove evento with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Evento with id ${id} does not exist`);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});
