import 'dotenv/config'
import { Prisma, PrismaClient } from '../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import express from 'express'
import { Request, Response } from 'express'
const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

const app = express()

app.use(express.json())

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

const server = app.listen(3001, () =>
  console.log(`
🚀 Server ready at: http://localhost:3001
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`),
)
