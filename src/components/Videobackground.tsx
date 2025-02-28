import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import useMovieTrailer from "../hooks/useMovieTrailer";

interface VideoDetail {
  id: number
}

interface Video {
  id: number;
  name: string;
  type: string;
  key: string
}

const Videobackground: React.FC<VideoDetail> = ({ id }) => {
  const trailerVideo = useSelector((store: RootState) => store.movies.trailerVideo) as Video | null;

  useMovieTrailer(id);

  return (
    <div>
      {trailerVideo ? (
        <iframe
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Videobackground