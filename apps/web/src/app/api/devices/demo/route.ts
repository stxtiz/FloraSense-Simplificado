import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    let device = await prisma.device.findFirst({
      include: {
        telemetries: {
          orderBy: { recordedAt: 'desc' },
          take: 1
        }
      }
    });

    if (!device) {
      device = await prisma.device.create({
        data: {
          deviceKey: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Dispositivo Principal'
        },
        include: { telemetries: true }
      });
    }

    const lastTelemetry = device.telemetries[0];

    return NextResponse.json({
      id: device.deviceKey,
      name: device.name,
      status: device.status,
      lastTelemetry: lastTelemetry ? {
        temperatureC: lastTelemetry.temperatureC,
        airHumidityPct: lastTelemetry.airHumidityPct,
        soilMoisturePct: lastTelemetry.soilMoisturePct,
        pumpOn: lastTelemetry.pumpOn,
        timestamp: lastTelemetry.recordedAt.toISOString()
      } : null
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
