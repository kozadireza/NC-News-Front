import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nc-news-b8jg.onrender.com/api/",
});

const getUserByName = (userName) => {
  return apiRequest.get(`users/${userName}`).then(({ data }) => {
    return data.user_data;
  });
};

const getArticles = (filterAndSortParams) => {
  const query = new URLSearchParams(filterAndSortParams).toString();
  const url = `articles?${query}`;
  return apiRequest.get(url).then(({ data }) => {
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
      return data.article;
    });
};

const getComments = (article_id) => {
  return apiRequest.get(`articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

const postNewComment = (article_id, commentInf) => {
  return apiRequest
    .post(`articles/${article_id}/comments`, commentInf)
    .then(({ data }) => {
      return data.comment;
    });
};
const deleteComment = (comment_id) => {
  return apiRequest.delete(`/comments/${comment_id}`).then(() => {
    return "comment was deleted";
  });
};

const getTopics = () => {
  return apiRequest.get(`topics`).then(({ data }) => {
    return data.topics;
  });
};
const functions = {
  getUserByName,
  getArticles,
  getArticleById,
  getComments,
  patchArticleById,
  postNewComment,
  deleteComment,
  getTopics,
};
export default functions;
