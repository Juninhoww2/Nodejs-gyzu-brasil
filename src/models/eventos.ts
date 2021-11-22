import { ObjectId } from "mongodb";

export default class Evento {
    constructor(public name: string, public category: string, public data_hora: number, public organizador: string, public id?: ObjectId) {}
}