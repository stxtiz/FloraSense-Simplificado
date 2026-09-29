# Guía Completa de Instalación: FloraSense Simplificado 🌿

Esta guía te llevará paso a paso para armar el hardware (conexiones de cables) y levantar el software (frontend y backend unificados).

---

## PARTE 1: Conexiones Físicas (Hardware)

### Materiales Necesarios
*   **Microcontrolador:** ESP8266 NodeMCU.
*   **Sensores:** 
    * Módulo de Suelo YL-69 (sondas) + YL-38 (comparador).
    * Sensor Ambiental DHT22 o DHT11.
*   **Actuador:** Módulo Relé de 1 canal (5V).
*   **Bomba de Agua:** Micro-bomba sumergible de 5V.
*   **Energía:** Cable Micro-USB para el NodeMCU y fuente de 5V (puede ser el mismo USB si la bomba es pequeña, pero se recomienda fuente externa).
*   **Cables:** Jumpers (Macho-Hembra, Hembra-Hembra).

### Paso a paso del cableado

#### 1. Sensor de Humedad de Suelo (YL-38 + YL-69)
1. Conecta las dos sondas de metal (YL-69) a los dos pines de un lado del módulo pequeño (YL-38) usando dos cables jumper.
2. Del otro lado del módulo YL-38, conecta los siguientes pines al **ESP8266 NodeMCU**:
   - **VCC:** Conéctalo al pin `3V3` del NodeMCU.
   - **GND:** Conéctalo a un pin `GND` del NodeMCU.
   - **A0 (Analógico):** Conéctalo al pin `A0` del NodeMCU.

#### 2. Sensor de Temperatura y Humedad Ambiente (DHT22/DHT11)
Si tu sensor viene en un pequeño módulo (placa) con 3 pines:
1. **VCC:** Conéctalo a `3V3` del NodeMCU.
2. **DATA (Datos):** Conéctalo al pin `D2` (GPIO4) del NodeMCU.
3. **GND:** Conéctalo a `GND` del NodeMCU.

#### 3. Módulo de Relé (Para controlar la bomba)
El relé actúa como un interruptor electrónico.
1. **VCC:** Conéctalo al pin `VIN` (o `VU` / `5V`) del NodeMCU.
2. **GND:** Conéctalo a `GND`.
3. **IN / SIGNAL:** Conéctalo al pin `D1` (GPIO5) del NodeMCU.

#### 4. Circuito de la Bomba de Agua (Sin Módulo Relé)
Si **NO tienes un módulo de relé**, **NUNCA conectes la bomba directamente a los pines del NodeMCU**, porque quemarás la placa por exceso de corriente. Tienes dos alternativas:

**Alternativa A: Usar un Transistor (TIP120, 2N2222 o MOSFET) + Diodo**
1. **Pin D1 (GPIO5)** del NodeMCU se conecta a través de una resistencia (ej. 330Ω o 1kΩ) a la Base/Gate del transistor.
2. El Emisor/Source del transistor va a **GND**.
3. El Colector/Drain del transistor se conecta al **cable negativo (GND)** de la bomba.
4. El **cable positivo (VCC)** de la bomba va directo a los +5V de tu fuente de poder externa.
5. *(Muy Importante)*: Coloca un diodo rectificador (ej. 1N4007) en paralelo con los cables de la bomba (la rayita del diodo mirando hacia el positivo) para proteger el circuito.

**Alternativa B: Usar un LED (Para simular la bomba y probar el software)**
Si solo quieres probar que tu código y tu dashboard funcionan, usa un LED como indicador visual:
1. Conecta el pin largo del LED (Ánodo) al pin **D1 (GPIO5)** del NodeMCU.
2. Conecta una resistencia de 220Ω o 330Ω al pin corto del LED (Cátodo).
3. Conecta el otro extremo de la resistencia a **GND** del NodeMCU.
*Cuando el dashboard mande encender el "riego", el LED se encenderá.*

---

## PARTE 2: Levantar el Servidor (Frontend y Backend)

Gracias a la arquitectura simplificada, **el Frontend (React) y el Backend (APIs) corren en el mismo proyecto Next.js**, y usan MySQL como base de datos. Todo está orquestado por Docker, por lo que **no necesitas instalar Node.js ni bases de datos en tu computadora**.

### Paso a paso

**Paso 1: Instalar Docker**
Asegúrate de tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/) en tu PC y de que esté abierto/corriendo.

**Paso 2: Abrir la terminal en el proyecto**
Abre una terminal (PowerShell, CMD, o la de VSCode) en la carpeta del proyecto `FloraSense-IoT`.

**Paso 3: Levantar los contenedores**
Ejecuta el siguiente comando. Esto descargará MySQL, preparará el entorno de Node.js, instalará los paquetes internamente, creará las tablas de la base de datos y arrancará el servidor web:
```bash
docker-compose up --build
```

**Paso 4: Esperar la inicialización**
Verás muchos textos en la terminal. Deberás esperar a que veas mensajes similares a:
- `Ready in Xms`
- `✓ Ready in Xms` (de Next.js indicando que compiló con éxito).

**Paso 5: Acceder al Dashboard**
Abre tu navegador de internet y entra a:
👉 **[http://localhost:3000](http://localhost:3000)**

Ahí verás el panel de FloraSense funcionando y conectado a la base de datos MySQL local.

### ¿Qué hacer si quieres detener el servidor?
Simplemente ve a la terminal donde corriste el comando y presiona `Ctrl + C`.
Para borrar los contenedores completamente (sin borrar los datos de la BD), puedes ejecutar `docker-compose down`.

---

## PARTE 3: Cargar el código al ESP8266

1. Abre el programa **Arduino IDE**.
2. Instala las librerías necesarias desde el Gestor de Librerías: `ArduinoJson`.
3. Abre el archivo ubicado en `firmware/esp8266_florasense/esp8266_florasense.ino`.
4. Modifica las variables de arriba:
   - `TU_RED_WIFI`: El nombre de tu WiFi.
   - `TU_PASSWORD_WIFI`: La contraseña de tu WiFi.
   - `IP_DE_TU_PC_CON_DOCKER`: La dirección IP local de tu computadora (Ejemplo: `192.168.1.15`).
5. Conecta tu ESP8266 por USB, selecciona la placa "NodeMCU 1.0 (ESP-12E Module)" y presiona el botón **Subir**.
