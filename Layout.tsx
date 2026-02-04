
import * as React from 'react';
import { User, Notification } from './types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  notifications: Notification[];
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, notifications, activeView, setActiveView, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { id: 'board', icon: 'fa-columns', label: 'Kanban Board' },
    { id: 'list', icon: 'fa-list-check', label: 'Task List' },
    { id: 'team', icon: 'fa-users', label: 'Team Members' },
    { id: 'insights', icon: 'fa-chart-line', label: 'AI Insights' },
    { id: 'settings', icon: 'fa-gear', label: 'Settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col shrink-0`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <i className="fa-solid fa-layer-group text-white text-xl"></i>
          </div>
          {isSidebarOpen && <span className="font-bold text-xl text-white tracking-tight">Nexus</span>}
        </div>

        <nav className="flex-1 mt-6 px-3">
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${activeView === item.id ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800'}`}
                >
                  <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <i className={`fa-solid ${isSidebarOpen ? 'fa-angles-left' : 'fa-angles-right'} w-5 text-center`}></i>
            {isSidebarOpen && <span>Collapse Sidebar</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-slate-50 relative overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-slate-800 capitalize">
              {menuItems.find(m => m.id === activeView)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-400 hover:text-slate-600 transition-colors"
              >
                <i className="fa-regular fa-bell text-xl"></i>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                    <span className="font-semibold text-slate-800">Notifications</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-indigo-50/30' : ''}`}>
                        <div className="flex gap-3">
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.type === 'success' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{n.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl border border-slate-200 object-cover" />
            <button onClick={onLogout} title="Logout" className="text-slate-400 hover:text-rose-500 transition-colors">
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
