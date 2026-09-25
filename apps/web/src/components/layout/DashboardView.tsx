"use client";
import { apiFetch } from '../../lib/api';


import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HealthStrip } from '../domain/HealthStrip';
import { SoilMoistureInstrument } from '../domain/SoilMoistureInstrument';
import { PumpControl } from '../domain/PumpControl';
import { EnvironmentalReading } from '../domain/EnvironmentalReading';
import { Sidebar } from './Sidebar';
import { TopographicPattern } from '../ui/TopographicPattern';
import { HistoryChart } from '../charts/HistoryChart';
import { LoginView } from './LoginView';

type DeviceData = {
  id: string;
  name: string;
  status: 'ONLINE' | 'OFFLINE';
  lastTelemetry: {
    temperatureC: number;
    airHumidityPct: number;
    soilMoisturePct: number;
    pumpOn: boolean;
    timestamp: string;
  } | null;
};

type LastEvent = {
  startedAt: string;
  durationSeconds: number | null;
};

export function DashboardView() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [data, setData] = useState<DeviceData | null>(null);
  const [lastEvent, setLastEvent] = useState<LastEvent | null>(null);
  const [loading, setLoading] = useState(true);

  // Check auth on mount
  useEffect(() => {
    const isAuth = localStorage.getItem('fs_auth_token') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('fs_auth_token', 'true');
    setIsAuthenticated(true);
  };

  const fetchDevice = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await apiFetch('/api/devices/demo');
      if (res.ok) {
        const json = await res.json();
        setData(json);
        
        // Also fetch the last event
        const evtRes = await apiFetch(`/api/devices/${json.id}/events`);
        if (evtRes.ok) {
           const events = await evtRes.json();
           if (events && events.length > 0) {
             setLastEvent(events[0]);
           }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDevice();
      const interval = setInterval(fetchDevice, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-canvas" />; 
  }

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  if (loading && !data) {
    return (
      <div className="flex h-screen bg-canvas items-center justify-center">
        <div className="text-ink-soft animate-pulse font-mono-data tracking-widest uppercase">Cargando instrumentos...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen bg-canvas items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-4xl mb-4 text-ink">Aún no hay dispositivo</h2>
          <p className="text-ink-soft">Registra tu ESP32 para comenzar a recibir datos.</p>
        </div>
      </div>
    );
  }

  const { lastTelemetry } = data;
  
  let lastReadingText = "Sin datos";
  if (lastTelemetry?.timestamp) {
    const diffMs = new Date().getTime() - new Date(lastTelemetry.timestamp).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    lastReadingText = diffSec < 60 ? `hace ${diffSec} s` : `hace ${Math.floor(diffSec/60)} min`;
  }

  let soilStatus: 'SECO' | 'OPTIMO' | 'SATURADO' | 'OFFLINE' = 'OFFLINE';
  if (lastTelemetry) {
    if (lastTelemetry.soilMoisturePct < 40) soilStatus = 'SECO';
    else if (lastTelemetry.soilMoisturePct > 70) soilStatus = 'SATURADO';
    else soilStatus = 'OPTIMO';
  }

  const isCritical = lastTelemetry && lastTelemetry.soilMoisturePct >= 100;

  // Format last cycle text
  let lastCycleText = "Nunca";
  if (lastEvent) {
     const dt = new Date(lastEvent.startedAt);
     const timeStr = `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
     if (lastEvent.durationSeconds) {
       lastCycleText = `${timeStr} • ${lastEvent.durationSeconds}s`;
     } else {
       lastCycleText = `${timeStr} • En curso...`;
     }
  }

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <TopographicPattern />
        
        <HealthStrip 
          deviceId={data.id.substring(0, 8)}
          status={data.status}
          lastReading={lastReadingText}
          pumpStatus={lastTelemetry?.pumpOn ? 'ON' : 'OFF'}
        />
        
        <main className="flex-1 p-6 md:p-10 lg:p-14 max-w-[1400px] mx-auto w-full relative z-10">
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-5xl text-ink mb-2">{data.name}</h1>
              <div className="flex items-center gap-3 text-ink-soft text-sm font-mono-data uppercase tracking-wider">
                <span className="bg-line px-2 py-0.5 rounded text-ink">Modo Auto</span>
                <span>•</span>
                <span>Sync: {lastReadingText}</span>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-3xl font-display text-ink">Hoy</div>
              <div className="text-sm text-ink-soft">Riego Inteligente</div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Columna Izquierda: Humedad y Gráfica */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
              
              <div className="border border-line rounded-[32px] p-8 lg:p-12 bg-canvas-elevated shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-moss/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex justify-between items-start mb-16">
                  <h2 className="font-display text-4xl text-ink">Estado del suelo</h2>
                  <div className="text-right">
                    <div className="text-xs text-ink-soft uppercase tracking-widest font-bold mb-1">Tendencia</div>
                    <div className="font-mono-data text-moss font-medium">Estable</div>
                  </div>
                </div>
                
                {lastTelemetry ? (
                  <SoilMoistureInstrument 
                    valuePct={lastTelemetry.soilMoisturePct} 
                    status={soilStatus} 
                  />
                ) : (
                  <div className="py-8 text-center text-ink-soft">Esperando lectura...</div>
                )}
              </div>

              <div className="border border-line rounded-[32px] p-8 bg-canvas-elevated shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-display text-3xl text-ink">Historial de Humedad Diario</h2>
                  <Link href="/history">
                    <button className="text-xs font-bold uppercase tracking-widest text-water hover:text-water-soft transition-colors">
                      Ver reporte
                    </button>
                  </Link>
                </div>
                <HistoryChart currentMoisture={lastTelemetry?.soilMoisturePct} deviceId={data.id} />
              </div>
            </div>

            {/* Columna Derecha: Ambiente y Bomba */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
              <EnvironmentalReading 
                temp={lastTelemetry?.temperatureC || 0}
                humidity={lastTelemetry?.airHumidityPct || 0}
                trendText={`El ambiente se mantiene estable. Última variación registrada hace unos instantes.`}
              />

              <PumpControl 
                deviceId={data.id}
                pumpOn={lastTelemetry?.pumpOn || false}
                lastCycle={lastCycleText}
                onRefresh={fetchDevice}
              />

              {/* Narrativa Diaria */}
              <div className={`border rounded-[32px] p-8 relative overflow-hidden transition-colors duration-500 ${isCritical ? 'bg-warning border-warning text-canvas' : 'bg-ink border-line text-canvas'}`}>
                <TopographicPattern className="opacity-10 text-moss-bright" />
                <div className="relative z-10">
                  <h3 className={`text-xs font-bold tracking-widest uppercase mb-4 ${isCritical ? 'text-canvas/80' : 'text-moss-bright'}`}>
                    Análisis Automático
                  </h3>
                  <p className="font-display text-2xl leading-snug">
                    {isCritical
                      ? '"Los niveles muy altos de humedad pueden ser dañinos. Se ha forzado el apagado por seguridad."'
                      : lastTelemetry && lastTelemetry.soilMoisturePct < 40
                        ? '"Nivel de humedad crítico. Requiere ciclo de riego pronto."'
                        : '"El suelo se mantiene dentro del rango objetivo. No se requiere riego inmediato."'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
