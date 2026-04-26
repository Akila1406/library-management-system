import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = ({ title }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  return (
    <header className="header glass">
      <h1 className="page-title">{title}</h1>
      <div className="header-actions">
        <button className="icon-btn"><Bell size={20} /></button>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{userInfo.name || 'Admin'}</span>
            <span className="user-role">Administrator</span>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 50;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border);
        }

        .page-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-btn {
          background: none;
          color: var(--text-muted);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
        }
      `}</style>
    </header>
  );
};

export default Header;
