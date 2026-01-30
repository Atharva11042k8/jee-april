import React, { useState } from 'react';
import { NotesManager } from './components/NotesManager';
import { PlanningSystem } from './components/PlanningSystem';
import { MOCK_NOTES } from './constants';
import { BookOpen, Table, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'learning' | 'planning'>('learning');

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-indigo-500/30 flex flex-col">
      
      {/* Header & Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-neutral-100 tracking-tight hidden sm:inline-block">
              JEE <span className="text-indigo-500">Command</span>
            </span>
          </div>

          {/* Center Toggle */}
          <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveView('learning')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeView === 'learning'
                  ? 'bg-neutral-800 text-indigo-400 shadow-sm ring-1 ring-white/5'
                  : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learning Logs</span>
            </button>
            <button
              onClick={() => setActiveView('planning')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeView === 'planning'
                  ? 'bg-neutral-800 text-indigo-400 shadow-sm ring-1 ring-white/5'
                  : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>Planning</span>
            </button>
          </div>

          {/* Status Indicator (Right side placeholder) */}
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
             <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">SYSTEM ONLINE</span>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
          
          {activeView === 'learning' && (
             <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <NotesManager initialNotes={MOCK_NOTES} />
             </div>
          )}
          
          {activeView === 'planning' && (
             <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <PlanningSystem />
             </div>
          )}

        </div>
      </main>
      
      {/* Background Decor Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[120px] opacity-20"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neutral-900/40 rounded-full blur-[120px] opacity-20"></div>
      </div>
    </div>
  );
};

export default App;