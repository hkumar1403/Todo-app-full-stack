import React from "react";
import { TodoItem } from "./TodoItem";
import { TodoListProps } from "@/types/interface";

export const TodoList = ({
  todos,
  onToggle,
  onDelete,
  onUpdate,
}: TodoListProps) => {
  return !todos.length ? (
    <p className="text-gray-500 mt-4">No todos yet!</p>
  ) : (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};
