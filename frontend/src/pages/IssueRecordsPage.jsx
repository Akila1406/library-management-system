import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getIssues, returnBook } from '../services/api';
import { RotateCcw, X, AlertCircle } from 'lucide-react';

const IssueRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const { data } = await getIssues();
      setRecords(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReturn = (record) => {
    setSelectedRecord(record);
    setShowReturnModal(true);
  };

  const submitReturn = async (e) => {
    e.preventDefault();
    try {
      await returnBook(selectedRecord._id, { returnDate });
      setShowReturnModal(false);
      fetchRecords();
    } catch (err) {
      alert(err.response?.data?.message || 'Error returning book');
    }
  };

  return (
    <Layout title="Issue Records">
      <div className="table-container card">
        <table>
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Book</th>
              <th>Member</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Fine</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record._id}>
                <td>{record.issueId}</td>
                <td>{record.book?.title}</td>
                <td>{record.member?.name}</td>
                <td>{new Date(record.issueDate).toLocaleDateString()}</td>
                <td>{new Date(record.dueDate).toLocaleDateString()}</td>
                <td>{record.returnDate ? new Date(record.returnDate).toLocaleDateString() : '-'}</td>
                <td>{record.fineAmount > 0 ? <span className="text-error">₹{record.fineAmount}</span> : '₹0'}</td>
                <td>
                  <span className={`badge ${record.status === 'Issued' ? 'badge-warning' : 'badge-success'}`}>
                    {record.status}
                  </span>
                </td>
                <td>
                  {record.status === 'Issued' && (
                    <button className="btn btn-sm btn-outline" onClick={() => handleReturn(record)}>
                      <RotateCcw size={14} /> Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showReturnModal && (
        <div className="modal-overlay">
          <div className="modal-content card small-modal">
            <div className="modal-header">
              <h3>Return Book</h3>
              <button className="close-btn" onClick={() => setShowReturnModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={submitReturn}>
              <div className="record-details">
                <p><strong>Book:</strong> {selectedRecord.book?.title}</p>
                <p><strong>Member:</strong> {selectedRecord.member?.name}</p>
                <p><strong>Due Date:</strong> {new Date(selectedRecord.dueDate).toLocaleDateString()}</p>
              </div>

              <div className="input-group">
                <label>Return Date</label>
                <input 
                  type="date" 
                  value={returnDate} 
                  onChange={(e) => setReturnDate(e.target.value)} 
                  required 
                />
              </div>

              {new Date(returnDate) > new Date(selectedRecord.dueDate) && (
                <div className="fine-warning">
                  <AlertCircle size={18} />
                  <span>Late return! Fine will be calculated.</span>
                </div>
              )}

              <div className="modal-footer">
                <button type="button" className="btn" onClick={() => setShowReturnModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Return</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .btn-sm {
          padding: 0.4rem 0.8rem;
          font-size: 0.8rem;
        }

        .btn-outline {
          background: white;
          border: 1px solid var(--primary);
          color: var(--primary);
        }

        .btn-outline:hover {
          background: var(--primary);
          color: white;
        }

        .small-modal {
          max-width: 400px;
        }

        .record-details {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .record-details p {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .fine-warning {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #92400e;
          background: #fef3c7;
          padding: 0.75rem;
          border-radius: 8px;
          margin-top: 1rem;
          font-size: 0.85rem;
        }

        .text-error {
          color: var(--error);
          font-weight: 600;
        }
        
        /* Reuse modal styles */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .modal-footer { margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; }
        .close-btn { background: none; color: var(--text-muted); }
      `}</style>
    </Layout>
  );
};

export default IssueRecordsPage;
