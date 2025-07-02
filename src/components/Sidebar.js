import React from 'react';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="logo">
        <div className="logo-icon">SS</div>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-search"></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-building"></i>
          </a>
        </li>
        <li className="nav-item active">
          <a href="#" className="nav-link">
            <i className="fas fa-chart-bar"></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-list"></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-calendar"></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-box"></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-users"></i>
          </a>
        </li>
      </ul>
      <div className="nav-bottom">
        <a href="#" className="nav-link">
          <i className="fas fa-question-circle"></i>
        </a>
        <a href="#" className="nav-link">
          <i className="fas fa-chevron-right"></i>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar; 