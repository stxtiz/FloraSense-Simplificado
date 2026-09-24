import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma.service.js'; // Importamos el servicio (nota el .js requerido en módulos ESM)
import { MqttModule } from './mqtt/mqtt.module.js';

@Module({
  imports: [MqttModule],
  controllers: [AppController],
  providers: [AppService, PrismaService], // Registramos el servicio para que pueda inyectarse
})
export class AppModule {}
