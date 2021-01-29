import React from "react";

import { connect } from "react-redux";
import { onVideoSelect } from "../../../actions";

import styled from "styled-components";

const VideoWrapper = styled.div`
  position: relative;

  flex: 1 0 15%;
  padding: 1em 0;
  margin: 0 0.5em;

  @media screen and (max-width: 1023px) {
    flex: 0 0 auto;
  }
`;

const VideoThumbnail = styled.img`
  transition: all 300ms ease;

  max-width: 280px;
  width: 100%;
  height: 100%;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <VideoWrapper onClick={() => onVideoSelect(video)}>
      <VideoThumbnail
        alt={video.snippet.title}
        src={video.snippet.thumbnails.medium.url}
      />
    </VideoWrapper>
  );
};

export default connect(null, { onVideoSelect })(VideoItem);
