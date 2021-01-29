import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

import ImageModal from "./ImageModal";
import ComposedScrollContainer from "../ComposedScrollContainer";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;


const SpringContainer = styled(animated.div)`
  flex: 0 0 calc(25% - 1.5rem);

  margin: 0 0.75rem;

  /* @media screen and (max-width: 1279px) {
    flex: 0 0 calc(33.3333% - 1.5em);
  }

  @media screen and (max-width: 801px) {
    flex: 0 0 calc(40% - 1em);
    margin: 0 0.5em;
  }

  @media screen and (max-width: 500px) {
    flex: 0 0 calc(50% - 1em);
    margin: 0 0.5em;
  } */
`;

const BottomContainer = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
  margin-bottom: 3rem;
  height: 35%;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: top;
  :hover {
    cursor: pointer;
  }

  /* padding: 0 0.75em; */
`;

const Images = ({ backdrops = [], title = "" }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)",
  }));

  const thumbURL = "https://image.tmdb.org/t/p/w780";

  const [imageClick, setImageClick] = useState("");

  let modalScrollLock;

  const toggleScrollLock = (bool) => {
    return (modalScrollLock = bool);
  };

  const changeFocus = (ref) => {
    ref.focus();
  };

  const onModalOpen = (filepath) => {
    setImageClick(filepath);
    setModalIsOpen(true);

    toggleScrollLock(true);
  };

  const onModalClose = () => {
    setModalIsOpen(false);

    toggleScrollLock(false);
  };

  return (
    <Wrapper>
      {modalIsOpen && (
        <ImageModal
          changeFocus={changeFocus}
          images={backdrops}
          clickedImage={imageClick}
          onModalClose={onModalClose}
          title={title}
          ariaLabel="Image dialog with next and previous button."
          />
      )}
      <BottomContainer>
        <ComposedScrollContainer scrollDistance="1200">
          {backdrops.slice(0, 20).map((image) => {
            return (
              <SpringContainer key={image.file_path} style={{ ...style }}>
                <MovieImage
                  src={`${thumbURL}${image.file_path}`}
                  onClick={() => onModalOpen(image.file_path)}
                  alt="Movie Images"
                />
              </SpringContainer>
            );
          })}
        </ComposedScrollContainer>
      </BottomContainer>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    backdrops: state.movie.images.backdrops,
    posters: state.movie.images.posters,
    title: state.movie.movie.title,
  };
};

export default connect(mapStateToProps)(Images);
