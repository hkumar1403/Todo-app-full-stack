import React, { useState } from "react";
import { TodoInputProps } from "@/types/interface";

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [input, setInput] = useState<string>("");

  return (
    <div
      className="flex gap-4 items-center bg-white border-4 border-black 
    shadow-[8px_8px_0px_#000] rounded-2xl p-6"
    >
      <input
        type="text"
        value={input}
        placeholder="Add a todo"
        className="flex-1 border-4 border-black rounded-lg p-4 text-lg font-semibold
        placeholder-black bg-white outline-none
        shadow-[6px_6px_0px_#000]
        focus:translate-x-1 focus:translate-y-1
        focus:shadow-[4px_4px_0px_#000]
        transition-all duration-150 text-gray-700"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.trim()) {
            onAdd(input);
            setInput("");
          }
        }}
      />

      <button
        onClick={() => {
          if (!input.trim()) return;
          onAdd(input);
          setInput("");
        }}
        className="cursor-pointer bg-green-500 text-white text-lg font-extrabold px-6 py-4
        border-4 border-black rounded-xl shadow-[8px_8px_0px_#000]
        hover:translate-x-1 hover:translate-y-1
        hover:shadow-[4px_4px_0px_#000]
        active:translate-x-2 active:translate-y-2
        active:shadow-[2px_2px_0px_#000]
        transition-all duration-150"
      >
        Add
      </button>
    </div>
  );
};
