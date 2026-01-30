import React, { useState } from 'react';
import { TextPlan } from '../types';
import { CheckSquare, Square, Plus, Trash, Calendar } from 'lucide-react';

interface TextPlannerProps {
  initialPlans: TextPlan[];
}

export const TextPlanner: React.FC<TextPlannerProps> = ({ initialPlans }) => {
  const [plans, setPlans] = useState<TextPlan[]>(initialPlans);
  const [newPlanTitle, setNewPlanTitle] = useState('');

  const toggleComplete = (id: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, isCompleted: !p.isCompleted } : p));
  };

  const deletePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  const addPlan = () => {
    if (!newPlanTitle.trim()) return;
    const newPlan: TextPlan = {
      id: Date.now().toString(),
      title: newPlanTitle,
      content: '- Add details...',
      type: 'Daily',
      isCompleted: false,
      createdAt: new Date().toLocaleDateString()
    };
    setPlans([newPlan, ...plans]);
    setNewPlanTitle('');
  };

  const updateContent = (id: string, newContent: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, content: newContent } : p));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 flex gap-2">
        <input 
          type="text" 
          placeholder="Add a new goal or checklist..." 
          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-200 focus:outline-none focus:border-indigo-600 placeholder-neutral-600"
          value={newPlanTitle}
          onChange={(e) => setNewPlanTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addPlan()}
        />
        <button 
          onClick={addPlan}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className={`flex flex-col p-5 rounded-xl border transition-all duration-300 ${
            plan.isCompleted 
              ? 'bg-neutral-900/50 border-neutral-800 opacity-60' 
              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                 <h4 className={`font-semibold text-lg ${plan.isCompleted ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>
                    {plan.title}
                 </h4>
                 <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded border border-neutral-700">{plan.type}</span>
                    <span className="text-xs text-neutral-600 flex items-center gap-1"><Calendar className="w-3 h-3"/> {plan.createdAt}</span>
                 </div>
              </div>
              <button onClick={() => toggleComplete(plan.id)} className="text-indigo-500 hover:text-indigo-400">
                {plan.isCompleted ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
              </button>
            </div>
            
            <textarea 
              className={`w-full bg-transparent resize-none focus:outline-none text-sm leading-relaxed flex-1 min-h-[100px] ${
                plan.isCompleted ? 'text-neutral-600' : 'text-neutral-400'
              }`}
              value={plan.content}
              onChange={(e) => updateContent(plan.id, e.target.value)}
              spellCheck={false}
            />

            <div className="flex justify-end mt-4 pt-3 border-t border-neutral-800">
               <button onClick={() => deletePlan(plan.id)} className="text-neutral-600 hover:text-red-400 transition-colors">
                  <Trash className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};