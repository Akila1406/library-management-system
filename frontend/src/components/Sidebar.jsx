import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ArrowRightLeft, 
  LogOut,
  Library
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Books', icon: <BookOpen size={20} />, path: '/books' },
    { name: 'Members', icon: <Users size={20} />, path: '/members' },
    { name: 'Issue Book', icon: <ArrowRightLeft size={20} />, path: '/issue' },
    { name: 'Issue Records', icon: <Library size={20} />, path: '/records' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Library className="text-primary" size={32} />
        <span>LMS Admin</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={20} />
        Logout
      </button>

      <style jsx>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background: white;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
        }

        .sidebar-logo {
          padding: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .sidebar-nav {
          flex: 1;
          padding: 0 1rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          border-radius: 8px;
          color: var(--text-muted);
          font-weight: 500;
          margin-bottom: 0.5rem;
          transition: all 0.2s;
        }

        .nav-link:hover {
          background: #f1f5f9;
          color: var(--primary);
        }

        .nav-link.active {
          background: #e0e7ff;
          color: var(--primary);
        }

        .logout-btn {
          margin: 1rem;
          padding: 0.875rem;
          border-radius: 8px;
          background: #fee2e2;
          color: #991b1b;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
        }

        .logout-btn:hover {
          background: #fecaca;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
