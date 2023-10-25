import axios from 'axios';
import React, {useEffect, useState} from 'react';
import API from '../../api/axios';

const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const fetchCategory = async () => {
    const categorys = await axios.get(API.categoryfilters);
    const categoryList = categorys.data.data.category;
    setCategoryList(categoryList);
  };
  const fetchTagList = async () => {
    const categoryTags = await axios.get(API.categoryList);
    // 배열 하나로 합치기 ---- flatMap() => 한 단계 평탄화하여 새배열 생성
    const tags = categoryTags.data.data.flatMap(e => e.tag);
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
              className="inline px-4 p-1 font-medium text-base bg-white rounded-full text-green-500 shadow-sm "
            >
              {`# ${tag}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;
