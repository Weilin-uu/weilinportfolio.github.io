import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import ProjectsPage from "./ProjectsPage";
import AboutMe from "./AboutMe.tsx";
import VrVolunteerSystem from "./VrVolunteerSystem"; // ← 加这行
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/project/volunteer" element={<VrVolunteerSystem />} /> // ← 加这行
      </Routes>
    </HashRouter>
  </StrictMode>
);