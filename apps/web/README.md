# FloraSense Web Dashboard (Versión Simplificada)

Esta es la aplicación web para **FloraSense**, construida con [Next.js](https://nextjs.org) (App Router), TailwindCSS, Recharts y **Prisma** como ORM para conexión a MySQL.

## Responsabilidades
En esta arquitectura simplificada, esta aplicación se encarga de:
1. **Frontend:** Mostrar el dashboard reactivo y los gráficos históricos a través de componentes React.
2. **Backend (API Routes):** Exponer los endpoints REST (`/api/telemetry` y `/api/commands`) que recibe las peticiones HTTP directamente desde el microcontrolador (ESP8266).
3. **Base de Datos:** Definir el esquema de MySQL con `Prisma` y gestionar las consultas de lectura/escritura (telemetría y comandos de bomba).

## Inicio Rápido (Local)

Si estás usando Docker (recomendado en la raíz del proyecto), no necesitas ejecutar esto localmente. Si deseas correrlo sin Docker:

1. Asegúrate de tener una base de datos MySQL corriendo y configura tu `.env.local`:
   ```bash
   DATABASE_URL="mysql://usuario:password@localhost:3306/florasense"
   ```

2. Instala las dependencias y genera el cliente de Prisma:
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el dashboard.

## Estructura de Endpoints de Hardware
El firmware ESP8266 se comunica con las siguientes rutas en Next.js:
- `POST /api/telemetry`: Para enviar la lectura de los sensores. Responde con el estado actual requerido de la bomba (`{ "pumpOn": true/false }`).
- `POST /api/devices/[id]/pump/[action]`: Utilizado por el panel de administración web para alternar manualmente el encendido o apagado de la bomba de agua.
