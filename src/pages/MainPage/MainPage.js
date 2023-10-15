import React from 'react';
import Review from '../../components/Mainpage/Review';
import Recommend from '../../components/Mainpage/Recommend';
import './MainPage.css';
import Cartegory from '../../components/Mainpage/Cartegory';

const MainPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Recommend />
      <Review />
      <Cartegory />
    </div>
  );
};

export default MainPage;
