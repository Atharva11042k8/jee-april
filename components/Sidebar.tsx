import React from 'react';
import { BookOpen, Table, GraduationCap, Target } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'notes', label: 'Learning Logs', icon: BookOpen, desc: 'PYQ Analysis' },
    { id: 'plans', label: 'Strategy & Plans', icon: Target, desc: 'Text Goals' },
    { id: 'tables', label: 'Progress Tables', icon: Table, desc: 'Advanced Trackers' },
  ];

  return (
    <div className="w-20 lg:w-64 bg-black border-r border-neutral-800 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-neutral-800">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        <span className="hidden lg:block ml-3 font-bold text-lg text-neutral-100 tracking-tight">
          JEE <span className="text-indigo-500">Command</span>
        </span>
      </div>

      <nav className="flex-1 py-8 px-2 lg:px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-neutral-900 text-indigo-400 border border-neutral-800'
                  : 'text-neutral-500 hover:bg-neutral-900/50 hover:text-neutral-200'
              }`}
            >
              <item.icon
                className={`w-6 h-6 flex-shrink-0 ${
                  isActive ? 'text-indigo-400' : 'text-neutral-600 group-hover:text-neutral-400'
                }`}
              />
              <div className="hidden lg:block ml-3 text-left">
                <p className={`font-medium ${isActive ? 'text-neutral-200' : 'text-neutral-400'}`}>
                  {item.label}
                </p>
                <p className="text-xs text-neutral-600 mt-0.5">{item.desc}</p>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800 hidden lg:block">
        <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Status
          </p>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-neutral-400">System Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};