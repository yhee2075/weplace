import axios from 'axios';
import React, {useEffect, useState} from 'react';
import API from '../../api/axios';
import {useLocation} from 'react-router-dom';

const CategoryPage = () => {
  const location = useLocation();

  // idx 초깃값 세팅
  // state null 체크 있으면 IDX 넣어주고 null 이면 0 (전체보기) 할당
  // const [selectCate, setSelectCate] = useState(0);

  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const index = location.state ? location.state.idx : 0;
    // handleSelectCate(index);/

    fetchCategory();
    fetchTagList();
  }, []);

  const handleSelectCate = idx => {
    const btns = document.querySelectorAll('.categoryBtn');
    btns.forEach(el => {
      el.className =
        'categoryBtn inline px-5 p-2 font-bold text-base bg-white rounded-full text-green-500 shadow-sm border-[1px] border-green-400';

      console.log(el.dataset.idx);
      if (idx === parseInt(el.dataset.idx)) {
        el.classList.remove('bg-white', 'text-green-500');
        el.classList.add('bg-green-500', 'text-white');
      }
    });
  };

  const fetchCategory = async () => {
    const categorys = await axios.get(API.categoryfilters);
    const categoryList = categorys.data.data;

    setCategoryList(categoryList.category);
    setTagList(categoryList.tag);
  };

  const fetchTagList = async () => {
    const categoryTags = await axios.get(API.categoryList);
    const reivewData = categoryTags.data.data;
    setReviewList(reivewData);

    // 배열 하나로 합치기 ---- flatMap() => 한 단계 평탄화하여 새배열 생성
    // const tags = categoryTags.data.data.flatMap(t => t.tag);
    // setTagList(tags);
    // 합친 배열 중 중복 항목 제거
    // const result1 = new Set(tags);
    // const result2 = Array.from(result1);
    // setTagList(result2);
  };

  return (
    <div className="mt-28">
      <div className="flex gap-2 flex-wrap view_wrap">
        <button
          className="categoryBtn inline px-5 p-2 font-bold text-base text-white rounded-full bg-green-500 shadow-sm border-[1px]
        border-green-500"
          data-idx={0}
          onClick={() => handleSelectCate(0)}
        >
          전체보기
        </button>
        {categoryList.map(category => (
          <button
            key={category.idx}
            className="categoryBtn inline px-5 p-2 font-bold text-base bg-white rounded-full text-green-500 shadow-sm border-[1px] border-green-400"
            data-idx={category.idx}
            onClick={() => handleSelectCate(category.idx)}
          >{`${category.name}`}</button>
        ))}
      </div>
      <div className="bg-green-100 mt-8 py-4">
        <div className=" view_wrap flex gap-2 flex-wrap ">
          {tagList.map((tag, idx) => (
            <button
              key={idx}
              className="inline px-4 p-1 font-medium text-base bg-white rounded-full text-green-500 shadow-sm shadow-green-300 "
            >
              {`# ${tag.name}`}
            </button>
          ))}
        </div>
      </div>
      <div className="reviewList">
        <div className="view_wrap grid md:grid-cols-3 grid-cols-2 gap-5 mt-4">
          {reviewList.map((review, idx) => (
            <div key={idx} className="flex">
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
                  {review.tag.map(tag => (
                    <div className="inline px-4 p-1 font-medium text-base bg-white rounded-full text-green-500 shadow-sm shadow-green-300">
                      {`# ${tag}`}
                    </div>
                  ))}
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
