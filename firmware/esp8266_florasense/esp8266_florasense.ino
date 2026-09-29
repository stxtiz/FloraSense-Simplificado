#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

// ==========================================
// CONFIGURACIÓN DE RED Y HTTP
// ==========================================
const char* ssid = "TU_RED_WIFI";
const char* password = "TU_PASSWORD_WIFI";

// Dirección IP local de tu computadora ejecutando Docker (ej: 192.168.1.50)
const String SERVER_URL = "http://IP_DE_TU_PC_CON_DOCKER:3000/api/telemetry"; 

const char* DEVICE_ID = "123e4567-e89b-12d3-a456-426614174000";

// ==========================================
// CONFIGURACIÓN DE HARDWARE (PINES ESP8266)
// ==========================================
const int SOIL_MOISTURE_PIN = A0;
const int PUMP_PIN = 5; // D1

#define DHTPIN 4 // D2
#define DHTTYPE DHT22 // O cambiar a DHT11 si usas ese modelo
DHT dht(DHTPIN, DHTTYPE);

const int DRY_VALUE = 1023; 
const int WET_VALUE = 300;  

// ==========================================
// VARIABLES GLOBALES
// ==========================================
unsigned long lastMsg = 0;
bool isPumpOn = false;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi conectado!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void sendTelemetryAndReceiveCommands() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    int rawValue = analogRead(SOIL_MOISTURE_PIN);
    // IMPORTANTE: Asegúrate de que el sensor A0 esté leyendo correctamente
    int pct = map(rawValue, DRY_VALUE, WET_VALUE, 0, 100);
    pct = constrain(pct, 0, 100);

    // Leer DHT
    float h = dht.readHumidity();
    float t = dht.readTemperature();

    // Si falla la lectura, enviamos 0 o el último valor (aquí 0 por simplicidad)
    if (isnan(h) || isnan(t)) {
      Serial.println("Fallo al leer del sensor DHT!");
      h = 0;
      t = 0;
    }

    StaticJsonDocument<256> doc;
    doc["deviceId"] = DEVICE_ID;
    doc["temperatureC"] = t; 
    doc["airHumidityPct"] = h;
    doc["soilMoistureRaw"] = rawValue;
    doc["soilMoisturePct"] = (float)pct;
    doc["pumpOn"] = isPumpOn;

    char jsonBuffer[256];
    serializeJson(doc, jsonBuffer);

    Serial.print("Enviando POST a ");
    Serial.println(SERVER_URL);
    Serial.println(jsonBuffer);

    int httpResponseCode = http.POST(jsonBuffer);

    if (httpResponseCode > 0) {
      Serial.print("Código de respuesta HTTP: ");
      Serial.println(httpResponseCode);
      String response = http.getString();
      Serial.println("Respuesta del servidor: ");
      Serial.println(response);

      StaticJsonDocument<256> respDoc;
      DeserializationError error = deserializeJson(respDoc, response);

      if (!error) {
        if (respDoc.containsKey("pumpOn")) {
          bool shouldPumpBeOn = respDoc["pumpOn"];
          if (shouldPumpBeOn && !isPumpOn) {
            digitalWrite(PUMP_PIN, HIGH);
            isPumpOn = true;
            Serial.println("[BOMBA ENCENDIDA]");
          } else if (!shouldPumpBeOn && isPumpOn) {
            digitalWrite(PUMP_PIN, LOW);
            isPumpOn = false;
            Serial.println("[BOMBA APAGADA]");
          }
        }
      } else {
        Serial.println("Error parseando respuesta JSON");
      }
    } else {
      Serial.print("Error en la petición HTTP: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("Error: WiFi no conectado");
  }
}

void setup() {
  pinMode(PUMP_PIN, OUTPUT);
  digitalWrite(PUMP_PIN, LOW); 
  
  Serial.begin(115200);
  setup_wifi();
  dht.begin();
}

void loop() {
  unsigned long now = millis();
  if (now - lastMsg > 10000) {
    lastMsg = now;
    sendTelemetryAndReceiveCommands();
  }
}
