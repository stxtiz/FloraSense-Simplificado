import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string, action: string } }
) {
  try {
    const { id, action } = params;
    const pumpOn = action === 'on';

    let device = await prisma.device.findFirst({
      where: {
        OR: [
          { id: id },
          { deviceKey: id }
        ]
      }
    });

    if (!device) {
      // Just in case it hasn't sent telemetry yet
      device = await prisma.device.create({
        data: {
          deviceKey: id,
          name: 'Dispositivo Automático',
          pumpOn
        }
      });
    } else {
      await prisma.device.update({
        where: { id: device.id },
        data: { pumpOn }
      });
    }

    return NextResponse.json({ success: true, pumpOn });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing command' }, { status: 500 });
  }
}
