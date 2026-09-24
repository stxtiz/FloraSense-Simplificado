"use client";

import React from 'react';
import { Droplets, Activity, Settings, Calendar, History, Sprout, LogOut } from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { icon: Activity, label: 'Dashboard', active: true },
    { icon: History, label: 'Historial', active: false },
    { icon: Calendar, label: 'Reglas', active: false },
    { icon: Settings, label: 'Configuración', active: false },
  ];

  const handleLogout = () => {
    localStorage.removeItem('fs_auth_token');
    window.location.reload();
  };

  return (
    <aside className="hidden lg:flex w-[88px] h-screen border-r border-line bg-canvas flex-col items-center py-8 justify-between shrink-0">
      <div className="flex flex-col items-center gap-12">
        {/* Logo */}
        <div className="w-12 h-12 rounded-2xl bg-water flex items-center justify-center text-canvas shadow-lg shadow-water/20">
          <Droplets className="w-6 h-6" />
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-6">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button 
                key={idx}
                title={item.label}
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  item.active 
                    ? 'bg-ink text-canvas shadow-md' 
                    : 'text-ink-soft hover:bg-line hover:text-ink'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={item.active ? 2.5 : 2} />
                {item.active && (
                  <div className="absolute -left-5 w-1 h-8 bg-ink rounded-r-full" />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={handleLogout}
          title="Cerrar sesión"
          className="w-12 h-12 rounded-xl flex items-center justify-center text-ink-soft hover:bg-line hover:text-ink transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
        
        <div className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-ink-soft hover:bg-line transition-colors cursor-pointer" title="Mi perfil">
          <Sprout className="w-5 h-5" />
        </div>
      </div>
    </aside>
  );
}
