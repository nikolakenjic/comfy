import axios from 'axios';

const fetchUrl = axios.create({
  baseURL: 'https://strapi-store-server.onrender.com/api',
});

export default fetchUrl;
