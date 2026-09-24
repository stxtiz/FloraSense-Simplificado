import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    // Nos conectamos al broker MQTT (Mosquitto)
    const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
    this.client = mqtt.connect(brokerUrl);

    this.client.on('connect', () => {
      console.log(`🔌 Conectado al broker MQTT en ${brokerUrl}`);
      // Nos suscribimos a todos los mensajes de telemetría de cualquier dispositivo (+)
      this.client.subscribe('iot/v1/devices/+/telemetry', (err) => {
        if (!err) {
          console.log('📡 Suscrito exitosamente a iot/v1/devices/+/telemetry');
        }
      });
    });

    // Escuchamos los mensajes que llegan
    this.client.on('message', async (topic, message) => {
      try {
        await this.handleIncomingMessage(topic, message);
      } catch (error) {
        console.error('❌ Error procesando mensaje MQTT:', error);
      }
    });
  }

  onModuleDestroy() {
    this.client.end();
  }

  /**
   * Procesa los mensajes MQTT entrantes
   */
  private async handleIncomingMessage(topic: string, message: Buffer) {
    // Ejemplo de topic: iot/v1/devices/123e4567-e89b-12d3-a456-426614174000/telemetry
    const topicParts = topic.split('/');
    const deviceId = topicParts[3]; // Extraemos el ID del dispositivo del topic

    const payloadString = message.toString();
    const payload = JSON.parse(payloadString);

    console.log(`📥 Telemetría recibida del dispositivo ${deviceId}:`, payload);

    // 1. Verificar si el dispositivo existe en la base de datos
    // Usaremos findFirst porque puede que el deviceId del topic no sea un UUID válido
    // o podríamos usar upsert para crearlo automáticamente en desarrollo.
    // Para simplificar, asumiremos que el ID ya está o lo buscamos por deviceKey.
    
    // Si no existe, lo creamos "al vuelo" para facilitar el desarrollo
    let device = await this.prisma.device.findUnique({ where: { id: deviceId } }).catch(() => null);
    
    if (!device) {
       // Intentamos crearlo si el deviceId es un UUID válido
       try {
         device = await this.prisma.device.create({
           data: {
             id: deviceId,
             deviceKey: `key-${deviceId}`,
             name: `Dispositivo Simulado ${deviceId.substring(0, 4)}`,
             status: 'ONLINE'
           }
         });
         console.log(`🆕 Nuevo dispositivo registrado automáticamente: ${device.id}`);
       } catch (e) {
         console.error('El topic no contenía un UUID válido para el dispositivo');
         return; // Salimos si no es UUID válido
       }
    } else {
       // Actualizamos el estado a ONLINE y su última vez visto
       await this.prisma.device.update({
         where: { id: deviceId },
         data: { status: 'ONLINE', lastSeenAt: new Date() }
       });
    }

    // 2. Guardar la telemetría en la base de datos
    await this.prisma.telemetry.create({
      data: {
        deviceId: device.id,
        temperatureC: payload.temperatureC,
        airHumidityPct: payload.airHumidityPct,
        soilMoistureRaw: payload.soilMoistureRaw,
        soilMoisturePct: payload.soilMoisturePct,
        pumpOn: payload.pumpOn || false,
        rssi: payload.rssi,
        payloadVersion: payload.version || 1,
      }
    });

    console.log(`💾 Telemetría guardada en PostgreSQL para ${deviceId}`);
  }
}
