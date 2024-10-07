"use client";

import { useState } from "react";

type TodoInputProps = {
  onAddTodo: (text: string) => void;
};

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleAdd = () => {
    if (newTodo.trim() !== "") {
      onAddTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="flex mb-4 relative z-10">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="border text-black p-2 rounded mr-2"
        placeholder="Add new to-do"
      />
      
      <button
        onClick={handleAdd}
        className="bg-bgcolor text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}
