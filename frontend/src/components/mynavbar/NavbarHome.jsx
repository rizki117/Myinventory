









import React from 'react';
import NavigationBar from './NavigationBar';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const NavbarHome = () => {
  return (
    <>
      <NavigationBar />
      <Header />
      <Outlet /> {/* Ini bagian yang akan diganti-ganti oleh HomePublic, About, dll */}
      <Footer />
    </>
  );
};

export default NavbarHome;