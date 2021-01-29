import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { ChevronDown } from "styled-icons/boxicons-regular/ChevronDown";

import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import Loader from "../../Helper/Loader";
import { fetchTrailers, onVideoSelect } from "../../../actions";
import ComposedScrollContainer from "../ComposedScrollContainer";

const VideoContainer = styled.div`
  display: flex;
  flex-flow: column;

  height: 100%;
`;

const VideoHideButton = styled.button`
  align-self: center;

  width: 5em;
  color: white;
  background: none;
  outline: none;
  border: none;
  transition: all 200ms ease;

  :hover {
    cursor: pointer;
    transform: scale(1.08);
    color: rgb(185, 185, 185);
  }
`;

const FlexContainer = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: 4em;

  align-items: center;
`;

const Videos = ({
  videos,
  trailers,
  fetchTrailers,
  onVideoSelect,
  clickedVideo,
  isLoading
}) => {
  const trailerKeys = videos.map(video => video.key).join(",");

  //! RUN THIS When newpage mounts, not videos??
  useEffect(() => {
    fetchTrailers(trailerKeys);

    // Reset Video on Component unmount
    return () => {
      onVideoSelect(null);
    };
  }, [fetchTrailers, trailerKeys, onVideoSelect]);

  return (
    <>
      {!isLoading ? (
        <>
          <VideoContainer>
            {clickedVideo && <VideoDetail />}
            {clickedVideo && (
              <VideoHideButton onClick={() => onVideoSelect(null)}>
                <ChevronDown />
              </VideoHideButton>
            )}
            <FlexContainer>
              <ComposedScrollContainer>
                {trailers && <VideoList />}
              </ComposedScrollContainer>
            </FlexContainer>
          </VideoContainer>
        </>
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
    videos: state.movie.videos.results,
    trailers: state.trailers.trailers,
    clickedVideo: state.trailers.clickedVideo,
    isError: state.trailers.isError,
    isLoading: state.trailers.isLoading
  };
};

export default connect(mapStateToProps, { fetchTrailers, onVideoSelect })(
  Videos
);
