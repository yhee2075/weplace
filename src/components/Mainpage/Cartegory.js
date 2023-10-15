import React from 'react';

const Cartegory = () => {
  const cartegoryArr = [
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
      <h2>카테고리</h2>
      <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 gap-4 font-extrabold text-lg">
        {cartegoryArr.map(cartegory => (
          <button
            key={cartegory.idx}
            className={`${
              cartegory.idx === 0 ? 'col-span-2 bg-green-500 text-white' : 'bg-white text-green-500'
            }  p-4 rounded-md shadow-md text-center`}
          >
            {cartegory.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cartegory;
