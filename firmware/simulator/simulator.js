const mqtt = require('mqtt');

// ID único inventado para simular nuestro ESP32
const DEVICE_ID = '123e4567-e89b-12d3-a456-426614174000';
const BROKER_URL = 'mqtt://localhost:1883';
const TOPIC_TELEMETRY = `iot/v1/devices/${DEVICE_ID}/telemetry`;

console.log('🤖 Iniciando Simulador IoT (ESP32 Virtual)...');
console.log(`Conectando al broker en ${BROKER_URL}`);

const client = mqtt.connect(BROKER_URL);

client.on('connect', () => {
  console.log('✅ Conectado exitosamente al Broker MQTT');
  
  // Enviar un mensaje inicial
  sendTelemetry();
  
  // Luego enviar datos cada 10 segundos
  setInterval(sendTelemetry, 10000);
});

client.on('error', (err) => {
  console.error('❌ Error de conexión MQTT:', err);
});

function sendTelemetry() {
  // Generar valores aleatorios pero realistas
  const temp = (20 + Math.random() * 10).toFixed(1); // 20.0 a 30.0 °C
  const hum = (40 + Math.random() * 20).toFixed(1);  // 40.0% a 60.0%
  const soilRaw = Math.floor(300 + Math.random() * 400); // 300 a 700 (Rango YL-38)
  const soilPct = (100 - ((soilRaw - 300) / 400) * 100).toFixed(1); // Mapeo simple

  const payload = {
    version: 1,
    deviceId: DEVICE_ID,
    timestamp: new Date().toISOString(),
    temperatureC: parseFloat(temp),
    airHumidityPct: parseFloat(hum),
    soilMoistureRaw: soilRaw,
    soilMoisturePct: parseFloat(soilPct),
    pumpOn: false,
    rssi: -50 - Math.floor(Math.random() * 20) // -50 a -70 dBm
  };

  console.log(`📡 Enviando telemetría... Temp: ${temp}°C, Suelo: ${soilPct}%`);
  
  // Publicar mensaje como JSON
  client.publish(TOPIC_TELEMETRY, JSON.stringify(payload), { qos: 1 }, (err) => {
    if (err) {
      console.error('Error al publicar:', err);
    }
  });
}
