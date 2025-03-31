import axios from "axios";

const url = `https://nc-news-b8jg.onrender.com/api/`;

const getUserByName = (userName) => {
  return axios.get(url + `users/${userName}`).then(({ data }) => {
    return data.user;
  });
};

const getArticles = () => {
  return axios.get(url + `articles`).then(({ data }) => {
    return data.articles;
  });
};
const getArticleById = (article_id) => {
  return axios.get(url + `articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

const getComments = (article_id) => {
  return axios.get(url + `articles/${article_id}/comments`).then(({ data }) => {
    console.log(data);
    return data.comments;
  });
};
const functions = { getUserByName, getArticles, getArticleById, getComments };
export default functions;
