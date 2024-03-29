import React, {useEffect, useState} from 'react';
import MainView from '../components/common/MainView';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import API from '../api/axios';
import Card from '../components/common/Cards';
import {
  FaStar,
  FaHeart,
  FaLocationDot,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaAngleDown,
  FaAngleUp,
  FaImage,
  FaMagnifyingGlassPlus,
} from 'react-icons/fa6';

const DetailPage = () => {
  const location = useLocation();
  const idx = location.state.idx;
  const [shopInfo, setShopInfo] = useState([]);
  const [reviewTags, setReviewTags] = useState([]);
  const [reviewDetail, setReviewDetail] = useState([]);
  const [selectedSwitch, setSelectedSwitch] = useState(null);

  useEffect(() => {
    fetchReviewData();
  }, []);

  const fetchReviewData = async () => {
    const shopList = await axios.get(API.reviewDatail, {
      params: {
        idx: idx,
      },
    });
    setShopInfo(shopList.data.data.shopInfo);
    setReviewTags(shopList.data.data.shopInfo.tag);
    setReviewDetail(shopList.data.data.review);
  };

  const reviewStar = n => {
    const arr = [];
    for (let i = 0; i < parseInt(n); i++) {
      arr.push('★');
    }

    for (let i = 0; i < parseInt(5 - n); i++) {
      arr.push('☆');
    }
    return arr.join('');
  };

  const handleMoreCommentSwitch = (e, idx) => {
    setSelectedSwitch(idx);
    const MoreCommentSwitch = document.querySelectorAll('.MoreCommentSwitch');
    MoreCommentSwitch.forEach(el => {
      el.classList.toggle('hidden');
    });
    e.nextSibling.classList.toggle('hidden');
  };

  console.log(reviewDetail.length === 3);

  return (
    <div>
      <div className="mt-20 bg-green-100 pb-10">
        <MainView
          contents={
            <div className="pt-8">
              <div className=" inline px-4 p-1 font-medium text-lg rounded-full shadow-sm shadow-green-300 text-white bg-green-500">
                {shopInfo.category}
              </div>
              <div className="text-2xl font-bold my-3">{shopInfo.name}</div>
              <div className="mb-3">
                {`${shopInfo.address}
                ${shopInfo.floor}층`}
              </div>
              <div className="flex flex-wrap gap-2">
                {reviewTags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="inline px-4 p-1 font-bold text-sm bg-white rounded-full text-green-500 shadow-sm shadow-green-300"
                  >{`# ${tag}`}</div>
                ))}
              </div>
            </div>
          }
        />
      </div>
      <MainView
        contents={
          <div>
            <div className="flex gap-4 my-5">
              <Card
                contents={
                  <div className="flex flex-col justify-center items-center h-[87px]">
                    <FaStar size="35" color="rgb(250 204 21)" className=" bg-yellow-200 rounded-full p-2" />
                    <div className="font-bold text-lg">{shopInfo.star ? shopInfo.star : '0'}</div>
                    <div>별점</div>
                  </div>
                }
              />
              <Card
                contents={
                  <div className="flex flex-col justify-center items-center h-[87px]">
                    <FaHeart size="35" color="rgb(244 114 182)" className=" bg-pink-200 rounded-full p-2" />
                    <div className="font-bold text-lg">{shopInfo.favorite}</div>
                    <div>찜</div>
                  </div>
                }
              />
              <Card
                contents={
                  <div className="flex flex-col justify-center items-center h-[87px]">
                    <a href={`${shopInfo.url}`} target="blank">
                      <FaLocationDot size="35" color="rgb(96 165 250)" className=" bg-blue-200 rounded-full p-2" />
                    </a>
                    <div className="font-bold text-lg">{`${shopInfo.distance}분`}</div>
                    <div>예상 거리</div>
                  </div>
                }
              />
            </div>
            <div className="flex flex-col gap-5">
              {reviewDetail.map((review, idx) => (
                <Card
                  key={idx}
                  contents={
                    <div className="w-full flex flex-col gap-5">
                      <div className="flex border rounded-full px-2 py-1 items-center justify-between w-full font-medium">
                        <div className="flex items-center gap-5">
                          <img src={review.thumb} alt="profileImg" className="h-12 w-12 rounded-full bg-cover" />
                          <div>{review.name}</div>
                        </div>
                        <div>{review.wdate}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                          <div className="inline px-4 p-1 font-medium text-sm rounded-full shadow-sm shadow-green-300 text-white bg-green-500">
                            {review.menu}
                          </div>
                          <div>{review.image.length !== 0 ? <FaImage color="rgb(34 197 94)" /> : ''}</div>
                        </div>
                        <div className="text-yellow-400 text-xl">{reviewStar(review.star)}</div>
                      </div>
                      <div className="text-xl font-bold">{`"${review.comment}"`}</div>
                      <div className="flex flex-wrap gap-2">
                        {review.tag.map((tag, idx) => (
                          <div
                            key={idx}
                            className="inline px-4 p-1 font-bold text-sm bg-white rounded-full text-green-500 border border-green-500 "
                          >{`# ${tag}`}</div>
                        ))}
                      </div>
                      <div
                        className="comment_btn flex justify-end"
                        onClick={e => handleMoreCommentSwitch(e.currentTarget, idx)}
                      >
                        <FaAngleDown
                          color="rgb(34 197 94)"
                          size="25"
                          className={`${
                            selectedSwitch === null ? '' : selectedSwitch === idx ? 'MoreCommentSwitch hidden' : ''
                          }`}
                        />
                        <FaAngleUp
                          color="rgb(34 197 94)"
                          size="25"
                          className={`${
                            selectedSwitch === null ? 'hidden' : selectedSwitch === idx ? 'MoreCommentSwitch' : 'hidden'
                          }`}
                        />
                      </div>
                      <div className="reviewCommet_wrap hidden">
                        <div className="">
                          <div className="flex justify-between gap-2 items-stretch text-sm w-full">
                            <div className="p-3 rounded border bg-gray-50 w-[50%] flex items-center">
                              {' '}
                              <FaRegThumbsUp
                                size="35"
                                color="rgb(45 212 191)"
                                className=" bg-teal-100 rounded-full p-2 mr-2"
                              />
                              <div className="w-[90%]">{review.comment_good}</div>
                            </div>
                            <div className="p-3 rounded border bg-gray-50 w-[50%] flex items-center">
                              <FaRegThumbsDown
                                size="35"
                                color="rgb(252 165 165)"
                                className=" bg-red-100 rounded-full p-2 mr-2"
                              />
                              <div className="w-[90%]">{review.comment_bad}</div>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-2">
                            {review.image.map(imgList => (
                              <div className="">
                                <div className="relative rounded border flex items-center">
                                  <img
                                    key={idx}
                                    src={imgList}
                                    alt="reviewImg"
                                    className="peer hover:opacity-60 h-28 w-24 object-contain p-1"
                                  />
                                  <FaMagnifyingGlassPlus
                                    color="rgb(34 197 94)"
                                    className="opacity-0 peer-hover:opacity-100 hover:opacity-100 h-6 w-6 absolute top-[40%] left-[40%]"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailPage;
