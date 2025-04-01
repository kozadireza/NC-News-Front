import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nc-news-b8jg.onrender.com/api/",
});

const getUserByName = (userName) => {
  return apiRequest.get(`users/${userName}`).then(({ data }) => {
    return data.user;
  });
};

const getArticles = () => {
  return apiRequest.get(`articles`).then(({ data }) => {
    return data.articles;
  });
};
const getArticleById = (article_id) => {
  return apiRequest.get(`articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};
const patchArticleById = (article_id, updatingInf) => {
  return apiRequest
    .patch(`articles/${article_id}`, updatingInf)
    .then(({ data }) => {
      console.log(data);
      return data.article;
    });
};

const getComments = (article_id) => {
  return apiRequest.get(`articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
const functions = {
  getUserByName,
  getArticles,
  getArticleById,
  getComments,
  patchArticleById,
};
export default functions;
