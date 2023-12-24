import axios from 'axios';
import React, {useEffect, useState} from 'react';
import API from '../../api/axios';
import {useLocation} from 'react-router-dom';
import {FaStar, FaFileLines, FaHeart} from 'react-icons/fa6';
import MainView from '../../components/common/MainView';
import {Link} from 'react-router-dom';

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

/**
 * [tagList CSS 적용]
 * 클릭 시 'select' 포함 여부 확인
 *    button에 onClick이벤트 추가 (e.target 변수 넘겨주기)
 *    if문 이용 => 조건 : 해당 button에 contains 로 'select' 포함 여부 확인
 *
 * 포함 -> 'select' class 삭제, 초록색 배경+흰색 글씨 class 추가
 * 미포함 -> 'select' class 추가, 초록색 배경+흰색 글씨 class 삭제
 *
 */

const CategoryPage = () => {
  const location = useLocation();
  // state null 체크 있으면 IDX 넣어주고 null 이면 0 (전체보기) 할당
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [selectCate, setSelectCate] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const [sortingValue, setSortingValue] = useState('recent');
  const [selectingSort, setSelectingSort] = useState('최신 순');

  useEffect(() => {
    fetchCateTag();
  }, []);

  useEffect(() => {
    const index = location.state ? location.state.idx : 0;
    handleSelectedCategory(index);
  }, [categoryList]); // 첫 접속

  useEffect(() => {
    fetchReviewData();
  }, [selectCate, selectedTagList, sortingValue]);

  const fetchCateTag = async () => {
    const cateTag = await axios.get(API.categoryfilters);
    const categoryTagList = cateTag.data.data;
    setCategoryList(categoryTagList.category);
    setTagList(categoryTagList.tag);
  };

  const handleSelectedCategory = idx => {
    const CateBtns = document.querySelectorAll('.categoryBtn');
    CateBtns.forEach(el => {
      if (idx === parseInt(el.dataset.idx)) {
        el.classList.add('bg-green-500', 'text-white');
        el.classList.remove('bg-white', 'text-green-500');
      } else {
        el.classList.remove('bg-green-500', 'text-white');
        el.classList.add('bg-white', 'text-green-500');
      }
    });
    setSelectCate(idx);
  };

  const fetchReviewData = async () => {
    const ReviewDatas = await axios.get(API.categoryList, {
      params: {
        category: selectCate,
        tag: `[${selectedTagList}]`,
        filter: sortingValue,
      },
    });
    setReviewList(ReviewDatas.data.data);
  };

  /**
   * [selectedTagList]
   * 클릭한 tag(e.target)에 'select' class 포함 여부 확인 (contains)
   *
   *    1) 포함
   *       push로 해당 idx 배열(selectedTagList)에 추가
   *
   *    2)미포함
   *      selectedTagList filter 이용 클릭한 tag의 idx과 다른 요소(!==idx)들만 재배열
   *      selectedTagList 업데이트 (useState)
   */

  const onTagFilterClick = (e, idx) => {
    let newTagList = selectedTagList;
    if (e.target.classList.contains('select')) {
      e.target.classList.remove('select');
      e.target.classList.remove('bg-green-500', 'text-white');
      e.target.classList.add('bg-white', 'text-green-500');
      newTagList = newTagList.filter(tag => tag !== idx);
    } else {
      e.target.classList.add('select');
      e.target.classList.remove('bg-white', 'text-green-500');
      e.target.classList.add('bg-green-500', 'text-white');
      newTagList.push(idx);
    }
    setSelectedTagList([...newTagList]);
  };

  const sorting = [
    {
      name: '최신 순',
      sortValue: 'recent',
    },
    {
      name: '별점 높은 순',
      sortValue: 'star',
    },
    {
      name: '가까운 순',
      sortValue: 'distance',
    },
    {
      name: '리뷰 많은 순',
      sortValue: 'review',
    },
    {
      name: '찜 많은 순',
      sortValue: 'favorite',
    },
  ];

  const changeSortingValue = target => {
    let sort = document.querySelectorAll('.sorting');
    sort.forEach(el => {
      if (target === null) {
      } else {
        if (el.classList.contains('hidden')) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    });
    setSortingValue(sorting.find(sort => String(target.textContent) === sort.name).sortValue);
    setSelectingSort(target.textContent);
    console.log('target', target);
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
              onClick={e => handleSelectedCategory(parseInt(e.target.dataset.idx))}
            >
              전체보기
            </button>
            {categoryList.map(category => (
              <button
                key={category.idx}
                data-idx={category.idx}
                onClick={e => handleSelectedCategory(parseInt(e.target.dataset.idx))}
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
                  onClick={e => onTagFilterClick(e, tag.idx)}
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
          <div>
            <div
              className="flex justify-between shadow-md rounded mt-3 w-32 bg-white hover:bg-slate-50 py-2 px-3 text-sm"
              onClick={e => changeSortingValue(e.target)}
            >
              {selectingSort}
            </div>
            <ul className="sorting shadow-md rounded mt-3 w-32 bg-white hidden absolute text-sm">
              {sorting.map((sort, idx) => (
                <li
                  key={idx}
                  onClick={e => changeSortingValue(e.target)}
                  className="sortingVelue hover:bg-slate-100 p-3 flex justify-between"
                >
                  {sort.name}
                </li>
              ))}
            </ul>
            <div className="review grid md:grid-cols-3 grid-cols-2 gap-10 mt-4 ">
              {reviewList.map((review, idx) => (
                <Link key={idx} to="/detail" state={{idx: review.idx}}>
                  <button className="flex h-[240px] w-[100%] justify-stretch items-stretch">
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
                </Link>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};
export default CategoryPage;
