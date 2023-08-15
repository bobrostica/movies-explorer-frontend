import React from 'react';
import { Outlet } from 'react-router-dom';
import Promo from '../../ui/Promo/Promo';

const Main = () => (
  <>
    <Outlet />
    <Promo />
  </>
);

export default Main;
