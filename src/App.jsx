import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import "./App.css";
import HomePage from "../components/HomePage";

import { UserDataProvider } from "../COntexts/UserDataContext";
import ArticlePage from "../components/ArticlePage";
import LoginPage from "../components/LoginPage";
import { useState } from "react";
import ArticlesByTopicPage from "../components/ArticlesByTopicPage";

import ErrorPage from "../components/ErrorPage";

function App() {
  const [filterAndSortParams, setFilterAndSortParams] = useState({
    order: null,
    topic: null,
    sort_by: null,
  });
  return (
    <>
      <UserDataProvider>
        <Header setFilterAndSortParams={setFilterAndSortParams} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                filterAndSortParams={filterAndSortParams}
                setFilterAndSortParams={setFilterAndSortParams}
              />
            }
          />
          <Route
            path="/articles"
            element={
              <HomePage
                filterAndSortParams={filterAndSortParams}
                setFilterAndSortParams={setFilterAndSortParams}
              />
            }
          />
          <Route
            path="/topics/:topic"
            element={
              <ArticlesByTopicPage
                filterAndSortParams={filterAndSortParams}
                setFilterAndSortParams={setFilterAndSortParams}
              />
            }
          />
          <Route path="/login_page" element={<LoginPage />} />
          <Route path="articles/:article_id" element={<ArticlePage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </UserDataProvider>
    </>
  );
}

export default App;
