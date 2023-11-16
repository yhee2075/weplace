import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './Review.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Cards from '../common/Cards';
import {Link} from 'react-router-dom';

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    const reviewList = await axios.get('http://place-api.weballin.com/main');
    const reviews = reviewList.data.data.reviews;
    setReviews(reviews);
  };

  const reviewStar = n => {
    // 반복할 숫자 받아오기
    const arr = [];
    // n번 반복 돌리기
    for (let i = 0; i < parseInt(n); i++) {
      // n만큼 별 담기
      arr.push('⭐');
    }
    // 문자열로 변환
    return arr.join('');
  };

  //['⭐', '⭐', '⭐'];
  //('⭐⭐⭐');

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">최신 리뷰</h2>
      <div className="w-full">
        <div className="review_swiper flex justify-center h-[180px] gap-4">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            breakpoints={{
              1200: {
                slidesPerView: 3, // 한번에 보이는 슬라이드 개수
              },
              768: {
                slidesPerView: 2,
              },
              0: {
                slidesPerView: 1,
              },
            }}
            navigation
            autoplay={{delay: 1000}}
            // onSwiper={swiper => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <Cards
                  contents={
                    <div className=" reivew__slide flex flex-col items-start w-full p-1">
                      <div className="w-full flex justify-between items-center">
                        <div className=" inline px-3 p-1 font-normal text-xs bg-green-500 rounded-2xl text-white">
                          {review.menu}
                        </div>
                        <div className="font-normal text-sm">{review.wdate}</div>
                      </div>
                      <div>{reviewStar(review.star)}</div>
                      <div className=" text-xl font-bold">{review.name}</div>
                      <div className=" text-base">"{review.comment}"</div>
                    </div>
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Link to="/category">
            <button className="h-[90%] bg-green-500 text-white p-4 rounded-md shadow-md">MORE</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Review;
