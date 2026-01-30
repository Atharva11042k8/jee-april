// --- Learning Notes Types ---

export type Subject = 'Physics' | 'Chemistry' | 'Maths';
export type MistakeType = 'Conceptual' | 'Silly' | 'Formula' | 'Misread Question' | 'Calculation';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type SourceType = 'PYQ' | 'Mock' | 'Book';

export interface LearningNote {
  id: string;
  subject: Subject;
  chapter: string;
  topic: string;
  sourceType: SourceType;
  mistakeType: MistakeType;
  difficulty: Difficulty;
  tags: string[];
  mainNotes: string;
  mistakeDescription: string;
  correctApproach: string;
  date: string;
  isExpanded?: boolean; // UI state
}

// --- Text Plan Types ---

export interface TextPlan {
  id: string;
  title: string;
  content: string; // Markdown/Text
  type: 'Daily' | 'Weekly' | 'Strategy';
  isCompleted: boolean;
  createdAt: string;
}

// --- Advanced Table Types ---

export interface SubColumn {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  title: string;
  type: 'simple' | 'grouped';
  subColumns?: SubColumn[]; // Only if type is grouped
  width?: number;
}

export type CellValue = string;

// Map of ColumnID -> Value (if simple) OR Map of SubColumnID -> Value (if grouped)
export interface RowData {
  [columnId: string]: CellValue | { [subColumnId: string]: CellValue };
}

export interface TableRow {
  id: string;
  data: RowData;
  notes?: string; // Expandable row content
  isExpanded?: boolean;
}

export interface PlanningTable {
  id: string;
  name: string;
  columns: Column[];
  rows: TableRow[];
}
