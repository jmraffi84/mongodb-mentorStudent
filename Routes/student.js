import express from "express";
import { deleteStudent, editStudent, getAllStudent, postNewStudent } from "../controllers/student.js";

//  initilizing the routes
const router = express.Router();

// get request
router.get("/all", async (req, res) => {
    try {
        if (req.query.students) {
            req.query.students = parent(req.query.students)
        }
        console.log(req.query);
        const student = await getAllStudent(req);
        if (!student || student.length === 0) {
            return res.status(400).json({ message: "No data available" })
        }
        res.status(200).json({ Details: student })
    } catch (error) {
        console.log("Error fetching mentors:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})



router.post("/add", async (req, res) => {
    try {
        const newStudent = req.body;
        console.log(newStudent);
        if (!newStudent || newStudent.length === 0) {
            return res.status(400).json({ message: "No students details added" })
        }
        const result = await postNewStudent(newStudent)
        if (!result || !result.acknowledged) {
            return res.status(400).json({ message: "Error in posting  data" })
        }
        res.status(201).json({ message: "student added successfully", student: newStudent, status: result })
    } catch (error) {
        console.log("Error fetching mentors:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})

router.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = req.body;
        if (!id || !updatedStudent) {
            return res.status(400).json({ message: "Error In editing data" })
        }
        const result = await editStudent(id, updatedStudent)
        if (!result.lastErrorObject.updateExisting) {
            return res.status(400).json({ message: "Error In updating data" })

        }
        return res.status(200).json({ Details: updatedStudent, status: result })
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
        const result = await deleteStudent(id);
        if (!result.deletedCount <= 0) {
            return res.status(400).json({ message: "Error deleting requested data" })

        }
        res.status(200).json({ data: result })
    } catch (error) {
        console.log("Error fetching mentors:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})

export const studentRouter = router;