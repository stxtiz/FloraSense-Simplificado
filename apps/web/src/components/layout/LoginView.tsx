"use client";

import React, { useState } from 'react';
import { TopographicPattern } from '../ui/TopographicPattern';
import { Droplets, ArrowRight, Lock } from 'lucide-react';

export function LoginView({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full flex bg-canvas">
      {/* Lado Visual */}
      <div className="hidden lg:flex w-[55%] bg-moss relative overflow-hidden flex-col justify-between p-16 text-canvas">
        <TopographicPattern className="opacity-20 text-canvas-elevated" />
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-moss-bright/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <Droplets className="w-8 h-8 text-water-soft" />
            <span className="font-display text-3xl tracking-wide">FloraSense</span>
          </div>
        </div>

        <div className="relative z-10 max-w-xl">
          <h1 className="font-display text-6xl leading-[1.1] mb-6">
            El agua correcta,<br />en el momento correcto.
          </h1>
          <p className="text-moss-bright text-xl max-w-md font-light leading-relaxed">
            Observa el pulso del suelo, entiende el ambiente y controla cada ciclo de riego con precisión de laboratorio.
          </p>
          
          <div className="mt-16 font-mono-data text-xs text-moss-bright tracking-widest uppercase flex gap-8">
            <div>SISTEMA ONLINE</div>
            <div>VERSIÓN 1.0.0</div>
            <div>STATUS: ÓPTIMO</div>
          </div>
        </div>
      </div>

      {/* Lado Formulario */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md relative z-10">
          
          <div className="lg:hidden flex items-center gap-3 mb-12 justify-center">
            <Droplets className="w-8 h-8 text-water" />
            <span className="font-display text-3xl tracking-wide text-ink">FloraSense</span>
          </div>

          <h2 className="font-display text-4xl text-ink mb-2">Acceso al sistema</h2>
          <p className="text-ink-soft mb-12">Ingresa tus credenciales para continuar.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-ink-soft mb-2">
                Correo electrónico
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-canvas-elevated border-b-2 border-line text-ink px-4 py-3 focus:outline-none focus:border-water transition-colors placeholder:text-ink/30"
                placeholder="operador@florasense.io"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-ink-soft mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-canvas-elevated border-b-2 border-line text-ink px-4 py-3 focus:outline-none focus:border-water transition-colors placeholder:text-ink/30"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-line-strong" />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full mt-8 bg-ink text-canvas py-4 px-6 flex items-center justify-between hover:bg-ink-soft transition-colors group"
            >
              <span className="font-semibold tracking-wide uppercase text-sm">Ingresar al panel</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 text-center text-xs text-ink-soft font-mono-data">
            PROTEGIDO POR ENCRIPTACIÓN E2E
          </div>
        </div>
      </div>
    </div>
  );
}
