# 📋 Awans to-do

A simple and modern To-Do List application built using Next.js 13, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. This app allows users to create, update, and delete tasks, with the added feature that completed tasks cannot be edited.

## 🚀 Features

- Add New Tasks: Create new tasks with ease.
- Mark Tasks as Completed: Tasks can be marked as completed, and once completed, they cannot be edited.
- Edit Tasks: Edit tasks while they are not marked as complete.
- Delete Tasks: Remove tasks when they are no longer needed.
- Responsive Design: The app is fully responsive and works seamlessly across all devices.
- Powered by Prisma & PostgreSQL: Data persistence using Prisma as the ORM and PostgreSQL as the database.

## 🛠️ Tech Stack

- Next.js 13 - The React framework for production.
- TypeScript - Static type definitions for JavaScript.
- Tailwind CSS - Utility-first CSS framework for building custom designs.
- Prisma - Next-generation ORM for Node.js and TypeScript.
- PostgreSQL - Open-source relational database.

## 🔧 Installation

1. Clone my repo

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install Dependencies

```bash
npm install
```

3. Set up db

- Create a PostgreSQL database locally or use a cloud service like Heroku or Supabase.
- Configure the database connection string in the .env file:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
```

4. Run Prisma migrations to create the required tables

```bash
npx prisma migrate dev
```

5. Start the development server

```bash
npm run dev
```

## 📋 API Endpoints

- GET /api/todos: Retrieve all to-do items.
- POST /api/todos: Create a new to-do item.
- PUT /api/todos: Update the status of a to-do item (e.g., mark as completed).
- DELETE /api/todos: Delete a to-do item.

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
