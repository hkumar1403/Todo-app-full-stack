"use client";

import { error } from "console";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}
export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/todos");

        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  async function addTodo(title: string) {
    if (!title.trim()) return;

    try {
      const res = await fetch("http://localhost:5001/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error("Failed to create todo");
      }

      const newTodo: Todo = await res.json();

      setTodos((prev) => [newTodo, ...prev]);
      setInput("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  async function toggleTodo(id: string, completed: boolean) {
    try {
      const res = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      if (!res.ok) {
        throw new Error("Failed to update todo");
      }
      const updatedTodo: Todo = await res.json();
      setTodos((prev) =>
        prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
      );
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  async function deleteTodo(id: string) {
    try {
      const res = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <div>
        <input
          type="text"
          value={input}
          className="bg-white px-3 py-2 border-none placeholder-gray-400 rounded-md rounded-tr-l m-7 text-black"
          placeholder="Add a todo"
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className=" cursor-pointer px-6 py-2 bg-[#16693c] rounded-full font-black uppercase tracking-widest text-white active:shadow-none active:translate-y-0.75 transition-all duration-75 drop-shadow-[2px_12px_0_rgba(0,0,0,0.5)]"
          onClick={() => addTodo(input)}
        >
          Add
        </button>
      </div>
      <ul className="m-7">
        {todos.map((todo) => (
          <li key={todo._id} className="cursor-pointer flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id, !todo.completed)}
            />
            {todo.title}{" "}
            <button
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo._id);
              }}
            >
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
