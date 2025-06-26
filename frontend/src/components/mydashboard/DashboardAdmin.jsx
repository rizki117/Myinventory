









import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const DashboardAdmin = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;