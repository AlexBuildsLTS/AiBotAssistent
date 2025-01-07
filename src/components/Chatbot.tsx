import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Database, Calculator } from 'lucide-react';
import { Message, ChatMode } from '../types';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const executeSQLQuery = async (query: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8080/api/sql/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error('Failed to execute SQL query.');
    }

    const data = await response.json();
    return JSON.stringify(data, null, 2); // Format the results as JSON for display
  } catch (error) {
    console.error('Error:', error);
    return 'Error executing SQL query.';
  }
};

const solveMathProblem = (input: string): string => {
  try {
    const sanitizedInput = input.replace(/[^0-9+\-*/().]/g, '');
    if (!sanitizedInput) return "Please provide a valid mathematical expression";

    const result = Function(`return ${sanitizedInput}`)();
    return isNaN(result) ? "Invalid mathematical expression" : `${result}`;
  } catch {
    return "Invalid mathematical expression";
  }
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('ai');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (mode === 'math') {
        const result = solveMathProblem(input);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Mathematical Result: ${result}`,
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else if (mode === 'sql') {
        const sqlResult = await executeSQLQuery(input);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Query Result:\n${sqlResult}`,
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: "You are AlexAI Assistant, an expert in AI. Help users with clear responses.",
            },
            { role: 'user', content: input },
          ],
          model: 'gpt-3.5-turbo',
          max_tokens: 300,
          temperature: 0.2,
        });

        const content =
            completion.choices[0]?.message?.content ||
            "I apologize, but I couldn't generate a response. Please try again.";

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content,
          role: 'assistant',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but there was an error processing your request. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'sql':
        return <Database className="w-6 h-6 text-green-400 mr-2" />;
      case 'math':
        return <Calculator className="w-6 h-6 text-green-400 mr-2" />;
      default:
        return <Bot className="w-6 h-6 text-green-400 mr-2" />;
    }
  };

  const getModeName = () => {
    switch (mode) {
      case 'sql':
        return 'SQL Generator';
      case 'math':
        return 'Math Solver';
      default:
        return 'AlexAI Assistant';
    }
  };

  const getPlaceholder = () => {
    switch (mode) {
      case 'sql':
        return 'Describe the SQL query you need...';
      case 'math':
        return 'Enter a mathematical expression...';
      default:
        return 'Ask me anything about AI...';
    }
  };

  return (
      <div className="flex flex-col h-[600px] bg-navy-900 rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 bg-navy-800 rounded-t-lg">
          <div className="flex items-center">
            {getModeIcon()}
            <h2 className="text-xl font-semibold text-white">{getModeName()}</h2>
          </div>
          <select
              value={mode}
              onChange={(e) => setMode(e.target.value as ChatMode)}
              className="bg-navy-700 text-white px-3 py-1 rounded-md border border-navy-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="ai">AI Assistant</option>
            <option value="sql">SQL Generator</option>
            <option value="math">Math Solver</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
              <div
                  key={message.id}
                  className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                            ? 'bg-green-500 text-white'
                            : 'bg-navy-700 text-gray-100'
                    }`}
                >
                  {message.content}
                </div>
              </div>
          ))}
          {isLoading && (
              <div className="flex justify-start">
                <div className="bg-navy-700 text-gray-100 p-3 rounded-lg">Thinking...</div>
              </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 bg-navy-800 rounded-b-lg">
          <div className="flex space-x-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={getPlaceholder()}
                className="flex-1 p-2 rounded-lg bg-navy-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
                type="submit"
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                disabled={isLoading}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
  );
}
