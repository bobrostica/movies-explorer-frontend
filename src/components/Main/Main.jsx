import React from 'react';
import { Outlet } from 'react-router-dom';

import GITHUB_LINK from '../../utils/constants';
import Promo from '../../ui/Promo/Promo';
import NavBar from '../../ui/NavBar/NavBar';
import AboutProject from '../../ui/AboutProject/AboutProject';
import Techs from '../../ui/Techs/Techs';
import AboutMe from '../../ui/AboutMe/AboutMe';

const Main = () => (
  <>
    <Outlet />
    <Promo />
    <NavBar />
    <AboutProject />
    <Techs isSecondaryLayoutScheme />
    <AboutMe githubLink={GITHUB_LINK} />
  </>
);

export default Main;
