import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { deviceId, temperatureC, airHumidityPct, soilMoistureRaw, soilMoisturePct, pumpOn } = body;

    // Ensure the device exists
    let device = await prisma.device.findUnique({
      where: { deviceKey: deviceId }
    });

    if (!device) {
      device = await prisma.device.create({
        data: {
          deviceKey: deviceId,
          name: 'Dispositivo Automático',
        }
      });
    }

    // Update last seen
    await prisma.device.update({
      where: { id: device.id },
      data: { lastSeenAt: new Date(), status: 'ONLINE' }
    });

    // Save telemetry
    await prisma.telemetry.create({
      data: {
        deviceId: device.id,
        temperatureC,
        airHumidityPct,
        soilMoistureRaw,
        soilMoisturePct,
        pumpOn
      }
    });

    // Return current pump state requested by the user
    return NextResponse.json({ pumpOn: device.pumpOn });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error procesando telemetría' }, { status: 500 });
  }
}
