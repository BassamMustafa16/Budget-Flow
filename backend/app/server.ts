import express, { Request, Response } from 'express';

const app = express();
const port = 3001;

import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from BudgetFlow Backend!');
});

app.get('/api/db-check', async (req: Request, res: Response) => {
    try {
        // Attempt to connect by runnning a simple count query
        await prisma.user.count();
        res.json({ message: 'Database Connected via Prisma' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database Connection Failed', error });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});
