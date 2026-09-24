import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  providers: [MqttService, PrismaService],
  exports: [MqttService],
})
export class MqttModule {}
