import React from 'react';
import Review from '../../components/Mainpage/Review';
import Recommend from '../../components/Mainpage/Recommend';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="Main">
      <Recommend />
      <Review />
    </div>
  );
};

export default MainPage;
