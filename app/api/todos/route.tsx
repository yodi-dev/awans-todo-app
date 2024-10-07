import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { text } = await request.json();
  if (!text) {
    return NextResponse.json({ message: "Text is required" }, { status: 400 });
  }
  const newTodo = await prisma.todo.create({
    data: { text }
  });
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, text, completed } = await request.json();
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const dataToUpdate: { text?: string; completed?: boolean } = {};
  if (text !== undefined) {
    dataToUpdate.text = text;
  }
  if (completed !== undefined) {
    dataToUpdate.completed = completed;
  }

  if (Object.keys(dataToUpdate).length === 0) {
    return NextResponse.json({ message: "No valid fields to update" }, { status: 400 });
  }

  const updatedTodo = await prisma.todo.update({
    where: { id: Number(id) },
    data: dataToUpdate,
  });

  return NextResponse.json(updatedTodo);
}


export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  await prisma.todo.delete({
    where: { id: Number(id) }
  });
  return NextResponse.json({}, { status: 204 });
}
