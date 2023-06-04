import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const map: Record<string, any> = {
        'GET': GET,
    };

    map[req.method || 'GET'](req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
    const promises = [
        prisma.todo.count(), 
        prisma.todo.count({
            where: {
                complete: false
            }
        }), 
        prisma.todo.count({
            where: {
                complete: true
            }
        })
    ];

    const [allCount, activeCount, completedCount] = await Promise.all(promises);
    
    res.status(200).json({
        allCount,
        activeCount,
        completedCount
    });
}