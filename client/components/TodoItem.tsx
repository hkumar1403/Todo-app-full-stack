import { CheckLine, CircleX, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Todo, TodoItemProps } from "@/types/interface";

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(todo.title);

  return (
    <li className="cursor-pointer flex items-center gap-3">
      <input
        type="checkbox"
        className="bg-transparent"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, !todo.completed)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editingValue}
            autoFocus
            onChange={(e) => setEditingValue(e.target.value)}
            className="px-2 py-1 border rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onUpdate(todo._id, editingValue);
                setIsEditing(false);
              }
              if (e.key === "Escape") {
                setEditingValue(todo.title);
                setIsEditing(false);
              }
            }}
            onBlur={() => {
              if (editingValue.trim() && editingValue !== todo.title) {
                onUpdate(todo._id, editingValue);
              }
              setIsEditing(false);
            }}
          />
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(todo._id, editingValue);
              setIsEditing(false);
            }}
          >
            <CheckLine />
          </button>

          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setEditingValue(todo.title);
              setIsEditing(false);
            }}
          >
            <CircleX />
          </button>
        </>
      ) : (
        <>
          <span
            className={
              todo.completed ? "line-through text-gray-400" : "text-gray-700"
            }
          >
            {todo.title}
          </span>
          <button
            className="cursor-pointer hover:bg-blue-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
              setEditingValue(todo.title);
            }}
          >
            <Pencil />
          </button>

          <button
            className="cursor-pointer hover:bg-red-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo._id);
            }}
          >
            <Trash2 />
          </button>
        </>
      )}
    </li>
  );
};
