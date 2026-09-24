"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const mockData = [
  { time: '06:00', moisture: 42, temp: 18 },
  { time: '08:00', moisture: 38, temp: 22 },
  { time: '10:00', moisture: 35, temp: 26 },
  { time: '12:00', moisture: 32, temp: 30 },
  { time: '14:00', moisture: 68, temp: 31 }, // Riego
  { time: '16:00', moisture: 62, temp: 29 },
  { time: '18:00', moisture: 58, temp: 25 },
  { time: '20:00', moisture: 55, temp: 21 },
];

export function HistoryChart({ currentMoisture }: { currentMoisture?: number }) {
  // Insertar el valor actual al final si existe
  const data = [...mockData];
  if (currentMoisture !== undefined) {
    data.push({ time: 'AHORA', moisture: currentMoisture, temp: 24 });
  }

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-water)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-water)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-line)" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-ink-soft)', fontSize: 12, fontFamily: 'var(--font-plex-mono)' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-ink-soft)', fontSize: 12, fontFamily: 'var(--font-plex-mono)' }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-ink)', 
              borderColor: 'transparent',
              borderRadius: '8px',
              color: 'var(--color-canvas)' 
            }}
            itemStyle={{ color: 'var(--color-canvas)', fontFamily: 'var(--font-plex-mono)' }}
            labelStyle={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-canvas-muted)', marginBottom: '4px' }}
          />
          <ReferenceLine y={40} stroke="var(--color-warning)" strokeDasharray="4 4" opacity={0.5} />
          <ReferenceLine y={70} stroke="var(--color-water-soft)" strokeDasharray="4 4" opacity={0.5} />
          <Area 
            type="monotone" 
            dataKey="moisture" 
            stroke="var(--color-water)" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorMoisture)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
