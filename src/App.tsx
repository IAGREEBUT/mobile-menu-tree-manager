import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

//pages
import ErrorPage from "./pages/errorPage/index";
import MainPage from "./pages/mainPage/index";
import EditPage from "./pages/editPage";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/edit" element={<EditPage />}></Route>
          <Route path="/error" element={<ErrorPage />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
