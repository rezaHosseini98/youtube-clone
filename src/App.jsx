/* App.js */
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Video from "./Pages/Video";
import { useState } from "react";

const App = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route
          path="/"
          element={<Home sidebar={sidebar} setSidebar={setSidebar} />}
        />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;
