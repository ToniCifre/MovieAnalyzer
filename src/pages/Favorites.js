import React  from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import MovieList from "../components/movielist/MovieList";
import Typography from "@material-ui/core/Typography";

const Wrapper = styled.div`
  margin-top: 6em;`;


const Favorites = ({ favorites = [] }) => {

  return (
    <Wrapper>
      {favorites.length > 0 ? (
        <>
          <Typography variant="h2" align="center" style={{color:'#7ca579'}}>Favorites</Typography>
          <MovieList showFavorites={true} />
        </>
      ) : (
          <Typography variant="h2" align="center" style={{color:'#7ca579'}}>
            You have no favorites! Add favorites to quickly access them here.
          </Typography>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites.favoritesList,
  };
};

export default connect(mapStateToProps)(Favorites);
