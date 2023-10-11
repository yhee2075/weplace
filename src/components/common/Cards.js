import React from 'react';

const Card = ({contents}) => {
  return (
    <div className="flex flex-wrap sm:flex-col justify-center items-center p-4 bg-white rounded-md h-[90%] w-full shadow-md">
      {contents}
    </div>
  );
};

export default Card;
