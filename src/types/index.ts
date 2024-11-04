export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  tags: string[];
  createdAt: string;
}

export interface User {
  name: string;
  tasks: Task[];
  preferences: {
    theme: 'light' | 'dark';
    taskView: 'list' | 'board';
  };
}