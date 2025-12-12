/* Home.js */
import { useState } from "react";
import Feed from "../Components/Feed";
import Sidebar from "../Components/Sidebar";

const Home = ({ sidebar, setSidebar }) => {
  const [category, setCategory] = useState(0);

  return (
    <div className="flex">
      <div className="hidden md:block">
        <Sidebar category={category} setCategory={setCategory} />
      </div>

      {sidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebar(false)}
        >
          <div
            className="w-64 bg-white h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              category={category}
              setCategory={setCategory}
              setSidebar={setSidebar}
            />
          </div>
        </div>
      )}

      <div className="flex-1 bg-[#f9f9f9] min-h-screen p-5">
        <Feed category={category} />
      </div>
    </div>
  );
};

export default Home;
