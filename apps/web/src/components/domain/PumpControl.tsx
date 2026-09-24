import React from 'react';
import { Droplets, Clock, Power } from 'lucide-react';

export function PumpControl({ pumpOn, lastCycle }: { pumpOn: boolean, lastCycle?: string }) {
  return (
    <div className="border border-line rounded-2xl p-6 relative overflow-hidden bg-canvas">
      {pumpOn && (
        <div className="absolute inset-0 bg-water/5 animate-pulse" />
      )}
      
      <div className="relative z-10">
        <h3 className="font-display text-2xl mb-1">Riego</h3>
        {pumpOn ? (
          <div className="mt-4">
            <div className="flex items-center gap-3 text-water font-medium mb-2">
              <Droplets className="w-5 h-5 animate-bounce" />
              <span>Bomba Activa</span>
            </div>
            <div className="font-mono-data text-sm opacity-80 mt-1">
              Flujo continuo en progreso...
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex items-center gap-3 text-ink-soft mb-2">
              <Power className="w-5 h-5" />
              <span>Bomba en reposo</span>
            </div>
            {lastCycle && (
              <div className="flex items-center gap-2 font-mono-data text-xs text-ink-soft mt-3">
                <Clock className="w-3.5 h-3.5" />
                <span>Último ciclo: {lastCycle}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
