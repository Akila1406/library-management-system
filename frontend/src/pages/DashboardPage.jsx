import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getStats } from '../services/api';
import { 
  BookOpen, 
  Users, 
  ArrowUpRight, 
  ArrowDownLeft,
  Loader2
} from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Layout title="Dashboard">
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    </Layout>
  );

  const cards = [
    { title: 'Total Books', value: stats?.totalBooks || 0, icon: <BookOpen />, color: '#6366f1' },
    { title: 'Total Members', value: stats?.totalMembers || 0, icon: <Users />, color: '#8b5cf6' },
    { title: 'Issued Books', value: stats?.issuedBooks || 0, icon: <ArrowUpRight />, color: '#f59e0b' },
    { title: 'Returned Books', value: stats?.returnedBooks || 0, icon: <ArrowDownLeft />, color: '#10b981' },
  ];

  return (
    <Layout title="Dashboard">
      <div className="dashboard-grid">
        {cards.map((card, i) => (
          <div key={i} className="card stat-card">
            <div className="card-icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
              {card.icon}
            </div>
            <div className="card-info">
              <span className="card-label">{card.title}</span>
              <h3 className="card-value">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="card welcome-card">
        <h2>Quick Overview</h2>
        <p>Manage your library efficiently with the modern LMS dashboard. Use the sidebar to navigate through different modules.</p>
      </div>

      <style jsx>{`
        .stat-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .card-icon {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-info {
          display: flex;
          flex-direction: column;
        }

        .card-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .card-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .welcome-card {
          background: linear-gradient(to right, #ffffff, #f1f5f9);
          border-left: 4px solid var(--primary);
        }

        .welcome-card h2 {
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }

        .welcome-card p {
          color: var(--text-muted);
          max-width: 600px;
        }
      `}</style>
    </Layout>
  );
};

export default DashboardPage;
