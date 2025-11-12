import React, { useState } from 'react';
import './Users.css';

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'Helmi Ridwan',
      role: 'Administrator',
      email: 'helmi@farmmonitoring.com',
      status: 'Active',
      lastLogin: '2 hours ago',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Operator',
      email: 'sarah@farmmonitoring.com', 
      status: 'Active',
      lastLogin: '1 day ago',
      avatar: '👩‍🌾'
    },
    {
      id: 3,
      name: 'Ahmad Santoso',
      role: 'Viewer',
      email: 'ahmad@farmmonitoring.com',
      status: 'Inactive',
      lastLogin: '3 days ago',
      avatar: '👨‍🔬'
    }
  ]);

  return (
    <div className="users-page">
      <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        <p>Kelola akses pengguna sistem monitoring pertanian</p>
        <button className="add-user-btn">
          <span>➕</span>
          Add New User
        </button>
      </div>

      <div className="users-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{users.filter(u => u.status === 'Active').length}</h3>
            <p>Active Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👑</div>
          <div className="stat-info">
            <h3>{users.filter(u => u.role === 'Administrator').length}</h3>
            <p>Administrators</p>
          </div>
        </div>
      </div>

      <div className="users-table">
        <div className="table-header">
          <h3>User List</h3>
          <div className="table-controls">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="search-input"
            />
            <select className="filter-select">
              <option value="all">All Roles</option>
              <option value="admin">Administrator</option>
              <option value="operator">Operator</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>

        <div className="table-content">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">
                {user.avatar}
              </div>
              <div className="user-info">
                <h4>{user.name}</h4>
                <p className="user-email">{user.email}</p>
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </div>
              <div className="user-status">
                <span className={`status-indicator ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
                <p className="last-login">Last login: {user.lastLogin}</p>
              </div>
              <div className="user-actions">
                <button className="edit-btn" title="Edit User">✏️</button>
                <button className="delete-btn" title="Delete User">🗑️</button>
                <button className="more-btn" title="More Options">⋮</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Users;