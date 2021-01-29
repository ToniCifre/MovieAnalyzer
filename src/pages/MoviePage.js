import React, { useEffect } from "react";
import { TMDB_API_KEY } from "../apis/tmdb/key";
import { fetchMovie } from "../actions";
import { Route, Switch, useRouteMatch, withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { connect } from "react-redux";
import "typeface-roboto";

import Loader from "../components/Helper/Loader";
import Navbar from "../components/moviepage/Navbar";
import Details from "../components/moviepage/Details";
import Videos from "../components/moviepage/videos/Videos";
import Images from "../components/moviepage/images/Images";
import Credits from "../components/moviepage/credits/Credits";
import LeftLayout from "../components/moviepage/layouts/LeftLayout";
import BottomLayout from "../components/moviepage/layouts/BottomLayout";

import AltPoster from "../components/movielist/posterplaceholder.jpg";


import {Helmet} from 'react-helmet';



const MasterWrap = styled.div`
  @media screen and (max-width: 799px) {
  }
`;

const MoviePage = props => {
  const {
    movie = "",
    images,
    clickedMovieId,
    fetchMovie,
    isLoading,
  } = props;

  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });


  let urlMovieId = clickedMovieId ? clickedMovieId : props.match.params.id;

  const fetchUrl = `https://api.themoviedb.org/3/movie/${urlMovieId}?api_key=${TMDB_API_KEY}&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null`;

  useEffect(() => {
    fetchMovie(fetchUrl);
  }, [fetchMovie, fetchUrl]);

  let { path, url } = useRouteMatch();

  const posterURL = "https://image.tmdb.org/t/p/original";

  const ROOT_PATH = `${url}/details`;
  const CREDITS_PATH = `${url}/credits`;
  const IMAGES_PATH = `${url}/images`;
  const VIDEOS_PATH = `${url}/videos`;

  let backdropImage;

  if (images && images.backdrops.length >= 4) {
    switch (props.location.pathname) {
      case ROOT_PATH:
        backdropImage = `${posterURL}${images.backdrops[0].file_path}`;
        break;

      case CREDITS_PATH:
        backdropImage = `${posterURL}${images.backdrops[1].file_path}`;
        break;

      case IMAGES_PATH:
        backdropImage = `${posterURL}${images.backdrops[2].file_path}`;
        break;

      case VIDEOS_PATH:
        backdropImage = `${posterURL}${images.backdrops[3].file_path}`;
        break;

      default:
        backdropImage = `${posterURL}${images.backdrops[0].file_path}`;
        break;
    }
  } else if (images && images.backdrops.length > 0) {
    backdropImage = `${posterURL}${images.backdrops[0].file_path}`;
  } else if (images && images.posters.length > 0) {
    backdropImage = `${posterURL}${images.posters[0].file_path}`;
  } else {
    backdropImage = AltPoster;
  }

  return (
    <>
      {!isLoading && movie ? (
        <MasterWrap>
          <Navbar />
          <Helmet>
            <style>{'body { background-color: black; }'}</style>
          </Helmet>
          <Switch>
            <Route path={`${path}/details`}>
              {isMobileOrTablet ? (
                <BottomLayout backdropImage={backdropImage}>
                  <Details />
                </BottomLayout>
              ) : (
                <LeftLayout backdropImage={backdropImage}>
                  <Details />
                </LeftLayout>
              )}
            </Route>
            <BottomLayout backdropImage={backdropImage}>
              <Route path={`${path}/credits`}>
                <Credits />
              </Route>
              <Route path={`${path}/images`}>
                <Images />
              </Route>
              <Route path={`${path}/videos`}>
                <Videos />
              </Route>
            </BottomLayout>
          </Switch>
        </MasterWrap>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};


const mapStateToProps = state => {
  return {
    movie: state.movie.movie,
    images: state.movie.images,
    clickedMovieId: state.movie.clickedMovieId,
    isLoading: state.movie.isLoading,
    isError: state.movie.isError
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchMovie })(MoviePage)
);
