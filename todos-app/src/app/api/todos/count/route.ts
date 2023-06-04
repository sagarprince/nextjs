import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
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
    const count = await prisma.todo.count(args);
    return NextResponse.json({ count });
}