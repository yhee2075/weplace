import React from 'react';
import Button from './common/Button';
import MainView from './common/MainView';
const Header = () => {
  return (
    <div className="w-full border-b border-gray-200 bg-white fixed top-0 z-[100]">
      <MainView
        contents={
          <div className="flex justify-between items-center h-20 p-2">
            <a href="/">
              <h1 className=" font-semibold text-4xl text-green-700">Weplace</h1>
            </a>
            <Button contants={'로그인'} />
          </div>
        }
      />
    </div>
  );
};

export default Header;
