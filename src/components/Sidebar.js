import React from 'react';

const Sidebar = ({ onViewChange, currentView }) => {
  const handleNavClick = (view) => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <nav className="sidebar">
      <div className="logo">
        <div className="logo-icon">SS</div>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <button type="button" className="nav-link">
            <i className="fas fa-search"></i>
          </button>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link">
            <i className="fas fa-building"></i>
          </button>
        </li>
        <li className={`nav-item ${currentView === 'assets' ? 'active' : ''}`}>
          <button type="button" className="nav-link" onClick={() => handleNavClick('assets')}>
            <i className="fas fa-chart-bar"></i>
          </button>
        </li>
        <li className={`nav-item ${currentView === 'tasks' ? 'active' : ''}`}>
          <button type="button" className="nav-link" onClick={() => handleNavClick('tasks')}>
            <i className="fas fa-list"></i>
          </button>
        </li>
        <li className={`nav-item ${currentView === 'clients' ? 'active' : ''}`}>
          <button type="button" className="nav-link" onClick={() => handleNavClick('clients')}>
            <i className="fas fa-users"></i>
          </button>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link">
            <i className="fas fa-calendar"></i>
          </button>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link">
            <i className="fas fa-box"></i>
          </button>
        </li>
      </ul>
      <div className="nav-bottom">
        <button type="button" className="nav-link">
          <i className="fas fa-question-circle"></i>
        </button>
        <button type="button" className="nav-link">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar; 