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
    <div
      className="mt-6 bg-white border-4 border-black rounded-2xl 
      shadow-[8px_8px_0px_#000] p-6 text-center"
    >
      <p className="text-xl font-extrabold text-black">No todos yet!</p>
      <p className="text-sm font-semibold text-gray-600 mt-2">
        Add one above and get moving 🚀
      </p>
    </div>
  ) : (
    <ul
      className="mt-6 flex flex-col gap-6 
      bg-white border-4 border-black rounded-2xl 
      shadow-[12px_12px_0px_#000] p-6"
    >
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
