import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getBooks, addBook, updateBook, deleteBook } from '../services/api';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({
    bookId: '', title: '', author: '', category: '', isbn: '', publisher: '', totalCopies: 1, availableCopies: 1
  });

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      const { data } = await getBooks(search);
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setFormData(book);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        fetchBooks();
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting book');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentBook) {
        await updateBook(currentBook._id, formData);
      } else {
        await addBook(formData);
      }
      setShowModal(false);
      setFormData({ bookId: '', title: '', author: '', category: '', isbn: '', publisher: '', totalCopies: 1, availableCopies: 1 });
      setCurrentBook(null);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving book');
    }
  };

  return (
    <Layout title="Book Management">
      <div className="page-actions">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by title, author, or category..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => { setCurrentBook(null); setFormData({ bookId: '', title: '', author: '', category: '', isbn: '', publisher: '', totalCopies: 1, availableCopies: 1 }); setShowModal(true); }}>
          <Plus size={18} /> Add New Book
        </button>
      </div>

      <div className="table-container card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Copies</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.bookId}</td>
                <td className="font-semibold">{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.availableCopies} / {book.totalCopies}</td>
                <td>
                  <span className={`badge ${book.status === 'Available' ? 'badge-success' : 'badge-error'}`}>
                    {book.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="action-btn edit" onClick={() => handleEdit(book)}><Edit2 size={16} /></button>
                  <button className="action-btn delete" onClick={() => handleDelete(book._id)}><Trash2 size={16} /></button>
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
              <h3>{currentBook ? 'Edit Book' : 'Add New Book'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label>Book ID</label>
                  <input type="text" value={formData.bookId} onChange={(e) => setFormData({...formData, bookId: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Author</label>
                  <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Category</label>
                  <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>ISBN</label>
                  <input type="text" value={formData.isbn} onChange={(e) => setFormData({...formData, isbn: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Publisher</label>
                  <input type="text" value={formData.publisher} onChange={(e) => setFormData({...formData, publisher: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Total Copies</label>
                  <input type="number" value={formData.totalCopies} onChange={(e) => setFormData({...formData, totalCopies: parseInt(e.target.value), availableCopies: parseInt(e.target.value)})} required min="1" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Book</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .search-bar {
          flex: 1;
          max-width: 400px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-bar input {
          padding-left: 40px;
          width: 100%;
          border-radius: 10px;
          border: 1px solid var(--border);
          padding: 0.75rem 0.75rem 0.75rem 40px;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem;
          border-radius: 6px;
          background: #f1f5f9;
        }

        .action-btn.edit { color: var(--primary); }
        .action-btn.delete { color: var(--error); }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          width: 90%;
          max-width: 600px;
          padding: 2rem;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .modal-footer {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        .close-btn {
          background: none;
          color: var(--text-muted);
        }
      `}</style>
    </Layout>
  );
};

export default BooksPage;
