import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../constants/constants";
import { addTrailor } from "../utils/movieSlice";
import { useEffect } from "react";

interface Video {
    id: number;
    name: string;
    type: string;
    key: string
  }

const useMovieTrailer = (movieId: number) => {
  const dispatch = useDispatch();
  const fetchTrailer = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const json = await res.json();
    const results: Video[] = json.results;

    const trailerRecord = results.find((res) => res.type === "Trailer"); //find is used because we need only one trailer object satisfying the condition
    if (trailerRecord) {
      dispatch(addTrailor(trailerRecord));
    }
  };

  useEffect(() => {
    fetchTrailer();
  }, []);
};

export default useMovieTrailer;
