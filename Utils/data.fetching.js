import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nc-news-b8jg.onrender.com/api/",
});

export const getUserByName = (userName) => {
  return apiRequest.get(`users/${userName}`).then(({ data }) => {
    return data.user_data;
  });
};

export const getArticles = (filterAndSortParams) => {
  const query = new URLSearchParams(filterAndSortParams).toString();
  const url = `articles?${query}`;
  return apiRequest.get(url).then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return apiRequest.get(`articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};
export const patchArticleById = (article_id, updatingInf) => {
  return apiRequest
    .patch(`articles/${article_id}`, updatingInf)
    .then(({ data }) => {
      return data.article;
    });
};

export const getComments = (article_id) => {
  return apiRequest.get(`articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const postNewComment = (article_id, body, author) => {
  return apiRequest
    .post(`articles/${article_id}/comments`, {
      author,
      body,
    })
    .then(({ data }) => {
      return data.comment;
    });
};
export const deleteComment = (comment_id) => {
  return apiRequest.delete(`/comments/${comment_id}`).then(() => {
    return "comment was deleted";
  });
};

export const getTopics = () => {
  return apiRequest.get(`topics`).then(({ data }) => {
    return data.topics;
  });
};
