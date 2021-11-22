// External Dependencies

// Global Variables

// Initialize Connection

import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";


export const collections: { eventos?: mongoDB.Collection } = {}


export async function connectToDatabase () {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const eventosCollection: mongoDB.Collection = db.collection(process.env.EVENTOS_COLLECTION_NAME)

    collections.eventos = eventosCollection;

        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${eventosCollection.collectionName}`);
}

