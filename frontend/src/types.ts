export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sqlQuery?: string;
  mathResult?: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  topics: string[];
}

export type ChatMode = 'ai' | 'sql' | 'math';