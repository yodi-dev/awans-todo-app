"use client";

import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
};

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }: TodoListProps) {
  return (
    <ul className="w-1/2 relative z-10">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </ul>
  );
}
