import { prisma } from '@/database/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const origin = request.headers.get('origin')
    const promises = ['all', 'active', 'completed'].map((v) => {
        const args = {
            where: v === 'all' ? undefined : {
                complete: v === 'active' ? false : true
            }
        };
        return prisma.todo.count(args);
    });

    const [allCount, activeCount, completedCount] = await Promise.all(promises);

    return new NextResponse(JSON.stringify({ allCount, activeCount, completedCount }), {
        headers: {
            'Access-Control-Allow-Origin': origin || "*",
            'Content-Type': 'application/json',
        }
    });
}