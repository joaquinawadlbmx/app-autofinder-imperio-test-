import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DiagnosticWizard from './components/DiagnosticWizard';
import ReportView from './components/ReportView';
import { AutomationReport, DiagnosticInput } from './types';
import { generateAutomationReport } from './services/ai';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState<AutomationReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<AutomationReport | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load reports from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('autofinder_reports');
    if (saved) {
      setReports(JSON.parse(saved));
    }
  }, []);

  // Save reports to local storage when they change
  useEffect(() => {
    localStorage.setItem('autofinder_reports', JSON.stringify(reports));
  }, [reports]);

  const handleDiagnosticComplete = async (input: DiagnosticInput) => {
    setIsProcessing(true);
    try {
      const newReport = await generateAutomationReport(input);
      setReports(prev => [newReport, ...prev]);
      setSelectedReport(newReport);
      setActiveTab('report');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please check your API key and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewReport = (report: AutomationReport) => {
    setSelectedReport(report);
    setActiveTab('report');
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-8 py-8 overflow-y-auto max-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <Dashboard 
                reports={reports} 
                onViewReport={handleViewReport} 
              />
            )}
            
            {activeTab === 'diagnostic' && (
              <DiagnosticWizard 
                onComplete={handleDiagnosticComplete} 
                isProcessing={isProcessing} 
              />
            )}

            {activeTab === 'report' && selectedReport && (
              <ReportView 
                report={selectedReport} 
                onBack={() => setActiveTab('dashboard')} 
              />
            )}

            {activeTab === 'history' && (
              <Dashboard 
                reports={reports} 
                onViewReport={handleViewReport} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

