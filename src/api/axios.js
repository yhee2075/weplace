import axios from 'axios';

const BASE_URL = 'http://place-api.weballin.com';

const API = {
  categoryfilters: `${BASE_URL}/review/lists/filters`,
  categoryList: `${BASE_URL}/review/lists/`,
  favorite: `${BASE_URL}/favorite`,
  reviewDatail: `${BASE_URL}/review/view`,
};

export default API;
