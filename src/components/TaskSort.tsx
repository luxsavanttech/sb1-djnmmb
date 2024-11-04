import { ArrowDownAZ, ArrowDownUp, ArrowUpAZ, Calendar } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

export function TaskSort() {
  const { sortConfig, updateSortConfig } = useTaskContext();

  const sortOptions = [
    { value: 'title', label: 'Title', icon: sortConfig.direction === 'asc' ? ArrowDownAZ : ArrowUpAZ },
    { value: 'dueDate', label: 'Due Date', icon: Calendar },
    { value: 'priority', label: 'Priority', icon: ArrowDownUp },
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
      {sortOptions.map((option) => {
        const Icon = option.icon;
        const isActive = sortConfig.key === option.value;
        
        return (
          <button
            key={option.value}
            onClick={() => updateSortConfig({
              key: option.value,
              direction: isActive && sortConfig.direction === 'asc' ? 'desc' : 'asc'
            })}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}