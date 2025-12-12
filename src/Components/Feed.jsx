/* Feed.js */
import { Link } from "react-router-dom";
import { value_converter } from "../data.js";
import moment from "moment";
import { useEffect, useState } from "react";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videLis_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${
      import.meta.env.VITE_YOUTUBE_KEY
    }`;
    const res = await fetch(videLis_url);
    const json = await res.json();
    setData(json.items);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-4 mx-auto max-w-[1800px]">
      {data.length === 0
        ? Array(10)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col animate-pulse gap-3">
                <div className="w-full aspect-video bg-gray-300 rounded-xl"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
        : data.map((item) => (
            <Link
              key={item.id}
              to={`video/${item.snippet.categoryId}/${item.id}`}
              className="flex flex-col group"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col mt-3 gap-1">
                <h2 className="text-[16px] font-bold text-[#0f0f0f] line-clamp-2">
                  {item.snippet.title}
                </h2>
                <h3 className="text-[14px] text-[#606060] hover:text-[#0f0f0f] transition-colors">
                  {item.snippet.channelTitle}
                </h3>
                <p className="text-[14px] text-[#606060]">
                  {value_converter(item.statistics.viewCount)} views •{" "}
                  {moment(item.snippet.publishedAt).fromNow()}
                </p>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default Feed;
