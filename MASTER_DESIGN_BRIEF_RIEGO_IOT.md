---
name: ui-ux-masterpiece-smart-irrigation
version: 1.0.0
language: es
purpose: Dirección creativa, UX/UI y frontend visual para una aplicación web IoT de riego inteligente. Diseñada para producir una interfaz original, memorable, premium y no genérica.
---

# MASTER DESIGN BRIEF — Aplicación Web de Riego Inteligente

## 0. Cómo usar este documento

Este archivo debe entregarse a la IA **junto con la especificación funcional/técnica del proyecto**.

Si existe otro documento que define backend, base de datos, MQTT, ESP32, reglas de negocio o seguridad, ese documento manda sobre la lógica del sistema.  
**Este documento manda sobre la experiencia visual, UX, diseño de interfaz, interacción, composición y calidad percibida del frontend.**

La misión no es crear “otro dashboard de SaaS”. La misión es diseñar una aplicación que, al verla, se sienta creada específicamente para un sistema vivo de riego, sensores, agua, suelo y clima.

---

# 1. Rol de la IA

Actúa simultáneamente como:

- Director/a de arte digital.
- Product Designer senior.
- UX Designer senior.
- Frontend Engineer senior.
- Motion Designer.
- Data Visualization Designer.
- Especialista en accesibilidad.
- Especialista en diseño responsive.
- Diseñador/a de sistemas de diseño.

No te limites a montar componentes estándar.  
Debes tomar decisiones visuales deliberadas, coherentes y específicas para el dominio.

La aplicación debe ser:

- Visualmente memorable.
- Profesional.
- Elegante.
- Moderna.
- Calmante.
- Tecnológica sin parecer “cyberpunk”.
- Orgánica sin parecer una tienda de plantas.
- Premium sin ser ostentosa.
- Clara para usuarios no técnicos.
- Útil para monitoreo real.
- Atractiva tanto en escritorio como en móvil.

---

# 2. Objetivo creativo principal

Crear una interfaz que represente el concepto:

> **“Un sistema vivo entre tierra, agua y datos.”**

La experiencia debe comunicar que el usuario no está “administrando tablas”, sino **observando el pulso de un entorno vivo**.

La aplicación debe sentirse como la intersección entre:

- laboratorio ambiental,
- instrumento de precisión,
- jardín inteligente,
- cartografía,
- estación meteorológica,
- interfaz editorial contemporánea.

Evita copiar directamente la estética de:

- Vercel,
- Stripe,
- Linear,
- Notion,
- shadcn demo,
- dashboards Bootstrap,
- paneles de administración genéricos,
- aplicaciones crypto,
- plantillas SaaS,
- interfaces llenas de tarjetas idénticas.

---

# 3. Regla anti-genérico — OBLIGATORIA

Antes de implementar cualquier pantalla, verifica estas prohibiciones.

## NO hacer

No construir:

- una cuadrícula de 4 tarjetas KPI iguales;
- sidebar negra + contenido blanco + cards redondeadas genéricas;
- gradiente azul-violeta como identidad principal;
- “glassmorphism” sin propósito;
- fondos con blobs abstractos aleatorios;
- iconos gigantes dentro de círculos de colores;
- sombras excesivas;
- bordes redondeados en absolutamente todo;
- títulos como “Welcome back, User 👋”;
- una landing page genérica con “Transforma tu negocio”;
- componentes copiados visualmente de un template de administración;
- indicadores que dependan solo de verde/rojo;
- gráficas sin narrativa ni contexto;
- números gigantes sin explicar qué significan;
- emojis como sustituto de diseño;
- ilustraciones stock de plantas;
- plantas 3D genéricas flotando;
- animaciones decorativas que dificulten leer datos.

## SÍ hacer

Crear una composición con:

- jerarquía editorial;
- ritmos asimétricos controlados;
- zonas amplias de respiración;
- datos integrados dentro de la composición;
- gráficos protagonistas;
- navegación discreta;
- información contextual;
- estados del sistema legibles en un vistazo;
- texturas, líneas o patrones extremadamente sutiles inspirados en topografía, humedad o riego;
- elementos visuales que tengan significado funcional.

---

# 4. Concepto visual: “FIELD INSTRUMENT / TIERRA VIVA”

La identidad visual debe partir de cuatro capas conceptuales:

### Capa 1 — Tierra
Sensación táctil, estable, cálida y natural.

### Capa 2 — Agua
Movimiento, frescura, continuidad y precisión.

### Capa 3 — Datos
Tipografía mono para valores, mediciones rigurosas y estructuras técnicas.

### Capa 4 — Vida
Pequeños movimientos, cambios de estado, crecimiento y respiración visual.

La UI no debe ser literalmente “una planta”.  
Debe evocar el ecosistema mediante ritmo, materialidad, color, curvas, datos y microinteracciones.

---

# 5. Dirección estética

## Estilo general

Usar una estética:

**Editorial + Instrumentación científica + Naturaleza abstracta**

La interfaz debe combinar:

- paneles amplios;
- tipografía expresiva;
- datos precisos;
- separadores finos;
- formas suaves inspiradas en curvas de nivel;
- secciones con fondos ligeramente diferenciados;
- mucho espacio negativo;
- contraste fuerte en puntos clave;
- microdetalles de precisión.

## Sensación que debe transmitir

Cuando alguien abra la aplicación debe pensar:

> “Esto parece diseñado específicamente para monitorear un entorno real.”

No debe pensar:

> “Esto parece una plantilla de dashboard.”

---

# 6. Paleta cromática

Usar colores inspirados en suelo, agua, vegetación y papel técnico.

## Paleta base sugerida

```css
:root {
  --ink: #16201B;
  --ink-soft: #46534B;

  --canvas: #F4F1E8;
  --canvas-elevated: #FAF8F2;
  --canvas-muted: #EAE5D9;

  --moss: #395846;
  --moss-bright: #6D8F72;

  --water: #2D7F82;
  --water-soft: #87B9B4;

  --clay: #A86443;
  --sand: #D7C5A3;

  --warning: #BC7A35;
  --danger: #A14C43;

  --line: rgba(22, 32, 27, 0.14);
  --line-strong: rgba(22, 32, 27, 0.28);
}
```

Estos valores son una base, no una cárcel.  
Ajustarlos cuando sea necesario para contraste y accesibilidad.

## Regla cromática

No usar el verde como color universal de “todo está bien”.

Asignar significado:

- agua / humedad → tonos mineral-aqua;
- vegetación / sistema saludable → musgo;
- suelo / calibración → arcilla;
- atención → ámbar terroso;
- error / riesgo → rojo mineral.

El color debe comunicar semántica, no decoración.

---

# 7. Modo oscuro

Crear un modo oscuro real, no simplemente invertir colores.

Referencia conceptual:

- invernadero nocturno,
- tablero de instrumentación,
- tierra húmeda,
- agua bajo luz tenue.

Ejemplo de base:

```css
[data-theme="dark"] {
  --ink: #EAEDE7;
  --ink-soft: #AAB4AC;

  --canvas: #101713;
  --canvas-elevated: #17201B;
  --canvas-muted: #1C2821;

  --moss: #89A98E;
  --moss-bright: #B3CFB4;

  --water: #67B4B6;
  --water-soft: #386F70;

  --clay: #D08A64;
  --sand: #A98F68;

  --line: rgba(234, 237, 231, 0.11);
  --line-strong: rgba(234, 237, 231, 0.22);
}
```

---

# 8. Tipografía

La tipografía debe ayudar a distinguir:

- narrativa,
- navegación,
- telemetría.

## Stack sugerido

### Display / títulos
**Instrument Serif**

Uso limitado para:

- título principal,
- nombres destacados,
- frases cortas,
- ciertos encabezados editoriales.

### UI / cuerpo
**Manrope**

Uso para:

- navegación,
- labels,
- botones,
- textos,
- formularios.

### Datos
**IBM Plex Mono**

Uso para:

- temperatura,
- porcentaje,
- ADC,
- timestamps,
- firmware,
- commandId,
- estados técnicos.

## Regla

No usar la serif para todo.  
El contraste tipográfico debe sentirse intencional:

```text
Editorial     → Instrument Serif
Interfaz      → Manrope
Instrumentos  → IBM Plex Mono
```

---

# 9. Geometría y ritmo

## Bordes

Usar tres niveles:

```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 28px;
```

No colocar `border-radius: 24px` en todos los elementos.

Las zonas principales pueden tener esquinas grandes.  
Los instrumentos internos deben ser más precisos.

## Líneas

Preferir:

- divisores de 1px;
- líneas parciales;
- reglas editoriales;
- grillas visibles muy sutilmente;
- contornos ligeros.

Evitar sombras como mecanismo principal de separación.

---

# 10. Firma visual propia

La aplicación necesita al menos **tres recursos visuales exclusivos** que se repitan con coherencia.

Implementar:

## A. Curvas de humedad

Crear un patrón SVG propio inspirado en:

- curvas topográficas,
- ondas de agua,
- mapas de humedad.

Debe ser muy sutil y aparecer en lugares como:

- hero del dashboard;
- fondo de pantalla de dispositivo;
- estado vacío;
- login.

No debe interferir con la lectura.

## B. “Línea de suelo”

Usar una línea horizontal irregular muy controlada como divisor entre:

- condiciones ambientales;
- condiciones del suelo.

Puede aparecer en el dashboard principal.

Debe parecer una abstracción cartográfica, no una ilustración infantil.

## C. Pulso de riego

Cuando la bomba esté activa, mostrar un indicador animado basado en:

- ondas concéntricas;
- desplazamiento de pequeñas marcas;
- flujo continuo.

Debe ser elegante y discreto.

---

# 11. Arquitectura de la experiencia

La aplicación debe tener como mínimo:

1. Login.
2. Dashboard general.
3. Vista de dispositivo.
4. Historial / Analítica.
5. Reglas de riego.
6. Control manual.
7. Calibración de sensor.
8. Dispositivos.
9. Alertas / eventos.
10. Configuración.

No necesariamente usar una página independiente para absolutamente todo.  
Agrupar inteligentemente cuando mejore la experiencia.

---

# 12. Navegación

No usar una sidebar tradicional enorme.

## Desktop

Preferencia:

- rail lateral compacto de 72–88 px;
- nombre/logo en la parte superior;
- iconos + tooltip;
- sección actual reconocible por forma, línea o contraste;
- perfil/configuración abajo.

Al entrar a una sección compleja puede aparecer una **subnavegación contextual horizontal**.

## Tablet

Rail colapsable.

## Mobile

Navegación inferior con 4 destinos principales:

- Inicio
- Historial
- Riego
- Más

El botón de control de bomba **no debe estar permanentemente expuesto de forma peligrosa**.

---

# 13. Dashboard principal — pantalla estrella

Esta debe ser la pantalla más memorable.

## Composición

Evitar 4 KPI cards.

Crear una composición similar a un “paisaje de datos”.

### Zona superior

Mostrar:

- nombre del jardín / dispositivo;
- estado online;
- última sincronización;
- modo AUTO / MANUAL;
- pequeño control para cambiar dispositivo.

Ejemplo:

```text
Jardín Norte
En línea · datos recibidos hace 18 s                   AUTO
```

### Centro visual protagonista

Crear un módulo grande llamado conceptualmente:

**“Estado del suelo”**

Debe mostrar:

- humedad actual;
- nivel interpretado;
- posición respecto al rango objetivo;
- tendencia;
- ADC crudo secundario;
- momento de última lectura.

No mostrar solamente un círculo de progreso.

Usar una visualización propia:

```text
SECO                 ÓPTIMO                         SATURADO
──────────────────────●────────────────────────────────────
                      63%
```

La escala puede incorporar textura o segmentos orgánicos controlados.

### Clima ambiental

Temperatura y humedad ambiente deben sentirse como instrumentos secundarios integrados, no cards aisladas.

Ejemplo:

```text
AMBIENTE
23.6 °C
51 % HR
↑ 1.2° desde las 08:00
```

### Bomba

Crear un bloque claramente diferenciado.

Estado apagado:

```text
RIEGO
Bomba en reposo
Último ciclo: 07:42 · 28 s
```

Estado activo:

```text
RIEGO ACTIVO
00:18 / 00:30
```

Mostrar el pulso animado de riego.

### Narrativa diaria

Incluir una frase generada a partir de datos, no IA generativa obligatoria.

Ejemplos:

- “El suelo se mantiene dentro del rango objetivo desde hace 4 h 32 min.”
- “La humedad cayó 8% durante la tarde.”
- “El último riego recuperó 14 puntos de humedad.”

Esto da personalidad sin sacrificar precisión.

---

# 14. “Health strip” superior

En escritorio, debajo del header, usar una franja estrecha de sistema:

```text
ESP32 ● ONLINE   |   MQTT 42 ms   |   ÚLTIMA LECTURA 18 s   |   BOMBA OFF
```

Usar IBM Plex Mono.

Debe parecer instrumentación real.

---

# 15. Vista de dispositivo

La página de un dispositivo debe parecer una ficha técnica viva.

Encabezado:

```text
ESP32 · JARDÍN NORTE
node-7f3a
```

Mostrar:

- estado;
- firmware;
- Wi-Fi/RSSI si existe;
- última conexión;
- sensor DHT22;
- sensor de suelo;
- bomba;
- modo;
- calibración activa.

Combinar información técnica con telemetría.

No esconder los datos técnicos importantes detrás de cinco menús.

---

# 16. Historial y gráficas

Las gráficas son parte central del diseño.

## Reglas

- No usar gráficos arcoíris.
- No mostrar leyendas gigantes.
- No agregar gridlines fuertes.
- No suavizar datos de manera que engañe.
- Tooltip preciso.
- Rango temporal visible.
- Mostrar eventos de bomba directamente sobre la serie temporal.

### Humedad de suelo

Gráfico principal:

```text
100%
 │
 │                    ╭───╮
 │       ╭──────╮     │   ╰────
 │─────── objetivo ──────────────
 │  ╭────╯
 │──┴────────────────────────────
  06h    10h    14h    18h    22h
```

Superponer:

- rango objetivo;
- eventos de riego;
- periodos sin datos;
- umbrales de automatización.

### Temperatura / HR

Permitir alternar o superponer cuidadosamente.

### Eventos de riego

Representarlos como marcas verticales delgadas, no como barras enormes.

---

# 17. Control manual de la bomba

Debe sentirse poderoso pero seguro.

Nunca usar simplemente:

```text
[ ENCENDER BOMBA ]
```

sin contexto.

Crear una interacción intencional.

## Estado inicial

Mostrar:

- bomba OFF;
- límite máximo;
- última ejecución;
- modo actual.

## Acción

El usuario selecciona duración:

```text
10 s   20 s   30 s   Personalizado
```

Luego:

**Mantener presionado para iniciar riego**

En desktop puede ser:

- press-and-hold de ~700 ms;
- feedback de progreso.

En móvil:

- press-and-hold;
- vibración si la plataforma lo permite.

Una vez iniciado, mostrar:

- contador;
- tiempo máximo;
- botón STOP de alta prioridad;
- estado “esperando ACK” si corresponde.

Nunca afirmar “Bomba encendida” hasta recibir confirmación real.

---

# 18. Reglas automáticas

No diseñarlas como una tabla CRUD genérica.

Crear reglas como bloques lógicos legibles.

Ejemplo:

```text
CUANDO
Humedad del suelo < 35%

DURANTE
al menos 2 minutos

ENTONCES
Regar durante 20 segundos

EXCEPTO
entre 22:00 y 06:00

SEGURIDAD
mínimo 15 min entre ciclos
```

El usuario debe poder entender una regla leyendo lenguaje natural.

Agregar una vista previa:

> “Con esta regla, hoy se habría activado 3 veces.”

Solo mostrar esta frase si existe data suficiente para calcularla realmente.

---

# 19. Calibración del sensor

La calibración debe ser una experiencia guiada.

No mostrar únicamente dos inputs numéricos.

Crear un flujo:

### Paso 1
Sensor en suelo seco.

Mostrar lectura en vivo.

```text
LECTURA ACTUAL
812 ADC
```

Botón:

`Usar 812 como referencia seca`

### Paso 2
Sensor en suelo húmedo/saturado.

### Paso 3
Vista previa de escala.

```text
0% ───────────────────────────── 100%
812                               278
```

### Paso 4
Guardar calibración.

Agregar ayuda para detectar una posible escala invertida.

---

# 20. Alertas

Diferenciar severidad sin depender únicamente del color.

Ejemplos:

- `INFO`
- `ATENCIÓN`
- `CRÍTICO`

Mostrar iconografía + etiqueta + texto.

Ejemplos de eventos:

- dispositivo sin conexión;
- datos obsoletos;
- suelo demasiado seco;
- suelo saturado;
- bomba excedió tiempo esperado;
- comando sin ACK;
- calibración sospechosa.

---

# 21. Login

El login debe establecer la identidad visual.

No hacer una pantalla:

```text
logo
email
password
login
```

centrada sobre fondo blanco.

## Layout sugerido desktop

50/50 o 45/55.

Lado visual:

- patrón topográfico;
- lectura ambiental ficticia claramente decorativa;
- nombre de la aplicación;
- breve frase.

Lado formulario:

minimalista y amplio.

Ejemplo de copy:

> **El agua correcta, en el momento correcto.**  
> Observa el suelo, entiende el ambiente y controla cada ciclo de riego.

Evitar marketing exagerado.

---

# 22. Nombre e identidad

Si el proyecto todavía no tiene nombre, inventar uno que:

- sea breve;
- sea recordable;
- funcione en español;
- no parezca una startup financiera;
- conecte con agua, suelo, cultivo o pulso ambiental.

Generar 5 propuestas internamente y elegir una sola antes de implementar.

No mostrar al usuario el brainstorming salvo que se solicite.

Crear también:

- wordmark tipográfico;
- símbolo simple;
- favicon.

El símbolo debe funcionar a 16 px.

No usar como logo una hoja genérica dentro de un círculo.

---

# 23. Iconografía

Usar una familia consistente, por ejemplo Lucide, pero:

- no llenar cada label de iconos;
- no depender de iconos para comprensión;
- usar iconos funcionales;
- tamaño contenido;
- stroke consistente.

Crear SVG propio solo para:

- identidad;
- patrones;
- indicadores únicos.

---

# 24. Microinteracciones

Las animaciones deben explicar estado.

## Duraciones

```text
micro feedback      120–180 ms
transición UI       180–260 ms
paneles              260–360 ms
visualización        400–700 ms
```

## Permitidas

- valores que actualizan suavemente;
- pulso cuando llegan datos;
- transición de gráficas;
- apertura de paneles;
- estado online;
- ACK de comandos;
- progreso press-and-hold;
- flujo de bomba.

## Evitar

- parallax excesivo;
- objetos flotando sin razón;
- bounce infantil;
- spring exagerado;
- animación permanente de todo.

Respetar:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 25. Estados de carga

No usar spinner central para toda la aplicación.

Implementar skeletons con la estructura real.

Para datos en vivo:

```text
63%
actualizando…
```

Si la data es antigua, no esconderlo.

Mostrar:

```text
63%
dato de hace 14 min
```

---

# 26. Empty states

Los estados vacíos deben ser útiles.

Ejemplo sin dispositivo:

> **Aún no hay un dispositivo conectado.**  
> Registra tu ESP32 para comenzar a recibir temperatura, humedad y estado del suelo.

CTA:

`Agregar dispositivo`

Usar patrón topográfico tenue como apoyo.

No usar ilustraciones stock.

---

# 27. Estado offline

Debe existir una experiencia visual específica.

Cuando el ESP32 esté offline:

- conservar el último dato;
- marcar claramente que es histórico;
- reducir visualmente la intensidad de instrumentos;
- mostrar hora de última conexión;
- deshabilitar acciones que no son seguras;
- explicar por qué.

Ejemplo:

```text
SIN CONEXIÓN
Última lectura válida: 18:42

Humedad de suelo
47%  · último dato conocido
```

---

# 28. Responsive — móvil primero en decisiones críticas

No limitarse a “apilar cards”.

Recomponer.

## Mobile dashboard

Orden recomendado:

1. contexto del dispositivo;
2. estado del suelo;
3. riego;
4. ambiente;
5. mini histórico;
6. eventos recientes.

El gráfico debe poder desplazarse / inspeccionarse.

La navegación de riego debe priorizar seguridad.

## Desktop

Aprovechar ancho para narrativa horizontal y gráficos amplios.

---

# 29. Componentes propios

Crear componentes de dominio, no solo UI primitives.

Ejemplos:

```text
<SoilMoistureInstrument />
<IrrigationPulse />
<DeviceHealthStrip />
<LiveReading />
<MoistureRange />
<IrrigationTimeline />
<SensorCalibrationWizard />
<RuleSentenceBuilder />
<DeviceConnectivityBadge />
<TelemetryFreshness />
<PumpSafetyPanel />
<EnvironmentalReading />
```

La existencia de estos componentes ayuda a que el proyecto no parezca ensamblado desde una librería genérica.

---

# 30. Sistema de diseño

Crear tokens centralizados.

```ts
export const designTokens = {
  spacing: {},
  colors: {},
  typography: {},
  radius: {},
  motion: {},
  elevation: {},
}
```

No hardcodear colores arbitrarios en decenas de componentes.

---

# 31. Accesibilidad

Objetivo mínimo:

**WCAG 2.2 AA**

Incluir:

- navegación completa con teclado;
- focus visible;
- contraste suficiente;
- labels reales;
- `aria-live` en actualizaciones importantes;
- tooltips accesibles;
- targets táctiles ≥ 44px cuando corresponda;
- no comunicar estados solo por color;
- soporte para `prefers-reduced-motion`;
- semántica HTML correcta;
- diálogos con manejo correcto de foco.

---

# 32. Copywriting

Usar español claro y humano.

Preferir:

```text
Última lectura hace 18 s
```

sobre:

```text
Timestamp telemetría: 2026-09-23T18:42:02Z
```

El dato técnico puede existir secundariamente.

Preferir:

```text
El suelo está dentro del rango objetivo.
```

sobre:

```text
Status: OK
```

No infantilizar.

---

# 33. Datos reales vs datos simulados

Durante desarrollo pueden existir mocks.

Pero:

- encapsularlos;
- marcarlos claramente;
- permitir reemplazarlos por API real;
- no mezclar mocks directamente con componentes de producción.

Crear una capa:

```text
services/
repositories/
api/
```

La UI nunca debe depender de datos hardcodeados dispersos.

---

# 34. Calidad del frontend

Si se usa Next.js + TypeScript:

- App Router;
- TypeScript strict;
- componentes server/client deliberados;
- evitar convertir todo en `"use client"`;
- estados remotos bien gestionados;
- errores tratados;
- loading states;
- Error Boundaries cuando aporten valor;
- formularios validados;
- estructura por features;
- diseño responsive;
- componentes reutilizables;
- tests de componentes críticos.

---

# 35. Estructura frontend sugerida

```text
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── charts/
│   └── feedback/
│
├── features/
│   ├── telemetry/
│   ├── irrigation/
│   ├── devices/
│   ├── rules/
│   ├── calibration/
│   └── alerts/
│
├── lib/
├── hooks/
├── services/
├── styles/
└── types/
```

---

# 36. Gráficos

Usar Recharts, ECharts o equivalente si ya forma parte del stack.

Pero no aceptar el estilo visual por defecto.

Personalizar:

- tipografía;
- grid;
- tooltip;
- stroke;
- dots;
- estados hover;
- ranges;
- annotations;
- eventos de riego.

Los tooltips deben ser visualmente coherentes con el sistema.

Ejemplo:

```text
14:32
Suelo        41%
Temperatura  24.8 °C
Riego        +20 s
```

---

# 37. Página de analítica

Crear una experiencia de exploración, no un “reporte empresarial”.

Debe responder preguntas:

- ¿Cómo cambió la humedad hoy?
- ¿Cuánto tarda el suelo en secarse?
- ¿Qué efecto tuvo cada riego?
- ¿Cuánto tiempo estuvo la bomba activa?
- ¿Qué franjas del día son más secas?
- ¿Hubo pérdida de conexión?

Secciones posibles:

```text
7 DÍAS
Humedad promedio       52%
Tiempo total de riego  4m 20s
Ciclos                 11
Disponibilidad ESP32   99.2%
```

Estos datos deben aparecer integrados en la narrativa, no necesariamente en cuatro cards.

---

# 38. Detalle especial: “Historia del día”

Crear una línea temporal visual que combine:

- amanecer / mañana / tarde / noche;
- humedad;
- temperatura;
- riegos;
- eventos.

Esto puede ser uno de los elementos más distintivos del producto.

Ejemplo:

```text
06:00               12:00               18:00
  ○───────●────────────○────●────────────○
 lectura  riego             riego
```

Al hacer hover/tap, mostrar contexto.

---

# 39. Detalle especial: “Efecto del riego”

Cuando haya datos suficientes, mostrar para un evento:

```text
Riego · 14:36
20 segundos

Antes       31%
+10 min     43%
+30 min     47%

Impacto     +16 pts
```

Esto hace que el sistema se sienta inteligente y específico.

No inventar el impacto si no existen datos posteriores suficientes.

---

# 40. Detalle especial: frescura de la telemetría

Cada dato debe conocer su frescura.

Estados:

```text
LIVE          < 30 s
RECIENTE      < 5 min
ANTIGUO       >= 5 min
SIN DATOS
```

Los umbrales pueden configurarse.

No mostrar un valor antiguo como si fuera actual.

---

# 41. Seguridad visual

Acciones peligrosas deben verse diferentes.

Para:

- borrar dispositivo;
- cambiar calibración;
- activar bomba;
- desactivar límites de seguridad;

usar confirmación proporcional al riesgo.

No abusar de modal para tareas triviales.

---

# 42. Performance

Objetivos:

- interfaz usable con red lenta;
- imágenes optimizadas;
- fonts con carga eficiente;
- evitar JS innecesario;
- lazy load de gráficas pesadas cuando convenga;
- evitar animation loops costosos;
- evitar re-render continuo de todo el dashboard.

La belleza no justifica mala performance.

---

# 43. Detalles visuales de alta calidad

Agregar pequeños elementos como:

- números con `tabular-nums`;
- unidades alineadas;
- timestamps discretos;
- divisores que continúan la grilla;
- etiquetas uppercase con tracking moderado;
- tiny status dots;
- transición visual cuando llega una nueva lectura;
- cambios suaves de escala;
- highlights de evento;
- estados hover pensados;
- cursor correcto;
- selection color personalizado;
- scrollbar discreta cuando corresponda.

---

# 44. Prohibición de “demo falsa”

No entregar solamente:

- landing page;
- mockup;
- componentes visuales aislados;
- un único dashboard estático.

La aplicación debe conservar la arquitectura funcional definida por el proyecto.

Cada pieza visual debe conectarse a datos reales o a una interfaz de datos preparada para la API real.

---

# 45. Flujo de trabajo obligatorio para la IA

Antes de escribir componentes finales:

## Fase 1 — Entender

Leer todos los requerimientos.

Crear internamente una lista de:

- usuarios;
- tareas críticas;
- riesgos;
- métricas;
- estados del sistema.

## Fase 2 — Concepto

Definir internamente:

- personalidad;
- ritmo;
- color;
- tipografía;
- composición;
- motion;
- firma visual.

## Fase 3 — Sistema

Crear primero:

- tokens;
- layout;
- typography;
- primitives;
- domain components.

## Fase 4 — Pantalla estrella

Construir el dashboard principal antes de expandir el resto.

Debe verse excelente antes de continuar.

## Fase 5 — Estados

Agregar:

- loading;
- error;
- empty;
- offline;
- stale;
- active;
- disabled.

## Fase 6 — Responsive

Validar explícitamente:

```text
375 px
430 px
768 px
1024 px
1440 px
```

## Fase 7 — Polish

Hacer una pasada dedicada exclusivamente a:

- alineación;
- espacios;
- tipografía;
- contraste;
- motion;
- consistencia;
- microcopy.

---

# 46. Autoevaluación antes de considerar terminada una pantalla

Para cada página preguntarse:

### Identidad
- ¿Podría esta pantalla pertenecer a cualquier SaaS?
- Si la respuesta es sí, rediseñarla.

### Jerarquía
- ¿Sé dónde mirar primero en menos de 2 segundos?

### Dominio
- ¿La UI expresa agua, suelo, ambiente y telemetría sin caer en clichés?

### Datos
- ¿Se distingue dato actual de dato antiguo?

### Seguridad
- ¿Es imposible confundir el estado real de la bomba?

### Responsive
- ¿La pantalla fue recompuesta o simplemente apilada?

### Accesibilidad
- ¿Funciona sin mouse?
- ¿Funciona sin depender del color?

### Originalidad
- ¿Existe al menos un detalle memorable propio?

---

# 47. Score interno de calidad

No mostrar este score al usuario.  
Usarlo como control interno.

No finalizar hasta alcanzar como mínimo:

```text
Identidad visual       9/10
Claridad UX            9/10
Originalidad           9/10
Coherencia             9/10
Legibilidad            9/10
Responsive             9/10
Accesibilidad          8/10
Motion                 8/10
Calidad técnica        9/10
```

Si una dimensión está baja, iterar.

---

# 48. Criterios que hacen que el diseño se considere fallido

El diseño se considera fallido si:

- parece un template gratuito;
- el dashboard es una colección de cards;
- el color principal es un gradiente violeta/azul sin relación con el dominio;
- la bomba no tiene un flujo de seguridad claro;
- las gráficas parecen defaults de una librería;
- no existe identidad visual propia;
- no existe tratamiento específico para datos obsoletos;
- el móvil parece una versión apilada del desktop;
- no hay estados vacíos/offline/error;
- todos los componentes tienen la misma forma;
- la interfaz tiene demasiada decoración;
- se prioriza “verse futurista” sobre ser comprensible.

---

# 49. Resultado esperado

La aplicación final debería poder describirse así:

> Una interfaz ambiental contemporánea, donde las mediciones se sienten como instrumentos vivos. El diseño combina precisión técnica con una estética inspirada en cartografía, agua y suelo. Los gráficos son protagonistas, la jerarquía es editorial y cada interacción comunica el estado real del sistema. La aplicación es reconocible incluso sin ver su logo.

---

# 50. Instrucción final para la IA

**No elijas la solución visual más rápida. Elige la solución que mejor represente este producto.**

No construyas una plantilla.

No copies un dashboard.

No llenes la pantalla de cards.

No uses componentes genéricos sin adaptarlos.

Antes de dar por terminada la interfaz, realiza al menos una iteración específica de diseño para eliminar cualquier elemento que se sienta común, prefabricado o intercambiable con otra aplicación.

La prioridad es:

```text
1. Claridad
2. Identidad
3. Seguridad
4. Jerarquía
5. Originalidad
6. Consistencia
7. Performance
8. Decoración
```

La decoración siempre va al final.

El resultado debe sentirse **hecho a medida para un sistema de riego inteligente real**.
