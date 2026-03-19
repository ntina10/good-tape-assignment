import { Navigate, Route, Routes } from "react-router-dom";
import { HackerNewsPage } from "./pages/HackerNewsPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hacker-news" element={<HackerNewsPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
