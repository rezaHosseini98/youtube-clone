/* Sidebar.js */
import { assets } from "../assets/assets";

const Sidebar = ({ category, setCategory, setSidebar }) => {
  const handleClick = (catId) => {
    setCategory(catId);
    if (setSidebar) setSidebar(false);
  };

  const categories = [
    { id: 0, name: "Home", icon: assets.home },
    { id: 20, name: "Gaming", icon: assets.game_icon },
    { id: 2, name: "Automobiles", icon: assets.automobiles },
    { id: 17, name: "Sports", icon: assets.sports },
    { id: 24, name: "Entertainment", icon: assets.entertainment },
    { id: 28, name: "Technology", icon: assets.tech },
    { id: 10, name: "Music", icon: assets.music },
    { id: 22, name: "Blogs", icon: assets.blogs },
    { id: 25, name: "News", icon: assets.news },
  ];

  return (
    <div className="bg-white h-screen pt-20 md:pt-5 px-4 overflow-y-auto ">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={`flex items-center mb-5 cursor-pointer ${
            category === cat.id ? "border-b-4 border-red-700 pb-1" : ""
          }`}
          onClick={() => handleClick(cat.id)}
        >
          <img className="w-5 mr-3" src={cat.icon} alt={cat.name} />
          <p className="">{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
