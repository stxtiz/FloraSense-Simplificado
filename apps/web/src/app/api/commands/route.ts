import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { deviceId, action } = await req.json();

    const device = await prisma.device.findUnique({
      where: { deviceKey: deviceId }
    });

    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 });
    }

    const pumpOn = action === 'on';

    await prisma.device.update({
      where: { id: device.id },
      data: { pumpOn }
    });

    return NextResponse.json({ success: true, pumpOn });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error procesando comando' }, { status: 500 });
  }
}
