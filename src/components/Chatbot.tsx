import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { Message } from '../types';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, API calls should go through your backend
});

// Function to solve math problems
const solveMathProblem = (question: string) => {
  try {
    const result = eval(question);  // Basic eval to calculate the result (be cautious with real-world eval usage)
    return `The result is: ${result}`;
  } catch (error) {
    return "Sorry, I couldn't solve that. Please provide a valid math problem.";
  }
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat
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

    // Update state
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if the input is a math problem
      if (input.toLowerCase().includes("solve") || /\d/.test(input)) {
        const mathAnswer = solveMathProblem(input);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: mathAnswer,
          role: 'assistant',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
        return; // Prevent the OpenAI API call if it's a math question
      }

      // If not a math question, proceed with OpenAI API call
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
                'You are AlexAI Assistant, an expert in AI, ML, DL, and Generative AI. You help users learn about these topics in a clear and engaging way. Keep responses focused on the learning modules and AI-related topics.',
          },
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          {
            role: 'user',
            content: input, // Add the latest user input
          },
        ],
        model: 'gpt-3.5-turbo',
      });


      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
            completion.choices[0]?.message?.content ||
            'I apologize, but I couldn\'t generate a response. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };


      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
            'I apologize, but there was an error processing your request. Please make sure your OpenAI API key is properly configured.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
      <div className="flex flex-col h-[600px] bg-navy-900 rounded-lg shadow-xl">
        <div className="flex items-center p-4 bg-navy-800 rounded-t-lg">
          <Bot className="w-6 h-6 text-green-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">AlexAI Assistant</h2>
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
                <div className="bg-navy-700 text-gray-100 p-3 rounded-lg">
                  Thinking...
                </div>
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
                placeholder="Ask me anything about AI..."
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
