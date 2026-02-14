"use client";

import { TodoInput } from "@/components/TodoInput";
import { TodoItem } from "@/components/TodoItem";
import { useEffect, useState } from "react";
import type { Todo } from "@/types/interface";
import { TodoList } from "@/components/TodoList";
import { useRouter } from "next/navigation";

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/todos", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        fetchTodos(); // your existing function
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  async function addTodo(title: string) {
    if (!title.trim()) return;

    try {
      const res = await fetch("http://localhost:5001/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error("Failed to create todo");
      }

      const newTodo: Todo = await res.json();

      setTodos((prev) => [newTodo, ...prev]);
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
        credentials: "include",
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
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async function saveEdit(id: string, editingValue: string) {
    if (!editingValue.trim()) return;

    try {
      const res = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: editingValue }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updatedTodo: Todo = await res.json();

      setTodos((prev) =>
        prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
      );
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={saveEdit}
      />
    </div>
  );
}
