import { useEffect, useMemo, useState } from "react";
import functions from "../Utils/data.fetching";

import ArticleCard from "./Article Card";
import useDataApi from "../hooks/fetchData";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState(null);
  console.log(selectedTopic);
  if (selectedTopic !== null) {
    setSearchParams("topic", selectedTopic);
  }

  // useEffect(() => {
  //   if (selectedTopic !== null) {
  //     searchParams.set("topic", selectedTopic);
  //   } else {
  //     searchParams.delete("topic");
  //   }
  //   setSearchParams(searchParams);
  // }, [selectedTopic]);
  console.log(searchParams);
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useDataApi(functions.getArticles);

  const filteredArticles = useMemo(() => {
    return selectedTopic !== null
      ? articles.filter((article) => {
          return article.topic === selectedTopic;
        })
      : articles;
  }, [articles, selectedTopic]);

  if (isLoading) {
    return <h1>Articles is loading....</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }
  return (
    <main className="ArticlesBlock">
      {filteredArticles.map((article) => {
        return (
          <ArticleCard
            key={article.article_id}
            article={article}
            setSelectedTopic={setSelectedTopic}
          />
        );
      })}
    </main>
  );
}
export default HomePage;
