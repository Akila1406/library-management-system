import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getMembers, addMember, updateMember, deleteMember } from '../services/api';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [formData, setFormData] = useState({
    memberId: '', name: '', email: '', phone: '', address: '', status: 'Active'
  });

  useEffect(() => {
    fetchMembers();
  }, [search]);

  const fetchMembers = async () => {
    try {
      const { data } = await getMembers(search);
      setMembers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setFormData(member);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteMember(id);
        fetchMembers();
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting member');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentMember) {
        await updateMember(currentMember._id, formData);
      } else {
        await addMember(formData);
      }
      setShowModal(false);
      setFormData({ memberId: '', name: '', email: '', phone: '', address: '', status: 'Active' });
      setCurrentMember(null);
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving member');
    }
  };

  return (
    <Layout title="Member Management">
      <div className="page-actions">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => { setCurrentMember(null); setFormData({ memberId: '', name: '', email: '', phone: '', address: '', status: 'Active' }); setShowModal(true); }}>
          <Plus size={18} /> Add New Member
        </button>
      </div>

      <div className="table-container card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member._id}>
                <td>{member.memberId}</td>
                <td className="font-semibold">{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>
                  <span className={`badge ${member.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                    {member.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="action-btn edit" onClick={() => handleEdit(member)}><Edit2 size={16} /></button>
                  <button className="action-btn delete" onClick={() => handleDelete(member._id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <div className="modal-header">
              <h3>{currentMember ? 'Edit Member' : 'Add New Member'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label>Member ID</label>
                  <input type="text" value={formData.memberId} onChange={(e) => setFormData({...formData, memberId: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Phone</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                </div>
                <div className="input-group span-2">
                  <label>Address</label>
                  <textarea rows="2" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required></textarea>
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .span-2 { grid-column: span 2; }
        /* Reuse styles from BooksPage */
        .page-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; gap: 1rem; }
        .search-bar { flex: 1; max-width: 400px; position: relative; }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .search-bar input { padding-left: 40px; width: 100%; border-radius: 10px; border: 1px solid var(--border); padding: 0.75rem 0.75rem 0.75rem 40px; }
        .actions { display: flex; gap: 0.5rem; }
        .action-btn { padding: 0.5rem; border-radius: 6px; background: #f1f5f9; }
        .action-btn.edit { color: var(--primary); }
        .action-btn.delete { color: var(--error); }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { width: 90%; max-width: 600px; padding: 2rem; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .modal-footer { margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; }
        .close-btn { background: none; color: var(--text-muted); }
      `}</style>
    </Layout>
  );
};

export default MembersPage;
