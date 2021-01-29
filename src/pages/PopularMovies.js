import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Alert from "@material-ui/lab/Alert";
import Pagination from '@material-ui/lab/Pagination';
import AlertTitle from "@material-ui/lab/AlertTitle";
import Typography from "@material-ui/core/Typography";

import { fetchMovies } from "../actions";
import { TMDB_API_KEY } from "../apis/tmdb/key";
import Loader from "../components/Helper/Loader";
import MovieList from "../components/movielist/MovieList";

const Wrapper = styled.div`
  margin-top: 6em;
`;

const PopularMovies = ({ isError, isLoading, maxPages, fetchMovies }) => {
  const [page, setPage] = useState(1)
  let url = `/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

  useEffect(() => {
    fetchMovies(url);
  }, [fetchMovies, url]);

  return (
    <Wrapper>
      <Typography variant="h2" align="center" style={{color:'#7ca579'}}>Currently trending movies.</Typography>
      {isError &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          An error occured <strong>please try again.</strong>
        </Alert>}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieList />
          <div style={{backgroundColor: 'rgb(0 0 0 /40%)'}}>
            <Pagination count={maxPages} page={page} color="primary" onChange={(event,val)=> setPage(val)}
                        style={{margin: 'auto', display: 'table'}}/>
          </div>
        </>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    isError: state.movies.isError,
    isLoading: state.movies.isLoading,
    maxPages: state.movies.maxPages
  };
};

export default connect(mapStateToProps, { fetchMovies })(PopularMovies);
