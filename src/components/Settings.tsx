import React from 'react';
import { Moon, Sun, Monitor, Palette } from 'lucide-react';

interface SettingsProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export default function Settings({ theme, setTheme }: SettingsProps) {
  return (
    <div className="space-y-8 max-w-2xl">
      <header>
        <h1 className="text-3xl font-display font-bold tracking-tight">Ajustes</h1>
        <p className="text-zinc-400 mt-1">Personaliza tu experiencia en AutoFinder.</p>
      </header>

      <section className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-3 text-violet-500">
          <Palette size={24} />
          <h2 className="text-xl font-bold">Apariencia</h2>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-zinc-400">Selecciona el tema visual de la aplicación.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all ${
                theme === 'dark'
                  ? 'bg-violet-500/10 border-violet-500 text-violet-500 glow-violet'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                <Moon size={24} />
              </div>
              <span className="font-bold">Modo Oscuro</span>
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all ${
                theme === 'light'
                  ? 'bg-violet-500/10 border-violet-500 text-violet-500 glow-violet'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:border-zinc-300'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center">
                <Sun size={24} />
              </div>
              <span className="font-bold">Modo Claro</span>
            </button>
          </div>
        </div>
      </section>

      <section className="glass-card p-8">
        <div className="flex items-center gap-3 text-zinc-400">
          <Monitor size={24} />
          <h2 className="text-xl font-bold">Información del Sistema</h2>
        </div>
        <div className="mt-4 space-y-2 text-sm text-zinc-500">
          <div className="flex justify-between">
            <span>Versión</span>
            <span>1.0.0-mvp</span>
          </div>
          <div className="flex justify-between">
            <span>Motor de IA</span>
            <span>Gemini 3 Flash</span>
          </div>
        </div>
      </section>
    </div>
  );
}
