import React from 'react';
import { Link } from 'react-router';

export default function NavbarNavsInfoDropdnRighthalf() {
  return (
    <div className="info-dropdown-content-innerContainer-right">
      <ul
        className="info-dropdown-content-innerContainer-right-list"
      >
        <li className="sweep-right">
          <Link to={'/shipping_policy'}>
            <p>Shipping Policy</p>
          </Link>
        </li>
        <li className="sweep-right">
          <Link to={'/return_policy'}>
            <p>Return Policy</p>
          </Link>
        </li>
        <li className="sweep-right">
          <Link to={'/privacy_policy'}>
            <p>Privacy Policy</p>
          </Link>
        </li>
        <li className="sweep-right">
          <Link to={'/terms_and_conditions'}>
            <p>Terms & Conditions</p>
          </Link>
        </li>
        <li className="sweep-right">
          <Link to={'/nicotine_disclaimer'}>
            <p>Nicotine Disclaimer</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}