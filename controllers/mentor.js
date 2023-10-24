import { ObjectId } from "mongodb";
import { client } from "../db.js";

export function getAllMentors(req) {
    return client
        .db("mentors")
        .collection("list")
        .find(req.query)
        .toArray();
}

// atlas mongodb

export function getMentorsById(id) {
    return client
        .db("mentors")
        .collection("list")
        .findOne({ _id: new ObjectId(id) })
}

export function postNewMentor(data) {
    return client
        .db("mentors")
        .collection("list")
        .insertOne(data);
}

export function editMentor(id, data) {
    return client
        .db("mentors")
        .collection("list")
        .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data }
        )
}
export function findMentorStudents() {
    return client
        .db("mentors")
        .collection("list")
        .aggregate([
            {
                $lookup: {
                    from: "students",
                    localField: "_id",
                    foreignField: "stack",
                    as: "student_cord"
                }
            }
        ])

}

export function deleteMentor(id) {
    return client
        .db("mentors")
        .collection("list")
        .deleteOne({ _id: new ObjectId(id) })
}