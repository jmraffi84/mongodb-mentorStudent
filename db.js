import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Obj from "mongodb";

dotenv.config();

// initilizing connecton string
const mongoConnectString = process.env.MONGO_URL;

export async function dbConnection() {
    const client = new MongoClient(mongoConnectString);
    await client.connect();
    console.log("Mongo db connected successfully");
    return client
}

export let objectId = Obj.ObjectId;
export const client = await dbConnection();