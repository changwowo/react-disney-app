import axios from '../api/axios'
import React, { useEffect, useState } from 'react'
import requests from '../api/request'
import '../styles/Banner.css'
import styled from 'styled-components'

const Banner = () => {
  const [movie , setMovie ] = useState([])
  const [isClicked , setIsClicked ] = useState(false)
  useEffect(()=> {
    fetchData()
  },[])

  const fetchData = async () => {
    // 현재 상영중인 영화 정보
    const res = await axios.get(requests.fetchNowPlaying)
    
    // 여러 영화중 영화 하나의 ID가져오기
    const movieId = res.data.results[Math.floor(Math.random() * res.data.results.length)].id

    // 특정 영화의 더 상세한 정보를 가져오기 ( 비디오 포함 )
    const {data : movieDetail }  = await axios.get(`movie/${movieId}`,{
      params : { append_to_response : 'videos' }
    })
    setMovie(movieDetail)
  }
  // 자주 써먹을꺼 같음 문자 길이를 제한해주는 함수 만든거
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n ) + '...' : str
  }

  if(isClicked){
    return(
      <>
        <Container>
        <div 
        style={{width : '100%' , height : '50px' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' ,cursor: 'pointer'}} 
        onClick={()=> setIsClicked(false)}
        >Vidio Stop Here</div>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width='640'
              height='360'
              frameBorder='0'
              allow='autoplay;fullscreen'
            >
            </Iframe>
          </HomeContainer>
        </Container>
        
      </>
    )
  }else{
    return (
      <header
        className='banner'
        style={{
          backgroundImage : `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
          backgroundPosition : 'top center',
          backgroundSize : 'cover'
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className='banner__buttons'>
            {movie?.videos?.results[0]?.key && 
              <button className='banner__button play' onClick={()=>{ setIsClicked(true)}}>
                Play
              </button>
            }
  
          </div>
          <p className='banner__description'>
            {truncate(movie.overview , 100)}
          </p>
        </div>
        <div className='banner--fadeBottom'/>
      </header>
    )
  }

}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const HomeContainer = styled.div`
  width : 100%;
  height : 100%;
`
const Iframe = styled.iframe`
  width : 100%;
  height : 100%;
  z-index : -1;
  opacity : 0.65;
  border : none;

  &::after {
    content : '';
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
  }
`