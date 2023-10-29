import axios from 'axios';
import React, {useEffect, useState} from 'react';
import API from '../../api/axios';

const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const fetchCategory = async () => {
    const categorys = await axios.get(API.categoryfilters);
    const categoryList = categorys.data.data.category;
    setCategoryList(categoryList);
  };
  const fetchTagList = async () => {
    const categoryTags = await axios.get(API.categoryList);
    const reivewData = categoryTags.data.data;
    console.log('reivewData', reivewData);
    setReviewList(reivewData);

    // 배열 하나로 합치기 ---- flatMap() => 한 단계 평탄화하여 새배열 생성
    const tags = categoryTags.data.data.flatMap(t => t.tag);
    setTagList(tags);
    // 합친 배열 중 중복 항목 제거
    const result1 = new Set(tags);
    const result2 = Array.from(result1);
    setTagList(result2);
  };

  useEffect(() => {
    fetchCategory();
    fetchTagList();
  }, []);

  return (
    <div className="mt-28">
      <div className="flex gap-2 flex-wrap view_wrap">
        <button
          className="inline px-5 p-2 font-bold text-base text-white rounded-full bg-green-500 shadow-sm border-[1px]
        border-green-500"
        >
          전체보기
        </button>
        {categoryList.map(category => (
          <div>
            <button
              key={category.idx}
              className="inline px-5 p-2 font-bold text-base bg-white rounded-full text-green-500 shadow-sm border-[1px] border-green-400"
            >{`${category.name}`}</button>
          </div>
        ))}
      </div>
      <div className="bg-green-100 mt-8 py-4">
        <div className=" view_wrap flex gap-2 flex-wrap ">
          {tagList.map((tag, idx) => (
            <button
              key={idx}
              className="inline px-4 p-1 font-medium text-base bg-white rounded-full text-green-500 shadow-sm shadow-green-300 "
            >
              {`# ${tag}`}
            </button>
          ))}
        </div>
      </div>
      <div className="reviewList">
        <div className="view_wrap grid md:grid-cols-3 grid-cols-2 gap-5 mt-4">
          {reviewList.map(review => (
            <div key={review.idx} className="flex">
              <div className="bg-white rounded-md p-4 w-full shadow-md">
                <div className="flex justify-between h-7 items-center">
                  <div className="px-3 p-1 text-sm bg-green-500 rounded-full text-white shadow-sm">
                    {review.category}
                  </div>
                  <div className=" text-4xl text-gray-500 hover:text-gray-400">♥️</div>
                </div>
                <div className=" font-extrabold text-xl">{review.name}</div>
                <div className="flex gap-2">
                  <div>{review.star}</div>
                  <div>{review.review}</div>
                  <div>{review.favorite}</div>
                </div>
                <div className="bg-green-100 rounded-md p-4">
                  <div className="inline px-4 p-1 font-medium text-base bg-white rounded-full text-green-500 shadow-sm shadow-green-300">{`# ${review.tag}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;
