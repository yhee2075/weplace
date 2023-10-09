import React from 'react';

const Card = ({contents}) => {
  return (
    <div className="flex flex-wrap  sm:flex-col justify-center items-center w-full  p-5 bg-white rounded-md shadow-xl border-l-4 border-green-300">
      {contents}
    </div>
  );
};

export default Card;
