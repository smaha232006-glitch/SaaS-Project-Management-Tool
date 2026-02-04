
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Member' | 'Viewer';
  plan: 'Free' | 'Pro' | 'Enterprise';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string;
  dueDate: string;
  tags: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}
