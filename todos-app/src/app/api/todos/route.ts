import { prisma } from '@/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const argsMap: any = {
    'active': {
      where: {
        complete: false
      }
    },
    'completed': {
      where: {
        complete: true
      }
    }
  }
  const args = status && argsMap[status] || {};
  const todos = await prisma.todo.findMany(args);

  return NextResponse.json({ todos });
}

export async function POST(request: Request) {
  const { todoName } = await request.json();
  const todo = await prisma.todo.create({ data: { name: todoName, complete: false } });
  return NextResponse.json({ todo });
}

export async function PUT(request: Request) {
  const { id, ...rest } = await request.json();
  console.log(id, rest);
  const todo = await prisma.todo.update({ where: { id }, data: { ...rest } });
  return NextResponse.json({ todo, revalidated: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || '';
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({
    message: `Deleted ${id}`
  });
}