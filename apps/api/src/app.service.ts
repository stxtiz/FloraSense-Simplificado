import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AppService {
  // Inyectamos PrismaService a través del constructor
  constructor(private prisma: PrismaService) {}

  async getHello(): Promise<any> {
    // Como ejemplo de desarrollo, contamos cuántos dispositivos hay en la DB
    const deviceCount = await this.prisma.device.count();
    
    return {
      message: 'Hello World from IoT API!',
      status: 'online',
      database: {
        devicesRegistered: deviceCount
      }
    };
  }
}
