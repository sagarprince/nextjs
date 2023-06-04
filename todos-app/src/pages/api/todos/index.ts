import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const map: Record<string, any> = {
        'GET': GET,
        'POST': POST,
        'PUT': PUT,
        'DELETE': DELETE,
    };

    map[req.method || 'GET'](req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { status } = req.query as any;
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
    res.status(200).json({ todos });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { todoName } = JSON.parse(req.body);
    const todo = await prisma.todo.create({ data: { name: todoName, complete: false } });
    res.status(200).json(todo);
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
    const { id, ...rest } = JSON.parse(req.body);
    const todo = await prisma.todo.update({ where: { id }, data: { ...rest } });
    res.status(200).json(todo);
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as any;
    await prisma.todo.delete({ where: { id } });
    res.status(200).json({ message: `Deleted ${id}` });
}

