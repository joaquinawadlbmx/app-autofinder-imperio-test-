import React, { useState } from 'react';
import { DiagnosticInput } from '../types';
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DiagnosticWizardProps {
  onComplete: (input: DiagnosticInput) => void;
  isProcessing: boolean;
}

export default function DiagnosticWizard({ onComplete, isProcessing }: DiagnosticWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DiagnosticInput>({
    businessName: '',
    industry: '',
    techStack: [],
    painPoints: '',
    employeeCount: '1-10'
  });

  const industries = ['E-commerce', 'Real Estate', 'SaaS', 'Healthcare', 'Legal', 'Manufacturing', 'Other'];
  const commonTools = ['Excel/Sheets', 'Slack', 'Trello/Asana', 'HubSpot/Salesforce', 'Zapier', 'Mailchimp', 'QuickBooks'];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const toggleTool = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tool)
        ? prev.techStack.filter(t => t !== tool)
        : [...prev.techStack, tool]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= i ? 'bg-violet-500 text-white glow-violet' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {step > i ? <CheckCircle2 size={20} /> : i}
              </div>
              {i < 3 && <div className={`w-24 h-1 mx-2 rounded-full ${step > i ? 'bg-violet-500' : 'bg-zinc-800'}`} />}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold">
          {step === 1 && "Business Foundations"}
          {step === 2 && "Operational Stack"}
          {step === 3 && "Identify Pain Points"}
        </h2>
        <p className="text-zinc-400">Tell us about the business to find the best automation opportunities.</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card p-8 space-y-6"
        >
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Industry</label>
                <select
                  value={formData.industry}
                  onChange={e => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 transition-colors"
                >
                  <option value="">Select Industry</option>
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Employee Count</label>
                <div className="grid grid-cols-3 gap-3">
                  {['1-10', '11-50', '50+'].map(size => (
                    <button
                      key={size}
                      onClick={() => setFormData({ ...formData, employeeCount: size })}
                      className={`py-2 rounded-lg border transition-all ${
                        formData.employeeCount === size 
                          ? 'bg-violet-500/10 border-violet-500 text-violet-500' 
                          : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Current Tech Stack (Select all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {commonTools.map(tool => (
                  <button
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`px-4 py-3 rounded-xl border text-left transition-all ${
                      formData.techStack.includes(tool)
                        ? 'bg-violet-500/10 border-violet-500 text-violet-500'
                        : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">What are the main bottlenecks?</label>
                <textarea
                  value={formData.painPoints}
                  onChange={e => setFormData({ ...formData, painPoints: e.target.value })}
                  placeholder="e.g. Manual data entry from emails to sheets, slow response times to leads..."
                  className="w-full h-40 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <ArrowLeft size={20} />
                Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={!formData.businessName || !formData.industry}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-violet-500 text-white font-bold hover:bg-violet-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-violet"
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={() => onComplete(formData)}
                disabled={isProcessing || !formData.painPoints}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-violet-500 text-white font-bold hover:bg-violet-600 transition-all disabled:opacity-50 glow-violet"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Generate Report
                    <Zap size={20} />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
