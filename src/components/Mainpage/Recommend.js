import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './Recommend.css';
import Cards from '../common/Cards';

const Recommend = ({contents}) => {
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
    <Cards
      contents={
        <div>
          <section className="flex justify-center">
            <div className="flex justify-center items-center gap-[5%]">
              <h2>오늘의 식당 추천</h2>
              <input type="text" placeholder={recommend} />
            </div>
          </section>
        </div>
      }
    />
  );
};

export default Recommend;
