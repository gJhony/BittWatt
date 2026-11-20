# ⚡ BitWatt — GridSense

![Status](https://img.shields.io/badge/Estado-Prototipo%20%2F%20MVP-blue)
![Hardware](https://img.shields.io/badge/IoT-ESP32%20%7C%20SCT--013-00979D?logo=espressif&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20MQTT-339933?logo=nodedotjs&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Figma-61DAFB?logo=react&logoColor=black)
![Database](https://img.shields.io/badge/Database-MySQL%208.0-4479A1?logo=mysql&logoColor=white)
![ODS](https://img.shields.io/badge/ODS-7%20%26%2011-green)

**Sistema Inteligente de Monitoreo y Gestión Energética** orientado a edificios públicos, institucionales y educativos. 

GridSense captura, centraliza y visualiza el consumo eléctrico con alta frecuencia mediante nodos IoT de bajo costo, transformando lecturas técnicas (kWh) en indicadores accionables de **costo monetario (MXN)**, **impacto ambiental ($\text{CO}_2\text{e}$)** e **Índice de Eficiencia Energética (IEE)** para combatir la gestión reactiva y los consumos hormiga fuera de horario.

---

## 📋 Tabla de Contenidos

- [Problemática y Propuesta de Valor](#-problemática-y-propuesta-de-valor)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Características Principales](#-características-principales)
- [Modelo de Base de Datos (`bitwatt_db`)](#-modelo-de-base-de-datos-bitwatt_db)
- [Instalación y Despliegue](#-instalación-y-despliegue)
- [Alineación con Sustentabilidad (ODS)](#-alineación-con-sustentabilidad-ods)
- [Equipo de Desarrollo](#-equipo-de-desarrollo)

---

## 🎯 Problemática y Propuesta de Valor

En la mayoría de inmuebles institucionales, el gasto energético se conoce de forma global y tardía a través del recibo mensual o bimestral, generando **ceguera operativa energética**. GridSense resuelve esto mediante:

* **Visibilidad continua:** Seguimiento granular por edificio, piso, zona y circuito eléctrico.
* **Detección de desperdicios:** Identificación de consumos fantasma y equipos encendidos en horarios no operativos.
* **Traducción ejecutiva:** Conversión automática de energía consumida a impacto económico (tarifas base, intermedia y punta) y huella de carbono ($\text{kg CO}_2\text{e}$).
* **Soberanía tecnológica:** Arquitectura basada en hardware abierto y desarrollo interno de bajo costo.

---

## 🏗️ Arquitectura del Sistema

El sistema está desacoplado en capas independientes para facilitar pruebas, escalabilidad y mantenimiento:

| Capa | Tecnologías | Responsabilidad |
| :--- | :--- | :--- |
| **Adquisición (Edge/IoT)** | ESP32 + Sensores no invasivos SCT-013 | Lectura de corriente RMS, calibración básica y empaquetado de telemetría. |
| **Comunicación** | Wi-Fi + Protocolo MQTT | Transporte ligero y de baja latencia desde los nodos físicos hacia el servidor. |
| **Procesamiento (Backend)** | Node.js | Ingesta de telemetría, validación de datos, motor de reglas, cálculo de tarifas/$\text{CO}_2$ y API REST. |
| **Analítica y Optimización** | Reglas Horarias + Algoritmo Genético | Ajuste dinámico de umbrales, detección de anomalías y simulación de ahorro energético. |
| **Persistencia** | MySQL 8.0 (`bitwatt_db`) | Almacenamiento relacional de telemetría cruda, agregaciones horarias/diarias y catálogos. |
| **Visualización (Frontend)** | React + Prototipo UI/UX en Figma | Dashboard ejecutivo, gráficas históricas, gestión de alertas y reportes. |

### Flujo de Datos
```text
[Sensor SCT-013] ──► [Nodo ESP32] ──(MQTT / Wi-Fi)──► [Backend Node.js] ──► [MySQL: bitwatt_db]
                                                             │
                                                             ▼
                                                [Dashboard Web en React]
```

## Sitio web (frontend)

La interfaz web en React incluye las pantallas de inicio de sesión, registro, resumen energético, alertas, histórico y configuración. Para ejecutarla localmente:

```powershell
cd frontend
npm install
npm run dev
```

Vite muestra la dirección local en la terminal. Para generar la versión de producción, ejecuta `npm run build` desde `frontend`.