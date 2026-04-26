import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getBooks, getMembers, issueBook } from '../services/api';
import { BookOpen, User, Calendar, CheckCircle } from 'lucide-react';

const IssueBookPage = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    issueId: `ISS-${Date.now().toString().slice(-6)}`,
    bookId: '',
    memberId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, membersRes] = await Promise.all([getBooks(), getMembers()]);
        setBooks(booksRes.data.filter(b => b.availableCopies > 0));
        setMembers(membersRes.data.filter(m => m.status === 'Active'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await issueBook(formData);
      setSuccess(true);
      setFormData({
        issueId: `ISS-${Date.now().toString().slice(-6)}`,
        bookId: '',
        memberId: '',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: ''
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Error issuing book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Issue New Book">
      <div className="issue-container">
        <div className="card issue-card">
          {success && (
            <div className="success-banner">
              <CheckCircle size={20} /> Book issued successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Issue ID</label>
              <input type="text" value={formData.issueId} readOnly className="readonly" />
            </div>

            <div className="input-group">
              <label>Select Book</label>
              <div className="select-wrapper">
                <BookOpen size={18} className="input-icon" />
                <select 
                  value={formData.bookId} 
                  onChange={(e) => setFormData({...formData, bookId: e.target.value})}
                  required
                >
                  <option value="">Choose a book...</option>
                  {books.map(book => (
                    <option key={book._id} value={book._id}>
                      {book.title} ({book.bookId})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Select Member</label>
              <div className="select-wrapper">
                <User size={18} className="input-icon" />
                <select 
                  value={formData.memberId} 
                  onChange={(e) => setFormData({...formData, memberId: e.target.value})}
                  required
                >
                  <option value="">Choose a member...</option>
                  {members.map(member => (
                    <option key={member._id} value={member._id}>
                      {member.name} ({member.memberId})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Issue Date</label>
                <div className="select-wrapper">
                  <Calendar size={18} className="input-icon" />
                  <input 
                    type="date" 
                    value={formData.issueDate} 
                    onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Due Date</label>
                <div className="select-wrapper">
                  <Calendar size={18} className="input-icon" />
                  <input 
                    type="date" 
                    value={formData.dueDate} 
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    min={formData.issueDate}
                    required 
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary issue-btn" disabled={loading}>
              {loading ? 'Processing...' : 'Issue Book'}
            </button>
          </form>
        </div>

        <div className="issue-info card">
          <h3>Issuing Rules</h3>
          <ul>
            <li>Books can only be issued to <strong>Active</strong> members.</li>
            <li>Ensure the book has <strong>Available Copies</strong> before issuing.</li>
            <li>The due date must be after the issue date.</li>
            <li>Fine will be automatically calculated upon return if overdue.</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .issue-container {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
          align-items: start;
        }

        .issue-card {
          padding: 2.5rem;
        }

        .readonly {
          background: #f1f5f9 !important;
          color: var(--text-muted);
          cursor: not-allowed;
        }

        .select-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .select-wrapper select, .select-wrapper input {
          padding-left: 40px !important;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .issue-btn {
          width: 100%;
          padding: 1rem;
          justify-content: center;
          font-size: 1rem;
          margin-top: 1rem;
        }

        .success-banner {
          background: #dcfce7;
          color: #166534;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
        }

        .issue-info h3 {
          margin-bottom: 1.25rem;
          font-size: 1.1rem;
        }

        .issue-info ul {
          list-style: none;
        }

        .issue-info li {
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          position: relative;
          padding-left: 1.5rem;
        }

        .issue-info li::before {
          content: "•";
          color: var(--primary);
          font-weight: bold;
          position: absolute;
          left: 0;
        }
      `}</style>
    </Layout>
  );
};

export default IssueBookPage;
