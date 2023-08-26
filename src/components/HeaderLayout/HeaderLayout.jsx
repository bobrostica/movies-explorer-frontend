import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import MainContainer from '../../ui/MainContainer/MainContainer';

const HeaderLayout = () => (
  <>
    <Header />
    <MainContainer>
      <Outlet />
    </MainContainer>
  </>
);

export default HeaderLayout;
