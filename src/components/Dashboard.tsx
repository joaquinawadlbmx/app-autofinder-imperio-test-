import React from 'react';
import { AutomationReport } from '../types';
import { TrendingUp, Clock, ArrowUpRight, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  reports: AutomationReport[];
  onViewReport: (report: AutomationReport) => void;
}

export default function Dashboard({ reports, onViewReport }: DashboardProps) {
  const totalSavings = reports.reduce((acc, curr) => {
    // Handle both string and number formats for safety
    const val = typeof curr.totalEstimatedSavings === 'string' 
      ? parseInt(curr.totalEstimatedSavings.replace(/[^0-9]/g, '')) || 0
      : curr.totalEstimatedSavings;
    return acc + val;
  }, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-display font-bold tracking-tight">Panel Ejecutivo</h1>
        <p className="text-zinc-500 mt-1">Resumen de tus diagnósticos de automatización e impacto potencial.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 glow-violet">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center text-violet-500">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Total Diagnósticos</p>
              <p className="text-2xl font-bold">{reports.length}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 glow-emerald">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Ahorro Potencial</p>
              <p className="text-2xl font-bold text-emerald-500">${totalSavings.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-500">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">ROI Promedio</p>
              <p className="text-2xl font-bold">3.2 Meses</p>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold">Diagnósticos Recientes</h2>
          <button className="text-sm text-violet-500 hover:text-violet-400 font-medium">Ver Todo</button>
        </div>

        <div className="space-y-3">
          {reports.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-zinc-500">No se encontraron diagnósticos. ¡Comienza tu primer análisis!</p>
            </div>
          ) : (
            reports.map((report, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={report.id}
                onClick={() => onViewReport(report)}
                className="glass-card p-4 flex items-center justify-between hover:bg-violet-500/5 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-800/50 rounded-lg flex items-center justify-center font-bold text-zinc-500">
                    {report.businessName[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold">{report.businessName}</h3>
                    <p className="text-xs text-zinc-500">{report.industry} • {new Date(report.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-500">
                      {typeof report.totalEstimatedSavings === 'number' 
                        ? `$${report.totalEstimatedSavings.toLocaleString()}`
                        : report.totalEstimatedSavings}
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Ahorro Est.</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-violet-500 group-hover:text-white transition-colors">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
