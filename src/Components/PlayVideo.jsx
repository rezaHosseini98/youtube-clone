import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { value_converter } from "../data.js";
import moment from "moment";

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${
      import.meta.env.VITE_YOUTUBE_KEY
    }`;
    const res = await fetch(url);
    const data = await res.json();
    setApiData(data.items[0]);
  };

  const fetchOtherData = async () => {
    if (!apiData) return;

    const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${
      apiData.snippet.channelId
    }&key=${import.meta.env.VITE_YOUTUBE_KEY}`;
    const resChannel = await fetch(channelUrl);
    const channelJson = await resChannel.json();
    setChannelData(channelJson.items[0]);

    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=10&videoId=${videoId}&key=${
      import.meta.env.VITE_YOUTUBE_KEY
    }`;
    const resComment = await fetch(commentUrl);
    const commentJson = await resComment.json();
    setCommentData(commentJson.items || []);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);
  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="flex-1 lg:basis-[65%] flex flex-col">
      {/* Video */}
      <div className="w-full aspect-video bg-black rounded-md overflow-hidden mb-4">
        {apiData ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        )}
      </div>

      {/* Title & Stats */}
      <h3 className="font-bold text-2xl mb-2">
        {apiData ? apiData.snippet.title : "Loading..."}
      </h3>
      <div className="flex items-center justify-between flex-wrap text-gray-600 text-sm mb-4">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "--"} views
          • {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img className="w-5 mr-1" src={assets.like} alt="like" />
            {apiData ? value_converter(apiData.statistics.likeCount) : "--"}
          </div>
          <div className="flex items-center">
            <img className="w-5 mr-1" src={assets.dislike} alt="dislike" />
          </div>
          <div className="flex items-center">
            <img className="w-5 mr-1" src={assets.share} alt="share" />
            Share
          </div>
          <div className="flex items-center">
            <img className="w-5 mr-1" src={assets.save} alt="save" />
            Save
          </div>
        </div>
      </div>

      <hr className="border-0 h-px bg-gray-300 mb-4" />

      {/* Channel Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={
              channelData
                ? channelData.snippet.thumbnails.default.url
                : assets.user_profile
            }
            alt="channel"
          />
          <div>
            <p className="font-bold">
              {apiData ? apiData.snippet.channelTitle : "Loading..."}
            </p>
            <span className="text-sm text-gray-600">
              {channelData
                ? value_converter(channelData.statistics.subscriberCount)
                : "--"}{" "}
              subscribers
            </span>
          </div>
        </div>
        <button className="bg-red-700 text-white py-2 px-5 rounded">
          Subscribe
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">
        {apiData ? apiData.snippet.description : "Loading description..."}
      </p>

      <hr className="border-0 h-px bg-gray-300 mb-4" />

      {/* Comments */}
      <h4 className="text-sm font-semibold text-gray-600 mb-2">
        {commentData.length} Comments
      </h4>
      <div className="space-y-4">
        {commentData.slice(0, 5).map((c, i) => (
          <div key={i} className="flex items-start gap-3">
            <img
              className="w-9 h-9 rounded-full"
              src={c.snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt="user"
            />
            <div>
              <p className="text-sm font-semibold">
                {c.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                <span className="text-xs text-gray-500">
                  {moment(
                    c.snippet.topLevelComment.snippet.publishedAt
                  ).fromNow()}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                {c.snippet.topLevelComment.snippet.textDisplay}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
