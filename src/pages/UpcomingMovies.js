import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { TMDB_API_KEY } from "../apis/tmdb/key";

import { fetchMovies } from "../actions";
import Loader from "../components/Helper/Loader";
import MovieList from "../components/movielist/MovieList";
import Pagination from "@material-ui/lab/Pagination";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Typography from "@material-ui/core/Typography";

const Wrapper = styled.div`
  margin-top: 6em;`;

const PageText = styled.h1`
  font-size: 1em;
  margin: 0 6em;
  color: #7ca579;

  @media screen and (min-width: 1824px) {
    margin-left: 5em;
  }
`;

const ErrorText = styled(PageText)`
  color: #ec0312;
`;

const UpcomingMovies = ({ fetchMovies, isError, maxPages, isLoading }) => {
  const [page, setPage] = useState(1)
  // Get date three months from now. Convert date to TMDB API's required syntax.
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 90);
  const searchDate = currentDate.toISOString().substring(0, 10);
  const todayDate = new Date().toISOString().substring(0, 10);

  const url = `/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false
  &include_video=false&page=${page}&release_date.gte=${todayDate}&release_date.lte=${searchDate}&with_release_type=3%7C2`;

  useEffect(() => {
    fetchMovies(url);
  }, [fetchMovies, url]);

  return (
    <Wrapper>
      <Typography variant="h2" align="center" style={{color:'#7ca579'}}>Movies releasing in the next 3 months.</Typography>
      {isError &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          An error occured <strong>please try again.</strong>
        </Alert>}
      {isLoading ?
        <Loader /> :
        <>
          <MovieList />
          <div style={{backgroundColor: 'rgb(0 0 0 /40%)'}}>
            <Pagination count={maxPages} page={page} color="primary" onChange={(event,val)=> setPage(val)}
                        style={{margin: 'auto', display: 'table'}}/>
          </div>
        </>
      }
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    isError: state.movies.isError,
    isLoading: state.movies.isLoading,
    maxPages: state.movies.maxPages
  };
};

export default connect(mapStateToProps, { fetchMovies })(UpcomingMovies);
