import axios from 'axios';
import React, {useEffect, useState} from 'react';
import API from '../../api/axios';
import {useLocation} from 'react-router-dom';
import {FaStar, FaFileLines, FaHeart} from 'react-icons/fa6';
import MainView from '../../components/common/MainView';

// API 동시 관리 방법 짜오기
// 함수 행동에 따라 안에 넣기
/**
 * 1. 메인페이지에서 카테고리 클릭하여 넘어온 경우
 *    1) 메인페이지의 카테고리 idx 값 불러오기
 *    2) 해당 idx와 일치하는 idx 확인
 *    3) idx가 일치하면 초록색 아니면 흰색
 *
 * 2. 다른 카테고리 클릭 시 (onClick 함수 이용 ?)
 *    1) 기존 카테고리 삭제
 *    2) 클릭한 카테고리 초록색으로 변경
 */
/**
 * 1. 선택한 태그 초록색 (중복선택 가능)
 *    toggle 선택한 idx에 'select' class 부여
 *    'select' class가 있는 el에 초록색 class 추가
 *
 * 2. 선택한 태그 필터
 *    selectCate에 'select' class 추가
 */
export const CategoryPage = () => {
  const location = useLocation();
  // state null 체크 있으면 IDX 넣어주고 null 이면 0 (전체보기) 할당
  const index = location.state ? location.state.idx : 0;
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [newTagList, setNewTagList] = useState([]);
  const [selectCate, setSelectCate] = useState(index);
  const [reviewList, setReviewList] = useState([]);

  //TODO: 새로고침 시 idx 0(전체보기)으로 바꾸기?
  useEffect(() => {
    fetchCateTag();
    fetchReviewData();
  }, [categoryList, selectCate]);

  const fetchCateTag = async () => {
    const cateTag = await axios.get(API.categoryfilters);
    const categoryTagList = cateTag.data.data;
    setCategoryList(categoryTagList.category);
    setTagList(categoryTagList.tag);
  };

  // console.log(categoryList);
  const handleSelectCate = el => {
    console.log(el.name);
    const newIndex = parseInt(el.dataset.idx);
    setSelectCate(newIndex);
  };

  const CateBtns = document.querySelectorAll('.categoryBtn');
  CateBtns.forEach(el => {
    if (selectCate === parseInt(el.dataset.idx)) {
      el.classList.add('bg-green-500', 'text-white');
      el.classList.remove('bg-white', 'text-green-500');
    } else {
      el.classList.remove('bg-green-500', 'text-white');
      el.classList.add('bg-white', 'text-green-500');
    }
  });

  const fetchReviewData = async () => {
    const ReviewDatas = await axios.get(API.categoryList);
    setReviewList(ReviewDatas.data.data);
  };

  /**
   * 1)클릭한 tag에 'select' class가 있을 경우, 배열(newTagList)에 추가
   *    클릭한 tag(e.target) contains으로 class 포함 여부 확인
   *    포함 = > push로 arr에 추가
   *    미포함 = >
   *
   * 2)클릭한 tag의 idx가 이미 배열에 있을 경우 배열에서 해당 idx를 삭제
   *    클릭한 tag(e.target) idx가 배열에 있는지 확인
   *    newTagList를 filter로 해당 idx를 뺀 나머지만 재배열 ???
   *
   *
   */
  const onTagFilterClick = (e, idx) => {
    console.log(e.target.classList.contains('select'));
    if (e.target.classList.contains('select')) {
      e.target.classList.remove('select');
      e.target.classList.remove('bg-green-500', 'text-white');
      e.target.classList.add('bg-white', 'text-green-500');
      // setNewTagList(Array.from(new Set(a)));
      let a = newTagList.filter(tag => tag !== idx);
      setNewTagList(a);
      // console.log('deleteTag', deleteTag);
    } else {
      e.target.classList.add('select');
      e.target.classList.remove('bg-white', 'text-green-500');
      e.target.classList.add('bg-green-500', 'text-white');

      newTagList.push(idx);
      // newTagList.filter(tag => tag !== idx);
      // const onTagList = Array.from(new Set(newTagList));
      // setNewTagList(onTagList);
    }
    // setNewTagList(newTagList);
    console.log('newTagList', newTagList);
  };

  return (
    <div className="mt-28">
      <MainView
        contents={
          <div className="flex gap-2 flex-wrap">
            <button
              // 메인페이지에서 받은 Arr가 아시안까지만 있어, 이후 항목까지 'categoryBtn' class 하나로 묶어줌
              className="categoryBtn bg-white text-green-500 inline px-5 p-2 font-bold text-base rounded-full shadow-sm border-[1px] border-green-400"
              data-idx={0}
              onClick={e => handleSelectCate(e.target)}
            >
              전체보기
            </button>
            {categoryList.map(category => (
              <button
                key={category.idx}
                data-idx={category.idx}
                onClick={e => handleSelectCate(e.target)}
                className="categoryBtn bg-white text-green-500 inline px-5 p-2 font-bold text-base rounded-full shadow-sm border-[1px] border-green-400"
              >{`${category.name}`}</button>
            ))}
          </div>
        }
      />
      <div className="bg-green-100 mt-8 py-4">
        <MainView
          contents={
            <div className="flex gap-2 flex-wrap h-[80px] overflow-y-auto">
              {tagList.map(tag => (
                <button
                  key={tag.idx}
                  className="tag inline px-4 p-1 font-medium text-base rounded-full shadow-sm shadow-green-300 bg-white text-green-500"
                  onClick={e => onTagFilterClick(e, tag.name)}
                >
                  {`# ${tag.name}`}
                </button>
              ))}
            </div>
          }
        />
      </div>
      <MainView
        contents={
          <div className="review grid md:grid-cols-3 grid-cols-2 gap-10 mt-4 ">
            {reviewList.map((review, idx) => (
              <button key={idx} className="flex h-[240px]">
                <div className="bg-white rounded-md p-4 w-full shadow-md">
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex justify-between h-7 items-center">
                      <div className="px-3 p-1 text-sm bg-green-500 rounded-full text-white shadow-sm">
                        {review.category}
                      </div>
                      <div className=" text-3xl text-gray-500 hover:text-gray-400">♥️</div>
                    </div>
                    <div className=" font-extrabold text-xl text-start">{review.name}</div>
                    <div className="flex gap-2">
                      <FaStar size="25" color="rgb(250 204 21)" className=" bg-yellow-200 rounded-full p-1" />
                      <div>{`${parseInt(review.star)}`}</div>
                      <FaFileLines size="25" color="rgb(96 165 250)" className=" bg-blue-200 rounded-full p-1" />
                      <div>{review.review}</div>
                      <FaHeart size="25" color="rgb(244 114 182)" className=" bg-pink-200 rounded-full p-1" />

                      <div>{review.favorite}</div>
                    </div>
                  </div>
                  <div className="bg-green-100 rounded-md p-4 overflow-y-auto h-[100px] flex items-start flex-wrap gap-2">
                    {review.tag.map((tag, idx) => (
                      <div
                        key={idx}
                        className="inline px-4 p-1 font-medium text-sm bg-white rounded-full text-green-500 shadow-sm shadow-green-300"
                      >
                        {`# ${tag}`}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        }
      />
    </div>
  );
};
