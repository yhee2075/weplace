import axios from 'axios';
import React, {useEffect, useState} from 'react';
import API from '../../api/axios';
import Button from '../../components/common/Button';

const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategory = async () => {
    const categorys = await axios.get(API.categoryfilters);
    const categoryList = categorys.data.data.category;
    setCategoryList(categoryList);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  console.log('categoryfilters', categoryList);

  return (
    <div className="mt-28 view_wrap flex gap-2 flex-wrap">
      {categoryList.map(category => (
        <Button key={category.idx} contants={`${category.name}`}></Button>
      ))}
    </div>
  );
};
export default CategoryPage;
