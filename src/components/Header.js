import React from 'react';
import Button from './common/Button';
const Header = () => {
  return (
    <div className=" h-20 p-2 border-b border-gray-200 bg-white">
      <div className="view_wrap flex justify-between h-full items-center">
        <h1 className=" font-semibold text-4xl text-green-700">Weplace</h1>
        <Button contants={'로그인'} />
      </div>
    </div>
  );
};

export default Header;
