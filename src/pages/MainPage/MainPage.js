import React from 'react';
import Review from '../../components/Mainpage/Review';
import Recommend from '../../components/Mainpage/Recommend';
import Category from '../../components/Mainpage/Category';
import MainView from '../../components/common/MainView';

const MainPage = () => {
  return (
    <MainView
      contents={
        <div className="flex flex-col gap-8">
          <Recommend />
          <Review />
          <Category />
        </div>
      }
    ></MainView>
  );
};

export default MainPage;
