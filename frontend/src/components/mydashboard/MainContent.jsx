









import React, { useEffect } from 'react';
import feather from 'feather-icons';
import useGetMe from '../../hooks/useGetMe';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
  const { user, loading, error } = useGetMe();

  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3>
          {loading ? 'Loading...' : error ? 'Welcome, Guest' : `Welcome, ${user?.name || 'User'}`}
        </h3>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>

      {/* Outlet untuk menampilkan konten child routes */}
      <Outlet />
    </main>
  );
};

export default MainContent;