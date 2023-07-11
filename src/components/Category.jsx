import React from 'react'
import styled from 'styled-components'
import '../styles/Row.css'

const Category = () => {

  const images = [
    { src: "/images/viewers-disney.png", alt: "disney", videoSrc: "/videos/disney.mp4" },
    { src: "/images/viewers-marvel.png", alt: "marvel", videoSrc: "/videos/marvel.mp4" },
    { src: "/images/viewers-national.png", alt: "national", videoSrc: "/videos/national-geographic.mp4" },
    { src: "/images/viewers-pixar.png", alt: "pixar", videoSrc: "/videos/pixar.mp4" },
    { src: "/images/viewers-starwars.png", alt: "starwars", videoSrc: "/videos/star-wars.mp4" }
  ];

  return (
    <Container>
      {images.map((image, index) => (
        <Wrap>
        <img src={image.src} alt={image.alt}/>
        <video autoPlay loop muted>
          <source src={image.videoSrc} type='video/mp4'/>
        </video>
      </Wrap>
      ))}
    </Container>
  )
}

export default Category

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0 26px;
  display : grid;
  gap : 25px;
  grid-template-columns: repeat(5 , 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1 , 1fr);
  }
`

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow : rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249 , 249 ,249 ,.1);
  transition: all 250ms cubic-bezier(0.25 , 0.46 , .45 , .94) 0s;

  img{
    inset: 0;
    display : block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
  }

  video {
    width : 100%;
    height : 100%;
    position: absolute;
    top:  0;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow : rgb(0 0 0 / 80%) 0px 40px 58px -16px,
                rgb(0 0 0 /72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249,249,.8);
    video {
      opacity: 1;
    }
  }
`
