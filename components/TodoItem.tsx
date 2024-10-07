// components/TodoItem.tsx
"use client";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      key={todo.id}
      className={`flex justify-between items-center p-2 border-b ${
        todo.completed ? "line-through text-gray-500" : ""
      }`}
    >
      <span>{todo.text}</span>
      <div>
        <button
          onClick={() => onToggle(todo.id)}
          className="bg-green-500 text-white px-2 py-1 rounded mr-2"
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
