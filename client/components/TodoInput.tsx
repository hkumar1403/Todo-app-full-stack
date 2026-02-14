import React, { useState } from "react";
import { TodoInputProps } from "@/types/interface";

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [input, setInput] = useState<string>("");
  return (
    <div>
      <input
        type="text"
        value={input}
        className="bg-white px-3 py-2 border-none placeholder-gray-400 rounded-md rounded-tr-l m-7 text-black"
        placeholder="Add a todo"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd(input);
            setInput("");
          }
        }}
      />

      <button
        className=" cursor-pointer px-6 py-2 bg-[#16693c] rounded-full font-black uppercase tracking-widest text-white active:shadow-none active:translate-y-0.75 transition-all duration-75 drop-shadow-[2px_12px_0_rgba(0,0,0,0.5)]"
        onClick={() => {
          onAdd(input);
          setInput("");
        }}
      >
        Add
      </button>
    </div>
  );
};
