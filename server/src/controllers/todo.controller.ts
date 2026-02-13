import mongoose from "mongoose";
import { TodoModel } from "../models/Todo";
import { Request, Response } from "express";

/// CREATE TODO FUNCTION  ------->

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const newTodo = await TodoModel.create({
      title: title.trim(),
      completed: false,
    });

    return res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/// GET TODOS FUNCTION  ------->

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find().sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todo:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/// UPDATE TODO FUNCTION  ------->

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid todo ID",
    });
  }
  if (title !== undefined && !title.trim()) {
    return res.status(400).json({
      message: "Title can't be empty",
    });
  }
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined && { title: title.trim() }),
        ...(completed !== undefined && { completed }),
      },
      {
        new: true,
      },
    );
    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/// DELETE TODO FUNCTION  ------->

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid todo ID",
    });
  }

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    return res.status(200).json(deleteTodo);

    // {
    //   message: "Todo successfully deleted",
    // }
  } catch (error) {
    console.error("Error deleting todo", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
