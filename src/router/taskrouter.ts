import { Request, Response } from "express";
import express from "express";
import Todo from "../model/todo";
import { authmiddleware } from "../middleware/authmiddleware";

const router2 = express.Router();

router2.post("/", authmiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.create({
      user: req.user!.id,  // FIXED
      title,
      description,
    });
    

    res.json({ message: "Todo created", todo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router2.get("/", authmiddleware, async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user!.id })  // FIXED
      .sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router2.put("/:id", authmiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user!.id }, // FIXED
      { title, description },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo updated", todo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router2.delete("/:id", authmiddleware, async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user!.id, // FIXED
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router2.patch("/:id/toggle", authmiddleware, async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user!.id, // FIXED
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();

    res.json({ message: "Todo status updated", todo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router2;
