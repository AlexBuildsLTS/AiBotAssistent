import React from 'react';
import { Brain } from 'lucide-react';
import { modules } from './data/modules';
import ModuleCard from './components/ModuleCard';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-navy-950">
      <nav className="bg-navy-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-green-400" />
              <span className="ml-2 text-2xl font-bold text-white">AlexAI Assistant</span>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Master AI Development with Interactive Learning
          </h1>
          <p className="text-xl text-gray-300">
            Learn AI, ML, and Generative AI through hands-on experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Chatbot />
        </div>
      </main>
    </div>
  );
}

export default App;