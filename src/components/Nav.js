import React from 'react';
import './Nav.css';
import Button from './common/Button';
const Nav = () => {
  return (
    <div className="layout_nav">
      <h1>Weplace</h1>
      <Button contants={'로그인'} />
    </div>
  );
};

export default Nav;
