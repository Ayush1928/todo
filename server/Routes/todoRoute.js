import express from "express";
const router = express.Router();
import Todo from "../Models/Todo.js";

// Create
router.post("/add", async (req, res) => {
    const { title, id, createdAt, isCompleted } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: "Cannot add blank task." });
    }

    if (title.length > 100) {
        return res.status(400).json({ error: "Title length cannot be greater than 100." });
    }

    const newTodo = new Todo({
        id: id,
        title: title,
        createdAt: createdAt,
        isCompleted: isCompleted,
    });

    try {
        const savedTodo = await newTodo.save();
        return res.status(200).json({ message: "Task added successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Error adding task: " + error });
    }
});

// Get all todos
router.get("/get", async (req, res) => {
    try {
        const queryIsCompleted = req.query.completionStatus;
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 5;
        const skip = (page - 1) * limit;
        
        const filter = {};
        if (queryIsCompleted === "active") {
            filter.isCompleted = false;
        } else if (queryIsCompleted === "completed") {
            filter.isCompleted = true;
        }

        const todos = await Todo.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const todoLength = await Todo.countDocuments(filter);

        return res.status(200).json({ limitedTodos: todos, todoLength });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ error: "Error fetching tasks: " + error });
    }
});


//Delete Todo
router.delete("/delete", async (req, res) => {
    const id = req.query.id;
    try {
        if (!id) {
            return res.status(404).json("Todo id not passed.");
        }
        const deletedTodo = await Todo.findOneAndDelete({ id: id });

        if (!deletedTodo) {
            return res.status(404).json("Todo not found.");
        }

        res.status(200).json("Todo has been deleted.");
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error.");
    }
});

//Update Todo
router.put("/update", async (req, res) => {
    const id = req.body.id;

    try {
        if (!id) {
            return res.status(404).json("Todo id not passed.");
        }

        const updatedTodo = await Todo.findOneAndUpdate(
            {id: id},
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;