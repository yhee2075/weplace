import axios from 'axios';
import React, {useEffect, useState} from 'react';
import '../components/Review.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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
    <section className="sec_section">
      <h2>최신 리뷰</h2>
      <div className="review_container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          autoplay={{delay: 1000}}
          // onSwiper={swiper => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="reivew__slide">
                <div className="reivew_menu">{review.menu}</div>
                <div className="reivew_star"> {reviewStar(review.star)}</div>
                <div className="review_wdate">{review.wdate}</div>
                <div>{review.name}</div>
                <div>{review.comment}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="more">+더 보기</div>
      </div>
    </section>
  );
};

export default Review;
