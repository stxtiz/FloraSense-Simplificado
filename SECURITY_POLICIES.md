# Políticas de Seguridad de la Información - FloraSense IoT (Simplificado)

Este documento establece las directrices de seguridad para el desarrollo y operación de la plataforma **FloraSense IoT**, alineándose con los estándares internacionales de seguridad.

## 1. Alineación Normativa
- **OWASP Top 10 (2021)**: Prevención de los 10 riesgos de seguridad más críticos en aplicaciones web.
- **OWASP ASVS 5.0**: Estándar de Verificación de Seguridad de Aplicaciones (Nivel 2 - IoT básico).

---

## 2. Controles de Seguridad Aplicados

### 2.1. Criptografía y Manejo de Secretos
- **Protección de Datos en Tránsito**: (Requisito para Producción) Todo el tráfico HTTP hacia los endpoints de Next.js (`/api/telemetry`) debe encapsularse sobre TLS 1.3 (HTTPS).
- **Protección de Credenciales**: Las variables de entorno de base de datos y demás secretos (`DATABASE_URL`) no se comitearán al control de versiones.

### 2.2. Control de Accesos IoT (Device Security)
- **Identificación de Dispositivos**: Cada microcontrolador (ESP8266) requiere de un identificador único en el sistema (`deviceId` / `deviceKey`). El servidor (Next.js API) actualizará e insertará datos referenciando este identificador único en el registro de telemetría, mitigando la mezcla de datos o el spoofing básico de dispositivos no registrados si se agregan validaciones adicionales a nivel de código de autorización.

---

## 3. Directrices de Desarrollo Seguro (OWASP Top 10)

1. **A03:2021 - Injection**: El uso de **Prisma ORM** sanitiza automáticamente todas las consultas a la base de datos MySQL, previniendo inyección SQL. Los parámetros recibidos vía JSON HTTP Body (`req.json()`) son validados de manera explícita en Prisma.
2. **A01:2021 - Broken Access Control**: (Pendiente de implementación en versión simplificada) Se recomienda agregar un token estático de API en los Headers (`Authorization: Bearer <token>`) en las llamadas HTTP POST desde el ESP8266 para evitar que endpoints públicos como `/api/telemetry` sean abusados.
3. **A09:2021 - Security Logging and Monitoring Failures**: El backend registra cualquier error de base de datos en los logs estándar de Node/Next.js y lleva el histórico de los comandos de la bomba mediante las marcas de tiempo inmutables de telemetría en MySQL.
