import React from 'react';
import { Outlet } from 'react-router-dom';
import Promo from '../../ui/Promo/Promo';
import NavBar from '../../ui/NavBar/NavBar';
import AboutProject from '../../ui/AboutProject/AboutProject';

const Main = () => (
  <>
    <Outlet />
    <Promo />
    <NavBar />
    <AboutProject />
  </>
);

export default Main;
