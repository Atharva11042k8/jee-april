import { learningNotes } from './data/learningNotes';
import { textPlans } from './data/textPlans';
import { tables } from './data/tables';
import { LearningNote, PlanningTable, TextPlan } from './types';

export const MOCK_NOTES: LearningNote[] = learningNotes as unknown as LearningNote[];
export const MOCK_TEXT_PLANS: TextPlan[] = textPlans as unknown as TextPlan[];
export const MOCK_TABLES: PlanningTable[] = tables as unknown as PlanningTable[];