"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/16/solid";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditClick = () => {
    if (!todo.completed) {
      setIsEditing(true);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editText.trim() !== "") {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (editText.trim() !== "") {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center mb-2 border-b p-2">
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={handleEditChange}
          onKeyDown={handleEditSubmit}
          onBlur={handleBlur}
          autoFocus
          className="text-black px-2 py-1 rounded border border-gray-300"
        />
      ) : (
        <span
          onClick={handleEditClick}
          className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
        >
          {todo.text}
        </span>
      )}
      <div className="flex items-center">
        <button
          onClick={() => onToggle(todo.id)}
          className="bg-bgcolor text-white px-2 py-1 rounded mr-2"
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white p-1 rounded flex items-center"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
}
