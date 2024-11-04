import { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskFilters {
  search: string;
  priority: string;
  tag: string;
  availableTags: string[];
}

interface SortConfig {
  key: keyof Task | '';
  direction: 'asc' | 'desc';
}

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filters: TaskFilters;
  sortConfig: SortConfig;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  moveTask: (result: any) => void;
  updateFilters: (newFilters: Partial<TaskFilters>) => void;
  updateSortConfig: (config: SortConfig) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Implementation',
    description: 'Create a comprehensive design system for consistent UI/UX',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-03-20',
    tags: ['design', 'ui'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Integrate third-party APIs for enhanced functionality',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-03-25',
    tags: ['backend', 'api'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'User Testing',
    description: 'Conduct user testing sessions for feedback',
    status: 'completed',
    priority: 'low',
    dueDate: '2024-03-15',
    tags: ['testing', 'ux'],
    createdAt: new Date().toISOString(),
  },
];

const priorityOrder = {
  high: 3,
  medium: 2,
  low: 1,
};

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    priority: '',
    tag: '',
    availableTags: [],
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: '',
    direction: 'asc',
  });
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    // Update available tags
    const tags = new Set<string>();
    tasks.forEach((task) => {
      task.tags.forEach((tag) => tags.add(tag));
    });
    setFilters((prev) => ({
      ...prev,
      availableTags: Array.from(tags).sort(),
    }));

    // Apply filters
    let result = [...tasks];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.priority) {
      result = result.filter((task) => task.priority === filters.priority);
    }

    if (filters.tag) {
      result = result.filter((task) => task.tags.includes(filters.tag));
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for priority
        if (sortConfig.key === 'priority') {
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredTasks(result);
  }, [tasks, filters.search, filters.priority, filters.tag, sortConfig]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const moveTask = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    
    reorderedItem.status = result.destination.droppableId;
    
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  const updateFilters = (newFilters: Partial<TaskFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const updateSortConfig = (config: SortConfig) => {
    setSortConfig(config);
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        filteredTasks, 
        filters, 
        sortConfig,
        addTask, 
        moveTask, 
        updateFilters,
        updateSortConfig,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}