import React, {useEffect, useState} from 'react';
import MainView from '../components/common/MainView';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import API from '../api/axios';

const DetailPage = () => {
  const location = useLocation();
  const idx = location.state.idx;
  const [reviewData, setReviewData] = useState([]);
  const [reviewTags, setReviewTags] = useState([]);

  useEffect(() => {
    fetchReviewData();
    console.log('useEffect');
  }, []);

  const fetchReviewData = async () => {
    const reviewDatas = await axios.get(API.reviewDatail, {
      params: {
        idx: idx,
      },
    });
    setReviewData(reviewDatas.data.data.shopInfo);
    setReviewTags(reviewDatas.data.data.shopInfo.tag);

    console.log('reviewData', reviewDatas);
  };
  console.log(idx);
  return (
    <div className="mt-20 bg-green-100 pb-10">
      {console.log('return')}
      <MainView
        contents={
          <div className="pt-8">
            <div className=" inline px-4 p-1 font-medium text-base rounded-full shadow-sm shadow-green-300 text-white bg-green-500">
              {reviewData.category}
            </div>
            <div className="text-2xl font-bold my-3">{reviewData.name}</div>
            <div className="mb-3">{reviewData.address}</div>
            <div className="flex flex-wrap gap-2">
              {reviewTags.map((review, idx) => (
                <div
                  key={idx}
                  className="inline px-4 p-1 font-medium text-sm bg-white rounded-full text-green-500 shadow-sm shadow-green-300"
                >{`# ${review}`}</div>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailPage;
