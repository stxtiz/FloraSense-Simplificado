---
name: smart-irrigation-iot-fullstack
version: 1.0.0
language: es
summary: Skill profesional para diseñar, implementar, probar y desplegar una aplicación web IoT de riego inteligente con ESP32, DHT22, sensor de humedad de suelo YL-38, mini bomba de agua, MQTT, PostgreSQL y panel web.
---

# Skill: Smart Irrigation IoT Fullstack

## 1. Rol

Actúa como **arquitecto de software senior + ingeniero full-stack + ingeniero IoT + DevOps + QA**. Tu objetivo es construir una solución completa, mantenible, segura y demostrable para un sistema de riego inteligente conectado a una aplicación web.

La solución debe integrar:

- Microcontrolador **ESP32** (preferido) o equivalente.
- Sensor de temperatura/humedad ambiental **DHT22**.
- Sensor de humedad de suelo **YL-38** o módulo equivalente con lectura analógica.
- **Mini bomba de agua** controlada mediante relé/MOSFET apropiado.
- Comunicación IoT mediante **MQTT**.
- Backend con API REST.
- Base de datos **PostgreSQL**.
- Aplicación web responsive.
- Autenticación y autorización.
- Historial de telemetría.
- Reglas de riego automático.
- Control manual seguro de la bomba.
- Auditoría, logs, pruebas y despliegue reproducible.

No construyas únicamente una demo visual: entrega una arquitectura coherente y ejecutable de extremo a extremo.

---

## 2. Contexto funcional del proyecto

El sistema mide el estado ambiental y del suelo, almacena las mediciones y permite visualizar y controlar el riego desde una aplicación web.

Como referencia inicial para la humedad de suelo del YL-38, tratar los valores ADC como **lecturas crudas que deben calibrarse**, no como porcentajes universales.

Rangos de referencia iniciales observados en el requerimiento:

- `0–300`: muy húmedo / sensor sumergido / suelo saturado.
- `300–700`: suelo húmedo / rango generalmente adecuado.
- `700–1023`: suelo seco / sensor fuera del suelo o sin humedad.

Estos rangos **no deben codificarse como verdad física definitiva**. Implementar calibración configurable por dispositivo/sensor y convertir posteriormente la lectura cruda a un porcentaje de humedad normalizado.

---

## 3. Stack técnico por defecto

Usa este stack salvo que exista una razón técnica documentada para cambiarlo:

### Frontend
- Next.js con App Router.
- TypeScript estricto.
- Tailwind CSS.
- Componentes accesibles y reutilizables.
- TanStack Query o estrategia equivalente para estado del servidor.
- Gráficos con una librería estable y ligera.
- Formularios con validación mediante Zod.

### Backend
- NestJS con TypeScript.
- API REST versionada bajo `/api/v1`.
- OpenAPI/Swagger.
- Validación DTO estricta.
- Prisma ORM.

### Base de datos
- PostgreSQL.
- Migraciones versionadas.
- Índices para consultas por dispositivo y fecha.

### IoT
- ESP32.
- MQTT.
- Eclipse Mosquitto en desarrollo/autohospedado o broker administrado en producción.
- Payload JSON versionado.
- QoS definido por tipo de mensaje.

### Infraestructura
- Docker y Docker Compose para desarrollo local.
- Variables de entorno validadas al inicio.
- Reverse proxy/TLS en producción.
- CI con lint, typecheck, tests y build.

### Opcional cuando aporte valor
- Redis para rate limiting, locks distribuidos o cache.
- TimescaleDB si el volumen de telemetría crece significativamente.

---

## 4. Arquitectura objetivo

Diseña el sistema con estos componentes:

1. **ESP32 / dispositivo de campo**
   - Lee DHT22.
   - Lee humedad de suelo.
   - Publica telemetría MQTT.
   - Recibe comandos de bomba.
   - Aplica límites de seguridad locales incluso si el servidor falla.

2. **Broker MQTT**
   - Recibe telemetría.
   - Distribuye comandos.
   - Usa autenticación por dispositivo.
   - No exponer broker anónimo a Internet.

3. **Backend/API**
   - Consume telemetría MQTT.
   - Valida, normaliza y persiste mediciones.
   - Evalúa reglas automáticas.
   - Expone API REST para frontend.
   - Envía comandos MQTT.
   - Registra auditoría.

4. **PostgreSQL**
   - Usuarios.
   - Dispositivos.
   - Sensores.
   - Telemetría.
   - Reglas.
   - Eventos de riego.
   - Comandos.
   - Auditoría.

5. **Aplicación web**
   - Dashboard en tiempo casi real.
   - Históricos.
   - Configuración.
   - Control manual.
   - Estado del dispositivo.

Flujo principal:

`Sensores -> ESP32 -> MQTT -> Backend -> PostgreSQL -> API -> Web`

Flujo de control:

`Web -> API -> autorización + validaciones -> MQTT -> ESP32 -> bomba -> confirmación -> Backend -> Web`

---

## 5. Requisitos funcionales mínimos

Implementa como mínimo:

### Autenticación
- Inicio de sesión seguro.
- Roles `ADMIN` y `USER` como base.
- Contraseñas almacenadas con hash robusto.
- Sesiones/JWT de acuerdo con la arquitectura elegida.

### Gestión de dispositivos
- Registrar dispositivo.
- Nombre, ubicación lógica y descripción.
- Estado `ONLINE`, `OFFLINE`, `UNKNOWN`.
- Última conexión.
- Firmware version.
- Identificador único no secuencial expuesto públicamente.

### Dashboard
Mostrar por dispositivo:
- Temperatura actual.
- Humedad ambiental actual.
- Humedad de suelo actual.
- Estado de bomba.
- Última lectura.
- Estado online/offline.
- Modo `MANUAL` o `AUTO`.

### Históricos
- Gráfico por rango de fechas.
- Temperatura.
- Humedad ambiental.
- Humedad de suelo.
- Eventos de bomba/riego.
- Filtros por dispositivo.

### Control manual
- Encender bomba.
- Apagar bomba.
- Mostrar confirmación de comando y estado real reportado por dispositivo.
- Nunca asumir que un comando enviado fue ejecutado hasta recibir ACK/estado.

### Riego automático
Reglas configurables, por ejemplo:
- Encender cuando humedad de suelo esté por debajo de un umbral.
- Apagar cuando alcance un umbral superior.
- Tiempo máximo de bomba encendida.
- Cooldown mínimo entre riegos.
- Horarios permitidos opcionales.
- Deshabilitar automatización cuando dispositivo esté offline o datos estén obsoletos.

### Calibración
Permitir por sensor/dispositivo:
- ADC seco.
- ADC húmedo.
- Inversión de escala si corresponde.
- Porcentaje normalizado 0–100.

---

## 6. Seguridad de la bomba: requisitos obligatorios

La seguridad tiene prioridad sobre conveniencia.

Implementa:

- `maxPumpRuntimeSeconds` obligatorio.
- Apagado automático local en ESP32 si se supera el tiempo máximo.
- Cooldown configurable.
- Protección ante comandos duplicados.
- `commandId` idempotente.
- Estado por defecto de bomba = OFF después de reinicio.
- Si se pierde Wi-Fi/MQTT, la bomba no debe quedar encendida indefinidamente.
- Watchdog cuando sea viable.
- El backend no debe poder ordenar un encendido ilimitado.
- Registrar quién/qué originó cada riego: `MANUAL`, `AUTO_RULE`, `SAFETY_STOP`, etc.

En hardware, nunca alimentar una bomba directamente desde un GPIO del microcontrolador. Usar relé/MOSFET/driver, fuente adecuada y protección eléctrica según el circuito real.

---

## 7. Modelo de datos base

Diseña inicialmente estas entidades:

### User
- id UUID
- name
- email unique
- passwordHash
- role
- createdAt
- updatedAt

### Device
- id UUID
- deviceKey unique
- name
- description nullable
- locationLabel nullable
- status
- mode (`MANUAL`, `AUTO`)
- lastSeenAt nullable
- firmwareVersion nullable
- createdAt
- updatedAt

### SensorCalibration
- id UUID
- deviceId
- sensorType
- rawDry
- rawWet
- minValid nullable
- maxValid nullable
- updatedAt

### Telemetry
- id bigserial/UUID según estrategia
- deviceId
- recordedAt
- temperatureC nullable
- airHumidityPct nullable
- soilMoistureRaw nullable
- soilMoisturePct nullable
- pumpOn
- rssi nullable
- payloadVersion

Índices obligatorios:
- `(deviceId, recordedAt DESC)`
- índices adicionales según consultas reales.

### IrrigationRule
- id UUID
- deviceId
- enabled
- startBelowPct
- stopAbovePct
- maxRuntimeSeconds
- cooldownSeconds
- allowedStartTime nullable
- allowedEndTime nullable
- createdAt
- updatedAt

### PumpCommand
- id UUID
- deviceId
- requestedByUserId nullable
- origin
- action (`ON`, `OFF`)
- durationSeconds nullable
- status (`PENDING`, `SENT`, `ACKNOWLEDGED`, `FAILED`, `EXPIRED`)
- requestedAt
- acknowledgedAt nullable
- error nullable

### IrrigationEvent
- id UUID
- deviceId
- commandId nullable
- startedAt
- stoppedAt nullable
- durationSeconds nullable
- origin
- stopReason nullable

### AuditLog
- id UUID
- actorUserId nullable
- deviceId nullable
- action
- entityType
- entityId nullable
- metadata JSONB
- createdAt

No almacenar secretos MQTT en texto plano si pueden evitarse.

---

## 8. Contrato MQTT

Usa una convención estable y versionada.

### Topics

Telemetría:
`iot/v1/devices/{deviceId}/telemetry`

Estado:
`iot/v1/devices/{deviceId}/state`

Comandos:
`iot/v1/devices/{deviceId}/commands`

ACK:
`iot/v1/devices/{deviceId}/acks`

### Ejemplo de telemetría

```json
{
  "version": 1,
  "deviceId": "uuid-or-device-key",
  "timestamp": "2026-09-23T22:30:00Z",
  "temperatureC": 22.8,
  "airHumidityPct": 58.2,
  "soilMoistureRaw": 612,
  "soilMoisturePct": 41.7,
  "pumpOn": false,
  "rssi": -61
}
```

### Ejemplo de comando

```json
{
  "version": 1,
  "commandId": "uuid",
  "action": "ON",
  "maxDurationSeconds": 20,
  "issuedAt": "2026-09-23T22:31:00Z",
  "expiresAt": "2026-09-23T22:31:30Z"
}
```

### Ejemplo de ACK

```json
{
  "version": 1,
  "commandId": "uuid",
  "status": "ACKNOWLEDGED",
  "pumpOn": true,
  "timestamp": "2026-09-23T22:31:02Z"
}
```

Validar todos los payloads con schemas estrictos.

---

## 9. API REST mínima

Usar prefijo `/api/v1`.

### Auth
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

### Devices
- `GET /devices`
- `POST /devices`
- `GET /devices/:id`
- `PATCH /devices/:id`
- `DELETE /devices/:id` solo cuando corresponda y con reglas claras.

### Telemetry
- `GET /devices/:id/telemetry/latest`
- `GET /devices/:id/telemetry?from=&to=&limit=`
- Agregaciones para rangos largos cuando corresponda.

### Pump
- `POST /devices/:id/pump/on`
- `POST /devices/:id/pump/off`
- `GET /devices/:id/pump/status`

Para `pump/on`, requerir duración máxima o usar un máximo del servidor nunca superable.

### Rules
- `GET /devices/:id/rules`
- `POST /devices/:id/rules`
- `PATCH /rules/:id`
- `DELETE /rules/:id`

### Calibration
- `GET /devices/:id/calibration`
- `PUT /devices/:id/calibration`

### Health
- `GET /health`
- `GET /ready`

Todos los endpoints deben documentarse con OpenAPI.

---

## 10. UX/UI requerida

La interfaz debe ser profesional, clara y funcional en escritorio y móvil.

### Pantallas
1. Login.
2. Dashboard general.
3. Detalle de dispositivo.
4. Historial y gráficos.
5. Configuración de reglas automáticas.
6. Calibración de sensor.
7. Gestión de dispositivos.
8. Auditoría básica para admin.

### Dashboard
Usar cards para:
- Temperatura.
- Humedad ambiental.
- Humedad del suelo.
- Bomba.
- Conectividad.

El estado visual debe acompañarse siempre de texto/iconos; no depender solo del color.

Mostrar claramente:
- `Datos actualizados hace X s/min`.
- Advertencia si la lectura está obsoleta.
- Confirmación explícita para acciones sensibles.

---

## 11. Reglas de calidad de código

Obligatorias:

- TypeScript `strict`.
- Nada de `any` salvo justificación excepcional.
- ESLint + formatter.
- Nombres en inglés para código; textos UI pueden estar en español.
- Separar dominio, infraestructura y presentación razonablemente.
- Servicios pequeños y testeables.
- No duplicar lógica de validación crítica.
- Errores tipados y respuestas HTTP consistentes.
- No loggear contraseñas, tokens ni secretos.
- Variables de entorno validadas con schema.
- Evitar lógica de negocio importante dentro de controladores o componentes UI.
- Mantener migraciones en el repositorio.

---

## 12. Seguridad de aplicación

Implementar como mínimo:

- Hash de contraseñas con Argon2 o equivalente moderno.
- Protección CSRF si la estrategia de sesión lo requiere.
- Cookies `HttpOnly`, `Secure`, `SameSite` cuando aplique.
- CORS restrictivo.
- Rate limiting especialmente en auth y comandos.
- Autorización por recurso.
- Sanitización/validación de entrada.
- Helmet/cabeceras de seguridad equivalentes.
- Secretos fuera del repositorio.
- `.env.example` sin secretos reales.
- Rotación/revocación de credenciales de dispositivo.
- TTL/expiración de comandos.
- Auditoría de acciones críticas.

---

## 13. Tiempo real

Para la web, preferir una de estas estrategias:

1. **SSE** para telemetría y estado si el flujo principal es servidor -> cliente.
2. WebSocket si se requiere interacción bidireccional persistente más compleja.

No consultar la base de datos cada segundo desde el navegador.

La telemetría puede persistirse a una frecuencia configurable para no saturar la DB.

---

## 14. Automatización de riego

La evaluación de reglas debe:

1. Verificar que la regla esté activa.
2. Verificar dispositivo online.
3. Verificar frescura de la última telemetría.
4. Verificar calibración válida.
5. Verificar cooldown.
6. Verificar horario permitido.
7. Aplicar histéresis:
   - encender bajo `startBelowPct`.
   - apagar sobre `stopAbovePct`.
8. Aplicar tiempo máximo de seguridad.
9. Generar `PumpCommand` y `IrrigationEvent`.
10. Registrar auditoría.

Evitar oscilaciones rápidas ON/OFF.

---

## 15. Firmware ESP32

El firmware debe organizarse en módulos:

- `wifi_manager`
- `mqtt_client`
- `sensor_dht22`
- `sensor_soil`
- `pump_controller`
- `config`
- `main`

Características mínimas:

- Reconexión Wi-Fi con backoff.
- Reconexión MQTT con backoff.
- Client ID único.
- Telemetría periódica configurable.
- Validación de comandos.
- Ignorar comandos expirados.
- Idempotencia por `commandId`.
- Timeout local de bomba.
- Publicación de ACK.
- Estado retained solo cuando sea correcto semánticamente.
- Watchdog si el framework lo permite.

No bloquear el loop con delays prolongados; usar temporizadores/millis o tareas apropiadas.

---

## 16. Pruebas obligatorias

### Backend
- Unit tests para calibración.
- Unit tests para reglas de riego.
- Unit tests para timeout/cooldown.
- Tests de autorización.
- Integration tests de API + DB.
- Test de procesamiento de mensaje MQTT.

### Frontend
- Tests de componentes críticos.
- Tests de estados loading/error/offline.
- E2E para:
  - login;
  - abrir dispositivo;
  - visualizar telemetría;
  - enviar ON/OFF;
  - editar regla.

### Firmware
- Probar funciones puras de conversión/calibración cuando el entorno lo permita.
- Simular pérdida de MQTT.
- Confirmar que el timeout apaga la bomba.

---

## 17. Observabilidad

Incluir:

- Logs estructurados.
- Correlation/request ID en backend.
- Métricas mínimas: requests, errores, dispositivos online, mensajes MQTT, comandos fallidos.
- Health checks.
- Manejo de excepciones centralizado.
- Timestamps en UTC en backend y DB; convertir a zona local solo en UI.

---

## 18. Entorno de desarrollo

El proyecto debe iniciar idealmente con:

```bash
docker compose up -d
npm install
npm run dev
```

O con un monorepo:

```bash
pnpm install
pnpm dev
```

Estructura recomendada:

```text
smart-irrigation/
├─ apps/
│  ├─ web/
│  └─ api/
├─ packages/
│  ├─ shared/
│  └─ config/
├─ firmware/
│  └─ esp32/
├─ infra/
│  ├─ mosquitto/
│  └─ docker/
├─ docs/
├─ docker-compose.yml
├─ .env.example
└─ README.md
```

---

## 19. CI/CD

En cada pull request ejecutar:

1. install reproducible.
2. lint.
3. typecheck.
4. unit tests.
5. integration tests razonables.
6. build frontend.
7. build backend.

En despliegue:
- ejecutar migraciones de forma controlada;
- health check antes de marcar release saludable;
- rollback documentado.

---

## 20. Estrategia de implementación por fases

Cuando recibas la orden de construir el sistema, trabaja en este orden:

### Fase 0 — Descubrimiento
Antes de escribir mucho código, confirmar únicamente los bloqueos reales:
- ESP32 exacto o microcontrolador usado.
- Sensor de humedad exacto y rango ADC real.
- Si el proyecto debe funcionar solo en LAN o desde Internet.
- Hosting objetivo si ya está definido.

Si el usuario no sabe, usar los defaults de esta skill y continuar.

### Fase 1 — Base del repositorio
- monorepo;
- lint/format/typecheck;
- Docker Compose;
- PostgreSQL;
- Mosquitto;
- `.env.example`;
- README inicial.

### Fase 2 — Backend + DB
- schema Prisma;
- migración inicial;
- auth;
- dispositivos;
- telemetría;
- MQTT consumer;
- OpenAPI.

### Fase 3 — Firmware
- sensores;
- MQTT;
- telemetría;
- bomba;
- ACK;
- timeout de seguridad.

### Fase 4 — Web
- auth;
- dashboard;
- detalle;
- históricos;
- control manual.

### Fase 5 — Automatización
- reglas;
- histéresis;
- cooldown;
- eventos;
- auditoría.

### Fase 6 — Calidad
- tests;
- E2E;
- observabilidad;
- endurecimiento de seguridad.

### Fase 7 — Despliegue
- producción;
- TLS;
- backups;
- monitoreo;
- manual de instalación.

No avanzar a una fase compleja dejando errores conocidos críticos en la anterior.

---

## 21. Definition of Done

Una feature se considera terminada solo si:

- cumple el requisito funcional;
- está validada en frontend y backend;
- tiene manejo de errores;
- respeta autorización;
- tiene tests relevantes;
- no introduce errores de lint/typecheck;
- está documentada si expone API/configuración;
- contempla estados vacíos/loading/error;
- no filtra secretos;
- los comandos de bomba contemplan seguridad e idempotencia.

---

## 22. Entregables finales obligatorios

Al finalizar el proyecto, entregar:

- Código fuente completo.
- Firmware ESP32.
- `README.md` con setup paso a paso.
- `.env.example`.
- Docker Compose.
- Migraciones DB.
- Diagrama de arquitectura.
- Diagrama entidad-relación.
- Especificación MQTT.
- OpenAPI/Swagger.
- Colección de pruebas de API opcional.
- Suite de tests.
- Credenciales de demo solo como seeds y nunca reutilizadas en producción.
- Manual de calibración del sensor de suelo.
- Manual de conexión física segura de la bomba a nivel conceptual.
- Guía de despliegue y backups.

---

## 23. Comportamiento esperado del agente

Cuando desarrolles usando esta skill:

- No inventes que algo fue probado si no fue ejecutado.
- Ejecuta tests, lint y typecheck cuando tengas herramientas disponibles.
- Corrige los errores antes de declarar una tarea terminada.
- Explica decisiones arquitectónicas importantes en pocas líneas.
- Prioriza código funcional sobre pseudocódigo.
- Si falta un detalle no crítico, elige una opción razonable y documenta la suposición.
- Pregunta solo cuando una decisión sea realmente bloqueante o tenga impacto físico/económico importante.
- Mantén una lista breve de tareas y actualízala durante implementaciones largas.
- Entrega cambios en unidades pequeñas y coherentes.
- No reemplaces seguridad por rapidez, especialmente en el control de la bomba.

---

## 24. Criterios de aceptación del sistema completo

El sistema se acepta cuando puede demostrar de extremo a extremo:

1. Un ESP32 publica una lectura válida.
2. El backend recibe y persiste la lectura.
3. La web muestra el dato reciente.
4. La web muestra histórico.
5. Un usuario autorizado envía `ON`.
6. El backend crea el comando y lo publica por MQTT.
7. El dispositivo ejecuta el comando dentro de límites seguros.
8. El dispositivo envía ACK/estado.
9. La web refleja el estado confirmado.
10. El timeout de seguridad apaga la bomba.
11. Una regla automática puede iniciar y detener riego con histéresis/cooldown.
12. Todo evento crítico queda auditado.
13. La solución reinicia sin dejar la bomba en un estado inseguro.
14. Tests principales, lint, typecheck y builds pasan.
15. El proyecto puede levantarse siguiendo únicamente la documentación del repositorio.

---

## 25. Primer comando recomendado al usar esta skill

Cuando el usuario diga “comienza el proyecto”, responde con:

1. resumen de arquitectura elegida;
2. supuestos adoptados;
3. árbol inicial del monorepo;
4. plan de implementación por fases;
5. inmediatamente después, comienza a generar el proyecto base ejecutable, evitando quedarse solo en planificación.

