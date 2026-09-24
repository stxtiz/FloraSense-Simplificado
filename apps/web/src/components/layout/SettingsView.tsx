"use client";

import React, { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { LoginView } from './LoginView';
import { TopographicPattern } from '../ui/TopographicPattern';
import { Smartphone, Wifi, Shield, RefreshCw } from 'lucide-react';

export function SettingsView() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('fs_auth_token') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  if (isAuthenticated === null) return <div className="min-h-screen bg-canvas" />;
  if (!isAuthenticated) return <LoginView onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <TopographicPattern />
        
        <main className="flex-1 p-6 md:p-10 lg:p-14 max-w-[800px] mx-auto w-full relative z-10">
          <header className="mb-10">
            <h1 className="font-display text-5xl text-ink mb-2">Configuración</h1>
            <p className="text-ink-soft">Administra tus dispositivos y preferencias de la cuenta.</p>
          </header>

          <div className="flex flex-col gap-6">
            
            <div className="border border-line rounded-[32px] p-8 bg-canvas-elevated shadow-sm flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-ink" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold tracking-widest uppercase text-sm mb-1 text-ink">Dispositivos Emparejados</h3>
                <p className="text-ink-soft mb-4">Tienes 1 dispositivo ESP32 activo conectado a tu cuenta.</p>
                <button className="px-6 py-2 border border-line rounded-lg text-sm font-bold uppercase tracking-widest text-ink hover:bg-line transition-colors">
                  Añadir Nuevo
                </button>
              </div>
            </div>

            <div className="border border-line rounded-[32px] p-8 bg-canvas-elevated shadow-sm flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center shrink-0">
                <Wifi className="w-6 h-6 text-ink" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold tracking-widest uppercase text-sm mb-1 text-ink">Conexión MQTT</h3>
                <p className="text-ink-soft mb-4">Broker local ejecutándose en el puerto 1883. Estado: Estable.</p>
                <button className="px-6 py-2 border border-line rounded-lg text-sm font-bold uppercase tracking-widest text-ink hover:bg-line transition-colors flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Probar Conexión
                </button>
              </div>
            </div>

            <div className="border border-line rounded-[32px] p-8 bg-canvas-elevated shadow-sm flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-ink" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold tracking-widest uppercase text-sm mb-1 text-ink">Seguridad de la Cuenta</h3>
                <p className="text-ink-soft mb-4">Cambia tu contraseña o habilita autenticación en dos pasos.</p>
                <button className="px-6 py-2 border border-line rounded-lg text-sm font-bold uppercase tracking-widest text-ink hover:bg-line transition-colors">
                  Gestionar Seguridad
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
