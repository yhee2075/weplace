import React from 'react';

const Button = ({contants}) => {
  return (
    <button className="inline px-5 p-2 font-medium text-base bg-green-500 rounded-full text-white">{contants}</button>
  );
};

export default Button;
