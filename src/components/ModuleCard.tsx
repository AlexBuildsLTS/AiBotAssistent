import { BookOpen } from 'lucide-react';
import { Module } from '../types';

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  return (
    <div className="bg-navy-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <BookOpen className="w-6 h-6 text-green-400 mr-2" />
        <h3 className="text-xl font-semibold text-white">Module {module.id}</h3>
      </div>
      <h4 className="text-lg font-medium text-white mb-3">{module.title}</h4>
      <p className="text-gray-300 mb-4">{module.description}</p>
      <ul className="space-y-2">
        {module.topics.map((topic, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            {topic}
          </li>
        ))}
      </ul>
      <button className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
        Start Learning
      </button>
    </div>
  );
}