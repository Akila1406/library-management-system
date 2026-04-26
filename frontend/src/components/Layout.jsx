import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, title }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <Header title={title} />
        <div className="content-inner">
          {children}
        </div>
      </main>

      <style jsx>{`
        .layout-container {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          margin-left: var(--sidebar-width);
          min-height: 100vh;
          background: #f8fafc;
        }

        .content-inner {
          padding: 0 2rem 2rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Layout;
