import React from 'react';
import {Link} from 'react-router-dom';

const Category = () => {
  const categoryArr = [
    {
      idx: 0,
      title: '전체보기',
    },
    {
      idx: 1,
      title: '한식',
    },
    {
      idx: 2,
      title: '중식',
    },
    {
      idx: 3,
      title: '일식',
    },
    {
      idx: 4,
      title: '양식',
    },
    {
      idx: 5,
      title: '분식',
    },
    {
      idx: 6,
      title: '아시안 매장',
    },
  ];

  return (
    <div className="view_wrap">
      <h2 className=" text-2xl font-semibold mb-3">카테고리</h2>
      <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 gap-4 font-extrabold text-lg">
        {categoryArr.map((category, idx) => (
          <Link
            to="/category"
            state={{idx: category.idx}}
            key={idx}
            className={`${
              category.idx === 0 ? 'col-span-2 bg-green-500 text-white' : 'bg-white text-green-500'
            }  p-4 rounded-md shadow-md text-center`}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
