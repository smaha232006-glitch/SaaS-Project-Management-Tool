
import { Task, User, Notification } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  email: 'alex@nexus.io',
  avatar: 'https://picsum.photos/seed/alex/200',
  role: 'Admin',
  plan: 'Pro'
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Implement OAuth Login',
    description: 'Integrate Google and GitHub OAuth providers for user authentication.',
    status: 'todo',
    priority: 'high',
    assigneeId: 'u1',
    dueDate: '2024-05-20',
    tags: ['Auth', 'Backend']
  },
  {
    id: 't2',
    title: 'Mobile Responsive Audit',
    description: 'Review all dashboard components on viewport sizes below 768px.',
    status: 'in-progress',
    priority: 'medium',
    assigneeId: 'u2',
    dueDate: '2024-05-18',
    tags: ['UI/UX', 'Mobile']
  },
  {
    id: 't3',
    title: 'Database Index Optimization',
    description: 'Analyze slow queries and add indexes to task and project tables.',
    status: 'review',
    priority: 'urgent',
    assigneeId: 'u1',
    dueDate: '2024-05-15',
    tags: ['Infra', 'DB']
  },
  {
    id: 't4',
    title: 'Write Documentation',
    description: 'Create API documentation for the new collaboration endpoints.',
    status: 'done',
    priority: 'low',
    assigneeId: 'u3',
    dueDate: '2024-05-10',
    tags: ['Docs']
  }
];

export const TEAM_MEMBERS: User[] = [
  CURRENT_USER,
  { id: 'u2', name: 'Jordan Smith', email: 'jordan@nexus.io', avatar: 'https://picsum.photos/seed/jordan/200', role: 'Member', plan: 'Pro' },
  { id: 'u3', name: 'Sarah Chen', email: 'sarah@nexus.io', avatar: 'https://picsum.photos/seed/sarah/200', role: 'Member', plan: 'Pro' },
  { id: 'u4', name: 'Michael Bell', email: 'mike@nexus.io', avatar: 'https://picsum.photos/seed/mike/200', role: 'Viewer', plan: 'Free' }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Task Assigned', message: 'Sarah assigned you to "Database Index Optimization"', time: '2m ago', read: false, type: 'info' },
  { id: 'n2', title: 'Review Complete', message: 'Your PR #42 was merged by Jordan', time: '1h ago', read: true, type: 'success' }
];
