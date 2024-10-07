"use client";

import { useEffect, useState } from "react";
import TodoInput from "../components/InputTodo";
import TodoList from "../components/TodoList";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = async (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, completed: !todoToUpdate.completed }),
    });
    const updatedTodo = await res.json();
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">Awans Todo App</h1>
      <TodoInput onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} />
    </div>
  );
}
