import { useEffect, useState } from "react";
import { value_converter } from "../data.js";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    if (!categoryId) return;
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=15&videoCategoryId=${categoryId}&key=${
      import.meta.env.VITE_YOUTUBE_KEY
    }`;
    const res = await fetch(url);
    const json = await res.json();
    setApiData(json.items || []);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="flex flex-col space-y-3">
      {apiData.length === 0
        ? Array(15)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="animate-pulse flex gap-2">
                <div className="w-24 h-14 bg-gray-300 rounded"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))
        : apiData.map((item) => (
            <Link
              to={`/video/${item.snippet.categoryId}/${item.id}`}
              key={item.id}
              onClick={() => window.scrollTo(0, 0)}
              className="flex gap-2 hover:bg-gray-100 p-1 rounded"
            >
              <img
                className="w-24 h-14 rounded object-cover"
                src={item.snippet.thumbnails.medium.url}
                alt={item.snippet.title}
              />
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm font-semibold line-clamp-2">
                  {item.snippet.title}
                </p>
                <p className="text-xs text-gray-600">
                  {item.snippet.channelTitle}
                </p>
                <p className="text-xs text-gray-600">
                  {value_converter(item.statistics.viewCount)} views
                </p>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default Recommended;
