import axios from 'axios';
import React, {useEffect, useState} from 'react';
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
    <div className="mt-28">
      <Cards
        contents={
          <div>
            <div className="flex justify-center">
              <div className="flex justify-center gap-[5%] p-[3%] w-[50vw]">
                <h2 className="flex items-center text-2xl font-semibold mb-3 h-[100%]">오늘의 식당 추천</h2>
                <input type="text" placeholder={recommend} className=" md:inline hidden" />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Recommend;
