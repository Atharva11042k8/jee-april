import React, { useState } from 'react';
import { PlanningTable, Column, TableRow, SubColumn } from '../types';
import { Plus, Trash2, ChevronRight, ChevronDown, Maximize2, Minimize2, Save } from 'lucide-react';

interface TableBuilderProps {
  initialTables: PlanningTable[];
}

export const TableBuilder: React.FC<TableBuilderProps> = ({ initialTables }) => {
  const [tables, setTables] = useState<PlanningTable[]>(initialTables);
  const [activeTableId, setActiveTableId] = useState<string>(initialTables[0]?.id || '');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const activeTable = tables.find(t => t.id === activeTableId);

  // --- Actions ---

  const addTable = () => {
    const newTable: PlanningTable = {
      id: Date.now().toString(),
      name: 'New Tracker',
      columns: [{ id: 'c1', title: 'Item', type: 'simple' }],
      rows: []
    };
    setTables([...tables, newTable]);
    setActiveTableId(newTable.id);
  };

  const addRow = () => {
    if (!activeTable) return;
    const newRow: TableRow = {
      id: Date.now().toString(),
      data: {},
      isExpanded: false
    };
    const updatedTable = { ...activeTable, rows: [...activeTable.rows, newRow] };
    updateTable(updatedTable);
  };

  const updateTable = (updated: PlanningTable) => {
    setTables(tables.map(t => t.id === updated.id ? updated : t));
  };

  const handleCellChange = (rowId: string, colId: string, val: string, subColId?: string) => {
    if (!activeTable) return;
    const updatedRows = activeTable.rows.map(row => {
      if (row.id !== rowId) return row;
      
      const newData = { ...row.data };
      
      if (subColId) {
        // Handle Nested Update
        const currentGroupData = (newData[colId] as Record<string, string>) || {};
        newData[colId] = { ...currentGroupData, [subColId]: val };
      } else {
        // Simple Update
        newData[colId] = val;
      }
      return { ...row, data: newData };
    });
    updateTable({ ...activeTable, rows: updatedRows });
  };

  const toggleRowExpand = (rowId: string) => {
     if(!activeTable) return;
     const updatedRows = activeTable.rows.map(r => r.id === rowId ? {...r, isExpanded: !r.isExpanded} : r);
     updateTable({...activeTable, rows: updatedRows});
  }

  const updateRowNotes = (rowId: string, notes: string) => {
    if(!activeTable) return;
    const updatedRows = activeTable.rows.map(r => r.id === rowId ? {...r, notes} : r);
    updateTable({...activeTable, rows: updatedRows});
  }

  if (tables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-neutral-500">
        <Plus className="w-12 h-12 mb-4 opacity-50"/>
        <p>No tables created yet.</p>
        <button onClick={addTable} className="mt-4 text-indigo-400 hover:underline">Create your first tracker</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Table Selector Tabs - Hidden in fullscreen mode */}
      {!isFullScreen && (
        <div className="flex items-center gap-2 overflow-x-auto border-b border-neutral-800 pb-1">
            {tables.map(table => (
            <button
                key={table.id}
                onClick={() => setActiveTableId(table.id)}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTableId === table.id
                    ? 'bg-neutral-800 text-indigo-400 border-b-2 border-indigo-500'
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/50'
                }`}
            >
                {table.name}
            </button>
            ))}
            <button onClick={addTable} className="p-2 text-neutral-500 hover:text-indigo-400 transition-colors">
            <Plus className="w-5 h-5" />
            </button>
        </div>
      )}

      {activeTable && (
        <div className={`${
            isFullScreen 
                ? 'fixed inset-0 z-[100] bg-black p-4 w-screen h-screen flex flex-col' 
                : 'flex-1 flex flex-col min-h-0 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg'
        }`}>
            {/* Toolbar */}
            <div className={`p-3 border-b border-neutral-800 bg-neutral-900/80 flex justify-between items-center backdrop-blur shrink-0 ${isFullScreen ? 'rounded-t-xl' : ''}`}>
                <div className="flex gap-2 items-center">
                    <button onClick={addRow} className="flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded transition-colors">
                        <Plus className="w-3 h-3 mr-1" /> Add Row
                    </button>
                     <div className="h-6 w-[1px] bg-neutral-700 mx-2"></div>
                    <span className="text-xs text-neutral-500 flex items-center">
                        <Save className="w-3 h-3 mr-1 opacity-70"/> Auto-save active
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                     <div className="text-xs text-neutral-500 hidden sm:block">
                        {activeTable.rows.length} rows • {activeTable.columns.length} columns
                    </div>
                    <button 
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                        title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                    >
                        {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                </div>
            </div>

          {/* Actual Table Render */}
          <div className="flex-1 overflow-auto bg-black/20">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black sticky top-0 z-10 shadow-sm shadow-neutral-950">
                {/* Level 1 Header: Main Columns & Group Parents */}
                <tr>
                  <th rowSpan={2} className="p-3 w-10 border-b border-r border-neutral-800 bg-black"></th>
                  {activeTable.columns.map(col => (
                    <th
                      key={col.id}
                      colSpan={col.type === 'grouped' ? col.subColumns?.length : 1}
                      rowSpan={col.type === 'simple' ? 2 : 1}
                      className={`p-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-r border-neutral-800 text-center ${col.type === 'grouped' ? 'bg-neutral-900/50' : 'bg-black'}`}
                    >
                      {col.title}
                    </th>
                  ))}
                  <th rowSpan={2} className="w-10 border-b border-neutral-800 bg-black"></th>
                </tr>
                {/* Level 2 Header: Sub Columns only */}
                <tr>
                  {activeTable.columns.map(col => {
                    if (col.type === 'grouped' && col.subColumns) {
                      return col.subColumns.map(sub => (
                        <th key={sub.id} className="p-2 text-[10px] font-medium text-neutral-500 border-b border-r border-neutral-800 bg-neutral-900/30 text-center min-w-[60px]">
                          {sub.title}
                        </th>
                      ));
                    }
                    return null;
                  })}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-neutral-800">
                {activeTable.rows.map(row => (
                    <React.Fragment key={row.id}>
                  <tr className="group hover:bg-neutral-800/40 transition-colors">
                    {/* Expand Toggle */}
                    <td className="p-2 text-center border-r border-neutral-800">
                        <button onClick={() => toggleRowExpand(row.id)} className="text-neutral-600 hover:text-indigo-400">
                            {row.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4"/>}
                        </button>
                    </td>

                    {/* Cells */}
                    {activeTable.columns.map(col => {
                      // Case 1: Grouped Column
                      if (col.type === 'grouped' && col.subColumns) {
                        return col.subColumns.map(sub => {
                          const cellData = row.data[col.id] as Record<string, string> | undefined;
                          const value = cellData ? cellData[sub.id] || '' : '';
                          return (
                            <td key={`${row.id}-${col.id}-${sub.id}`} className="p-1 border-r border-neutral-800">
                              <input
                                className="w-full bg-transparent text-sm text-neutral-300 px-2 py-1.5 text-center focus:bg-neutral-800 focus:outline-none rounded transition-colors"
                                value={value}
                                onChange={(e) => handleCellChange(row.id, col.id, e.target.value, sub.id)}
                              />
                            </td>
                          );
                        });
                      }
                      
                      // Case 2: Simple Column
                      const value = row.data[col.id] as string || '';
                      return (
                        <td key={`${row.id}-${col.id}`} className="p-1 border-r border-neutral-800">
                          <input
                            className="w-full bg-transparent text-sm text-neutral-200 px-3 py-2 focus:bg-neutral-800 focus:outline-none rounded transition-colors"
                            value={value}
                            onChange={(e) => handleCellChange(row.id, col.id, e.target.value)}
                          />
                        </td>
                      );
                    })}

                    {/* Row Actions */}
                    <td className="p-2 text-center">
                       <button className="text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Row Content */}
                  {row.isExpanded && (
                      <tr>
                          <td colSpan={100} className="p-0 bg-neutral-950/50 shadow-inner">
                              <div className="p-4 flex gap-4 border-b border-neutral-800">
                                  <div className="w-1 bg-indigo-600 rounded-full"></div>
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold text-neutral-500 uppercase mb-2">Detailed Notes for this row</p>
                                    <textarea 
                                        className="w-full bg-black border border-neutral-800 rounded p-3 text-sm text-neutral-300 focus:outline-none focus:border-indigo-500/50"
                                        placeholder="Add specific observations, question numbers, or strategies here..."
                                        rows={3}
                                        value={row.notes || ''}
                                        onChange={(e) => updateRowNotes(row.id, e.target.value)}
                                    />
                                  </div>
                              </div>
                          </td>
                      </tr>
                  )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
