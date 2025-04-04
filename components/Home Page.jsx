import functions from "../Utils/data.fetching";

import ArticleCard from "./Article Card";
import useDataApi from "../hooks/fetchData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SortingAndFilteringBar from "./SortingFilteringBar";

function HomePage({ filterAndSortParams, setFilterAndSortParams }) {
  const navigate = useNavigate();
  const [listOfTopic, setListOfTopics] = useState([]);
  useEffect(() => {
    async function getTheListOfTopic() {
      const list = await functions.getTopics();
      setListOfTopics(list);
    }
    getTheListOfTopic();
  }, []);

  const {
    data: articles,
    isLoading,
    isError,
  } = useDataApi({ ...filterAndSortParams });

  if (isLoading) {
    return <h1>Articles is loading....</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }
  return (
    <main>
      <div>
        {listOfTopic.map((topic) => (
          <div>
            <a href={`/topics/${topic.slug}`}> {topic.slug}</a>
          </div>
        ))}
      </div>
      <div>
        {articles.map((article) => {
          return (
            <div>
              <SortingAndFilteringBar
                setFilterAndSortParams={setFilterAndSortParams}
                filterAndSortParams={filterAndSortParams}
              />
              <div className="articleCard">
                <h2>{article.title}</h2>
                <a target="_blank" href={article.article_img_url}>
                  <img src={article.article_img_url} alt="image for article" />
                </a>
              </div>
              <div id="navArticle">
                <h5 className="navElements">
                  Topic:{" "}
                  <a href={`/topics/${article.topic}`}>{article.topic}</a>
                </h5>
                <h5 className="navElements">
                  Author: <a>{article.author}</a>{" "}
                </h5>
                <button
                  onClick={() => navigate(`/articles/${article.article_id}`)}
                >
                  Read article
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
export default HomePage;
