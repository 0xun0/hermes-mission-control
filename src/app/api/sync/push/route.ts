import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { SessionUser } from '@/types';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { type, data } = body;

  try {
    let synced = 0;
    const errors: string[] = [];
    const userId = (session.user as SessionUser).id;

    if (type === 'tasks') {
      for (const task of data) {
        try {
          await prisma.task.upsert({
            where: { id: task.id },
            update: {
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              column: task.column,
              dueDate: task.dueDate ? new Date(task.dueDate) : null,
              updatedAt: new Date(),
            },
            create: {
              id: task.id,
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              column: task.column || 'todo',
              dueDate: task.dueDate ? new Date(task.dueDate) : null,
              instance: {
                connect: {
                  userId_key: {
                    userId,
                    key: task.instance,
                  },
                },
              },
            },
          });
          synced++;
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : 'Unknown error';
          errors.push(`Task ${task.id}: ${message}`);
        }
      }
    } else if (type === 'goals') {
       for (const goal of data) {
        try {
          await prisma.goal.upsert({
            where: { id: goal.id },
            update: {
              title: goal.title,
              description: goal.description,
              progress: goal.progress,
              status: goal.status,
              deadline: goal.deadline ? new Date(goal.deadline) : null,
              updatedAt: new Date(),
            },
            create: {
              id: goal.id,
              title: goal.title,
              description: goal.description,
              progress: goal.progress || 0,
              status: goal.status || 'active',
              deadline: goal.deadline ? new Date(goal.deadline) : null,
              instance: {
                connect: {
                  userId_key: {
                    userId,
                    key: goal.instance,
                  },
                },
              },
            },
          });
          synced++;
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : 'Unknown error';
          errors.push(`Goal ${goal.id}: ${message}`);
        }
      }
    }

    // Log the sync operation
    await prisma.syncLog.create({
      data: {
        direction: 'from_local',
        entityType: type,
        entityId: 'batch',
        payload: body,
        status: errors.length === 0 ? 'success' : 'failed',
        error: errors.length > 0 ? errors.join(', ') : null,
      },
    });

    return NextResponse.json({ synced, errors });
  } catch (error: unknown) {
    console.error('Sync Push Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
