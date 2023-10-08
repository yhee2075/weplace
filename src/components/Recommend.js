import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './Recommend.css';

const Recommend = () => {
  const [recommend, setRecommend] = useState('');

  useEffect(() => {
    fetchRecommend();
  }, []);

  const fetchRecommend = async () => {
    const restaurant = await axios.get('http://place-api.weballin.com/main');
    const recommendName =
      restaurant.data.data.reviews[Math.floor(Math.random() * restaurant.data.data.reviews.length)].name;
    setRecommend(recommendName);
  };

  return (
    <div>
      <section className="first_sec">
        <div className="random_baner">
          <h2>오늘의 식당 추천</h2>
          <input type="text" placeholder={recommend} />
        </div>
      </section>
    </div>
  );
};

export default Recommend;
