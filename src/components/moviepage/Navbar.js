import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { NavLink, useRouteMatch } from "react-router-dom";

const StyledLink = styled(NavLink)`
  border: 1px solid #7ca887;
  border: none;

  background: none;
  margin: 0 1.35rem;
  padding-bottom: 0.05rem;
  outline: none;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  color: rgb(135, 135, 135);

  :hover {
    cursor: pointer;
  }
`;

const StyledNavbar = styled.nav`
  z-index: 999;
  margin: auto;
  display: table;
  padding: 0.75rem 0;
  background: rgba(0, 0, 0, 0.65);

`;



const StyledCenterNavbar = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999;
  bottom: 0;
`;

const activeStyle = {
  boxShadow: "0em 0.2em teal",
  color: "white",
};

const Navbar = ({ backdrops, videos }) => {

  let { url } = useRouteMatch();

  return (
    <StyledCenterNavbar>
      <StyledNavbar>
        <StyledLink exact to={`${url}/details`} activeStyle={activeStyle}>
          Details
        </StyledLink>
        <StyledLink to={`${url}/credits`} activeStyle={activeStyle}>
          Cast & Crew
        </StyledLink>
        {backdrops.length > 0 && (
          <StyledLink to={`${url}/images`} activeStyle={activeStyle}>
            Images
          </StyledLink>
        )}
        {videos.length > 0 && (
          <StyledLink to={`${url}/videos`} activeStyle={activeStyle}>
            Videos
          </StyledLink>
        )}
      </StyledNavbar>
    </StyledCenterNavbar>
  );
};

const mapStateToProps = (state) => {
  return {
    backdrops: state.movie.images.backdrops,
    videos: state.movie.videos.results,
  };
};

export default connect(mapStateToProps)(Navbar);
