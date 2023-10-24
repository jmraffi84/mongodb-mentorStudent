import express from "express";
import { deleteMentor, editMentor, findMentorStudents, getAllMentors, getMentorsById, postNewMentor } from "../controllers/mentor.js";

//  initilizing the routes
const router = express.Router();

// get request
router.get("/", async (req, res) => {
    try {
        if (req.query.mentors) {
            req.query.mentor = parent(req.query.mentors)
        }
        console.log(req.query);
        const mentor = await getAllMentors(req);
        if (!mentor || mentor.length === 0) {
            return res.status(400).json({ message: "No data available" })
        }
        res.status(200).json({ Details: mentor })
    } catch (error) {
        console.log("Error fetching mentors:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})


//  all by params
router.get("/all/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const mentor = await getMentorsById(id);
        if (!mentor) {
            return res.status(400).json({ message: "No data available" })
        }
        return res.status(200).json({ data: mentor })
    } catch (error) {
        console.log("Error fetching mentors:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})
router.get("/student_cord", async (req, res) => {
    try {
        const mentorDetails = req.body;
        const mentor = await findMentorStudents(mentorDetails).toArray();
        console.log(mentor);
        if (!mentor) {
            return res.status(400).json({ message: "No data available" })
        }
        return res.status(200).json({ data: mentor })
    } catch (error) {
        console.log("Error fetching mentors:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})

router.post("/add", async (req, res) => {
    try {
        const newMentor = req.body;
        console.log(newMentor);
        if (!newMentor || !newMentor.length === 0) {
            return res.status(400).json({ message: "No mentors details added" })
        }
        const result = await postNewMentor(newMentor)
        if (!result.acknowledged) {
            return res.status(400).json({ message: "Error in posting  data" })
        }
        res.status(201).json({ Details: newMentor, status: result })
    } catch (error) {
        console.log("Error fetching mentors:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})

router.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMentor = req.body;
        if (!id || !updatedMentor) {
            return res.status(400).json({ message: " Wrong request" })
        }
        const result = await editMentor(id, updatedMentor)
        if (!result) {
            return res.status(400).json({ message: " Error in updating the data" })
        }
        if (result) {
            return res.status(200).json({ data: updatedMentor, status: result })

        }

    } catch (error) {
        console.log("Error fetching mentors:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Wrong data request" })

        }
        const result = await deleteMentor(id)
        if (result.deletedCount === 0) {
            return res.status(400).json({ message: "No data found on request or may have been deleted before" })
        }
        return res.status(200).json({ data: result })
    } catch (error) {
        console.log("Error fetching mentors:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})

export const mentorRouter = router;