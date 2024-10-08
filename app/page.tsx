"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';

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

  const editTodo = async (id: number, newText: string) => {
    try {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, text: newText }),
      });

      if (!res.ok) {
        console.error("Failed to update todo");
        return;
      }

      const updatedTodo = await res.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center pt-10">
      <Image 
        src="/bg.jpg" 
        alt="Background"
        fill
        priority={true}
        style={{ objectFit: "cover", objectPosition: "center left" }}
        className="absolute inset-0 z-0"
      />
      
      <h1 className="text-3xl text-white font-bold mb-5 relative z-10">Awans To-do</h1>

      <TodoInput onAddTodo={addTodo} />

      <TodoList 
        todos={todos} 
        onToggleTodo={toggleTodo} 
        onDeleteTodo={deleteTodo} 
        onEditTodo={editTodo} 
      />

      <footer className="fixed bottom-5 right-0 text-white p-3 rounded-md shadow-xl text-xs absolute z-10">
        To edit an item, click on the item text that you wish to edit.
      </footer>
    </div>
  );
}
