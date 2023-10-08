import React from 'react';
import '../../pages/MainPage/MainPage.css';
import Review from '../../components/Review';
import Recommend from '../../components/Recommend';
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
