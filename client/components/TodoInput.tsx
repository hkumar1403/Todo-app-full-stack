import React, { useState } from "react";
import { TodoInputProps } from "@/types/interface";

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [input, setInput] = useState<string>("");
  return (
    <div>
      <input
        type="text"
        value={input}
        className="bg-transparent p-4 outline-none placeholder-gray-400 border-none m-7 text-black focus:outline-none focus:border-b-2 "
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
        className=" cursor-pointer px-8 py-4 bg-[#00c282] rounded-full font-black uppercase tracking-widest text-white active:shadow-none active:translate-y-0.75 transition-all duration-75 text-[14px]"
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
