import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import "./App.css";
import HomePage from "../components/Home Page";
import { UserDataProvider } from "../COntexts/UserDataContext";
import ArticlePage from "../components/Article Page";

function App() {
  return (
    <>
      <UserDataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="articles/:article" element={<ArticlePage />} />
        </Routes>
      </UserDataProvider>
    </>
  );
}

export default App;
