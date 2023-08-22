import React from 'react';

import { GITHUB_LINK } from '../../utils/constants';
import Promo from '../../ui/Promo/Promo';
import NavBar from '../../ui/NavBar/NavBar';
import AboutProject from '../../ui/AboutProject/AboutProject';
import Techs from '../../ui/Techs/Techs';
import AboutMe from '../../ui/AboutMe/AboutMe';
import Portfolio from '../../ui/Portfolio/Portfolio';

const Main = () => (
  <>
    <Promo />
    <NavBar />
    <AboutProject />
    <Techs />
    <AboutMe githubLink={GITHUB_LINK} />
    <Portfolio />
  </>
);

export default Main;
