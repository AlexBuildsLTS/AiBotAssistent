export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  topics: string[];
}