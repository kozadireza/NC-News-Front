import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import "./App.css";
import HomePage from "../components/Home Page";
import { UserDataProvider } from "../COntexts/UserDataContext";
import ArticlePage from "../components/Article Page";
import LoginPage from "../components/Login Page";

function App() {
  return (
    <>
      <UserDataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login_page" element={<LoginPage />} />
          <Route path="/articles" element={<HomePage />} />
          <Route path="articles/:article" element={<ArticlePage />} />
        </Routes>
      </UserDataProvider>
    </>
  );
}

export default App;
