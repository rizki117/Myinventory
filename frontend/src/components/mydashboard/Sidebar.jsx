









import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import feather from 'feather-icons';
import useGetMe from '../../hooks/useGetMe';

const Sidebar = () => {
  const { user, loading } = useGetMe();
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      feather.replace();
    }, 0); // Menunda untuk memastikan DOM siap

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">

          <li className="nav-item">
            <Link className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} to="/dashboard">
              <span data-feather="home"></span> Dashboard
            </Link>
          </li>

          {!loading && user?.role === 'admin' && (
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/dashboard/users') ? 'active' : ''}`} to="/dashboard/users">
                <span data-feather="users"></span> Datausers
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link className={`nav-link ${isActive('/dashboard/reports') ? 'active' : ''}`} to="/dashboard/reports">
              <span data-feather="bar-chart-2"></span> Reports
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">
              <span data-feather="globe"></span> Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive('/dashboard/integrations') ? 'active' : ''}`} to="/dashboard/integrations">
              <span data-feather="layers"></span> Integrations
            </Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <Link className="link-secondary" to="#">
            <span data-feather="plus-circle"></span>
          </Link>
        </h6>

        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/dashboard/details') ? 'active' : ''}`} to="/dashboard/details">
              <span data-feather="file-text"></span> Detail
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;