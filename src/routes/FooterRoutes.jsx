import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../ui/Footer/Footer';

import GITHUB_LINK from '../utils/constants';

const FooterRoutes = () => (
  <Routes>
    <Route path="/" element={<Footer githubLink={GITHUB_LINK} />} />
  </Routes>
);

export default FooterRoutes;
