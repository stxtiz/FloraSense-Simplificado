import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(): Promise<any> {
    const deviceCount = await this.prisma.device.count();
    return {
      message: 'Hello World from IoT API!',
      status: 'online',
      database: { devicesRegistered: deviceCount }
    };
  }

  async getDemoDevice(): Promise<any> {
    const device = await this.prisma.device.findFirst({
      orderBy: { lastSeenAt: 'desc' }
    });

    if (!device) return null;

    const lastTelemetry = await this.prisma.telemetry.findFirst({
      where: { deviceId: device.id },
      orderBy: { recordedAt: 'desc' }
    });

    return {
      id: device.id,
      name: device.name,
      status: device.status,
      lastTelemetry: lastTelemetry ? {
        ...lastTelemetry,
        timestamp: lastTelemetry.recordedAt,
        id: lastTelemetry.id.toString(),
      } : null
    };
  }
}
