import { useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HackerNewsPage } from "./pages/HackerNewsPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hacker-news" element={<HackerNewsPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
