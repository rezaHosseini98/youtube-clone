/* Video.js */
import { useParams } from "react-router-dom";
import PlayVideo from "../Components/PlayVideo";
import Recommended from "../Components/Recommended";

const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="bg-[#f9f9f9] py-5 px-5 flex flex-col lg:flex-row lg:gap-6 gap-5">
      <PlayVideo videoId={videoId} />
      <div className="w-full lg:w-[35%] max-h-[80vh] overflow-y-auto">
        <Recommended categoryId={categoryId} />
      </div>
    </div>
  );
};

export default Video;
