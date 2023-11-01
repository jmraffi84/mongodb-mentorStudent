import express from "express"

const router = express.Router();

router.post("/signup", (req, res) => {
    try {
        const user = req.body
        res.send({ data: user })
        res.send({ data: "Signup api working" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})
router.post("/login", (req, res) => {
    try {
        const user = req.body
        res.send({ data: user })
        res.send({ data: "Signup api working" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

export const userRouter = router;