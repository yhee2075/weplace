import React from 'react';
import Review from '../../components/Mainpage/Review';
import Recommend from '../../components/Mainpage/Recommend';
import Category from '../../components/Mainpage/Category';

const MainPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <Recommend />
      <Review />
      <Category />
    </div>
  );
};

export default MainPage;
