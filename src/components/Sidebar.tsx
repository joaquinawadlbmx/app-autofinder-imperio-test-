import React from 'react';
import { LayoutDashboard, FileSearch, History, Settings, LogOut, Zap } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'diagnostic', icon: FileSearch, label: 'New Diagnostic' },
    { id: 'history', icon: History, label: 'History' },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 flex flex-col h-screen bg-zinc-950/50 backdrop-blur-xl sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center glow-violet">
          <Zap className="text-white w-6 h-6 fill-white" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight">AutoFinder</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-violet-500/10 text-violet-500 border border-violet-500/20'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
