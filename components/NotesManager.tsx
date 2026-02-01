import React, { useState } from 'react';
import { LearningNote, Subject, MistakeType } from '../types';
import { Search, Plus, Trash2, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Book, Github } from 'lucide-react';

interface NotesManagerProps {
  initialNotes: LearningNote[];
}

export const NotesManager: React.FC<NotesManagerProps> = ({ initialNotes }) => {
  const [notes, setNotes] = useState<LearningNote[]>(initialNotes);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState<Subject | 'All'>('All');
  
  const SECTION_GITHUB_URL = "https://github.com/notes";

  // Form State
  const [newNote, setNewNote] = useState<Partial<LearningNote>>({
    subject: 'Physics',
    difficulty: 'Medium',
    sourceType: 'PYQ',
    mistakeType: 'Conceptual',
    tags: []
  });

  const handleAddNote = () => {
    if (!newNote.chapter || !newNote.mainNotes) return; // Basic validation

    const note: LearningNote = {
      id: Date.now().toString(),
      subject: newNote.subject as Subject,
      chapter: newNote.chapter || '',
      topic: newNote.topic || '',
      sourceType: newNote.sourceType as any,
      mistakeType: newNote.mistakeType as MistakeType,
      difficulty: newNote.difficulty as any,
      tags: newNote.tags || [],
      mainNotes: newNote.mainNotes || '',
      mistakeDescription: newNote.mistakeDescription || '',
      correctApproach: newNote.correctApproach || '',
      date: new Date().toISOString().split('T')[0],
      isExpanded: false
    };

    setNotes([note, ...notes]);
    setIsAdding(false);
    setNewNote({ subject: 'Physics', difficulty: 'Medium', sourceType: 'PYQ', mistakeType: 'Conceptual', tags: [] });
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const toggleExpand = (id: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, isExpanded: !n.isExpanded } : n));
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.chapter.toLowerCase().includes(search.toLowerCase()) || 
                          n.mainNotes.toLowerCase().includes(search.toLowerCase()) ||
                          n.topic.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = filterSubject === 'All' || n.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const getSubjectColor = (sub: Subject) => {
    switch (sub) {
      case 'Physics': return 'bg-cyan-950/30 text-cyan-400 border-cyan-900/50';
      case 'Chemistry': return 'bg-emerald-950/30 text-emerald-400 border-emerald-900/50';
      case 'Maths': return 'bg-rose-950/30 text-rose-400 border-rose-900/50';
      case 'Miscellaneous': return 'bg-red-950/30 text-rose-400 border-rose-900/50';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-100">Learning Logs</h1>
          <p className="text-neutral-500 mt-1">Capture every mistake, analyze every trap.</p>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href={SECTION_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors"
            title="View Notes Source"
          >
            <Github className="w-5 h-5" />
          </a>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-5 h-5 mr-2" /> New Entry
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-neutral-900 p-4 rounded-xl border border-neutral-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search chapters, concepts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {(['All', 'Physics', 'Chemistry', 'Maths','Miscellaneous'] as const).map(sub => (
            <button
              key={sub}
              onClick={() => setFilterSubject(sub)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border whitespace-nowrap transition-all ${
                filterSubject === sub 
                  ? 'bg-neutral-800 text-white border-neutral-700' 
                  : 'bg-transparent text-neutral-500 border-transparent hover:bg-neutral-900 hover:text-neutral-300'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Note Modal (Inline for simplicity) */}
      {isAdding && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <h3 className="text-lg font-semibold text-white mb-4">Add Learning Entry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select 
              value={newNote.subject} 
              onChange={e => setNewNote({...newNote, subject: e.target.value as any})}
              className="p-2 bg-black border border-neutral-800 rounded text-neutral-300 focus:outline-none focus:border-neutral-700"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Maths">Maths</option>
            </select>
            <input 
              placeholder="Chapter Name" 
              className="p-2 bg-black border border-neutral-800 rounded text-neutral-300 focus:outline-none focus:border-neutral-700"
              value={newNote.chapter}
              onChange={e => setNewNote({...newNote, chapter: e.target.value})}
            />
            <input 
              placeholder="Topic" 
              className="p-2 bg-black border border-neutral-800 rounded text-neutral-300 focus:outline-none focus:border-neutral-700"
              value={newNote.topic}
              onChange={e => setNewNote({...newNote, topic: e.target.value})}
            />
             <select 
              value={newNote.mistakeType} 
              onChange={e => setNewNote({...newNote, mistakeType: e.target.value as any})}
              className="p-2 bg-black border border-neutral-800 rounded text-neutral-300 focus:outline-none focus:border-neutral-700"
            >
              <option value="Conceptual">Conceptual Error</option>
              <option value="Silly">Silly Mistake</option>
              <option value="Formula">Forgot Formula</option>
              <option value="Misread Question">Misread Question</option>
            </select>
          </div>
          
          <textarea 
            placeholder="Main Learning Note / Concept..."
            className="w-full p-3 bg-black border border-neutral-800 rounded mb-4 text-neutral-300 min-h-[80px] focus:outline-none focus:border-neutral-700"
            value={newNote.mainNotes}
            onChange={e => setNewNote({...newNote, mainNotes: e.target.value})}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <textarea 
               placeholder="What went wrong?"
               className="w-full p-3 bg-red-950/10 border border-red-900/20 rounded text-red-200 text-sm focus:outline-none focus:border-red-900/40"
               value={newNote.mistakeDescription}
               onChange={e => setNewNote({...newNote, mistakeDescription: e.target.value})}
            />
             <textarea 
               placeholder="Correct approach / Fix"
               className="w-full p-3 bg-emerald-950/10 border border-emerald-900/20 rounded text-emerald-200 text-sm focus:outline-none focus:border-emerald-900/40"
               value={newNote.correctApproach}
               onChange={e => setNewNote({...newNote, correctApproach: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-neutral-400 hover:text-white">Cancel</button>
            <button onClick={handleAddNote} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">Save Entry</button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="grid gap-4">
        {filteredNotes.map(note => (
          <div key={note.id} className="group bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300">
            {/* Note Header */}
            <div 
              className="p-4 cursor-pointer flex flex-col md:flex-row gap-4 md:items-center justify-between"
              onClick={() => toggleExpand(note.id)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getSubjectColor(note.subject)}`}>
                    {note.subject}
                  </span>
                  <span className="text-neutral-500 text-sm flex items-center gap-1">
                     <Book className="w-3 h-3" /> {note.chapter}
                  </span>
                  <span className="text-xs text-neutral-600">• {note.date}</span>
                </div>
                <h4 className="text-lg font-medium text-neutral-200 line-clamp-1">{note.mainNotes}</h4>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="flex flex-col items-end">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">{note.sourceType}</span>
                    <span className={`text-xs ${note.difficulty === 'Hard' ? 'text-red-400' : 'text-yellow-500'}`}>{note.difficulty}</span>
                 </div>
                 <button className="p-2 text-neutral-600 hover:bg-neutral-800 rounded-full transition-colors">
                    {note.isExpanded ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                 </button>
              </div>
            </div>

            {/* Expandable Content */}
            {note.isExpanded && (
              <div className="px-4 pb-4 border-t border-neutral-800 bg-black/20 animate-in slide-in-from-top-2 duration-200">
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                   <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-red-400 mb-2">
                         <AlertCircle className="w-4 h-4" /> Mistake Analysis
                      </label>
                      <p className="text-neutral-400 text-sm leading-relaxed bg-red-950/10 p-3 rounded-lg border border-red-900/20">
                        {note.mistakeDescription || "No detailed description provided."}
                      </p>
                   </div>
                   <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-emerald-400 mb-2">
                         <CheckCircle2 className="w-4 h-4" /> Correct Approach
                      </label>
                      <p className="text-neutral-400 text-sm leading-relaxed bg-emerald-950/10 p-3 rounded-lg border border-emerald-900/20">
                        {note.correctApproach || "No correct approach noted."}
                      </p>
                   </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between items-center">
                   <div className="flex gap-2">
                      {note.tags.map(tag => (
                        <span key={tag} className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">#{tag}</span>
                      ))}
                      <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded border border-neutral-700">Type: {note.mistakeType}</span>
                   </div>
                   <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400 px-3 py-1 rounded hover:bg-red-500/10 transition-colors"
                   >
                     <Trash2 className="w-3 h-3" /> Delete
                   </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filteredNotes.length === 0 && (
          <div className="text-center py-20 text-neutral-600">
            <p>No notes found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
