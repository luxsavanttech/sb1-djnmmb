import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Clock, ListTodo, CheckCircle2 } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';
import { useTaskContext } from '../context/TaskContext';

const columns = [
  { id: 'todo', title: 'To Do', icon: ListTodo },
  { id: 'in-progress', title: 'In Progress', icon: Clock },
  { id: 'completed', title: 'Completed', icon: CheckCircle2 },
];

export function TaskBoard() {
  const { filteredTasks, moveTask } = useTaskContext();

  return (
    <>
      <TaskFilters />
      <DragDropContext onDragEnd={moveTask}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter((task) => task.status === column.id);
            const Icon = column.icon;
            
            return (
              <div
                key={column.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h2 className="font-semibold text-gray-700 dark:text-gray-300">
                    {column.title}
                  </h2>
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm px-2 py-1 rounded">
                    {columnTasks.length}
                  </span>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-4"
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
}