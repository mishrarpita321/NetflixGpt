import { useSelector } from "react-redux"
import VideoTitle from "./VideoTitle";
import Videobackground from "./Videobackground";
import { RootState } from "../utils/appStore";

interface Movie {
  original_title: string,
  overview: string
  id: number
}

export const MainContainer = () => {
  const movies: Movie[] | undefined = useSelector((store: RootState) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;
  const mainMovie = movies[0];

  if (!mainMovie) return null;

  const { original_title, overview, id } = mainMovie;
  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <Videobackground id={id} />
    </div>
  )
}
