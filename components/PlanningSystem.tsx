import React, { useState } from 'react';
import { MOCK_TABLES, MOCK_TEXT_PLANS } from '../constants';
import { TableBuilder } from './TableBuilder';
import { TextPlanner } from './TextPlanner';
import { FileText, Grid, Github } from 'lucide-react';

export const PlanningSystem: React.FC = () => {
  const [mode, setMode] = useState<'text' | 'table'>('table');

  const GOALS_GITHUB_URL = "https://github.com/Atharva11042k8/jee-april/edit/main/data/textPlans.ts";
  const TRACKERS_GITHUB_URL = "https://github.com/Atharva11042k8/jee-april/edit/main/data/tables.ts";

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-100">Strategy & Planning</h1>
          <p className="text-neutral-500 mt-1">Design your roadmap. Track every step.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Section Specific GitHub Button */}
          <a 
            href={mode === 'text' ? GOALS_GITHUB_URL : TRACKERS_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors"
            title={mode === 'text' ? "View Goals Source" : "View Trackers Source"}
          >
            <Github className="w-5 h-5" />
          </a>

          {/* Toggle Switch */}
          <div className="bg-neutral-900 p-1 rounded-lg border border-neutral-800 flex">
            <button 
              onClick={() => setMode('text')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'text' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Goals
            </button>
            <button 
               onClick={() => setMode('table')}
               className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'table' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Grid className="w-4 h-4 mr-2" />
              Trackers
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {mode === 'table' ? (
          <TableBuilder initialTables={MOCK_TABLES} />
        ) : (
          <TextPlanner initialPlans={MOCK_TEXT_PLANS} />
        )}
      </div>
    </div>
  );
};
