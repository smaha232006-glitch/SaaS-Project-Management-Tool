
import * as React from 'react';
import { Task, TaskStatus, Priority } from './types';

interface KanbanBoardProps {
  tasks: Task[];
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onAddTask: (status: TaskStatus) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, updateTaskStatus, onAddTask }) => {
  const [draggedTaskId, setDraggedTaskId] = React.useState<string | null>(null);
  const [overColumn, setOverColumn] = React.useState<TaskStatus | null>(null);

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: 'bg-slate-400' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-indigo-500' },
    { id: 'review', label: 'Review', color: 'bg-amber-500' },
    { id: 'done', label: 'Done', color: 'bg-emerald-500' },
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    setOverColumn(status);
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateTaskStatus(taskId, status);
    }
    setDraggedTaskId(null);
    setOverColumn(null);
  };

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'urgent': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'medium': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
      {columns.map(col => (
        <div 
          key={col.id} 
          className={`flex flex-col rounded-2xl p-4 transition-colors duration-200 ${overColumn === col.id ? 'bg-indigo-50/50 outline-2 outline-dashed outline-indigo-200' : 'bg-slate-100/50'}`}
          onDragOver={(e) => handleDragOver(e, col.id)}
          onDrop={(e) => handleDrop(e, col.id)}
          onDragLeave={() => setOverColumn(null)}
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${col.color}`}></span>
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">{col.label}</h3>
            </div>
            <button onClick={() => onAddTask(col.id)} className="text-slate-400 hover:text-indigo-600">
              <i className="fa-solid fa-plus text-sm"></i>
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto">
            {tasks.filter(t => t.status === col.id).map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all cursor-grab ${draggedTaskId === task.id ? 'opacity-40' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <img src={`https://picsum.photos/seed/${task.assigneeId}/50`} className="w-5 h-5 rounded-full" alt="av" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">{task.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{task.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1"><i className="fa-regular fa-comment"></i> 3</span>
                  <span className="flex items-center gap-1"><i className="fa-regular fa-calendar"></i> {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
