import { ObjectId } from "mongodb";
import { client } from "../db.js";

export function getAllStudent(req) {
    return client
        .db("students")
        .collection("list")
        .find(req.query)
        .toArray();
}

// atlas mongodb

export function postNewStudent(data) {
    return client
        .db("students")
        .collection("list")
        .insertOne(data);
}

export function editStudent(id, data) {
    return client
        .db("students")
        .collection("list")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data })
}

export function deleteStudent(id) {
    return client
        .db("students")
        .collection("list")
        .deleteOne({ _id: new ObjectId(id) })
}