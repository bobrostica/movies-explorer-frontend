import React from 'react';

import './Promo.css';
import PromoLogo from '../PromoLogo/PromoLogo';

const Promo = () => (
  <section className="promo">
    <PromoLogo className="promo__logo" />
    <div className="promo__content">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </div>
  </section>
);

export default Promo;
