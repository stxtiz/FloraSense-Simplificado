"use client";
import { apiFetch } from '../../lib/api';

import React, { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { LoginView } from './LoginView';
import { TopographicPattern } from '../ui/TopographicPattern';
import { Smartphone, Wifi, Shield, RefreshCw, X, CheckCircle, AlertTriangle } from 'lucide-react';

export function SettingsView() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Devices state
  const [devices, setDevices] = useState<any[]>([]);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceKey, setNewDeviceKey] = useState<string | null>(null);

  // MQTT state
  const [mqttStatus, setMqttStatus] = useState<any>(null);
  const [pinging, setPinging] = useState(false);

  // Security state
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secError, setSecError] = useState('');
  const [secSuccess, setSecSuccess] = useState('');
  const [secLoading, setSecLoading] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('fs_auth_token') === 'true';
    setIsAuthenticated(isAuth);
    if (isAuth) {
      loadDevices();
      pingMqtt();
    }
  }, []);

  const loadDevices = async () => {
    try {
      const res = await apiFetch('/api/devices');
      const data = await res.json();
      setDevices(data);
    } catch (e) {
      console.error('Error cargando dispositivos:', e);
    }
  };

  const pingMqtt = async () => {
    setPinging(true);
    try {
      const res = await apiFetch('/api/system/mqtt-status');
      const data = await res.json();
      setMqttStatus(data);
    } catch (e) {
      console.error('Error MQTT:', e);
    } finally {
      setPinging(false);
    }
  };

  const handleAddDevice = async () => {
    if (!newDeviceName.trim()) return;
    try {
      const res = await apiFetch('/api/devices', {
        method: 'POST',
        body: JSON.stringify({ name: newDeviceName }),
      });
      const data = await res.json();
      setNewDeviceKey(data.deviceKey);
      loadDevices();
    } catch (e) {
      console.error('Error al añadir:', e);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecError('');
    setSecSuccess('');

    if (newPassword !== confirmPassword) {
      setSecError('Las contraseñas nuevas no coinciden.');
      return;
    }
    if (newPassword.length < 8) {
      setSecError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setSecLoading(true);
    try {
      const res = await apiFetch('/api/auth/password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al cambiar contraseña');
      }

      setSecSuccess('¡Contraseña actualizada exitosamente!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setIsSecurityModalOpen(false), 2000);
    } catch (err: any) {
      setSecError(err.message);
    } finally {
      setSecLoading(false);
    }
  };

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
            
            {/* DISPOSITIVOS */}
            <div className="border border-line rounded-[32px] p-8 bg-canvas-elevated shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-ink" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold tracking-widest uppercase text-sm mb-1 text-ink">Dispositivos Emparejados</h3>
                <p className="text-ink-soft mb-4">Tienes {devices.length} dispositivo(s) ESP32 activo(s) conectado(s) a tu cuenta.</p>
                
                {devices.length > 0 && (
                  <div className="mb-4 bg-canvas p-4 rounded-xl border border-line text-sm">
                    {devices.map(d => (
                      <div key={d.id} className="flex justify-between items-center py-2 border-b border-line last:border-0 last:pb-0">
                        <div>
                          <span className="font-bold text-ink">{d.name}</span>
                          <span className="text-ink-soft text-xs ml-2">({d.status})</span>
                        </div>
                        <div className="font-mono-data text-xs text-ink-soft">ID: {d.id.split('-')[0]}...</div>
                      </div>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => setIsAddDeviceOpen(true)}
                  className="px-6 py-2 border border-line rounded-lg text-sm font-bold uppercase tracking-widest text-ink hover:bg-line transition-colors">
                  Añadir Nuevo
                </button>
              </div>
            </div>

            {/* MQTT */}
            <div className="border border-line rounded-[32px] p-8 bg-canvas-elevated shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center shrink-0">
                <Wifi className="w-6 h-6 text-ink" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold tracking-widest uppercase text-sm mb-1 text-ink">Conexión MQTT</h3>
                <p className="text-ink-soft mb-4">Broker MQTT administrando la telemetría en tiempo real.</p>
                
                {mqttStatus && (
                  <div className="mb-4 text-sm font-mono-data bg-canvas p-3 rounded-lg border border-line flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${mqttStatus.connected ? 'bg-moss' : 'bg-warning'}`} />
                      <span>Estado: {mqttStatus.connected ? 'CONECTADO' : 'DESCONECTADO'}</span>
                    </div>
                    {mqttStatus.connected && (
                      <div className="text-ink-soft ml-4">Subscripciones activas detectadas.</div>
                    )}
                  </div>
                )}

                <button 
                  onClick={pingMqtt}
                  disabled={pinging}
                  className="px-6 py-2 border border-line rounded-lg text-sm font-bold uppercase tracking-widest text-ink hover:bg-line transition-colors flex items-center gap-2 disabled:opacity-50">
                  <RefreshCw className={`w-4 h-4 ${pinging ? 'animate-spin' : ''}`} /> 
                  {pinging ? 'Probando...' : 'Probar Conexión'}
                </button>
              </div>
            </div>

            {/* SEGURIDAD */}
            <div className="border border-line rounded-[32px] p-8 bg-canvas-elevated shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-ink" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold tracking-widest uppercase text-sm mb-1 text-ink">Seguridad de la Cuenta</h3>
                <p className="text-ink-soft mb-4">Actualiza tus credenciales cifradas (OWASP/ASVS) para proteger el acceso a los comandos MQTT.</p>
                <button 
                  onClick={() => setIsSecurityModalOpen(true)}
                  className="px-6 py-2 border border-line rounded-lg text-sm font-bold uppercase tracking-widest text-ink hover:bg-line transition-colors">
                  Gestionar Seguridad
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ADD DEVICE MODAL */}
      {isAddDeviceOpen && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-canvas rounded-[32px] w-full max-w-lg p-8 relative shadow-2xl">
            <button 
              onClick={() => { setIsAddDeviceOpen(false); setNewDeviceKey(null); setNewDeviceName(''); }}
              className="absolute top-6 right-6 text-ink-soft hover:text-ink"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="font-display text-3xl mb-2">Nuevo ESP32</h2>
            <p className="text-ink-soft mb-6">Asigna un nombre para registrar un nuevo microcontrolador.</p>
            
            {!newDeviceKey ? (
              <div>
                <input 
                  type="text"
                  placeholder="Ej: Invernadero Principal"
                  value={newDeviceName}
                  onChange={e => setNewDeviceName(e.target.value)}
                  className="w-full bg-canvas-elevated border border-line p-4 rounded-xl focus:outline-none focus:border-water text-ink mb-6"
                />
                <button 
                  onClick={handleAddDevice}
                  className="w-full bg-ink text-canvas py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-ink-soft transition-colors"
                >
                  Generar Credenciales
                </button>
              </div>
            ) : (
              <div className="bg-moss/10 border border-moss p-6 rounded-xl">
                <div className="flex items-center gap-2 text-moss font-bold mb-4">
                  <CheckCircle className="w-5 h-5" /> Dispositivo Registrado
                </div>
                <p className="text-sm text-ink-soft mb-2">Copia esta clave secreta en el código C++ del ESP32. Solo se mostrará una vez.</p>
                <code className="block w-full p-4 bg-canvas-elevated border border-line rounded-lg text-xs break-all select-all font-mono-data text-ink">
                  {newDeviceKey}
                </code>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECURITY MODAL */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-canvas rounded-[32px] w-full max-w-lg p-8 relative shadow-2xl">
            <button 
              onClick={() => {
                setIsSecurityModalOpen(false);
                setSecError('');
                setSecSuccess('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }}
              className="absolute top-6 right-6 text-ink-soft hover:text-ink"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="font-display text-3xl mb-2">Cambiar Contraseña</h2>
            <p className="text-ink-soft mb-6">Asegura tu cuenta actualizando tu clave criptográfica.</p>
            
            {secError && (
              <div className="bg-warning/10 border border-warning text-warning p-4 rounded-xl mb-6 flex items-start gap-3 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>{secError}</span>
              </div>
            )}

            {secSuccess && (
              <div className="bg-moss/10 border border-moss text-moss p-4 rounded-xl mb-6 flex items-start gap-3 text-sm">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{secSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-ink-soft mb-2">Contraseña Actual</label>
                <input 
                  type="password"
                  required
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full bg-canvas-elevated border border-line p-3 rounded-xl focus:outline-none focus:border-water text-ink"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-ink-soft mb-2">Nueva Contraseña</label>
                <input 
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-canvas-elevated border border-line p-3 rounded-xl focus:outline-none focus:border-water text-ink"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-ink-soft mb-2">Confirmar Nueva Contraseña</label>
                <input 
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-canvas-elevated border border-line p-3 rounded-xl focus:outline-none focus:border-water text-ink"
                />
              </div>

              <button 
                type="submit"
                disabled={secLoading || !!secSuccess}
                className="w-full mt-4 bg-ink text-canvas py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-ink-soft transition-colors disabled:opacity-50"
              >
                {secLoading ? 'Actualizando...' : 'Guardar Cambios'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
