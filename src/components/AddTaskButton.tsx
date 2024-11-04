import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddTaskModal } from './AddTaskModal';

export function AddTaskButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
      
      <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}