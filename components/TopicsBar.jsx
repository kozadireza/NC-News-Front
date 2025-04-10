import { useEffect, useState } from "react";
import { getTopics } from "../Utils/data.fetching";
import { Link, useNavigate } from "react-router-dom";

function TopicsBar() {
  const [listOfTopic, setListOfTopics] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getTheListOfTopic() {
      const list = await getTopics();
      setListOfTopics(list);
    }
    getTheListOfTopic();
  }, []);
  return (
    <div className="container-Topics">
      <div>
        <h3
          style={{
            width: "170px",
            display: "flex",
            position: "fixed",
            justifyContent: "center",
          }}
        >
          Topics
        </h3>
      </div>
      <div className="topicsContainer">
        {listOfTopic.map((topic) => (
          <div
            key={topic.slug}
            onClick={() => navigate(`/topics/${topic.slug}`)}
            className="topicName"
          >
            {topic.slug}
          </div>
        ))}
      </div>
    </div>
  );
}
export default TopicsBar;
