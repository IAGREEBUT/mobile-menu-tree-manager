import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

//pages
import ErrorPage from "./pages/errorPage/index";
import MainPage from "./pages/mainPage/index";
import EditPage from "./pages/editPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/edit" element={<EditPage />}></Route>
          <Route path="/error" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
