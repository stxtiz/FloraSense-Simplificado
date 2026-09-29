# FloraSense - Smart Irrigation IoT (Versión Simplificada) 🌿💧

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)
![Prisma](https://img.shields.io/badge/Prisma-5-2d3748?logo=prisma)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ed?logo=docker)
![C++](https://img.shields.io/badge/Firmware-C%2B%2B-00599C?logo=c%2B%2B)

**FloraSense** es una plataforma para la monitorización ambiental y el control de sistemas de riego. Conecta microcontroladores físicos con una interfaz web en tiempo real utilizando Next.js API Routes y MySQL.

Esta **versión simplificada** utiliza una arquitectura de monolito Next.js y comunicación HTTP directa con el ESP8266, eliminando la complejidad de MQTT y microservicios.

---

## ✨ Características Principales

*   **Telemetría Inteligente:** Monitorización de temperatura, humedad del aire y nivel de humedad del suelo vía HTTP.
*   **Control Remoto de Riego:** Sistema de riego manual desde el dashboard web con almacenamiento de estado en MySQL.
*   **Arquitectura Simplificada:** Un único proyecto Next.js (`apps/web`) maneja tanto la interfaz gráfica (React) como los endpoints API.
*   **Despliegue Contenerizado:** Infraestructura "plug-and-play" orquestada 100% con Docker Compose (Base de datos MySQL y la aplicación Web Node.js).

---

## 🏗️ Arquitectura del Sistema (Simplificada)

```mermaid
graph TD
    subgraph Hardware Edge [Microcontroladores ESP8266]
        A[Sensor Suelo YL-69] -->|ADC| B(Core ESP8266)
        C[Sensor Ambiente DHT22] -->|Digital| B
        B -->|Señal D| D[Módulo de Relé]
        D --> E((Bomba de Agua))
    end

    subgraph Servidor Web [Next.js Monolito]
        B <-->|HTTP POST JSON| F[API Routes /api/telemetry]
        F -->|Prisma ORM| H[(MySQL)]
        I[Dashboard React] <-->|Server Actions / API| F
    end
```

---

## 📂 Estructura del Repositorio

El proyecto está estructurado de la siguiente forma:

```text
FloraSense-IoT/
├── apps/
│   └── web/                # Aplicación Web (Next.js 14, TailwindCSS, Recharts, Prisma)
│       └── prisma/         # Esquema de base de datos MySQL (`schema.prisma`)
├── firmware/
│   ├── esp8266_florasense/ # Código fuente nativo (C/C++) para hardware real ESP8266
│   └── simulator/          # Hardware simulado en NodeJS
├── docker-compose.yml      # Definición de contenedores (MySQL y Web)
└── conexiones_cables.md    # Esquema y diagrama de conexión de hardware
```

---

## 🚀 Entorno de Desarrollo Local

### Prerrequisitos
*   [Docker](https://www.docker.com/) y Docker Compose instalados.

### Inicialización Rápida (Quickstart)

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/stxtiz/FloraSense-Simplificado.git
    cd FloraSense-Simplificado
    ```

2.  **Levantar la Infraestructura:**
    Con Docker Compose se levanta MySQL y se compila el servidor Next.js automáticamente:
    ```bash
    docker-compose up --build
    ```
    > El panel web y la API estarán disponibles en `http://localhost:3000`.

---

## 🛠️ Lista de Materiales de Hardware (BOM)

| Componente | Función Principal | Cantidad |
| :--- | :--- | :---: |
| **ESP8266 NodeMCU** | Cerebro con conectividad WiFi 2.4GHz nativa. | 1 |
| **DHT22 / AM2302** | Termohigrómetro de precisión para el ambiente. | 1 |
| **YL-69 + YL-38** | Sonda resistiva/capacitiva anticorrosión para suelo. | 1 |
| **Módulo Relé (5V)** | Interruptor electromagnético para control de la bomba. | 1 |
| **Micro-bomba sumergible** | Actuador hidráulico de 5V - 12V DC. | 1 |

*Revisa el archivo `conexiones_cables.md` en la raíz del proyecto para ver el diagrama de pines.*

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.
