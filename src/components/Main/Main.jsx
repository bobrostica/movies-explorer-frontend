import React from 'react';
import { Outlet } from 'react-router-dom';
import Promo from '../../ui/Promo/Promo';
import NavBar from '../../ui/NavBar/NavBar';

const Main = () => (
  <>
    <Outlet />
    <Promo />
    <NavBar />
  </>
);

export default Main;
