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
    <li
      className="flex items-center justify-between gap-4
    bg-white border-4 border-black rounded-xl p-4
    shadow-[8px_8px_0px_#000]
    hover:translate-x-1 hover:translate-y-1
    hover:shadow-[4px_4px_0px_#000]
    transition-all duration-150"
    >
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, !todo.completed)}
          className="w-6 h-6 border-4 border-black appearance-none 
        checked:bg-green-500 checked:shadow-[inset_0_0_0_4px_white]
        cursor-pointer"
        />

        {isEditing ? (
          <input
            type="text"
            value={editingValue}
            autoFocus
            onChange={(e) => setEditingValue(e.target.value)}
            className="flex-1 border-4 border-black rounded-lg p-3 text-lg font-semibold
          shadow-[4px_4px_0px_#000]
          outline-none"
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
        ) : (
          <span
            className={`flex-1 text-lg font-bold ${
              todo.completed ? "line-through text-gray-400" : "text-black"
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isEditing ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdate(todo._id, editingValue);
                setIsEditing(false);
              }}
              className="bg-green-500 border-4 border-black p-2 rounded-lg
            shadow-[4px_4px_0px_#000]
            hover:translate-x-1 hover:translate-y-1
            hover:shadow-[2px_2px_0px_#000]
            transition-all duration-150"
            >
              <CheckLine className="text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingValue(todo.title);
                setIsEditing(false);
              }}
              className="bg-red-500 border-4 border-black p-2 rounded-lg
            shadow-[4px_4px_0px_#000]
            hover:translate-x-1 hover:translate-y-1
            hover:shadow-[2px_2px_0px_#000]
            transition-all duration-150"
            >
              <CircleX className="text-white" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
                setEditingValue(todo.title);
              }}
              className="bg-blue-400 border-4 border-black p-2 rounded-lg
            shadow-[4px_4px_0px_#000]
            hover:translate-x-1 hover:translate-y-1
            hover:shadow-[2px_2px_0px_#000]
            transition-all duration-150"
            >
              <Pencil className="text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo._id);
              }}
              className="bg-red-500 border-4 border-black p-2 rounded-lg
            shadow-[4px_4px_0px_#000]
            hover:translate-x-1 hover:translate-y-1
            hover:shadow-[2px_2px_0px_#000]
            transition-all duration-150"
            >
              <Trash2 className="text-white" />
            </button>
          </>
        )}
      </div>
    </li>
  );
};
