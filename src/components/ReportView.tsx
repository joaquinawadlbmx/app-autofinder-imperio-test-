import React from 'react';
import { AutomationReport } from '../types';
import { Download, Share2, ArrowLeft, Zap, CheckCircle2, BarChart3, Layers, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface ReportViewProps {
  report: AutomationReport;
  onBack: () => void;
}

export default function ReportView({ report, onBack }: ReportViewProps) {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-violet-500 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver al Panel
        </button>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800/20 text-zinc-500 hover:bg-zinc-800/10 transition-all">
            <Download size={18} />
            PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-all glow-violet">
            <Share2 size={18} />
            Compartir Reporte
          </button>
        </div>
      </div>

      <header className="glass-card p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-3xl -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-violet-500 font-bold uppercase tracking-widest text-xs mb-4">
            <Zap size={14} className="fill-violet-500" />
            Reporte de Estrategia de Automatización
          </div>
          <h1 className="text-5xl font-display font-bold tracking-tight mb-4">{report.businessName}</h1>
          <div className="flex gap-6 text-zinc-500">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} />
              {report.industry}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              {report.opportunities.length} Oportunidades Detectadas
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold">Oportunidades Detectadas</h2>
            <div className="grid grid-cols-1 gap-4">
              {report.opportunities.map((opp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 hover:border-violet-500/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-2 inline-block ${
                        opp.complexity === 'Baja' || opp.complexity === 'Low' ? 'bg-emerald-500/10 text-emerald-500' :
                        opp.complexity === 'Media' || opp.complexity === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        Complejidad {opp.complexity}
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-violet-500 transition-colors">{opp.title}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-500">
                        {typeof opp.estimatedPrice === 'number' ? `$${opp.estimatedPrice.toLocaleString()}` : opp.estimatedPrice}
                      </p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Implementación Est.</p>
                    </div>
                  </div>
                  <p className="text-zinc-500 mb-6">{opp.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {opp.toolsRecommended.map(tool => (
                      <span key={tool} className="px-3 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-400 border border-zinc-700/50">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <p className="text-xs text-emerald-500/70 uppercase font-bold tracking-widest mb-1">Beneficio ROI</p>
                    <p className="text-emerald-500 font-medium">{opp.benefitROI}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="glass-card p-6 glow-emerald">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <DollarSign size={20} className="text-emerald-500" />
              Impacto Financiero
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-emerald-500">
                  {typeof report.totalEstimatedSavings === 'number' 
                    ? `$${report.totalEstimatedSavings.toLocaleString()}`
                    : report.totalEstimatedSavings}
                </p>
                <p className="text-xs text-zinc-500">Ahorro Anual Estimado</p>
              </div>
              <div className="h-px bg-zinc-800/20" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Costo de Implementación</span>
                  <span className="font-medium">$4,500 - $12,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Periodo de Recuperación</span>
                  <span className="font-medium">~3.5 Meses</span>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Layers size={20} className="text-violet-500" />
              Próximos Pasos
            </h3>
            <div className="space-y-4">
              {report.nextSteps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-zinc-500">{step}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-violet-500 text-white font-bold rounded-xl hover:bg-violet-600 transition-all glow-violet">
              Agendar Llamada de Estrategia
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
