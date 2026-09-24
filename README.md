# Smart Irrigation IoT Fullstack

Sistema de riego inteligente conectado a una aplicación web. Integra ESP32, DHT22, YL-38, MQTT, NestJS, PostgreSQL y Next.js.

## Estructura del Repositorio

- `apps/web`: Frontend en Next.js
- `apps/api`: Backend en NestJS
- `packages/shared`: Código compartido (schemas, tipos)
- `packages/config`: Configuración compartida (ESLint, TS)
- `firmware/esp32`: Código para el microcontrolador
- `infra/`: Configuración de infraestructura (Docker, Mosquitto)

## Entorno de Desarrollo Local

1. Copiar `.env.example` a `.env`
2. Iniciar contenedores de desarrollo (PostgreSQL, Mosquitto):
   ```bash
   docker-compose up -d
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Iniciar servicios en modo dev:
   ```bash
   npm run dev
   ```
