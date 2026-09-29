# Diagrama de Entidad-Relación (Base de Datos MySQL)

Este archivo contiene la representación visual de la base de datos MySQL para la versión simplificada del proyecto.
Puedes visualizarlo directamente en GitHub o usando una extensión de Markdown.

```mermaid
erDiagram
    Device ||--o{ Telemetry : "genera"

    Device {
        string id PK "uuid"
        string deviceKey UK
        string name
        string status
        boolean pumpOn
        dateTime lastSeenAt
        dateTime createdAt
        dateTime updatedAt
    }

    Telemetry {
        int id PK "autoincrement"
        string deviceId FK
        dateTime recordedAt
        float temperatureC
        float airHumidityPct
        int soilMoistureRaw
        float soilMoisturePct
        boolean pumpOn
    }
```
